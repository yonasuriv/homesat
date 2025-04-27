"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "@/components/ui/chart"
import { getScoreColor } from "@/lib/scoring"
import { CheckCircle, Star, Award, Trophy } from "lucide-react"

export function MemberStats({ member }) {
  // Mock data for the stats
  const weeklyProgress = [
    { day: "Mon", completed: 4, total: 5 },
    { day: "Tue", completed: 3, total: 3 },
    { day: "Wed", completed: 5, total: 6 },
    { day: "Thu", completed: 2, total: 4 },
    { day: "Fri", completed: 6, total: 6 },
    { day: "Sat", completed: 3, total: 5 },
    { day: "Sun", completed: 4, total: 5 },
  ]

  const areaPerformance = [
    { name: "Kitchen", score: 95 },
    { name: "Living Room", score: 85 },
    { name: "Bathroom", score: 90 },
    { name: "Bedroom", score: 75 },
    { name: "Garden", score: 80 },
  ]

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
            <AvatarFallback>{member.initials}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{member.name}'s Stats</CardTitle>
            <CardDescription>Detailed performance metrics</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-primary/5 p-3 rounded-lg flex flex-col items-center">
            <Trophy className="h-5 w-5 text-yellow-500 mb-1" />
            <span className={`text-lg font-bold ${getScoreColor(member.points)}`}>{member.points}</span>
            <span className="text-xs text-muted-foreground">Total Points</span>
          </div>

          <div className="bg-primary/5 p-3 rounded-lg flex flex-col items-center">
            <Star className="h-5 w-5 text-yellow-500 mb-1" />
            <span className="text-lg font-bold text-yellow-500">{member.streak}</span>
            <span className="text-xs text-muted-foreground">Day Streak</span>
          </div>

          <div className="bg-primary/5 p-3 rounded-lg flex flex-col items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mb-1" />
            <span className="text-lg font-bold text-green-500">{member.completedChores}</span>
            <span className="text-xs text-muted-foreground">Completed</span>
          </div>

          <div className="bg-primary/5 p-3 rounded-lg flex flex-col items-center">
            <Award className="h-5 w-5 text-blue-500 mb-1" />
            <span className="text-lg font-bold text-blue-500">
              {Math.round((member.completedChores / (member.completedChores + 5)) * 100)}%
            </span>
            <span className="text-xs text-muted-foreground">Completion Rate</span>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Weekly Progress</h4>
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={weeklyProgress} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 10 }} />
              <YAxis hide />
              <Tooltip
                formatter={(value, name) => [value, name === "completed" ? "Completed" : "Total"]}
                labelFormatter={(label) => `${label}`}
              />
              <Bar dataKey="total" fill="#6b7280" radius={[4, 4, 0, 0]} />
              <Bar dataKey="completed" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Area Performance</h4>
          <div className="space-y-2">
            {areaPerformance.map((area) => (
              <div key={area.name} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>{area.name}</span>
                  <span className={getScoreColor(area.score)}>{area.score}%</span>
                </div>
                <Progress value={area.score} className="h-2" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
