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
import { Trophy, Medal, Star, CheckCircle, CircleCheck, BarChart3 } from "lucide-react"
import { getScoreColor } from "@/lib/scoring"
import { Progress } from "@/components/ui/progress"

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
      completionRate: 86,
      taskBreakdown: {
        urgent: 12,
        notUrgent: 20,
        disaster: 5,
        consequence: 15,
        annoyance: 10,
        noRealProblem: 2,
      },
      areaPerformance: {
        kitchen: 95,
        livingRoom: 85,
        bathroom: 90,
        bedroom: 75,
        garden: 80,
      },
      weeklyProgress: [
        { day: "Mon", target: 5, completed: 4 },
        { day: "Tue", target: 4, completed: 5 },
        { day: "Wed", target: 6, completed: 6 },
        { day: "Thu", target: 5, completed: 3 },
        { day: "Fri", target: 4, completed: 5 },
        { day: "Sat", target: 5, completed: 4 },
        { day: "Sun", target: 3, completed: 5 },
      ],
    },
    {
      rank: 2,
      name: "Jonathan Di Rico",
      avatar: "/thoughtful-bearded-man.png",
      initials: "JD",
      points: 490,
      completedChores: 30,
      streak: 6,
      completionRate: 82,
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
      completionRate: 78,
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

  // Assume current user is the first in the list
  const [currentUser] = useState(weeklyLeaders[0])

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
            <TabsContent value="weekly">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Side - User Stats */}
                <div className="lg:col-span-7 space-y-6">
                  {/* User Header */}
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
                      <AvatarFallback>{currentUser.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-lg font-semibold">{currentUser.name}'s Stats</h2>
                      <p className="text-sm text-muted-foreground">Detailed performance metrics</p>
                    </div>
                  </div>

                  {/* First Row - 4 Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Card 1: Points */}
                    <Card className="bg-primary/5">
                      <CardContent className="p-6 flex flex-col items-center justify-center">
                        <Trophy className="h-8 w-8 text-yellow-500 mb-2" />
                        <span className="text-3xl font-bold">{currentUser.points}</span>
                        <span className="text-sm text-muted-foreground">Total Points</span>
                      </CardContent>
                    </Card>

                    {/* Card 2: Streak */}
                    <Card className="bg-primary/5">
                      <CardContent className="p-6 flex flex-col items-center justify-center">
                        <Star className="h-8 w-8 text-yellow-500 mb-2" />
                        <span className="text-3xl font-bold">{currentUser.streak}</span>
                        <span className="text-sm text-muted-foreground">Day Streak</span>
                      </CardContent>
                    </Card>

                    {/* Card 3: Completed Tasks */}
                    <Card className="bg-primary/5">
                      <CardContent className="p-6 flex flex-col items-center justify-center">
                        <CircleCheck className="h-8 w-8 text-green-500 mb-2" />
                        <span className="text-3xl font-bold">{currentUser.completedChores}</span>
                        <span className="text-sm text-muted-foreground">Completed</span>
                      </CardContent>
                    </Card>

                    {/* Card 4: Completion Rate */}
                    <Card className="bg-primary/5">
                      <CardContent className="p-6 flex flex-col items-center justify-center">
                        <BarChart3 className="h-8 w-8 text-blue-500 mb-2" />
                        <span className="text-3xl font-bold">{currentUser.completionRate}%</span>
                        <span className="text-sm text-muted-foreground">Completion Rate</span>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Second Row - Weekly Progress and Area Performance */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Weekly Progress Chart */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Weekly Progress</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between h-40">
                          {currentUser.weeklyProgress.map((day, i) => (
                            <div key={i} className="flex flex-col items-center gap-1">
                              <div className="flex flex-col items-center gap-1">
                                <div className="h-32 w-8 flex flex-col justify-end gap-1">
                                  <div className="w-full bg-muted rounded-sm h-[60%]"></div>
                                  <div
                                    className="w-full bg-green-500 rounded-sm"
                                    style={{ height: `${(day.completed / day.target) * 60}%` }}
                                  ></div>
                                </div>
                              </div>
                              <span className="text-xs text-muted-foreground">{day.day}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Area Performance */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Area Performance</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {Object.entries(currentUser.areaPerformance).map(([area, value]) => (
                          <div key={area} className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm capitalize">{area.replace(/([A-Z])/g, " $1").trim()}</span>
                              <span className="text-sm font-medium">{value}%</span>
                            </div>
                            <Progress value={value} className="h-2" />
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Right Side - Leaderboard */}
                <div className="lg:col-span-5">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Weekly Leaderboard</CardTitle>
                      <CardDescription>Top performers this week</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {weeklyLeaders.map((leader) => (
                        <div
                          key={leader.rank}
                          className={`flex items-center p-4 rounded-lg ${
                            leader.rank === 1 ? "bg-primary/10 border border-primary/20" : "hover:bg-accent"
                          }`}
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
