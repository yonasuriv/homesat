"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Plus, MoreHorizontal, Trophy } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getScoreColor } from "@/lib/scoring"
import { getFamilyMembers } from "@/lib/actions/family-members"
import { SeedDatabaseButton } from "@/components/seed-database-button"

export function FamilyMembers() {
  const [members, setMembers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadMembers() {
      try {
        const data = await getFamilyMembers()

        // Add some mock stats for now
        const membersWithStats = data.map((member) => ({
          ...member,
          completedChores: Math.floor(Math.random() * 10) + 5,
          totalChores: Math.floor(Math.random() * 5) + 10,
          streak: Math.floor(Math.random() * 7) + 1,
          score: Math.floor(Math.random() * 300) + 200,
        }))

        setMembers(membersWithStats)
      } catch (error) {
        console.error("Error loading family members:", error)
      } finally {
        setLoading(false)
      }
    }

    loadMembers()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Roommates</CardTitle>
              <CardDescription>Loading roommates...</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (members.length === 0) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Roommates</CardTitle>
              <CardDescription>No roommates found. Seed the database to get started.</CardDescription>
            </div>
            <SeedDatabaseButton />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center p-8">
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Roommate
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
            <CardTitle>Roommates</CardTitle>
            <CardDescription>Manage roommates and their chore progress</CardDescription>
          </div>
          <div className="flex gap-2">
            <SeedDatabaseButton />
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Roommate
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <Card key={member.id} className="overflow-hidden">
              <CardHeader className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback>{member.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Assign Chores</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Remove</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Chore Completion</span>
                      <span className="font-medium">
                        {member.completedChores}/{member.totalChores}
                      </span>
                    </div>
                    <Progress value={(member.completedChores / member.totalChores) * 100} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-orange-500/10 text-orange-500 hover:bg-orange-500/20">
                      {member.streak} Day Streak
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Trophy className={`h-4 w-4 ${getScoreColor(member.score)}`} />
                      <span className={`font-semibold ${getScoreColor(member.score)}`}>{member.score} pts</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    View Chores
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
