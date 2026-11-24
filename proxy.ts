import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const FILE = /\.[^/]+$/;

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

  if (pathname === "/es" || pathname.startsWith("/es/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/es/, "") || "/";
    return NextResponse.redirect(url);
  }

  const isEn = pathname === "/en" || pathname.startsWith("/en/");
  const locale = isEn ? "en" : "es";
  const stripped = isEn ? pathname.replace(/^\/en/, "") || "/" : pathname;
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${stripped === "/" ? "" : stripped}`;

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
