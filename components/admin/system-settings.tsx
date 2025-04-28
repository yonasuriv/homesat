"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Settings, Save } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function SystemSettings() {
  const [siteName, setSiteName] = useState("HomeTask")
  const [allowSignups, setAllowSignups] = useState(true)
  const [requireApproval, setRequireApproval] = useState(false)
  const [maxUsersPerHouse, setMaxUsersPerHouse] = useState(10)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  async function handleSaveSettings() {
    try {
      setIsSaving(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Settings saved",
        description: "Your system settings have been updated successfully.",
      })
    } catch (error) {
      console.error("Error saving settings:", error)
      toast({
        title: "Error saving settings",
        description: "There was a problem saving your settings.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          System Settings
        </CardTitle>
        <CardDescription>Configure global system settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="site-name">Site Name</Label>
          <Input id="site-name" value={siteName} onChange={(e) => setSiteName(e.target.value)} />
          <p className="text-xs text-muted-foreground">This name will be displayed in the header and browser title.</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">User Registration</h3>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="allow-signups">Allow New Signups</Label>
              <p className="text-xs text-muted-foreground">When disabled, new users cannot register.</p>
            </div>
            <Switch id="allow-signups" checked={allowSignups} onCheckedChange={setAllowSignups} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="require-approval">Require Admin Approval</Label>
              <p className="text-xs text-muted-foreground">
                New users must be approved by an admin before they can log in.
              </p>
            </div>
            <Switch
              id="require-approval"
              checked={requireApproval}
              onCheckedChange={setRequireApproval}
              disabled={!allowSignups}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="max-users">Maximum Users per House</Label>
          <Input
            id="max-users"
            type="number"
            min="1"
            max="50"
            value={maxUsersPerHouse}
            onChange={(e) => setMaxUsersPerHouse(Number.parseInt(e.target.value))}
          />
          <p className="text-xs text-muted-foreground">The maximum number of users allowed in a single house.</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveSettings} disabled={isSaving} className="ml-auto">
          {isSaving ? (
            <>Saving...</>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
