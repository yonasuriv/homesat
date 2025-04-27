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

interface CreateHouseFormProps {
  userId: string
  saveProfile: () => Promise<boolean>
}

export function CreateHouseForm({ userId, saveProfile }: CreateHouseFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [houseName, setHouseName] = useState("")
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

      // Create the house
      const { data: house, error: houseError } = await supabaseClient
        .from("houses")
        .insert({
          name: houseName,
          password,
          created_by: userId,
        })
        .select()
        .single()

      if (houseError) throw houseError

      // Add the user as a member of the house
      const { error: memberError } = await supabaseClient.from("house_members").insert({
        house_id: house.id,
        user_id: userId,
        role: "admin", // Creator is admin
      })

      if (memberError) throw memberError

      toast({
        title: "House created!",
        description: `You've successfully created "${houseName}". House ID: ${house.id}`,
      })

      router.push("/dashboard")
      router.refresh()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create house. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="house-name">House Name</Label>
        <Input
          id="house-name"
          placeholder="My Home"
          value={houseName}
          onChange={(e) => setHouseName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">House Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Create a password for others to join"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p className="text-xs text-muted-foreground">
          This password will be shared with others who want to join your house
        </p>
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : "Create House"}
      </Button>
    </form>
  )
}
