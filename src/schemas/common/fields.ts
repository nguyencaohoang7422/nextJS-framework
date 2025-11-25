import * as y from "yup";

/**
 * Common email field validator
 * @description Validates email format and requires input
 */
export const emailField = y
  .string()
  .email("Email không hợp lệ")
  .required("Email là bắt buộc");

/**
 * Common password field validator
 * @param minLength - Minimum password length (default: 6)
 * @description Validates password with customizable minimum length
 */
export const passwordField = (minLength = 6) =>
  y
    .string()
    .min(minLength, `Mật khẩu phải có ít nhất ${minLength} ký tự`)
    .required("Mật khẩu là bắt buộc");

/**
 * Strong password field validator
 * @description Requires password with uppercase, lowercase, number, and special character
 */
export const strongPasswordField = y
  .string()
  .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    "Mật khẩu phải chứa chữ hoa, chữ thường, số và ký tự đặc biệt",
  )
  .required("Mật khẩu là bắt buộc");

/**
 * Common username field validator
 * @description Validates username with alphanumeric characters and underscores
 */
export const usernameField = y
  .string()
  .min(3, "Tên người dùng phải có ít nhất 3 ký tự")
  .max(20, "Tên người dùng không được quá 20 ký tự")
  .matches(
    /^[a-zA-Z0-9_]+$/,
    "Tên người dùng chỉ được chứa chữ cái, số và dấu gạch dưới",
  )
  .required("Tên người dùng là bắt buộc");

/**
 * Vietnamese phone number field validator
 * @description Validates Vietnamese phone numbers (10 digits starting with 0)
 */
export const phoneField = y
  .string()
  .matches(
    /^(0|\+84)[0-9]{9}$/,
    "Số điện thoại không hợp lệ (phải có 10 chữ số)",
  )
  .optional();

/**
 * Required phone number field validator
 */
export const requiredPhoneField = y
  .string()
  .matches(
    /^(0|\+84)[0-9]{9}$/,
    "Số điện thoại không hợp lệ (phải có 10 chữ số)",
  )
  .required("Số điện thoại là bắt buộc");

/**
 * URL field validator
 * @description Validates URL format
 */
export const urlField = y.string().url("URL không hợp lệ").optional();

/**
 * Required URL field validator
 */
export const requiredUrlField = y
  .string()
  .url("URL không hợp lệ")
  .required("URL là bắt buộc");

/**
 * Name field validator
 * @description Validates person name (2-50 characters)
 */
export const nameField = y
  .string()
  .min(2, "Tên phải có ít nhất 2 ký tự")
  .max(50, "Tên không được quá 50 ký tự")
  .required("Tên là bắt buộc");

/**
 * Optional text field with max length
 * @param maxLength - Maximum text length
 */
export const textField = (maxLength = 255) =>
  y.string().max(maxLength, `Không được quá ${maxLength} ký tự`).optional();

/**
 * Required text field with min and max length
 * @param minLength - Minimum text length
 * @param maxLength - Maximum text length
 */
export const requiredTextField = (minLength = 1, maxLength = 255) =>
  y
    .string()
    .min(minLength, `Phải có ít nhất ${minLength} ký tự`)
    .max(maxLength, `Không được quá ${maxLength} ký tự`)
    .required("Trường này là bắt buộc");

/**
 * Number field validator
 * @param min - Minimum value
 * @param max - Maximum value
 */
export const numberField = (min?: number, max?: number) => {
  let schema = y.number().typeError("Phải là số");

  if (min !== undefined) {
    schema = schema.min(min, `Phải lớn hơn hoặc bằng ${min}`);
  }

  if (max !== undefined) {
    schema = schema.max(max, `Phải nhỏ hơn hoặc bằng ${max}`);
  }

  return schema.optional();
};

/**
 * Required number field validator
 */
export const requiredNumberField = (min?: number, max?: number) => {
  let schema = y.number().typeError("Phải là số").required("Số là bắt buộc");

  if (min !== undefined) {
    schema = schema.min(min, `Phải lớn hơn hoặc bằng ${min}`);
  }

  if (max !== undefined) {
    schema = schema.max(max, `Phải nhỏ hơn hoặc bằng ${max}`);
  }

  return schema;
};

/**
 * Date field validator
 */
export const dateField = y.date().optional();

/**
 * Required date field validator
 */
export const requiredDateField = y.date().required("Ngày là bắt buộc");

/**
 * Boolean/checkbox field validator
 */
export const booleanField = y.boolean().optional();

/**
 * Required boolean field (for terms acceptance, etc.)
 */
export const requiredBooleanField = (message = "Bạn phải đồng ý") =>
  y.boolean().oneOf([true], message).required(message);
