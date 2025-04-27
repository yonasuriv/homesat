"use client"

import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"
import { AppSidebar } from "@/components/sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { MiniSchedule } from "@/components/mini-schedule"
import { RecentActivity } from "@/components/recent-activity"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Medal, Star, Trophy } from "lucide-react"

export function Dashboard() {
  // Mock achievements data
  const achievements = [
    {
      id: "achievement-1",
      title: "Most Improved",
      description: "Joaquin (+45%)",
      icon: <Award className="h-5 w-5 text-green-500" />,
      color: "bg-green-500/10 border-green-500/20",
    },
    {
      id: "achievement-2",
      title: "Perfect Streak",
      description: "Juan (7 days)",
      icon: <Star className="h-5 w-5 text-yellow-500" />,
      color: "bg-yellow-500/10 border-yellow-500/20",
    },
    {
      id: "achievement-3",
      title: "Most Consistent",
      description: "Jonathan (92% completion)",
      icon: <Medal className="h-5 w-5 text-blue-500" />,
      color: "bg-blue-500/10 border-blue-500/20",
    },
  ]

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <div className="flex items-center gap-4">
              <ModeToggle />
              <UserNav />
            </div>
          </div>
        </header>
        <main className="flex-1 p-6">
          <div className="flex flex-col gap-6">
            <div className="grid gap-4 grid-cols-12">
              <MiniSchedule className="col-span-8" />
              <RecentActivity className="col-span-4" />
            </div>

            {/* Achievements Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Achievements</CardTitle>
                  <Trophy className="h-5 w-5 text-yellow-500" />
                </div>
                <CardDescription>Special recognitions this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`flex items-center gap-3 rounded-lg border p-3 ${achievement.color}`}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background">
                        {achievement.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{achievement.title}</p>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
