import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

const validDutyRoutes = [
  '/duty',
  '/duty/handle-order',
  '/duty/receive-order',
  // add more valid routes here
]

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (!pathname.startsWith('/duty')) {
    return NextResponse.next()
  }

  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET, // ✅ Add this line
  })

  if (!token) {
    return NextResponse.redirect(new URL('/not-found', req.url))
  }

  if (!validDutyRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/not-found', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/duty', '/duty/:path*'],
}
