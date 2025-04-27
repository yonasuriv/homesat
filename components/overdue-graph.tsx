"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "@/components/ui/chart"

export function OverdueGraph() {
  const overdueData = [
    { date: "Jan", count: 5, severity: 35 },
    { date: "Feb", count: 7, severity: 48 },
    { date: "Mar", count: 3, severity: 22 },
    { date: "Apr", count: 6, severity: 42 },
    { date: "May", count: 4, severity: 30 },
    { date: "Jun", count: 2, severity: 15 },
    { date: "Jul", count: 8, severity: 60 },
    { date: "Aug", count: 5, severity: 38 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Overdue Tasks Trend</CardTitle>
        <CardDescription>Number and severity of overdue tasks over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={overdueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" orientation="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="count"
              name="Number of Overdue Tasks"
              stroke="#ef4444"
              strokeWidth={2}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="severity"
              name="Severity Score"
              stroke="#f97316"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
