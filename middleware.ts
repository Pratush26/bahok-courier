// middleware.ts
import { auth } from "@/auth.config";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // If not authenticated and not on a public route, redirect to `/login`
  if (!req.auth) {
    return NextResponse.rewrite(new URL("/not-found", req.url));
  }
  if (
  pathname.startsWith("/duty/protected") && !(
    req.auth?.user.role === "admin" ||
    req.auth?.user.role === "editor" ||
    req.auth?.user.role === "manager"
  )
) {
  return NextResponse.rewrite(new URL("/not-found", req.url));
}
  return NextResponse.next();
});

// Match all routes — apply middleware to everything
export const config = {
  matcher: ["/duty/:path*"],
};
