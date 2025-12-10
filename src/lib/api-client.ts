import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';

import { API_BASE } from '@/shared/constants';
import { parseApiError, ParsedError } from '@/shared/lib/errors';
import { toast } from '@/shared/lib/toast';
import { useStore } from '@/stores';

/**
 * Configuration for the API client
 */
interface ApiClientConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

/**
 * Enhanced API Client with interceptors and error handling
 */
class ApiClient {
  private instance: AxiosInstance;

  constructor(config: ApiClientConfig) {
    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 30000,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
      withCredentials: false, // Set to true if using cookies
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request Interceptor
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Log request in development
        if (process.env.NODE_ENV === 'development') {
          console.log(
            `[API Request] ${config.method?.toUpperCase()} ${config.url}`,
          );
        }

        // Get token from store
        // Note: This creates a dependency on the store.
        // In a more decoupled architecture, we might inject a token provider.
        const token = useStore.getState().auth.user?.token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        const randomUUID = self.crypto.randomUUID();
        // Add Request ID for tracking
        config.headers['X-Request-ID'] = randomUUID;
        return config;
      },
      (error) => {
        console.error('[API Request Error]', error);
        return Promise.reject(error);
      },
    );

    // Response Interceptor
    this.instance.interceptors.response.use(
      (response) => {
        // Log response in development
        if (process.env.NODE_ENV === 'development') {
          console.log(`[API Response] ${response.config.url}`, response.data);
        }
        return response;
      },
      async (error: AxiosError) => {
        const parsedError = parseApiError(error);

        // Log error in development
        if (process.env.NODE_ENV === 'development') {
          console.error('[API Error]', {
            url: error.config?.url,
            status: error.response?.status,
            message: parsedError.message,
          });
        }

        // Global Error Handling
        this.handleError(parsedError);

        return Promise.reject(error);
      },
    );
  }

  private handleError(error: ParsedError) {
    const { statusCode, message } = error;

    switch (statusCode) {
      case 401:
        // Unauthorized
        console.warn('Unauthorized request - token may be expired');
        // Optional: Trigger logout or refresh token here
        // useStore.getState().auth.logout();
        break;
      case 403:
        toast.error("You don't have permission to perform this action");
        break;
      case 404:
        toast.error('Resource not found');
        break;
      case 500:
        toast.error('Server error. Please try again later');
        break;
      default:
        // Only show toast for network errors or unknown errors if needed
        // We don't want to spam toasts for every validation error (400)
        if (!statusCode) {
          toast.error(message || 'Network error');
        }
        break;
    }
  }

  // Public API Methods

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.get<T>(url, config);
    return response.data;
  }

  public async post<TResponse, TData = unknown>(
    url: string,
    data?: TData,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> {
    const response = await this.instance.post<TResponse>(url, data, config);
    return response.data;
  }

  public async put<TResponse, TData = unknown>(
    url: string,
    data?: TData,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> {
    const response = await this.instance.put<TResponse>(url, data, config);
    return response.data;
  }

  public async patch<TResponse, TData = unknown>(
    url: string,
    data?: TData,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> {
    const response = await this.instance.patch<TResponse>(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.delete<T>(url, config);
    return response.data;
  }

  /**
   * Expose the raw axios instance if needed
   */
  public get axiosInstance(): AxiosInstance {
    return this.instance;
  }
}

// Export singleton instance
export const apiClient = new ApiClient({
  baseURL: API_BASE,
});
