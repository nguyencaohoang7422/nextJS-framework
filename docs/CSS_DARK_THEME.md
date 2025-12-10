# CSS Dark Theme - Hướng dẫn sử dụng

## 🎨 Cấu trúc Variables

File `variables.css` được tổ chức theo **4 layers**:

### Layer 1: Base Color Palette
Raw colors không thay đổi giữa themes, dùng HSL format:
```css
--brand-500: hsl(217 91% 55%);
--gray-900: hsl(222 47% 11%);
```

### Layer 2: Semantic Tokens (Light Mode)
Ánh xạ màu theo ngữ nghĩa:
```css
--color-bg-primary: hsl(0 0% 100%);
--color-text-primary: var(--gray-900);
```

### Layer 3: Dark Theme Override
Tự động override khi có class `.dark`:
```css
:root.dark {
  --color-bg-primary: var(--gray-900);
  --color-text-primary: var(--gray-50);
}
```

### Layer 4: Component Tokens
Tokens cho từng component:
```css
--button-bg: var(--color-primary);
--card-bg: var(--color-bg-primary);
```

## 🚀 Cách sử dụng

### 1. Trong Tailwind Classes

Theme tự động hoạt động với Tailwind dark mode:
```tsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50">
  Content
</div>
```

### 2. Trong Custom CSS

Sử dụng semantic tokens:
```css
.my-component {
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
}
/* Tự động đổi màu khi .dark class được thêm vào root! */
```

### 3. Component-specific Tokens

```css
.my-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  box-shadow: var(--card-shadow);
}
```

## 📋 Available Variables

### Background Colors
- `--color-bg-primary` - Background chính
- `--color-bg-secondary` - Background phụ
- `--color-bg-tertiary` - Background bậc 3
- `--color-bg-hover` - Hover state
- `--color-bg-active` - Active state

### Text Colors
- `--color-text-primary` - Text chính
- `--color-text-secondary` - Text phụ
- `--color-text-tertiary` - Text mờ nhất
- `--color-text-inverse` - Text đảo ngược
- `--color-text-disabled` - Text disabled

### Border Colors
- `--color-border` - Border mặc định
- `--color-border-hover` - Border khi hover
- `--color-border-focus` - Border khi focus

### Brand/Primary Colors
- `--color-primary` - Màu primary
- `--color-primary-hover` - Primary hover
- `--color-primary-active` - Primary active
- `--color-primary-text` - Text trên primary background

### Status Colors
- `--color-success` / `--color-success-bg`
- `--color-error` / `--color-error-bg`
- `--color-warning` / `--color-warning-bg`
- `--color-info` / `--color-info-bg`

### Shadows
- `--shadow-xs` → `--shadow-xl`

### Border Radius
- `--radius-sm` → `--radius-xl` / `--radius-full`

### Spacing
- `--spacing-xs` → `--spacing-xl`

## 🎯 Ví dụ thực tế

### Card Component
```css
.card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  box-shadow: var(--card-shadow);
  border-radius: var(--radius-base);
  padding: var(--spacing-lg);
}
```

### Button Component
```css
.btn-primary {
  background: var(--button-bg);
  color: var(--button-text);
  border-radius: var(--radius-base);
}

.btn-primary:hover {
  background: var(--button-bg-hover);
}
```

### Input Component
```css
.input {
  background: var(--input-bg);
  border: 1px solid var(--input-border);
  color: var(--input-text);
}

.input::placeholder {
  color: var(--input-placeholder);
}

.input:focus {
  border-color: var(--input-border-focus);
}
```

## ⚙️ Theme Switching

Theme được control bởi `ThemeProvider`:
```tsx
import { useTheme } from '@/providers';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Current: {theme}
    </button>
  );
}
```

Khi toggle, class `.dark` được thêm/xóa khỏi `<html>` element, và tất cả CSS variables tự động update!

## 🔄 Backward Compatibility

Các biến cũ vẫn hoạt động:
```css
/* Old */
--bg-primary
--text-primary
--border-color

/* → Tự động map sang new */
var(--color-bg-primary)
var(--color-text-primary)  
var(--color-border)
```

## ⚠️ Lưu ý quan trọng

1. **KHÔNG import** `base.css` hoặc `utilities.css` trong `global.css` vì sẽ conflict với Tailwind CSS
2. Luôn dùng **semantic tokens** (--color-bg-primary) thay vì raw colors (--gray-900)
3. Dark mode hoạt động nhờ `:root.dark` selector, không cần viết media query
4. HSL format cho phép dễ dàng tạo variations (lighten/darken)

## 🎨 Tạo theme mới

Nếu muốn tạo theme variant khác (ví dụ: high-contrast):
```css
:root.high-contrast {
  --color-bg-primary: hsl(0 0% 0%);
  --color-text-primary: hsl(0 0% 100%);
  --color-border: hsl(0 0% 100%);
  /* ... */
}
```
