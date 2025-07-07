"use client"

import type React from "react"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, FileText, CheckCircle, Clock, XCircle, Download, Eye, BookOpen } from "lucide-react"
import { useState, useEffect } from "react"
import { getReportsByStudent, createWeeklyReport, getCurrentUser } from "@/lib/data"
import { useToast } from "@/hooks/use-toast"

export default function StudentReports() {
  const [showReportForm, setShowReportForm] = useState(false)
  const [reports, setReports] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const loadReports = () => {
      const user = getCurrentUser()
      if (user) {
        const userReports = getReportsByStudent(user.id)
        setReports(userReports)
      }
    }

    loadReports()
  }, [])

  const handleSubmitReport = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.target as HTMLFormElement)
    const user = getCurrentUser()

    if (!user) {
      toast({
        title: "Error",
        description: "User not found. Please log in again.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    try {
      const newReport = createWeeklyReport({
        studentId: user.id,
        studentName: user.name,
        weekNumber: reports.length + 1,
        title: formData.get("title") as string,
        content: formData.get("content") as string,
      })

      setReports((prev) => [...prev, newReport])
      setShowReportForm(false)

      toast({
        title: "Report Submitted",
        description: "Your weekly report has been submitted successfully and is pending review.",
      })

      // Reset form
      ;(event.target as HTMLFormElement).reset()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit report. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleViewReport = (reportId: string) => {
    toast({
      title: "View Report",
      description: `Opening report ${reportId}`,
    })
  }

  const handleDownloadReport = (reportId: string) => {
    toast({
      title: "Download Report",
      description: `Downloading report ${reportId}`,
    })
  }

  return (
    <AuthGuard allowedRoles={["student"]}>
      <DashboardLayout>
        <div className="space-y-6 p-4 sm:p-6">
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Weekly Reports</h1>
              <p className="text-gray-600">Submit and track your internship weekly progress reports</p>
            </div>
            <Button onClick={() => setShowReportForm(!showReportForm)} className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Submit Report
            </Button>
          </div>

          {showReportForm && (
            <Card>
              <CardHeader>
                <CardTitle>Submit Weekly Report</CardTitle>
                <CardDescription>Document your weekly progress and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitReport} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Report Title *</Label>
                    <Input id="title" name="title" placeholder="e.g., Week 3 - Database Integration" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">Report Content *</Label>
                    <Textarea
                      id="content"
                      name="content"
                      placeholder="Describe your activities, achievements, challenges, and learnings for this week..."
                      rows={8}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="achievements">Key Achievements (Optional)</Label>
                    <Textarea
                      id="achievements"
                      name="achievements"
                      placeholder="List your key accomplishments this week..."
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="challenges">Challenges Faced (Optional)</Label>
                    <Textarea
                      id="challenges"
                      name="challenges"
                      placeholder="Describe any challenges you encountered and how you addressed them..."
                      rows={3}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                      {isSubmitting ? (
                        "Submitting..."
                      ) : (
                        <>
                          <FileText className="mr-2 h-4 w-4" />
                          Submit Report
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => setShowReportForm(false)}
                      className="w-full sm:w-auto"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {reports.map((report) => (
              <Card key={report.id}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col space-y-4 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
                    <div className="flex-1">
                      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:gap-3 sm:space-y-0 mb-2">
                        <h3 className="text-lg font-semibold">
                          Week {report.weekNumber}: {report.title}
                        </h3>
                        <Badge
                          variant={
                            report.status === "approved"
                              ? "default"
                              : report.status === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                          className="flex items-center gap-1 w-fit"
                        >
                          {report.status === "approved" && <CheckCircle className="h-3 w-3" />}
                          {report.status === "pending" && <Clock className="h-3 w-3" />}
                          {report.status === "rejected" && <XCircle className="h-3 w-3" />}
                          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-3 line-clamp-2">{report.content}</p>
                      <div className="flex flex-col space-y-1 sm:flex-row sm:gap-4 sm:space-y-0 text-sm text-gray-500 mb-3">
                        <span>Submitted: {new Date(report.submittedDate).toLocaleDateString()}</span>
                        {report.reviewDate && <span>Reviewed: {new Date(report.reviewDate).toLocaleDateString()}</span>}
                        {report.grade && <span>Grade: {report.grade}</span>}
                      </div>
                      {report.reviewedBy && (
                        <p className="text-sm text-gray-600 mb-3">Reviewed by: {report.reviewedBy}</p>
                      )}
                      {report.feedback && (
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm font-medium mb-1">Faculty Feedback:</p>
                          <p className="text-sm text-gray-700">{report.feedback}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-row sm:flex-col gap-2 sm:ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewReport(report.id)}
                        className="flex-1 sm:flex-none"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadReport(report.id)}
                        className="flex-1 sm:flex-none"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {reports.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500 mb-2">No reports submitted yet</p>
                <p className="text-sm text-gray-400">
                  Start documenting your internship progress by submitting weekly reports
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
