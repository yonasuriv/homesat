"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  useEffect(() => {
    // Check if there's a code parameter and redirect to auth/callback
    const code = searchParams.get("code")
    if (code) {
      console.log("Auth code detected on root page, redirecting to callback")
      router.push(`/auth/callback?code=${code}`)
    }
  }, [searchParams, router])

  // You can add your marketing/landing page content here
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Welcome to HomeTask</h1>
      <p className="mt-4 text-xl">Loading...</p>
    </div>
  )
} 