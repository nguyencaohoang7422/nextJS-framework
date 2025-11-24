# CSS Architecture

This document explains the modular CSS structure of the project.

## File Structure

```
src/styles/
├── global.css              # Main entry point (imports all other files)
├── variables.css           # CSS custom properties (theme variables)
├── base.css                # Base/reset styles
├── utilities.css           # Utility classes
└── components/
    ├── toast.css           # Toast notification styles
    ├── form.css            # Form input styles
    ├── button.css          # Button styles
    ├── table.css           # Table styles
    └── modal.css           # Modal/dialog styles
```

## Import Order

The `global.css` file imports all CSS modules in the correct order:

1. **Tailwind CSS** - Utility-first CSS framework
2. **Variables** - CSS custom properties (colors, spacing, etc.)
3. **Base** - Reset and base element styles
4. **Utilities** - Utility classes (container, card, etc.)
5. **Components** - Component-specific styles

## CSS Variables

All theme variables are defined in `variables.css`:

```css
:root {
  /* Colors */
  --color-primary: #3b82f6;
  --color-success: #10b981;
  --color-error: #ef4444;
  
  /* Backgrounds */
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  
  /* Text */
  --text-primary: #0f172a;
  --text-secondary: #475569;
  
  /* Spacing */
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  
  /* ... and more */
}
```

### Using Variables

```css
.my-component {
  color: var(--text-primary);
  background: var(--bg-secondary);
  padding: var(--spacing-md);
}
```

## Component Styles

### Toast Notifications (`components/toast.css`)

Classes:
- `.toast-container` - Container for all toasts
- `.toast` - Individual toast
- `.toast-success`, `.toast-error`, `.toast-warning`, `.toast-info` - Variants

### Forms (`components/form.css`)

Classes:
- `.form-group` - Form field wrapper
- `.form-label` - Field label
- `.form-input` - Text input
- `.form-error` - Error message
- `.form-hint` - Help text

### Buttons (`components/button.css`)

Classes:
- `.btn` - Base button
- `.btn-primary`, `.btn-secondary`, `.btn-danger`, `.btn-ghost` - Variants
- `.btn-sm`, `.btn-lg` - Sizes

### Tables (`components/table.css`)

Classes:
- `.table-container` - Scrollable wrapper
- `.table` - Table element

### Modals (`components/modal.css`)

Classes:
- `.modal-overlay` - Backdrop
- `.modal-content` - Modal container
- `.modal-header`, `.modal-body`, `.modal-footer` - Sections

## Utility Classes

Defined in `utilities.css`:

- `.container` - Centered container with max-width
- `.card` - Card component
- `.divider` - Horizontal divider

## Adding New Styles

### Adding a New Component

1. Create a new file in `src/styles/components/`:
   ```bash
   touch src/styles/components/dropdown.css
   ```

2. Add your styles:
   ```css
   /* components/dropdown.css */
   .dropdown {
     position: relative;
   }
   
   .dropdown-menu {
     position: absolute;
     background: var(--bg-primary);
     border: 1px solid var(--border-color);
   }
   ```

3. Import in `global.css`:
   ```css
   @import "./components/dropdown.css";
   ```

### Adding New Variables

Add to `variables.css`:

```css
:root {
  --my-new-color: #ff6b6b;
  --my-new-spacing: 2rem;
}
```

## Best Practices

1. **Use CSS Variables** - Always use variables for colors, spacing, etc.
2. **BEM Naming** - Use Block-Element-Modifier naming convention
3. **Component Isolation** - Keep component styles in separate files
4. **Mobile First** - Write mobile styles first, then add desktop overrides
5. **Avoid !important** - Use specificity instead
6. **Consistent Naming** - Follow existing naming patterns

## Theming

To create a dark theme, override variables:

```css
[data-theme="dark"] {
  --bg-primary: #1a1a1a;
  --bg-secondary: #2d2d2d;
  --text-primary: #ffffff;
  --text-secondary: #a0a0a0;
}
```

Then add `data-theme="dark"` to the `<html>` or `<body>` element.

## Performance

- **CSS is bundled** - All CSS files are combined and minified in production
- **Critical CSS** - Consider extracting above-the-fold CSS
- **Purge unused** - Tailwind automatically removes unused utility classes

## Troubleshooting

### Styles not applying?

1. Check import order in `global.css`
2. Verify CSS file path is correct
3. Check for typos in class names
4. Inspect element in DevTools to see which styles are applied

### Variables not working?

1. Ensure variable is defined in `variables.css`
2. Check for typos in variable name
3. Verify `:root` selector is used

### Conflicts with Tailwind?

1. Use more specific selectors
2. Or use `@layer` directive:
   ```css
   @layer components {
     .my-component {
       /* styles */
     }
   }
   ```
