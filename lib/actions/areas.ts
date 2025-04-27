"use server"

import { createServerSupabaseClient } from "../supabase/server"
import { revalidatePath } from "next/cache"
import type { Area } from "../types/database"

export async function getAreas() {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("areas").select("*").order("name")

  if (error) {
    console.error("Error fetching areas:", error)
    return []
  }

  return data as Area[]
}

export async function getArea(id: string) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("areas").select("*").eq("id", id).single()

  if (error) {
    console.error(`Error fetching area with id ${id}:`, error)
    return null
  }

  return data as Area
}

export async function createArea(area: Omit<Area, "id" | "created_at" | "updated_at">) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("areas").insert(area).select().single()

  if (error) {
    console.error("Error creating area:", error)
    return null
  }

  revalidatePath("/areas")
  revalidatePath("/")
  return data as Area
}

export async function updateArea(id: string, area: Partial<Area>) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from("areas")
    .update({ ...area, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error(`Error updating area with id ${id}:`, error)
    return null
  }

  revalidatePath("/areas")
  revalidatePath("/")
  return data as Area
}

export async function deleteArea(id: string) {
  const supabase = createServerSupabaseClient()
  const { error } = await supabase.from("areas").delete().eq("id", id)

  if (error) {
    console.error(`Error deleting area with id ${id}:`, error)
    return false
  }

  revalidatePath("/areas")
  revalidatePath("/")
  return true
}
