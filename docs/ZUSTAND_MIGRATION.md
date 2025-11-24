# Zustand Migration Guide

## 🔄 Migration từ Old Stores sang New Architecture

### Tổng Quan

Dự án đã migrate từ:
- ❌ Multiple isolated stores (`useUIStore`, `useAuthStore`)
- ✅ Single unified store với modular slices

### Breaking Changes

1. **Import paths changed**
2. **Store structure changed**
3. **Some APIs renamed**

---

## 📝 Migration Steps

### 1. Update Imports

#### Old Code
```typescript
import { useUIStore } from '@/stores/useUIStore';
import { useAuthStore } from '@/features/auth/hooks/useAuth';
```

#### New Code
```typescript
import { useStore, useUI, useAuth } from '@/stores';
// or
import { selectUser, selectSidebarOpen } from '@/stores';
```

### 2. Update State Access

#### Old: useUIStore
```typescript
// ❌ Old
const sidebarOpen = useUIStore((state) => state.sidebarOpen);
const toggleSidebar = useUIStore((state) => state.toggleSidebar);
```

#### New: useUI or useStore
```typescript
// ✅ New - Option 1: Convenience hook
const { sidebarOpen, toggleSidebar } = useUI();

// ✅ New - Option 2: Selector (better performance)
const sidebarOpen = useStore(selectSidebarOpen);
const toggleSidebar = useStore((state) => state.ui.toggleSidebar);
```

#### Old: useAuthStore
```typescript
// ❌ Old
const user = useAuthStore((state) => state.user);
const setUser = useAuthStore((state) => state.setUser);
```

#### New: useAuth or useStore
```typescript
// ✅ New - Option 1: Convenience hook
const { user, setUser } = useAuth();

// ✅ New - Option 2: Selector
const user = useStore(selectUser);
const setUser = useStore((state) => state.auth.setUser);
```

### 3. Update Component Code

#### Example: Sidebar Component

**Before:**
```typescript
import { useUIStore } from '@/stores/useUIStore';

export function Sidebar() {
  const sidebarOpen = useUIStore((state) => state.sidebarOpen);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const menuItems = useUIStore((state) => state.menuItems);
  
  return (
    <aside className={sidebarOpen ? 'open' : 'closed'}>
      <button onClick={toggleSidebar}>Toggle</button>
      {menuItems.map(item => <MenuItem key={item.id} {...item} />)}
    </aside>
  );
}
```

**After:**
```typescript
import { useUI } from '@/stores';

export function Sidebar() {
  const { sidebarOpen, toggleSidebar, menuItems } = useUI();
  
  return (
    <aside className={sidebarOpen ? 'open' : 'closed'}>
      <button onClick={toggleSidebar}>Toggle</button>
      {menuItems.map(item => <MenuItem key={item.id} {...item} />)}
    </aside>
  );
}
```

#### Example: Auth Component

**Before:**
```typescript
import { useAuthStore } from '@/features/auth/hooks/useAuth';

export function UserProfile() {
  const user = useAuthStore((state) => state.user);
  const clearUser = useAuthStore((state) => state.clearUser);
  
  return (
    <div>
      <p>{user?.firstname}</p>
      <button onClick={clearUser}>Logout</button>
    </div>
  );
}
```

**After:**
```typescript
import { useAuth } from '@/stores';

export function UserProfile() {
  const { user, clearUser } = useAuth();
  
  return (
    <div>
      <p>{user?.firstname}</p>
      <button onClick={clearUser}>Logout</button>
    </div>
  );
}
```

---

## 🆕 New Features

### 1. Dynamic Modules

Bây giờ bạn có thể load modules động:

```typescript
import { useModule } from '@/stores/hooks/useModule';
import { loadDashboardModule } from '@/stores/modules/dashboard/dashboardSlice';

function DashboardPage() {
  const { loading, loaded } = useModule('dashboard', loadDashboardModule);
  
  if (loading) return <Loading />;
  if (!loaded) return null;
  
  return <DashboardContent />;
}
```

### 2. App-Level State

Bây giờ có app slice cho theme, language, notifications:

```typescript
import { useApp } from '@/stores';

function ThemeSwitcher() {
  const { theme, setTheme } = useApp();
  
  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
}
```

### 3. Predefined Selectors

Performance optimization với selectors:

```typescript
import { useStore, selectUser, selectSidebarOpen } from '@/stores';

function MyComponent() {
  const user = useStore(selectUser);
  const sidebarOpen = useStore(selectSidebarOpen);
}
```

---

## ⚠️ Deprecation Warnings

### useUIStore (Deprecated)

File `src/stores/useUIStore.ts` vẫn tồn tại nhưng **deprecated**.

```typescript
// ⚠️ Deprecated - will be removed in future version
import { useUIStore } from '@/stores/useUIStore';

// ✅ Use instead
import { useUI } from '@/stores';
```

### useAuthStore (Deprecated)

Store trong `src/features/auth/hooks/useAuth.ts` vẫn hoạt động nhưng **deprecated**.

```typescript
// ⚠️ Deprecated
import { useAuthStore } from '@/features/auth/hooks/useAuth';

// ✅ Use instead
import { useAuth } from '@/stores';
```

---

## 🔍 Troubleshooting

### Issue: "Cannot find module '@/stores'"

**Solution:** Đảm bảo import từ đúng path:
```typescript
import { useStore, useAuth, useUI } from '@/stores';
```

### Issue: "Property 'user' does not exist on type 'StoreState'"

**Solution:** Access qua slice:
```typescript
// ❌ Wrong
const user = useStore((state) => state.user);

// ✅ Correct
const user = useStore((state) => state.auth.user);
```

### Issue: Module not loading

**Solution:** Đảm bảo gọi `useModule` trong component:
```typescript
function MyPage() {
  const { loaded } = useModule('myModule', loadMyModule);
  
  if (!loaded) return <Loading />;
  
  return <Content />;
}
```

---

## 📋 Migration Checklist

- [ ] Update all imports từ old stores
- [ ] Replace `useUIStore` với `useUI` hoặc `useStore`
- [ ] Replace `useAuthStore` với `useAuth` hoặc `useStore`
- [ ] Update state access paths (e.g., `state.user` → `state.auth.user`)
- [ ] Test all components
- [ ] Remove old store files (optional, sau khi verify)

---

## 🎯 Next Steps

1. **Read [ZUSTAND_ARCHITECTURE.md](./ZUSTAND_ARCHITECTURE.md)** để hiểu architecture
2. **Update components** theo migration guide
3. **Test thoroughly** để đảm bảo không có regressions
4. **Create new modules** cho features mới

---

**Need Help?** Check [ZUSTAND_ARCHITECTURE.md](./ZUSTAND_ARCHITECTURE.md) for detailed documentation.
