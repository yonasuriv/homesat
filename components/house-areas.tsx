"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { getScoreColor, getPriorityColor } from "@/lib/scoring"
import { getAreas } from "@/lib/actions/areas"
import { SeedDatabaseButton } from "@/components/seed-database-button"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function HouseAreas() {
  const [areas, setAreas] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadAreas() {
      try {
        const data = await getAreas()

        // Add some mock stats for now
        const areasWithStats = data.map((area) => ({
          ...area,
          totalChores: Math.floor(Math.random() * 5) + 3,
          completedChores: Math.floor(Math.random() * 3) + 1,
          assignedTo: ["Jonathan", "Juan", "Joaquin"].slice(0, Math.floor(Math.random() * 3) + 1),
          priority: ["MUST DO", "IMPORTANT", "DO IT CALMLY", "OPTIONAL"][Math.floor(Math.random() * 4)],
          lastCleaned: ["Today", "Yesterday", "2 days ago", "Last week"][Math.floor(Math.random() * 4)],
          score: Math.floor(Math.random() * 100),
        }))

        setAreas(areasWithStats)
      } catch (error) {
        console.error("Error loading areas:", error)
      } finally {
        setLoading(false)
      }
    }

    loadAreas()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>House Areas</CardTitle>
          <CardDescription>Loading areas...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (areas.length === 0) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>House Areas</CardTitle>
              <CardDescription>No areas found. Seed the database to get started.</CardDescription>
            </div>
            <SeedDatabaseButton />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center p-8">
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Area
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>House Areas</CardTitle>
            <CardDescription>Manage and track cleanliness by area</CardDescription>
          </div>
          <div className="flex gap-2">
            <SeedDatabaseButton />
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Area
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {areas.map((area) => (
            <Card key={area.id} className="overflow-hidden">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{area.name}</CardTitle>
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
