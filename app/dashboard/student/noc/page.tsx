"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, FileText, CheckCircle, Clock, XCircle, Eye } from "lucide-react"
import { useState } from "react"

export default function NOCRequests() {
  const [showForm, setShowForm] = useState(false)

  const nocRequests = [
    {
      id: 1,
      company: "TechCorp Solutions",
      position: "Software Development Intern",
      status: "approved",
      submittedDate: "2024-03-10",
      approvedDate: "2024-03-15",
      duration: "6 months",
    },
    {
      id: 2,
      company: "DataTech Analytics",
      position: "Data Science Intern",
      status: "pending",
      submittedDate: "2024-03-20",
      duration: "4 months",
    },
  ]

  return (
    <DashboardLayout role="student">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">NOC Requests</h1>
            <p className="text-gray-600">Manage your No Objection Certificate requests</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="mr-2 h-4 w-4" />
            New NOC Request
          </Button>
        </div>

        {showForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Submit New NOC Request</CardTitle>
              <CardDescription>Request NOC for externally secured internship</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input id="company" placeholder="Enter company name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input id="position" placeholder="Internship position" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 months</SelectItem>
                      <SelectItem value="3">3 months</SelectItem>
                      <SelectItem value="4">4 months</SelectItem>
                      <SelectItem value="6">6 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Job Description</Label>
                <Textarea id="description" placeholder="Describe the internship role and responsibilities" rows={4} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="offer-letter">Offer Letter (PDF)</Label>
                <Input id="offer-letter" type="file" accept=".pdf" />
              </div>
              <div className="flex gap-2">
                <Button>Submit Request</Button>
                <Button variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {nocRequests.map((request) => (
            <Card key={request.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{request.company}</h3>
                      <Badge
                        variant={
                          request.status === "approved"
                            ? "default"
                            : request.status === "pending"
                              ? "secondary"
                              : "destructive"
                        }
                        className="flex items-center gap-1"
                      >
                        {request.status === "approved" && <CheckCircle className="h-3 w-3" />}
                        {request.status === "pending" && <Clock className="h-3 w-3" />}
                        {request.status === "rejected" && <XCircle className="h-3 w-3" />}
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-2">{request.position}</p>
                    <div className="flex gap-4 text-sm text-gray-500">
                      <span>Duration: {request.duration}</span>
                      <span>Submitted: {new Date(request.submittedDate).toLocaleDateString()}</span>
                      {request.approvedDate && (
                        <span>Approved: {new Date(request.approvedDate).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-1" />
                      Download NOC
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
