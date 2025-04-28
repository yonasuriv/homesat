"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  CalendarDays,
  Settings,
  Users,
  BarChart3,
  ClipboardList,
  LayoutDashboardIcon as Dashboard,
  Trophy,
  Map,
  ShieldAlert,
  Home,
  PanelLeft,
  PanelLeftClose,
} from "lucide-react"
import { useState } from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { useAdmin } from "@/hooks/use-admin"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from "./mode-toggle"

export function AppSidebar() {
  const pathname = usePathname()
  const { isAdmin, isLoading } = useAdmin()
  const [open, setOpen] = useState(true)

  const menuItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Dashboard,
    },
    {
      title: "Areas",
      href: "/areas",
      icon: Map,
    },
    {
      title: "Chores",
      href: "/chores",
      icon: ClipboardList,
    },
    {
      title: "Family",
      href: "/family",
      icon: Users,
    },
    {
      title: "Schedule",
      href: "/schedule",
      icon: CalendarDays,
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: BarChart3,
    },
    {
      title: "Leaderboard",
      href: "/leaderboard",
      icon: Trophy,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ]

  // Add admin link if user is admin
  if (isAdmin) {
    menuItems.push({
      title: "Admin",
      href: "/admin",
      icon: ShieldAlert,
    })
  }

  return (
    <Sidebar collapsible={open ? "offcanvas" : "icon"} className="border-r">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Home className="h-6 w-6 flex-shrink-0" />
            {open && <span className="text-xl font-bold">HomeTask</span>}
          </div>
          <Button variant="ghost" size="icon" onClick={() => setOpen(!open)} className="h-8 w-8">
            {open ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeft className="h-5 w-5" />}
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={!open ? item.title : undefined}
                className="py-2.5"
              >
                <Link href={item.href} className="flex items-center">
                  <item.icon className="h-5 w-5" />
                  {open && <span className="text-base ml-3">{item.title}</span>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex flex-col gap-4">
          {open ? (
            <>
              <ModeToggle />
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/thoughtful-bearded-man.png" alt="User" />
                  <AvatarFallback>JM</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Juan Munoz</span>
                  <span className="text-xs text-muted-foreground">juan@example.com</span>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <Settings className="h-5 w-5" />
              <Avatar className="h-9 w-9">
                <AvatarImage src="/thoughtful-bearded-man.png" alt="User" />
                <AvatarFallback>JM</AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
