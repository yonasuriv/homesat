"use server"

import { createServerSupabaseClient } from "../supabase/server"
import { revalidatePath } from "next/cache"

export async function seedDatabase() {
  const supabase = createServerSupabaseClient()

  // Seed severity levels
  const severityLevels = [
    { label: "Disaster", score: 10 },
    { label: "Consequence", score: 7.5 },
    { label: "Annoyance", score: 5 },
    { label: "No real problem", score: 2.5 },
  ]

  await supabase.from("severity_levels").upsert(severityLevels, { onConflict: "label" })

  // Seed importance levels
  const importanceLevels = [
    { label: "Urgent", multiplier: 3 },
    { label: "Not Urgent", multiplier: 1.5 },
  ]

  await supabase.from("importance_levels").upsert(importanceLevels, { onConflict: "label" })

  // Seed family members
  const familyMembers = [
    {
      name: "Jonathan Di Rico",
      avatar: "/thoughtful-bearded-man.png",
      initials: "JD",
      role: "Roommate",
    },
    {
      name: "Juan Munoz",
      avatar: "/contemplative-artist.png",
      initials: "JM",
      role: "Roommate",
    },
    {
      name: "Joaquin Vazquez",
      avatar: "/contemplative-man.png",
      initials: "JV",
      role: "Roommate",
    },
  ]

  await supabase.from("family_members").upsert(familyMembers, { onConflict: "name" })

  // Seed areas
  const areas = [
    { name: "Living Room" },
    { name: "Kitchen" },
    { name: "Bathroom" },
    { name: "Bedroom" },
    { name: "Garden" },
    { name: "Garage" },
    { name: "Terraza" },
  ]

  await supabase.from("areas").upsert(areas, { onConflict: "name" })

  // Revalidate all paths
  revalidatePath("/")
  revalidatePath("/chores")
  revalidatePath("/family")
  revalidatePath("/areas")
  revalidatePath("/schedule")
  revalidatePath("/leaderboard")

  return { success: true }
}
