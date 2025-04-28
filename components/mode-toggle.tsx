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

  return (
    <div className="flex items-center gap-2">
      <Sun className="h-4 w-4 text-yellow-500" />
      <Switch
        id="dark-mode"
        checked={theme === "dark"}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        className="scale-75"
      />
      <Moon className="h-4 w-4 text-blue-400" />
      <Label htmlFor="dark-mode" className="sr-only">
        Dark Mode
      </Label>
    </div>
  )
}
