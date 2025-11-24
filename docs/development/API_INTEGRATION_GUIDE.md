# Hướng dẫn Tích hợp API (Từng bước)

Tài liệu này hướng dẫn bạn cách thay thế dữ liệu giả (mock data) bằng API thực tế trong dự án.

## Bước 1: Cấu hình Môi trường (.env)

Đầu tiên, bạn cần khai báo địa chỉ API của mình trong biến môi trường.

1.  Tạo (hoặc mở) file `.env` ở thư mục gốc dự án.
2.  Thêm dòng sau vào file:

```env
NEXT_PUBLIC_API_URL=https://api.example.com/v1
```
*(Thay thế `https://api.example.com/v1` bằng đường dẫn API thực tế của bạn)*

---

## Bước 2: Tạo Service Gọi API (`src/services`)

Chúng ta sẽ tạo một nơi tập trung để quản lý việc gọi API.

1.  Tạo thư mục `src/services` nếu chưa có.
2.  Tạo file `src/services/api.ts` để cấu hình `axios` (hoặc `fetch`):

```typescript
// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm interceptor nếu cần (để xử lý token, lỗi chung)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api;
```

3.  Cài đặt axios nếu chưa có: `pnpm add axios`

---

## Bước 3: Định nghĩa Hàm Lấy Dữ liệu

Tạo các file service riêng cho từng chức năng (ví dụ: Menu, User, Auth).

Ví dụ với Menu: Tạo file `src/services/menuService.ts`:

```typescript
// src/services/menuService.ts
import api from './api';
import { MenuItem } from '@/types/menu';

export const menuService = {
  getMenu: async (): Promise<MenuItem[]> => {
    const response = await api.get('/menu'); // Gọi đến endpoint /menu
    return response.data; 
  },
};
```

---

## Bước 4: Cập nhật Store (Zustand)

Sửa file `src/stores/useUIStore.ts` để sử dụng service vừa tạo thay vì import file JSON.

Mở `src/stores/useUIStore.ts` và sửa hàm `loadMenuData`:

```typescript
// src/stores/useUIStore.ts
import { menuService } from '@/services/menuService'; // Import service

// ... bên trong create<UIState> ...

  loadMenuData: async () => {
    const { menuItems } = get();
    if (menuItems.length > 0) return;
    
    set({ menuLoading: true });
    
    try {
      // GỌI API THỰC TẾ
      const items = await menuService.getMenu();
      set({ menuItems: items });
      
    } catch (error) {
      console.error('Failed to load menu data:', error);
      set({ menuItems: [] });
    } finally {
      set({ menuLoading: false });
    }
  },
```

---

## Bước 5: Kiểm tra

1.  Chạy dự án: `pnpm run dev`
2.  Mở trình duyệt và kiểm tra tab **Network** trong Developer Tools.
3.  Bạn sẽ thấy request gửi đến `https://api.example.com/v1/menu` thay vì đọc file local.
