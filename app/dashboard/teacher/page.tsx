"use client"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  FileText,
  Award,
  CheckCircle,
  Calendar,
  BarChart3,
  Clock,
  TrendingUp,
  Star,
  Zap,
  Target,
  Activity,
  Bell,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import { getCurrentUser } from "@/lib/auth"
import { getTeacherDashboardData } from "@/lib/data"
import { useEffect, useState } from "react"


export default function TeacherDashboard() {
  const [user, setUser] = useState(null)
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)

    if (currentUser?.id) {
      const data = getTeacherDashboardData(currentUser.id)
      setDashboardData(data)
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <AuthGuard allowedRoles={["teacher"]}>
        <DashboardLayout role="teacher">
          <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
            <div className="animate-pulse space-y-6">
              <div className="h-8 w-64 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-96 bg-gray-200 rounded"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
                ))}
              </div>
            </div>
          </div>
        </DashboardLayout>
      </AuthGuard>
    )
  }

 const data = {
  ...(dashboardData || {}),
  stats: {
    totalStudents: 25,
    pendingReports: 8,
    approvedReports: 15,
    certificatesToReview: 3,
    activeTasks: 5,
    ...(dashboardData?.stats || {}),
  },
  recentActivities: dashboardData?.recentActivities ?? [
    { type: "report", title: "John Doe submitted Week 8 report", time: "2024-01-15T10:30:00Z", status: "pending" },
    {
      type: "certificate",
      title: "Jane Smith uploaded certificate",
      time: "2024-01-14T14:20:00Z",
      status: "pending",
    },
    {
      type: "report",
      title: "Mike Johnson submitted Week 7 report",
      time: "2024-01-13T09:15:00Z",
      status: "approved",
    },
  ],
}

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
      case "scheduled":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getGradientAvatar = (title: string, index: number) => {
    const gradients = [
      "bg-gradient-to-br from-blue-400 to-purple-500",
      "bg-gradient-to-br from-emerald-400 to-teal-500",
      "bg-gradient-to-br from-orange-400 to-pink-500",
      "bg-gradient-to-br from-indigo-400 to-blue-500",
      "bg-gradient-to-br from-rose-400 to-red-500",
    ]
    return gradients[index % gradients.length]
  }

  return (
    <AuthGuard allowedRoles={["teacher"]}>
      <DashboardLayout role="teacher">
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative">
          <div className="relative z-10 p-6 space-y-8">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Welcome back, {user?.name || "Dr. Sarah Wilson"}!
                    </h1>
                    <p className="text-gray-600 text-lg">Manage your students and review their internship progress</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-4">
                  <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200">
                    <Zap className="h-3 w-3 mr-1" />
                    Active Mentor
                  </Badge>
                  <Badge className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 border-emerald-200">
                    <Target className="h-3 w-3 mr-1" />
                    High Performance
                  </Badge>
                </div>
              </div>
              <div className="text-right space-y-1">
                <p className="text-sm text-gray-500 font-medium">Associate Professor</p>
                <p className="text-sm text-gray-500">Computer Engineering</p>
                <p className="text-xs text-gray-400">ID: EMP001</p>
                <div className="flex items-center justify-end mt-2">
                  <Bell className="h-4 w-4 text-blue-500 mr-1" />
                  <span className="text-xs text-blue-600 font-medium">3 new notifications</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                {
                  title: "Total Students",
                  value: data.stats.totalStudents,
                  icon: Users,
                  color: "blue",
                  trend: "+12%",
                  subtitle: "Under your guidance",
                },
                {
                  title: "Pending Reports",
                  value: data.stats.pendingReports,
                  icon: FileText,
                  color: "orange",
                  trend: "-5%",
                  subtitle: "Awaiting review",
                },
                {
                  title: "Approved Reports",
                  value: data.stats.approvedReports,
                  icon: CheckCircle,
                  color: "emerald",
                  trend: "+18%",
                  subtitle: "This semester",
                },
                {
                  title: "Certificates to Review",
                  value: data.stats.certificatesToReview,
                  icon: Award,
                  color: "purple",
                  trend: "+8%",
                  subtitle: "Pending approval",
                },
                {
                  title: "Active Tasks",
                  value: data.stats.activeTasks,
                  icon: CheckCircle,
                  color: "indigo",
                  trend: "+3%",
                  subtitle: "Assigned to students",
                },
              ].map((stat, index) => (
                <Card
                  key={index}
                  className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br from-${stat.color}-100 to-${stat.color}-200 flex items-center justify-center`}
                    >
                      <stat.icon className={`h-5 w-5 text-${stat.color}-600`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-3xl font-bold text-${stat.color}-600 mb-2`}>{stat.value}</div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">{stat.subtitle}</p>
                      <div className="flex items-center">
                        <TrendingUp className="h-3 w-3 text-emerald-500 mr-1" />
                        <span className="text-xs text-emerald-600 font-medium">{stat.trend}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Activities */}
              <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                        <Activity className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-bold text-gray-900">Recent Activities</CardTitle>
                        <CardDescription className="text-gray-600">
                          Latest submissions and updates from your students
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700">Live Updates</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {data.recentActivities.map((activity, index) => (
                      <div
                        key={`activity-${index}`}
                        className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-blue-50 hover:from-blue-50 hover:to-purple-50 transition-all duration-300"
                      >
                        <div className="flex-shrink-0">
                          <div
                            className={`w-12 h-12 ${getGradientAvatar(activity.title, index)} rounded-full flex items-center justify-center shadow-lg`}
                          >
                            {activity.type === "report" ? (
                              <FileText className="h-5 w-5 text-white" />
                            ) : (
                              <Award className="h-5 w-5 text-white" />
                            )}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900">{activity.title}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(activity.time).toLocaleDateString()} •{" "}
                            {new Date(activity.time).toLocaleTimeString()}
                          </p>
                        </div>
                        <Badge className={`${getStatusColor(activity.status)} px-3 py-1 text-xs font-medium`}>
                          {activity.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <Link href="/dashboard/teacher/students">
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                        <Users className="h-4 w-4 mr-2" />
                        View All Students
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl flex items-center justify-center">
                      <Zap className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900">Quick Actions</CardTitle>
                      <CardDescription className="text-gray-600">Frequently used features</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {[
                      { href: "/dashboard/teacher/students", icon: Users, label: "My Students", color: "blue" },
                      { href: "/dashboard/teacher/reports", icon: FileText, label: "Review Reports", color: "orange" },
                      { href: "/dashboard/teacher/certificates", icon: Award, label: "Certificates", color: "emerald" },
                      { href: "/dashboard/teacher/tasks", icon: CheckCircle, label: "Manage Tasks", color: "purple" },
                      { href: "/dashboard/teacher/meetings", icon: Calendar, label: "Meetings", color: "indigo" },
                      { href: "/dashboard/teacher/analytics", icon: BarChart3, label: "Analytics", color: "pink" },
                    ].map((action, index) => (
                      <Link key={index} href={action.href}>
                        <Button
                          variant="outline"
                          className="w-full justify-start h-12 hover:bg-blue-50 hover:border-blue-200 transition-all duration-300 bg-gradient-to-br from-white to-gray-50 border-2"
                        >
                          <div
                            className={`w-8 h-8 rounded-lg bg-gradient-to-br from-${action.color}-100 to-${action.color}-200 flex items-center justify-center mr-3`}
                          >
                            <action.icon className={`h-4 w-4 text-${action.color}-600`} />
                          </div>
                          <span className="font-semibold text-gray-700">{action.label}</span>
                          <ArrowRight className="h-4 w-4 ml-auto text-gray-400" />
                        </Button>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                      <Clock className="h-4 w-4 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-900">This Week</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { label: "Reports to review", value: 5, color: "blue" },
                      { label: "Certificates pending", value: 3, color: "emerald" },
                      { label: "Tasks assigned", value: 2, color: "orange" },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-gray-50 to-blue-50"
                      >
                        <span className="text-sm text-gray-600 font-medium">{item.label}</span>
                        <span className={`font-bold text-${item.color}-600 text-lg`}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-900">Performance</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600 font-medium">Review efficiency</span>
                        <span className="font-bold text-emerald-600">94%</span>
                      </div>
                      <Progress value={94} className="h-3 bg-gradient-to-r from-emerald-200 to-teal-200" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600 font-medium">Student satisfaction</span>
                        <span className="font-bold text-purple-600">4.8/5</span>
                      </div>
                      <Progress value={96} className="h-3 bg-gradient-to-r from-purple-200 to-indigo-200" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg flex items-center justify-center">
                      <Star className="h-4 w-4 text-purple-600" />
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-900">Quick Stats</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Avg. response time</span>
                      <span className="font-semibold text-blue-600">24h</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Completion rate</span>
                      <span className="font-semibold text-emerald-600">89%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Active students</span>
                      <span className="font-semibold text-purple-600">22</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
