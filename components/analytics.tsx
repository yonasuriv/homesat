"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"
import { CompletionTrends } from "@/components/completion-trends"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "@/components/ui/chart"
import { ScoreBreakdown } from "@/components/score-breakdown"
import { OverdueGraph } from "@/components/overdue-graph"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Analytics() {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]
  const [selectedUser, setSelectedUser] = useState("Jonathan")

  // Mock users data
  const users = [
    { id: 1, name: "Jonathan", avatar: "/thoughtful-bearded-man.png", initials: "JD" },
    { id: 2, name: "Juan", avatar: "/contemplative-man.png", initials: "JM" },
    { id: 3, name: "Joaquin", avatar: "/thoughtful-gentleman.png", initials: "JR" },
  ]

  const timeSpentData = [
    { name: "Kitchen", value: 120 },
    { name: "Living Room", value: 90 },
    { name: "Bathroom", value: 150 },
    { name: "Bedroom", value: 60 },
    { name: "Garden", value: 180 },
    { name: "Other", value: 45 },
  ]

  const scoreByDayData = [
    { name: "Mon", Jonathan: 50, Juan: 65, Joaquin: 40 },
    { name: "Tue", Jonathan: 60, Juan: 45, Joaquin: 55 },
    { name: "Wed", Jonathan: 45, Juan: 70, Joaquin: 35 },
    { name: "Thu", Jonathan: 75, Juan: 60, Joaquin: 50 },
    { name: "Fri", Jonathan: 55, Juan: 50, Joaquin: 60 },
    { name: "Sat", Jonathan: 80, Juan: 75, Joaquin: 65 },
    { name: "Sun", Jonathan: 40, Juan: 55, Joaquin: 30 },
  ]

  const completionRateData = [
    { name: "Week 1", rate: 75 },
    { name: "Week 2", rate: 82 },
    { name: "Week 3", rate: 78 },
    { name: "Week 4", rate: 88 },
    { name: "Week 5", rate: 85 },
    { name: "Week 6", rate: 90 },
    { name: "Week 7", rate: 92 },
    { name: "Week 8", rate: 87 },
  ]

  // Individual radar data for each user
  const jonathanRadarData = [
    { subject: "Kitchen", value: 80, fullMark: 100 },
    { subject: "Living Room", value: 75, fullMark: 100 },
    { subject: "Bathroom", value: 85, fullMark: 100 },
    { subject: "Bedroom", value: 65, fullMark: 100 },
    { subject: "Garden", value: 90, fullMark: 100 },
    { subject: "Garage", value: 95, fullMark: 100 },
  ]

  const juanRadarData = [
    { subject: "Kitchen", value: 90, fullMark: 100 },
    { subject: "Living Room", value: 85, fullMark: 100 },
    { subject: "Bathroom", value: 70, fullMark: 100 },
    { subject: "Bedroom", value: 80, fullMark: 100 },
    { subject: "Garden", value: 65, fullMark: 100 },
    { subject: "Garage", value: 60, fullMark: 100 },
  ]

  const joaquinRadarData = [
    { subject: "Kitchen", value: 70, fullMark: 100 },
    { subject: "Living Room", value: 65, fullMark: 100 },
    { subject: "Bathroom", value: 60, fullMark: 100 },
    { subject: "Bedroom", value: 90, fullMark: 100 },
    { subject: "Garden", value: 75, fullMark: 100 },
    { subject: "Garage", value: 85, fullMark: 100 },
  ]

  // Map of user names to their radar data
  const userRadarData = {
    Jonathan: jonathanRadarData,
    Juan: juanRadarData,
    Joaquin: joaquinRadarData,
  }

  const scoreDistributionData = [
    { name: "Urgent", value: 45 },
    { name: "Not Urgent", value: 55 },
  ]

  const severityDistributionData = [
    { name: "Disaster", value: 20 },
    { name: "Consequence", value: 35 },
    { name: "Annoyance", value: 30 },
    { name: "No real problem", value: 15 },
  ]

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-xl font-semibold">Analytics</h1>
            <div className="flex items-center gap-4">
              <Select defaultValue="last30days">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last7days">Last 7 Days</SelectItem>
                  <SelectItem value="last30days">Last 30 Days</SelectItem>
                  <SelectItem value="last90days">Last 90 Days</SelectItem>
                  <SelectItem value="thisyear">This Year</SelectItem>
                  <SelectItem value="alltime">All Time</SelectItem>
                </SelectContent>
              </Select>
              <ModeToggle />
              <UserNav />
            </div>
          </div>
        </header>
        <main className="flex-1 p-6">
          <div className="flex flex-col gap-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Chores Completed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">248</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Completion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87%</div>
                  <p className="text-xs text-muted-foreground">+5% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Points Earned</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3,450</div>
                  <p className="text-xs text-muted-foreground">+18% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Longest Streak</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">14 days</div>
                  <p className="text-xs text-muted-foreground">Juan (current streak)</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="scoring">Scoring</TabsTrigger>
                <TabsTrigger value="areas">Areas</TabsTrigger>
                <TabsTrigger value="time">Time Analysis</TabsTrigger>
                <TabsTrigger value="overdue">Overdue</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Completion Rate Over Time</CardTitle>
                    <CardDescription>Weekly chore completion rate</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={completionRateData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[50, 100]} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="rate" stroke="#8884d8" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Points by Roommate</CardTitle>
                      <CardDescription>Daily score distribution</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={scoreByDayData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="Jonathan" fill="#8884d8" />
                          <Bar dataKey="Juan" fill="#82ca9d" />
                          <Bar dataKey="Joaquin" fill="#ffc658" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Time Spent by Area</CardTitle>
                      <CardDescription>Minutes spent on chores by area</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={timeSpentData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {timeSpentData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="performance" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Roommate Performance by Area</CardTitle>
                    <CardDescription>Select a roommate to view their performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {users.map((user) => (
                        <button
                          key={user.id}
                          onClick={() => setSelectedUser(user.name)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                            selectedUser === user.name
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted hover:bg-muted/80"
                          }`}
                        >
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback>{user.initials}</AvatarFallback>
                          </Avatar>
                          <span>{user.name}</span>
                        </button>
                      ))}
                    </div>

                    <ResponsiveContainer width="100%" height={400}>
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={userRadarData[selectedUser]}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar
                          name={selectedUser}
                          dataKey="value"
                          stroke={
                            selectedUser === "Jonathan" ? "#8884d8" : selectedUser === "Juan" ? "#82ca9d" : "#ffc658"
                          }
                          fill={
                            selectedUser === "Jonathan" ? "#8884d8" : selectedUser === "Juan" ? "#82ca9d" : "#ffc658"
                          }
                          fillOpacity={0.6}
                        />
                        <Legend />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="scoring" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Task Importance Distribution</CardTitle>
                      <CardDescription>Breakdown of tasks by importance level</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={scoreDistributionData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {scoreDistributionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Task Severity Distribution</CardTitle>
                      <CardDescription>Breakdown of tasks by severity level</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={severityDistributionData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {severityDistributionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                <ScoreBreakdown />
              </TabsContent>

              <TabsContent value="areas" className="space-y-4">
                <CompletionTrends />
              </TabsContent>

              <TabsContent value="time" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Time of Day Analysis</CardTitle>
                    <CardDescription>When chores are most frequently completed</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={[
                          { time: "Morning", count: 45 },
                          { time: "Afternoon", count: 65 },
                          { time: "Evening", count: 95 },
                          { time: "Night", count: 35 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" name="Chores Completed" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Day of Week Analysis</CardTitle>
                    <CardDescription>Chore completion by day of week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={[
                          { day: "Monday", count: 32 },
                          { day: "Tuesday", count: 28 },
                          { day: "Wednesday", count: 25 },
                          { day: "Thursday", count: 30 },
                          { day: "Friday", count: 35 },
                          { day: "Saturday", count: 55 },
                          { day: "Sunday", count: 43 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" name="Chores Completed" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="overdue" className="space-y-4">
                <OverdueGraph />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
