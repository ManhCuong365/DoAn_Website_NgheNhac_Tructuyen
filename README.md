# DoAn_Website_NgheNhac_Tructuyen
## Giới Thiệu
- Đây là ứng dụng website nghe nhạc trực tuyến, được phát triển nhằm mang lại trải nghiệm quản lý và thưởng thức nhạc cá nhân tốt nhất. Dự án sử dụng các công nghệ web hiện đại như Node.js, Express.js và tuân thủ kiến trúc MVC (Model-View-Controller) để dễ dàng bảo trì và mở rộng.

## Tính Năng Chính
- Phát nhạc: Nghe nhạc trực tuyến với giao diện thân thiện, ổn định.
- Quản lý Thư viện Cá nhân:
- Lưu Bài Hát Yêu Thích: Người dùng có thể đánh dấu và lưu các bài hát mình yêu thích vào danh sách cá nhân.
- Tìm kiếm: Tìm kiếm bài hát, album, nghệ sĩ và thể loại.
- Tài khoản: Đăng ký, Đăng nhập và quản lý thông tin người dùng.
- Phân loại: Duyệt và sắp xếp nhạc theo Album, Nghệ sĩ, Thể loại (dựa trên các Models trong thư mục models/).

## Công Nghệ Sử Dụng
- Backend: Node.js (Express.js)
- Frontend: HTML, CSS, JavaScript (sử dụng EJS cho View Engine)
- Cơ sở dữ liệu: MySQL
- Kiến trúc: Mô hình MVC (Model-View-Controller)

## Hướng dẫn Cài Đặt & Khởi chạy
Giả định bạn đã cài đặt Node.js và MySQL trên máy.
### 1.Cài đặt các gói phụ thuộc (Dependencies):
```bash
npm install
```

### 2.Cấu hình Môi trường:
- Tạo file .env từ .env.example.
- Cập nhật thông tin kết nối database (MySQL) của bạn trong file .env.

### 3.Khởi động Server:
```bash
npm start
```

### 4.Truy cập ứng dụng:
- Mở trình duyệt và truy cập: http://localhost:3000/ (hoặc cổng mà bạn đã thiết lập)

## Ghi Chú Phát Triển
- Dự án đang trong quá trình phát triển và hoàn thiện.
- Logic nghiệp vụ và tương tác database được quản lý tập trung trong các thư mục services/, controllers/, và models/.