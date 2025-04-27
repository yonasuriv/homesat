"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { seedDatabase } from "@/lib/actions/seed-data"
import { toast } from "@/components/ui/use-toast"

export function SeedDatabaseButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSeed = async () => {
    setIsLoading(true)
    try {
      await seedDatabase()
      toast({
        title: "Database seeded successfully",
        description: "Initial data has been added to the database.",
      })
    } catch (error) {
      console.error("Error seeding database:", error)
      toast({
        title: "Error seeding database",
        description: "An error occurred while seeding the database.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleSeed} disabled={isLoading} variant="outline">
      {isLoading ? "Seeding..." : "Seed Database"}
    </Button>
  )
}
