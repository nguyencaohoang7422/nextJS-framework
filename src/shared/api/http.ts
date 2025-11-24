import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { API_BASE } from "../constants";
import { parseApiError } from "../lib/errors";
import { toast } from "../lib/toast";

type Config = InternalAxiosRequestConfig;
// Create axios instance
export const http = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // Send cookies (JWT) to backend
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 seconds
});

// ============================================
// Request Interceptor
// ============================================

http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Log request in development
    if (process.env.NODE_ENV === "development") {
      console.log(
        `[API Request] ${config.method?.toUpperCase()} ${config.url}`,
      );
    }

    // You can add custom headers here if needed
    // For example, add a request ID for tracking
    config.headers["X-Request-ID"] = Math.random().toString(36).substring(2, 9);

    return config;
  },
  (error) => {
    console.error("[API Request Error]", error);
    return Promise.reject(error);
  },
);

// ============================================
// Response Interceptor
// ============================================

http.interceptors.response.use(
  (response) => {
    // Log response in development
    if (process.env.NODE_ENV === "development") {
      console.log(`[API Response] ${response.config.url}`, response.data);
    }
    return response;
  },
  async (error: AxiosError) => {
    const parsedError = parseApiError(error);

    // Log error in development
    if (process.env.NODE_ENV === "development") {
      console.error("[API Error]", {
        url: error.config?.url,
        status: error.response?.status,
        message: parsedError.message,
      });
    }

    // Handle specific error cases
    if (parsedError.statusCode === 401) {
      // Unauthorized - token expired or invalid
      // You can redirect to login here if needed
      // But we'll let the component handle it via React Query
      console.warn("Unauthorized request - token may be expired");
    }

    if (parsedError.statusCode === 403) {
      // Forbidden - user doesn't have permission
      toast.error("You don't have permission to perform this action");
    }

    if (parsedError.statusCode === 404) {
      // Not found
      toast.error("Resource not found");
    }

    if (parsedError.statusCode && parsedError.statusCode >= 500) {
      // Server error
      toast.error("Server error. Please try again later");
    }

    // Network error
    if (!error.response) {
      toast.error("Network error. Please check your connection");
    }

    return Promise.reject(error);
  },
);

// ============================================
// Helper Functions
// ============================================

/**
 * Wrapper for GET requests with better typing
 */
export async function get<T>(url: string, config?: Config): Promise<T> {
  const response = await http.get<T>(url, config);
  return response.data;
}

/**
 * Wrapper for POST requests with better typing
 */
export async function post<T>(
  url: string,
  data?: T,
  config?: Config,
): Promise<T> {
  const response = await http.post<T>(url, data, config);
  return response.data;
}

/**
 * Wrapper for PUT requests with better typing
 */
export async function put<T>(
  url: string,
  data?: T,
  config?: Config,
): Promise<T> {
  const response = await http.put<T>(url, data, config);
  return response.data;
}

/**
 * Wrapper for PATCH requests with better typing
 */
export async function patch<T>(
  url: string,
  data?: T,
  config?: Config,
): Promise<T> {
  const response = await http.patch<T>(url, data, config);
  return response.data;
}

/**
 * Wrapper for DELETE requests with better typing
 */
export async function del<T>(url: string, config?: Config): Promise<T> {
  const response = await http.delete<T>(url, config);
  return response.data;
}
