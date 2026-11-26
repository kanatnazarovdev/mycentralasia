import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SUPPORTED_LOCALES = ["en", "es", "de"];
const DEFAULT_LOCALE = "en";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Bypass Next.js internals, API routes, SEO files, and static public assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt" ||
    /\.(png|jpg|jpeg|gif|webp|svg|ico|mp4|webm|woff2?|ttf|css|js|map)$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  // 2. Redirect explicit /en or /en/* to clean canonical root URLs (301)
  if (pathname === `/${DEFAULT_LOCALE}` || pathname.startsWith(`/${DEFAULT_LOCALE}/`)) {
    const cleanPath = pathname.replace(/^\/en(\/|$)/, "/") || "/";
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = cleanPath;
    return NextResponse.redirect(redirectUrl, 301);
  }

  // 3. Check if URL already starts with /es or /de
  const hasNonDefaultLocale = SUPPORTED_LOCALES.filter((l) => l !== DEFAULT_LOCALE).some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (hasNonDefaultLocale) {
    return NextResponse.next();
  }

  // 4. Internally rewrite clean URLs (/, /news, /history) to /en/*
  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(rewriteUrl);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|ico)$).*)",
  ],
};