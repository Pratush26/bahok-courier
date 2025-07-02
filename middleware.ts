// middleware.ts
import { auth } from "@/auth.config";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Allow public access to `/` and `/login`
  const publicRoutes = ["/", "/login"];
  const isPublic = publicRoutes.includes(pathname);

  // If not authenticated and not on a public route, redirect to `/login`
  if (!req.auth && !isPublic) {
    return NextResponse.rewrite(new URL("/not-found", req.url));
  }
  console.log("user authenticated:", req.auth);
  // Optional: Add role-based logic here if needed later
  // Example:
  if (pathname.startsWith("/duty/protected") 
    && req.auth?.user.role !== "admin"
  ) {
    return NextResponse.rewrite(new URL("/not-found", req.url));
  }
  console.log("user authenticated:", req.auth);
  return NextResponse.next();
});

// Match all routes — apply middleware to everything
export const config = {
  matcher: ["/duty/:path*"],
};
