"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { seedDatabase } from "@/lib/actions/seed-data"
import { useAdmin } from "@/hooks/use-admin"

export function SeedDatabaseButton() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const { isAdmin, isLoading: isCheckingAdmin } = useAdmin()

  async function handleClick() {
    try {
      setIsLoading(true)
      await seedDatabase()
      toast({
        title: "Success",
        description: "Database seeded successfully!",
      })
    } catch (error) {
      console.error("Error seeding database:", error)
      toast({
        title: "Error",
        description: "Failed to seed database. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Only render the button if the user is an admin
  if (isCheckingAdmin || !isAdmin) {
    return null
  }

  return (
    <Button variant="outline" size="sm" onClick={handleClick} disabled={isLoading}>
      {isLoading ? (
        <>
          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          Seeding...
        </>
      ) : (
        "Seed Database"
      )}
    </Button>
  )
}
