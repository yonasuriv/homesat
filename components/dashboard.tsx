"use client"

import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"
import { Overview } from "@/components/overview"
import { AppSidebar } from "@/components/sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ScoreCard } from "@/components/score-card"
import { MiniSchedule } from "@/components/mini-schedule"
import { RecentActivity } from "@/components/recent-activity"

export function Dashboard() {
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
            {/* Make the first row span the full width */}
            <div className="grid gap-4 grid-cols-12">
              <ScoreCard className="col-span-3" />
              <div className="col-span-9 grid grid-cols-4 gap-4">
                <Overview />
              </div>
            </div>

            <div className="grid gap-4 grid-cols-12">
              <MiniSchedule className="col-span-8" />
              <RecentActivity className="col-span-4" />
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
