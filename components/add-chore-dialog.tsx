"use client"

import { DialogFooter } from "@/components/ui/dialog"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { SeverityLabel, ImportanceLabel } from "@/lib/scoring"
import { priorityMatrix } from "@/lib/scoring"

export function AddChoreDialog({ onAddChore }: { onAddChore: (chore: any) => void }) {
  const [open, setOpen] = useState(false)
  const [choreName, setChoreName] = useState("")
  const [area, setArea] = useState("")
  const [importance, setImportance] = useState<ImportanceLabel>("Not Urgent")
  const [severity, setSeverity] = useState<SeverityLabel>("CONSEQUENCE")
  const [frequency, setFrequency] = useState(7)
  const [assignee, setAssignee] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const priority = priorityMatrix[severity][importance].label

    const assigneeData = {
      name: assignee || "Unassigned",
      avatar:
        assignee === "John Doe"
          ? "/thoughtful-bearded-man.png"
          : assignee === "Mark Smith"
            ? "/contemplative-artist.png"
            : assignee === "Sebastian Mall"
              ? "/contemplative-man.png"
              : "",
      initials: assignee
        ? assignee
            .split(" ")
            .map((n) => n[0])
            .join("")
        : "UN",
    }

    const newChore = {
      id: Date.now().toString(),
      name: choreName,
      area: area,
      importance: importance,
      severity: severity,
      frequency: Number(frequency),
      locations: [area],
      assignee: assigneeData,
      dueDate: "Tomorrow",
      priority: priority,
      status: "pending",
      score: severity === "DISASTER" ? 15 : severity === "CONSEQUENCE" ? 11 : severity === "ANOYANCE" ? 7 : 4,
      urgent: importance === "Urgent",
    }

    onAddChore(newChore)
    setOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setChoreName("")
    setArea("")
    setImportance("Not Urgent")
    setSeverity("CONSEQUENCE")
    setFrequency(7)
    setAssignee("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Chore
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Chore</DialogTitle>
            <DialogDescription>Create a new chore with the required details.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Task Name
              </Label>
              <Input
                id="name"
                value={choreName}
                onChange={(e) => setChoreName(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="area" className="text-right">
                Area
              </Label>
              <Select value={area} onValueChange={setArea} required>
                <SelectTrigger id="area" className="col-span-3">
                  <SelectValue placeholder="Select area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Living">Living</SelectItem>
                  <SelectItem value="Cocina">Cocina</SelectItem>
                  <SelectItem value="Baño">Baño</SelectItem>
                  <SelectItem value="Terraza">Terraza</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="importance" className="text-right">
                Importance
              </Label>
              <Select value={importance} onValueChange={(value) => setImportance(value as ImportanceLabel)} required>
                <SelectTrigger id="importance" className="col-span-3">
                  <SelectValue placeholder="Select importance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Urgent">Urgent</SelectItem>
                  <SelectItem value="Not Urgent">Not Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="severity" className="text-right">
                Severity if skipped
              </Label>
              <Select value={severity} onValueChange={(value) => setSeverity(value as SeverityLabel)} required>
                <SelectTrigger id="severity" className="col-span-3">
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Disaster">Disaster</SelectItem>
                  <SelectItem value="Consequence">Consequence</SelectItem>
                  <SelectItem value="Annoyance">Annoyance</SelectItem>
                  <SelectItem value="No real problem">No real problem</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="frequency" className="text-right">
                Frequency (days)
              </Label>
              <Input
                id="frequency"
                type="number"
                min="1"
                max="30"
                value={frequency}
                onChange={(e) => setFrequency(Number(e.target.value))}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="assignee" className="text-right">
                Assignee
              </Label>
              <Select value={assignee} onValueChange={setAssignee}>
                <SelectTrigger id="assignee" className="col-span-3">
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="John Doe">John Doe</SelectItem>
                  <SelectItem value="Mark Smith">Mark Smith</SelectItem>
                  <SelectItem value="Sebastian Mall">Sebastian Mall</SelectItem>
                  <SelectItem value="Unassigned">Unassigned</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Chore</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
