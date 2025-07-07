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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, FileText, CheckCircle, Clock, XCircle, Download, Eye, Building } from "lucide-react"
import { useState, useEffect } from "react"
import { getNOCRequestsByStudent, createNOCRequest, getCurrentUser, getAllCompanies } from "@/lib/data"
import { useToast } from "@/hooks/use-toast"

export default function StudentNOC() {
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [nocRequests, setNocRequests] = useState([])
  const [companies, setCompanies] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const loadData = () => {
      const user = getCurrentUser()
      if (user) {
        const userNOCs = getNOCRequestsByStudent(user.id)
        setNocRequests(userNOCs)
      }
      const allCompanies = getAllCompanies()
      setCompanies(allCompanies.filter((company) => company.status === "verified"))
    }

    loadData()
  }, [])

  const handleSubmitNOC = async (event: React.FormEvent) => {
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
      const newNOC = createNOCRequest({
        studentId: user.id,
        studentName: user.name,
        companyName: formData.get("company") as string,
        position: formData.get("position") as string,
        duration: formData.get("duration") as string,
        startDate: formData.get("start-date") as string,
        endDate: formData.get("end-date") as string,
      })

      setNocRequests((prev) => [...prev, newNOC])
      setShowApplicationForm(false)

      toast({
        title: "NOC Application Submitted",
        description: "Your NOC application has been submitted successfully and is pending approval.",
      })

      // Reset form
      ;(event.target as HTMLFormElement).reset()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit NOC application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleViewNOC = (nocId: string) => {
    toast({
      title: "View NOC",
      description: `Opening NOC application ${nocId}`,
    })
  }

  const handleDownloadNOC = (nocId: string) => {
    toast({
      title: "Download NOC",
      description: `Downloading NOC application ${nocId}`,
    })
  }

  return (
    <AuthGuard allowedRoles={["student"]}>
      <DashboardLayout>
        <div className="space-y-6 p-4 sm:p-6">
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">NOC Applications</h1>
              <p className="text-gray-600">Apply for No Objection Certificate for internships</p>
            </div>
            <Button onClick={() => setShowApplicationForm(!showApplicationForm)} className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Apply for NOC
            </Button>
          </div>

          {showApplicationForm && (
            <Card>
              <CardHeader>
                <CardTitle>NOC Application Form</CardTitle>
                <CardDescription>Submit your internship details for NOC approval</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitNOC} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company *</Label>
                    <Select name="company" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified company" />
                      </SelectTrigger>
                      <SelectContent>
                        {companies.map((company) => (
                          <SelectItem key={company.id} value={company.name}>
                            {company.name} - {company.location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position/Role *</Label>
                    <Input id="position" name="position" placeholder="Enter internship position" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration *</Label>
                    <Select name="duration" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1 month">1 month</SelectItem>
                        <SelectItem value="2 months">2 months</SelectItem>
                        <SelectItem value="3 months">3 months</SelectItem>
                        <SelectItem value="4 months">4 months</SelectItem>
                        <SelectItem value="6 months">6 months</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Brief description of the internship role and responsibilities"
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
                          Submit NOC Application
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => setShowApplicationForm(false)}
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
            {nocRequests.map((noc) => (
              <Card key={noc.id}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col space-y-4 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
                    <div className="flex-1">
                      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:gap-3 sm:space-y-0 mb-2">
                        <h3 className="text-lg font-semibold">{noc.position}</h3>
                        <Badge
                          variant={
                            noc.status === "approved"
                              ? "default"
                              : noc.status === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                          className="flex items-center gap-1 w-fit"
                        >
                          {noc.status === "approved" && <CheckCircle className="h-3 w-3" />}
                          {noc.status === "pending" && <Clock className="h-3 w-3" />}
                          {noc.status === "rejected" && <XCircle className="h-3 w-3" />}
                          {noc.status.charAt(0).toUpperCase() + noc.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-2">{noc.companyName}</p>
                      <div className="flex flex-col space-y-1 sm:flex-row sm:gap-4 sm:space-y-0 text-sm text-gray-500 mb-3">
                        <span>Duration: {noc.duration}</span>
                        <span>
                          Period: {new Date(noc.startDate).toLocaleDateString()} -{" "}
                          {new Date(noc.endDate).toLocaleDateString()}
                        </span>
                        <span>Submitted: {new Date(noc.submittedDate).toLocaleDateString()}</span>
                      </div>
                      {noc.reviewedBy && <p className="text-sm text-gray-600 mb-3">Reviewed by: {noc.reviewedBy}</p>}
                      {noc.comments && (
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm font-medium mb-1">T&P Officer Comments:</p>
                          <p className="text-sm text-gray-700">{noc.comments}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-row sm:flex-col gap-2 sm:ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewNOC(noc.id)}
                        className="flex-1 sm:flex-none"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      {noc.status === "approved" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadNOC(noc.id)}
                          className="flex-1 sm:flex-none"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {nocRequests.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Building className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500 mb-2">No NOC applications yet</p>
                <p className="text-sm text-gray-400">Apply for a No Objection Certificate to start your internship</p>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
