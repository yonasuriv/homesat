"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Database, RefreshCw, Trash } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { seedDatabase } from "@/lib/actions/seed-data"

export function DatabaseManagement() {
  const [isSeedingDatabase, setIsSeedingDatabase] = useState(false)
  const { toast } = useToast()

  async function handleSeedDatabase() {
    try {
      setIsSeedingDatabase(true)
      await seedDatabase()
      toast({
        title: "Database seeded",
        description: "The database has been successfully seeded with initial data.",
      })
    } catch (error) {
      console.error("Error seeding database:", error)
      toast({
        title: "Error seeding database",
        description: "There was a problem seeding the database.",
        variant: "destructive",
      })
    } finally {
      setIsSeedingDatabase(false)
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Seed Database
          </CardTitle>
          <CardDescription>Populate the database with initial data</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            This will add sample data to your database including severity levels, importance levels, family members, and
            areas. Existing data with the same IDs will be updated.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSeedDatabase} disabled={isSeedingDatabase} className="w-full">
            {isSeedingDatabase ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Seeding Database...
              </>
            ) : (
              "Seed Database"
            )}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Trash className="h-5 w-5" />
            Reset Database
          </CardTitle>
          <CardDescription>Clear all data from the database</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            This will delete all data from your database including users, chores, areas, and all other data. This action
            cannot be undone.
          </p>
        </CardContent>
        <CardFooter>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full">
                Reset Database
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete all data from your database and remove all
                  records.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Reset Database</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </div>
  )
}
