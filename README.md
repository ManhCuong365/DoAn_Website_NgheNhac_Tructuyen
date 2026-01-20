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
```bash
cp .env.example .env
```
> Ví dụ
```bash
PORT=7000
```

### 3.Cài đặt môi trường:
- Cài đặt **XAMPP** để sử dụng MySQL
- Khởi động **Apache** và **MySQL** trong XAMPP Control Panel
- Tạo database trong MySQL (ví dụ: `gen_music`)

### 3. Khởi tạo cơ sở dữ liệu với Sequelize
- Dự án sử dụng **Sequelize ORM** để quản lý và thao tác với cơ sở dữ liệu MySQL. Cấu trúc thư mục Sequelize được tùy chỉnh theo project (`src/models`, `src/migrations`, `src/config`).
> Trong trường hợp gặp lỗi khi chạy Sequelize CLI, vui lòng tham khảo tài liệu chính thức của Sequelize để biết thêm chi tiết.
- Chạy migrations (tạo bảng trong database)
```bash
npx sequelize-cli db:migrate --migrations-path ./src/migrations --config ./src/config/config.json
```
- Tạo Model + Migration (tạo bảng mới)
```bash
npx sequelize-cli model:generate \
--name <TenModel> \
--attributes <ten_cot:kieudulieu> \
--models-path ./src/models \
--migrations-path ./src/migrations
```
> Ví dụ
```bash
npx sequelize-cli model:generate \
--name Albums \
--attributes title:string,img:string,artist_id:integer,release_date:integer \
--models-path ./src/models \
--migrations-path ./src/migrations
```
- Xóa toàn bộ bảng (rollback tất cả migrations)
```bash
npx sequelize-cli db:migrate:undo:all --migrations-path ./src/migrations --config ./src/config/config.json
```
- Hoàn tác migration gần nhất
```bash
npx sequelize-cli db:migrate:undo --migrations-path ./src/migrations --config ./src/config/config.json
```

### 4.Khởi động Server:
```bash
npm start
```

### 5.Truy cập ứng dụng:
- Mở trình duyệt và truy cập: http://localhost:3000/ (hoặc cổng mà bạn đã thiết lập)

## Tác giả
- Sinh viên thực hiện: Bùi Mạnh Cường
- Lớp/MSV: DCCTCT66_07E - 2121050009
- Giảng viên hướng dẫn: Lê Hồng Anh
- Github: https://github.com/ManhCuong365/DoAn_Website_NgheNhac_Tructuyen.git
