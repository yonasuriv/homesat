"use server"

import { createServerSupabaseClient } from "../supabase/server"
import type { SeverityLevel, ImportanceLevel } from "../types/database"

export async function getSeverityLevels() {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("severity_levels").select("*").order("score", { ascending: false })

  if (error) {
    console.error("Error fetching severity levels:", error)
    return []
  }

  return data as SeverityLevel[]
}

export async function getImportanceLevels() {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("importance_levels").select("*").order("multiplier", { ascending: false })

  if (error) {
    console.error("Error fetching importance levels:", error)
    return []
  }

  return data as ImportanceLevel[]
}

export async function calculateChoreScore(
  severityId: string,
  importanceId: string,
  dueDate: Date,
  completedDate: Date,
) {
  const supabase = createServerSupabaseClient()

  // Get severity and importance values
  const { data: severityData } = await supabase.from("severity_levels").select("score").eq("id", severityId).single()

  const { data: importanceData } = await supabase
    .from("importance_levels")
    .select("multiplier")
    .eq("id", importanceId)
    .single()

  if (!severityData || !importanceData) {
    return 0
  }

  const severityScore = severityData.score
  const importanceMultiplier = importanceData.multiplier

  const baseScore = severityScore * importanceMultiplier

  // Calculate overdue days
  const overdueDays = Math.max(Math.floor((completedDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)), 0)

  let taskBonus = 0
  let taskPenalty = 0
  let globalReduction = 0

  // Apply the exact penalty/bonus values from the table
  if (overdueDays === 0) {
    taskBonus = 0.1 // 10% bonus for on-time
  } else if (overdueDays === 1) {
    // Apply different global reductions based on severity
    if (severityScore === 10) {
      // Disaster
      globalReduction = 0.025 // 2.5%
    } else if (severityScore === 7.5) {
      // Consequence
      globalReduction = 0.02 // 2%
    } else if (severityScore === 5) {
      // Annoyance
      globalReduction = 0.01 // 1%
    }
  } else if (overdueDays >= 2 && overdueDays <= 3) {
    taskPenalty = 0.25 // 25% task penalty
    // Apply different global reductions based on severity
    if (severityScore === 10) {
      // Disaster
      globalReduction = 0.05 // 5%
    } else if (severityScore === 7.5) {
      // Consequence
      globalReduction = 0.04 // 4%
    } else if (severityScore === 5) {
      // Annoyance
      globalReduction = 0.02 // 2%
    }
  } else if (overdueDays >= 4 && overdueDays <= 7) {
    taskPenalty = 0.5 // 50% task penalty
    // Apply different global reductions based on severity
    if (severityScore === 10) {
      // Disaster
      globalReduction = 0.1 // 10%
    } else if (severityScore === 7.5) {
      // Consequence
      globalReduction = 0.08 // 8%
    } else if (severityScore === 5) {
      // Annoyance
      globalReduction = 0.04 // 4%
    }
  } else if (overdueDays > 7) {
    taskPenalty = 0.75 // 75% task penalty
    // Apply different global reductions based on severity
    if (severityScore === 10) {
      // Disaster
      globalReduction = 0.2 // 20%
    } else if (severityScore === 7.5) {
      // Consequence
      globalReduction = 0.12 // 12%
    } else if (severityScore === 5) {
      // Annoyance
      globalReduction = 0.06 // 6%
    } else {
      globalReduction = 0.01 // 1%
    }
  }

  const bonusAmount = baseScore * taskBonus
  const penaltyAmount = baseScore * taskPenalty
  const globalReductionAmount = baseScore * globalReduction

  // Apply global reduction first, then apply penalty/bonus
  const scoreAfterGlobalReduction = baseScore - globalReductionAmount
  const finalScore = Math.max(scoreAfterGlobalReduction + bonusAmount - penaltyAmount, 0)

  return Math.round(finalScore)
}
