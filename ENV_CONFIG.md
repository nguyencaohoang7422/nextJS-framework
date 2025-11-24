# Environment Configuration Guide

This document describes all environment variables used in the application.

## Setup Instructions

### Development
1. Copy this file's content to `.env.local` in the project root
2. Update the values as needed
3. Restart the development server

### Production
1. Set these variables in your hosting platform (Vercel, AWS, etc.)
2. Use strong, unique values for all secrets
3. Never commit actual `.env` files to version control

---

## Environment Variables

### Application Configuration

```bash
# Application Environment
NODE_ENV=development  # development | production | test

# App Metadata
NEXT_PUBLIC_APP_NAME="My Framework"
NEXT_PUBLIC_APP_URL=http://localhost:3000  # Change to your domain in production
```

### Authentication & Security

```bash
# JWT Secret - CRITICAL: Use a strong, random secret in production!
# Generate with: openssl rand -base64 32
JWT_SECRET=dev-secret-key-change-in-production-12345678

# JWT Token Expiration
JWT_EXPIRES_IN=7d  # 7 days

# Cookie Configuration
COOKIE_NAME=app_token
```

### API Configuration

```bash
# API Base URL (for client-side requests)
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# API Request Timeout (milliseconds)
NEXT_PUBLIC_API_TIMEOUT=10000
```

### Database (Optional - for future use)

```bash
# PostgreSQL
# DATABASE_URL=postgresql://user:password@localhost:5432/mydb
# DATABASE_POOL_MIN=2
# DATABASE_POOL_MAX=10

# MongoDB
# MONGODB_URI=mongodb://localhost:27017/mydb
# MONGODB_DB_NAME=mydb
```

### Email Service (Optional - for future use)

```bash
# SMTP Configuration
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_SECURE=false
# SMTP_USER=your-email@gmail.com
# SMTP_PASSWORD=your-app-password
# SMTP_FROM=noreply@yourapp.com
# SMTP_FROM_NAME="My Framework"
```

### External Services (Optional - for future use)

```bash
# AWS S3 for file uploads
# AWS_ACCESS_KEY_ID=your-access-key
# AWS_SECRET_ACCESS_KEY=your-secret-key
# AWS_REGION=us-east-1
# AWS_S3_BUCKET=your-bucket-name

# Google OAuth
# GOOGLE_CLIENT_ID=your-client-id
# GOOGLE_CLIENT_SECRET=your-client-secret
# GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/callback/google

# GitHub OAuth
# GITHUB_CLIENT_ID=your-client-id
# GITHUB_CLIENT_SECRET=your-client-secret
# GITHUB_CALLBACK_URL=http://localhost:3000/api/auth/callback/github
```

### Logging & Monitoring

```bash
# Log Level
LOG_LEVEL=debug  # debug | info | warn | error

# Sentry Error Tracking
# SENTRY_DSN=https://your-sentry-dsn
# SENTRY_ENVIRONMENT=development
```

### Feature Flags

```bash
# Enable/Disable Features
NEXT_PUBLIC_ENABLE_REGISTRATION=true
NEXT_PUBLIC_ENABLE_SOCIAL_LOGIN=false
NEXT_PUBLIC_ENABLE_EMAIL_VERIFICATION=false
NEXT_PUBLIC_ENABLE_TWO_FACTOR_AUTH=false
```

### Development Tools

```bash
# React Query Devtools
NEXT_PUBLIC_ENABLE_REACT_QUERY_DEVTOOLS=true

# Debug Mode (verbose logging)
NEXT_PUBLIC_DEBUG_MODE=true
```

---

## Production Environment Example

For production, create a `.env.production` file or set these in your hosting platform:

```bash
NODE_ENV=production
NEXT_PUBLIC_APP_NAME="My Framework"
NEXT_PUBLIC_APP_URL=https://yourapp.com

# Use strong, unique secrets!
JWT_SECRET=<generate-with-openssl-rand-base64-32>
JWT_EXPIRES_IN=7d
COOKIE_NAME=app_token

NEXT_PUBLIC_API_URL=https://yourapp.com/api
NEXT_PUBLIC_API_TIMEOUT=10000

# Database
DATABASE_URL=postgresql://user:password@your-db-host:5432/production_db

# Email
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=<your-sendgrid-api-key>
SMTP_FROM=noreply@yourapp.com

# Monitoring
SENTRY_DSN=https://your-production-sentry-dsn
LOG_LEVEL=error

# Feature Flags
NEXT_PUBLIC_ENABLE_REGISTRATION=true
NEXT_PUBLIC_ENABLE_SOCIAL_LOGIN=true
NEXT_PUBLIC_ENABLE_EMAIL_VERIFICATION=true

# Disable dev tools in production
NEXT_PUBLIC_ENABLE_REACT_QUERY_DEVTOOLS=false
NEXT_PUBLIC_DEBUG_MODE=false
```

---

## Security Best Practices

1. **Never commit `.env` files** - They're in `.gitignore` for a reason
2. **Use strong secrets** - Generate with `openssl rand -base64 32`
3. **Rotate secrets regularly** - Especially after team member changes
4. **Use different secrets** - Never reuse secrets across environments
5. **Limit access** - Only give production secrets to necessary personnel
6. **Use secret management** - Consider AWS Secrets Manager, HashiCorp Vault, etc.

---

## Accessing Environment Variables

### Server-side (API routes, middleware)
```typescript
const jwtSecret = process.env.JWT_SECRET;
const dbUrl = process.env.DATABASE_URL;
```

### Client-side (React components)
Only variables prefixed with `NEXT_PUBLIC_` are available:
```typescript
const appName = process.env.NEXT_PUBLIC_APP_NAME;
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

---

## Troubleshooting

### Variables not loading?
1. Restart the development server after changing `.env` files
2. Check that the file is named exactly `.env.local` (not `.env.local.txt`)
3. Ensure no spaces around the `=` sign
4. For client-side variables, ensure they start with `NEXT_PUBLIC_`

### Production deployment issues?
1. Verify all required variables are set in your hosting platform
2. Check that secrets are properly escaped (no quotes needed usually)
3. Ensure `NODE_ENV=production` is set
