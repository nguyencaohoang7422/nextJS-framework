import * as y from "yup";
import { emailField, nameField, phoneField, textField } from "../common/fields";

/**
 * User profile form validation schema
 * @description Validates user profile information including name, email, phone, and bio
 * @example
 * ```typescript
 * import { profileSchema, ProfileFormData } from "@/schemas/user";
 *
 * const form = useForm<ProfileFormData>({
 *   resolver: yupResolver(profileSchema)
 * });
 * ```
 */
export const profileSchema = y.object({
  name: nameField,
  email: emailField,
  phone: phoneField,
  avatar: y.string().url("URL ảnh không hợp lệ").optional(),
  bio: textField(500),
  address: y
    .object({
      street: y.string().optional(),
      city: y.string().optional(),
      country: y.string().optional(),
      postalCode: y.string().optional(),
    })
    .optional(),
});

/**
 * Inferred TypeScript type from profileSchema
 */
export type ProfileFormData = y.InferType<typeof profileSchema>;
