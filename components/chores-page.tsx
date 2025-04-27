"use client"

import { AppSidebar } from "@/components/sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"
import { ChoresList } from "@/components/chores-list"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { AlertTriangle, CheckCircle, Circle, Clock, Trophy } from "lucide-react"

export function ChoresPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-xl font-semibold">Chores</h1>
            <div className="flex items-center gap-4">
              <ModeToggle />
              <UserNav />
            </div>
          </div>
        </header>
        <main className="flex-1 p-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            {/* Recurring Chores Card */}
            <Card className="bg-background border">
              <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
                <p className="text-sm font-medium">Recurring Chores</p>
                <Circle className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent className="px-4 pb-4 pt-0">
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+0 from last week</p>
              </CardContent>
            </Card>

            {/* Overdue Chores Card */}
            <Card className="bg-background border">
              <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
                <p className="text-sm font-medium">Overdue Chores</p>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent className="px-4 pb-4 pt-0">
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">+1 from last week</p>
              </CardContent>
            </Card>

            {/* Pending Chores Card */}
            <Card className="bg-background border">
              <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
                <p className="text-sm font-medium">Pending Chores</p>
                <Clock className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent className="px-4 pb-4 pt-0">
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">-3 from last week</p>
              </CardContent>
            </Card>

            {/* Completed Chores Card */}
            <Card className="bg-background border">
              <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
                <p className="text-sm font-medium">Completed Chores</p>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent className="px-4 pb-4 pt-0">
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 from last week</p>
              </CardContent>
            </Card>

            {/* Family Score Card */}
            <Card className="bg-background border">
              <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
                <p className="text-sm font-medium">Family Score</p>
                <Trophy className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent className="px-4 pb-4 pt-0">
                <div className="text-2xl font-bold">1,250</div>
                <p className="text-xs text-muted-foreground">+125 this week</p>
                <div className="flex mt-1">
                  {[1, 2, 3, 4].map((star) => (
                    <svg
                      key={star}
                      className="h-4 w-4 fill-yellow-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon
                      points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                      fill="currentColor"
                      fillOpacity="0.2"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chores List */}
          <ChoresList />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
