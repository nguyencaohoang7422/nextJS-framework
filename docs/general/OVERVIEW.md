# Tổng Quan Dự Án (Project Overview)

## 🎯 Mục Tiêu
**My Framework** là một nền tảng phát triển ứng dụng web hiện đại, được thiết kế để cung cấp một kiến trúc vững chắc, dễ mở rộng và bảo trì. Mục tiêu chính là giúp các developer tập trung vào việc xây dựng tính năng thay vì lo lắng về cấu hình và kiến trúc cơ bản.

## 🏗️ Kiến Trúc Tổng Quan
Dự án sử dụng kiến trúc **Modular**, chia nhỏ ứng dụng thành các module độc lập (Feature Modules) xoay quanh một lõi vững chắc (Core).

### Các Thành Phần Chính:
1.  **Core System**:
    *   **Authentication**: Hệ thống đăng nhập, phân quyền bảo mật.
    *   **State Management (Zustand)**: Quản lý trạng thái ứng dụng tập trung và hiệu quả.
    *   **Routing**: Điều hướng thông minh với Middleware bảo vệ các trang nội bộ.
    *   **Localization (i18n)**: Hỗ trợ đa ngôn ngữ.

2.  **Feature Modules**:
    *   Các tính năng nghiệp vụ được đóng gói thành các module riêng biệt (ví dụ: Dashboard, Users, Reports).
    *   Mỗi module có thể được tải động (lazy loading) để tối ưu hiệu suất.

3.  **Shared Resources**:
    *   Thư viện UI components dùng chung.
    *   Các tiện ích (utils), hooks, và constants.

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

| Lĩnh Vực | Công Nghệ | Phiên Bản | Ghi Chú |
| :--- | :--- | :--- | :--- |
| **Framework** | **Next.js** | 16.0.3 | App Router, Server Components |
| **Language** | **TypeScript** | 5.x | Type safety |
| **UI Library** | **React** | 19.2.0 | |
| **Styling** | **Tailwind CSS** | 4.1.17 | Utility-first CSS |
| **State Mngt** | **Zustand** | 5.0.8 | Client state |
| **Server State**| **React Query** | 5.90.10 | Data fetching & caching |
| **Testing** | **Vitest** | 4.0.13 | Unit & Integration testing |
| **API Mocking** | **MSW** | Latest | Mock API cho development/testing |

## 🔄 Luồng Hoạt Động Cơ Bản (Core Flows)

### 1. Authentication Flow
1.  User nhập thông tin đăng nhập.
2.  Hệ thống gọi API xác thực.
3.  Nếu thành công:
    *   Lưu token vào Cookie (HttpOnly).
    *   Cập nhật thông tin User vào Zustand Store.
    *   Chuyển hướng vào Dashboard.
4.  Middleware sẽ kiểm tra token ở mỗi request để bảo vệ các trang nội bộ.

### 2. Data Flow
*   **Server Data**: Được fetch và cache bởi React Query.
*   **Client State**: Được quản lý bởi Zustand (ví dụ: trạng thái Sidebar đóng/mở, Theme sáng/tối).
*   **Module Loading**: Các module nghiệp vụ chỉ được tải khi người dùng truy cập vào route tương ứng.

## 📂 Cấu Trúc Thư Mục Cấp Cao

```
my-framework/
├── src/
│   ├── app/            # Next.js App Router (Pages & Layouts)
│   ├── features/       # Các module tính năng (Auth, Users...)
│   ├── shared/         # Tài nguyên dùng chung (Components, Utils)
│   ├── stores/         # Zustand Store & Module Registry
│   └── ...
├── docs/               # Tài liệu dự án
└── public/             # Static assets (Images, Locales)
```

---
**Tiếp theo:** Xem hướng dẫn [Cài Đặt & Bắt Đầu](./GETTING_STARTED.md) để chạy dự án.
