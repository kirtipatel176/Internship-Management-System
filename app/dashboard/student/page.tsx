"use client"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  FileText,
  Award,
  TrendingUp,
  Building,
  CheckCircle,
  AlertCircle,
  Calendar,
  Clock,
  MapPin,
  Star,
  Zap,
} from "lucide-react"
import Link from "next/link"
import {
  getCurrentUser,
  getNOCRequestsByStudent,
  getReportsByStudent,
  getCertificatesByStudent,
  getActiveOpportunities,
} from "@/lib/data"
import { useEffect, useState } from "react"

export default function StudentDashboard() {
  const [user, setUser] = useState(null)
  const [nocRequests, setNocRequests] = useState([])
  const [reports, setReports] = useState([])
  const [certificates, setCertificates] = useState([])
  const [opportunities, setOpportunities] = useState([])

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
      setNocRequests(getNOCRequestsByStudent(currentUser.id))
      setReports(getReportsByStudent(currentUser.id))
      setCertificates(getCertificatesByStudent(currentUser.id))
      setOpportunities(getActiveOpportunities())
    }
  }, [])

  if (!user) return null

  const approvedNOCs = nocRequests.filter((noc) => noc.status === "approved").length
  const approvedReports = reports.filter((report) => report.status === "approved").length
  const approvedCertificates = certificates.filter((cert) => cert.status === "approved").length
  const progressValue = reports.length > 0 ? (approvedReports / reports.length) * 100 : 0

  const recentActivities = [
    {
      id: 1,
      type: "report",
      title: "Week 3 Report - Database Integration",
      date: "2024-01-15",
      status: "pending",
      icon: FileText,
      color: "text-blue-500",
    },
    {
      id: 2,
      type: "noc",
      title: "NOC Application - TechCorp Solutions",
      date: "2024-01-10",
      status: "approved",
      icon: CheckCircle,
      color: "text-green-500",
    },
    {
      id: 3,
      type: "certificate",
      title: "React Development Certificate",
      date: "2024-01-08",
      status: "approved",
      icon: Award,
      color: "text-purple-500",
    },
    {
      id: 4,
      type: "opportunity",
      title: "New ML Internship at AI Innovations",
      date: "2024-01-05",
      status: "new",
      icon: Building,
      color: "text-orange-500",
    },
  ]

  const upcomingDeadlines = [
    { id: 1, title: "Week 4 Report Submission", dueDate: "2024-01-25", priority: "high" },
    { id: 2, title: "Mid-term Evaluation", dueDate: "2024-02-01", priority: "medium" },
    { id: 3, title: "Certificate Upload", dueDate: "2024-02-05", priority: "low" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "new":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <AuthGuard allowedRoles={["student"]}>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Welcome Header */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-6 text-white shadow-2xl">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="mb-4 lg:mb-0">
                  <h1 className="text-2xl lg:text-3xl font-bold mb-2">Welcome back, {user.name}! 🎉</h1>
                  <p className="text-blue-100 text-sm lg:text-base">
                    Track your internship progress and manage your activities
                  </p>
                </div>
                <div className="flex flex-col lg:text-right space-y-1">
                  <p className="text-sm text-blue-100">Roll Number: {user.rollNumber || "21CE001"}</p>
                  <p className="text-sm text-blue-100">
                    {user.department} - Semester {user.semester}
                  </p>
                  <div className="flex items-center lg:justify-end mt-2">
                    <Star className="h-4 w-4 text-yellow-300 mr-1" />
                    <span className="text-sm text-yellow-100">Active Student</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-white/10 blur-xl"></div>
            <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/5 blur-2xl"></div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600"></div>
              <CardContent className="relative z-10 p-4 text-white">
                <div className="flex items-center justify-between mb-2">
                  <FileText className="h-6 w-6 opacity-80" />
                  <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-xs font-bold">{approvedNOCs}</span>
                  </div>
                </div>
                <div className="text-lg font-bold">{approvedNOCs}</div>
                <p className="text-xs text-blue-100">NOC Approved</p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-600"></div>
              <CardContent className="relative z-10 p-4 text-white">
                <div className="flex items-center justify-between mb-2">
                  <BookOpen className="h-6 w-6 opacity-80" />
                  <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-xs font-bold">{approvedReports}</span>
                  </div>
                </div>
                <div className="text-lg font-bold">
                  {approvedReports}/{reports.length}
                </div>
                <p className="text-xs text-emerald-100">Reports Done</p>
                <Progress value={progressValue} className="mt-2 h-1 bg-white/20" />
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600"></div>
              <CardContent className="relative z-10 p-4 text-white">
                <div className="flex items-center justify-between mb-2">
                  <Award className="h-6 w-6 opacity-80" />
                  <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-xs font-bold">{approvedCertificates}</span>
                  </div>
                </div>
                <div className="text-lg font-bold">{approvedCertificates}</div>
                <p className="text-xs text-purple-100">Certificates</p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600"></div>
              <CardContent className="relative z-10 p-4 text-white">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="h-6 w-6 opacity-80" />
                  <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-xs font-bold">{Math.round(progressValue)}</span>
                  </div>
                </div>
                <div className="text-lg font-bold">{Math.round(progressValue)}%</div>
                <p className="text-xs text-orange-100">Progress</p>
                <Progress value={progressValue} className="mt-2 h-1 bg-white/20" />
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activities */}
            <Card className="lg:col-span-2 border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 border-b">
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <Clock className="h-5 w-5 text-blue-600" />
                  Recent Activities
                </CardTitle>
                <CardDescription>Your latest submissions and updates</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity) => {
                    const Icon = activity.icon
                    return (
                      <div
                        key={activity.id}
                        className="flex items-center space-x-4 p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-200"
                      >
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                            <Icon className={`h-5 w-5 ${activity.color}`} />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-800 truncate">{activity.title}</p>
                          <p className="text-xs text-slate-500">{activity.date}</p>
                        </div>
                        <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Deadlines */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 border-b">
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  Deadlines
                </CardTitle>
                <CardDescription>Don't miss these important dates</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {upcomingDeadlines.map((deadline) => (
                    <div
                      key={deadline.id}
                      className="flex items-start space-x-3 p-3 rounded-lg border border-slate-100 hover:border-red-200 hover:bg-red-50/50 transition-all duration-200"
                    >
                      <AlertCircle className={`h-5 w-5 mt-0.5 ${getPriorityColor(deadline.priority)}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-800 truncate">{deadline.title}</p>
                        <div className="flex items-center space-x-1 text-xs text-slate-500 mt-1">
                          <Calendar className="h-3 w-3" />
                          <span>{deadline.dueDate}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Available Opportunities */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-blue-50 border-b">
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <Building className="h-5 w-5 text-emerald-600" />
                Latest Opportunities
              </CardTitle>
              <CardDescription>New internship opportunities for you</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {opportunities.slice(0, 4).map((opportunity) => (
                  <div
                    key={opportunity.id}
                    className="border border-slate-200 rounded-xl p-4 hover:shadow-lg hover:border-blue-300 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-slate-800 truncate text-sm">{opportunity.title}</h3>
                      <Badge variant="outline" className="ml-2 text-xs border-emerald-200 text-emerald-700">
                        {opportunity.duration}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-2 font-medium">{opportunity.companyName}</p>
                    <div className="flex items-center text-xs text-slate-500 mb-3">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{opportunity.location}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-emerald-600">{opportunity.stipend}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs hover:bg-blue-50 hover:border-blue-300 bg-transparent"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100">
                <Link href="/dashboard/student/opportunities">
                  <Button
                    variant="outline"
                    className="w-full hover:bg-emerald-50 hover:border-emerald-300 bg-transparent"
                  >
                    <Building className="h-4 w-4 mr-2" />
                    View All Opportunities
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b">
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <Zap className="h-5 w-5 text-indigo-600" />
                Quick Actions
              </CardTitle>
              <CardDescription>Frequently used features</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/dashboard/student/opportunities">
                  <Button
                    variant="outline"
                    className="w-full h-20 flex flex-col items-center justify-center space-y-2 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 hover:scale-105 bg-transparent"
                  >
                    <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Building className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-xs text-center font-medium">Browse Opportunities</span>
                  </Button>
                </Link>
                <Link href="/dashboard/student/noc">
                  <Button
                    variant="outline"
                    className="w-full h-20 flex flex-col items-center justify-center space-y-2 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200 hover:scale-105 bg-transparent"
                  >
                    <div className="h-8 w-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <FileText className="h-4 w-4 text-emerald-600" />
                    </div>
                    <span className="text-xs text-center font-medium">Apply for NOC</span>
                  </Button>
                </Link>
                <Link href="/dashboard/student/reports">
                  <Button
                    variant="outline"
                    className="w-full h-20 flex flex-col items-center justify-center space-y-2 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 hover:scale-105 bg-transparent"
                  >
                    <div className="h-8 w-8 rounded-lg bg-purple-100 flex items-center justify-center">
                      <BookOpen className="h-4 w-4 text-purple-600" />
                    </div>
                    <span className="text-xs text-center font-medium">Submit Report</span>
                  </Button>
                </Link>
                <Link href="/dashboard/student/certificates">
                  <Button
                    variant="outline"
                    className="w-full h-20 flex flex-col items-center justify-center space-y-2 hover:bg-orange-50 hover:border-orange-300 transition-all duration-200 hover:scale-105 bg-transparent"
                  >
                    <div className="h-8 w-8 rounded-lg bg-orange-100 flex items-center justify-center">
                      <Award className="h-4 w-4 text-orange-600" />
                    </div>
                    <span className="text-xs text-center font-medium">View Certificates</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
