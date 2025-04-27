export type FamilyMember = {
  id: string
  name: string
  avatar: string | null
  initials: string | null
  role: string
  created_at: string
  updated_at: string
}

export type Area = {
  id: string
  name: string
  created_at: string
  updated_at: string
}

export type SeverityLevel = {
  id: string
  label: string
  score: number
  created_at: string
}

export type ImportanceLevel = {
  id: string
  label: string
  multiplier: number
  created_at: string
}

export type Chore = {
  id: string
  name: string
  assignee_id: string | null
  area_id: string
  severity_id: string
  importance_id: string
  frequency: number
  due_date: string | null
  status: "pending" | "completed" | "overdue"
  completed_date: string | null
  score: number | null
  created_at: string
  updated_at: string
}

export type ActivityLog = {
  id: string
  family_member_id: string
  chore_id: string
  action: string
  created_at: string
}

export type Achievement = {
  id: string
  name: string
  description: string | null
  icon: string | null
  created_at: string
}

export type MemberAchievement = {
  id: string
  family_member_id: string
  achievement_id: string
  earned_at: string
  created_at: string
}
