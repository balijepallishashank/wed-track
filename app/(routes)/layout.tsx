"use client"

import AppHeader from "@/app/_components/AppHeader"
import AppSidebar from "@/app/_components/AppSidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <AppHeader />
          <main className="p-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
