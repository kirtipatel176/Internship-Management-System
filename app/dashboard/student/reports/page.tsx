"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Plus, Upload, CheckCircle, Clock, AlertCircle, MessageSquare, Download } from "lucide-react"
import { useState } from "react"

export default function WeeklyReports() {
  const [showForm, setShowForm] = useState(false)

  const reports = [
    {
      id: 1,
      week: 8,
      title: "API Development and Testing",
      status: "approved",
      submittedDate: "2024-03-18",
      feedback: "Excellent progress on the REST API implementation. Good documentation.",
      grade: "A",
    },
    {
      id: 2,
      week: 7,
      title: "Database Design and Implementation",
      status: "revision_required",
      submittedDate: "2024-03-11",
      feedback: "Please add more details about the database optimization techniques used.",
      grade: "B+",
    },
    {
      id: 3,
      week: 6,
      title: "Frontend Component Development",
      status: "approved",
      submittedDate: "2024-03-04",
      feedback: "Great work on the responsive design components.",
      grade: "A-",
    },
  ]

  return (
    <DashboardLayout role="student">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Weekly Reports</h1>
            <p className="text-gray-600">Submit and track your weekly internship progress</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="mr-2 h-4 w-4" />
            Submit New Report
          </Button>
        </div>

        {/* Progress Overview */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Progress Overview</CardTitle>
            <CardDescription>Your internship completion status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Reports Submitted</span>
                <span className="text-sm text-gray-600">8 of 12 weeks</span>
              </div>
              <Progress value={67} className="h-2" />
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">6</div>
                  <div className="text-xs text-gray-600">Approved</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">1</div>
                  <div className="text-xs text-gray-600">Needs Revision</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">1</div>
                  <div className="text-xs text-gray-600">Under Review</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {showForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Submit Weekly Report - Week 9</CardTitle>
              <CardDescription>Upload your weekly progress report and add comments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Report Title</Label>
                <Input id="title" placeholder="Brief title describing this week's work" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Work Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the tasks completed, challenges faced, and learning outcomes"
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="achievements">Key Achievements</Label>
                <Textarea id="achievements" placeholder="List your major accomplishments this week" rows={3} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="report-file">Report File (PDF/DOCX)</Label>
                <Input id="report-file" type="file" accept=".pdf,.docx" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="comments">Additional Comments (Optional)</Label>
                <Textarea id="comments" placeholder="Any additional notes or questions for your mentor" rows={2} />
              </div>
              <div className="flex gap-2">
                <Button>
                  <Upload className="mr-2 h-4 w-4" />
                  Submit Report
                </Button>
                <Button variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {reports.map((report) => (
            <Card key={report.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">
                        Week {report.week}: {report.title}
                      </h3>
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
                        {report.status === "revision_required" && <AlertCircle className="h-3 w-3" />}
                        {report.status === "under_review" && <Clock className="h-3 w-3" />}
                        {report.status === "approved"
                          ? "Approved"
                          : report.status === "revision_required"
                            ? "Needs Revision"
                            : "Under Review"}
                      </Badge>
                      {report.grade && <Badge variant="outline">{report.grade}</Badge>}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Submitted: {new Date(report.submittedDate).toLocaleDateString()}
                    </p>
                    {report.feedback && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <MessageSquare className="h-4 w-4 text-gray-600" />
                          <span className="text-sm font-medium">Mentor Feedback:</span>
                        </div>
                        <p className="text-sm text-gray-700">{report.feedback}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    {report.status === "revision_required" && (
                      <Button size="sm">
                        <Upload className="h-4 w-4 mr-1" />
                        Resubmit
                      </Button>
                    )}
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
