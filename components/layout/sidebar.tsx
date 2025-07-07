"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Home,
  Users,
  FileText,
  Award,
  Building,
  BarChart3,
  Settings,
  LogOut,
  Briefcase,
  Calendar,
  CheckSquare,
  Bell,
  Shield,
  Database,
  GraduationCap,
} from "lucide-react"
import { getCurrentUser } from "@/lib/data"

interface SidebarProps {
  className?: string
}

const getNavigationItems = (userRole: string) => {
  const baseItems = [
    {
      title: "Dashboard",
      href: `/dashboard/${userRole}`,
      icon: Home,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
  ]

  switch (userRole) {
    case "student":
      return [
        ...baseItems,
        {
          title: "Opportunities",
          href: "/dashboard/student/opportunities",
          icon: Briefcase,
          color: "text-emerald-600",
          bgColor: "bg-emerald-50",
        },
        {
          title: "NOC Requests",
          href: "/dashboard/student/noc",
          icon: FileText,
          color: "text-orange-600",
          bgColor: "bg-orange-50",
        },
        {
          title: "Weekly Reports",
          href: "/dashboard/student/reports",
          icon: FileText,
          color: "text-purple-600",
          bgColor: "bg-purple-50",
        },
        {
          title: "Certificates",
          href: "/dashboard/student/certificates",
          icon: Award,
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
        },
        {
          title: "Notifications",
          href: "/dashboard/student/notifications",
          icon: Bell,
          color: "text-red-600",
          bgColor: "bg-red-50",
        },
      ]

    case "teacher":
      return [
        ...baseItems,
        {
          title: "Students",
          href: "/dashboard/teacher/students",
          icon: GraduationCap,
          color: "text-indigo-600",
          bgColor: "bg-indigo-50",
        },
        {
          title: "Reports",
          href: "/dashboard/teacher/reports",
          icon: FileText,
          color: "text-purple-600",
          bgColor: "bg-purple-50",
        },
        {
          title: "Analytics",
          href: "/dashboard/teacher/analytics",
          icon: BarChart3,
          color: "text-emerald-600",
          bgColor: "bg-emerald-50",
        },
        {
          title: "Meetings",
          href: "/dashboard/teacher/meetings",
          icon: Calendar,
          color: "text-orange-600",
          bgColor: "bg-orange-50",
        },
        {
          title: "Tasks",
          href: "/dashboard/teacher/tasks",
          icon: CheckSquare,
          color: "text-cyan-600",
          bgColor: "bg-cyan-50",
        },
        {
          title: "Certificates",
          href: "/dashboard/teacher/certificates",
          icon: Award,
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
        },
      ]

    case "tp-officer":
      return [
        ...baseItems,
        {
          title: "Companies",
          href: "/dashboard/tp-officer/companies",
          icon: Building,
          color: "text-slate-600",
          bgColor: "bg-slate-50",
        },
        {
          title: "Opportunities",
          href: "/dashboard/tp-officer/opportunities",
          icon: Briefcase,
          color: "text-emerald-600",
          bgColor: "bg-emerald-50",
        },
        {
          title: "NOC Requests",
          href: "/dashboard/tp-officer/noc",
          icon: FileText,
          color: "text-orange-600",
          bgColor: "bg-orange-50",
        },
        {
          title: "Analytics",
          href: "/dashboard/tp-officer/analytics",
          icon: BarChart3,
          color: "text-purple-600",
          bgColor: "bg-purple-50",
        },
      ]

    case "admin":
      return [
        ...baseItems,
        {
          title: "Users",
          href: "/dashboard/admin/users",
          icon: Users,
          color: "text-indigo-600",
          bgColor: "bg-indigo-50",
        },
        {
          title: "Analytics",
          href: "/dashboard/admin/analytics",
          icon: BarChart3,
          color: "text-emerald-600",
          bgColor: "bg-emerald-50",
        },
        {
          title: "Audit Logs",
          href: "/dashboard/admin/logs",
          icon: Database,
          color: "text-red-600",
          bgColor: "bg-red-50",
        },
        {
          title: "Settings",
          href: "/dashboard/admin/settings",
          icon: Settings,
          color: "text-slate-600",
          bgColor: "bg-slate-50",
        },
      ]

    default:
      return baseItems
  }
}

export function Sidebar({ className }: SidebarProps) {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const pathname = usePathname()
  const user = getCurrentUser()

  if (!user) return null

  const navigationItems = getNavigationItems(user.role)

  const handleLogout = () => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("user")
        localStorage.clear()
      }
      setShowLogoutDialog(false)
      window.location.replace("/auth")
    } catch (error) {
      console.error("Logout error:", error)
      window.location.href = "/auth"
    }
  }

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowLogoutDialog(true)
  }

  return (
    <>
      <div
        className={cn(
          "flex h-full flex-col bg-white/90 backdrop-blur-xl border-r border-slate-200/60 shadow-xl",
          className,
        )}
      >
        <div className="flex h-16 items-center border-b border-slate-200/60 px-6 bg-gradient-to-r from-blue-600 to-indigo-600">
          <Link href="/" className="flex items-center gap-3 font-bold text-white">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Shield className="h-6 w-6" />
            </div>
            <span className="text-lg">IMS Portal</span>
          </Link>
        </div>

        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-2 p-4">
            <div className="mb-4">
              <h2 className="mb-4 px-4 text-lg font-bold tracking-tight text-slate-800">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1).replace("-", " ")} Portal
              </h2>
              <div className="space-y-2">
                {navigationItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Button
                      key={item.href}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start h-12 px-4 transition-all duration-200 hover:scale-[1.02]",
                        isActive
                          ? `bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:from-blue-600 hover:to-indigo-700`
                          : "hover:bg-slate-50 text-slate-700 hover:text-slate-900",
                      )}
                      asChild
                    >
                      <Link href={item.href}>
                        <div
                          className={cn(
                            "p-2 rounded-lg mr-3 transition-colors",
                            isActive ? "bg-white/20" : `${item.bgColor} group-hover:${item.bgColor}`,
                          )}
                        >
                          <item.icon className={cn("h-4 w-4", isActive ? "text-white" : item.color)} />
                        </div>
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </Button>
                  )
                })}
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="mt-auto p-4 border-t border-slate-200/60 bg-gradient-to-r from-slate-50 to-blue-50/50">
          <div className="flex items-center space-x-3 mb-4 p-3 bg-white/60 rounded-xl backdrop-blur-sm border border-white/40">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
              <span className="text-sm font-bold text-white">{user.name.charAt(0)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800 truncate">{user.name}</p>
              <p className="text-xs text-slate-500 truncate capitalize">{user.role.replace("-", " ")}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200 h-11"
            onClick={handleLogoutClick}
          >
            <LogOut className="mr-3 h-4 w-4" />
            <span className="font-medium">Logout</span>
          </Button>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent className="border-0 shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-slate-800">Are you sure you want to logout?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-600">
              You will be redirected to the login page and will need to sign in again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="hover:bg-slate-50">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all"
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
