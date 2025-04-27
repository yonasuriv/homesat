"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import { supabaseClient } from "@/lib/supabase/client"
import { toast } from "@/components/ui/use-toast"

interface JoinHouseFormProps {
  userId: string
  saveProfile: () => Promise<boolean>
}

export function JoinHouseForm({ userId, saveProfile }: JoinHouseFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [houseId, setHouseId] = useState("")
  const [password, setPassword] = useState("")

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    try {
      // First save the profile
      const profileSaved = await saveProfile()
      if (!profileSaved) {
        throw new Error("Failed to save profile")
      }

      // Check if house exists with the given ID and password
      const { data: house, error: houseError } = await supabaseClient
        .from("houses")
        .select("*")
        .eq("id", houseId)
        .eq("password", password)
        .single()

      if (houseError || !house) {
        throw new Error("Invalid house ID or password")
      }

      // Check if user is already a member of this house
      const { data: existingMember } = await supabaseClient
        .from("house_members")
        .select("*")
        .eq("house_id", houseId)
        .eq("user_id", userId)
        .single()

      if (existingMember) {
        throw new Error("You are already a member of this house")
      }

      // Add the user as a member of the house
      const { error: memberError } = await supabaseClient.from("house_members").insert({
        house_id: houseId,
        user_id: userId,
        role: "member", // Joining users are regular members
      })

      if (memberError) throw memberError

      toast({
        title: "House joined!",
        description: `You've successfully joined "${house.name}"`,
      })

      router.push("/dashboard")
      router.refresh()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to join house. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="house-id">House ID</Label>
        <Input
          id="house-id"
          placeholder="Enter house ID"
          value={houseId}
          onChange={(e) => setHouseId(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">House Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter house password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : "Join House"}
      </Button>
    </form>
  )
}
