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
import { ModeToggle } from "./mode-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AppSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const { isAdmin, isLoading } = useAdmin()

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
    <Sidebar collapsible={collapsed ? "icon" : "offcanvas"} className="border-r">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Home className="h-6 w-6 flex-shrink-0" />
            {!collapsed && <span className="text-xl font-bold">HomeTask</span>}
          </div>
          <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="h-8 w-8 ml-2">
            {collapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
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
                tooltip={collapsed ? item.title : undefined}
                className="py-2.5"
              >
                <Link href={item.href} className="flex items-center">
                  <item.icon className="h-5 w-5 mr-3" />
                  {!collapsed && <span className="text-sm">{item.title}</span>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/thoughtful-bearded-man.png" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-medium">Juan Munoz</span>
              <span className="text-xs text-muted-foreground">juan@example.com</span>
            </div>
          )}
        </div>
        <div className="mt-4">
          <ModeToggle />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
