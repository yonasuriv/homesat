import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get("code")

    console.log("Auth callback called with URL:", request.url)
    console.log("Code parameter present:", !!code)

    if (!code) {
      console.log("No code parameter found, redirecting to login")
      return NextResponse.redirect(new URL("/login", requestUrl.origin))
    }

    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // Exchange the code for a session
    console.log("Attempting to exchange code for session...")
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error("Error exchanging code for session:", error)
      console.error("Error details:", JSON.stringify(error, null, 2))
      return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(error.message)}`, requestUrl.origin))
    }
    console.log("Code exchange successful")

    // Check if user already has a profile and is in a house
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      console.log("No user found after code exchange, redirecting to login")
      return NextResponse.redirect(new URL("/login", requestUrl.origin))
    }
    console.log("User authenticated:", user.id)

    const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()
    const { data: houseMember } = await supabase.from("house_members").select("*").eq("user_id", user.id).single()

    if (profile && houseMember) {
      // User is fully set up, redirect to dashboard
      return NextResponse.redirect(new URL("/dashboard", requestUrl.origin))
    } else {
      // User needs to complete onboarding
      return NextResponse.redirect(new URL("/onboarding", requestUrl.origin))
    }
  } catch (error) {
    console.error("Unexpected error in callback route:", error)
    return NextResponse.redirect(new URL("/login?error=unexpected", request.url))
  }
}
