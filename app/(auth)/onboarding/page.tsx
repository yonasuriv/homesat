"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreateHouseForm } from "@/components/house/create-house-form"
import { JoinHouseForm } from "@/components/house/join-house-form"
import { AvatarSelection } from "@/components/house/avatar-selection"
import { supabaseClient } from "@/lib/supabase/client"
import { toast } from "@/components/ui/use-toast"

export default function OnboardingPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null)
  const [username, setUsername] = useState("")

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabaseClient.auth.getUser()

      if (!user) {
        router.push("/login")
        return
      }

      setUser(user)

      // Check if user already has a profile
      const { data: profile } = await supabaseClient.from("profiles").select("*").eq("id", user.id).single()

      if (profile) {
        // Check if user is already a member of a house
        const { data: houseMember } = await supabaseClient
          .from("house_members")
          .select("*")
          .eq("user_id", user.id)
          .single()

        if (houseMember) {
          // User already has a house, redirect to dashboard
          router.push("/")
          return
        }
      }

      // Set default username from user metadata or email
      if (user.user_metadata?.name) {
        setUsername(user.user_metadata.name)
      } else {
        setUsername(user.email.split("@")[0])
      }

      setLoading(false)
    }

    getUser()
  }, [router])

  const saveProfile = async () => {
    if (!user) return

    try {
      const { error } = await supabaseClient.from("profiles").upsert({
        id: user.id,
        username,
        avatar: selectedAvatar,
        updated_at: new Date().toISOString(),
      })

      if (error) throw error

      toast({
        title: "Profile saved",
        description: "Your profile has been updated successfully.",
      })

      return true
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save profile",
        variant: "destructive",
      })

      return false
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen py-12">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[550px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome to HomeTask</h1>
          <p className="text-sm text-muted-foreground">Let's set up your profile and get you started</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Choose an Avatar</CardTitle>
            <CardDescription>Select an avatar for your profile</CardDescription>
          </CardHeader>
          <CardContent>
            <AvatarSelection
              selectedAvatar={selectedAvatar}
              setSelectedAvatar={setSelectedAvatar}
              username={username}
              setUsername={setUsername}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Join or Create a House</CardTitle>
            <CardDescription>Create a new house or join an existing one</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="create">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="create">Create House</TabsTrigger>
                <TabsTrigger value="join">Join House</TabsTrigger>
              </TabsList>
              <TabsContent value="create" className="mt-4">
                <CreateHouseForm userId={user.id} saveProfile={saveProfile} />
              </TabsContent>
              <TabsContent value="join" className="mt-4">
                <JoinHouseForm userId={user.id} saveProfile={saveProfile} />
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.push("/dashboard")}>
              Skip for now
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
