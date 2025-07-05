"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Upload, CheckCircle, Clock, XCircle, Download, Eye } from "lucide-react"
import { useState } from "react"

export default function StudentCertificates() {
  const [showUploadForm, setShowUploadForm] = useState(false)

  const certificates = [
    {
      id: 1,
      internshipTitle: "Software Development Intern",
      company: "TechCorp Solutions",
      status: "approved",
      uploadDate: "2024-03-25",
      approvedDate: "2024-03-28",
      approvedBy: "Dr. Smith",
      feedback: "Certificate verified and approved. Excellent completion.",
    },
    {
      id: 2,
      internshipTitle: "Data Science Intern",
      company: "DataTech Analytics",
      status: "pending",
      uploadDate: "2024-03-22",
      feedback: null,
    },
  ]

  return (
    <DashboardLayout role="student">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Internship Certificates</h1>
            <p className="text-gray-600">Upload and manage your internship completion certificates</p>
          </div>
          <Button onClick={() => setShowUploadForm(!showUploadForm)}>
            <Plus className="mr-2 h-4 w-4" />
            Upload Certificate
          </Button>
        </div>

        {showUploadForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Upload Internship Certificate</CardTitle>
              <CardDescription>Submit your internship completion certificate for approval</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="internship-title">Internship Title</Label>
                <Input id="internship-title" placeholder="Enter internship position title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input id="company-name" placeholder="Enter company name" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input id="start-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <Input id="end-date" type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="certificate-file">Certificate File (PDF)</Label>
                <Input id="certificate-file" type="file" accept=".pdf" />
                <p className="text-xs text-gray-500">Upload your official internship completion certificate</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="additional-notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="additional-notes"
                  placeholder="Any additional information about your internship"
                  rows={3}
                />
              </div>
              <div className="flex gap-2">
                <Button>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Certificate
                </Button>
                <Button variant="outline" onClick={() => setShowUploadForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {certificates.map((certificate) => (
            <Card key={certificate.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{certificate.internshipTitle}</h3>
                      <Badge
                        variant={
                          certificate.status === "approved"
                            ? "default"
                            : certificate.status === "pending"
                              ? "secondary"
                              : "destructive"
                        }
                        className="flex items-center gap-1"
                      >
                        {certificate.status === "approved" && <CheckCircle className="h-3 w-3" />}
                        {certificate.status === "pending" && <Clock className="h-3 w-3" />}
                        {certificate.status === "rejected" && <XCircle className="h-3 w-3" />}
                        {certificate.status.charAt(0).toUpperCase() + certificate.status.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-2">{certificate.company}</p>
                    <div className="flex gap-4 text-sm text-gray-500 mb-3">
                      <span>Uploaded: {new Date(certificate.uploadDate).toLocaleDateString()}</span>
                      {certificate.approvedDate && (
                        <span>Approved: {new Date(certificate.approvedDate).toLocaleDateString()}</span>
                      )}
                      {certificate.approvedBy && <span>Approved by: {certificate.approvedBy}</span>}
                    </div>
                    {certificate.feedback && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm font-medium mb-1">Faculty Feedback:</p>
                        <p className="text-sm text-gray-700">{certificate.feedback}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
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
