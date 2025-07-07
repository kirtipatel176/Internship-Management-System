"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Award, Download, CheckCircle, XCircle, Clock, User, Eye, FileText } from "lucide-react"
import { useState, useEffect } from "react"
import { getCertificatesForTeacher, approveCertificate, rejectCertificate, getCurrentUser } from "@/lib/data"
import { AuthGuard } from "@/components/auth-guard"

export default function TeacherCertificates() {
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null)
  const [feedback, setFeedback] = useState("")
  const [certificates, setCertificates] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)

    if (currentUser?.email) {
      const certificatesData = getCertificatesForTeacher(currentUser.email)
      setCertificates(certificatesData)
    }
  }, [])

  const handleApprove = async (certificateId: string) => {
    await approveCertificate(certificateId, feedback)
    setCertificates(
      certificates.map((cert) =>
        cert.id === certificateId
          ? {
              ...cert,
              status: "approved",
              comments: feedback,
              reviewDate: new Date().toISOString(),
              reviewedBy: user?.name || "Teacher",
            }
          : cert,
      ),
    )
    setSelectedCertificate(null)
    setFeedback("")
  }

  const handleReject = async (certificateId: string) => {
    await rejectCertificate(certificateId, feedback)
    setCertificates(
      certificates.map((cert) =>
        cert.id === certificateId
          ? {
              ...cert,
              status: "rejected",
              comments: feedback,
              reviewDate: new Date().toISOString(),
              reviewedBy: user?.name || "Teacher",
            }
          : cert,
      ),
    )
    setSelectedCertificate(null)
    setFeedback("")
  }

  const handleDownloadCSV = () => {
    const csvContent = `Certificate ID,Student Name,Certificate Type,Issuer,Issue Date,Status,Submitted Date,Review Date
${certificates
  .map(
    (cert) =>
      `${cert.id},${cert.studentName},${cert.certificateType},${cert.issuer},${cert.issueDate},${cert.status},${cert.submittedDate},${cert.reviewDate || "N/A"}`,
  )
  .join("\n")}`

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "student_certificates.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const pendingCount = certificates.filter((cert) => cert.status === "pending").length
  const approvedCount = certificates.filter((cert) => cert.status === "approved").length
  const rejectedCount = certificates.filter((cert) => cert.status === "rejected").length

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return CheckCircle
      case "rejected":
        return XCircle
      case "pending":
        return Clock
      default:
        return Clock
    }
  }

  return (
    <AuthGuard allowedRoles={["teacher"]}>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-slate-800">Certificate Approvals</h1>
              <p className="text-slate-600 mt-1">Review and approve student internship completion certificates</p>
            </div>
            <Button
              onClick={handleDownloadCSV}
              variant="outline"
              className="hover:bg-blue-50 hover:border-blue-300 shadow-sm bg-transparent"
            >
              <Download className="h-4 w-4 mr-2" />
              Download CSV
            </Button>
          </div>

          {/* Certificate Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Certificates</p>
                    <p className="text-2xl font-bold text-slate-800">{certificates.length}</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Award className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Pending Review</p>
                    <p className="text-2xl font-bold text-orange-600">{pendingCount}</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Approved</p>
                    <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
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
                    <p className="text-sm font-medium text-slate-600">Rejected</p>
                    <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                    <XCircle className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Certificates List */}
          <div className="space-y-4">
            {certificates.map((certificate) => {
              const StatusIcon = getStatusIcon(certificate.status)
              return (
                <Card
                  key={certificate.id}
                  className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                    selectedCertificate === certificate.id ? "ring-2 ring-blue-500 ring-opacity-50" : ""
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0 mb-4">
                      <div className="flex-1">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4 mb-3">
                          <div className="flex items-center gap-3 mb-2 lg:mb-0">
                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                              <User className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-slate-800">{certificate.studentName}</h3>
                              <p className="text-sm text-slate-500">Student ID: {certificate.studentId}</p>
                            </div>
                          </div>
                          <Badge className={getStatusColor(certificate.status)}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {certificate.status.charAt(0).toUpperCase() + certificate.status.slice(1)}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Award className="h-4 w-4 text-slate-500" />
                              <span className="text-sm font-medium text-slate-700">Certificate Details</span>
                            </div>
                            <div className="pl-6 space-y-1">
                              <p className="text-sm text-slate-600 font-medium">{certificate.certificateType}</p>
                              <p className="text-sm text-slate-500">Issued by: {certificate.issuer}</p>
                              <p className="text-sm text-slate-500">
                                Issue Date: {new Date(certificate.issueDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-slate-500" />
                              <span className="text-sm font-medium text-slate-700">Submission Info</span>
                            </div>
                            <div className="pl-6 space-y-1">
                              <p className="text-sm text-slate-500">
                                Submitted: {new Date(certificate.submittedDate).toLocaleDateString()}
                              </p>
                              {certificate.reviewDate && (
                                <p className="text-sm text-slate-500">
                                  Reviewed: {new Date(certificate.reviewDate).toLocaleDateString()}
                                </p>
                              )}
                              {certificate.reviewedBy && (
                                <p className="text-sm text-slate-500">Reviewed by: {certificate.reviewedBy}</p>
                              )}
                            </div>
                          </div>
                        </div>

                        {certificate.comments && (
                          <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                            <div className="flex items-center gap-2 mb-2">
                              <Award className="h-4 w-4 text-blue-600" />
                              <span className="text-sm font-medium text-blue-800">Your Feedback:</span>
                            </div>
                            <p className="text-sm text-blue-700 pl-6">{certificate.comments}</p>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-row lg:flex-col gap-2 lg:ml-6">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 lg:flex-none hover:bg-blue-50 hover:border-blue-300 bg-transparent"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 lg:flex-none hover:bg-green-50 hover:border-green-300 bg-transparent"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                        {certificate.status === "pending" && (
                          <Button
                            size="sm"
                            onClick={() =>
                              setSelectedCertificate(selectedCertificate === certificate.id ? null : certificate.id)
                            }
                            className="flex-1 lg:flex-none bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                          >
                            Review
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Review Form */}
                    {selectedCertificate === certificate.id && certificate.status === "pending" && (
                      <div className="border-t border-slate-200 pt-6 mt-6">
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-slate-700 mb-2 block">Feedback</label>
                            <Textarea
                              placeholder="Provide feedback on the certificate..."
                              value={feedback}
                              onChange={(e) => setFeedback(e.target.value)}
                              rows={4}
                              className="resize-none"
                            />
                          </div>
                          <div className="flex flex-col lg:flex-row gap-3">
                            <Button
                              onClick={() => handleApprove(certificate.id)}
                              className="w-full lg:w-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Approve Certificate
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => handleReject(certificate.id)}
                              className="w-full lg:w-auto text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400"
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Reject Certificate
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => {
                                setSelectedCertificate(null)
                                setFeedback("")
                              }}
                              className="w-full lg:w-auto hover:bg-slate-50"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {certificates.length === 0 && (
            <Card className="border-0 shadow-lg">
              <CardContent className="p-12 text-center">
                <Award className="h-16 w-16 mx-auto text-slate-400 mb-4" />
                <h3 className="text-lg font-semibold text-slate-600 mb-2">No certificates to review</h3>
                <p className="text-slate-400">
                  Student certificates will appear here when they upload them for approval
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
