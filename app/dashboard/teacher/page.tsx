"use client"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  FileText,
  Award,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  Calendar,
  BarChart3,
  Clock,
  GraduationCap,
  TrendingUp,
  Star,
  Target,
} from "lucide-react"
import Link from "next/link"
import { getCurrentUser, getTeacherDashboardData } from "@/lib/data"
import { useEffect, useState } from "react"

export default function TeacherDashboard() {
  const [user, setUser] = useState(null)
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)

    if (currentUser?.email) {
      const data = getTeacherDashboardData(currentUser.email)
      setDashboardData(data)
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <AuthGuard allowedRoles={["teacher"]}>
        <DashboardLayout>
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            <div className="animate-pulse">
              <div className="h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-64 mb-4"></div>
              <div className="h-4 bg-slate-200 rounded w-96 mb-8"></div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-32 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </DashboardLayout>
      </AuthGuard>
    )
  }

  const data = dashboardData || {
    profile: {
      name: "Dr. Sarah Wilson",
      department: "Computer Engineering",
      designation: "Associate Professor",
      employeeId: "EMP001",
    },
    stats: {
      totalStudents: 25,
      pendingReports: 8,
      approvedCertificates: 15,
      completedInternships: 12,
      upcomingMeetings: 3,
      thisWeekTasks: 5,
    },
    recentActivities: [
      { id: 1, student: "John Doe", action: "Week 8 Report submitted", date: "2024-01-15", status: "pending" },
      {
        id: 2,
        student: "Jane Smith",
        action: "Data Analysis Certificate approved",
        date: "2024-01-14",
        status: "approved",
      },
      {
        id: 3,
        student: "Mike Johnson",
        action: "Internship at AI Innovations started",
        date: "2024-01-12",
        status: "active",
      },
      {
        id: 4,
        student: "Sarah Johnson",
        action: "Weekly review meeting scheduled",
        date: "2024-01-11",
        status: "scheduled",
      },
      { id: 5, student: "Alex Kumar", action: "Mid-term evaluation submitted", date: "2024-01-10", status: "pending" },
    ],
    pendingTasks: [
      { id: 1, task: "Review weekly reports", count: 5, priority: "high", type: "reports" },
      { id: 2, task: "Approve certificates", count: 3, priority: "medium", type: "certificates" },
      { id: 3, task: "Schedule meetings", count: 2, priority: "low", type: "meetings" },
      { id: 4, task: "Grade submissions", count: 4, priority: "high", type: "grading" },
      { id: 5, task: "Update student progress", count: 6, priority: "medium", type: "progress" },
    ],
    studentProgress: [
      { id: 1, name: "John Doe", company: "TechCorp Solutions", progress: 85, status: "excellent" },
      { id: 2, name: "Jane Smith", company: "DataTech Inc", progress: 78, status: "good" },
      { id: 3, name: "Mike Wilson", company: "AI Innovations", progress: 92, status: "excellent" },
      { id: 4, name: "Sarah Johnson", company: "WebDev Studios", progress: 65, status: "average" },
    ],
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
      case "completed":
      case "excellent":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "pending":
      case "scheduled":
      case "good":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "rejected":
      case "average":
        return "bg-red-100 text-red-800 border-red-200"
      case "active":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-slate-100 text-slate-800 border-slate-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200"
      case "medium":
        return "text-amber-600 bg-amber-50 border-amber-200"
      case "low":
        return "text-emerald-600 bg-emerald-50 border-emerald-200"
      default:
        return "text-slate-600 bg-slate-50 border-slate-200"
    }
  }

  const getTaskIcon = (type: string) => {
    switch (type) {
      case "reports":
        return FileText
      case "certificates":
        return Award
      case "meetings":
        return Calendar
      case "grading":
        return BookOpen
      case "progress":
        return BarChart3
      default:
        return AlertTriangle
    }
  }

  return (
    <AuthGuard allowedRoles={["teacher"]}>
      <DashboardLayout>
        <div className="p-4 sm:p-6 space-y-6">
          {/* Welcome Header */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8 text-white shadow-2xl">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-white/10 blur-xl"></div>
            <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/5 blur-2xl"></div>

            <div className="relative flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-4 sm:space-y-0">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">Welcome back, {data.profile.name}! 👋</h1>
                <p className="text-blue-100 text-lg mb-4">Manage your students and review their internship progress</p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                    {data.profile.designation}
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                    {data.profile.department}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <p className="text-blue-100 text-sm">Employee ID</p>
                <p className="text-white font-mono text-lg">{data.profile.employeeId}</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600"></div>
              <CardContent className="relative p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">Total Students</p>
                    <p className="text-3xl font-bold">{data.stats.totalStudents}</p>
                    <p className="text-blue-100 text-xs mt-1">Under your guidance</p>
                  </div>
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <GraduationCap className="h-8 w-8" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600"></div>
              <CardContent className="relative p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-amber-100 text-sm font-medium">Pending Reports</p>
                    <p className="text-3xl font-bold">{data.stats.pendingReports}</p>
                    <p className="text-amber-100 text-xs mt-1">Awaiting review</p>
                  </div>
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <FileText className="h-8 w-8" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-green-600"></div>
              <CardContent className="relative p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-100 text-sm font-medium">Certificates</p>
                    <p className="text-3xl font-bold">{data.stats.approvedCertificates}</p>
                    <p className="text-emerald-100 text-xs mt-1">Approved this semester</p>
                  </div>
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Award className="h-8 w-8" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-indigo-600"></div>
              <CardContent className="relative p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">Completion Rate</p>
                    <p className="text-3xl font-bold">
                      {Math.round((data.stats.completedInternships / data.stats.totalStudents) * 100)}%
                    </p>
                    <Progress
                      value={(data.stats.completedInternships / data.stats.totalStudents) * 100}
                      className="mt-2 h-2 bg-white/20"
                    />
                  </div>
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Target className="h-8 w-8" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activities */}
            <Card className="lg:col-span-2 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-100">
                <CardTitle className="flex items-center gap-3 text-slate-800">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  Recent Student Activities
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Latest submissions and updates from your students
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {data.recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-slate-50 to-blue-50/50 hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 border border-slate-100 hover:border-blue-200"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
                          <span className="text-sm font-bold text-white">
                            {activity.student
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-900">{activity.student}</p>
                        <p className="text-sm text-slate-600 truncate">{activity.action}</p>
                        <p className="text-xs text-slate-500 mt-1">{new Date(activity.date).toLocaleDateString()}</p>
                      </div>
                      <Badge className={`${getStatusColor(activity.status)} border font-medium`}>
                        {activity.status}
                      </Badge>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link href="/dashboard/teacher/students">
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                      View All Students
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Pending Tasks */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b border-orange-100">
                <CardTitle className="flex items-center gap-3 text-slate-800">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                  </div>
                  Pending Tasks
                </CardTitle>
                <CardDescription className="text-slate-600">Items requiring your attention</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {data.pendingTasks.slice(0, 4).map((task) => {
                    const TaskIcon = getTaskIcon(task.type)
                    return (
                      <div
                        key={task.id}
                        className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-slate-50 to-orange-50/50 hover:from-orange-50 hover:to-red-50 transition-all duration-200 border border-slate-100 hover:border-orange-200"
                      >
                        <div className={`p-2 rounded-lg ${getPriorityColor(task.priority)}`}>
                          <TaskIcon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-900 truncate">{task.task}</p>
                          <p className="text-xs text-slate-500">{task.count} items</p>
                        </div>
                        <Badge className={`${getPriorityColor(task.priority)} border text-xs font-medium`}>
                          {task.priority}
                        </Badge>
                      </div>
                    )
                  })}
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link href="/dashboard/teacher/tasks">
                    <Button
                      variant="outline"
                      className="w-full border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300 transition-all duration-200 bg-transparent"
                    >
                      View All Tasks
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Student Progress Overview */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 border-b border-emerald-100">
              <CardTitle className="flex items-center gap-3 text-slate-800">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                </div>
                Student Progress Overview
              </CardTitle>
              <CardDescription className="text-slate-600">Track your students' internship performance</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.studentProgress.map((student) => (
                  <div
                    key={student.id}
                    className="p-5 rounded-xl bg-gradient-to-br from-white to-slate-50 border border-slate-200 hover:border-emerald-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-slate-900 text-lg">{student.name}</h3>
                        <p className="text-sm text-slate-600">{student.company}</p>
                      </div>
                      <Badge className={`${getStatusColor(student.status)} border font-medium`}>
                        <Star className="h-3 w-3 mr-1" />
                        {student.status}
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Progress</span>
                        <span className="font-semibold text-slate-900">{student.progress}%</span>
                      </div>
                      <div className="relative">
                        <Progress value={student.progress} className="h-3 bg-slate-100" />
                        <div
                          className="absolute top-0 left-0 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 transition-all duration-500"
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100">
                <Link href="/dashboard/teacher/students">
                  <Button
                    variant="outline"
                    className="w-full border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200 bg-transparent"
                  >
                    View Detailed Progress
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-indigo-100">
              <CardTitle className="text-slate-800">Quick Actions</CardTitle>
              <CardDescription className="text-slate-600">Frequently used features and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/dashboard/teacher/students">
                  <Button
                    variant="outline"
                    className="w-full h-20 flex flex-col items-center justify-center space-y-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 group bg-transparent"
                  >
                    <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                      <GraduationCap className="h-6 w-6 text-blue-600" />
                    </div>
                    <span className="text-xs font-medium text-slate-700">My Students</span>
                  </Button>
                </Link>
                <Link href="/dashboard/teacher/reports">
                  <Button
                    variant="outline"
                    className="w-full h-20 flex flex-col items-center justify-center space-y-2 border-orange-200 hover:bg-orange-50 hover:border-orange-300 transition-all duration-200 group bg-transparent"
                  >
                    <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                      <FileText className="h-6 w-6 text-orange-600" />
                    </div>
                    <span className="text-xs font-medium text-slate-700">Review Reports</span>
                  </Button>
                </Link>
                <Link href="/dashboard/teacher/certificates">
                  <Button
                    variant="outline"
                    className="w-full h-20 flex flex-col items-center justify-center space-y-2 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200 group bg-transparent"
                  >
                    <div className="p-2 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
                      <Award className="h-6 w-6 text-emerald-600" />
                    </div>
                    <span className="text-xs font-medium text-slate-700">Certificates</span>
                  </Button>
                </Link>
                <Link href="/dashboard/teacher/meetings">
                  <Button
                    variant="outline"
                    className="w-full h-20 flex flex-col items-center justify-center space-y-2 border-purple-200 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 group bg-transparent"
                  >
                    <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                      <Calendar className="h-6 w-6 text-purple-600" />
                    </div>
                    <span className="text-xs font-medium text-slate-700">Meetings</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
                <CardTitle className="text-lg text-slate-800">This Week</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Tasks to complete</span>
                    <span className="font-bold text-blue-600 text-lg">{data.stats.thisWeekTasks}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Upcoming meetings</span>
                    <span className="font-bold text-indigo-600 text-lg">{data.stats.upcomingMeetings}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Reports to review</span>
                    <span className="font-bold text-purple-600 text-lg">{data.stats.pendingReports}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 border-b border-emerald-100">
                <CardTitle className="text-lg text-slate-800">Performance</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-600">Review efficiency</span>
                      <span className="font-bold text-emerald-600">92%</span>
                    </div>
                    <div className="relative">
                      <Progress value={92} className="h-2 bg-slate-100" />
                      <div
                        className="absolute top-0 left-0 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-green-500"
                        style={{ width: "92%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-600">Student satisfaction</span>
                      <span className="font-bold text-green-600">4.8/5</span>
                    </div>
                    <div className="relative">
                      <Progress value={96} className="h-2 bg-slate-100" />
                      <div
                        className="absolute top-0 left-0 h-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500"
                        style={{ width: "96%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 border-b border-slate-100">
                <CardTitle className="text-lg text-slate-800">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <Link href="/dashboard/teacher/analytics">
                    <Button variant="ghost" className="w-full justify-start text-sm hover:bg-blue-50 transition-colors">
                      <BarChart3 className="h-4 w-4 mr-3 text-blue-600" />
                      View Analytics
                    </Button>
                  </Link>
                  <Link href="/dashboard/teacher/tasks">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm hover:bg-emerald-50 transition-colors"
                    >
                      <CheckCircle className="h-4 w-4 mr-3 text-emerald-600" />
                      Task Management
                    </Button>
                  </Link>
                  <Link href="/dashboard/teacher/meetings">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm hover:bg-purple-50 transition-colors"
                    >
                      <Calendar className="h-4 w-4 mr-3 text-purple-600" />
                      Schedule Meeting
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
