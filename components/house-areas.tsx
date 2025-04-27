"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import type { HouseArea } from "@/lib/types"
import { getScoreColor, getPriorityColor } from "@/lib/scoring"

export function HouseAreas() {
  const areas: HouseArea[] = [
    {
      id: "1",
      name: "Kitchen",
      totalChores: 8,
      completedChores: 6,
      assignedTo: ["Jonathan", "Juan"],
      priority: "IMPORTANT",
      lastCleaned: "Today",
      score: 92,
    },
    {
      id: "2",
      name: "Living Room",
      totalChores: 5,
      completedChores: 4,
      assignedTo: ["Jonathan"],
      priority: "DO IT CALMLY",
      lastCleaned: "Yesterday",
      score: 85,
    },
    {
      id: "3",
      name: "Bathroom",
      totalChores: 6,
      completedChores: 3,
      assignedTo: ["Juan"],
      priority: "MUST DO",
      lastCleaned: "2 days ago",
      score: 65,
    },
    {
      id: "4",
      name: "Bedroom 1",
      totalChores: 4,
      completedChores: 4,
      assignedTo: ["Jonathan"],
      priority: "DO IT CALMLY",
      lastCleaned: "Today",
      score: 100,
    },
    {
      id: "5",
      name: "Bedroom 2",
      totalChores: 4,
      completedChores: 2,
      assignedTo: ["Joaquin"],
      priority: "DO IT CALMLY",
      lastCleaned: "3 days ago",
      score: 50,
    },
    {
      id: "6",
      name: "Garage",
      totalChores: 3,
      completedChores: 1,
      assignedTo: ["Juan", "Jonathan"],
      priority: "OPTIONAL",
      lastCleaned: "Last week",
      score: 33,
    },
    {
      id: "7",
      name: "Garden",
      totalChores: 5,
      completedChores: 3,
      assignedTo: ["Joaquin"],
      priority: "DO IT CALMLY",
      lastCleaned: "2 days ago",
      score: 60,
    },
    {
      id: "8",
      name: "Basement",
      totalChores: 3,
      completedChores: 0,
      assignedTo: ["Jonathan", "Juan"],
      priority: "OPTIONAL",
      lastCleaned: "2 weeks ago",
      score: 0,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>House Areas</CardTitle>
        <CardDescription>Manage and track cleanliness by area</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {areas.map((area) => (
            <Card key={area.id} className="overflow-hidden">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{area.name}</CardTitle>
                  <Badge variant="outline" className={`${getPriorityColor(area.priority)}`}>
                    {area.priority}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Completion</span>
                      <span className="font-medium">
                        {area.completedChores}/{area.totalChores}
                      </span>
                    </div>
                    <Progress value={(area.completedChores / area.totalChores) * 100} />
                  </div>
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Assigned to:</span>
                      <span>{area.assignedTo.join(", ")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last cleaned:</span>
                      <span>{area.lastCleaned}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Area Score:</span>
                      <span className={`font-semibold ${getScoreColor(area.score || 0)}`}>{area.score}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
