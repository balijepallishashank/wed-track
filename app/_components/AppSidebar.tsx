"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { LayoutDashboard, Globe, Plus } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AppSidebar() {
  const pathname = usePathname()

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      title: "Add Website",
      icon: Plus,
      href: "/dashboard/new",
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="font-bold text-lg p-4">WebTrack</h2>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href}>
                <Link href={item.href}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <p className="text-xs text-muted-foreground p-4">
          © WebTrack
        </p>
      </SidebarFooter>
    </Sidebar>
  )
}
