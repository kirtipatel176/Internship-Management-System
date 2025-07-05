import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Users, Building, Shield } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Internship Management System</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Streamline internship workflows for students, faculty, and administrators with our comprehensive management
            platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <GraduationCap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Students</CardTitle>
              <CardDescription>Apply for NOC, submit reports, track progress</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/auth/student">
                <Button className="w-full">Student Login</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle>Faculty</CardTitle>
              <CardDescription>Review reports, approve certificates, mentor students</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/auth/teacher">
                <Button className="w-full bg-transparent" variant="outline">
                  Faculty Login
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Building className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>T&P Officer</CardTitle>
              <CardDescription>Manage NOC requests, verify companies, post opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/auth/tp-officer">
                <Button className="w-full bg-transparent" variant="outline">
                  T&P Login
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Shield className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <CardTitle>Super Admin</CardTitle>
              <CardDescription>System oversight, analytics, user management</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/auth/admin">
                <Button className="w-full bg-transparent" variant="outline">
                  Admin Login
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Role-Based Access</h3>
              <p className="text-gray-600 text-sm">Secure access control for different user types</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <GraduationCap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Document Management</h3>
              <p className="text-gray-600 text-sm">Secure upload and tracking of reports and certificates</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Building className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Real-time Tracking</h3>
              <p className="text-gray-600 text-sm">Live status updates and automated notifications</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
