import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"

const protectedPaths = ["/admin"]

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if path should be protected
  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    const authToken = request.cookies.get("admin_auth")

    // Redirect to login if no auth cookie or invalid
    if (!authToken || !verifyToken(authToken.value)) {
      // Prevent redirect loop - don't redirect if already on login page
      if (!pathname.startsWith("/admin-login")) {
        return NextResponse.redirect(new URL("/admin-login", request.url))
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
