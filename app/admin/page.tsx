import { redirect } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default async function AdminPage() {
  const supabase = createServerSupabaseClient()

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Check if user is an admin
  const { data: memberData } = await supabase.from("house_members").select("is_admin").eq("user_id", user.id).single()

  // If not an admin, redirect to dashboard
  if (!memberData?.is_admin) {
    redirect("/dashboard")
  }

  return <AdminDashboard />
}
