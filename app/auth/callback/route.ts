import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // Exchange the code for a session
    await supabase.auth.exchangeCodeForSession(code)

    // Check if user already has a profile and is in a house
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

      const { data: houseMember } = await supabase.from("house_members").select("*").eq("user_id", user.id).single()

      if (profile && houseMember) {
        // User is fully set up, redirect to dashboard
        return NextResponse.redirect(new URL("/dashboard", requestUrl.origin))
      } else {
        // User needs to complete onboarding
        return NextResponse.redirect(new URL("/onboarding", requestUrl.origin))
      }
    }
  }

  // If there's an error or no code, redirect to login
  return NextResponse.redirect(new URL("/login", request.url))
}
