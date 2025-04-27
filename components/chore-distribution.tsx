"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "@/components/ui/chart"

interface ChoreDistributionProps {
  className?: string
}

export function ChoreDistribution({ className }: ChoreDistributionProps) {
  const data = [
    {
      name: "Jonathan",
      completed: 8,
      pending: 2,
      overdue: 1,
    },
    {
      name: "Juan",
      completed: 10,
      pending: 3,
      overdue: 0,
    },
    {
      name: "Joaquin",
      completed: 6,
      pending: 4,
      overdue: 2,
    },
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Chore Distribution</CardTitle>
        <CardDescription>Breakdown of chores by family member</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="completed" name="Completed" fill="#10b981" />
            <Bar dataKey="pending" name="Pending" fill="#f59e0b" />
            <Bar dataKey="overdue" name="Overdue" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
