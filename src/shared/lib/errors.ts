import { AxiosError } from "axios";

// ============================================
// Custom Error Classes
// ============================================

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export class AuthError extends AppError {
  constructor(message: string = "Authentication failed") {
    super(message, "AUTH_ERROR", 401);
    this.name = "AuthError";
  }
}

export class ValidationError extends AppError {
  constructor(
    message: string = "Validation failed",
    public fields?: Record<string, string>,
  ) {
    super(message, "VALIDATION_ERROR", 400);
    this.name = "ValidationError";
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = "Resource not found") {
    super(message, "NOT_FOUND", 404);
    this.name = "NotFoundError";
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = "Access forbidden") {
    super(message, "FORBIDDEN", 403);
    this.name = "ForbiddenError";
  }
}

// ============================================
// Error Parser
// ============================================

export interface ParsedError {
  message: string;
  code?: string;
  statusCode?: number;
  fields?: Record<string, string>;
}

export function parseApiError(error: unknown): ParsedError {
  // Handle Axios errors
  if (error instanceof AxiosError) {
    const statusCode = error.response?.status;
    const data = error.response?.data;

    return {
      message:
        data?.message || data?.error || error.message || "An error occurred",
      code: data?.code || `HTTP_${statusCode}`,
      statusCode,
      fields: data?.fields,
    };
  }

  // Handle custom app errors
  if (error instanceof AppError) {
    return {
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
      fields: error instanceof ValidationError ? error.fields : undefined,
    };
  }

  // Handle generic errors
  if (error instanceof Error) {
    return {
      message: error.message,
      code: "UNKNOWN_ERROR",
    };
  }

  // Handle unknown errors
  return {
    message: "An unknown error occurred",
    code: "UNKNOWN_ERROR",
  };
}

// ============================================
// Error Messages
// ============================================

export const ERROR_MESSAGES = {
  // Auth errors
  INVALID_CREDENTIALS: "Invalid email or password",
  UNAUTHORIZED: "You are not authorized to perform this action",
  SESSION_EXPIRED: "Your session has expired. Please login again",

  // User errors
  USER_NOT_FOUND: "User not found",
  USER_ALREADY_EXISTS: "A user with this email already exists",

  // Validation errors
  REQUIRED_FIELD: "This field is required",
  INVALID_EMAIL: "Please enter a valid email address",
  INVALID_PASSWORD:
    "Password must be at least 8 characters with uppercase, lowercase, and number",
  PASSWORD_MISMATCH: "Passwords do not match",

  // Network errors
  NETWORK_ERROR: "Network error. Please check your connection",
  SERVER_ERROR: "Server error. Please try again later",
  TIMEOUT_ERROR: "Request timeout. Please try again",

  // Generic errors
  UNKNOWN_ERROR: "An unexpected error occurred",
  OPERATION_FAILED: "Operation failed. Please try again",
} as const;

// ============================================
// Error Utilities
// ============================================

export function getErrorMessage(error: unknown): string {
  const parsed = parseApiError(error);
  return parsed.message;
}

export function isAuthError(error: unknown): boolean {
  if (error instanceof AuthError) return true;
  if (error instanceof AxiosError) {
    return error.response?.status === 401;
  }
  return false;
}

export function isValidationError(error: unknown): boolean {
  if (error instanceof ValidationError) return true;
  if (error instanceof AxiosError) {
    return error.response?.status === 400;
  }
  return false;
}

export function isForbiddenError(error: unknown): boolean {
  if (error instanceof ForbiddenError) return true;
  if (error instanceof AxiosError) {
    return error.response?.status === 403;
  }
  return false;
}

export function isNotFoundError(error: unknown): boolean {
  if (error instanceof NotFoundError) return true;
  if (error instanceof AxiosError) {
    return error.response?.status === 404;
  }
  return false;
}
