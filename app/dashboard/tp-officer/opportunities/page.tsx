"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Edit, Trash2, Eye, MapPin, Calendar, Building, Users } from "lucide-react"
import { useState } from "react"

export default function TPOfficerOpportunities() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const opportunities = [
    {
      id: 1,
      title: "Software Development Intern",
      company: "TechCorp Solutions",
      location: "Bangalore",
      duration: "6 months",
      type: "Full-time",
      stipend: "₹25,000/month",
      positions: 5,
      applicants: 23,
      description: "Work on cutting-edge web applications using React and Node.js",
      requirements: ["React.js", "Node.js", "JavaScript", "Git"],
      postedDate: "2024-03-20",
      deadline: "2024-04-15",
      status: "active",
    },
    {
      id: 2,
      title: "Data Science Intern",
      company: "DataTech Analytics",
      location: "Mumbai",
      duration: "4 months",
      type: "Full-time",
      stipend: "₹20,000/month",
      positions: 3,
      applicants: 18,
      description: "Analyze large datasets and build predictive models",
      requirements: ["Python", "Machine Learning", "SQL", "Statistics"],
      postedDate: "2024-03-18",
      deadline: "2024-04-10",
      status: "active",
    },
    {
      id: 3,
      title: "UI/UX Design Intern",
      company: "Creative Studios",
      location: "Pune",
      duration: "3 months",
      type: "Part-time",
      stipend: "₹15,000/month",
      positions: 2,
      applicants: 12,
      description: "Design user interfaces and improve user experience",
      requirements: ["Figma", "Adobe XD", "Prototyping", "User Research"],
      postedDate: "2024-03-15",
      deadline: "2024-04-05",
      status: "closed",
    },
  ]

  return (
    <DashboardLayout role="tp-officer">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Internship Opportunities</h1>
            <p className="text-gray-600">Manage and post internship opportunities for students</p>
          </div>
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            <Plus className="mr-2 h-4 w-4" />
            Post New Opportunity
          </Button>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search opportunities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Opportunity Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Posted</p>
                  <p className="text-2xl font-bold">45</p>
                </div>
                <Building className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active</p>
                  <p className="text-2xl font-bold text-green-600">28</p>
                </div>
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Applications</p>
                  <p className="text-2xl font-bold text-purple-600">234</p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-orange-600">12</p>
                </div>
                <Plus className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Opportunity Form */}
        {showAddForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Post New Internship Opportunity</CardTitle>
              <CardDescription>Create a new internship posting for students</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="job-title">Job Title</Label>
                  <Input id="job-title" placeholder="e.g., Software Development Intern" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="techcorp">TechCorp Solutions</SelectItem>
                      <SelectItem value="datatech">DataTech Analytics</SelectItem>
                      <SelectItem value="creative">Creative Studios</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="City, State" />
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
                  <Label htmlFor="type">Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stipend">Stipend</Label>
                  <Input id="stipend" placeholder="₹XX,XXX/month" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="positions">Number of Positions</Label>
                  <Input id="positions" type="number" placeholder="e.g., 5" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">Application Deadline</Label>
                  <Input id="deadline" type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Job Description</Label>
                <Textarea id="description" placeholder="Describe the internship role and responsibilities" rows={4} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="requirements">Requirements (comma-separated)</Label>
                <Input id="requirements" placeholder="React.js, Node.js, JavaScript, Git" />
              </div>
              <div className="flex gap-2">
                <Button>Post Opportunity</Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Opportunities List */}
        <div className="space-y-4">
          {opportunities.map((opportunity) => (
            <Card key={opportunity.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{opportunity.title}</h3>
                      <Badge variant={opportunity.status === "active" ? "default" : "secondary"}>
                        {opportunity.status.charAt(0).toUpperCase() + opportunity.status.slice(1)}
                      </Badge>
                      <Badge variant="outline">{opportunity.type}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Building className="h-4 w-4" />
                        <span>{opportunity.company}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{opportunity.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{opportunity.duration}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3">{opportunity.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {opportunity.requirements.map((req, index) => (
                        <Badge key={index} variant="secondary">
                          {req}
                        </Badge>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Stipend:</span> {opportunity.stipend}
                      </div>
                      <div>
                        <span className="font-medium">Positions:</span> {opportunity.positions}
                      </div>
                      <div>
                        <span className="font-medium">Applications:</span> {opportunity.applicants}
                      </div>
                      <div>
                        <span className="font-medium">Deadline:</span>{" "}
                        {new Date(opportunity.deadline).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View Applications
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
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
