"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "./header"
import { Sidebar } from "./sidebar"
import { getCurrentUser } from "@/lib/data"
import { useIsMobile } from "@/hooks/use-mobile"
import { Sheet, SheetContent } from "@/components/ui/sheet"

interface DashboardLayoutProps {
  children: React.ReactNode
  role?: string
}

export function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState(null)
  const router = useRouter()
  const isMobile = useIsMobile()

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push("/auth")
      return
    }

    if (role && currentUser.role !== role) {
      router.push(`/dashboard/${currentUser.role}`)
      return
    }

    setUser(currentUser)
  }, [router, role])

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-slate-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0 border-r-0">
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="min-h-[calc(100vh-3.5rem)]">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
