import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { FileText, Building, Users, CheckCircle, Clock, AlertTriangle, TrendingUp, Search, Plus } from "lucide-react"
import Link from "next/link"

export default function TPOfficerDashboard() {
  return (
    <DashboardLayout role="tp-officer">
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">T&P Officer Dashboard</h1>
          <p className="text-gray-600">Manage NOC requests, verify companies, and oversee internship placements</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending NOCs</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">12</div>
              <p className="text-xs text-muted-foreground">Awaiting review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verified Companies</CardTitle>
              <Building className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">In database</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Internships</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">Currently ongoing</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94%</div>
              <Progress value={94} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent NOC Requests */}
          <Card>
            <CardHeader>
              <CardTitle>Recent NOC Requests</CardTitle>
              <CardDescription>Latest applications requiring review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-orange-200 flex items-center justify-center">
                      <FileText className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Alex Kumar - TechCorp</p>
                      <p className="text-xs text-gray-600">Software Development Intern</p>
                    </div>
                  </div>
                  <Badge variant="secondary">New</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-blue-200 flex items-center justify-center">
                      <Building className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Priya Sharma - DataFlow Inc</p>
                      <p className="text-xs text-gray-600">Data Analyst Intern</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Pending</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-red-200 flex items-center justify-center">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Raj Patel - Unknown Corp</p>
                      <p className="text-xs text-gray-600">Company verification needed</p>
                    </div>
                  </div>
                  <Badge variant="destructive">Action Required</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Verification Status */}
          <Card>
            <CardHeader>
              <CardTitle>Company Verification Queue</CardTitle>
              <CardDescription>Companies pending verification</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="text-sm font-medium">InnovateTech Solutions</p>
                    <p className="text-xs text-gray-600">Software Development • Bangalore</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Verify
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Digital Marketing Pro</p>
                    <p className="text-xs text-gray-600">Marketing • Mumbai</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Verify
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="text-sm font-medium">CloudTech Systems</p>
                    <p className="text-xs text-gray-600">Cloud Computing • Pune</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Verify
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and management</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/dashboard/tp-officer/noc">
                <Button className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Review NOC Requests (12)
                </Button>
              </Link>
              <Link href="/dashboard/tp-officer/companies">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Building className="mr-2 h-4 w-4" />
                  Verify Companies (5)
                </Button>
              </Link>
              <Link href="/dashboard/tp-officer/opportunities">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Plus className="mr-2 h-4 w-4" />
                  Post New Opportunity
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Monthly Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>This Month's Activity</CardTitle>
              <CardDescription>NOC processing and verification statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">NOCs Approved</span>
                  </div>
                  <span className="text-sm font-medium">34</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Building className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Companies Verified</span>
                  </div>
                  <span className="text-sm font-medium">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Search className="h-4 w-4 text-purple-600" />
                    <span className="text-sm">Opportunities Posted</span>
                  </div>
                  <span className="text-sm font-medium">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                    <span className="text-sm">Rejections</span>
                  </div>
                  <span className="text-sm font-medium">2</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
