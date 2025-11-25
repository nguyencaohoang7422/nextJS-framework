import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get token from cookies
  const token = request.cookies.get("access_token")?.value;

  console.log(
    "🔒 Middleware - pathname:",
    pathname,
    "token:",
    token ? "exists" : "none",
  );

  // Define protected routes (routes that require authentication)
  const protectedRoutes = [
    "/dashboard",
    "/users",
    "/reports",
    "/settings",
    "/account",
  ];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // If user has token and is on root path, redirect to dashboard
  if (token && pathname === "/") {
    return;

    console.log("✅ Token found on root path, redirecting to dashboard");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If route requires auth and no token, redirect to login
  if (isProtectedRoute && !token) {
    return;

    console.log("❌ Protected route without token, redirecting to login");
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If user is logged in and tries to access login page, redirect to dashboard
  if (token && pathname === "/login") {
    return;
    console.log("✅ Token found on login page, redirecting to dashboard");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  console.log("➡️ Middleware passing through");
  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|locales|version.json).*)",
  ],
};
