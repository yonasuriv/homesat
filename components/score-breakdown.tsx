"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "@/components/ui/chart"

export function ScoreBreakdown() {
  // Update the severity score data to match the table
  const severityScoreData = [
    { name: "Disaster", value: 10 },
    { name: "Consequence", value: 7.5 },
    { name: "Annoyance", value: 5 },
    { name: "No real problem", value: 2.5 },
  ]

  // Update the importance score data to match the table
  const importanceScoreData = [
    { name: "Urgent", multiplier: 3 },
    { name: "Not Urgent", multiplier: 1.5 },
  ]

  // Update the priority order data to match the table
  const priorityOrderData = [
    { name: "Disaster + Urgent (DO IT NOW)", order: 1 },
    { name: "Disaster + Not Urgent (MUST DO)", order: 2 },
    { name: "Consequence + Urgent (SHOULD DO)", order: 3 },
    { name: "Consequence + Not Urgent (IMPORTANT)", order: 4 },
    { name: "Annoyance + Urgent (DO)", order: 5 },
    { name: "Annoyance + Not Urgent (DO IT CALMLY)", order: 6 },
    { name: "No real problem + Urgent (NICE)", order: 7 },
    { name: "No real problem + Not Urgent (OPTIONAL)", order: 8 },
  ]

  // Update the penalty/bonus data to match the table
  const penaltyBonusData = [
    { name: "On-time (10% bonus)", value: 10 },
    { name: "1 day late (0% penalty)", value: 0 },
    { name: "2-3 days late (25% task, 5% overall)", value: -30 },
    { name: "4-7 days late (50% task, 10% overall)", value: -60 },
    { name: ">7 days late (75% task, 20% overall)", value: -95 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Score Breakdown</CardTitle>
        <CardDescription>Analysis of the scoring system components</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="severity">
          <TabsList className="mb-4">
            <TabsTrigger value="severity">Severity Scores</TabsTrigger>
            <TabsTrigger value="importance">Importance Multipliers</TabsTrigger>
            <TabsTrigger value="priority">Priority Order</TabsTrigger>
            <TabsTrigger value="penalties">Penalties & Bonuses</TabsTrigger>
          </TabsList>
          <TabsContent value="severity">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={severityScoreData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Severity Score" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="importance">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={importanceScoreData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="multiplier" name="Multiplier" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="priority">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={priorityOrderData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="order" name="Priority Order" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="penalties">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={penaltyBonusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="value"
                  name="Percentage Adjustment"
                  fill={({ value }) => (value >= 0 ? "#82ca9d" : "#ff8042")}
                />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
