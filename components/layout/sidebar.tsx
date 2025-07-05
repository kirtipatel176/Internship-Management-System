"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Home,
  FileText,
  BadgeIcon as Certificate,
  Users,
  Building,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  Search,
  BookOpen,
  Clock,
  User,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SidebarProps {
  role: "student" | "teacher" | "tp-officer" | "admin"
}

const navigationItems = {
  student: [
    { name: "Dashboard", href: "/dashboard/student", icon: Home },
    { name: "Opportunities", href: "/dashboard/student/opportunities", icon: Search },
    { name: "NOC Requests", href: "/dashboard/student/noc", icon: FileText },
    { name: "Weekly Reports", href: "/dashboard/student/reports", icon: BookOpen },
    { name: "Certificates", href: "/dashboard/student/certificates", icon: Certificate },
    { name: "Notifications", href: "/dashboard/student/notifications", icon: Bell },
  ],
  teacher: [
    { name: "Dashboard", href: "/dashboard/teacher", icon: Home },
    { name: "My Students", href: "/dashboard/teacher/students", icon: Users },
    { name: "Report Reviews", href: "/dashboard/teacher/reports", icon: FileText },
    { name: "Certificate Approvals", href: "/dashboard/teacher/certificates", icon: Certificate },
    { name: "Pending Tasks", href: "/dashboard/teacher/tasks", icon: Clock },
  ],
  "tp-officer": [
    { name: "Dashboard", href: "/dashboard/tp-officer", icon: Home },
    { name: "NOC Requests", href: "/dashboard/tp-officer/noc", icon: FileText },
    { name: "Company Verification", href: "/dashboard/tp-officer/companies", icon: Building },
    { name: "Opportunities", href: "/dashboard/tp-officer/opportunities", icon: Search },
    { name: "Analytics", href: "/dashboard/tp-officer/analytics", icon: BarChart3 },
  ],
  admin: [
    { name: "Dashboard", href: "/dashboard/admin", icon: Home },
    { name: "User Management", href: "/dashboard/admin/users", icon: Users },
    { name: "System Analytics", href: "/dashboard/admin/analytics", icon: BarChart3 },
    { name: "Audit Logs", href: "/dashboard/admin/logs", icon: FileText },
    { name: "Settings", href: "/dashboard/admin/settings", icon: Settings },
  ],
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname()
  const items = navigationItems[role]

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r">
      <div className="flex h-16 items-center border-b px-6">
        <h2 className="text-lg font-semibold">
          {role === "student" && "Student Portal"}
          {role === "teacher" && "Faculty Portal"}
          {role === "tp-officer" && "T&P Portal"}
          {role === "admin" && "Admin Portal"}
        </h2>
      </div>
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-2 p-4">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn("w-full justify-start", isActive && "bg-primary text-primary-foreground")}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Button>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>
      <div className="border-t p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {role === "student" && "John Doe"}
              {role === "teacher" && "Dr. Smith"}
              {role === "tp-officer" && "T&P Officer"}
              {role === "admin" && "System Admin"}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {role === "student" && "john@charusat.edu.in"}
              {role === "teacher" && "smith@charusat.ac.in"}
              {role === "tp-officer" && "tp@charusat.ac.in"}
              {role === "admin" && "admin@charusat.ac.in"}
            </p>
          </div>
        </div>
        <Link href="/">
          <Button variant="outline" className="w-full bg-transparent">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </Link>
      </div>
    </div>
  )
}
