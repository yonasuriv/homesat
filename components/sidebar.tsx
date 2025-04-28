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
  ChevronLeft,
  ChevronRight,
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
    <div className="flex h-full">
      <Sidebar collapsible={collapsed ? "icon" : "offcanvas"} className="border-r">
        <SidebarHeader className="border-b border-sidebar-border">
          <div className="flex items-center px-4 py-3">
            <div className="flex items-center gap-2">
              <Home className="h-7 w-7" />
              {!collapsed && <span className="text-xl font-bold">HomeTask</span>}
            </div>
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
                  className="py-3"
                >
                  <Link href={item.href}>
                    <item.icon className="h-6 w-6" />
                    <span className="text-base">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="border-t border-sidebar-border p-4">
          <div className="flex flex-col gap-4">
            <Link
              href="/settings"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Settings className="h-5 w-5" />
              {!collapsed && <span className="text-sm">Settings</span>}
            </Link>
            <div className="flex items-center justify-between">
              <ModeToggle />
            </div>
          </div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setCollapsed(!collapsed)}
        className="h-10 w-10 absolute left-[16rem] top-4 z-50 rounded-full bg-background border shadow-sm"
        style={{ left: collapsed ? "4.5rem" : "16rem" }}
      >
        {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
      </Button>
    </div>
  )
}
