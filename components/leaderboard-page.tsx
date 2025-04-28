"use client"
import { AppSidebar } from "@/components/sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Medal, Star, CheckCircle, Home, Utensils, Bath, Bed, Flower } from "lucide-react"
import { getScoreColor } from "@/lib/scoring"

export function LeaderboardPage() {
  const allTimeLeaders = [
    {
      rank: 1,
      name: "Mark Smith",
      avatar: "/contemplative-artist.png",
      initials: "JM",
      points: 12580,
      completedChores: 732,
      streak: 7,
      completionRate: 89,
      taskBreakdown: {
        urgent: 212,
        notUrgent: 520,
        disaster: 85,
        consequence: 315,
        annoyance: 210,
        noRealProblem: 122,
      },
      areaPerformance: {
        kitchen: 95,
        livingRoom: 85,
        bathroom: 90,
        bedroom: 75,
        garden: 80,
      },
    },
    {
      rank: 2,
      name: "John Doe",
      avatar: "/thoughtful-bearded-man.png",
      initials: "JD",
      points: 11490,
      completedChores: 690,
      streak: 6,
      completionRate: 84,
      taskBreakdown: {
        urgent: 190,
        notUrgent: 500,
        disaster: 74,
        consequence: 294,
        annoyance: 200,
        noRealProblem: 122,
      },
      areaPerformance: {
        kitchen: 80,
        livingRoom: 92,
        bathroom: 75,
        bedroom: 88,
        garden: 70,
      },
    },
    {
      rank: 3,
      name: "Sebastian Mall",
      avatar: "/contemplative-man.png",
      initials: "JV",
      points: 10420,
      completedChores: 628,
      streak: 5,
      completionRate: 82,
      taskBreakdown: {
        urgent: 168,
        notUrgent: 460,
        disaster: 63,
        consequence: 252,
        annoyance: 190,
        noRealProblem: 123,
      },
      areaPerformance: {
        kitchen: 88,
        livingRoom: 75,
        bathroom: 92,
        bedroom: 70,
        garden: 85,
      },
    },
  ]

  // Area rankings
  const areaRankings = {
    kitchen: [
      { name: "Mark Smith", avatar: "/contemplative-artist.png", initials: "JM", score: 95 },
      { name: "Sebastian Mall", avatar: "/contemplative-man.png", initials: "JV", score: 88 },
      { name: "John Doe", avatar: "/thoughtful-bearded-man.png", initials: "JD", score: 80 },
    ],
    livingRoom: [
      { name: "John Doe", avatar: "/thoughtful-bearded-man.png", initials: "JD", score: 92 },
      { name: "Mark Smith", avatar: "/contemplative-artist.png", initials: "JM", score: 85 },
      { name: "Sebastian Mall", avatar: "/contemplative-man.png", initials: "JV", score: 75 },
    ],
    bathroom: [
      { name: "Sebastian Mall", avatar: "/contemplative-man.png", initials: "JV", score: 92 },
      { name: "Mark Smith", avatar: "/contemplative-artist.png", initials: "JM", score: 90 },
      { name: "John Doe", avatar: "/thoughtful-bearded-man.png", initials: "JD", score: 75 },
    ],
    bedroom: [
      { name: "John Doe", avatar: "/thoughtful-bearded-man.png", initials: "JD", score: 88 },
      { name: "Mark Smith", avatar: "/contemplative-artist.png", initials: "JM", score: 75 },
      { name: "Sebastian Mall", avatar: "/contemplative-man.png", initials: "JV", score: 70 },
    ],
    garden: [
      { name: "Mark Smith", avatar: "/contemplative-artist.png", initials: "JM", score: 80 },
      { name: "Sebastian Mall", avatar: "/contemplative-man.png", initials: "JV", score: 85 },
      { name: "John Doe", avatar: "/thoughtful-bearded-man.png", initials: "JD", score: 70 },
    ],
  }

  // Task type rankings
  const taskRankings = {
    urgent: [
      { name: "Mark Smith", avatar: "/contemplative-artist.png", initials: "JM", count: 212, efficiency: 94 },
      { name: "John Doe", avatar: "/thoughtful-bearded-man.png", initials: "JD", count: 190, efficiency: 88 },
      { name: "Sebastian Mall", avatar: "/contemplative-man.png", initials: "JV", count: 168, efficiency: 82 },
    ],
    disaster: [
      { name: "Mark Smith", avatar: "/contemplative-artist.png", initials: "JM", count: 85, efficiency: 96 },
      { name: "John Doe", avatar: "/thoughtful-bearded-man.png", initials: "JD", count: 74, efficiency: 90 },
      { name: "Sebastian Mall", avatar: "/contemplative-man.png", initials: "JV", count: 63, efficiency: 85 },
    ],
    recurring: [
      { name: "John Doe", avatar: "/thoughtful-bearded-man.png", initials: "JD", count: 320, efficiency: 95 },
      { name: "Mark Smith", avatar: "/contemplative-artist.png", initials: "JM", count: 305, efficiency: 92 },
      { name: "Sebastian Mall", avatar: "/contemplative-man.png", initials: "JV", count: 280, efficiency: 88 },
    ],
  }

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

  const getAreaIcon = (area: string) => {
    switch (area) {
      case "kitchen":
        return <Utensils className="h-5 w-5 text-orange-500" />
      case "livingRoom":
        return <Home className="h-5 w-5 text-blue-500" />
      case "bathroom":
        return <Bath className="h-5 w-5 text-cyan-500" />
      case "bedroom":
        return <Bed className="h-5 w-5 text-purple-500" />
      case "garden":
        return <Flower className="h-5 w-5 text-green-500" />
      default:
        return <Home className="h-5 w-5 text-gray-500" />
    }
  }

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
          <Tabs defaultValue="overall" className="space-y-4">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="overall" className="flex-1 max-w-[150px]">
                Overall
              </TabsTrigger>
              <TabsTrigger value="areas" className="flex-1 max-w-[150px]">
                By Area
              </TabsTrigger>
              <TabsTrigger value="tasks" className="flex-1 max-w-[150px]">
                By Task Type
              </TabsTrigger>
            </TabsList>

            {/* Overall Rankings Tab */}
            <TabsContent value="overall" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>All-Time Leaderboard</CardTitle>
                  <CardDescription>Top performers overall</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {allTimeLeaders.map((leader) => (
                    <div
                      key={leader.rank}
                      className={`flex items-center p-4 rounded-lg ${
                        leader.rank === 1 ? "bg-primary/10 border border-primary/20" : "hover:bg-accent"
                      }`}
                    >
                      <div className="flex h-12 w-12 items-center justify-center mr-3">{getRankIcon(leader.rank)}</div>
                      <Avatar className="h-14 w-14 border-2 border-primary/10">
                        <AvatarImage src={leader.avatar || "/placeholder.svg"} alt={leader.name} />
                        <AvatarFallback>{leader.initials}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-base font-medium leading-none">{leader.name}</p>
                          <div className="flex items-center gap-2">
                            <Badge className={`text-base px-3 py-1 ${getScoreColor(leader.points)}`}>
                              {leader.points.toLocaleString()} pts
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
                            {leader.completionRate}% completion
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
            </TabsContent>

            {/* Area Rankings Tab */}
            <TabsContent value="areas" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(areaRankings).map(([area, rankings]) => (
                  <Card key={area}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base capitalize">{area.replace(/([A-Z])/g, " $1").trim()}</CardTitle>
                        {getAreaIcon(area)}
                      </div>
                      <CardDescription>Top performers in this area</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {rankings.map((person, index) => (
                        <div key={index} className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-2">
                            <div className="flex h-6 w-6 items-center justify-center">
                              {index === 0 ? (
                                <Trophy className="h-4 w-4 text-yellow-500" />
                              ) : index === 1 ? (
                                <Medal className="h-4 w-4 text-gray-400" />
                              ) : (
                                <Medal className="h-4 w-4 text-amber-700" />
                              )}
                            </div>
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={person.avatar || "/placeholder.svg"} alt={person.name} />
                              <AvatarFallback>{person.initials}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{person.name}</span>
                          </div>
                          <Badge className="bg-primary/20 text-primary hover:bg-primary/30">{person.score}%</Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Task Type Rankings Tab */}
            <TabsContent value="tasks" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(taskRankings).map(([taskType, rankings]) => (
                  <Card key={taskType}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base capitalize">
                        {taskType.replace(/([A-Z])/g, " $1").trim()} Tasks
                      </CardTitle>
                      <CardDescription>Top performers for {taskType} tasks</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {rankings.map((person, index) => (
                        <div key={index} className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-2">
                            <div className="flex h-6 w-6 items-center justify-center">
                              {index === 0 ? (
                                <Trophy className="h-4 w-4 text-yellow-500" />
                              ) : index === 1 ? (
                                <Medal className="h-4 w-4 text-gray-400" />
                              ) : (
                                <Medal className="h-4 w-4 text-amber-700" />
                              )}
                            </div>
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={person.avatar || "/placeholder.svg"} alt={person.name} />
                              <AvatarFallback>{person.initials}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{person.name}</span>
                          </div>
                          <div className="flex flex-col items-end">
                            <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                              {person.count} tasks
                            </Badge>
                            <span className="text-xs text-muted-foreground">{person.efficiency}% efficiency</span>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
