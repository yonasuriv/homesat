"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function MiniSchedule({ className }: { className?: string }) {
  // Mock data for user's tasks
  const todayTasks = [
    {
      id: "task-1",
      name: "Clean Kitchen",
      time: "10:00 AM",
      area: "Kitchen",
    },
    {
      id: "task-2",
      name: "Take Out Trash",
      time: "6:00 PM",
      area: "General",
    },
  ]

  const upcomingTasks = [
    {
      id: "task-3",
      name: "Vacuum Living Room",
      daysAway: 1,
      date: "Tomorrow",
      area: "Living Room",
    },
    {
      id: "task-4",
      name: "Mow Lawn",
      daysAway: 2,
      date: "In 2 days",
      area: "Garden",
    },
    {
      id: "task-5",
      name: "Clean Bathroom",
      daysAway: 3,
      date: "In 3 days",
      area: "Bathroom",
    },
  ]

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">My Schedule</CardTitle>
          <Button variant="outline" size="sm" className="h-7">
            <CalendarDays className="h-4 w-4 mr-1" />
            View Full Schedule
          </Button>
        </div>
        <CardDescription>Your upcoming chores and tasks</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Today's tasks */}
          <div>
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <Badge variant="outline" className="mr-2 bg-primary/10">
                Today
              </Badge>
              {todayTasks.length > 0 ? `${todayTasks.length} tasks` : "Free day!"}
            </h3>
            {todayTasks.length > 0 ? (
              <div className="space-y-2">
                {todayTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between bg-card border rounded-md p-2">
                    <div className="flex items-center">
                      <div className="ml-2">
                        <p className="text-sm font-medium">{task.name}</p>
                        <p className="text-xs text-muted-foreground">{task.area}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{task.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 bg-card border rounded-md">
                <p className="text-sm text-muted-foreground">No tasks scheduled for today!</p>
              </div>
            )}
          </div>

          {/* Upcoming tasks */}
          <div>
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <Badge variant="outline" className="mr-2 bg-secondary/10">
                Upcoming
              </Badge>
              {upcomingTasks.length} tasks
            </h3>
            <div className="space-y-2">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between bg-card border rounded-md p-2">
                  <div className="flex items-center">
                    <div className="ml-2">
                      <p className="text-sm font-medium">{task.name}</p>
                      <p className="text-xs text-muted-foreground">{task.area}</p>
                    </div>
                  </div>
                  <Badge variant="outline">{task.date}</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
