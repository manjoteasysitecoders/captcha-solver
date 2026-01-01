import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/docs") ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|ico)$/)
  ) {
    return NextResponse.next();
  }

  const userToken = await getToken({ req });

  if (userToken && userToken.active === false && pathname !== "/blocked") {
    return NextResponse.redirect(new URL("/blocked", req.url));
  }

  if (!userToken && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  if (userToken && pathname === "/signin") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (pathname.startsWith("/admin")) {
    const adminToken = req.cookies.get("admin_token")?.value;

    if (!adminToken && pathname !== "/admin/login") {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    if (adminToken && (pathname === "/admin/login" || pathname === "/admin")) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
