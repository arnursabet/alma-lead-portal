import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Secret key for JWT verification (in a real app, this would be an environment variable)
const JWT_SECRET = new TextEncoder().encode('your-secret-key');

/**
 * Middleware function to handle authentication and authorization
 * 
 * @param request - The incoming request
 * @returns The response or next middleware
 */
export async function middleware(request: NextRequest) {
  // Define route types
  const isAdminLoginPage = request.nextUrl.pathname === '/admin/login';
  const isApiAuthRoute = request.nextUrl.pathname.startsWith('/api/auth');
  const isPublicApiRoute = request.nextUrl.pathname.startsWith('/api/leads') && request.method === 'POST';
  const isLeadsFormRoute = request.nextUrl.pathname === '/' || request.nextUrl.pathname === '/leads';
  const isPublicRoute = isLeadsFormRoute || request.nextUrl.pathname === '/favicon.ico';
  const isStaticAsset = request.nextUrl.pathname.startsWith('/_next') || 
                        request.nextUrl.pathname.startsWith('/public');
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin') && !isAdminLoginPage;
  const isApiAdminRoute = request.nextUrl.pathname.startsWith('/api/admin');
  const isProtectedApiRoute = request.nextUrl.pathname.startsWith('/api/leads') && 
                             request.method !== 'POST' && 
                             !isPublicApiRoute;

  // Allow static assets and public routes without authentication
  if (isStaticAsset || isPublicRoute || isApiAuthRoute || isPublicApiRoute) {
    return NextResponse.next();
  }

  // Get the auth token from cookies
  const authToken = request.cookies.get('auth_token')?.value;

  // If on login page and already authenticated, redirect to admin
  if (isAdminLoginPage && authToken) {
    try {
      // Verify the JWT token
      await jwtVerify(authToken, JWT_SECRET);
      // If verification succeeds, redirect to admin
      return NextResponse.redirect(new URL('/admin/leads', request.url));
    } catch {
      // If token is invalid, continue to login page
      // But clear the invalid token
      const response = NextResponse.next();
      response.cookies.delete('auth_token');
      return response;
    }
  }

  // If no token is present and trying to access protected route, redirect to login
  if (!authToken && (isAdminRoute || isApiAdminRoute || isProtectedApiRoute)) {
    const url = new URL('/admin/login', request.url);
    url.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // If token is present, verify it
  if (authToken) {
    try {
      // Verify the JWT token
      const { payload } = await jwtVerify(authToken, JWT_SECRET);
      
      // Check if user has admin role for admin routes
      if ((isAdminRoute || isApiAdminRoute || isProtectedApiRoute) && payload.role !== 'admin') {
        // User doesn't have admin role, redirect to home
        return NextResponse.redirect(new URL('/', request.url));
      }
      
      // Add user info to request headers for API routes
      if (request.nextUrl.pathname.startsWith('/api/')) {
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set('x-user-id', payload.sub as string);
        requestHeaders.set('x-user-role', payload.role as string);
        
        // Return the request with the modified headers
        return NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        });
      }
      
      // Allow access to protected routes
      return NextResponse.next();
    } catch {
      // Token is invalid, clear it and redirect to login
      if (isAdminRoute || isApiAdminRoute || isProtectedApiRoute) {
        const response = NextResponse.redirect(new URL('/admin/login', request.url));
        response.cookies.delete('auth_token');
        return response;
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}; 