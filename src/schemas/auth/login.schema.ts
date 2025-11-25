import * as y from "yup";

/**
 * Login form validation schema
 * @description Validates username and password for user authentication
 * @example
 * ```typescript
 * import { loginSchema, LoginFormData } from "@/schemas/auth";
 *
 * const form = useForm<LoginFormData>({
 *   resolver: yupResolver(loginSchema)
 * });
 * ```
 */
export const loginSchema = y.object({
  username: y
    .string()
    .min(6, "username phải có ít nhất 6 ký tự")
    .required("Username là bắt buộc"),
  password: y
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Mật khẩu là bắt buộc"),
});

/**
 * Inferred TypeScript type from loginSchema
 */
export type LoginFormData = y.InferType<typeof loginSchema>;
