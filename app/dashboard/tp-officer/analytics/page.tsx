import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, Users, Building, FileText, CheckCircle, XCircle, Calendar } from "lucide-react"

export default function TPOfficerAnalytics() {
  return (
    <DashboardLayout role="tp-officer">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Comprehensive insights into NOC processing and internship placements</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">NOC Approval Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">94.2%</div>
              <Progress value={94.2} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">+2.1% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Internships</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">Across 45 companies</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verified Companies</CardTitle>
              <Building className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">+8 this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Processing Time</CardTitle>
              <Calendar className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.3 days</div>
              <p className="text-xs text-muted-foreground">-0.5 days improvement</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* NOC Processing Stats */}
          <Card>
            <CardHeader>
              <CardTitle>NOC Processing Statistics</CardTitle>
              <CardDescription>Monthly breakdown of NOC request processing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Approved</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">156</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "94%" }}></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <XCircle className="h-4 w-4 text-red-600" />
                    <span className="text-sm">Rejected</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">8</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-red-600 h-2 rounded-full" style={{ width: "5%" }}></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-orange-600" />
                    <span className="text-sm">Pending</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">12</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-600 h-2 rounded-full" style={{ width: "7%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Verification Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Company Verification Trends</CardTitle>
              <CardDescription>Company verification activity over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">This Month</span>
                  <span className="text-sm font-medium">8 companies verified</span>
                </div>
                <Progress value={80} className="h-2" />

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Last Month</span>
                  <span className="text-sm font-medium">12 companies verified</span>
                </div>
                <Progress value={100} className="h-2" />

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Average per Month</span>
                  <span className="text-sm font-medium">10 companies</span>
                </div>
                <Progress value={90} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Industry Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Industry Distribution</CardTitle>
              <CardDescription>Breakdown of internships by industry sector</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Software Development</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Data Analytics</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "25%" }}></div>
                    </div>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Design & Creative</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: "15%" }}></div>
                    </div>
                    <span className="text-sm font-medium">15%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Marketing</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-600 h-2 rounded-full" style={{ width: "10%" }}></div>
                    </div>
                    <span className="text-sm font-medium">10%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Others</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-gray-600 h-2 rounded-full" style={{ width: "5%" }}></div>
                    </div>
                    <span className="text-sm font-medium">5%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Key performance indicators for T&P operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-green-900">Student Satisfaction</p>
                    <p className="text-xs text-green-700">Based on feedback surveys</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">4.7/5</p>
                    <p className="text-xs text-green-600">+0.2 from last quarter</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-blue-900">Company Partnerships</p>
                    <p className="text-xs text-blue-700">Active company relationships</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-blue-600">45</p>
                    <p className="text-xs text-blue-600">+5 new partnerships</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-purple-900">Placement Success Rate</p>
                    <p className="text-xs text-purple-700">Students successfully placed</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-purple-600">87%</p>
                    <p className="text-xs text-purple-600">+3% improvement</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Trends */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Monthly Activity Trends
            </CardTitle>
            <CardDescription>Overview of T&P activities over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"].map((month, index) => {
                const values = [45, 52, 38, 61, 48, 56]
                const height = (values[index] / 61) * 100
                return (
                  <div key={month} className="text-center">
                    <div className="h-32 flex items-end justify-center mb-2">
                      <div className="w-8 bg-blue-600 rounded-t" style={{ height: `${height}%` }}></div>
                    </div>
                    <p className="text-sm font-medium">{month}</p>
                    <p className="text-xs text-gray-600">{values[index]} NOCs</p>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
