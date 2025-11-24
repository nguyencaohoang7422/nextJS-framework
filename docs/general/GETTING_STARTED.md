# Hướng Dẫn Cài Đặt & Bắt Đầu (Getting Started)

Tài liệu này hướng dẫn cách thiết lập môi trường phát triển và chạy dự án **My Framework** trên máy local.

## 📋 Yêu Cầu Hệ Thống (Prerequisites)

Trước khi bắt đầu, hãy đảm bảo máy tính của bạn đã cài đặt:

*   **Node.js**: Phiên bản 20.x trở lên.
*   **Package Manager**: `pnpm` (Khuyến nghị) hoặc `npm`/`yarn`.
*   **Git**: Để quản lý source code.
*   **VS Code**: Editor khuyến nghị (cài thêm extension ESLint, Prettier, Tailwind CSS).

## 🚀 Các Bước Cài Đặt

### 1. Clone Dự Án
```bash
git clone <repository-url>
cd my-framework
```

### 2. Cài Đặt Dependencies
Sử dụng `pnpm` để cài đặt các thư viện cần thiết:
```bash
pnpm install
```

### 3. Thiết Lập Biến Môi Trường
Copy file cấu hình mẫu `.env.example` (nếu có) hoặc tạo file `.env.local` tại thư mục gốc:

```env
# .env.local

# API Configuration
NEXT_PUBLIC_API_BASE=http://localhost:3000

# Authentication (nếu cần config thêm)
# JWT_SECRET=...
```

### 4. Chạy Development Server
Khởi động server ở chế độ development:
```bash
pnpm dev
```
Truy cập [http://localhost:3000](http://localhost:3000) trên trình duyệt. Bạn sẽ thấy trang Login.

## 🛠️ Các Lệnh Thường Dùng (Scripts)

| Lệnh | Mô Tả |
| :--- | :--- |
| `pnpm dev` | Chạy server development (có Hot Reload). |
| `pnpm build` | Build dự án cho môi trường Production. |
| `pnpm start` | Chạy server production (sau khi build). |
| `pnpm lint` | Kiểm tra lỗi cú pháp và code style (ESLint). |
| `pnpm test` | Chạy Unit Tests (Vitest). |
| `pnpm test:ui` | Chạy Tests với giao diện trực quan. |

## 🧪 Chạy Thử Nghiệm (Testing)

Dự án sử dụng Vitest cho testing. Để đảm bảo mọi thứ hoạt động đúng sau khi cài đặt:

```bash
pnpm test
```
Nếu tất cả tests đều **PASS**, môi trường của bạn đã sẵn sàng!

## ⚠️ Lưu Ý Quan Trọng

*   **Mock Data**: Trong môi trường development, một số API (như Menu) có thể sử dụng dữ liệu giả (mock) nếu chưa có Backend thực tế.
*   **Authentication**: Bạn có thể đăng nhập bằng tài khoản test (thường được cấu hình trong mock handlers hoặc database seed).

---
**Tiếp theo:** Xem [Hướng Dẫn Phát Triển (Frontend)](../development/FRONTEND_GUIDE.md) để bắt đầu code.
