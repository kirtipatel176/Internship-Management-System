"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Download, MessageSquare, CheckCircle, XCircle, Clock, User } from "lucide-react"
import { useState } from "react"

export default function TeacherReports() {
  const [selectedReport, setSelectedReport] = useState<number | null>(null)
  const [feedback, setFeedback] = useState("")
  const [grade, setGrade] = useState("")

  const reports = [
    {
      id: 1,
      studentName: "John Doe",
      studentEmail: "john.doe@charusat.edu.in",
      week: 9,
      title: "API Development and Testing",
      submittedDate: "2024-03-25",
      status: "pending",
      description:
        "Completed REST API development for user management system. Implemented authentication and authorization features.",
      achievements: ["Built user authentication system", "Created API documentation", "Implemented unit tests"],
      fileName: "week9_report_john.pdf",
    },
    {
      id: 2,
      studentName: "Sarah Wilson",
      studentEmail: "sarah.wilson@charusat.edu.in",
      week: 12,
      title: "Final Project Completion",
      submittedDate: "2024-03-24",
      status: "approved",
      description: "Successfully completed the data analytics dashboard project with all required features.",
      achievements: ["Deployed production dashboard", "Optimized query performance", "Created user training materials"],
      fileName: "week12_report_sarah.pdf",
      feedback: "Excellent work on the final project. Great attention to detail and documentation.",
      grade: "A",
      reviewedDate: "2024-03-25",
    },
    {
      id: 3,
      studentName: "Mike Johnson",
      studentEmail: "mike.johnson@charusat.edu.in",
      week: 8,
      title: "UI Component Development",
      submittedDate: "2024-03-20",
      status: "revision_required",
      description: "Developed reusable UI components for the design system.",
      achievements: ["Created 15 new components", "Updated style guide", "Conducted usability testing"],
      fileName: "week8_report_mike.pdf",
      feedback: "Good progress, but please provide more details about the usability testing results and user feedback.",
      grade: "B+",
      reviewedDate: "2024-03-22",
    },
  ]

  const handleReview = (reportId: number, action: "approve" | "reject" | "revision") => {
    // Handle review action
    console.log(`${action} report ${reportId}`)
  }

  return (
    <DashboardLayout role="teacher">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Report Reviews</h1>
          <p className="text-gray-600">Review and provide feedback on student weekly reports</p>
        </div>

        {/* Review Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
                  <p className="text-2xl font-bold text-orange-600">7</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-2xl font-bold text-green-600">45</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Needs Revision</p>
                  <p className="text-2xl font-bold text-red-600">8</p>
                </div>
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Week</p>
                  <p className="text-2xl font-bold text-blue-600">12</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {reports.map((report) => (
            <Card key={report.id} className={selectedReport === report.id ? "ring-2 ring-blue-500" : ""}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">
                          {report.studentName} - Week {report.week}
                        </h3>
                        <p className="text-sm text-gray-600">{report.studentEmail}</p>
                      </div>
                      <Badge
                        variant={
                          report.status === "approved"
                            ? "default"
                            : report.status === "revision_required"
                              ? "destructive"
                              : "secondary"
                        }
                        className="flex items-center gap-1"
                      >
                        {report.status === "approved" && <CheckCircle className="h-3 w-3" />}
                        {report.status === "revision_required" && <XCircle className="h-3 w-3" />}
                        {report.status === "pending" && <Clock className="h-3 w-3" />}
                        {report.status === "approved"
                          ? "Approved"
                          : report.status === "revision_required"
                            ? "Needs Revision"
                            : "Pending Review"}
                      </Badge>
                    </div>

                    <h4 className="font-medium mb-2">{report.title}</h4>
                    <p className="text-sm text-gray-700 mb-3">{report.description}</p>

                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-700 mb-1">Key Achievements:</p>
                      <ul className="text-sm text-gray-600 list-disc list-inside">
                        {report.achievements.map((achievement, index) => (
                          <li key={index}>{achievement}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Submitted: {new Date(report.submittedDate).toLocaleDateString()}</span>
                      {report.reviewedDate && (
                        <span>Reviewed: {new Date(report.reviewedDate).toLocaleDateString()}</span>
                      )}
                      {report.grade && <Badge variant="outline">{report.grade}</Badge>}
                    </div>

                    {report.feedback && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <MessageSquare className="h-4 w-4 text-gray-600" />
                          <span className="text-sm font-medium">Your Feedback:</span>
                        </div>
                        <p className="text-sm text-gray-700">{report.feedback}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    {report.status === "pending" && (
                      <Button
                        size="sm"
                        onClick={() => setSelectedReport(selectedReport === report.id ? null : report.id)}
                      >
                        Review
                      </Button>
                    )}
                  </div>
                </div>

                {/* Review Form */}
                {selectedReport === report.id && report.status === "pending" && (
                  <div className="border-t pt-4 mt-4">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Grade</label>
                        <Select value={grade} onValueChange={setGrade}>
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Select grade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="A+">A+</SelectItem>
                            <SelectItem value="A">A</SelectItem>
                            <SelectItem value="A-">A-</SelectItem>
                            <SelectItem value="B+">B+</SelectItem>
                            <SelectItem value="B">B</SelectItem>
                            <SelectItem value="B-">B-</SelectItem>
                            <SelectItem value="C">C</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Feedback</label>
                        <Textarea
                          placeholder="Provide detailed feedback on the student's work..."
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          rows={4}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={() => handleReview(report.id, "approve")}>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Approve
                        </Button>
                        <Button variant="outline" onClick={() => handleReview(report.id, "revision")}>
                          Request Revision
                        </Button>
                        <Button variant="destructive" onClick={() => handleReview(report.id, "reject")}>
                          <XCircle className="mr-2 h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
