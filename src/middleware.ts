import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SUPPORTED_LOCALES = ['en', 'es', 'de'];
const DEFAULT_LOCALE = 'en';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. COMPLETELY BYPASS STATIC FILES, API, AND SANITY STUDIO
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    /\.(.*)$/.test(pathname) // Handles files with extensions (.mp4, .webp, .png, .ico, .svg, .jpg, .css, .js)
  ) {
    return NextResponse.next();
  }

  // 2. Check if the URL has a supported locale prefix
  const hasLocale = SUPPORTED_LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // 3. Rewrite missing locale to default locale (/en)
  if (!hasLocale) {
    const targetUrl = new URL(`/${DEFAULT_LOCALE}${pathname === '/' ? '' : pathname}`, request.url);
    return NextResponse.rewrite(targetUrl);
  }

  // 4. Strip /en for regular site pages (e.g. /en/about -> /about) to keep canonical URLs clean
  if (pathname.startsWith(`/${DEFAULT_LOCALE}/`) || pathname === `/${DEFAULT_LOCALE}`) {
    // Safely remove leading /en prefix using regex
    const cleanPath = pathname.replace(/^\/en(\/|$)/, '/') || '/';
    return NextResponse.redirect(new URL(cleanPath, request.url), 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};