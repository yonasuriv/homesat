import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Star, TrendingUp } from "lucide-react"

export function ScoreCard({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Family Score</CardTitle>
        <Trophy className="h-4 w-4 text-yellow-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">1,250</div>
        <div className="mt-2 flex items-center text-xs text-muted-foreground">
          <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
          <span className="text-green-500">+125</span>
          <span className="ml-1">this week</span>
        </div>
        <div className="mt-3 flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="h-4 w-4 text-yellow-500" fill={star <= 4 ? "currentColor" : "none"} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
