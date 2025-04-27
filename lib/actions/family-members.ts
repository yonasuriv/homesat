"use server"

import { createServerSupabaseClient } from "../supabase/server"
import { revalidatePath } from "next/cache"
import type { FamilyMember } from "../types/database"

export async function getFamilyMembers() {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("family_members").select("*").order("name")

  if (error) {
    console.error("Error fetching family members:", error)
    return []
  }

  return data as FamilyMember[]
}

export async function getFamilyMember(id: string) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("family_members").select("*").eq("id", id).single()

  if (error) {
    console.error(`Error fetching family member with id ${id}:`, error)
    return null
  }

  return data as FamilyMember
}

export async function createFamilyMember(member: Omit<FamilyMember, "id" | "created_at" | "updated_at">) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("family_members").insert(member).select().single()

  if (error) {
    console.error("Error creating family member:", error)
    return null
  }

  revalidatePath("/family")
  revalidatePath("/")
  return data as FamilyMember
}

export async function updateFamilyMember(id: string, member: Partial<FamilyMember>) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from("family_members")
    .update({ ...member, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error(`Error updating family member with id ${id}:`, error)
    return null
  }

  revalidatePath("/family")
  revalidatePath("/")
  return data as FamilyMember
}

export async function deleteFamilyMember(id: string) {
  const supabase = createServerSupabaseClient()
  const { error } = await supabase.from("family_members").delete().eq("id", id)

  if (error) {
    console.error(`Error deleting family member with id ${id}:`, error)
    return false
  }

  revalidatePath("/family")
  revalidatePath("/")
  return true
}
