import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, CheckCircle, AlertCircle, FileText, BadgeIcon as Certificate, Clock, Trash2 } from "lucide-react"

export default function StudentNotifications() {
  const notifications = [
    {
      id: 1,
      type: "approval",
      title: "NOC Request Approved",
      message: "Your NOC request for TechCorp Solutions has been approved by the T&P Officer.",
      timestamp: "2024-03-25T10:30:00Z",
      read: false,
      icon: CheckCircle,
      iconColor: "text-green-600",
    },
    {
      id: 2,
      type: "feedback",
      title: "Weekly Report Feedback",
      message: "Dr. Smith has provided feedback on your Week 8 report. Please check the comments.",
      timestamp: "2024-03-24T14:15:00Z",
      read: false,
      icon: FileText,
      iconColor: "text-blue-600",
    },
    {
      id: 3,
      type: "reminder",
      title: "Report Submission Due",
      message: "Your Week 9 report is due in 2 days. Don't forget to submit it on time.",
      timestamp: "2024-03-23T09:00:00Z",
      read: true,
      icon: Clock,
      iconColor: "text-orange-600",
    },
    {
      id: 4,
      type: "certificate",
      title: "Certificate Approved",
      message: "Your internship completion certificate has been approved by Dr. Smith.",
      timestamp: "2024-03-22T16:45:00Z",
      read: true,
      icon: Certificate,
      iconColor: "text-purple-600",
    },
    {
      id: 5,
      type: "revision",
      title: "Report Revision Required",
      message: "Your Week 7 report needs revision. Please check the feedback and resubmit.",
      timestamp: "2024-03-20T11:20:00Z",
      read: true,
      icon: AlertCircle,
      iconColor: "text-red-600",
    },
  ]

  return (
    <DashboardLayout role="student">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600">Stay updated with your internship progress and important announcements</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Mark All as Read</Button>
            <Button variant="outline">
              <Trash2 className="mr-2 h-4 w-4" />
              Clear All
            </Button>
          </div>
        </div>

        {/* Notification Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Unread</p>
                  <p className="text-2xl font-bold text-orange-600">2</p>
                </div>
                <Bell className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Today</p>
                  <p className="text-2xl font-bold text-blue-600">3</p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">5</p>
                </div>
                <Bell className="h-8 w-8 text-gray-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.map((notification) => {
            const Icon = notification.icon
            return (
              <Card
                key={notification.id}
                className={`${!notification.read ? "border-l-4 border-l-blue-500 bg-blue-50/30" : ""}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-full bg-gray-100 ${notification.iconColor}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-semibold text-gray-900">{notification.title}</h3>
                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <Badge variant="default" className="text-xs">
                              New
                            </Badge>
                          )}
                          <span className="text-xs text-gray-500">
                            {new Date(notification.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{notification.message}</p>
                      <div className="flex items-center gap-2 mt-2">
                        {!notification.read && (
                          <Button variant="outline" size="sm">
                            Mark as Read
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </DashboardLayout>
  )
}
