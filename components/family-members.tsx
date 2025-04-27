"use client"

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
import type { FamilyMember } from "@/lib/types"
import { getScoreColor } from "@/lib/scoring"

export function FamilyMembers() {
  const members: FamilyMember[] = [
    {
      id: "1",
      name: "Jonathan Di Rico",
      avatar: "/thoughtful-bearded-man.png",
      initials: "DJ",
      role: "Roommate",
      completedChores: 8,
      totalChores: 10,
      streak: 5,
      score: 420,
    },
    {
      id: "2",
      name: "Juan Munoz",
      avatar: "/contemplative-artist.png",
      initials: "MJ",
      role: "Roommate",
      completedChores: 10,
      totalChores: 12,
      streak: 7,
      score: 580,
    },
    {
      id: "3",
      name: "Joaquin Vazquez",
      avatar: "/contemplative-man.png",
      initials: "VJ",
      role: "Roommate",
      completedChores: 6,
      totalChores: 8,
      streak: 3,
      score: 310,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Roommates</CardTitle>
            <CardDescription>Manage roommates and their chore progress</CardDescription>
          </div>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Roommate
          </Button>
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
