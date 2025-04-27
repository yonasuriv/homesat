"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Medal, Star, Award, TrendingUp, CheckCircle } from "lucide-react"
import { getScoreColor } from "@/lib/scoring"
import { MemberStats } from "@/components/member-stats"

export function LeaderboardPage() {
  const weeklyLeaders = [
    {
      rank: 1,
      name: "Juan Munoz",
      avatar: "/contemplative-artist.png",
      initials: "JM",
      points: 580,
      completedChores: 32,
      streak: 7,
      taskBreakdown: {
        urgent: 12,
        notUrgent: 20,
        disaster: 5,
        consequence: 15,
        annoyance: 10,
        noRealProblem: 2,
      },
    },
    {
      rank: 2,
      name: "Jonathan Di Rico",
      avatar: "/thoughtful-bearded-man.png",
      initials: "JD",
      points: 490,
      completedChores: 30,
      streak: 6,
      taskBreakdown: {
        urgent: 10,
        notUrgent: 20,
        disaster: 4,
        consequence: 14,
        annoyance: 10,
        noRealProblem: 2,
      },
    },
    {
      rank: 3,
      name: "Joaquin Vazquez",
      avatar: "/contemplative-man.png",
      initials: "JV",
      points: 420,
      completedChores: 28,
      streak: 5,
      taskBreakdown: {
        urgent: 8,
        notUrgent: 20,
        disaster: 3,
        consequence: 12,
        annoyance: 10,
        noRealProblem: 3,
      },
    },
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Medal className="h-6 w-6 text-amber-700" />
      default:
        return <span className="text-lg font-bold">{rank}</span>
    }
  }

  const [selectedMember, setSelectedMember] = useState(weeklyLeaders[0])

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-xl font-semibold">Leaderboard</h1>
            <div className="flex items-center gap-4">
              <ModeToggle />
              <UserNav />
            </div>
          </div>
        </header>
        <main className="flex-1 p-6">
          <Tabs defaultValue="weekly" className="space-y-4">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="weekly" className="flex-1 max-w-[150px]">
                Weekly
              </TabsTrigger>
              <TabsTrigger value="monthly" className="flex-1 max-w-[150px]">
                Monthly
              </TabsTrigger>
              <TabsTrigger value="alltime" className="flex-1 max-w-[150px]">
                All Time
              </TabsTrigger>
            </TabsList>
            <TabsContent value="weekly" className="space-y-4">
              <div className="grid grid-cols-12 gap-4">
                <Card className="col-span-8">
                  <CardHeader>
                    <CardTitle>Weekly Leaderboard</CardTitle>
                    <CardDescription>Top performers this week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {weeklyLeaders.map((leader) => (
                        <div
                          key={leader.rank}
                          className={`flex items-center p-4 rounded-lg transition-colors ${
                            selectedMember.name === leader.name
                              ? "bg-primary/10 border border-primary/20"
                              : "hover:bg-accent cursor-pointer"
                          }`}
                          onClick={() => setSelectedMember(leader)}
                        >
                          <div className="flex h-12 w-12 items-center justify-center mr-3">
                            {getRankIcon(leader.rank)}
                          </div>
                          <Avatar className="h-14 w-14 border-2 border-primary/10">
                            <AvatarImage src={leader.avatar || "/placeholder.svg"} alt={leader.name} />
                            <AvatarFallback>{leader.initials}</AvatarFallback>
                          </Avatar>
                          <div className="ml-4 space-y-1 flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-base font-medium leading-none">{leader.name}</p>
                              <div className="flex items-center gap-2">
                                <Badge className={`text-base px-3 py-1 ${getScoreColor(leader.points)}`}>
                                  {leader.points} pts
                                </Badge>
                              </div>
                            </div>
                            <div className="flex text-sm text-muted-foreground mt-2">
                              <div className="flex items-center mr-4">
                                <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                                {leader.completedChores} chores
                              </div>
                              <div className="flex items-center mr-4">
                                <Star className="mr-1 h-4 w-4 text-yellow-500" />
                                {leader.streak} day streak
                              </div>
                            </div>
                            <div className="grid grid-cols-4 gap-2 mt-2">
                              <div className="flex flex-col items-center bg-purple-500/10 rounded p-1">
                                <span className="text-xs text-purple-500">Urgent</span>
                                <span className="font-bold text-purple-500">{leader.taskBreakdown.urgent}</span>
                              </div>
                              <div className="flex flex-col items-center bg-blue-500/10 rounded p-1">
                                <span className="text-xs text-blue-500">Not Urgent</span>
                                <span className="font-bold text-blue-500">{leader.taskBreakdown.notUrgent}</span>
                              </div>
                              <div className="flex flex-col items-center bg-red-500/10 rounded p-1">
                                <span className="text-xs text-red-500">Disaster</span>
                                <span className="font-bold text-red-500">{leader.taskBreakdown.disaster}</span>
                              </div>
                              <div className="flex flex-col items-center bg-orange-500/10 rounded p-1">
                                <span className="text-xs text-orange-500">Consequence</span>
                                <span className="font-bold text-orange-500">{leader.taskBreakdown.consequence}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="col-span-4 space-y-4">
                  <MemberStats member={selectedMember} />

                  <Card>
                    <CardHeader>
                      <CardTitle>Achievements</CardTitle>
                      <CardDescription>Special recognitions this week</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center p-2 bg-green-500/10 rounded-lg">
                          <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                            <TrendingUp className="h-5 w-5 text-green-500" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Most Improved</p>
                            <p className="text-xs text-muted-foreground">Joaquin (+45%)</p>
                          </div>
                        </div>

                        <div className="flex items-center p-2 bg-yellow-500/10 rounded-lg">
                          <div className="h-10 w-10 rounded-full bg-yellow-500/20 flex items-center justify-center mr-3">
                            <Star className="h-5 w-5 text-yellow-500" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Perfect Streak</p>
                            <p className="text-xs text-muted-foreground">Juan (7 days)</p>
                          </div>
                        </div>

                        <div className="flex items-center p-2 bg-blue-500/10 rounded-lg">
                          <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                            <Award className="h-5 w-5 text-blue-500" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Most Efficient</p>
                            <p className="text-xs text-muted-foreground">Jonathan (fastest times)</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="monthly">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Leaderboard</CardTitle>
                  <CardDescription>Top performers this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center p-8 text-muted-foreground">
                    Same structure as weekly leaderboard with monthly data
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="alltime">
              <Card>
                <CardHeader>
                  <CardTitle>All Time Leaderboard</CardTitle>
                  <CardDescription>Top performers overall</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center p-8 text-muted-foreground">
                    Same structure as weekly leaderboard with all-time data
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
