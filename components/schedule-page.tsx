"use client"

import { AppSidebar } from "@/components/sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react"

export function SchedulePage() {
  // Mock data for the calendar
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const currentMonth = "April 2025"

  // Generate calendar days (simplified)
  const calendarDays = Array.from({ length: 35 }, (_, i) => {
    const day = i - 4 // Offset to start with the correct day of week
    return {
      date: day > 0 && day <= 30 ? day : null,
      chores: day > 0 && day <= 30 ? Math.floor(Math.random() * 3) : 0,
    }
  })

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-xl font-semibold">Schedule</h1>
            <div className="flex items-center gap-4">
              <ModeToggle />
              <UserNav />
            </div>
          </div>
        </header>
        <main className="flex-1 p-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Chore Schedule</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" />
                    <span>{currentMonth}</span>
                  </div>
                  <Button variant="outline" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>Manage and view your household chore schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1">
                {days.map((day) => (
                  <div key={day} className="text-center font-medium p-2">
                    {day}
                  </div>
                ))}
                {calendarDays.map((day, i) => (
                  <div
                    key={i}
                    className={`border rounded-md p-2 min-h-[80px] ${
                      day.date ? "hover:bg-accent cursor-pointer" : "bg-muted/20"
                    }`}
                  >
                    {day.date && (
                      <>
                        <div className="text-right text-sm">{day.date}</div>
                        {day.chores > 0 && (
                          <div className="mt-2 text-xs">
                            <div className="bg-primary/10 text-primary rounded p-1 mb-1">{day.chores} chores</div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
