import { SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from "../_components/AppSidebar"
import AppHeader from "../_components/AppHeader"

export default function RoutesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen">
        <AppSidebar />
        <main className="flex-1">
          <AppHeader />
          <div className="px-10 md:px-20 lg:px-36 xl:px-48">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
