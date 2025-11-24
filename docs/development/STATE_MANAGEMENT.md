# Quản Lý State (State Management)

Dự án sử dụng kết hợp **Zustand** (cho Client State) và **React Query** (cho Server State).

## 1. Zustand Architecture (Client State)

Hệ thống Zustand được thiết kế theo mô hình **Modular**, cho phép chia nhỏ store thành các phần độc lập và tải động (lazy load).

### Cấu Trúc Store Chính (`src/stores/index.ts`)
Store chính là nơi hợp nhất tất cả các slices:
*   **Auth Slice**: Thông tin user, token.
*   **UI Slice**: Trạng thái Sidebar, Header, Menu.
*   **App Slice**: Theme, Language, Global Settings.
*   **Module Registry**: Quản lý việc tải các module động.

### Cách Sử Dụng Core Slices
Sử dụng các hooks có sẵn để truy cập state:

```typescript
import { useAuth, useUI, useApp } from '@/stores';

function MyComponent() {
  const { user } = useAuth();             // Lấy thông tin user
  const { toggleSidebar } = useUI();      // Điều khiển sidebar
  const { theme } = useApp();             // Lấy theme hiện tại
  
  // ...
}
```

### Dynamic Modules (Feature Stores)
Các module nghiệp vụ (như Dashboard, Users) có store riêng và chỉ được load khi cần thiết.

**Cách dùng trong Page:**
```typescript
import { useModule } from '@/stores/hooks/useModule';
import { loadDashboardModule } from '@/stores/modules/dashboard/dashboardSlice';

function DashboardPage() {
  // Tự động load module dashboard khi component mount
  const { loaded, loading } = useModule('dashboard', loadDashboardModule);

  if (loading) return <Loading />;
  
  return <DashboardContent />;
}
```

## 2. React Query (Server State)

Sử dụng React Query để fetch, cache và đồng bộ dữ liệu từ Server.

### Quy Tắc:
*   Tạo custom hooks cho mỗi API call (ví dụ: `useUsers`, `useLogin`).
*   Đặt query keys trong `src/shared/constants/index.ts` để dễ quản lý.

### Ví dụ:
```typescript
// src/features/users/hooks/useUsers.ts
import { useQuery } from '@tanstack/react-query';
import { userApi } from '@/shared/api/users';
import { QUERY_KEYS } from '@/shared/constants';

export function useUsers(filters) {
  return useQuery({
    queryKey: QUERY_KEYS.users.list(filters),
    queryFn: () => userApi.getList(filters),
  });
}
```

## ⚠️ Migration Notes (Quan Trọng)

Hiện tại dự án đang trong quá trình chuyển đổi sang kiến trúc mới.
*   **Cũ**: `useUIStore`, `useAuthStore` (đang dần loại bỏ).
*   **Mới**: `useStore` (thông qua `useUI`, `useAuth`).

Khi phát triển mới, **BẮT BUỘC** sử dụng kiến trúc mới.

---
**Chi tiết chuyên sâu:** Xem [ZUSTAND_ARCHITECTURE.md](../ZUSTAND_ARCHITECTURE.md)
