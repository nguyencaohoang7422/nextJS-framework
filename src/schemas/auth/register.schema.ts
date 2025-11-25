import * as y from "yup";
import { emailField, passwordField, usernameField } from "../common/fields";

/**
 * User registration form validation schema
 * @description Validates user registration with email, username, password confirmation, and terms acceptance
 * @example
 * ```typescript
 * import { registerSchema, RegisterFormData } from "@/schemas/auth";
 *
 * const form = useForm<RegisterFormData>({
 *   resolver: yupResolver(registerSchema)
 * });
 * ```
 */
export const registerSchema = y.object({
  email: emailField,
  username: usernameField,
  password: passwordField(8),
  confirmPassword: y
    .string()
    .oneOf([y.ref("password")], "Mật khẩu không khớp")
    .required("Xác nhận mật khẩu là bắt buộc"),
  terms: y
    .boolean()
    .oneOf([true], "Bạn phải đồng ý với điều khoản sử dụng")
    .required("Bạn phải đồng ý với điều khoản sử dụng"),
});

/**
 * Inferred TypeScript type from registerSchema
 */
export type RegisterFormData = y.InferType<typeof registerSchema>;
