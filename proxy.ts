import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const FILE = /\.[^/]+$/;

/**
 * Spanish public URLs have no prefix (`/obra`). Internally they rewrite to `/es/…`.
 * English stays at `/en/…`. Do not redirect `/es` → `/` — that loops with the rewrite
 * under Next’s proxy implementation.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/media") ||
    FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return NextResponse.next();
  }

  if (pathname === "/es" || pathname.startsWith("/es/")) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? "/es" : `/es${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
