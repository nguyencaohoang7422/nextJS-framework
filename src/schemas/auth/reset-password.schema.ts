import * as y from "yup";
import { passwordField } from "../common/fields";

/**
 * Reset password form validation schema
 * @description Validates new password and confirmation for password reset
 * @example
 * ```typescript
 * import { resetPasswordSchema, ResetPasswordFormData } from "@/schemas/auth";
 *
 * const form = useForm<ResetPasswordFormData>({
 *   resolver: yupResolver(resetPasswordSchema)
 * });
 * ```
 */
export const resetPasswordSchema = y.object({
  token: y.string().required("Token là bắt buộc"),
  newPassword: passwordField(8),
  confirmPassword: y
    .string()
    .oneOf([y.ref("newPassword")], "Mật khẩu không khớp")
    .required("Xác nhận mật khẩu là bắt buộc"),
});

/**
 * Inferred TypeScript type from resetPasswordSchema
 */
export type ResetPasswordFormData = y.InferType<typeof resetPasswordSchema>;
