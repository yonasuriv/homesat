import type { ImportanceLabel, SeverityLabel, PriorityLabel } from "./scoring"

export interface Chore {
  id: string
  name: string
  assignee: {
    name: string
    avatar: string
    initials: string
  }
  dueDate: string
  dueDateObj?: Date
  completedDate?: Date
  priority: PriorityLabel
  status: "completed" | "pending" | "overdue"
  frequency: number
  locations: string[]
  importance: ImportanceLabel
  severity: SeverityLabel
  area: string
  score?: number
  urgent?: boolean
}

export interface FamilyMember {
  id: string
  name: string
  avatar: string
  initials: string
  role: string
  completedChores: number
  totalChores: number
  streak: number
  score: number
}

export interface HouseArea {
  id: string
  name: string
  totalChores: number
  completedChores: number
  assignedTo: string[]
  priority: PriorityLabel
  lastCleaned: string
  score?: number
}
