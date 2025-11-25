# Form Schema Management System

## 📋 Tổng quan

Hệ thống quản lý schema tập trung cho tất cả các forms trong dự án. Giúp team dễ dàng tạo, tìm kiếm và tái sử dụng validation schemas.

## 📁 Cấu trúc thư mục

```
src/schemas/
├── auth/              # Authentication schemas
│   ├── login.schema.ts
│   ├── register.schema.ts
│   ├── forgot-password.schema.ts
│   ├── reset-password.schema.ts
│   └── index.ts
├── user/              # User management schemas
│   ├── profile.schema.ts
│   ├── settings.schema.ts
│   └── index.ts
├── common/            # Reusable components
│   ├── fields.ts      # Common field validators
│   ├── validators.ts  # Custom validators
│   └── index.ts
└── index.ts           # Central export
```

## 🚀 Cách sử dụng

### Import schema trong component

```typescript
import { loginSchema, LoginFormData } from "@/schemas/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const { handleSubmit, control } = useForm<LoginFormData>({
  resolver: yupResolver(loginSchema),
});
```

### Sử dụng common fields

```typescript
import { emailField, passwordField } from "@/schemas/common";
import * as y from "yup";

const mySchema = y.object({
  email: emailField,
  password: passwordField(8), // minimum 8 characters
});
```

## 📝 Quy tắc đặt tên

### File names
- Schema files: `{feature-name}.schema.ts`
- Example: `login.schema.ts`, `profile.schema.ts`

### Export names
- Schema: `{featureName}Schema`
- Type: `{FeatureName}FormData`

```typescript
// ✅ Correct
export const loginSchema = y.object({ ... });
export type LoginFormData = y.InferType<typeof loginSchema>;

// ❌ Incorrect
export const LoginSchema = y.object({ ... });
export type LoginData = y.InferType<typeof LoginSchema>;
```

## 🎯 Tạo schema mới

### 1. Tạo file schema

```typescript
// src/schemas/user/profile.schema.ts
import * as y from "yup";
import { emailField } from "../common/fields";

/**
 * User profile form validation schema
 * @description Validates user profile information
 */
export const profileSchema = y.object({
  name: y.string()
    .min(2, "Tên phải có ít nhất 2 ký tự")
    .required("Tên là bắt buộc"),
  email: emailField,
  phone: y.string()
    .matches(/^[0-9]{10}$/, "Số điện thoại không hợp lệ")
    .optional(),
  bio: y.string()
    .max(500, "Bio không được quá 500 ký tự")
    .optional(),
});

export type ProfileFormData = y.InferType<typeof profileSchema>;
```

### 2. Export trong index.ts

```typescript
// src/schemas/user/index.ts
export * from "./profile.schema";
export * from "./settings.schema";
```

### 3. Sử dụng trong component

```typescript
import { profileSchema, ProfileFormData } from "@/schemas/user";
```

## 🔧 Common Fields

### Available fields

```typescript
import {
  emailField,
  passwordField,
  usernameField,
  phoneField,
  urlField,
} from "@/schemas/common";
```

### Field descriptions

- **emailField**: Email validation với format check
- **passwordField(minLength)**: Password với độ dài tùy chỉnh
- **usernameField**: Username validation
- **phoneField**: Vietnamese phone number
- **urlField**: URL validation

## ✨ Best Practices

### 1. Sử dụng common fields khi có thể

```typescript
// ✅ Good - Reuse common field
import { emailField } from "@/schemas/common";
const schema = y.object({ email: emailField });

// ❌ Bad - Duplicate validation
const schema = y.object({
  email: y.string().email().required()
});
```

### 2. Thêm JSDoc comments

```typescript
/**
 * Login form validation schema
 * @description Validates username and password for user authentication
 * @example
 * const form = useForm<LoginFormData>({
 *   resolver: yupResolver(loginSchema)
 * });
 */
export const loginSchema = y.object({ ... });
```

### 3. Group related schemas

```typescript
// src/schemas/auth/index.ts
export * from "./login.schema";
export * from "./register.schema";
export * from "./forgot-password.schema";
```

### 4. Type safety

```typescript
// ✅ Always export type
export type LoginFormData = y.InferType<typeof loginSchema>;

// ✅ Use in component
const form = useForm<LoginFormData>({ ... });
```

## 🧪 Testing schemas

```typescript
import { loginSchema } from "@/schemas/auth";

describe("loginSchema", () => {
  it("should validate correct data", async () => {
    const validData = {
      username: "testuser",
      password: "password123",
    };
    
    await expect(loginSchema.validate(validData)).resolves.toBeTruthy();
  });

  it("should reject invalid data", async () => {
    const invalidData = {
      username: "test", // too short
      password: "123",  // too short
    };
    
    await expect(loginSchema.validate(invalidData)).rejects.toThrow();
  });
});
```

## 📚 Examples

### Simple schema

```typescript
export const loginSchema = y.object({
  username: y.string().min(6).required(),
  password: y.string().min(6).required(),
});
```

### Complex schema with custom validation

```typescript
export const registerSchema = y.object({
  username: usernameField,
  email: emailField,
  password: passwordField(8),
  confirmPassword: y.string()
    .oneOf([y.ref("password")], "Mật khẩu không khớp")
    .required("Xác nhận mật khẩu là bắt buộc"),
  terms: y.boolean()
    .oneOf([true], "Bạn phải đồng ý với điều khoản")
    .required(),
});
```

### Schema with conditional validation

```typescript
export const profileSchema = y.object({
  type: y.string().oneOf(["personal", "business"]).required(),
  name: y.string().required(),
  companyName: y.string().when("type", {
    is: "business",
    then: (schema) => schema.required("Tên công ty là bắt buộc"),
    otherwise: (schema) => schema.optional(),
  }),
});
```

## 🔄 Migration từ inline schemas

### Before (inline schema)

```typescript
// LoginForm.tsx
const loginSchema = y.object({
  username: y.string().min(6).required(),
  password: y.string().min(6).required(),
});

const form = useForm({
  resolver: yupResolver(loginSchema),
});
```

### After (centralized schema)

```typescript
// src/schemas/auth/login.schema.ts
export const loginSchema = y.object({
  username: y.string().min(6).required(),
  password: y.string().min(6).required(),
});

// LoginForm.tsx
import { loginSchema, LoginFormData } from "@/schemas/auth";

const form = useForm<LoginFormData>({
  resolver: yupResolver(loginSchema),
});
```

## 🎓 Tips

1. **Reuse common fields** - Giảm duplicate code
2. **Add JSDoc** - Giúp team hiểu schema
3. **Export types** - Type safety cho components
4. **Group by feature** - Dễ tìm và maintain
5. **Test your schemas** - Ensure validation works

## 🆘 Troubleshooting

### Schema không tìm thấy
- Check import path: `@/schemas/{feature}`
- Verify export trong `index.ts`

### Type errors
- Ensure type được export: `export type {Name}FormData`
- Use `y.InferType<typeof schema>`

### Validation không hoạt động
- Check yupResolver được import
- Verify schema rules đúng

## 📞 Support

Nếu có câu hỏi hoặc cần thêm common fields, liên hệ team lead hoặc tạo issue trong project.
