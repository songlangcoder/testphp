<?php
require_once 'config.php';
$conn = getConnection();

$method = $_SERVER['REQUEST_METHOD'];

// GET - Lấy danh sách sản phẩm
if ($method === 'GET') {
    $result = $conn->query("SELECT id, name, description as `desc`, image, price FROM products ORDER BY id");
    $rows = [];
    while ($row = $result->fetch_assoc()) {
        $row['price'] = (int)$row['price'];
        $rows[] = $row;
    }
    echo json_encode($rows);
    exit;
}

// PUT - Cập nhật giá
if ($method === 'PUT') {
    $input = json_decode(file_get_contents('php://input'), true);
    $id = $conn->real_escape_string($input['id'] ?? '');
    $price = (int)($input['price'] ?? 0);
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing id']);
        exit;
    }
    $stmt = $conn->prepare("UPDATE products SET price = ? WHERE id = ?");
    $stmt->bind_param('is', $price, $id);
    if ($stmt->execute() && $stmt->affected_rows > 0) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }
    exit;
}

// DELETE - Xóa sản phẩm
if ($method === 'DELETE') {
    $input = json_decode(file_get_contents('php://input'), true);
    $id = $conn->real_escape_string($input['id'] ?? $_GET['id'] ?? '');
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing id']);
        exit;
    }
    $stmt = $conn->prepare("DELETE FROM products WHERE id = ?");
    $stmt->bind_param('s', $id);
    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
