"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  BadgeIcon as Certificate,
  Clock,
  AlertTriangle,
  CheckCircle,
  User,
  Calendar,
  Search,
  Filter,
} from "lucide-react"
import { useState } from "react"

export default function TeacherTasks() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")

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
      status: "pending",
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
      status: "pending",
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
      status: "overdue",
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
      status: "pending",
    },
    {
      id: 5,
      type: "report_review",
      title: "Review Week 7 Report",
      studentName: "Emma Davis",
      dueDate: "2024-03-30",
      priority: "low",
      description: "Frontend Development progress report",
      icon: FileText,
      status: "pending",
    },
    {
      id: 6,
      type: "certificate_approval",
      title: "Certificate Verification",
      studentName: "Ryan Miller",
      dueDate: "2024-03-31",
      priority: "medium",
      description: "TechCorp Solutions internship certificate",
      icon: Certificate,
      status: "pending",
    },
  ]

  const completedTasks = [
  {
    id: 101,
    type: "report_review",
    title: "Week 8 Report Approved",
    studentName: "John Doe",
    completedDate: "2024-03-24",
    icon: FileText,
    status: "completed",
  },
  {
    id: 102,
    type: "certificate_approval",
    title: "Certificate Approved",
    studentName: "Emma Davis",
    completedDate: "2024-03-23",
    icon: Certificate,
    status: "completed",
  },
  {
    id: 103,
    type: "student_meeting",
    title: "Progress Review Meeting",
    studentName: "Sarah Wilson",
    completedDate: "2024-03-22",
    icon: User,
    status: "completed",
  },
  {
    id: 104,
    type: "report_review",
    title: "Week 6 Report Approved",
    studentName: "Mike Johnson",
    completedDate: "2024-03-21",
    icon: FileText,
    status: "completed",
  },
]
  const allTasks = [...pendingTasks, ...completedTasks]

  const filteredTasks = allTasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = filterStatus === "all" || task.status === filterStatus
    const matchesPriority = filterPriority === "all" || task.priority === filterPriority

    return matchesSearch && matchesStatus && matchesPriority
  })

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date()
  }

  const handleStartTask = (taskId: number) => {
    alert(`Starting task with ID: ${taskId}`)
  }

  const handleMarkComplete = (taskId: number) => {
    alert(`Marking task ${taskId} as complete`)
  }

  const handleAssignTask = () => {
    alert("Assign new task functionality")
  }

  const totalTasks = allTasks.length
  const pendingCount = pendingTasks.length
  const completedCount = completedTasks.length
  const overdueCount = pendingTasks.filter((task) => isOverdue(task.dueDate)).length

  return (
    <DashboardLayout role="teacher">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Task Management</h1>
            <p className="text-gray-600">Manage your review tasks and student interactions</p>
          </div>
          <Button onClick={handleAssignTask}>
            <User className="h-4 w-4 mr-2" />
            Assign New Task
          </Button>
        </div>

        {/* Task Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                  <p className="text-2xl font-bold">{totalTasks}</p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-orange-600">{pendingCount}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{completedCount}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Overdue</p>
                  <p className="text-2xl font-bold text-red-600">{overdueCount}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search tasks..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Status</label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Priority</label>
                <Select value={filterPriority} onValueChange={setFilterPriority}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setFilterStatus("all")
                    setFilterPriority("all")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tasks List */}
        <Card>
          <CardHeader>
            <CardTitle>All Tasks ({filteredTasks.length})</CardTitle>
            <CardDescription>Your tasks filtered by current criteria</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTasks.map((task) => {
                const Icon = task.icon
                const overdue = task.dueDate && isOverdue(task.dueDate)

                return (
                  <div
                    key={task.id}
                    className={`p-4 rounded-lg border ${
                      overdue
                        ? "border-red-200 bg-red-50"
                        : task.status === "completed"
                          ? "border-green-200 bg-green-50"
                          : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div
                          className={`p-2 rounded-full ${
                            task.status === "completed"
                              ? "bg-green-100 text-green-600"
                              : task.priority
                                ? getPriorityColor(task.priority)
                                : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-sm font-semibold text-gray-900">{task.title}</h4>
                            <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                            {task.priority && (
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
                            )}
                            {overdue && <Badge variant="destructive">Overdue</Badge>}
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{task.studentName}</p>
                          <p className="text-xs text-gray-500 mb-2">{task.description}</p>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Calendar className="h-3 w-3" />
                            <span>
                              {task.dueDate
                                ? `Due: ${new Date(task.dueDate).toLocaleDateString()}`
                                : `Completed: ${new Date(task.completedDate).toLocaleDateString()}`}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        {task.status === "pending" && (
                          <>
                            <Button size="sm" onClick={() => handleStartTask(task.id)}>
                              Start Task
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleMarkComplete(task.id)}>
                              Mark Complete
                            </Button>
                          </>
                        )}
                        {task.status === "completed" && (
                          <Badge variant="outline" className="text-green-600">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Done
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
              {filteredTasks.length === 0 && (
                <div className="text-center py-8 text-gray-500">No tasks found matching your criteria</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Task Categories Summary */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Task Categories</CardTitle>
            <CardDescription>Breakdown of your tasks by type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-blue-900">Report Reviews</h3>
                <p className="text-2xl font-bold text-blue-600">
                  {allTasks.filter((task) => task.type === "report_review").length}
                </p>
                <p className="text-sm text-blue-700">Total reports</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Certificate className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-purple-900">Certificate Approvals</h3>
                <p className="text-2xl font-bold text-purple-600">
                  {allTasks.filter((task) => task.type === "certificate_approval").length}
                </p>
                <p className="text-sm text-purple-700">Total certificates</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <User className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-green-900">Student Meetings</h3>
                <p className="text-2xl font-bold text-green-600">
                  {allTasks.filter((task) => task.type === "student_meeting").length}
                </p>
                <p className="text-sm text-green-700">Total meetings</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
