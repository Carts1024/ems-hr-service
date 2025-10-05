 
// import { NextRequest, NextResponse } from 'next/server';

// const publicRoutes = [
//   '/authentication/login',
//   '/authentication/reset-password',
//   '/authentication/new-password',
//   '/authentication/security-questions',

// ];

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   console.log('Middleware triggered for:', pathname);

//   if (publicRoutes.some(route => pathname.startsWith(route))) {
//     console.log('MIDDLEWARE: public route allowed');
//     return NextResponse.next();
//   }

//   // Check for JWT cookie
//   const jwt = request.cookies.get('jwt')?.value;
//   console.log('MIDDLEWARE: jwt', jwt);

//   if (!jwt) {
//     console.log('MIDDLEWARE: no jwt, redirecting to login');
//     const loginUrl = new URL('/authentication/login', request.url);
//     return NextResponse.redirect(loginUrl);
//   }

//   // (Optional) Verify JWT with backend
//   try {
//     // console.log(process.env.NEXT_PUBLIC_API_URL);
//     const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
//       method: 'POST',
//       headers: { Authorization: `Bearer ${jwt}` },
//     });
//     if (!verifyRes.ok) {
//       // console.log('MIDDLEWARE: JWT invalid or expired');
//       const loginUrl = new URL('/authentication/login', request.url);
//       return NextResponse.redirect(loginUrl);
//     }
//   } catch (e) {
//     // console.log('MIDDLEWARE: Error verifying JWT', e);
//     const loginUrl = new URL('/authentication/login', request.url);
//     return NextResponse.redirect(loginUrl);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     '/((?!_next/static|_next/image|favicon.ico|assets|api|authentication/login|authentication/reset-password|authentication/new-password|authentication/security-questions).*)'
//   ]
// };
// This matcher excludes Next.js static files, API routes, and public authentication routes


/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  // TEMP: Allow all routes for development
  const { pathname } = request.nextUrl;

  // Public routes
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // JWT check
  const jwt = request.cookies.get('jwt')?.value;

  if (!jwt) {
    return NextResponse.redirect(new URL('/authentication/login', request.url));
  }

  // Prevent crash if API URL is missing
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    // Optionally: Show a custom error page or redirect
    return NextResponse.redirect(new URL('/authentication/login', request.url));
  }

  // (Optional) Verify JWT with backend
  try {
    const verifyRes = await fetch(`${apiUrl}/auth/verify`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${jwt}` },
    });
    if (!verifyRes.ok) {
      return NextResponse.redirect(new URL('/authentication/login', request.url));
    }
  } catch (e) {
    return NextResponse.redirect(new URL('/authentication/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|assets|api).*)'
  ]
};
// This matcher now allows all routes, including previously protected ones