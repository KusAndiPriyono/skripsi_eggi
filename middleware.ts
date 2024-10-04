import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/dashboard'];
const userProfileRoutes = ['/dashboard-user'];

export function middleware(req: NextRequest) {
  console.log('Middleware is executing');
  // Retrieve cookies
  const token = req.cookies.get('token')?.value;

  // Log values for debugging
  console.log('Pathname:', req.nextUrl.pathname);
  console.log('Token:', token);

  // Check if the request path is protected or user profile routes
  if (protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route)) || 
      userProfileRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
    
    // Redirect to sign-in if no token
    if (!token) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
  }

  // Allow request to proceed if token is present
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/dashboard-user/:path*',
    '/protected/*',
  ],
};
