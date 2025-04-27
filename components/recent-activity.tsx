import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentActivity({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest chore updates from family members</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/contemplative-artist.png" alt="Sarah" />
              <AvatarFallback>SD</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">Sarah completed Vacuum Living Room</p>
              <p className="text-sm text-muted-foreground">Today at 10:30 AM</p>
            </div>
          </div>
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/contemplative-man.png" alt="Mike" />
              <AvatarFallback>MD</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">Mike completed Take Out Trash</p>
              <p className="text-sm text-muted-foreground">Today at 9:15 AM</p>
            </div>
          </div>
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/sunlit-blonde.png" alt="Emma" />
              <AvatarFallback>ED</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">Emma added Clean Bathroom to schedule</p>
              <p className="text-sm text-muted-foreground">Yesterday at 4:45 PM</p>
            </div>
          </div>
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/thoughtful-bearded-man.png" alt="John" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">John completed Mow the Lawn</p>
              <p className="text-sm text-muted-foreground">Yesterday at 2:30 PM</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
