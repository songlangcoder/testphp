# Hướng dẫn chạy website với XAMPP

## Bước 1: Cài đặt XAMPP
- Tải XAMPP từ https://www.apachefriends.org/
- Cài đặt và mở **XAMPP Control Panel**

## Bước 2: Copy dự án vào htdocs
Copy toàn bộ thư mục dự án vào:
```
C:\xampp\htdocs\songlangcoder-web4-main\
```

## Bước 3: Bật Apache và MySQL
Trong XAMPP Control Panel, nhấn **Start** cho:
- **Apache**
- **MySQL**

## Bước 4: Tạo Database
Mở trình duyệt và truy cập:
```
http://localhost/songlangcoder-web4-main/api/setup.php
```
Hoặc nếu đổi tên thư mục:
```
http://localhost/[tên-thư-mục]/api/setup.php
```
Khi thấy "Setup thành công!" là xong.

## Bước 5: Sử dụng website
Truy cập:
```
http://localhost/songlangcoder-web4-main/
```

## Cấu hình MySQL (nếu cần)
Mặc định XAMPP:
- Host: `127.0.0.1`
- User: `root`
- Password: *(để trống)*
- Database: `beauty_nail` (tự tạo khi chạy setup)

Nếu đổi mật khẩu MySQL, sửa file `api/config.php`.
