# Navigation Service - Hướng dẫn sử dụng

## Tổng quan

`navigationService` là một dịch vụ singleton cho phép bạn gọi điều hướng (`router.push`) từ bất kỳ đâu trong ứng dụng - không chỉ từ các React component. Điều này đặc biệt hữu ích khi bạn cần điều hướng từ:

- Services/API clients
- Utility functions
- Event handlers
- Middleware
- Non-React code

## Cài đặt

Dịch vụ đã được cài đặt tự động trong `src/app/layout.tsx` thông qua `NavigationProvider`.

## Sử dụng cơ bản

### 1. Trong React Components

```tsx
import { navigationService } from '@/lib/navigation';

export function MyComponent() {
  const handleClick = () => {
    // Điều hướng đến dashboard
    navigationService.push('/dashboard');
  };

  return <button onClick={handleClick}>Go to Dashboard</button>;
}
```

### 2. Trong Services

```typescript
// src/services/auth.service.ts
import { navigationService } from '@/lib/navigation';

export class AuthService {
  async logout() {
    // Clear tokens
    localStorage.removeItem('token');
    
    // Điều hướng về trang login
    navigationService.push('/login');
  }
}
```

### 3. Trong API Client

```typescript
// src/lib/api-client.ts
import { navigationService } from '@/lib/navigation';

export async function apiRequest(url: string) {
  const response = await fetch(url);
  
  if (response.status === 401) {
    // Tự động điều hướng về login khi unauthorized
    navigationService.push('/login');
    throw new Error('Unauthorized');
  }
  
  return response.json();
}
```

### 4. Trong Utility Functions

```typescript
// src/utils/error-handler.ts
import { navigationService } from '@/lib/navigation';

export function handleError(error: Error) {
  if (error.message === 'Session expired') {
    // Điều hướng về login khi session hết hạn
    navigationService.push('/login');
  }
}
```

## API Reference

### `push(href: string, options?: { scroll?: boolean })`
Điều hướng đến route mới.

```typescript
navigationService.push('/dashboard');
navigationService.push('/profile', { scroll: false });
```

### `replace(href: string, options?: { scroll?: boolean })`
Thay thế route hiện tại.

```typescript
navigationService.replace('/login');
```

### `back()`
Quay lại trang trước trong lịch sử.

```typescript
navigationService.back();
```

### `forward()`
Tiến tới trang tiếp theo trong lịch sử.

```typescript
navigationService.forward();
```

### `refresh()`
Làm mới route hiện tại.

```typescript
navigationService.refresh();
```

### `prefetch(href: string)`
Prefetch một route để tăng tốc độ điều hướng.

```typescript
navigationService.prefetch('/dashboard');
```

## Ví dụ thực tế

### Ví dụ 1: Auto-redirect sau khi đăng nhập thành công

```typescript
// src/features/auth/services/login.service.ts
import { navigationService } from '@/lib/navigation';

export async function loginUser(credentials: LoginCredentials) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
  
  const data = await response.json();
  
  if (data.success) {
    // Lưu token
    localStorage.setItem('token', data.token);
    
    // Điều hướng đến dashboard
    navigationService.push('/dashboard');
  }
  
  return data;
}
```

### Ví dụ 2: Xử lý lỗi 403 Forbidden

```typescript
// src/lib/api-client.ts
import { navigationService } from '@/lib/navigation';

export async function apiCall(endpoint: string) {
  const response = await fetch(endpoint);
  
  if (response.status === 403) {
    // Điều hướng về trang không có quyền
    navigationService.push('/forbidden');
    throw new Error('Access denied');
  }
  
  return response.json();
}
```

### Ví dụ 3: Timeout và redirect

```typescript
// src/utils/session-timeout.ts
import { navigationService } from '@/lib/navigation';

export function setupSessionTimeout() {
  // Sau 30 phút không hoạt động
  setTimeout(() => {
    localStorage.removeItem('token');
    navigationService.push('/login?reason=timeout');
  }, 30 * 60 * 1000);
}
```

## Lưu ý

1. **Không cần `useRouter` nữa**: Bạn có thể sử dụng `navigationService` thay vì `useRouter()` hook trong các component.

2. **Singleton Pattern**: `navigationService` là một singleton, nên bạn luôn sử dụng cùng một instance trong toàn bộ ứng dụng.

3. **Initialization**: Dịch vụ được khởi tạo tự động thông qua `NavigationProvider` trong root layout.

4. **Error Handling**: Nếu router chưa được khởi tạo, các method sẽ log error ra console.

## So sánh với useRouter

### Trước (chỉ trong component):
```tsx
'use client';
import { useRouter } from 'next/navigation';

export function MyComponent() {
  const router = useRouter();
  
  const handleClick = () => {
    router.push('/dashboard');
  };
  
  return <button onClick={handleClick}>Click</button>;
}
```

### Sau (dùng được ở mọi nơi):
```tsx
import { navigationService } from '@/lib/navigation';

export function MyComponent() {
  const handleClick = () => {
    navigationService.push('/dashboard');
  };
  
  return <button onClick={handleClick}>Click</button>;
}

// Và bây giờ có thể dùng trong services
export async function myService() {
  // Do something
  navigationService.push('/success');
}
```
