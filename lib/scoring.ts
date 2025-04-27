// Update the severity labels to match the table
export type SeverityLabel = "Disaster" | "Consequence" | "Annoyance" | "No real problem"
export type ImportanceLabel = "Urgent" | "Not Urgent"
export type PriorityLabel =
  | "DO IT NOW"
  | "MUST DO"
  | "SHOULD DO"
  | "IMPORTANT"
  | "DO"
  | "DO IT CALMLY"
  | "NICE"
  | "OPTIONAL"

// Update the severity score map with the exact values from the table
export const severityScoreMap: Record<SeverityLabel, number> = {
  Disaster: 10,
  Consequence: 7.5,
  Annoyance: 5,
  "No real problem": 2.5,
}

// Update the importance multipliers to match the table
export const importanceMultiplierMap: Record<ImportanceLabel, number> = {
  Urgent: 3,
  "Not Urgent": 1.5,
}

// Update the priority matrix with the correct order numbers and labels
export const priorityMatrix: Record<SeverityLabel, Record<ImportanceLabel, { order: number; label: PriorityLabel }>> = {
  Disaster: {
    Urgent: { order: 1, label: "DO IT NOW" },
    "Not Urgent": { order: 2, label: "MUST DO" },
  },
  Consequence: {
    Urgent: { order: 3, label: "SHOULD DO" },
    "Not Urgent": { order: 4, label: "IMPORTANT" },
  },
  Annoyance: {
    Urgent: { order: 5, label: "DO" },
    "Not Urgent": { order: 6, label: "DO IT CALMLY" },
  },
  "No real problem": {
    Urgent: { order: 7, label: "NICE" },
    "Not Urgent": { order: 8, label: "OPTIONAL" },
  },
}

// Update the penalty/bonus structure based on the table
export function calculateTaskScore(
  severityLabel: SeverityLabel,
  importanceLabel: ImportanceLabel,
  dueDate: Date,
  completedDate: Date,
) {
  const severityScore = severityScoreMap[severityLabel]
  const importanceMultiplier = importanceMultiplierMap[importanceLabel]

  const baseScore = severityScore * importanceMultiplier

  const overdueDays = Math.max(Math.floor((completedDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)), 0)

  let taskBonus = 0
  let taskPenalty = 0
  let globalReduction = 0

  // Apply the exact penalty/bonus values from the table
  if (overdueDays === 0) {
    taskBonus = 0.1 // 10% bonus for on-time
    globalReduction = 0
  } else if (overdueDays === 1) {
    taskBonus = 0
    taskPenalty = 0
    // Apply different global reductions based on severity
    if (severityLabel === "Disaster") {
      globalReduction = 0.025 // 2.5%
    } else if (severityLabel === "Consequence") {
      globalReduction = 0.02 // 2%
    } else if (severityLabel === "Annoyance") {
      globalReduction = 0.01 // 1%
    } else {
      globalReduction = 0
    }
  } else if (overdueDays >= 2 && overdueDays <= 3) {
    taskBonus = 0
    taskPenalty = 0.25 // 25% task penalty
    // Apply different global reductions based on severity
    if (severityLabel === "Disaster") {
      globalReduction = 0.05 // 5%
    } else if (severityLabel === "Consequence") {
      globalReduction = 0.04 // 4%
    } else if (severityLabel === "Annoyance") {
      globalReduction = 0.02 // 2%
    } else {
      globalReduction = 0
    }
  } else if (overdueDays >= 4 && overdueDays <= 7) {
    taskBonus = 0
    taskPenalty = 0.5 // 50% task penalty
    // Apply different global reductions based on severity
    if (severityLabel === "Disaster") {
      globalReduction = 0.1 // 10%
    } else if (severityLabel === "Consequence") {
      globalReduction = 0.08 // 8%
    } else if (severityLabel === "Annoyance") {
      globalReduction = 0.04 // 4%
    } else {
      globalReduction = 0
    }
  } else if (overdueDays > 7) {
    taskBonus = 0
    taskPenalty = 0.75 // 75% task penalty
    // Apply different global reductions based on severity
    if (severityLabel === "Disaster") {
      globalReduction = 0.2 // 20%
    } else if (severityLabel === "Consequence") {
      globalReduction = 0.12 // 12%
    } else if (severityLabel === "Annoyance") {
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

  return {
    severityLabel,
    importanceLabel,
    severityScore,
    importanceMultiplier,
    baseScore,
    overdueDays,
    taskBonus,
    bonusAmount,
    taskPenalty,
    penaltyAmount,
    globalReduction,
    globalReductionAmount,
    finalScore: Math.round(finalScore),
    priorityOrder: priorityMatrix[severityLabel][importanceLabel].order,
    priorityLabel: priorityMatrix[severityLabel][importanceLabel].label,
  }
}

export function getSeverityColor(severity: SeverityLabel): string {
  switch (severity) {
    case "Disaster":
      return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
    case "Consequence":
      return "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20"
    case "Annoyance":
      return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
    case "No real problem":
      return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
    default:
      return "bg-slate-500/10 text-slate-500 hover:bg-slate-500/20"
  }
}

export function getImportanceColor(importance: ImportanceLabel): string {
  switch (importance) {
    case "Urgent":
      return "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20"
    case "Not Urgent":
      return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
    default:
      return "bg-slate-500/10 text-slate-500 hover:bg-slate-500/20"
  }
}

export function getPriorityColor(priority: PriorityLabel): string {
  switch (priority) {
    case "DO IT NOW":
      return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
    case "MUST DO":
      return "bg-red-300/10 text-red-300 hover:bg-red-300/20"
    case "SHOULD DO":
      return "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20"
    case "IMPORTANT":
      return "bg-orange-300/10 text-orange-300 hover:bg-orange-300/20"
    case "DO":
      return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
    case "DO IT CALMLY":
      return "bg-yellow-300/10 text-yellow-300 hover:bg-yellow-300/20"
    case "NICE":
      return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
    case "OPTIONAL":
      return "bg-green-300/10 text-green-300 hover:bg-green-300/20"
    default:
      return "bg-slate-500/10 text-slate-500 hover:bg-slate-500/20"
  }
}

export function getScoreColor(score: number): string {
  if (score >= 25) {
    return "text-red-500"
  } else if (score >= 20) {
    return "text-orange-500"
  } else if (score >= 15) {
    return "text-yellow-500"
  } else if (score >= 10) {
    return "text-green-500"
  } else {
    return "text-blue-500"
  }
}

export function getFrequencyLabel(frequency: number): string {
  if (frequency <= 3) {
    return "Daily"
  } else if (frequency <= 7) {
    return "Weekly"
  } else if (frequency <= 14) {
    return "Biweekly"
  } else {
    return "Monthly"
  }
}

export function getFrequencyColor(frequency: number): string {
  if (frequency <= 3) {
    return "bg-red-500/10 text-red-500"
  } else if (frequency <= 7) {
    return "bg-orange-500/10 text-orange-500"
  } else if (frequency <= 14) {
    return "bg-yellow-500/10 text-yellow-500"
  } else {
    return "bg-green-500/10 text-green-500"
  }
}
