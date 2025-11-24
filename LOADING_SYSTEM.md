# Loading System Documentation

## Overview

Hệ thống loading với 2 levels:
- **LoadingFull**: Loading toàn bộ trang (overlay everything)
- **LoadingMain**: Loading phần main content (không ảnh hưởng header/sidebar)

## Architecture

```
┌─────────────────────────────────────┐
│         LoadingFull (z-index: 9999) │ ← Covers everything
│  ┌───────────────────────────────┐  │
│  │         Header                │  │
│  ├───────────────────────────────┤  │
│  │ Sidebar │ Main Content        │  │
│  │         │  ┌─────────────────┐│  │
│  │         │  │ LoadingMain     ││  │ ← Covers only main
│  │         │  │ (z-index: 100)  ││  │
│  │         │  └─────────────────┘│  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

## Files Structure

```
src/
├── shared/
│   ├── lib/
│   │   └── loading.ts              # Zustand store + helpers
│   └── components/
│       ├── Loading.tsx             # Loading components
│       └── GlobalLoadingContainer.tsx  # Global container
└── styles/
    └── components/
        └── loading.css             # Loading styles
```

---

## Usage

### 1. Full Page Loading

**Use case**: Login, logout, initial app load, route transitions

```typescript
import { loading } from "@/shared/lib/loading";

// Show full page loading
loading.showFull("Đang đăng nhập...");

// Perform async operation
await loginUser();

// Hide loading
loading.hideFull();
```

**With try/catch:**

```typescript
import { loading } from "@/shared/lib/loading";

try {
  loading.showFull("Đang xử lý...");
  await someAsyncOperation();
} catch (error) {
  console.error(error);
} finally {
  loading.hideFull();
}
```

### 2. Main Content Loading

**Use case**: Loading data in main content area, không ảnh hưởng header/sidebar

```typescript
import { loading } from "@/shared/lib/loading";

// Show main content loading
loading.showMain("Đang tải dữ liệu...");

// Fetch data
const data = await fetchData();

// Hide loading
loading.hideMain();
```

### 3. Using with React Query

```typescript
import { useQuery } from "@tanstack/react-query";
import { loading } from "@/shared/lib/loading";
import { useEffect } from "react";

function MyComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  // Show/hide loading based on query state
  useEffect(() => {
    if (isLoading) {
      loading.showMain("Đang tải danh sách...");
    } else {
      loading.hideMain();
    }
  }, [isLoading]);

  return <div>{/* Your content */}</div>;
}
```

### 4. Using Zustand Hook Directly

```typescript
import { useLoadingStore } from "@/shared/lib/loading";

function MyComponent() {
  const { isMainLoading, showMainLoading, hideMainLoading } = useLoadingStore();

  const handleClick = async () => {
    showMainLoading("Processing...");
    await doSomething();
    hideMainLoading();
  };

  return (
    <div>
      {isMainLoading && <p>Loading...</p>}
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}
```

### 5. LoadingContainer Component

Wrap any component to show loading overlay:

```typescript
import { LoadingContainer } from "@/shared/components/Loading";

function MyPage() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContainer isLoading={isLoading} message="Loading..." type="main">
      <div>
        {/* Your content */}
      </div>
    </LoadingContainer>
  );
}
```

### 6. Spinner Component

Use standalone spinner:

```typescript
import { Spinner } from "@/shared/components/Loading";

function MyComponent() {
  return (
    <div>
      <Spinner size="sm" />
      <Spinner size="md" color="#ff0000" />
      <Spinner size="lg" />
    </div>
  );
}
```

---

## API Reference

### Loading Store

```typescript
import { useLoadingStore, loading } from "@/shared/lib/loading";
```

#### State

```typescript
interface LoadingState {
  isFullLoading: boolean;
  fullLoadingMessage?: string;
  isMainLoading: boolean;
  mainLoadingMessage?: string;
}
```

#### Actions

```typescript
// Store methods
showFullLoading(message?: string): void
hideFullLoading(): void
showMainLoading(message?: string): void
hideMainLoading(): void
hideAllLoading(): void

// Helper functions (recommended)
loading.showFull(message?: string): void
loading.hideFull(): void
loading.showMain(message?: string): void
loading.hideMain(): void
loading.hideAll(): void
```

### Components

#### LoadingFull

```typescript
<LoadingFull message="Loading..." />
```

Props:
- `message?: string` - Optional loading message

#### LoadingMain

```typescript
<LoadingMain message="Loading data..." />
```

Props:
- `message?: string` - Optional loading message

#### LoadingContainer

```typescript
<LoadingContainer 
  isLoading={boolean}
  message="Loading..."
  type="full" | "main"
>
  {children}
</LoadingContainer>
```

Props:
- `children: ReactNode` - Content to wrap
- `isLoading: boolean` - Show/hide loading
- `message?: string` - Optional message
- `type?: "full" | "main"` - Loading type (default: "main")

#### Spinner

```typescript
<Spinner size="sm" | "md" | "lg" color="#hex" />
```

Props:
- `size?: "sm" | "md" | "lg"` - Spinner size (default: "md")
- `color?: string` - Spinner color (default: primary color)

---

## Examples

### Example 1: Login Flow

```typescript
// LoginForm.tsx
import { loading } from "@/shared/lib/loading";
import { toast } from "@/shared/lib/toast";

