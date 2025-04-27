"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getRecentActivity } from "@/lib/actions/activity"
import { formatDistanceToNow } from "date-fns"

export function RecentActivity({ className }: { className?: string }) {
  const [activities, setActivities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadActivities() {
      try {
        const data = await getRecentActivity(4)
        setActivities(data)
      } catch (error) {
        console.error("Error loading activities:", error)
      } finally {
        setLoading(false)
      }
    }

    loadActivities()
  }, [])

  const getActivityText = (activity: any) => {
    const memberName = activity.family_members?.name || "Someone"
    const choreName = activity.chores?.name || "a chore"

    switch (activity.action) {
      case "completed":
        return `${memberName} completed ${choreName}`
      case "created":
        return `${memberName} added ${choreName} to schedule`
      default:
        return `${memberName} ${activity.action} ${choreName}`
    }
  }

  const getActivityTime = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true })
    } catch (error) {
      return "some time ago"
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest chore updates from family members</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No recent activity found</div>
        ) : (
          <div className="space-y-8">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src={activity.family_members?.avatar || "/placeholder.svg"}
                    alt={activity.family_members?.name || "User"}
                  />
                  <AvatarFallback>{activity.family_members?.initials || "U"}</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">{getActivityText(activity)}</p>
                  <p className="text-sm text-muted-foreground">{getActivityTime(activity.created_at)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
