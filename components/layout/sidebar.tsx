"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import {
  Home,
  FileText,
  Building,
  Award,
  Users,
  BarChart3,
  Settings,
  Briefcase,
  CheckCircle,
  BookOpen,
  Shield,
  Activity,
  Bell,
  Calendar,
  LogOut,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { logout } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"

interface SidebarProps {
  user: any
  isOpen: boolean
  onClose: () => void
}

const getNavigationItems = (role: string) => {
  switch (role) {
    case "student":
      return [
        { name: "Dashboard", href: "/dashboard/student", icon: Home },
        { name: "Opportunities", href: "/dashboard/student/opportunities", icon: Briefcase },
        { name: "NOC Requests", href: "/dashboard/student/noc", icon: FileText },
        { name: "Weekly Reports", href: "/dashboard/student/reports", icon: BookOpen },
        { name: "Certificates", href: "/dashboard/student/certificates", icon: Award },
        { name: "Notifications", href: "/dashboard/student/notifications", icon: Bell },
      ]
    case "teacher":
      return [
        { name: "Dashboard", href: "/dashboard/teacher", icon: Home },
        { name: "My Students", href: "/dashboard/teacher/students", icon: Users },
        { name: "Report Reviews", href: "/dashboard/teacher/reports", icon: FileText },
        { name: "Certificate Approvals", href: "/dashboard/teacher/certificates", icon: Award },
        { name: "Tasks", href: "/dashboard/teacher/tasks", icon: CheckCircle },
        { name: "Analytics", href: "/dashboard/teacher/analytics", icon: BarChart3 },
        { name: "Meetings", href: "/dashboard/teacher/meetings", icon: Calendar },
        { name: "Settings", href: "/dashboard/teacher/settings", icon: Settings },
      ]
    case "tp-officer":
      return [
        { name: "Dashboard", href: "/dashboard/tp-officer", icon: Home },
        { name: "NOC Requests", href: "/dashboard/tp-officer/noc", icon: FileText },
        { name: "Company Verification", href: "/dashboard/tp-officer/companies", icon: Building },
        { name: "Opportunities", href: "/dashboard/tp-officer/opportunities", icon: Briefcase },
        { name: "Analytics", href: "/dashboard/tp-officer/analytics", icon: BarChart3 },
      ]
    case "admin":
      return [
        { name: "Dashboard", href: "/dashboard/admin", icon: Home },
        { name: "User Management", href: "/dashboard/admin/users", icon: Users },
        { name: "System Analytics", href: "/dashboard/admin/analytics", icon: BarChart3 },
        { name: "Audit Logs", href: "/dashboard/admin/logs", icon: Activity },
        { name: "System Settings", href: "/dashboard/admin/settings", icon: Settings },
      ]
    default:
      return []
  }
}

function SidebarContent({ user, onItemClick }: { user: any; onItemClick?: () => void }) {
  const pathname = usePathname()
  const { toast } = useToast()
  const navigationItems = getNavigationItems(user.role)

  const handleLogout = () => {
    logout()
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
    if (onItemClick) onItemClick()
  }

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex h-16 items-center border-b px-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            IMS
          </span>
        </div>
      </div>
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1 py-4">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href} onClick={onItemClick}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start h-10 transition-all duration-200",
                    isActive &&
                      "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 hover:from-blue-100 hover:to-purple-100 border border-blue-200/50",
                  )}
                >
                  <item.icon className="mr-3 h-4 w-4" />
                  <span className="text-sm">{item.name}</span>
                </Button>
              </Link>
            )
          })}
        </div>
      </ScrollArea>
      <div className="border-t p-4 space-y-3">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-sm font-medium text-white">
              {user.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
            <p className="text-xs text-gray-500 truncate capitalize">{user.role.replace("-", " ")}</p>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full justify-start h-10 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 bg-transparent"
          onClick={handleLogout}
        >
          <LogOut className="mr-3 h-4 w-4 " />
          <span className="text-sm ">Logout</span>
        </Button>
      </div>
    </div>
  )
}

export function Sidebar({ user, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <SidebarContent user={user} />
      </div>

      {/* Mobile sidebar */}
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent user={user} onItemClick={onClose} />
        </SheetContent>
      </Sheet>
    </>
  )
}