const handleLogin = async (data: LoginFormData) => {
  try {
    loading.showFull("Đang đăng nhập...");
    await login.mutateAsync(data);
    toast.success("Đăng nhập thành công!");
    router.push("/dashboard");
  } catch (error) {
    toast.error("Đăng nhập thất bại!");
  } finally {
    loading.hideFull();
  }
};
```

### Example 2: Dashboard Layout with Main Loading

```typescript
// DashboardLayout.tsx
"use client";

import { useLoadingStore } from "@/shared/lib/loading";
import { LoadingMain } from "@/shared/components/Loading";

export default function DashboardLayout({ children }) {
  const { isMainLoading, mainLoadingMessage } = useLoadingStore();

  return (
    <div className="dashboard">
      <Header />
      <Sidebar />
      <main className="main-content" style={{ position: "relative" }}>
        {children}
        {isMainLoading && <LoadingMain message={mainLoadingMessage} />}
      </main>
    </div>
  );
}
```

### Example 3: Data Fetching with Loading

```typescript
// UsersPage.tsx
import { loading } from "@/shared/lib/loading";
import { useEffect } from "react";

function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        loading.showMain("Đang tải danh sách người dùng...");
        const data = await api.getUsers();
        setUsers(data);
      } catch (error) {
        toast.error("Không thể tải dữ liệu");
      } finally {
        loading.hideMain();
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
```

### Example 4: Form Submission

```typescript
// CreateUserForm.tsx
import { loading } from "@/shared/lib/loading";

const handleSubmit = async (data: UserFormData) => {
  try {
    loading.showMain("Đang tạo người dùng...");
    await createUser(data);
    toast.success("Tạo người dùng thành công!");
    router.push("/users");
  } catch (error) {
    toast.error("Có lỗi xảy ra!");
  } finally {
    loading.hideMain();
  }
};
```

---

## Styling

### CSS Classes

- `.loading-full` - Full page overlay
- `.loading-full-content` - Content wrapper
- `.loading-full-message` - Message text
- `.loading-main` - Main content overlay
- `.loading-main-content` - Content wrapper
- `.loading-main-message` - Message text
- `.spinner` - Spinner animation

### Customization

Override CSS variables in your theme:

```css
:root {
  --color-primary: #3b82f6; /* Spinner color */
}

/* Custom loading overlay */
.loading-full {
  background-color: rgba(0, 0, 0, 0.8); /* Darker overlay */
}

.loading-main {
  backdrop-filter: blur(8px); /* More blur */
}
```

---

## Best Practices

1. **Always use try/finally** để đảm bảo loading được hide
   ```typescript
   try {
     loading.showFull();
     await operation();
   } finally {
     loading.hideFull(); // Always hide
   }
   ```

2. **Provide meaningful messages** để user biết đang làm gì
   ```typescript
   loading.showMain("Đang tải dữ liệu...");
   ```

3. **Use appropriate loading type**
   - Full page: Login, logout, route changes
   - Main content: Data fetching, form submission

4. **Don't nest loading states** - Tránh show cả full và main cùng lúc

5. **Clean up on unmount** nếu dùng trong component
   ```typescript
   useEffect(() => {
     return () => {
       loading.hideAll(); // Cleanup
     };
   }, []);
   ```

---

## Troubleshooting

### Loading không hiển thị?

1. Check `GlobalLoadingContainer` đã được add vào root layout chưa
2. Verify CSS đã được import trong `global.css`
3. Check z-index conflicts

### Loading không tắt?

1. Đảm bảo gọi `hideLoading()` trong `finally` block
2. Check for errors trong async operations
3. Verify không có multiple loading calls

### Spinner không quay?

1. Check CSS animation được load chưa
2. Verify browser supports CSS animations
3. Check for CSS conflicts

---

## Advanced Usage

### Custom Loading Component

```typescript
import { useLoadingStore } from "@/shared/lib/loading";

function CustomLoading() {
  const { isMainLoading, mainLoadingMessage } = useLoadingStore();

  if (!isMainLoading) return null;

  return (
    <div className="my-custom-loading">
      <div className="my-spinner" />
      <p>{mainLoadingMessage}</p>
      <button onClick={() => loading.hideMain()}>Cancel</button>
    </div>
  );
}
```

### Skeleton Loading (Future)

```typescript
function UserSkeleton() {
  return (
    <div className="card">
      <div className="skeleton skeleton-avatar" />
      <div className="skeleton skeleton-title" />
      <div className="skeleton skeleton-text" />
      <div className="skeleton skeleton-text" />
    </div>
  );
}
```

---

## Migration from Old Loading

If you had custom loading before:

**Before:**
```typescript
const [loading, setLoading] = useState(false);
```

**After:**
```typescript
import { loading } from "@/shared/lib/loading";

// Instead of setLoading(true)
loading.showMain();

// Instead of setLoading(false)
loading.hideMain();
```

---

## Performance

- Loading components use CSS animations (GPU accelerated)
- Zustand store is lightweight (~1KB)
- No re-renders for unrelated components
- Backdrop blur may impact performance on low-end devices

---

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers
- ⚠️ IE11 (not supported - use polyfills)
