import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Search, User, Mail, Phone, Eye, MessageSquare, TrendingUp } from "lucide-react"

export default function TeacherStudents() {
  const students = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@charusat.edu.in",
      phone: "+91 9876543210",
      company: "TechCorp Solutions",
      position: "Software Development Intern",
      progress: 67,
      reportsSubmitted: 8,
      totalReports: 12,
      status: "on_track",
      lastActivity: "2024-03-25",
      mentor: "Dr. Smith",
    },
    {
      id: 2,
      name: "Sarah Wilson",
      email: "sarah.wilson@charusat.edu.in",
      phone: "+91 9876543211",
      company: "DataTech Analytics",
      position: "Data Science Intern",
      progress: 100,
      reportsSubmitted: 12,
      totalReports: 12,
      status: "completed",
      lastActivity: "2024-03-24",
      mentor: "Dr. Smith",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@charusat.edu.in",
      phone: "+91 9876543212",
      company: "Creative Studios",
      position: "UI/UX Design Intern",
      progress: 45,
      reportsSubmitted: 5,
      totalReports: 12,
      status: "behind",
      lastActivity: "2024-03-20",
      mentor: "Dr. Smith",
    },
  ]

  return (
    <DashboardLayout role="teacher">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Students</h1>
          <p className="text-gray-600">Monitor and guide your assigned students' internship progress</p>
        </div>

        {/* Search and Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <div className="lg:col-span-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search students..." className="pl-10" />
            </div>
          </div>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <User className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">On Track</p>
                  <p className="text-2xl font-bold text-green-600">18</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-purple-600">6</p>
                </div>
                <Badge className="bg-purple-600">Done</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Students List */}
        <div className="space-y-4">
          {students.map((student) => (
            <Card key={student.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{student.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            <span>{student.email}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            <span>{student.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Current Internship</p>
                        <p className="text-sm text-gray-600">{student.position}</p>
                        <p className="text-sm text-gray-600">{student.company}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Progress</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={student.progress} className="flex-1" />
                          <span className="text-sm text-gray-600">{student.progress}%</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {student.reportsSubmitted}/{student.totalReports} reports submitted
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Badge
                        variant={
                          student.status === "completed"
                            ? "default"
                            : student.status === "on_track"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {student.status === "completed" && "Completed"}
                        {student.status === "on_track" && "On Track"}
                        {student.status === "behind" && "Behind Schedule"}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        Last activity: {new Date(student.lastActivity).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    <Button size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Send Message
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
