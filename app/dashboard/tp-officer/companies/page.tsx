"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building, Search, Plus, CheckCircle, XCircle, Clock, MapPin, Globe, Phone, Mail } from "lucide-react"
import { useState } from "react"

export default function TPOfficerCompanies() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const companies = [
    {
      id: 1,
      name: "TechCorp Solutions",
      website: "https://techcorp.com",
      location: "Bangalore, Karnataka",
      industry: "Software Development",
      email: "hr@techcorp.com",
      phone: "+91 80 1234 5678",
      status: "verified",
      verifiedDate: "2024-01-15",
      totalInterns: 45,
      activeInterns: 12,
      description: "Leading software development company specializing in web and mobile applications.",
      verificationNotes: "Company verified through official channels. Valid GST and registration documents.",
    },
    {
      id: 2,
      name: "DataFlow Inc",
      website: "https://dataflow.in",
      location: "Mumbai, Maharashtra",
      industry: "Data Analytics",
      email: "careers@dataflow.in",
      phone: "+91 22 9876 5432",
      status: "pending",
      submittedDate: "2024-03-20",
      totalInterns: 0,
      activeInterns: 0,
      description: "Data analytics and business intelligence solutions provider.",
      verificationNotes: "Pending document verification. Awaiting GST certificate.",
    },
    {
      id: 3,
      name: "Creative Studios",
      website: "https://creativestudios.co.in",
      location: "Pune, Maharashtra",
      industry: "Design & Creative",
      email: "hello@creativestudios.co.in",
      phone: "+91 20 5555 7777",
      status: "verified",
      verifiedDate: "2024-02-10",
      totalInterns: 28,
      activeInterns: 8,
      description: "Creative design agency specializing in UI/UX design and branding.",
      verificationNotes: "Verified company with good track record of intern placements.",
    },
    {
      id: 4,
      name: "Unknown Corp",
      website: "https://unknowncorp.com",
      location: "Delhi, NCR",
      industry: "Marketing",
      email: "info@unknowncorp.com",
      phone: "+91 11 1111 2222",
      status: "rejected",
      reviewedDate: "2024-03-18",
      totalInterns: 0,
      activeInterns: 0,
      description: "Digital marketing and advertising agency.",
      verificationNotes: "Verification failed. Unable to confirm company legitimacy and registration status.",
    },
  ]

  const handleVerification = (companyId: number, action: "verify" | "reject") => {
    console.log(`${action} company ${companyId}`)
  }

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" ? true : company.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <DashboardLayout role="tp-officer">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Company Verification</h1>
            <p className="text-gray-600">Manage and verify internship companies database</p>
          </div>
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Company
          </Button>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Companies</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Company Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Companies</p>
                  <p className="text-2xl font-bold">156</p>
                </div>
                <Building className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Verified</p>
                  <p className="text-2xl font-bold text-green-600">142</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-orange-600">5</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Interns</p>
                  <p className="text-2xl font-bold text-purple-600">89</p>
                </div>
                <Building className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Company Form */}
        {showAddForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Add New Company</CardTitle>
              <CardDescription>Add a new company to the verification database</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" placeholder="Enter company name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" placeholder="https://company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="software">Software Development</SelectItem>
                      <SelectItem value="data">Data Analytics</SelectItem>
                      <SelectItem value="design">Design & Creative</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="City, State" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Contact Email</Label>
                  <Input id="email" type="email" placeholder="contact@company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+91 XXXXX XXXXX" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Company Description</Label>
                <Textarea id="description" placeholder="Brief description of the company" rows={3} />
              </div>
              <div className="flex gap-2">
                <Button>Add Company</Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Companies List */}
        <div className="space-y-4">
          {filteredCompanies.map((company) => (
            <Card key={company.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <Building className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{company.name}</h3>
                        <p className="text-sm text-gray-600">{company.industry}</p>
                      </div>
                      <Badge
                        variant={
                          company.status === "verified"
                            ? "default"
                            : company.status === "rejected"
                              ? "destructive"
                              : "secondary"
                        }
                        className="flex items-center gap-1"
                      >
                        {company.status === "verified" && <CheckCircle className="h-3 w-3" />}
                        {company.status === "rejected" && <XCircle className="h-3 w-3" />}
                        {company.status === "pending" && <Clock className="h-3 w-3" />}
                        {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>{company.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Globe className="h-4 w-4" />
                          <a
                            href={company.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {company.website}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="h-4 w-4" />
                          <span>{company.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="h-4 w-4" />
                          <span>{company.phone}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Total Interns:</span>
                          <span className="font-medium">{company.totalInterns}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Active Interns:</span>
                          <span className="font-medium">{company.activeInterns}</span>
                        </div>
                        {company.verifiedDate && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Verified:</span>
                            <span className="font-medium">{new Date(company.verifiedDate).toLocaleDateString()}</span>
                          </div>
                        )}
                        {company.submittedDate && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Submitted:</span>
                            <span className="font-medium">{new Date(company.submittedDate).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 mb-3">{company.description}</p>

                    {company.verificationNotes && (
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium mb-1">Verification Notes:</p>
                        <p className="text-sm text-gray-700">{company.verificationNotes}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    {company.status === "pending" && (
                      <>
                        <Button size="sm" onClick={() => handleVerification(company.id, "verify")}>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Verify
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleVerification(company.id, "reject")}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </>
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
