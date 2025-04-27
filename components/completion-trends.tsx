"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "@/components/ui/chart"

export function CompletionTrends() {
  const weeklyData = [
    { name: "Mon", completed: 8, pending: 2 },
    { name: "Tue", completed: 10, pending: 3 },
    { name: "Wed", completed: 7, pending: 5 },
    { name: "Thu", completed: 12, pending: 1 },
    { name: "Fri", completed: 9, pending: 4 },
    { name: "Sat", completed: 15, pending: 2 },
    { name: "Sun", completed: 6, pending: 8 },
  ]

  const monthlyData = [
    { name: "Week 1", completed: 42, pending: 15 },
    { name: "Week 2", completed: 38, pending: 18 },
    { name: "Week 3", completed: 45, pending: 12 },
    { name: "Week 4", completed: 40, pending: 14 },
  ]

  const pieData = [
    { name: "Kitchen", value: 25 },
    { name: "Living Room", value: 15 },
    { name: "Bathroom", value: 20 },
    { name: "Bedroom", value: 18 },
    { name: "Garden", value: 12 },
    { name: "Other", value: 10 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

  const familyData = [
    { name: "John", completed: 28, score: 350 },
    { name: "Sarah", completed: 32, score: 420 },
    { name: "Mike", completed: 24, score: 280 },
    { name: "Emma", completed: 30, score: 380 },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Completion Trends</CardTitle>
          <CardDescription>Chore completion over time</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="weekly">
            <TabsList className="mb-4">
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
            <TabsContent value="weekly">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="pending" stroke="#f59e0b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="monthly">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="pending" stroke="#f59e0b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Chores by Area</CardTitle>
          <CardDescription>Distribution of chores across house areas</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Family Performance</CardTitle>
          <CardDescription>Chores completed and points earned</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={familyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#10b981" />
              <YAxis yAxisId="right" orientation="right" stroke="#8884d8" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="completed" name="Chores Completed" fill="#10b981" />
              <Bar yAxisId="right" dataKey="score" name="Points Earned" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
