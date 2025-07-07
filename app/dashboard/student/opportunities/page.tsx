"use client"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building, MapPin, Calendar, Clock, Search, Briefcase } from "lucide-react"
import { useState, useEffect } from "react"
import { getActiveOpportunities, createApplication, getCurrentUser } from "@/lib/data"
import { useToast } from "@/hooks/use-toast"

export default function StudentOpportunities() {
  const [opportunities, setOpportunities] = useState([])
  const [filteredOpportunities, setFilteredOpportunities] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [durationFilter, setDurationFilter] = useState("all")
  const { toast } = useToast()

  useEffect(() => {
    const loadOpportunities = () => {
      const allOpportunities = getActiveOpportunities()
      setOpportunities(allOpportunities)
      setFilteredOpportunities(allOpportunities)
    }

    loadOpportunities()
  }, [])

  useEffect(() => {
    let filtered = opportunities

    if (searchTerm) {
      filtered = filtered.filter(
        (opp) =>
          opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          opp.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          opp.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (locationFilter !== "all") {
      filtered = filtered.filter((opp) => opp.location.includes(locationFilter))
    }

    if (durationFilter !== "all") {
      filtered = filtered.filter((opp) => opp.duration.includes(durationFilter))
    }

    setFilteredOpportunities(filtered)
  }, [searchTerm, locationFilter, durationFilter, opportunities])

  const handleApply = (opportunityId: string) => {
    const user = getCurrentUser()
    if (!user) {
      toast({
        title: "Error",
        description: "Please log in to apply for opportunities.",
        variant: "destructive",
      })
      return
    }

    try {
      createApplication({
        opportunityId,
        studentId: user.id,
        studentName: user.name,
      })

      toast({
        title: "Application Submitted",
        description: "Your application has been submitted successfully!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      })
    }
  }

  const locations = [...new Set(opportunities.map((opp) => opp.location))]
  const durations = [...new Set(opportunities.map((opp) => opp.duration))]

  return (
    <AuthGuard allowedRoles={["student"]}>
      <DashboardLayout>
        <div className="space-y-6 p-4 sm:p-6">
          <div className="flex flex-col space-y-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Internship Opportunities</h1>
              <p className="text-gray-600">Discover and apply for exciting internship opportunities</p>
            </div>

            {/* Search and Filters */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search opportunities..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                    <Select value={locationFilter} onValueChange={setLocationFilter}>
                      <SelectTrigger className="w-full sm:w-40">
                        <SelectValue placeholder="Location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        {locations.map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={durationFilter} onValueChange={setDurationFilter}>
                      <SelectTrigger className="w-full sm:w-40">
                        <SelectValue placeholder="Duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Durations</SelectItem>
                        {durations.map((duration) => (
                          <SelectItem key={duration} value={duration}>
                            {duration}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Opportunities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredOpportunities.map((opportunity) => (
              <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg line-clamp-2">{opportunity.title}</CardTitle>
                    <Badge variant="outline" className="ml-2 text-xs">
                      {opportunity.duration}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center gap-1">
                    <Building className="h-4 w-4" />
                    {opportunity.companyName}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 line-clamp-3">{opportunity.description}</p>

                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <MapPin className="h-3 w-3" />
                      <span>{opportunity.location}</span>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="h-3 w-3" />
                      <span>Deadline: {new Date(opportunity.applicationDeadline).toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>Starts: {new Date(opportunity.startDate).toLocaleDateString()}</span>
                    </div>

                    {opportunity.stipend && (
                      <div className="text-sm font-medium text-green-600">Stipend: {opportunity.stipend}</div>
                    )}

                    <div className="flex flex-wrap gap-1">
                      {opportunity.requirements.slice(0, 3).map((req, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                      {opportunity.requirements.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{opportunity.requirements.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <span className="text-xs text-gray-500">{opportunity.applicationsCount} applications</span>
                      <Button size="sm" onClick={() => handleApply(opportunity.id)}>
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredOpportunities.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Briefcase className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500 mb-2">No opportunities found</p>
                <p className="text-sm text-gray-400">
                  Try adjusting your search criteria or check back later for new opportunities
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
