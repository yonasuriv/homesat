"use server"

import { createServerSupabaseClient } from "../supabase/server"
import { revalidatePath } from "next/cache"
import type { Chore } from "../types/database"

export async function getChores() {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from("chores")
    .select(`
      *,
      family_members(*),
      areas(*),
      severity_levels(*),
      importance_levels(*)
    `)
    .order("due_date")

  if (error) {
    console.error("Error fetching chores:", error)
    return []
  }

  return data
}

export async function getChore(id: string) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from("chores")
    .select(`
      *,
      family_members(*),
      areas(*),
      severity_levels(*),
      importance_levels(*)
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error(`Error fetching chore with id ${id}:`, error)
    return null
  }

  return data
}

export async function createChore(chore: Omit<Chore, "id" | "created_at" | "updated_at">) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("chores").insert(chore).select().single()

  if (error) {
    console.error("Error creating chore:", error)
    return null
  }

  // Log activity
  if (chore.assignee_id) {
    await supabase.from("activity_log").insert({
      family_member_id: chore.assignee_id,
      chore_id: data.id,
      action: "created",
    })
  }

  revalidatePath("/chores")
  revalidatePath("/schedule")
  revalidatePath("/")
  return data as Chore
}

export async function updateChore(id: string, chore: Partial<Chore>) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from("chores")
    .update({ ...chore, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error(`Error updating chore with id ${id}:`, error)
    return null
  }

  // Log activity if status changed to completed
  if (chore.status === "completed" && chore.assignee_id) {
    await supabase.from("activity_log").insert({
      family_member_id: chore.assignee_id,
      chore_id: id,
      action: "completed",
    })
  }

  revalidatePath("/chores")
  revalidatePath("/schedule")
  revalidatePath("/")
  return data as Chore
}

export async function deleteChore(id: string) {
  const supabase = createServerSupabaseClient()
  const { error } = await supabase.from("chores").delete().eq("id", id)

  if (error) {
    console.error(`Error deleting chore with id ${id}:`, error)
    return false
  }

  revalidatePath("/chores")
  revalidatePath("/schedule")
  revalidatePath("/")
  return true
}

export async function completeChore(id: string, familyMemberId: string) {
  const supabase = createServerSupabaseClient()
  const now = new Date().toISOString()

  const { data, error } = await supabase
    .from("chores")
    .update({
      status: "completed",
      completed_date: now,
      updated_at: now,
    })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error(`Error completing chore with id ${id}:`, error)
    return null
  }

  // Log activity
  await supabase.from("activity_log").insert({
    family_member_id: familyMemberId,
    chore_id: id,
    action: "completed",
  })

  revalidatePath("/chores")
  revalidatePath("/schedule")
  revalidatePath("/")
  return data as Chore
}
