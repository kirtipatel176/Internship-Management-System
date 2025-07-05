"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Calendar, Building, ExternalLink } from "lucide-react"
import { useState } from "react"

export default function StudentOpportunities() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterLocation, setFilterLocation] = useState("all")
  const [filterDuration, setFilterDuration] = useState("all")

  const opportunities = [
    {
      id: 1,
      title: "Software Development Intern",
      company: "TechCorp Solutions",
      location: "Bangalore",
      duration: "6 months",
      type: "Full-time",
      description: "Work on cutting-edge web applications using React and Node.js",
      requirements: ["React.js", "Node.js", "JavaScript", "Git"],
      postedDate: "2024-03-20",
      deadline: "2024-04-15",
      verified: true,
    },
    {
      id: 2,
      title: "Data Science Intern",
      company: "DataTech Analytics",
      location: "Mumbai",
      duration: "4 months",
      type: "Full-time",
      description: "Analyze large datasets and build predictive models",
      requirements: ["Python", "Machine Learning", "SQL", "Statistics"],
      postedDate: "2024-03-18",
      deadline: "2024-04-10",
      verified: true,
    },
    {
      id: 3,
      title: "UI/UX Design Intern",
      company: "Creative Studios",
      location: "Pune",
      duration: "3 months",
      type: "Part-time",
      description: "Design user interfaces and improve user experience",
      requirements: ["Figma", "Adobe XD", "Prototyping", "User Research"],
      postedDate: "2024-03-15",
      deadline: "2024-04-05",
      verified: true,
    },
  ]

  return (
    <DashboardLayout role="student">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Internship Opportunities</h1>
          <p className="text-gray-600">Discover and apply for verified internship positions</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search opportunities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterLocation} onValueChange={setFilterLocation}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="bangalore">Bangalore</SelectItem>
                  <SelectItem value="mumbai">Mumbai</SelectItem>
                  <SelectItem value="pune">Pune</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterDuration} onValueChange={setFilterDuration}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Durations</SelectItem>
                  <SelectItem value="3">3 months</SelectItem>
                  <SelectItem value="4">4 months</SelectItem>
                  <SelectItem value="6">6 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Opportunities List */}
        <div className="space-y-4">
          {opportunities.map((opportunity) => (
            <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{opportunity.title}</h3>
                      {opportunity.verified && (
                        <Badge variant="default" className="bg-green-600">
                          Verified
                        </Badge>
                      )}
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
                    <div className="text-sm text-gray-500">
                      Posted: {new Date(opportunity.postedDate).toLocaleDateString()} • Deadline:{" "}
                      {new Date(opportunity.deadline).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <Button>
                      Apply Now
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="outline">View Details</Button>
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
