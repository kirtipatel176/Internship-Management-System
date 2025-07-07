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
import { Plus, Upload, CheckCircle, Clock, XCircle, Download, Eye, Award } from "lucide-react"
import { useState, useEffect } from "react"
import { getCertificatesByStudent, createCertificate, getCurrentUser } from "@/lib/data"
import { useToast } from "@/hooks/use-toast"

export default function StudentCertificates() {
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [certificates, setCertificates] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const loadCertificates = () => {
      const user = getCurrentUser()
      if (user) {
        const userCertificates = getCertificatesByStudent(user.id)
        setCertificates(userCertificates)
      }
    }

    loadCertificates()
  }, [])

  const handleUploadCertificate = async (event: React.FormEvent) => {
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
      const newCertificate = createCertificate({
        studentId: user.id,
        studentName: user.name,
        certificateType: "Internship Completion",
        issuer: formData.get("company-name") as string,
        issueDate: formData.get("end-date") as string,
      })

      setCertificates((prev) => [...prev, newCertificate])
      setShowUploadForm(false)

      toast({
        title: "Certificate Uploaded",
        description: "Your certificate has been uploaded successfully and is pending approval.",
      })

      // Reset form
      ;(event.target as HTMLFormElement).reset()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload certificate. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleViewCertificate = (certificateId: string) => {
    toast({
      title: "View Certificate",
      description: `Opening certificate ${certificateId}`,
    })
  }

  const handleDownloadCertificate = (certificateId: string) => {
    toast({
      title: "Download Certificate",
      description: `Downloading certificate ${certificateId}`,
    })
  }

  return (
    <AuthGuard allowedRoles={["student"]}>
      <DashboardLayout>
        <div className="space-y-6 p-4 sm:p-6">
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Internship Certificates</h1>
              <p className="text-gray-600">Upload and manage your internship completion certificates</p>
            </div>
            <Button onClick={() => setShowUploadForm(!showUploadForm)} className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Upload Certificate
            </Button>
          </div>

          {showUploadForm && (
            <Card>
              <CardHeader>
                <CardTitle>Upload Internship Certificate</CardTitle>
                <CardDescription>Submit your internship completion certificate for approval</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUploadCertificate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="internship-title">Internship Title *</Label>
                    <Input
                      id="internship-title"
                      name="internship-title"
                      placeholder="Enter internship position title"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name *</Label>
                    <Input id="company-name" name="company-name" placeholder="Enter company name" required />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="start-date">Start Date *</Label>
                      <Input id="start-date" type="date" name="start-date" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end-date">End Date *</Label>
                      <Input id="end-date" type="date" name="end-date" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="certificate-file">Certificate File (PDF) *</Label>
                    <Input id="certificate-file" type="file" accept=".pdf" name="certificate-file" required />
                    <p className="text-xs text-gray-500">Upload your official internship completion certificate</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="additional-notes">Additional Notes (Optional)</Label>
                    <Textarea
                      id="additional-notes"
                      name="additional-notes"
                      placeholder="Any additional information about your internship"
                      rows={3}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                      {isSubmitting ? (
                        "Uploading..."
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Certificate
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => setShowUploadForm(false)}
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
            {certificates.map((certificate) => (
              <Card key={certificate.id}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col space-y-4 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
                    <div className="flex-1">
                      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:gap-3 sm:space-y-0 mb-2">
                        <h3 className="text-lg font-semibold">{certificate.certificateType}</h3>
                        <Badge
                          variant={
                            certificate.status === "approved"
                              ? "default"
                              : certificate.status === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                          className="flex items-center gap-1 w-fit"
                        >
                          {certificate.status === "approved" && <CheckCircle className="h-3 w-3" />}
                          {certificate.status === "pending" && <Clock className="h-3 w-3" />}
                          {certificate.status === "rejected" && <XCircle className="h-3 w-3" />}
                          {certificate.status.charAt(0).toUpperCase() + certificate.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-2">{certificate.issuer}</p>
                      <div className="flex flex-col space-y-1 sm:flex-row sm:gap-4 sm:space-y-0 text-sm text-gray-500 mb-3">
                        <span>Issue Date: {new Date(certificate.issueDate).toLocaleDateString()}</span>
                        <span>Uploaded: {new Date(certificate.submittedDate).toLocaleDateString()}</span>
                        {certificate.reviewDate && (
                          <span>Reviewed: {new Date(certificate.reviewDate).toLocaleDateString()}</span>
                        )}
                      </div>
                      {certificate.reviewedBy && (
                        <p className="text-sm text-gray-600 mb-3">Reviewed by: {certificate.reviewedBy}</p>
                      )}
                      {certificate.comments && (
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm font-medium mb-1">Faculty Feedback:</p>
                          <p className="text-sm text-gray-700">{certificate.comments}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-row sm:flex-col gap-2 sm:ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewCertificate(certificate.id)}
                        className="flex-1 sm:flex-none"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadCertificate(certificate.id)}
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

          {certificates.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Award className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500 mb-2">No certificates uploaded yet</p>
                <p className="text-sm text-gray-400">
                  Upload your internship completion certificate for faculty approval
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
