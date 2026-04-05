# 🛒 ShopAdmin – Hệ Thống Quản Lý Bán Hàng (JavaScript Thuần - K18)

## 📌 Giới thiệu

**ShopAdmin** là dự án xây dựng hệ thống quản lý bán hàng sử dụng JavaScript thuần (Vanilla JS), kết nối REST API thực tế.

Dự án được thực hiện bởi sinh viên K18 nhằm mục tiêu:
- Thực hành thao tác DOM
- Xây dựng CRUD bằng JavaScript thuần
- Kết nối REST API với `fetch()` và xử lý bất đồng bộ (async/await)
- Xác thực người dùng với JWT (JSON Web Token)
- Xây dựng giao diện Admin Dashboard thực tế

---

## 🚀 Tính năng chính

### 🔐 Đăng nhập (JWT Authentication)
- Đăng nhập bằng email/password
- Lưu JWT token (accessToken + refreshToken)
- Tự động refresh token khi hết hạn
- Đăng xuất

### 📊 Dashboard (Tổng quan)
- Hiển thị tổng doanh thu, đơn hàng, sản phẩm, khách hàng
- Biểu đồ doanh thu 7 ngày gần nhất (Chart.js)
- Biểu đồ cơ cấu sản phẩm theo danh mục
- Bảng đơn hàng gần đây
- Bảng sản phẩm sắp hết hàng
- Quick links truy cập nhanh

### 📦 Quản lý sản phẩm
- Thêm / Sửa / Xóa sản phẩm (CRUD qua API)
- Tìm kiếm theo tên, mã SKU
- Lọc theo danh mục
- Upload hình ảnh sản phẩm qua API
- Liên kết danh mục (Categories)

### 🏷️ Quản lý danh mục
- Thêm / Sửa / Xóa danh mục
- Giao diện card grid trực quan

### 🧾 Quản lý đơn hàng
- Tạo đơn hàng mới (chọn khách hàng + sản phẩm từ API)
- Cập nhật trạng thái đơn hàng (pending / delivering / done / cancel)
- Xem chi tiết đơn hàng
- Xóa đơn hàng
- Tìm kiếm, lọc theo tab trạng thái

### 👥 Quản lý khách hàng
- Thêm / Sửa / Xóa khách hàng (CRUD qua API)
- Tìm kiếm theo tên, email, SĐT
- Lọc theo hạng thành viên (GOLD / SILVER / BRONZE)
- Thống kê tổng chi tiêu

### 📈 Báo cáo doanh thu
- Lọc theo khoảng ngày
- Thống kê doanh thu, lợi nhuận
- Biểu đồ doanh thu theo ngày
- Biểu đồ cơ cấu sản phẩm
- Bảng danh sách sản phẩm với tình trạng tồn kho

---

## 🛠 Công nghệ sử dụng

- HTML5
- CSS3 (Responsive, CSS Variables, Flexbox, Grid)
- JavaScript ES6+ (async/await, fetch API, DOM manipulation)
- REST API (F8 API)
- JWT Authentication
- Chart.js (biểu đồ)
- Font Awesome 6 (icons)

---

## 📁 Cấu trúc thư mục

```
DuAn03Binh/
├── README.md
└── app/
    ├── api.js                 # API layer – kết nối REST API
    ├── style.css              # CSS chung
    ├── login.html             # Trang đăng nhập
    ├── index.html             # Dashboard
    ├── products/
    │   ├── index.html         # Danh sách sản phẩm
    │   └── create.html        # Thêm / Sửa sản phẩm
    ├── orders/
    │   └── index.html         # Quản lý đơn hàng
    ├── customers/
    │   └── index.html         # Quản lý khách hàng
    ├── categories/
    │   └── index.html         # Quản lý danh mục
    └── reports/
        └── index.html         # Báo cáo doanh thu
```

---

## 🔗 API Endpoints (F8 API)

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/auth/signin` | Đăng nhập |
| POST | `/auth/refresh-token` | Refresh token |
| GET/POST | `/products` | Lấy / Tạo sản phẩm |
| GET/PUT/DELETE | `/products/{id}` | Chi tiết / Sửa / Xóa SP |
| GET/POST | `/orders` | Lấy / Tạo đơn hàng |
| PUT/DELETE | `/orders/{id}` | Sửa / Xóa đơn hàng |
| GET/POST | `/customers` | Lấy / Tạo khách hàng |
| PUT/DELETE | `/customers/{id}` | Sửa / Xóa khách hàng |
| GET/POST | `/categories` | Lấy / Tạo danh mục |
| PUT/DELETE | `/categories/{id}` | Sửa / Xóa danh mục |
| POST | `/images` | Upload hình ảnh |
