"use client"

import { useEffect, useState } from "react"
import { supabaseClient } from "@/lib/supabase/client"

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function checkAdminStatus() {
      try {
        // Get the current user
        const {
          data: { user },
        } = await supabaseClient.auth.getUser()

        if (!user) {
          setIsAdmin(false)
          setIsLoading(false)
          return
        }

        // Check if user is in the admins table or has admin role
        const { data, error } = await supabaseClient
          .from("house_members")
          .select("is_admin")
          .eq("user_id", user.id)
          .single()

        if (error) {
          console.error("Error checking admin status:", error)
          setIsAdmin(false)
        } else {
          setIsAdmin(data?.is_admin === true)
        }
      } catch (error) {
        console.error("Error in admin check:", error)
        setIsAdmin(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAdminStatus()
  }, [])

  return { isAdmin, isLoading }
}
