"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { BadgeIcon as Certificate, Download, MessageSquare, CheckCircle, XCircle, Clock, User, Eye } from "lucide-react"
import { useState } from "react"

export default function TeacherCertificates() {
  const [selectedCertificate, setSelectedCertificate] = useState<number | null>(null)
  const [feedback, setFeedback] = useState("")

  const certificates = [
    {
      id: 1,
      studentName: "Sarah Wilson",
      studentEmail: "sarah.wilson@charusat.edu.in",
      internshipTitle: "Data Science Intern",
      company: "DataTech Analytics",
      duration: "6 months",
      startDate: "2023-09-01",
      endDate: "2024-03-01",
      uploadDate: "2024-03-25",
      status: "pending",
      fileName: "certificate_sarah_datatech.pdf",
    },
    {
      id: 2,
      studentName: "John Doe",
      studentEmail: "john.doe@charusat.edu.in",
      internshipTitle: "Software Development Intern",
      company: "TechCorp Solutions",
      duration: "6 months",
      startDate: "2023-09-01",
      endDate: "2024-03-01",
      uploadDate: "2024-03-22",
      status: "approved",
      fileName: "certificate_john_techcorp.pdf",
      feedback: "Certificate verified and approved. Excellent completion of internship requirements.",
      approvedDate: "2024-03-24",
    },
    {
      id: 3,
      studentName: "Mike Johnson",
      studentEmail: "mike.johnson@charusat.edu.in",
      internshipTitle: "UI/UX Design Intern",
      company: "Creative Studios",
      duration: "4 months",
      startDate: "2023-11-01",
      endDate: "2024-03-01",
      uploadDate: "2024-03-20",
      status: "rejected",
      fileName: "certificate_mike_creative.pdf",
      feedback:
        "Certificate format does not meet requirements. Please upload the official certificate from the company.",
      reviewedDate: "2024-03-21",
    },
  ]

  const handleApproval = (certificateId: number, action: "approve" | "reject") => {
    // Handle approval action
    console.log(`${action} certificate ${certificateId}`)
  }

  return (
    <DashboardLayout role="teacher">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Certificate Approvals</h1>
          <p className="text-gray-600">Review and approve student internship completion certificates</p>
        </div>

        {/* Approval Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
                  <p className="text-2xl font-bold text-orange-600">3</p>
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
                  <p className="text-2xl font-bold text-green-600">28</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rejected</p>
                  <p className="text-2xl font-bold text-red-600">2</p>
                </div>
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-blue-600">12</p>
                </div>
                <Certificate className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Certificates List */}
        <div className="space-y-4">
          {certificates.map((certificate) => (
            <Card key={certificate.id} className={selectedCertificate === certificate.id ? "ring-2 ring-blue-500" : ""}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{certificate.studentName}</h3>
                        <p className="text-sm text-gray-600">{certificate.studentEmail}</p>
                      </div>
                      <Badge
                        variant={
                          certificate.status === "approved"
                            ? "default"
                            : certificate.status === "rejected"
                              ? "destructive"
                              : "secondary"
                        }
                        className="flex items-center gap-1"
                      >
                        {certificate.status === "approved" && <CheckCircle className="h-3 w-3" />}
                        {certificate.status === "rejected" && <XCircle className="h-3 w-3" />}
                        {certificate.status === "pending" && <Clock className="h-3 w-3" />}
                        {certificate.status.charAt(0).toUpperCase() + certificate.status.slice(1)}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{certificate.internshipTitle}</h4>
                        <p className="text-sm text-gray-600">{certificate.company}</p>
                        <p className="text-sm text-gray-600">Duration: {certificate.duration}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">
                          Period: {new Date(certificate.startDate).toLocaleDateString()} -{" "}
                          {new Date(certificate.endDate).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600">
                          Uploaded: {new Date(certificate.uploadDate).toLocaleDateString()}
                        </p>
                        {certificate.approvedDate && (
                          <p className="text-sm text-gray-600">
                            Approved: {new Date(certificate.approvedDate).toLocaleDateString()}
                          </p>
                        )}
                        {certificate.reviewedDate && (
                          <p className="text-sm text-gray-600">
                            Reviewed: {new Date(certificate.reviewedDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>

                    {certificate.feedback && (
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <MessageSquare className="h-4 w-4 text-gray-600" />
                          <span className="text-sm font-medium">Your Feedback:</span>
                        </div>
                        <p className="text-sm text-gray-700">{certificate.feedback}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View Certificate
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    {certificate.status === "pending" && (
                      <Button
                        size="sm"
                        onClick={() =>
                          setSelectedCertificate(selectedCertificate === certificate.id ? null : certificate.id)
                        }
                      >
                        Review
                      </Button>
                    )}
                  </div>
                </div>

                {/* Review Form */}
                {selectedCertificate === certificate.id && certificate.status === "pending" && (
                  <div className="border-t pt-4 mt-4">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Feedback/Comments</label>
                        <Textarea
                          placeholder="Provide feedback on the certificate..."
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          rows={3}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={() => handleApproval(certificate.id, "approve")}>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Approve Certificate
                        </Button>
                        <Button variant="destructive" onClick={() => handleApproval(certificate.id, "reject")}>
                          <XCircle className="mr-2 h-4 w-4" />
                          Reject Certificate
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
