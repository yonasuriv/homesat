"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Filter, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"
import type { Chore } from "@/lib/types"
import { getPriorityColor, getScoreColor, getFrequencyLabel, getFrequencyColor } from "@/lib/scoring"
import { AddChoreDialog } from "@/components/add-chore-dialog"

export function ChoresList() {
  const [chores, setChores] = useState<Chore[]>([
    // Living Room chores
    {
      id: "1",
      name: "Aspirar Sofás",
      assignee: {
        name: "John Doe",
        avatar: "/thoughtful-bearded-man.png",
        initials: "JD",
      },
      dueDate: "Today",
      dueDateObj: new Date(),
      priority: "IMPORTANT",
      status: "pending",
      frequency: 2,
      locations: ["Living"],
      importance: "Not Urgent",
      severity: "Consequence",
      area: "Living",
      score: 11,
      urgent: false,
    },
    {
      id: "2",
      name: "Barrer/Aspirar Piso",
      assignee: {
        name: "Mark Smith",
        avatar: "/contemplative-artist.png",
        initials: "JM",
      },
      dueDate: "Today",
      dueDateObj: new Date(),
      priority: "IMPORTANT",
      status: "pending",
      frequency: 2,
      locations: ["Living", "Terraza", "Baño"],
      importance: "Not Urgent",
      severity: "Consequence",
      area: "Living",
      score: 11,
      urgent: false,
    },
    {
      id: "3",
      name: "Trapear Piso",
      assignee: {
        name: "Sebastian Mall",
        avatar: "/contemplative-man.png",
        initials: "JV",
      },
      dueDate: "Tomorrow",
      dueDateObj: new Date(Date.now() + 86400000),
      priority: "DO IT CALMLY",
      status: "pending",
      frequency: 7,
      locations: ["Living", "Terraza"],
      importance: "Not Urgent",
      severity: "Annoyance",
      area: "Living",
      score: 7,
      urgent: false,
    },
    {
      id: "4",
      name: "Sacar Telarañas",
      assignee: {
        name: "John Doe",
        avatar: "/thoughtful-bearded-man.png",
        initials: "JD",
      },
      dueDate: "Tomorrow",
      dueDateObj: new Date(Date.now() + 86400000),
      priority: "DO IT CALMLY",
      status: "pending",
      frequency: 3,
      locations: ["Living", "Terraza"],
      importance: "Not Urgent",
      severity: "Annoyance",
      area: "Living",
      score: 7,
      urgent: false,
    },
    {
      id: "5",
      name: "Limpiar Vidrios",
      assignee: {
        name: "Mark Smith",
        avatar: "/contemplative-artist.png",
        initials: "JM",
      },
      dueDate: "Tomorrow",
      dueDateObj: new Date(Date.now() + 86400000),
      priority: "DO IT CALMLY",
      status: "pending",
      frequency: 10,
      locations: ["Living", "Terraza", "Baño"],
      importance: "Not Urgent",
      severity: "Annoyance",
      area: "Living",
      score: 7,
      urgent: false,
    },
    {
      id: "6",
      name: "Limpiar Superficies",
      assignee: {
        name: "Sebastian Mall",
        avatar: "/contemplative-man.png",
        initials: "JV",
      },
      dueDate: "Today",
      dueDateObj: new Date(),
      priority: "IMPORTANT",
      status: "pending",
      frequency: 2,
      locations: ["Living", "Cocina", "Terraza", "Baño"],
      importance: "Not Urgent",
      severity: "Consequence",
      area: "Living",
      score: 11,
      urgent: false,
    },

    // Kitchen chores
    {
      id: "7",
      name: "Limpiar Bandejas",
      assignee: {
        name: "John Doe",
        avatar: "/thoughtful-bearded-man.png",
        initials: "JD",
      },
      dueDate: "Tomorrow",
      dueDateObj: new Date(Date.now() + 86400000),
      priority: "DO IT CALMLY",
      status: "pending",
      frequency: 9,
      locations: ["Cocina"],
      importance: "Not Urgent",
      severity: "Annoyance",
      area: "Cocina",
      score: 7,
      urgent: false,
    },
    {
      id: "8",
      name: "Limpiar Horno",
      assignee: {
        name: "Mark Smith",
        avatar: "/contemplative-artist.png",
        initials: "JM",
      },
      dueDate: "Tomorrow",
      dueDateObj: new Date(Date.now() + 86400000),
      priority: "IMPORTANT",
      status: "pending",
      frequency: 14,
      locations: ["Cocina"],
      importance: "Not Urgent",
      severity: "Consequence",
      area: "Cocina",
      score: 11,
      urgent: false,
    },
    {
      id: "9",
      name: "Limpieza cajones",
      assignee: {
        name: "Sebastian Mall",
        avatar: "/contemplative-man.png",
        initials: "JV",
      },
      dueDate: "Tomorrow",
      dueDateObj: new Date(Date.now() + 86400000),
      priority: "DO IT CALMLY",
      status: "pending",
      frequency: 7,
      locations: ["Cocina"],
      importance: "Not Urgent",
      severity: "Annoyance",
      area: "Cocina",
      score: 7,
      urgent: false,
    },
    {
      id: "10",
      name: "Limpieza estantes",
      assignee: {
        name: "John Doe",
        avatar: "/thoughtful-bearded-man.png",
        initials: "JD",
      },
      dueDate: "Tomorrow",
      dueDateObj: new Date(Date.now() + 86400000),
      priority: "DO IT CALMLY",
      status: "pending",
      frequency: 7,
      locations: ["Cocina"],
      importance: "Not Urgent",
      severity: "Annoyance",
      area: "Cocina",
      score: 7,
      urgent: false,
    },

    // Bathroom chores
    {
      id: "11",
      name: "Limpiar Hinodoro",
      assignee: {
        name: "Mark Smith",
        avatar: "/contemplative-artist.png",
        initials: "JM",
      },
      dueDate: "Today",
      dueDateObj: new Date(),
      priority: "MUST DO",
      status: "pending",
      frequency: 2,
      locations: ["Baño"],
      importance: "Not Urgent",
      severity: "Disaster",
      area: "Baño",
      score: 15,
      urgent: false,
    },
    {
      id: "12",
      name: "Limpiar Ducha",
      assignee: {
        name: "Sebastian Mall",
        avatar: "/contemplative-man.png",
        initials: "JV",
      },
      dueDate: "Today",
      dueDateObj: new Date(),
      priority: "IMPORTANT",
      status: "pending",
      frequency: 4,
      locations: ["Baño"],
      importance: "Not Urgent",
      severity: "Consequence",
      area: "Baño",
      score: 11,
      urgent: false,
    },
    {
      id: "13",
      name: "Limpiar Secarropa",
      assignee: {
        name: "John Doe",
        avatar: "/thoughtful-bearded-man.png",
        initials: "JD",
      },
      dueDate: "Tomorrow",
      dueDateObj: new Date(Date.now() + 86400000),
      priority: "DO IT CALMLY",
      status: "pending",
      frequency: 7,
      locations: ["Baño"],
      importance: "Not Urgent",
      severity: "Annoyance",
      area: "Baño",
      score: 7,
      urgent: false,
    },
    {
      id: "14",
      name: "Limpiar Lavarropa",
      assignee: {
        name: "Mark Smith",
        avatar: "/contemplative-artist.png",
        initials: "JM",
      },
      dueDate: "Tomorrow",
      dueDateObj: new Date(Date.now() + 86400000),
      priority: "DO IT CALMLY",
      status: "pending",
      frequency: 7,
      locations: ["Baño"],
      importance: "Not Urgent",
      severity: "Annoyance",
      area: "Baño",
      score: 7,
      urgent: false,
    },
  ])

  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const toggleChoreStatus = (id: string) => {
    setChores(
      chores.map((chore) =>
        chore.id === id ? { ...chore, status: chore.status === "completed" ? "pending" : "completed" } : chore,
      ),
    )
  }

  const handleAddChore = (newChore: Chore) => {
    setChores([...chores, newChore])
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-500"
      case "pending":
        return "bg-yellow-500/10 text-yellow-500"
      case "overdue":
        return "bg-red-500/10 text-red-500"
      default:
        return "bg-slate-500/10 text-slate-500"
    }
  }

  const sortChores = (chores: Chore[], column: string | null, direction: "asc" | "desc") => {
    if (!column) return chores

    return [...chores].sort((a, b) => {
      let valueA: any
      let valueB: any

      // Extract the values to compare based on the column
      switch (column) {
        case "name":
          valueA = a.name
          valueB = b.name
          break
        case "area":
          valueA = a.area
          valueB = b.area
          break
        case "priority":
          valueA = a.priority
          valueB = b.priority
          break
        case "dueDate":
          valueA = a.dueDateObj ? a.dueDateObj.getTime() : 0
          valueB = b.dueDateObj ? b.dueDateObj.getTime() : 0
          break
        case "frequency":
          valueA = a.frequency || 0
          valueB = b.frequency || 0
          break
        case "score":
          valueA = a.score || 0
          valueB = b.score || 0
          break
        case "assignee":
          valueA = a.assignee.name
          valueB = b.assignee.name
          break
        case "status":
          valueA = a.status
          valueB = b.status
          break
        default:
          return 0
      }

      // Compare the values
      if (valueA < valueB) {
        return direction === "asc" ? -1 : 1
      }
      if (valueA > valueB) {
        return direction === "asc" ? 1 : -1
      }
      return 0
    })
  }

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      // Toggle direction if clicking the same column
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      // Set new column and default to ascending
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const renderSortIndicator = (column: string) => {
    if (sortColumn !== column) {
      return <ArrowUpDown className="ml-1 h-4 w-4 opacity-50" />
    }
    return sortDirection === "asc" ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Chores</CardTitle>
            <CardDescription>Manage and track all household chores</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Status</DropdownMenuItem>
                <DropdownMenuItem>Priority</DropdownMenuItem>
                <DropdownMenuItem>Assignee</DropdownMenuItem>
                <DropdownMenuItem>Due Date</DropdownMenuItem>
                <DropdownMenuItem>Area</DropdownMenuItem>
                <DropdownMenuItem>Frequency</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <AddChoreDialog onAddChore={handleAddChore} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="grid grid-cols-10 border-b px-4 py-3 font-medium">
            <div
              className="col-span-2 flex items-center cursor-pointer hover:text-primary transition-colors"
              onClick={() => handleSort("name")}
            >
              Task {renderSortIndicator("name")}
            </div>
            <div
              className="col-span-1 flex items-center cursor-pointer hover:text-primary transition-colors"
              onClick={() => handleSort("area")}
            >
              Area {renderSortIndicator("area")}
            </div>
            <div
              className="col-span-2 flex items-center cursor-pointer hover:text-primary transition-colors"
              onClick={() => handleSort("priority")}
            >
              Priority {renderSortIndicator("priority")}
            </div>
            <div
              className="col-span-1 flex items-center cursor-pointer hover:text-primary transition-colors"
              onClick={() => handleSort("frequency")}
            >
              Frequency {renderSortIndicator("frequency")}
            </div>
            <div
              className="col-span-1 flex items-center cursor-pointer hover:text-primary transition-colors"
              onClick={() => handleSort("score")}
            >
              Score {renderSortIndicator("score")}
            </div>
            <div
              className="col-span-1 flex items-center cursor-pointer hover:text-primary transition-colors"
              onClick={() => handleSort("dueDate")}
            >
              Due Date {renderSortIndicator("dueDate")}
            </div>
            <div
              className="col-span-1 flex items-center cursor-pointer hover:text-primary transition-colors"
              onClick={() => handleSort("assignee")}
            >
              Assignee {renderSortIndicator("assignee")}
            </div>
            <div
              className="col-span-1 flex items-center cursor-pointer hover:text-primary transition-colors"
              onClick={() => handleSort("status")}
            >
              Status {renderSortIndicator("status")}
            </div>
          </div>
          <div className="divide-y">
            {sortChores(chores, sortColumn, sortDirection).map((chore) => (
              <div key={chore.id} className="grid grid-cols-10 items-center px-4 py-3">
                <div className="col-span-2 flex items-center gap-2">
                  <Checkbox
                    id={`chore-${chore.id}`}
                    checked={chore.status === "completed"}
                    onCheckedChange={() => toggleChoreStatus(chore.id)}
                  />
                  <label
                    htmlFor={`chore-${chore.id}`}
                    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                      chore.status === "completed" ? "line-through text-muted-foreground" : ""
                    }`}
                  >
                    {chore.name}
                  </label>
                </div>
                <div className="col-span-1 text-xs">
                  <Badge variant="outline" className="bg-slate-500/10 text-slate-500">
                    {chore.area}
                  </Badge>
                </div>
                <div className="col-span-2">
                  <Badge variant="outline" className={`${getPriorityColor(chore.priority)}`}>
                    {chore.priority}
                  </Badge>
                </div>
                <div className="col-span-1">
                  <Badge className={`${getFrequencyColor(chore.frequency)}`}>
                    {getFrequencyLabel(chore.frequency)} ({chore.frequency})
                  </Badge>
                </div>
                <div className="col-span-1 text-sm font-semibold">
                  <span className={getScoreColor(chore.score || 0)}>{chore.score}</span>
                </div>
                <div className="col-span-1 text-sm">{chore.dueDate}</div>
                <div className="col-span-1">
                  <div className="flex items-center gap-1">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={chore.assignee.avatar || "/placeholder.svg"} alt={chore.assignee.name} />
                      <AvatarFallback>{chore.assignee.initials}</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
                <div className="col-span-1">
                  <Badge className={`${getStatusColor(chore.status)}`}>
                    {chore.status.charAt(0).toUpperCase() + chore.status.slice(1)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
