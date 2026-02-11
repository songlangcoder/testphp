<?php
/**
 * Chạy 1 lần để tạo database và bảng
 * Truy cập: http://localhost/songlangcoder-web4-main/api/setup.php
 */
$conn = new mysqli('127.0.0.1', 'root', '');
$conn->set_charset('utf8mb4');

if ($conn->connect_error) {
    die('Kết nối thất bại. Kiểm tra XAMPP đã bật MySQL chưa.');
}

$conn->query("CREATE DATABASE IF NOT EXISTS beauty_nail CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
$conn->select_db('beauty_nail');

$sql = "
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    price INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(30) PRIMARY KEY,
    customer_name VARCHAR(255),
    customer_phone VARCHAR(50),
    customer_email VARCHAR(255),
    customer_address TEXT,
    note TEXT,
    total INT DEFAULT 0,
    payment_method VARCHAR(50),
    status VARCHAR(30) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(30) NOT NULL,
    product_id VARCHAR(20),
    product_name VARCHAR(255),
    price INT,
    qty INT,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

INSERT INTO products (id, name, description, image, price) VALUES
('p1', 'Acrylic Powder', 'Bột đắp móng cao cấp, màu trắng tự nhiên.', 'w7.png', 120000),
('p2', 'Gel Nail Polish', 'Sơn gel siêu bền, nhiều màu sắc lựa chọn.', 'w8.png', 95000),
('p3', 'Dip Powder', 'Bột nhúng móng, dễ sử dụng cho người mới.', 'w9.png', 150000),
('p4', 'Gelly Tips', 'Mẹo nối móng nhanh, chắc chắn và tự nhiên.', 'w10.png', 80000),
('p5', 'Nail Art Stickers', 'Miếng dán trang trí móng nghệ thuật.', 'w11.png', 35000),
('p6', 'Nail Brush Set', 'Bộ cọ vẽ móng chuyên nghiệp 5 món.', 'w12.jpg', 110000),
('p7', 'UV/LED Lamp', 'Đèn sấy gel UV/LED 48W, bảo hành 6 tháng.', 'w13.png', 320000),
('p8', 'Cuticle Oil', 'Dầu dưỡng móng, giúp móng chắc khỏe.', 'w14.png', 60000),
('p9', 'Nail File Set', 'Bộ dũa móng 6 chiếc, nhiều kích cỡ.', 'w15.png', 45000),
('p10', 'Nail Clipper', 'Bấm móng tay thép không gỉ, sắc bén.', 'w16.png', 25000),
('p11', 'Nail Buffer Block', 'Khối buffer làm bóng móng 4 mặt.', 'w17.png', 20000),
('p12', 'Nail Tips Box', 'Hộp 100 tips móng tay giả nhiều size.', 'w18.png', 70000)
ON DUPLICATE KEY UPDATE name=VALUES(name), description=VALUES(description), image=VALUES(image), price=VALUES(price);
";

$conn->multi_query($sql);
while ($conn->more_results()) { $conn->next_result(); }

echo '<h1>Setup thành công!</h1>';
echo '<p>Database beauty_nail đã được tạo. <a href="../index.html">Về trang chủ</a></p>';
