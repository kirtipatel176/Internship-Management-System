"use client"

import type React from "react"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Search, User, Mail, Phone, Eye, MessageSquare, TrendingUp, Download } from "lucide-react"
import { useEffect, useState } from "react"
import { getTeacherStudents, getCurrentUser } from "@/lib/data"

export default function TeacherStudents() {
  const [students, setStudents] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [user, setUser] = useState(null)

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)

    if (currentUser?.email) {
      const studentsData = getTeacherStudents(currentUser.email)
      setStudents(studentsData)
    }
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const filteredStudents = students.filter((student) => student.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const totalStudents = students.length
  const onTrackStudents = students.filter((student) => student.status === "on_track").length
  const completedStudents = students.filter((student) => student.status === "completed").length

  const handleViewDetails = (studentId: number) => {
    alert(`View details for student ID: ${studentId}`)
  }

  const handleSendMessage = (studentId: number) => {
    alert(`Send message to student ID: ${studentId}`)
  }

  const handleDownloadReport = (studentId: number) => {
    const student = students.find((s) => s.id === studentId)
    if (student) {
      // Create CSV content
      const csvContent = `Name,Email,Phone,Company,Position,Progress,Status,Reports Submitted,Last Activity
${student.name},${student.email},${student.phone},${student.company},${student.position},${student.progress}%,${student.status},${student.reportsSubmitted}/${student.totalReports},${student.lastActivity}`

      // Create and trigger download
      const blob = new Blob([csvContent], { type: "text/csv" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${student.name.replace(/\s+/g, "_")}_report.csv`
      a.click()
      window.URL.revokeObjectURL(url)
    }
  }

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
              <Input placeholder="Search students..." className="pl-10" value={searchQuery} onChange={handleSearch} />
            </div>
          </div>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold">{totalStudents}</p>
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
                  <p className="text-2xl font-bold text-green-600">{onTrackStudents}</p>
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
                  <p className="text-2xl font-bold text-purple-600">{completedStudents}</p>
                </div>
                <Badge className="bg-purple-600">Done</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Students List */}
        <div className="space-y-4">
          {filteredStudents.map((student) => (
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
                    <Button size="sm" onClick={() => handleViewDetails(student.id)}>
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleSendMessage(student.id)}>
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Send Message
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDownloadReport(student.id)}>
                      <Download className="h-4 w-4 mr-1" />
                      Download CSV
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
