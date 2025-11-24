# Hướng Dẫn Phát Triển Frontend (Frontend Development Guide)

## 🏗️ Component Architecture

Dự án tuân theo nguyên tắc **Atomic Design** (được điều chỉnh) và chia component theo phạm vi sử dụng:

### 1. Shared Components (`src/shared/components`)
*   Là các component cơ bản, tái sử dụng cao, không chứa logic nghiệp vụ phức tạp.
*   Ví dụ: `Button`, `Input`, `Modal`, `Table`.
*   Nên được thiết kế để nhận props và render UI (Presentational Components).

### 2. Feature Components (`src/features/<module>/components`)
*   Là các component đặc thù cho một module cụ thể.
*   Có thể chứa logic nghiệp vụ và kết nối với Store/API của module đó.
*   Ví dụ: `LoginForm` (auth), `UserList` (users), `ReportChart` (reports).

### 3. Layout Components (`src/app/layout.tsx`, `src/shared/components/Sidebar.tsx`)
*   Định hình cấu trúc trang web (Header, Sidebar, Footer).

## 🎨 Styling (Tailwind CSS)

Chúng tôi sử dụng **Tailwind CSS v4** làm công cụ styling chính.

### Quy Tắc:
*   **Utility-first**: Ưu tiên sử dụng các class có sẵn của Tailwind.
*   **CSS Modules**: Sử dụng cho các style phức tạp hoặc cần scope riêng biệt (file `.module.css`).
*   **Global Styles**: Hạn chế viết CSS global trong `globals.css` trừ khi thiết lập base styles.

### Ví dụ:
```tsx
// ✅ Good
<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Click me
</button>

// ❌ Avoid (inline styles)
<button style={{ backgroundColor: 'blue', color: 'white' }}>...</button>
```

## 🌐 Internationalization (i18n)

Dự án hỗ trợ đa ngôn ngữ thông qua `react-i18next`.

### Cách Thêm Ngôn Ngữ Mới:
1.  Tạo file JSON mới trong `public/locales/<lang>/<namespace>.json`.
2.  Thêm key và bản dịch.

### Cách Sử Dụng trong Component:
```tsx
import { useTrans } from '@/hooks/useTrans';

export function MyComponent() {
  const { trans } = useTrans();
  
  return <h1>{trans('common.welcome')}</h1>;
}
```

## 📄 Tạo Trang Mới (Adding Pages)

1.  Tạo thư mục mới trong `src/app/`.
2.  Tạo file `page.tsx`.
3.  (Tùy chọn) Kết nối với Module Store nếu trang cần tải dữ liệu động.

```tsx
// src/app/my-page/page.tsx
'use client';

export default function MyPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">My New Page</h1>
    </div>
  );
}
```

---
**Xem thêm:** [Quản Lý State](./STATE_MANAGEMENT.md) để hiểu cách xử lý dữ liệu.
