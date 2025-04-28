import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Check if there's a code parameter in the URL and we're at the root
  const url = new URL(req.url)
  if (url.pathname === "/" && url.searchParams.has("code")) {
    console.log("Code parameter detected at root, redirecting to /auth/callback")
    const code = url.searchParams.get("code")
    return NextResponse.redirect(new URL(`/auth/callback?code=${code}`, req.url))
  }

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If user is signed in and the current path is / redirect the user to /dashboard
  if (session && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  // If user is not signed in and the current path is not / redirect the user to /
  if (
    !session &&
    req.nextUrl.pathname !== "/" &&
    !req.nextUrl.pathname.startsWith("/login") &&
    !req.nextUrl.pathname.startsWith("/signup") &&
    !req.nextUrl.pathname.startsWith("/auth/")
  ) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return res
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
