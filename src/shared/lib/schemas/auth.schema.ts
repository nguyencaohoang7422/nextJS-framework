import { VALIDATION } from "@/shared/constants";
import * as yup from "yup";

// ============================================
// Login Schema
// ============================================

export const loginSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(VALIDATION.password.minLength, VALIDATION.password.message),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;

// ============================================
// Register Schema
// ============================================

export const registerSchema = yup.object({
  username: yup
    .string()
    .required("Name is required")
    .min(VALIDATION.name.minLength, VALIDATION.name.message)
    .max(VALIDATION.name.maxLength, VALIDATION.name.message),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(VALIDATION.password.minLength, VALIDATION.password.message)
    .matches(VALIDATION.password.pattern, VALIDATION.password.message),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

export type RegisterFormData = yup.InferType<typeof registerSchema>;

// ============================================
// Forgot Password Schema
// ============================================

export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
});

export type ForgotPasswordFormData = yup.InferType<typeof forgotPasswordSchema>;

// ============================================
// Reset Password Schema
// ============================================

export const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .required("Password is required")
    .min(VALIDATION.password.minLength, VALIDATION.password.message)
    .matches(VALIDATION.password.pattern, VALIDATION.password.message),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

export type ResetPasswordFormData = yup.InferType<typeof resetPasswordSchema>;
