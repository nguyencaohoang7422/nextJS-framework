import * as y from "yup";
import { emailField } from "../common/fields";

/**
 * Forgot password form validation schema
 * @description Validates email for password recovery
 * @example
 * ```typescript
 * import { forgotPasswordSchema, ForgotPasswordFormData } from "@/schemas/auth";
 *
 * const form = useForm<ForgotPasswordFormData>({
 *   resolver: yupResolver(forgotPasswordSchema)
 * });
 * ```
 */
export const forgotPasswordSchema = y.object({
  email: emailField,
});

/**
 * Inferred TypeScript type from forgotPasswordSchema
 */
export type ForgotPasswordFormData = y.InferType<typeof forgotPasswordSchema>;
