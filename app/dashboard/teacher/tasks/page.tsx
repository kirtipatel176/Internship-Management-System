"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
  Plus,
  Users,
  Target,
} from "lucide-react"
import { useState, useEffect } from "react"
import { getTasksForTeacher, createTask, updateTask, deleteTask, getTeacherStudents, getCurrentUser } from "@/lib/data"

export default function TeacherTasks() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")
  const [tasks, setTasks] = useState([])
  const [students, setStudents] = useState([])
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [user, setUser] = useState(null)

  // Form state for creating new task
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    type: "assignment",
    assignedTo: "all",
    studentId: null,
    dueDate: "",
    priority: "medium",
  })

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
      const teacherTasks = getTasksForTeacher(currentUser.id)
      setTasks(teacherTasks)
      const teacherStudents = getTeacherStudents(currentUser.email)
      setStudents(teacherStudents)
    }
  }, [])

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.studentName && task.studentName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = filterStatus === "all" || task.status === filterStatus
    const matchesPriority = filterPriority === "all" || task.priority === filterPriority

    return matchesSearch && matchesStatus && matchesPriority
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200"
      case "submitted":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "report":
        return FileText
      case "assignment":
        return Target
      case "meeting":
        return Calendar
      case "evaluation":
        return Certificate
      default:
        return FileText
    }
  }

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date()
  }

  const handleCreateTask = () => {
    if (!newTask.title || !newTask.dueDate) return

    const taskData = {
      ...newTask,
      createdBy: user?.name || "Teacher",
      studentName:
        newTask.assignedTo === "individual" && newTask.studentId
          ? students.find((s) => s.id === Number.parseInt(newTask.studentId))?.name
          : undefined,
    }

    const createdTask = createTask(taskData)
    setTasks([...tasks, createdTask])
    setShowCreateDialog(false)
    setNewTask({
      title: "",
      description: "",
      type: "assignment",
      assignedTo: "all",
      studentId: null,
      dueDate: "",
      priority: "medium",
    })
  }

  const handleStartTask = (taskId: number) => {
    const updatedTask = updateTask(taskId, { status: "in-progress" })
    if (updatedTask) {
      setTasks(tasks.map((task) => (task.id === taskId ? updatedTask : task)))
    }
  }

  const handleMarkComplete = (taskId: number) => {
    const updatedTask = updateTask(taskId, { status: "completed" })
    if (updatedTask) {
      setTasks(tasks.map((task) => (task.id === taskId ? updatedTask : task)))
    }
  }

  const handleDeleteTask = (taskId: number) => {
    if (deleteTask(taskId)) {
      setTasks(tasks.filter((task) => task.id !== taskId))
    }
  }

  const totalTasks = tasks.length
  const pendingCount = tasks.filter((task) => task.status === "pending").length
  const completedCount = tasks.filter((task) => task.status === "completed").length
  const overdueCount = tasks.filter(
    (task) => task.dueDate && isOverdue(task.dueDate) && task.status !== "completed",
  ).length

  return (
    <DashboardLayout role="teacher">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-800">Task Management</h1>
            <p className="text-slate-600 mt-1">Manage your review tasks and student interactions</p>
          </div>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
                <Plus className="h-4 w-4 mr-2" />
                Create New Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-slate-800">Create New Task</DialogTitle>
                <DialogDescription>Assign a new task to students. Fill in the details below.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Task Title</Label>
                  <Input
                    id="title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="Enter task title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    placeholder="Enter task description"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Task Type</Label>
                    <Select value={newTask.type} onValueChange={(value) => setNewTask({ ...newTask, type: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="assignment">Assignment</SelectItem>
                        <SelectItem value="report">Report</SelectItem>
                        <SelectItem value="meeting">Meeting</SelectItem>
                        <SelectItem value="evaluation">Evaluation</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      value={newTask.priority}
                      onValueChange={(value) => setNewTask({ ...newTask, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assignedTo">Assign To</Label>
                  <Select
                    value={newTask.assignedTo}
                    onValueChange={(value) =>
                      setNewTask({
                        ...newTask,
                        assignedTo: value,
                        studentId: value === "all" ? null : newTask.studentId,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Students</SelectItem>
                      <SelectItem value="individual">Individual Student</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {newTask.assignedTo === "individual" && (
                  <div className="space-y-2">
                    <Label htmlFor="student">Select Student</Label>
                    <Select
                      value={newTask.studentId?.toString() || ""}
                      onValueChange={(value) => setNewTask({ ...newTask, studentId: Number.parseInt(value) })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a student" />
                      </SelectTrigger>
                      <SelectContent>
                        {students.map((student) => (
                          <SelectItem key={student.id} value={student.id.toString()}>
                            {student.name} ({student.rollNumber})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateTask} className="bg-gradient-to-r from-blue-600 to-indigo-600">
                  Create Task
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Task Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Tasks</p>
                  <p className="text-2xl font-bold text-slate-800">{totalTasks}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Pending</p>
                  <p className="text-2xl font-bold text-orange-600">{pendingCount}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{completedCount}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Overdue</p>
                  <p className="text-2xl font-bold text-red-600">{overdueCount}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 border-b">
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <Filter className="h-5 w-5 text-blue-600" />
              Filter Tasks
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    placeholder="Search tasks..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Status</label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                    <SelectItem value="submitted">Submitted</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Priority</label>
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
                  className="w-full hover:bg-slate-50"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tasks List */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b">
            <CardTitle className="text-slate-800">All Tasks ({filteredTasks.length})</CardTitle>
            <CardDescription>Your tasks filtered by current criteria</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {filteredTasks.map((task) => {
                const Icon = getTypeIcon(task.type)
                const overdue = task.dueDate && isOverdue(task.dueDate) && task.status !== "completed"

                return (
                  <div
                    key={task.id}
                    className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
                      overdue
                        ? "border-red-200 bg-red-50/50"
                        : task.status === "completed"
                          ? "border-green-200 bg-green-50/50"
                          : "border-slate-200 hover:border-blue-200 hover:bg-blue-50/30"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div
                          className={`p-3 rounded-lg ${
                            task.status === "completed"
                              ? "bg-green-100 text-green-600"
                              : overdue
                                ? "bg-red-100 text-red-600"
                                : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h4 className="text-base font-semibold text-slate-800">{task.title}</h4>
                            <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                            <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                            {overdue && <Badge className="bg-red-100 text-red-800 border-red-200">Overdue</Badge>}
                          </div>
                          {task.assignedTo === "individual" && task.studentName && (
                            <div className="flex items-center gap-2 mb-2">
                              <User className="h-4 w-4 text-slate-500" />
                              <span className="text-sm font-medium text-slate-700">{task.studentName}</span>
                            </div>
                          )}
                          {task.assignedTo === "all" && (
                            <div className="flex items-center gap-2 mb-2">
                              <Users className="h-4 w-4 text-slate-500" />
                              <span className="text-sm font-medium text-slate-700">All Students</span>
                            </div>
                          )}
                          <p className="text-sm text-slate-600 mb-2">{task.description}</p>
                          <div className="flex items-center gap-4 text-xs text-slate-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              <span>Created by: {task.createdBy}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        {task.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleStartTask(task.id)}
                              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                            >
                              Start Task
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleMarkComplete(task.id)}
                              className="hover:bg-green-50 hover:border-green-300"
                            >
                              Mark Complete
                            </Button>
                          </>
                        )}
                        {task.status === "completed" && (
                          <Badge className="bg-green-100 text-green-800 border-green-200 justify-center">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Done
                          </Badge>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-red-600 hover:bg-red-50 hover:border-red-300"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
              {filteredTasks.length === 0 && (
                <div className="text-center py-12">
                  <Target className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-500 text-lg font-medium">No tasks found</p>
                  <p className="text-slate-400 text-sm">Try adjusting your search criteria or create a new task</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Task Categories Summary */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
            <CardTitle className="text-slate-800">Task Categories</CardTitle>
            <CardDescription>Breakdown of your tasks by type</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-blue-900 mb-1">Reports</h3>
                <p className="text-2xl font-bold text-blue-600">
                  {tasks.filter((task) => task.type === "report").length}
                </p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-purple-900 mb-1">Assignments</h3>
                <p className="text-2xl font-bold text-purple-600">
                  {tasks.filter((task) => task.type === "assignment").length}
                </p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                <Calendar className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-green-900 mb-1">Meetings</h3>
                <p className="text-2xl font-bold text-green-600">
                  {tasks.filter((task) => task.type === "meeting").length}
                </p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                <Certificate className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <h3 className="font-semibold text-orange-900 mb-1">Evaluations</h3>
                <p className="text-2xl font-bold text-orange-600">
                  {tasks.filter((task) => task.type === "evaluation").length}
                </p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200">
                <Clock className="h-8 w-8 text-slate-600 mx-auto mb-2" />
                <h3 className="font-semibold text-slate-900 mb-1">Other</h3>
                <p className="text-2xl font-bold text-slate-600">
                  {tasks.filter((task) => task.type === "other").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
