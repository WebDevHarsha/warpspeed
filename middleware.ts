import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"
import toast from "react-hot-toast"

const publicRoutes = ["/", "/about", "/research"]

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (publicRoutes.some(path => pathname === path || pathname.startsWith(path + "/"))) {
    return NextResponse.next()
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  if (!token) {
    const url = req.nextUrl.clone()
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico|api/auth).*)"], // Match everything except Next.js internals
}
