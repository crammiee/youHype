import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const auth = req.cookies.get("auth")?.value;

  // Allow login page and login API
  if (
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/api/login")
  ) {
    return NextResponse.next();
  }

  // If cookie is set, allow access
  if (auth === "ok") {
    return NextResponse.next();
  }

  // Otherwise redirect to /login
  return NextResponse.redirect(new URL("/login", req.url));
}

// Apply middleware to all routes
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
