"use server"

import { createServerSupabaseClient } from "../supabase/server"
import type { ActivityLog } from "../types/database"

export async function getRecentActivity(limit = 10) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from("activity_log")
    .select(`
      *,
      family_members(*),
      chores(*)
    `)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching recent activity:", error)
    return []
  }

  return data
}

export async function logActivity(activity: Omit<ActivityLog, "id" | "created_at">) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("activity_log").insert(activity).select().single()

  if (error) {
    console.error("Error logging activity:", error)
    return null
  }

  return data as ActivityLog
}
