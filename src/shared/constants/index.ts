import { UserRole } from "../types";

// ============================================
// API Configuration
// ============================================

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
const API_SCHEME = process.env.NEXT_PUBLIC_API_SCHEME;
const API_PORT = process.env.NEXT_PUBLIC_API_PORT;
const API_PATH = process.env.NEXT_PUBLIC_API_PATH;
export const API_BASE = `${API_SCHEME}://${API_HOST}:${API_PORT}/${API_PATH}`;

export const API_CONFIG = {
  BASE_URL: API_BASE,
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
} as const;

// ============================================
// API Endpoints
// ============================================

export const API_ENDPOINTS = {
  auth: {
    login: "users/login",
    register: "users/register",
    logout: "users/logout",
    me: "users/me",
    forgotPassword: "users/forgot-password",
    resetPassword: "users/reset-password",
  },
  users: {
    list: "/api/users",
    detail: (id: string) => `/api/users/${id}`,
    create: "/api/users",
    update: (id: string) => `/api/users/${id}`,
    delete: (id: string) => `/api/users/${id}`,
  },
} as const;

// ============================================
// Pagination
// ============================================

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  MAX_PAGE_SIZE: 100,
} as const;

// ============================================
// User Roles & Permissions
// ============================================

export const ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.ADMIN]: "Administrator",
  [UserRole.MANAGER]: "Manager",
  [UserRole.USER]: "User",
};

export const ROLE_COLORS: Record<UserRole, string> = {
  [UserRole.ADMIN]: "red",
  [UserRole.MANAGER]: "blue",
  [UserRole.USER]: "green",
};

// ============================================
// Validation Rules
// ============================================

export const VALIDATION = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Invalid email format",
  },
  password: {
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    message:
      "Password must be at least 8 characters with uppercase, lowercase, and number",
  },
  name: {
    minLength: 2,
    maxLength: 50,
    message: "Name must be between 2 and 50 characters",
  },
  phone: {
    pattern: /^[0-9]{10,11}$/,
    message: "Phone number must be 10-11 digits",
  },
} as const;

// ============================================
// Cookie & Storage
// ============================================

export const STORAGE_KEYS = {
  TOKEN: "app_token",
  USER: "app_user",
  THEME: "app_theme",
  LANGUAGE: "app_language",
  SIDEBAR_OPEN: "app_sidebar_open",
} as const;

// ============================================
// Routes
// ============================================

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  DASHBOARD: "/dashboard",
  USERS: "/dashboard/users",
  USER_DETAIL: (id: string) => `/dashboard/users/${id}`,
  PROFILE: "/dashboard/profile",
} as const;

// ============================================
// Query Keys
// ============================================

export const QUERY_KEYS = {
  auth: {
    me: ["auth", "me"] as const,
  },
  users: {
    all: ["users"] as const,
    list: (filters?: Record<string, unknown>) =>
      ["users", "list", filters] as const,
    detail: (id: string) => ["users", "detail", id] as const,
  },
} as const;
