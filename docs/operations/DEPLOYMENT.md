# Hướng Dẫn Triển Khai (Deployment Guide)

## 📦 Quy Trình Build

Dự án sử dụng Next.js build system. Quy trình build bao gồm các bước:

1.  **Linting**: Kiểm tra lỗi cú pháp và code style.
2.  **Type Checking**: Kiểm tra lỗi TypeScript.
3.  **Static Generation**: Tạo các trang tĩnh (SSG) cho các route không động.
4.  **Optimization**: Tối ưu hóa images, fonts, scripts.

### Lệnh Build:
```bash
pnpm build
```

### ⚠️ Lưu Ý Quan Trọng Khi Build

Gần đây dự án đã khắc phục một số lỗi build quan trọng, hãy lưu ý:

1.  **i18n & Static Generation**:
    *   Chúng ta sử dụng `i18next-resources-to-backend` để load translations.
    *   **Không** sử dụng `i18next-http-backend` vì nó gây timeout khi build static pages (do server chưa chạy để phục vụ file JSON).

2.  **API Timeouts**:
    *   Trong quá trình build (Static Generation), các component như `Sidebar` có thể gọi API (ví dụ `/api/menu`).
    *   Đã thêm cơ chế **Fallback** và **Timeout (5s)**: Nếu API không phản hồi, build process sẽ tự động dùng mock data thay vì treo mãi mãi.

## 🚀 Triển Khai (Deploy)

### Vercel (Khuyến nghị)
Dự án Next.js tương thích tốt nhất với Vercel.
1.  Kết nối Github Repo với Vercel.
2.  Cấu hình Environment Variables trong Project Settings.
3.  Vercel sẽ tự động detect và build.

### Docker / Self-hosted
1.  Build image:
    ```dockerfile
    FROM node:20-alpine
    WORKDIR /app
    COPY . .
    RUN npm install -g pnpm
    RUN pnpm install
    RUN pnpm build
    CMD ["pnpm", "start"]
    ```
2.  Run container.

## 🔧 Environment Variables

Đảm bảo các biến môi trường sau được cấu hình trên server:

| Biến | Mô Tả | Ví Dụ |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_API_BASE` | URL của Backend API | `https://api.example.com` |
| `JWT_SECRET` | Secret key để verify token (nếu dùng NextAuth/Custom) | `super-secret-key` |
| `NODE_ENV` | Môi trường (production/development) | `production` |

## 🔍 Kiểm Tra Sau Deploy

Sau khi deploy, hãy kiểm tra:
1.  **Đăng nhập**: Thử login/logout.
2.  **Điều hướng**: Chuyển trang qua lại giữa Dashboard, Users.
3.  **Reload**: F5 lại trang ở các route con (để check cấu hình server rewrite).
4.  **Đa ngôn ngữ**: Thử đổi ngôn ngữ Anh/Việt.
