import { format, formatDistanceToNow, isToday, isTomorrow, isYesterday } from "date-fns"

export function formatDueDate(date: Date | string | null): string {
  if (!date) return "No due date"

  const dueDate = typeof date === "string" ? new Date(date) : date

  if (isToday(dueDate)) {
    return "Today"
  } else if (isTomorrow(dueDate)) {
    return "Tomorrow"
  } else if (isYesterday(dueDate)) {
    return "Yesterday"
  } else {
    return format(dueDate, "MMM d")
  }
}

export function formatDueTime(date: Date | string | null): string {
  if (!date) return ""

  const dueDate = typeof date === "string" ? new Date(date) : date
  return format(dueDate, "h:mm a")
}

export function formatRelativeTime(date: Date | string | null): string {
  if (!date) return ""

  const dueDate = typeof date === "string" ? new Date(date) : date
  return formatDistanceToNow(dueDate, { addSuffix: true })
}
