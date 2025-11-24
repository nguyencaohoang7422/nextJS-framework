# Zustand Module Architecture - Hướng Dẫn Chi Tiết

## 📚 Mục Lục

- [Tổng Quan](#tổng-quan)
- [Kiến Trúc](#kiến-trúc)
- [Core Slices](#core-slices)
- [Dynamic Modules](#dynamic-modules)
- [Cách Sử Dụng](#cách-sử-dụng)
- [Tạo Module Mới](#tạo-module-mới)
- [Best Practices](#best-practices)
- [Performance Tips](#performance-tips)

---

## 🎯 Tổng Quan

Hệ thống Zustand của dự án được thiết kế theo **modular architecture** với khả năng **dynamic loading**.

### Lợi Ích

✅ **Modular** - Code được tổ chức theo features  
✅ **Performance** - Modules chỉ load khi cần  
✅ **Type-safe** - Full TypeScript support  
✅ **Scalable** - Dễ thêm modules mới  
✅ **Maintainable** - Separation of concerns

---

## 🏗️ Kiến Trúc

```
src/stores/
├── index.ts                 # Main store + exports
├── types.ts                 # Type definitions
├── moduleRegistry.ts        # Module loading system
├── slices/                  # Core slices (always loaded)
│   ├── authSlice.ts        # Auth state
│   ├── uiSlice.ts          # UI state
│   └── appSlice.ts         # App state
├── modules/                 # Feature modules (load on-demand)
│   ├── dashboard/
│   │   └── dashboardSlice.ts
│   ├── users/
│   │   └── usersSlice.ts
│   └── reports/
│       └── reportsSlice.ts
└── hooks/
    └── useModule.ts         # Dynamic loading hook
```

### Store Structure

```typescript
{
  // Core slices (always available)
  auth: AuthSlice,
  ui: UISlice,
  app: AppSlice,
  
  // Module registry (internal)
  _moduleRegistry: ModuleRegistry,
  
  // Dynamic modules (loaded on-demand)
  modules: {
    dashboard?: DashboardSlice,
    users?: UsersSlice,
    reports?: ReportsSlice,
  }
}
```

---

## 🔧 Core Slices

Core slices **luôn được load** khi app khởi động.

### Auth Slice

Quản lý authentication state.

```typescript
import { useAuth } from '@/stores';

function MyComponent() {
  const { user, setUser, clearUser } = useAuth();
  
  return <div>User: {user?.firstname}</div>;
}
```

**State:**
- `user` - Current user object
- `loading` - Auth loading state
- `error` - Auth error message

**Actions:**
- `setUser(user)` - Set current user
- `clearUser()` - Clear user (logout)
- `setLoading(loading)` - Set loading state
- `setError(error)` - Set error message

### UI Slice

Quản lý UI state (sidebar, header, menu).

```typescript
import { useUI } from '@/stores';

function Sidebar() {
  const { sidebarOpen, toggleSidebar, menuItems } = useUI();
  
  return (
    <aside className={sidebarOpen ? 'open' : 'closed'}>
      {menuItems.map(item => <MenuItem key={item.id} {...item} />)}
    </aside>
  );
}
```

**State:**
- `sidebarOpen` - Sidebar open/closed
- `headerVisible` - Header visible/hidden
- `menuItems` - Menu items array
- `menuLoading` - Menu loading state

**Actions:**
- `toggleSidebar()` - Toggle sidebar
- `setSidebarOpen(open)` - Set sidebar state
- `toggleHeader()` - Toggle header
- `setHeaderVisible(visible)` - Set header state
- `setMenuItems(items)` - Set menu items
- `loadMenuData()` - Load menu from API

### App Slice

Quản lý app-level state.

```typescript
import { useApp } from '@/stores';

function ThemeSwitcher() {
  const { theme, setTheme, notifications } = useApp();
  
  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="system">System</option>
    </select>
  );
}
```

**State:**
- `theme` - Current theme
- `language` - Current language
- `notifications` - Notifications array

**Actions:**
- `setTheme(theme)` - Set theme
- `setLanguage(language)` - Set language
- `addNotification(notification)` - Add notification
- `removeNotification(id)` - Remove notification
- `clearNotifications()` - Clear all notifications

---

## 📦 Dynamic Modules

Feature modules **load on-demand** khi vào page.

### Sử Dụng Module

```typescript
'use client';

import { useModule } from '@/stores/hooks/useModule';
import { loadDashboardModule } from '@/stores/modules/dashboard/dashboardSlice';
import { useStore } from '@/stores';

export default function DashboardPage() {
  // Load module dynamically
  const { loading, error, loaded } = useModule('dashboard', loadDashboardModule);
  
  // Access module state (type-safe)
  const dashboardData = useStore((state) => state.modules.dashboard);
  
  if (loading) return <div>Loading module...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!loaded) return null;
  
  return (
    <div>
      <h1>Dashboard</h1>
      <div>Widgets: {dashboardData?.widgets.length}</div>
    </div>
  );
}
```

### Available Modules

#### Dashboard Module

```typescript
import { useModule } from '@/stores/hooks/useModule';
import { loadDashboardModule } from '@/stores/modules/dashboard/dashboardSlice';

const { loaded } = useModule('dashboard', loadDashboardModule);
```

**State:** widgets, layout, filters

#### Users Module

```typescript
import { loadUsersModule } from '@/stores/modules/users/usersSlice';

const { loaded } = useModule('users', loadUsersModule);
```

**State:** users, selectedUser, filters, pagination

#### Reports Module

```typescript
import { loadReportsModule } from '@/stores/modules/reports/reportsSlice';

const { loaded } = useModule('reports', loadReportsModule);
```

**State:** reports, selectedReport, generating, exportFormat

---

## 🚀 Cách Sử Dụng

### 1. Access Core State

```typescript
import { useStore, useAuth, useUI, useApp } from '@/stores';

// Option 1: Use convenience hooks
function MyComponent() {
  const { user } = useAuth();
  const { sidebarOpen } = useUI();
  const { theme } = useApp();
}

// Option 2: Use selectors (better performance)
import { selectUser, selectSidebarOpen } from '@/stores';

function MyComponent() {
  const user = useStore(selectUser);
  const sidebarOpen = useStore(selectSidebarOpen);
}

// Option 3: Direct access
function MyComponent() {
  const user = useStore((state) => state.auth.user);
}
```

### 2. Load Dynamic Module

```typescript
import { useModule } from '@/stores/hooks/useModule';
import { loadDashboardModule } from '@/stores/modules/dashboard/dashboardSlice';

function DashboardPage() {
  // Auto-loads module on mount, auto-cleanup on unmount
  const { loading, error, loaded, module } = useModule(
    'dashboard',
    loadDashboardModule
  );
  
  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  
  return <Dashboard data={module} />;
}
```

### 3. Update State

```typescript
import { useStore } from '@/stores';

function LoginButton() {
  const setUser = useStore((state) => state.auth.setUser);
  
  const handleLogin = async () => {
    const user = await loginApi();
    setUser(user);
  };
  
  return <button onClick={handleLogin}>Login</button>;
}
```

---

## 🔨 Tạo Module Mới

### Bước 1: Tạo Type Definition

Trong `src/stores/types.ts`:

```typescript
export interface MyFeatureSlice extends ModuleSlice {
  _moduleId: 'myFeature';
  
  // State
  data: MyData[];
  loading: boolean;
  
  // Actions
  setData: (data: MyData[]) => void;
  loadData: () => Promise<void>;
}
```

### Bước 2: Tạo Module Slice

Tạo file `src/stores/modules/myFeature/myFeatureSlice.ts`:

```typescript
import { MyFeatureSlice } from '@/stores/types';

export const loadMyFeatureModule = async (): Promise<MyFeatureSlice> => {
  // Simulate async loading
  await new Promise(resolve => setTimeout(resolve, 100));

  return {
    _moduleId: 'myFeature',
    _loaded: true,
    _loading: false,
    _error: null,

    data: [],
    loading: false,

    setData: (data) => {
      // Will be bound to store
    },

    loadData: async () => {
      // Implementation
    },
  };
};
```

### Bước 3: Sử Dụng Module

```typescript
import { useModule } from '@/stores/hooks/useModule';
import { loadMyFeatureModule } from '@/stores/modules/myFeature/myFeatureSlice';

function MyFeaturePage() {
  const { loaded } = useModule('myFeature', loadMyFeatureModule);
  
  if (!loaded) return <Loading />;
  
  return <div>My Feature</div>;
}
```

---

## ✨ Best Practices

### 1. Use Selectors

```typescript
// ❌ Bad - re-renders on any state change
const state = useStore();

// ✅ Good - only re-renders when user changes
const user = useStore((state) => state.auth.user);

// ✅ Better - use predefined selectors
import { selectUser } from '@/stores';
const user = useStore(selectUser);
```

### 2. Avoid Nested Selectors

```typescript
// ❌ Bad - creates new object every render
const data = useStore((state) => ({
  user: state.auth.user,
  sidebar: state.ui.sidebarOpen,
}));

// ✅ Good - separate selectors
const user = useStore((state) => state.auth.user);
const sidebar = useStore((state) => state.ui.sidebarOpen);
```

### 3. Load Modules in Page Components

```typescript
// ✅ Good - load in page component
function DashboardPage() {
  const { loaded } = useModule('dashboard', loadDashboardModule);
  return <DashboardContent />;
}

// ❌ Bad - load in child component (multiple loads)
function DashboardWidget() {
  const { loaded } = useModule('dashboard', loadDashboardModule);
}
```

### 4. Use TypeScript

```typescript
// ✅ Good - type-safe
const dashboard = useStore((state) => state.modules.dashboard);
if (dashboard) {
  dashboard.widgets // TypeScript knows this exists
}

// ❌ Bad - no type safety
const dashboard = useStore((state) => state.modules['dashboard']);
```

---

## ⚡ Performance Tips

### 1. Shallow Comparison

```typescript
import { shallow } from 'zustand/shallow';

// Only re-renders when array items change
const menuItems = useStore(
  (state) => state.ui.menuItems,
  shallow
);
```

### 2. Memoize Selectors

```typescript
import { useMemo } from 'react';

const filteredUsers = useStore((state) => 
  useMemo(
    () => state.modules.users?.users.filter(u => u.active),
    [state.modules.users?.users]
  )
);
```

### 3. Split Large Modules

Nếu module quá lớn, chia thành sub-modules:

```
modules/
  dashboard/
    dashboardSlice.ts
    widgets/
      widgetsSlice.ts
    charts/
      chartsSlice.ts
```

---

## 📖 Tài Liệu Tham Khảo

- [Zustand Documentation](https://docs.pmnd.rs/zustand)
- [Zustand Slices Pattern](https://docs.pmnd.rs/zustand/guides/slices-pattern)
- [TypeScript Guide](https://docs.pmnd.rs/zustand/guides/typescript)

---

**Happy Coding! 🎉**
