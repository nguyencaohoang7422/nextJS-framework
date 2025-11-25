/**
 * Environment Configuration
 *
 * Centralized access to environment variables with type safety and validation.
 * This file provides a single source of truth for all environment configuration.
 */

// ============================================
// Type Definitions
// ============================================

type Environment = "development" | "production" | "test";

interface AppConfig {
  env: Environment;
  isDevelopment: boolean;
  isProduction: boolean;
  isTest: boolean;
  appName: string;
  appUrl: string;
}

interface AuthConfig {
  jwtSecret: string;
  jwtExpiresIn: string;
  cookieName: string;
}

interface ApiConfig {
  baseUrl: string;
  timeout: number;
}

interface FeatureFlags {
  enableRegistration: boolean;
  enableSocialLogin: boolean;
  enableEmailVerification: boolean;
  enableReactQueryDevtools: boolean;
  debugMode: boolean;
}

interface DatabaseConfig {
  url?: string;
  poolMin?: number;
  poolMax?: number;
}

interface EmailConfig {
  smtpHost?: string;
  smtpPort?: number;
  smtpUser?: string;
  smtpPassword?: string;
  smtpFrom?: string;
}

interface LoggingConfig {
  level: string;
  sentryDsn?: string;
}

// ============================================
// Helper Functions
// ============================================

/**
 * Get environment variable with optional default value
 */
function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key];
  if (value === undefined) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

/**
 * Get boolean environment variable
 */
function getBooleanEnv(key: string, defaultValue = false): boolean {
  const value = process.env[key];
  if (value === undefined) return defaultValue;
  return value === "true" || value === "1";
}

/**
 * Get number environment variable
 */
function getNumberEnv(key: string, defaultValue?: number): number {
  const value = process.env[key];
  if (value === undefined) {
    if (defaultValue !== undefined) return defaultValue;
    throw new Error(`Missing required environment variable: ${key}`);
  }
  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) {
    throw new Error(`Invalid number for environment variable ${key}: ${value}`);
  }
  return parsed;
}

// ============================================
// Configuration Objects
// ============================================

/**
 * Application Configuration
 */
export const appConfig: AppConfig = {
  env: getEnv("NODE_ENV", "development") as Environment,
  isDevelopment: getEnv("NODE_ENV", "development") === "development",
  isProduction: getEnv("NODE_ENV", "development") === "production",
  isTest: getEnv("NODE_ENV", "development") === "test",
  appName: getEnv("NEXT_PUBLIC_APP_NAME", "My Framework"),
  appUrl: getEnv("NEXT_PUBLIC_APP_URL", "http://localhost:3002"),
};

/**
 * Authentication Configuration
 */
export const authConfig: AuthConfig = {
  jwtSecret: getEnv("JWT_SECRET", "dev-secret"),
  jwtExpiresIn: getEnv("JWT_EXPIRES_IN", "7d"),
  cookieName: getEnv("COOKIE_NAME", "demo_token"),
};

/**
 * API Configuration
 */
export const apiConfig: ApiConfig = {
  baseUrl: getEnv("NEXT_PUBLIC_API_URL", "http://localhost:3002"),
  timeout: getNumberEnv("NEXT_PUBLIC_API_TIMEOUT", 30000),
};

/**
 * Feature Flags
 */
export const featureFlags: FeatureFlags = {
  enableRegistration: getBooleanEnv("NEXT_PUBLIC_ENABLE_REGISTRATION", true),
  enableSocialLogin: getBooleanEnv("NEXT_PUBLIC_ENABLE_SOCIAL_LOGIN", false),
  enableEmailVerification: getBooleanEnv(
    "NEXT_PUBLIC_ENABLE_EMAIL_VERIFICATION",
    false,
  ),
  enableReactQueryDevtools: getBooleanEnv(
    "NEXT_PUBLIC_ENABLE_REACT_QUERY_DEVTOOLS",
    true,
  ),
  debugMode: getBooleanEnv("NEXT_PUBLIC_DEBUG_MODE", appConfig.isDevelopment),
};

/**
 * Database Configuration (Optional)
 */
export const databaseConfig: DatabaseConfig = {
  url: process.env.DATABASE_URL,
  poolMin: process.env.DATABASE_POOL_MIN
    ? parseInt(process.env.DATABASE_POOL_MIN, 10)
    : undefined,
  poolMax: process.env.DATABASE_POOL_MAX
    ? parseInt(process.env.DATABASE_POOL_MAX, 10)
    : undefined,
};

/**
 * Email Configuration (Optional)
 */
export const emailConfig: EmailConfig = {
  smtpHost: process.env.SMTP_HOST,
  smtpPort: process.env.SMTP_PORT
    ? parseInt(process.env.SMTP_PORT, 10)
    : undefined,
  smtpUser: process.env.SMTP_USER,
  smtpPassword: process.env.SMTP_PASSWORD,
  smtpFrom: process.env.SMTP_FROM,
};

/**
 * Logging Configuration
 */
export const loggingConfig: LoggingConfig = {
  level: getEnv("LOG_LEVEL", "debug"),
  sentryDsn: process.env.SENTRY_DSN,
};

// ============================================
// Validation
// ============================================

/**
 * Validate required environment variables
 * Call this at application startup
 */
export function validateEnv(): void {
  const errors: string[] = [];

  // Check critical variables in production
  if (appConfig.isProduction) {
    if (authConfig.jwtSecret === "dev-secret") {
      errors.push("JWT_SECRET must be set to a secure value in production");
    }

    if (appConfig.appUrl.includes("localhost")) {
      errors.push("NEXT_PUBLIC_APP_URL must be set to production URL");
    }
  }

  if (errors.length > 0) {
    throw new Error(
      `Environment validation failed:\n${errors.map((e) => `  - ${e}`).join("\n")}`,
    );
  }
}

// ============================================
// Exports
// ============================================

/**
 * All configuration in one object
 */
export const config = {
  app: appConfig,
  auth: authConfig,
  api: apiConfig,
  features: featureFlags,
  database: databaseConfig,
  email: emailConfig,
  logging: loggingConfig,
} as const;

// Export individual configs for convenience
export default config;
