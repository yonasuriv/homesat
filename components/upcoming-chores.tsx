import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock } from "lucide-react"

interface UpcomingChoresProps {
  className?: string
}

export function UpcomingChores({ className }: UpcomingChoresProps) {
  const chores = [
    {
      id: "1",
      name: "Clean Kitchen",
      dueDate: "Today",
      dueTime: "5:00 PM",
      assignee: {
        name: "Sarah",
        avatar: "/contemplative-artist.png",
        initials: "SD",
      },
      area: "Kitchen",
      points: 15,
    },
    {
      id: "2",
      name: "Vacuum Living Room",
      dueDate: "Today",
      dueTime: "7:00 PM",
      assignee: {
        name: "Mike",
        avatar: "/contemplative-man.png",
        initials: "MD",
      },
      area: "Living Room",
      points: 10,
    },
    {
      id: "3",
      name: "Take Out Trash",
      dueDate: "Today",
      dueTime: "8:00 PM",
      assignee: {
        name: "John",
        avatar: "/thoughtful-bearded-man.png",
        initials: "JD",
      },
      area: "Kitchen",
      points: 5,
    },
    {
      id: "4",
      name: "Clean Bathroom",
      dueDate: "Tomorrow",
      dueTime: "10:00 AM",
      assignee: {
        name: "Emma",
        avatar: "/sunlit-blonde.png",
        initials: "ED",
      },
      area: "Bathroom",
      points: 20,
    },
    {
      id: "5",
      name: "Mow the Lawn",
      dueDate: "Tomorrow",
      dueTime: "2:00 PM",
      assignee: {
        name: "John",
        avatar: "/thoughtful-bearded-man.png",
        initials: "JD",
      },
      area: "Garden",
      points: 25,
    },
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Upcoming Chores</CardTitle>
        <CardDescription>Chores due soon</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {chores.map((chore) => (
            <div key={chore.id} className="flex items-start space-x-4 rounded-md border p-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={chore.assignee.avatar || "/placeholder.svg"} alt={chore.assignee.name} />
                <AvatarFallback>{chore.assignee.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none">{chore.name}</p>
                  <Badge variant="outline" className="bg-purple-500/10 text-purple-500">
                    {chore.points} pts
                  </Badge>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Badge variant="outline" className="mr-2 px-1 text-xs">
                    {chore.area}
                  </Badge>
                  <div className="flex items-center">
                    <CalendarDays className="mr-1 h-3 w-3" />
                    {chore.dueDate}
                  </div>
                  <div className="ml-2 flex items-center">
                    <Clock className="mr-1 h-3 w-3" />
                    {chore.dueTime}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
