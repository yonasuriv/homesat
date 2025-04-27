"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

export function MiniSchedule({ className }: { className?: string }) {
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0)

  // Get current date information
  const today = new Date()
  const currentDay = today.getDate()
  const currentDayOfWeek = today.getDay() // 0 = Sunday, 6 = Saturday

  // Calculate the start of the week (Sunday)
  const startOfWeek = new Date(today)
  startOfWeek.setDate(currentDay - currentDayOfWeek + currentWeekOffset * 7)

  // Format month for display
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const currentMonth = monthNames[startOfWeek.getMonth()]
  const currentYear = startOfWeek.getFullYear()

  // Generate days for the current week
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek)
    date.setDate(startOfWeek.getDate() + i)

    // Check if this is today
    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()

    // Generate some mock chores for this day
    const choreCount = Math.floor(Math.random() * 4)
    const chores = Array.from({ length: choreCount }, (_, j) => ({
      id: `chore-${i}-${j}`,
      name: ["Vacuum Living Room", "Clean Kitchen", "Take Out Trash", "Mow Lawn", "Do Laundry", "Clean Bathroom"][
        Math.floor(Math.random() * 6)
      ],
      assignee: {
        name: ["Jonathan", "Juan", "Joaquin"][Math.floor(Math.random() * 3)],
        avatar: ["/thoughtful-bearded-man.png", "/contemplative-artist.png", "/contemplative-man.png"][
          Math.floor(Math.random() * 3)
        ],
        initials: ["JD", "JM", "JV"][Math.floor(Math.random() * 3)],
      },
    }))

    return {
      date,
      dayOfMonth: date.getDate(),
      dayName: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()],
      isToday,
      chores,
    }
  })

  const navigateWeek = (direction: number) => {
    setCurrentWeekOffset(currentWeekOffset + direction)
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Weekly Schedule</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => navigateWeek(-1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              <span className="text-sm">
                {currentMonth} {currentYear}
              </span>
            </div>
            <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => navigateWeek(1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardDescription>Upcoming chores for this week</CardDescription>
      </CardHeader>
      <CardContent className="p-2">
        <div className="grid grid-cols-7 gap-1">
          {weekDays.map((day) => (
            <div key={day.dayName} className="text-center text-xs font-medium py-1 border-b">
              {day.dayName}
            </div>
          ))}
          {weekDays.map((day) => (
            <div
              key={day.date.toString()}
              className={`border rounded-md ${
                day.isToday ? "border-primary bg-primary/5 ring-1 ring-primary" : "hover:bg-accent/50"
              } flex flex-col h-full min-h-[120px]`}
            >
              <div className={`text-center text-xs font-medium p-1 border-b ${day.isToday ? "text-primary" : ""}`}>
                {day.dayOfMonth}
              </div>
              <div className="flex-1 p-1 flex flex-col justify-between">
                <div className="space-y-2">
                  {day.chores.map((chore) => (
                    <div key={chore.id} className="flex items-center gap-1 text-xs bg-background/50 p-1 rounded">
                      <Avatar className="h-5 w-5 flex-shrink-0">
                        <AvatarImage src={chore.assignee.avatar || "/placeholder.svg"} alt={chore.assignee.name} />
                        <AvatarFallback className="text-[8px]">{chore.assignee.initials}</AvatarFallback>
                      </Avatar>
                      <span className="truncate">{chore.name}</span>
                    </div>
                  ))}
                </div>
                {day.chores.length > 0 && (
                  <Badge variant="outline" className="w-full flex justify-center text-[10px] py-0 h-4 mt-1">
                    {day.chores.length} {day.chores.length === 1 ? "chore" : "chores"}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
