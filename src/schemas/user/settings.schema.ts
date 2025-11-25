import * as y from "yup";

/**
 * User settings form validation schema
 * @description Validates user preferences including language, notifications, and privacy settings
 * @example
 * ```typescript
 * import { settingsSchema, SettingsFormData } from "@/schemas/user";
 *
 * const form = useForm<SettingsFormData>({
 *   resolver: yupResolver(settingsSchema)
 * });
 * ```
 */
export const settingsSchema = y.object({
  // Language preferences
  language: y
    .string()
    .oneOf(["vi", "en"], "Ngôn ngữ không hợp lệ")
    .required("Ngôn ngữ là bắt buộc"),

  // Notification settings
  notifications: y.object({
    email: y.boolean().default(true),
    push: y.boolean().default(true),
    sms: y.boolean().default(false),
  }),

  // Privacy settings
  privacy: y.object({
    profileVisibility: y
      .string()
      .oneOf(["public", "private", "friends"], "Tùy chọn không hợp lệ")
      .default("public"),
    showEmail: y.boolean().default(false),
    showPhone: y.boolean().default(false),
  }),

  // Display preferences
  theme: y
    .string()
    .oneOf(["light", "dark", "auto"], "Theme không hợp lệ")
    .default("auto"),

  // Email preferences
  emailPreferences: y.object({
    newsletter: y.boolean().default(false),
    productUpdates: y.boolean().default(true),
    securityAlerts: y.boolean().default(true),
  }),
});

/**
 * Inferred TypeScript type from settingsSchema
 */
export type SettingsFormData = y.InferType<typeof settingsSchema>;
