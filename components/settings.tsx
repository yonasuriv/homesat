"use client"

import { AppSidebar } from "@/components/sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"

export function Settings() {
return (
<SidebarProvider>
  <AppSidebar />
  <SidebarInset>
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
      <div className="flex flex-1 items-center justify-between">
        <h1 className="text-xl font-semibold">Settings</h1>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
    <main className="flex-1 p-6">
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="account">Account & Email</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="scoring">Scoring System</TabsTrigger>
          <TabsTrigger value="family">Family Members</TabsTrigger>
          <TabsTrigger value="areas">House Areas</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your household preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="household-name">Household Name</Label>
                <Input id="household-name" defaultValue="Doe Family" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="america-new_york">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="america-new_york">America/New York</SelectItem>
                    <SelectItem value="america-chicago">America/Chicago</SelectItem>
                    <SelectItem value="america-denver">America/Denver</SelectItem>
                    <SelectItem value="america-los_angeles">America/Los Angeles</SelectItem>
                    <SelectItem value="europe-london">Europe/London</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="week-start">Week Starts On</Label>
                  <Select defaultValue="sunday">
                    <SelectTrigger id="week-start" className="w-[180px]">
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sunday">Sunday</SelectItem>
                      <SelectItem value="monday">Monday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically switch between light and dark themes
                  </p>
                </div>
                <Switch id="dark-mode" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account & Email Settings</CardTitle>
              <CardDescription>Manage your account and email preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Primary Email</Label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" />
                <p className="text-xs text-muted-foreground">
                  This email is used for notifications and account recovery
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="backup-email">Backup Email (Optional)</Label>
                <Input id="backup-email" type="email" placeholder="Enter backup email" />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value="••••••••" />
              </div>
              <Button variant="outline">Change Password</Button>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="email-signature">Email Signature</Label>
                <Textarea id="email-signature" placeholder="Add a signature for chore notifications"
                  defaultValue="- Sent from HomeTask Chore Manager" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Preferences</Label>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="marketing-emails" defaultChecked />
                    <Label htmlFor="marketing-emails">Receive product updates and tips</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="weekly-digest" defaultChecked />
                    <Label htmlFor="weekly-digest">Weekly chore summary digest</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="achievement-emails" defaultChecked />
                    <Label htmlFor="achievement-emails">Achievement notifications</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Separator />
              <div className="space-y-2">
                <Label>Notification Method</Label>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="email-notifications" />
                    <Label htmlFor="email-notifications">Email</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="push-notifications" defaultChecked />
                    <Label htmlFor="push-notifications">Push</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="sms-notifications" />
                    <Label htmlFor="sms-notifications">SMS</Label>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Chore Reminders</Label>
                  <p className="text-sm text-muted-foreground">Receive reminders for upcoming chores</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Overdue Alerts</Label>
                  <p className="text-sm text-muted-foreground">Get alerts for overdue chores</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Completion Notifications</Label>
                  <p className="text-sm text-muted-foreground">Notify when family members complete chores</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Weekly Summary</Label>
                  <p className="text-sm text-muted-foreground">Receive weekly summary of chore completion</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="scoring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scoring System</CardTitle>
              <CardDescription>Configure how points are awarded for chores</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Severity Score Weights</Label>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="disaster-score">Disaster</Label>
                    <Input id="disaster-score" type="number" defaultValue="10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="consequence-score">Consequence</Label>
                    <Input id="consequence-score" type="number" defaultValue="7.5" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="annoyance-score">Annoyance</Label>
                    <Input id="annoyance-score" type="number" defaultValue="5" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="no-problem-score">No real problem</Label>
                    <Input id="no-problem-score" type="number" defaultValue="2.5" />
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Importance Multipliers</Label>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="urgent-score">Urgent</Label>
                    <Input id="urgent-score" type="number" defaultValue="3" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="not-urgent-score">Not Urgent</Label>
                    <Input id="not-urgent-score" type="number" defaultValue="1.5" />
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Time-Based Bonuses and Penalties</Label>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="on-time-bonus">On-time completion bonus</Label>
                      <div className="w-[180px]">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">15%</span>
                          <Input id="on-time-bonus" type="number" defaultValue="15" className="w-16" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Late penalties</Label>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">1 day late</span>
                        <div className="w-[180px]">
                          <Slider defaultValue={[0]} max={100} step={1} />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">2-3 days late</span>
                        <div className="w-[180px]">
                          <Slider defaultValue={[25]} max={100} step={1} />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">4-7 days late</span>
                        <div className="w-[180px]">
                          <Slider defaultValue={[50]} max={100} step={1} />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">7+ days late</span>
                        <div className="w-[180px]">
                          <Slider defaultValue={[75]} max={100} step={1} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Rewards System</Label>
                  <p className="text-sm text-muted-foreground">Allow points to be redeemed for rewards</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="family" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Family Member Settings</CardTitle>
              <CardDescription>Manage family members and permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border">
                <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                  <div className="col-span-3">Name</div>
                  <div className="col-span-2">Role</div>
                  <div className="col-span-2">Permissions</div>
                  <div className="col-span-3">Task Preferences</div>
                  <div className="col-span-2">Actions</div>
                </div>
                <div className="divide-y">
                  {[
                  {
                  name: "John Doe",
                  role: "Roommate",
                  permissions: "Admin",
                  preferences: "Kitchen, Garden",
                  },
                  {
                  name: "Mark Smith",
                  role: "Roommate",
                  permissions: "Admin",
                  preferences: "Living Room, Bedroom",
                  },
                  {
                  name: "Sebastian Mall",
                  role: "Roommate",
                  permissions: "Member",
                  preferences: "Garage, Yard",
                  },
                  ].map((member, i) => (
                  <div key={i} className="grid grid-cols-12 items-center px-4 py-3">
                    <div className="col-span-3">{member.name}</div>
                    <div className="col-span-2">{member.role}</div>
                    <div className="col-span-2">{member.permissions}</div>
                    <div className="col-span-3">{member.preferences}</div>
                    <div className="col-span-2">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        {member.role === "Child" && (
                        <Button variant="outline" size="sm" className="text-red-500">
                          Remove
                        </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  ))}
                </div>
              </div>
              <Button className="mt-4">Add Family Member</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="areas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>House Areas</CardTitle>
              <CardDescription>Manage the areas of your home</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border">
                <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                  <div className="col-span-3">Area Name</div>
                  <div className="col-span-2">Default Priority</div>
                  <div className="col-span-2">Default Importance</div>
                  <div className="col-span-2">Default Severity</div>
                  <div className="col-span-1">Chore Count</div>
                  <div className="col-span-2">Actions</div>
                </div>
                <div className="divide-y">
                  {[
                  {
                  name: "Kitchen",
                  priority: "IMPORTANT",
                  importance: "Not Urgent",
                  severity: "CONSEQUENCE",
                  chores: 8,
                  },
                  {
                  name: "Living Room",
                  priority: "DO IT CALMLY",
                  importance: "Not Urgent",
                  severity: "ANOYANCE",
                  chores: 5,
                  },
                  {
                  name: "Bathroom",
                  priority: "MUST DO",
                  importance: "Not Urgent",
                  severity: "DISASTER",
                  chores: 6,
                  },
                  {
                  name: "Bedroom 1",
                  priority: "DO IT CALMLY",
                  importance: "Not Urgent",
                  severity: "ANOYANCE",
                  chores: 4,
                  },
                  {
                  name: "Bedroom 2",
                  priority: "DO IT CALMLY",
                  importance: "Not Urgent",
                  severity: "ANOYANCE",
                  chores: 4,
                  },
                  {
                  name: "Garage",
                  priority: "OPTIONAL",
                  importance: "Not Urgent",
                  severity: "NO REAL PROBLEM",
                  chores: 3,
                  },
                  {
                  name: "Garden",
                  priority: "DO IT CALMLY",
                  importance: "Not Urgent",
                  severity: "ANOYANCE",
                  chores: 5,
                  },
                  {
                  name: "Basement",
                  priority: "OPTIONAL",
                  importance: "Not Urgent",
                  severity: "NO REAL PROBLEM",
                  chores: 3,
                  },
                  ].map((area, i) => (
                  <div key={i} className="grid grid-cols-12 items-center px-4 py-3">
                    <div className="col-span-3">{area.name}</div>
                    <div className="col-span-2">{area.priority}</div>
                    <div className="col-span-2">{area.importance}</div>
                    <div className="col-span-2">{area.severity}</div>
                    <div className="col-span-1">{area.chores}</div>
                    <div className="col-span-2">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500">
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                  ))}
                </div>
              </div>
              <Button className="mt-4">Add House Area</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  </SidebarInset>
</SidebarProvider>
)
}
