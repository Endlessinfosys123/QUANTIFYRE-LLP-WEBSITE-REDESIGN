import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        // Allow access to login and register pages without a token
        if (pathname.startsWith("/admin/login") || pathname.startsWith("/admin/register")) {
          return true
        }
        return !!token
      },
    },
  }
)

export const config = {
  matcher: ["/admin/:path*"],
}
