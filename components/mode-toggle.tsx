"use client"

import { useTheme } from "next-themes"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = theme === "dark"

  return (
    <div className="flex items-center space-x-2">
      <Sun className={`h-4 w-4 ${!isDark ? "text-yellow-500" : "text-muted-foreground"}`} />
      <Switch id="dark-mode" checked={isDark} onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")} />
      <Moon className={`h-4 w-4 ${isDark ? "text-blue-400" : "text-muted-foreground"}`} />
      <Label htmlFor="dark-mode" className="sr-only">
        Dark Mode
      </Label>
    </div>
  )
}
