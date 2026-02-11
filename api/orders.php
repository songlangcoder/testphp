<?php
require_once 'config.php';
$conn = getConnection();

$method = $_SERVER['REQUEST_METHOD'];

// GET - Lấy danh sách đơn hàng
if ($method === 'GET') {
    $result = $conn->query("
        SELECT o.id, o.customer_name, o.customer_phone, o.total, o.status, o.created_at,
               o.customer_email, o.customer_address, o.note, o.payment_method
        FROM orders o ORDER BY o.created_at DESC
    ");
    $orders = [];
    while ($row = $result->fetch_assoc()) {
        $row['total'] = (int)$row['total'];
        $row['customer'] = [
            'fullname' => $row['customer_name'],
            'phone' => $row['customer_phone'],
            'email' => $row['customer_email'],
            'address' => $row['customer_address'],
            'note' => $row['note']
        ];
        unset($row['customer_name'], $row['customer_phone'], $row['customer_email'], $row['customer_address'], $row['note']);
        $itemsResult = $conn->query("SELECT product_id as id, product_name as name, price, qty FROM order_items WHERE order_id = '" . $conn->real_escape_string($row['id']) . "'");
        $row['items'] = [];
        while ($item = $itemsResult->fetch_assoc()) {
            $item['price'] = (int)$item['price'];
            $item['qty'] = (int)$item['qty'];
            $row['items'][] = $item;
        }
        $orders[] = $row;
    }
    echo json_encode($orders);
    exit;
}

// POST - Tạo đơn hàng mới
if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $customer = $input['customer'] ?? [];
    $items = $input['items'] ?? [];
    $paymentMethod = $input['paymentMethod'] ?? 'cod';
    
    if (empty($items)) {
        http_response_code(400);
        echo json_encode(['error' => 'Cart is empty']);
        exit;
    }
    
    $orderId = 'DH' . time();
    $fullname = $conn->real_escape_string($customer['fullname'] ?? '');
    $phone = $conn->real_escape_string($customer['phone'] ?? '');
    $email = $conn->real_escape_string($customer['email'] ?? '');
    $address = $conn->real_escape_string($customer['address'] ?? '');
    $note = $conn->real_escape_string($customer['note'] ?? '');
    
    $total = 0;
    foreach ($items as $i) {
        $total += (int)($i['price'] ?? 0) * (int)($i['qty'] ?? 1);
    }
    
    $stmt = $conn->prepare("INSERT INTO orders (id, customer_name, customer_phone, customer_email, customer_address, note, total, payment_method, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending')");
    $stmt->bind_param('sssssiss', $orderId, $fullname, $phone, $email, $address, $note, $total, $paymentMethod);
    
    if (!$stmt->execute()) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to create order']);
        exit;
    }
    
    $stmtItem = $conn->prepare("INSERT INTO order_items (order_id, product_id, product_name, price, qty) VALUES (?, ?, ?, ?, ?)");
    foreach ($items as $i) {
        $pid = $conn->real_escape_string($i['id'] ?? '');
        $pname = $conn->real_escape_string($i['name'] ?? '');
        $price = (int)($i['price'] ?? 0);
        $qty = (int)($i['qty'] ?? 1);
        $stmtItem->bind_param('sssii', $orderId, $pid, $pname, $price, $qty);
        $stmtItem->execute();
    }
    
    echo json_encode(['success' => true, 'orderId' => $orderId, 'total' => $total]);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
