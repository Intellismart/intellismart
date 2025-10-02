import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import * as jwt from 'jsonwebtoken';

// Paths that don't require authentication
const publicPaths = [
  '/',
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/auth/verify-email',
  '/api/auth',
  '/_next',
  '/favicon.ico',
];

// Paths that are only accessible to authenticated users
const authPaths = [
  '/dashboard',
  '/account',
  '/checkout',
  '/orders',
];

// Paths that require admin privileges
const adminPaths = [
  '/admin',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for public paths
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Get the token from the request
  const token = await getToken({ req: request });
  
  // Redirect to login if not authenticated and trying to access protected route
  if (!token && (authPaths.some(path => pathname.startsWith(path)) || 
                 adminPaths.some(path => pathname.startsWith(path)))) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  // Check admin access
  if (adminPaths.some(path => pathname.startsWith(path))) {
    if (token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }
  
  // For authenticated users trying to access auth pages, redirect to dashboard
  if (token && pathname.startsWith('/auth/')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Handle API routes with JWT
  if (pathname.startsWith('/api/')) {
    try {
      // Get token from Authorization header
      const authHeader = request.headers.get('authorization');
      const apiToken = authHeader?.split(' ')[1];

      if (!apiToken) {
        return new NextResponse(
          JSON.stringify({ error: 'Authentication required' }),
          { status: 401, headers: { 'content-type': 'application/json' } }
        );
      }

      // Verify token
      const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
      const decoded = jwt.verify(apiToken, JWT_SECRET) as { userId: string; email: string; role: string };

      // Add user info to request headers
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user-id', decoded.userId);
      requestHeaders.set('x-user-email', decoded.email);
      requestHeaders.set('x-user-role', decoded.role);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      console.error('Authentication error:', error);
      return new NextResponse(
        JSON.stringify({ error: 'Invalid or expired token' }),
        { status: 401, headers: { 'content-type': 'application/json' } }
      );
    }
  }

  return NextResponse.next();
}

// Configure which paths to apply the middleware to
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
