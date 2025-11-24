# Hướng Dẫn Backend & API (Backend API Guide)

Mặc dù đây là dự án Frontend (Next.js), chúng ta có sử dụng Next.js API Routes để giả lập Backend hoặc làm Proxy.

## 📡 API Routes Structure (`src/app/api/`)

Các API routes được tổ chức theo cấu trúc RESTful:

```
src/app/api/
├── auth/
│   ├── login/route.ts      # POST /api/auth/login
│   ├── logout/route.ts     # POST /api/auth/logout
│   └── me/route.ts         # GET /api/auth/me
├── menu/
│   └── route.ts            # GET /api/menu
└── users/
    └── route.ts            # GET /api/users
```

## 🔐 Authentication Flow

Hệ thống sử dụng cơ chế **Token-based Authentication** (JWT) lưu trong **HttpOnly Cookie**.

1.  **Login**:
    *   Client gửi `username`/`password` tới `/api/auth/login`.
    *   Server xác thực, tạo JWT token.
    *   Server trả về `Set-Cookie` header chứa token.

2.  **Verify (Me)**:
    *   Client gọi `/api/auth/me`.
    *   Browser tự động gửi Cookie kèm request.
    *   Server verify token từ Cookie và trả về thông tin User.

3.  **Logout**:
    *   Client gọi `/api/auth/logout`.
    *   Server trả về `Set-Cookie` để xóa token (max-age=0).

## 🛠️ Mock Data

Trong môi trường Development, chúng ta sử dụng Mock Data để phát triển mà không cần Backend thực tế.
*   File mock data nằm trong `src/data/`.
*   API Routes sẽ import data này và trả về response giả lập.

**Ví dụ (Menu API):**
```typescript
// src/app/api/menu/route.ts
import { menuData } from '@/data/menuData';

export async function GET() {
  // Giả lập delay mạng
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return NextResponse.json(menuData);
}
```

## 🔗 Kết Nối Backend Thực Tế

Để chuyển sang kết nối Backend thực tế:
1.  Cập nhật `NEXT_PUBLIC_API_BASE` trong `.env`.
2.  Sửa lại các API Client trong `src/shared/api/` để gọi tới URL thật thay vì Next.js API Routes (hoặc giữ Next.js API Routes làm Proxy).
