import { NextResponse, type NextRequest } from 'next/server';

import { ROUTES } from '@/shared/constants';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Get token from cookies
  const token =
    request.cookies.get('access_token')?.value ||
    sessionStorage.getItem('access_token');

  console.log(
    '🔒 Middleware - pathname:',
    pathname,
    'token:',
    token ? 'exists' : 'none',
  );

  // Define protected routes (routes that require authentication)
  const protectedRoutes = [ROUTES.DASHBOARD];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // If user has token and is on root path, redirect to dashboard
  if (token && pathname === '/') {
    console.log('✅ Token found on root path, redirecting to dashboard');
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
  }

  // If route requires auth and no token, redirect to login
  if (isProtectedRoute && !token) {
    console.log('❌ Protected route without token, redirecting to login');
    const loginUrl = new URL(ROUTES.SIGN_IN, request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If user is logged in and tries to access login page, redirect to dashboard
  if (token && pathname === ROUTES.SIGN_IN) {
    console.log('✅ Token found on login page, redirecting to dashboard');
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
  }
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
    '/((?!api|_next/static|_next/image|favicon.ico|locales|version.json).*)',
  ],
};
