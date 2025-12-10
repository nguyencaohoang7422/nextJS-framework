# Providers

Thư mục này chứa các React Context Providers cho ứng dụng.

## 🎨 Theme System

Hệ thống theme được chia thành **2 providers độc lập**:

### 1. **ThemeProvider** - Dark/Light Mode

Quản lý chế độ hiển thị sáng/tối của ứng dụng.

**File**: `ThemeProvider.tsx`

**Features**:
- Toggle giữa `light` và `dark` mode
- Tự động detect system preference
- Lưu preference vào localStorage
- Tự động apply CSS class `dark` cho `<html>`

**Usage**:
```tsx
import { useTheme } from "@/providers/ThemeProvider";

function MyComponent() {
  const { theme, toggleTheme, setTheme } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <button onClick={() => setTheme("dark")}>Force Dark</button>
      <button onClick={() => setTheme("light")}>Force Light</button>
    </div>
  );
}
```

**API**:
```typescript
interface ThemeContextType {
  theme: "light" | "dark";        // Current theme
  toggleTheme: () => void;         // Switch between light/dark
  setTheme: (theme: Theme) => void; // Set specific theme
}
```

---

### 2. **ThemeConfigProvider** - Theme Colors

Quản lý bảng màu của ứng dụng (primary, secondary, success, v.v.).

**File**: `ThemeConfigProvider.tsx`

**Features**:
- Customize toàn bộ color palette
- Lưu config vào localStorage (key: `user_theme_config`)
- Auto-map colors sang CSS variables
- Reset về default theme

**Usage**:
```tsx
import { useThemeConfig } from "@/providers/ThemeConfigProvider";

function MyComponent() {
  const { themeConfig, applyThemeConfig, resetThemeConfig } = useThemeConfig();
  
  return (
    <div>
      <p>Primary color: {themeConfig.primary}</p>
      
      <button onClick={() => applyThemeConfig({ primary: "#FF5733" })}>
        Change Primary Color
      </button>
      
      <button onClick={resetThemeConfig}>
        Reset to Default
      </button>
    </div>
  );
}
```

**API**:
```typescript
interface ThemeConfigContextType {
  themeConfig: ThemeColors;                       // Current color config
  applyThemeConfig: (theme: Partial<ThemeColors>) => void; // Update colors
  resetThemeConfig: () => void;                   // Reset to default
}

interface ThemeColors {
  primary: string;
  primaryLighten: string;
  secondary: string;
  success: string;
  warning: string;
  danger: string;
  error: string;
  link: string;
  disabled: string;
  border: string;
  background: string;
  iconGrey: string;
}
```

**CSS Variables**:
ThemeConfigProvider tự động map colors sang CSS variables:
```css
--color-primary
--color-secondary
--color-success
--color-warning
--color-error
--bg-primary
--border-color
```

---

## 📦 Các Providers Khác

### I18nProvider
Quản lý đa ngôn ngữ (i18n).

### ReactQueryProvider
Wrapper cho React Query (TanStack Query).

---

## 🏗️ Setup trong App

Thứ tự wrap providers trong `app/layout.tsx`:

```tsx
import { 
  ReactQueryProvider,
  ThemeProvider,
  ThemeConfigProvider,
  I18nProvider 
} from "@/providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <ThemeProvider>              {/* Dark/Light mode */}
            <ThemeConfigProvider>      {/* Theme colors */}
              <I18nProvider>
                {children}
              </I18nProvider>
            </ThemeConfigProvider>
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
```

---

## 🎯 Demo Component

Xem file `src/components/ThemeDemo.tsx` để xem ví dụ chi tiết cách sử dụng cả 2 providers.

---

## 💡 Best Practices

1. **Separation of Concerns**:
   - `ThemeProvider` → UI mode (dark/light)
   - `ThemeConfigProvider` → Brand colors

2. **User Preferences**:
   - Theme mode được lưu vào `localStorage.theme`
   - Theme colors được lưu vào `localStorage.user_theme_config`

3. **Server-Side Rendering**:
   - Cả 2 providers đều có `"use client"` directive
   - Safe để sử dụng với Next.js App Router

4. **Testing**:
   - Test utils tự động wrap components với cả 2 providers
   - Import từ `@/test-utils` để test components sử dụng theme
