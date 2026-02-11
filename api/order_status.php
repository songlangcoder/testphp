<?php
require_once 'config.php';
$conn = getConnection();

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$orderId = $conn->real_escape_string($input['orderId'] ?? '');
$status = $conn->real_escape_string($input['status'] ?? '');
$allowed = ['pending', 'confirmed', 'shipping', 'delivered'];
if (!$orderId || !in_array($status, $allowed)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid orderId or status']);
    exit;
}

$stmt = $conn->prepare("UPDATE orders SET status = ? WHERE id = ?");
$stmt->bind_param('ss', $status, $orderId);
if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
