# Hướng Dẫn Testing Chi Tiết - My Framework

> **Tài liệu hướng dẫn testing toàn diện cho dự án Next.js 16 + React 19**

## 📚 Mục Lục

- [Giới Thiệu](#giới-thiệu)
- [Cài Đặt](#cài-đặt)
- [Chạy Tests](#chạy-tests)
- [Cấu Trúc Testing](#cấu-trúc-testing)
- [Viết Tests](#viết-tests)
  - [Component Tests](#component-tests)
  - [Hook Tests](#hook-tests)
  - [API Mocking](#api-mocking)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
- [FAQ](#faq)

---

## 🎯 Giới Thiệu

Dự án này sử dụng **stack testing hiện đại nhất** cho React/Next.js:

- **[Vitest](https://vitest.dev/)** - Test runner nhanh, tương thích ESM
- **[Testing Library](https://testing-library.com/)** - Testing theo best practices
- **[MSW](https://mswjs.io/)** - Mock Service Worker cho API mocking
- **[User Event](https://testing-library.com/docs/user-event/intro)** - Mô phỏng tương tác người dùng

### Tại Sao Chọn Vitest?

✅ **Nhanh hơn Jest** - Sử dụng Vite, HMR cho tests  
✅ **ESM Native** - Tương thích tốt với Next.js 16  
✅ **TypeScript Built-in** - Không cần cấu hình thêm  
✅ **UI Mode** - Giao diện đẹp để debug tests  
✅ **Coverage Built-in** - Không cần cài thêm package

---

## 📦 Cài Đặt

Tất cả dependencies đã được cài đặt sẵn. Nếu cần cài lại:

```bash
pnpm add -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom msw @vitejs/plugin-react
```

---

## 🚀 Chạy Tests

### Các Lệnh Cơ Bản

```bash
# Chạy tất cả tests (watch mode)
pnpm test

# Chạy tests với UI mode (recommended)
pnpm test:ui

# Chạy tests với coverage report
pnpm test:coverage

# Chạy tests một lần (CI mode)
pnpm vitest run

# Chạy một file test cụ thể
pnpm vitest src/shared/components/__tests__/LanguageSwitcher.test.tsx
```

### UI Mode (Khuyên Dùng)

```bash
pnpm test:ui
```

UI Mode sẽ mở browser với giao diện đẹp để:
- Xem danh sách tests
- Filter tests
- Xem kết quả chi tiết
- Debug tests
- Xem coverage

---

## 📁 Cấu Trúc Testing

```
my-framework/
├── vitest.config.ts          # Cấu hình Vitest
├── vitest.setup.ts           # Setup global (mocks, MSW)
├── src/
│   ├── test-utils/           # Test utilities
│   │   ├── index.tsx         # Custom render, helpers
│   │   └── mocks/
│   │       ├── handlers.ts   # MSW request handlers
│   │       └── server.ts     # MSW server setup
│   │
│   ├── shared/components/
│   │   ├── LanguageSwitcher.tsx
│   │   └── __tests__/
│   │       └── LanguageSwitcher.test.tsx
│   │
│   ├── features/auth/
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   └── __tests__/
│   │   │       └── LoginForm.test.tsx
│   │   └── hooks/
│   │       ├── useAuth.ts
│   │       └── __tests__/
│   │           └── useAuth.test.ts
│   │
│   └── hooks/
│       ├── useTrans.ts
│       └── __tests__/
│           └── useTrans.test.ts
```

### Quy Tắc Đặt Tên

- Test files: `*.test.tsx` hoặc `*.test.ts`
- Đặt trong folder `__tests__/` cùng cấp với file gốc
- Tên file test = tên file gốc + `.test.tsx`

---

## ✍️ Viết Tests

### Component Tests

#### Ví Dụ Cơ Bản

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test-utils';
import { MyComponent } from '../MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

#### Test User Interactions

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test-utils';
import userEvent from '@testing-library/user-event';
import { LoginForm } from '../LoginForm';

describe('LoginForm', () => {
  it('allows user to type in inputs', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);
    
    const emailInput = screen.getByPlaceholderText('Email');
    await user.type(emailInput, 'test@example.com');
    
    expect(emailInput).toHaveValue('test@example.com');
  });

  it('submits form on button click', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);
    
    const submitButton = screen.getByRole('button', { name: /đăng nhập/i });
    await user.click(submitButton);
    
    // Assert submission logic
  });
});
```

#### Test Async Components

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@/test-utils';
import { AsyncComponent } from '../AsyncComponent';

describe('AsyncComponent', () => {
  it('shows loading then data', async () => {
    render(<AsyncComponent />);
    
    // Check loading state
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('Data loaded')).toBeInTheDocument();
    });
  });
});
```

### Hook Tests

#### Test Custom Hooks

```tsx
import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useLogin } from '../useAuth';

// Wrapper cho hooks sử dụng React Query
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useLogin', () => {
  it('logs in successfully', async () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({
      username: 'alice@example.com',
      password: 'password123',
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
  });
});
```

#### Test Simple Hooks

```tsx
import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useTrans } from '../useTrans';

describe('useTrans', () => {
  it('returns translation function', () => {
    const { result } = renderHook(() => useTrans());
    
    expect(result.current.trans).toBeDefined();
    expect(result.current.currentLanguage).toBe('en');
  });
});
```

### API Mocking

#### Sử Dụng MSW Handlers

File `src/test-utils/mocks/handlers.ts` chứa các mock handlers:

```typescript
import { http, HttpResponse } from 'msw';

export const handlers = [
  // Mock login endpoint
  http.post('/api/auth/login', async ({ request }) => {
    const body = await request.json();
    const { username, password } = body;

    if (username === 'alice@example.com' && password === 'password123') {
      return HttpResponse.json({
        success: true,
        result: { id: '1', username, firstname: 'Alice' },
      });
    }

    return HttpResponse.json(
      { success: false, error: 'Invalid credentials' },
      { status: 401 }
    );
  }),
];
```

#### Override Handlers Trong Test

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@/test-utils';
import { server } from '@/test-utils/mocks/server';
import { http, HttpResponse } from 'msw';
import { LoginForm } from '../LoginForm';

describe('LoginForm', () => {
  it('handles server error', async () => {
    // Override handler cho test này
    server.use(
      http.post('/api/auth/login', () => {
        return HttpResponse.json(
          { error: 'Server error' },
          { status: 500 }
        );
      })
    );

    render(<LoginForm />);
    // Test error handling...
  });
});
```

---

## 🎯 Best Practices

### 1. Test Behavior, Not Implementation

❌ **Tránh:**
```tsx
expect(component.state.count).toBe(5);
```

✅ **Nên:**
```tsx
expect(screen.getByText('Count: 5')).toBeInTheDocument();
```

### 2. Sử Dụng Testing Library Queries Đúng Cách

**Thứ tự ưu tiên:**

1. `getByRole` - Tốt nhất cho accessibility
2. `getByLabelText` - Cho form inputs
3. `getByPlaceholderText` - Khi không có label
4. `getByText` - Cho text content
5. `getByTestId` - Last resort

```tsx
// ✅ Tốt nhất
screen.getByRole('button', { name: /submit/i });

// ✅ Tốt cho inputs
screen.getByLabelText('Email');

// ⚠️ OK nhưng không tốt bằng
screen.getByPlaceholderText('Enter email');

// ❌ Tránh nếu có thể
screen.getByTestId('submit-button');
```

### 3. Async Testing

Luôn dùng `waitFor` cho async operations:

```tsx
// ✅ Đúng
await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument();
});

// ❌ Sai - có thể flaky
await new Promise(resolve => setTimeout(resolve, 1000));
expect(screen.getByText('Loaded')).toBeInTheDocument();
```

### 4. Mock Đúng Cách

```tsx
// Mock module
vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    user: { id: '1', name: 'Test User' },
    login: vi.fn(),
    logout: vi.fn(),
  }),
}));

// Mock function
const mockFn = vi.fn();
mockFn.mockReturnValue('value');
mockFn.mockResolvedValue('async value');
```

### 5. Cleanup

Testing Library tự động cleanup sau mỗi test. Không cần gọi `cleanup()` manually.

---

## 🐛 Troubleshooting

### Lỗi: "Cannot find module"

**Nguyên nhân:** Path aliases không được resolve

**Giải pháp:** Kiểm tra `vitest.config.ts`:

```typescript
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
},
```

### Lỗi: "localStorage is not defined"

**Nguyên nhân:** jsdom không có localStorage mặc định

**Giải pháp:** Đã được mock trong `vitest.setup.ts`

### Lỗi: "useRouter is not a function"

**Nguyên nhân:** Next.js router không có trong test environment

**Giải pháp:** Đã được mock trong `vitest.setup.ts`

### Tests Chạy Chậm

**Giải pháp:**
- Sử dụng `vitest --no-coverage` để skip coverage
- Giảm số lượng tests chạy với pattern: `vitest src/features`
- Sử dụng `test.concurrent` cho tests độc lập

### MSW Không Intercept Requests

**Kiểm tra:**
1. Server được start trong `beforeAll`
2. Handlers được reset trong `afterEach`
3. URL trong handler khớp với request URL

---

## ❓ FAQ

### Khi nào nên viết tests?

- **Luôn luôn** cho business logic quan trọng
- **Nên** cho components phức tạp
- **Có thể bỏ qua** cho UI components đơn giản (pure presentational)

### Test coverage bao nhiêu là đủ?

- **80%+** là tốt cho production code
- **100%** không cần thiết và tốn thời gian
- Tập trung vào **critical paths** hơn là coverage number

### Có nên test third-party libraries không?

**Không.** Chỉ test code của bạn. Mock third-party dependencies.

### Làm sao test Next.js Server Components?

Server Components khó test. Nên:
1. Tách logic ra hooks/utilities
2. Test hooks/utilities đó
3. Integration test cho Server Components

### Vitest vs Jest?

| Feature | Vitest | Jest |
|---------|--------|------|
| Speed | ⚡ Nhanh hơn | 🐢 Chậm hơn |
| ESM | ✅ Native | ⚠️ Experimental |
| Config | 🎯 Đơn giản | 😰 Phức tạp |
| UI | ✅ Built-in | ❌ Không có |
| Next.js 16 | ✅ Tốt | ⚠️ Cần config |

---

## 📚 Tài Liệu Tham Khảo

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [MSW Documentation](https://mswjs.io/docs/)
- [Common Testing Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

## 🎓 Ví Dụ Thực Tế

Xem các file test trong dự án:

- [`LanguageSwitcher.test.tsx`](file:///d:/12/MyFrame/my-framework/src/shared/components/__tests__/LanguageSwitcher.test.tsx) - Component test cơ bản
- [`LoginForm.test.tsx`](file:///d:/12/MyFrame/my-framework/src/features/auth/components/__tests__/LoginForm.test.tsx) - Form testing với user events
- [`useAuth.test.ts`](file:///d:/12/MyFrame/my-framework/src/features/auth/hooks/__tests__/useAuth.test.ts) - Hook testing với React Query
- [`useTrans.test.ts`](file:///d:/12/MyFrame/my-framework/src/hooks/__tests__/useTrans.test.ts) - Simple hook testing

---

**Happy Testing! 🎉**

*Nếu có câu hỏi, hãy tham khảo documentation hoặc hỏi team.*
