"use client"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"
import { AppSidebar } from "@/components/sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { MiniSchedule } from "@/components/mini-schedule"
import { RecentActivity } from "@/components/recent-activity"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, BarChart3, CheckCircle, Medal, Star, Trophy } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Dashboard() {
  // Mock user data
  const userData = {
    weekly: {
      name: "Juan Munoz",
      avatar: "/contemplative-artist.png",
      initials: "JM",
      points: 580,
      completedChores: 32,
      streak: 7,
      completionRate: 86,
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
    monthly: {
      name: "Juan Munoz",
      avatar: "/contemplative-artist.png",
      initials: "JM",
      points: 2450,
      completedChores: 145,
      streak: 7,
      completionRate: 92,
      areaPerformance: {
        kitchen: 97,
        livingRoom: 90,
        bathroom: 94,
        bedroom: 85,
        garden: 88,
      },
      weeklyProgress: [
        { day: "W1", target: 20, completed: 18 },
        { day: "W2", target: 22, completed: 20 },
        { day: "W3", target: 25, completed: 24 },
        { day: "W4", target: 20, completed: 19 },
      ],
    },
  }

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
            {/* User Stats Section */}
            <Tabs defaultValue="weekly" className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={userData.weekly.avatar || "/placeholder.svg"} alt={userData.weekly.name} />
                    <AvatarFallback>{userData.weekly.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-lg font-semibold">{userData.weekly.name}'s Stats</h2>
                    <p className="text-sm text-muted-foreground">Detailed performance metrics</p>
                  </div>
                </div>
                <TabsList>
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="weekly" className="space-y-6">
                {/* First Row - 4 Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Card 1: Points */}
                  <Card className="bg-primary/5">
                    <CardContent className="p-6 flex flex-col items-center justify-center">
                      <Trophy className="h-8 w-8 text-yellow-500 mb-2" />
                      <span className="text-3xl font-bold">{userData.weekly.points}</span>
                      <span className="text-sm text-muted-foreground">Total Points</span>
                    </CardContent>
                  </Card>

                  {/* Card 2: Streak */}
                  <Card className="bg-primary/5">
                    <CardContent className="p-6 flex flex-col items-center justify-center">
                      <Star className="h-8 w-8 text-yellow-500 mb-2" />
                      <span className="text-3xl font-bold">{userData.weekly.streak}</span>
                      <span className="text-sm text-muted-foreground">Day Streak</span>
                    </CardContent>
                  </Card>

                  {/* Card 3: Completed Tasks */}
                  <Card className="bg-primary/5">
                    <CardContent className="p-6 flex flex-col items-center justify-center">
                      <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
                      <span className="text-3xl font-bold">{userData.weekly.completedChores}</span>
                      <span className="text-sm text-muted-foreground">Completed</span>
                    </CardContent>
                  </Card>

                  {/* Card 4: Completion Rate */}
                  <Card className="bg-primary/5">
                    <CardContent className="p-6 flex flex-col items-center justify-center">
                      <BarChart3 className="h-8 w-8 text-blue-500 mb-2" />
                      <span className="text-3xl font-bold">{userData.weekly.completionRate}%</span>
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
                        {userData.weekly.weeklyProgress.map((day, i) => (
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
                      {Object.entries(userData.weekly.areaPerformance).map(([area, value]) => (
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
              </TabsContent>

              <TabsContent value="monthly" className="space-y-6">
                {/* First Row - 4 Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Card 1: Points */}
                  <Card className="bg-primary/5">
                    <CardContent className="p-6 flex flex-col items-center justify-center">
                      <Trophy className="h-8 w-8 text-yellow-500 mb-2" />
                      <span className="text-3xl font-bold">{userData.monthly.points}</span>
                      <span className="text-sm text-muted-foreground">Total Points</span>
                    </CardContent>
                  </Card>

                  {/* Card 2: Streak */}
                  <Card className="bg-primary/5">
                    <CardContent className="p-6 flex flex-col items-center justify-center">
                      <Star className="h-8 w-8 text-yellow-500 mb-2" />
                      <span className="text-3xl font-bold">{userData.monthly.streak}</span>
                      <span className="text-sm text-muted-foreground">Day Streak</span>
                    </CardContent>
                  </Card>

                  {/* Card 3: Completed Tasks */}
                  <Card className="bg-primary/5">
                    <CardContent className="p-6 flex flex-col items-center justify-center">
                      <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
                      <span className="text-3xl font-bold">{userData.monthly.completedChores}</span>
                      <span className="text-sm text-muted-foreground">Completed</span>
                    </CardContent>
                  </Card>

                  {/* Card 4: Completion Rate */}
                  <Card className="bg-primary/5">
                    <CardContent className="p-6 flex flex-col items-center justify-center">
                      <BarChart3 className="h-8 w-8 text-blue-500 mb-2" />
                      <span className="text-3xl font-bold">{userData.monthly.completionRate}%</span>
                      <span className="text-sm text-muted-foreground">Completion Rate</span>
                    </CardContent>
                  </Card>
                </div>

                {/* Second Row - Monthly Progress and Area Performance */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Monthly Progress Chart */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Monthly Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between h-40">
                        {userData.monthly.weeklyProgress.map((week, i) => (
                          <div key={i} className="flex flex-col items-center gap-1">
                            <div className="flex flex-col items-center gap-1">
                              <div className="h-32 w-16 flex flex-col justify-end gap-1">
                                <div className="w-full bg-muted rounded-sm h-[60%]"></div>
                                <div
                                  className="w-full bg-green-500 rounded-sm"
                                  style={{ height: `${(week.completed / week.target) * 60}%` }}
                                ></div>
                              </div>
                            </div>
                            <span className="text-xs text-muted-foreground">{week.day}</span>
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
                      {Object.entries(userData.monthly.areaPerformance).map(([area, value]) => (
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
              </TabsContent>
            </Tabs>

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
