import { auth } from '@/lib/auth/authConfig';
import { NextResponse } from 'next/server';

export async function middleware(req: Request) {
  const session = await auth();
  const url = new URL(req.url);
  
  if (session && url.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard/events', req.url));
  }

  if (session && url.pathname === '/dashboard') {
    return NextResponse.redirect(new URL('/dashboard/events', req.url));
  }

  const eventIdMatch = url.pathname.match(/^\/dashboard\/events\/([^/]+)$/);
  if (session && eventIdMatch) {
    const eventId = eventIdMatch[1]; 
    return NextResponse.redirect(new URL(`/dashboard/events/${eventId}/overview`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard', '/dashboard/events/:eventId*'], 
};
