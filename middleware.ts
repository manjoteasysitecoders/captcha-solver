import jwt from "jsonwebtoken";
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

  if (!userToken && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  if (userToken && pathname === "/signin") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (pathname.startsWith("/admin")) {
    const adminToken = req.cookies.get("admin_token")?.value;
    let isAdminAuthenticated = false;

    if (adminToken) {
      try {
        jwt.verify(adminToken, process.env.JWT_SECRET!);
        isAdminAuthenticated = true;
      } catch {
        isAdminAuthenticated = false;
      }
    }

    if (pathname === "/admin") {
      return NextResponse.redirect(
        new URL(
          isAdminAuthenticated ? "/admin/dashboard" : "/admin/login",
          req.url
        )
      );
    }

    if (pathname.startsWith("/admin/dashboard") && !isAdminAuthenticated) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    if (pathname.startsWith("/admin/login") && isAdminAuthenticated) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
