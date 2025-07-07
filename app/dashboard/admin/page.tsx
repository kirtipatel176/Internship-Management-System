"use client"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, Shield, Activity, BarChart3, CheckCircle, Server, Settings } from "lucide-react"
import Link from "next/link"
import { getCurrentUser, getAdminDashboardData, getAllUsers } from "@/lib/data"
import { useEffect, useState } from "react"

export default function AdminDashboard() {
  const [user, setUser] = useState(null)
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)

    if (currentUser) {
      const data = getAdminDashboardData()
      setDashboardData(data)
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <AuthGuard allowedRoles={["admin"]}>
        <DashboardLayout>
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            <div className="animate-pulse">
              <div className="h-6 sm:h-8 bg-gray-200 rounded w-48 sm:w-64 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-64 sm:w-96"></div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-24 sm:h-32 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </DashboardLayout>
      </AuthGuard>
    )
  }

  const data = dashboardData || {
    stats: {
      totalUsers: 156,
      totalStudents: 120,
      totalTeachers: 25,
      systemHealth: 98,
      activeInternships: 45,
    },
    recentLogs: [
      {
        id: 1,
        action: "User login",
        user: "john.doe@student.edu",
        timestamp: "2024-01-15 10:30:00",
        status: "success",
      },
      {
        id: 2,
        action: "Report submission",
        user: "jane.smith@student.edu",
        timestamp: "2024-01-15 09:45:00",
        status: "success",
      },
      {
        id: 3,
        action: "NOC approval",
        user: "david.johnson@admin.edu",
        timestamp: "2024-01-15 09:15:00",
        status: "success",
      },
      {
        id: 4,
        action: "Failed login attempt",
        user: "unknown@domain.com",
        timestamp: "2024-01-15 08:30:00",
        status: "failed",
      },
      {
        id: 5,
        action: "Certificate upload",
        user: "mike.wilson@student.edu",
        timestamp: "2024-01-15 08:00:00",
        status: "success",
      },
    ],
  }

  const users = getAllUsers()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800"
      case "failed":
      case "error":
        return "bg-red-100 text-red-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getActionIcon = (action: string) => {
    if (action.includes("login")) return Users
    if (action.includes("submission") || action.includes("upload")) return Activity
    if (action.includes("approval")) return CheckCircle
    return Shield
  }

  const systemMetrics = [
    { name: "CPU Usage", value: 45, color: "text-blue-600" },
    { name: "Memory Usage", value: 67, color: "text-green-600" },
    { name: "Storage Usage", value: 23, color: "text-purple-600" },
    { name: "Network Load", value: 34, color: "text-orange-600" },
  ]

  return (
    <AuthGuard allowedRoles={["admin"]}>
      <DashboardLayout>
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Header */}
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-start sm:space-y-0">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">System Administration</h1>
              <p className="text-gray-600 mt-1">Monitor system health and manage users</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-sm text-gray-500">System Administrator</p>
              <p className="text-sm text-gray-500">{user?.name}</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl font-bold text-blue-600">{data.stats.totalUsers}</div>
                <p className="text-xs text-muted-foreground">Registered users</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">Students</CardTitle>
                <Users className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl font-bold text-green-600">{data.stats.totalStudents}</div>
                <p className="text-xs text-muted-foreground">Active students</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">Faculty</CardTitle>
                <Users className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl font-bold text-purple-600">{data.stats.totalTeachers}</div>
                <p className="text-xs text-muted-foreground">Teaching staff</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">System Health</CardTitle>
                <Server className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl font-bold text-orange-600">{data.stats.systemHealth}%</div>
                <Progress value={data.stats.systemHealth} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">Internships</CardTitle>
                <BarChart3 className="h-4 w-4 text-indigo-600" />
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl font-bold text-indigo-600">{data.stats.activeInternships}</div>
                <p className="text-xs text-muted-foreground">Currently active</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Recent System Logs */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent System Activity
                </CardTitle>
                <CardDescription>Latest system events and user actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {data.recentLogs.map((log) => {
                    const Icon = getActionIcon(log.action)
                    return (
                      <div
                        key={log.id}
                        className="flex items-center space-x-3 sm:space-x-4 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex-shrink-0">
                          <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{log.action}</p>
                          <p className="text-xs sm:text-sm text-gray-500 truncate">
                            {log.user} • {log.timestamp}
                          </p>
                        </div>
                        <Badge className={getStatusColor(log.status)}>{log.status}</Badge>
                      </div>
                    )
                  })}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Link href="/dashboard/admin/logs">
                    <Button variant="outline" className="w-full bg-transparent">
                      View All Logs
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>System Management</CardTitle>
                <CardDescription>Administrative tools and settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link href="/dashboard/admin/users">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Users className="h-4 w-4 mr-2" />
                      Manage Users
                    </Button>
                  </Link>
                  <Link href="/dashboard/admin/analytics">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      System Analytics
                    </Button>
                  </Link>
                  <Link href="/dashboard/admin/settings">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Settings className="h-4 w-4 mr-2" />
                      System Settings
                    </Button>
                  </Link>
                  <Link href="/dashboard/admin/logs">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Activity className="h-4 w-4 mr-2" />
                      Audit Logs
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                System Performance Metrics
              </CardTitle>
              <CardDescription>Real-time system resource utilization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {systemMetrics.map((metric) => (
                  <div key={metric.name} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-sm">{metric.name}</h3>
                      <span className={`font-bold ${metric.color}`}>{metric.value}%</span>
                    </div>
                    <Progress value={metric.value} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">
                      {metric.value < 50 ? "Normal" : metric.value < 80 ? "Moderate" : "High"}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* User Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Distribution
              </CardTitle>
              <CardDescription>Breakdown of users by role and status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg text-blue-600">{data.stats.totalStudents}</h3>
                  <p className="text-sm text-gray-600">Students</p>
                  <Progress value={(data.stats.totalStudents / data.stats.totalUsers) * 100} className="mt-2 h-2" />
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg text-green-600">{data.stats.totalTeachers}</h3>
                  <p className="text-sm text-gray-600">Faculty Members</p>
                  <Progress value={(data.stats.totalTeachers / data.stats.totalUsers) * 100} className="mt-2 h-2" />
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg text-purple-600">
                    {data.stats.totalUsers - data.stats.totalStudents - data.stats.totalTeachers}
                  </h3>
                  <p className="text-sm text-gray-600">Staff & Admins</p>
                  <Progress
                    value={
                      ((data.stats.totalUsers - data.stats.totalStudents - data.stats.totalTeachers) /
                        data.stats.totalUsers) *
                      100
                    }
                    className="mt-2 h-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Database Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Connection</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Last backup</span>
                    <span className="text-sm font-medium">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Storage used</span>
                    <span className="text-sm font-medium">2.3 GB</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Security Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">SSL Certificate</span>
                    <Badge className="bg-green-100 text-green-800">Valid</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Failed logins (24h)</span>
                    <span className="text-sm font-medium">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Active sessions</span>
                    <span className="text-sm font-medium">47</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">System Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">System version</span>
                    <span className="text-sm font-medium">v2.1.4</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Last update</span>
                    <span className="text-sm font-medium">5 days ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Updates available</span>
                    <Badge className="bg-yellow-100 text-yellow-800">2 pending</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
