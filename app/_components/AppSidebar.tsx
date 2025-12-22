"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="font-bold text-lg p-4">WebTrack</h2>
      </SidebarHeader>

      <SidebarContent>
        {/* Sidebar items will come later */}
      </SidebarContent>

      <SidebarFooter>
        <p className="text-xs text-muted-foreground p-4">
          © WebTrack
        </p>
      </SidebarFooter>
    </Sidebar>
  )
}
