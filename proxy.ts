import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export default function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const redirectTo = req.nextUrl.pathname;
  // If no token, block access
  if (!token) {
    return NextResponse.redirect(new URL(`/auth?redirect=${encodeURIComponent(redirectTo)}`, req.url));
  }

  // 2. Verify token (IMPORTANT)
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const role = decoded.role;

    // Student routes protection
    if (req.nextUrl.pathname.startsWith("/student")) {
      if (role !== "Student") {
        return NextResponse.redirect(new URL("/not-authorized", req.url));
      }
    }

    // Admin routes protection
    if (req.nextUrl.pathname.startsWith("/admin")) {
      if (role !== "Admin") {
        return NextResponse.redirect(new URL("/not-authorized", req.url));
      }
    }

    // Otherwise allow
    return NextResponse.next();
  } catch (err) {
    // Invalid / fake token → redirect to login
    return NextResponse.redirect(new URL(`/auth?redirect=${encodeURIComponent(redirectTo)}`, req.url));
  }
}

// Apply middleware to all user directories
export const config = {
  matcher: ["/student/:path*","/community/create/:path*","/tutorials/create"],
};
