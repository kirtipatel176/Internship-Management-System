"use client"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Building,
  FileText,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Clock,
  TrendingUp,
  MapPin,
  Calendar,
} from "lucide-react"
import Link from "next/link"
import {
  getCurrentUser,
  getTPOfficerDashboardData,
  getAllCompanies,
  getActiveOpportunities,
  getAllNOCRequests,
} from "@/lib/data"
import { useEffect, useState } from "react"

export default function TPOfficerDashboard() {
  const [user, setUser] = useState(null)
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)

    if (currentUser) {
      const data = getTPOfficerDashboardData()
      setDashboardData(data)
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <AuthGuard allowedRoles={["tp-officer"]}>
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
      totalCompanies: 15,
      verifiedCompanies: 12,
      activeOpportunities: 8,
      pendingNOCs: 5,
      totalApplications: 156,
    },
    recentActivities: [
      { id: 1, type: "company", title: "AI Innovations verified", date: "2024-01-15", status: "approved" },
      { id: 2, type: "opportunity", title: "New ML internship posted", date: "2024-01-14", status: "active" },
      { id: 3, type: "noc", title: "NOC approved for John Doe", date: "2024-01-12", status: "approved" },
      { id: 4, type: "company", title: "WebDev Studios under review", date: "2024-01-10", status: "pending" },
    ],
  }

  const companies = getAllCompanies()
  const opportunities = getActiveOpportunities()
  const nocRequests = getAllNOCRequests()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
      case "verified":
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "company":
        return Building
      case "opportunity":
        return FileText
      case "noc":
        return CheckCircle
      default:
        return AlertTriangle
    }
  }

  return (
    <AuthGuard allowedRoles={["tp-officer"]}>
      <DashboardLayout>
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Header */}
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-start sm:space-y-0">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Training & Placement Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage companies, opportunities, and student placements</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-sm text-gray-500">T&P Officer</p>
              <p className="text-sm text-gray-500">{user?.name}</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">Companies</CardTitle>
                <Building className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl font-bold text-blue-600">{data.stats.totalCompanies}</div>
                <p className="text-xs text-muted-foreground">Total registered</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">Verified</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl font-bold text-green-600">{data.stats.verifiedCompanies}</div>
                <p className="text-xs text-muted-foreground">Companies verified</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">Opportunities</CardTitle>
                <FileText className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl font-bold text-purple-600">{data.stats.activeOpportunities}</div>
                <p className="text-xs text-muted-foreground">Currently active</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">Pending NOCs</CardTitle>
                <AlertTriangle className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl font-bold text-orange-600">{data.stats.pendingNOCs}</div>
                <p className="text-xs text-muted-foreground">Awaiting approval</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">Applications</CardTitle>
                <TrendingUp className="h-4 w-4 text-indigo-600" />
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl font-bold text-indigo-600">{data.stats.totalApplications}</div>
                <p className="text-xs text-muted-foreground">Total received</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Recent Activities */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Activities
                </CardTitle>
                <CardDescription>Latest updates and actions in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {data.recentActivities.map((activity) => {
                    const Icon = getActivityIcon(activity.type)
                    return (
                      <div
                        key={activity.id}
                        className="flex items-center space-x-3 sm:space-x-4 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex-shrink-0">
                          <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{activity.title}</p>
                          <p className="text-xs sm:text-sm text-gray-500">{activity.date}</p>
                        </div>
                        <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Frequently used features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link href="/dashboard/tp-officer/companies">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Building className="h-4 w-4 mr-2" />
                      Verify Companies
                    </Button>
                  </Link>
                  <Link href="/dashboard/tp-officer/opportunities">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <FileText className="h-4 w-4 mr-2" />
                      Manage Opportunities
                    </Button>
                  </Link>
                  <Link href="/dashboard/tp-officer/noc">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Review NOCs
                    </Button>
                  </Link>
                  <Link href="/dashboard/tp-officer/analytics">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Analytics
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Companies Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Recent Company Registrations
              </CardTitle>
              <CardDescription>Latest companies seeking partnerships</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {companies.slice(0, 6).map((company) => (
                  <div key={company.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-sm sm:text-base truncate">{company.name}</h3>
                      <Badge className={getStatusColor(company.status)} variant="secondary">
                        {company.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{company.industry}</p>
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{company.location}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">{company.contactPerson}</span>
                      <Button size="sm" variant="outline" className="text-xs bg-transparent">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <Link href="/dashboard/tp-officer/companies">
                  <Button variant="outline" className="w-full bg-transparent">
                    View All Companies
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Active Opportunities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Active Internship Opportunities
              </CardTitle>
              <CardDescription>Current openings available for students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {opportunities
                  .filter((opp) => opp.status === "active")
                  .slice(0, 4)
                  .map((opportunity) => (
                    <div key={opportunity.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-sm sm:text-base truncate">{opportunity.title}</h3>
                        <Badge variant="outline" className="ml-2 text-xs">
                          {opportunity.duration}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{opportunity.companyName}</p>
                      <div className="flex items-center text-xs text-gray-500 mb-2">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{opportunity.location}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-gray-500">
                          <span className="font-medium">{opportunity.applicationsCount}</span> applications
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>Due: {new Date(opportunity.applicationDeadline).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <Link href="/dashboard/tp-officer/opportunities">
                  <Button variant="outline" className="w-full bg-transparent">
                    Manage All Opportunities
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Statistics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Verification Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Companies verified</span>
                      <span className="font-semibold">
                        {Math.round((data.stats.verifiedCompanies / data.stats.totalCompanies) * 100)}%
                      </span>
                    </div>
                    <Progress
                      value={(data.stats.verifiedCompanies / data.stats.totalCompanies) * 100}
                      className="h-2"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Pending verification</span>
                    <span className="font-semibold">{data.stats.totalCompanies - data.stats.verifiedCompanies}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Application Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total applications</span>
                    <span className="font-semibold">{data.stats.totalApplications}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avg per opportunity</span>
                    <span className="font-semibold">
                      {Math.round(data.stats.totalApplications / data.stats.activeOpportunities)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Success rate</span>
                    <span className="font-semibold">78%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">New companies</span>
                    <span className="font-semibold">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">New opportunities</span>
                    <span className="font-semibold">5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">NOCs processed</span>
                    <span className="font-semibold">12</span>
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
