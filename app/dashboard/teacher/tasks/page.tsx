import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { FileText, BadgeIcon as Certificate, Clock, AlertTriangle, CheckCircle, User, Calendar } from "lucide-react"

export default function TeacherTasks() {
  const pendingTasks = [
    {
      id: 1,
      type: "report_review",
      title: "Review Week 9 Report",
      studentName: "John Doe",
      dueDate: "2024-03-27",
      priority: "high",
      description: "API Development and Testing report needs review",
      icon: FileText,
    },
    {
      id: 2,
      type: "certificate_approval",
      title: "Certificate Approval",
      studentName: "Sarah Wilson",
      dueDate: "2024-03-28",
      priority: "medium",
      description: "DataTech Analytics internship completion certificate",
      icon: Certificate,
    },
    {
      id: 3,
      type: "report_review",
      title: "Review Week 8 Report",
      studentName: "Mike Johnson",
      dueDate: "2024-03-26",
      priority: "high",
      description: "UI Component Development report - overdue",
      icon: FileText,
    },
    {
      id: 4,
      type: "student_meeting",
      title: "Mid-term Evaluation",
      studentName: "Alex Kumar",
      dueDate: "2024-03-29",
      priority: "medium",
      description: "Schedule mid-term evaluation meeting",
      icon: User,
    },
  ]

  const completedTasks = [
    {
      id: 5,
      type: "report_review",
      title: "Week 8 Report Approved",
      studentName: "John Doe",
      completedDate: "2024-03-24",
      icon: FileText,
    },
    {
      id: 6,
      type: "certificate_approval",
      title: "Certificate Approved",
      studentName: "Emma Davis",
      completedDate: "2024-03-23",
      icon: Certificate,
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50"
      case "medium":
        return "text-orange-600 bg-orange-50"
      case "low":
        return "text-green-600 bg-green-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date()
  }

  return (
    <DashboardLayout role="teacher">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Pending Tasks</h1>
          <p className="text-gray-600">Manage your review tasks and student interactions</p>
        </div>

        {/* Task Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Pending</p>
                  <p className="text-2xl font-bold text-orange-600">4</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">High Priority</p>
                  <p className="text-2xl font-bold text-red-600">2</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed Today</p>
                  <p className="text-2xl font-bold text-green-600">2</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                  <p className="text-2xl font-bold">85%</p>
                </div>
                <Progress value={85} className="mt-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Pending Tasks
              </CardTitle>
              <CardDescription>Tasks requiring your immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingTasks.map((task) => {
                  const Icon = task.icon
                  const overdue = isOverdue(task.dueDate)

                  return (
                    <div
                      key={task.id}
                      className={`p-4 rounded-lg border ${overdue ? "border-red-200 bg-red-50" : "border-gray-200"}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className={`p-2 rounded-full ${getPriorityColor(task.priority)}`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-sm font-semibold text-gray-900">{task.title}</h4>
                              <Badge
                                variant={
                                  task.priority === "high"
                                    ? "destructive"
                                    : task.priority === "medium"
                                      ? "secondary"
                                      : "outline"
                                }
                              >
                                {task.priority}
                              </Badge>
                              {overdue && <Badge variant="destructive">Overdue</Badge>}
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{task.studentName}</p>
                            <p className="text-xs text-gray-500 mb-2">{task.description}</p>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Calendar className="h-3 w-3" />
                              <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <Button size="sm" className="ml-2">
                          Start Task
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recently Completed */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Recently Completed
              </CardTitle>
              <CardDescription>Your recent task completions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {completedTasks.map((task) => {
                  const Icon = task.icon

                  return (
                    <div key={task.id} className="p-4 rounded-lg border border-green-200 bg-green-50">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-full bg-green-100 text-green-600">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-gray-900">{task.title}</h4>
                          <p className="text-sm text-gray-600">{task.studentName}</p>
                          <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                            <CheckCircle className="h-3 w-3" />
                            <span>Completed: {new Date(task.completedDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Task Categories */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Task Categories</CardTitle>
            <CardDescription>Breakdown of your pending tasks by type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-blue-900">Report Reviews</h3>
                <p className="text-2xl font-bold text-blue-600">2</p>
                <p className="text-sm text-blue-700">Pending reviews</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Certificate className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-purple-900">Certificate Approvals</h3>
                <p className="text-2xl font-bold text-purple-600">1</p>
                <p className="text-sm text-purple-700">Awaiting approval</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <User className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-green-900">Student Meetings</h3>
                <p className="text-2xl font-bold text-green-600">1</p>
                <p className="text-sm text-green-700">Scheduled meetings</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
