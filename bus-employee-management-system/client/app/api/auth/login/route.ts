/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';

const GATEWAY_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function POST(request: NextRequest) {
  const body = await request.json();

  const gatewayRes = await fetch(`${GATEWAY_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const responseBody = await gatewayRes.text();
  const response = new NextResponse(responseBody, {
    status: gatewayRes.status,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Try to extract token from response body
  let token: string | undefined;
  try {
    const parsed = JSON.parse(responseBody);
    token = parsed.token;
  } catch (e) {
    token = undefined;
  }
  console.log('Extracted token:', token);

  // // Set JWT as HTTP-only cookie for all subdomains if present
  // if (token) {
  //   response.cookies.set('jwt', token, {
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV === 'production', // true in prod, false in dev
  //     path: '/',
  //     sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  //     maxAge: 60 * 60 * 24, // 1 day
  //   });
  //   console.log('JWT cookie set successfully');
  // }

  // Forward ALL cookie headers from gateway (optional, if needed)
  const cookies = gatewayRes.headers.getSetCookie();
  console.log('Cookies from gateway:', cookies);
  if (cookies && cookies.length > 0) {
    cookies.forEach(cookie => {
      response.headers.append('set-cookie', cookie);
    });
  }

  return response;
}
