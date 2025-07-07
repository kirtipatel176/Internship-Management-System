export interface User {
  id: string
  name: string
  email: string
  role: "student" | "teacher" | "tp-officer" | "admin"
  department?: string
  semester?: number
  rollNumber?: string
}

export interface Student {
  id: number
  name: string
  email: string
  phone: string
  rollNumber: string
  department: string
  semester: number
  company: string
  position: string
  progress: number
  status: "on_track" | "behind" | "completed"
  reportsSubmitted: number
  totalReports: number
  lastActivity: string
  supervisor?: {
    name: string
    email: string
    phone: string
    designation: string
  }
  skills: string[]
  startDate: string
  endDate: string
}

export interface Report {
  id: number
  studentId: number
  studentName: string
  studentEmail: string
  week: number
  title: string
  description: string
  achievements: string[]
  challenges: string[]
  learnings: string[]
  goals: string[]
  status: "pending" | "approved" | "rejected" | "revision_required"
  submittedDate: string
  reviewedDate?: string
  reviewedBy?: string
  feedback?: string
  grade?: string
}

export interface Certificate {
  id: string
  studentId: string
  studentName: string
  certificateType: string
  issuer: string
  issueDate: string
  submittedDate: string
  reviewDate?: string
  reviewedBy?: string
  status: "pending" | "approved" | "rejected"
  comments?: string
}

export interface NOCRequest {
  id: string
  studentId: string
  studentName: string
  companyName: string
  position: string
  duration: string
  startDate: string
  endDate: string
  submittedDate: string
  reviewedBy?: string
  status: "pending" | "approved" | "rejected"
  comments?: string
}

export interface Opportunity {
  id: string
  title: string
  companyName: string
  description: string
  location: string
  duration: string
  stipend?: string
  requirements: string[]
  applicationDeadline: string
  startDate: string
  status: "active" | "closed"
  applicationsCount: number
}

export interface Company {
  id: string
  name: string
  industry: string
  location: string
  contactPerson: string
  email: string
  phone: string
  status: "pending" | "verified" | "rejected"
  registrationDate: string
}

export interface Task {
  id: number
  title: string
  description: string
  type: "assignment" | "report" | "meeting" | "evaluation" | "other"
  assignedTo: "individual" | "all"
  studentId?: number
  studentName?: string
  dueDate: string
  priority: "high" | "medium" | "low"
  status: "pending" | "submitted" | "completed" | "overdue"
  createdBy: string
  createdDate: string
  submissionDate?: string
  feedback?: string
  grade?: string
}

// Mock data
const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@student.edu",
    role: "student",
    department: "Computer Engineering",
    semester: 6,
    rollNumber: "21CE001",
  },
  {
    id: "2",
    name: "Dr. Sarah Wilson",
    email: "sarah.wilson@faculty.edu",
    role: "teacher",
    department: "Computer Engineering",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@admin.edu",
    role: "tp-officer",
  },
  {
    id: "4",
    name: "Admin User",
    email: "admin@system.edu",
    role: "admin",
  },
]

const mockStudents: Student[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@student.edu",
    phone: "+1-234-567-8901",
    rollNumber: "21CE001",
    department: "Computer Engineering",
    semester: 6,
    company: "TechCorp Solutions",
    position: "Software Development Intern",
    progress: 85,
    status: "on_track",
    reportsSubmitted: 8,
    totalReports: 10,
    lastActivity: "2024-01-15",
    supervisor: {
      name: "Alice Johnson",
      email: "alice.johnson@techcorp.com",
      phone: "+1-234-567-8902",
      designation: "Senior Software Engineer",
    },
    skills: ["React", "Node.js", "Python", "SQL"],
    startDate: "2024-01-01",
    endDate: "2024-04-01",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@student.edu",
    phone: "+1-234-567-8903",
    rollNumber: "21CE002",
    department: "Computer Engineering",
    semester: 6,
    company: "DataTech Analytics",
    position: "Data Science Intern",
    progress: 92,
    status: "on_track",
    reportsSubmitted: 9,
    totalReports: 10,
    lastActivity: "2024-01-14",
    supervisor: {
      name: "Bob Wilson",
      email: "bob.wilson@datatech.com",
      phone: "+1-234-567-8904",
      designation: "Data Science Manager",
    },
    skills: ["Python", "Machine Learning", "SQL", "Tableau"],
    startDate: "2024-01-01",
    endDate: "2024-04-01",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@student.edu",
    phone: "+1-234-567-8905",
    rollNumber: "21CE003",
    department: "Computer Engineering",
    semester: 6,
    company: "AI Innovations",
    position: "Machine Learning Intern",
    progress: 78,
    status: "on_track",
    reportsSubmitted: 7,
    totalReports: 10,
    lastActivity: "2024-01-13",
    supervisor: {
      name: "Carol Davis",
      email: "carol.davis@aiinnovations.com",
      phone: "+1-234-567-8906",
      designation: "ML Research Lead",
    },
    skills: ["Python", "TensorFlow", "PyTorch", "Computer Vision"],
    startDate: "2024-01-01",
    endDate: "2024-04-01",
  },
  {
    id: 4,
    name: "Sarah Davis",
    email: "sarah.davis@student.edu",
    phone: "+1-234-567-8907",
    rollNumber: "21CE004",
    department: "Computer Engineering",
    semester: 6,
    company: "WebDev Studios",
    position: "Frontend Developer Intern",
    progress: 65,
    status: "behind",
    reportsSubmitted: 5,
    totalReports: 10,
    lastActivity: "2024-01-10",
    supervisor: {
      name: "David Brown",
      email: "david.brown@webdev.com",
      phone: "+1-234-567-8908",
      designation: "Frontend Team Lead",
    },
    skills: ["React", "JavaScript", "CSS", "HTML"],
    startDate: "2024-01-01",
    endDate: "2024-04-01",
  },
  {
    id: 5,
    name: "Alex Kumar",
    email: "alex.kumar@student.edu",
    phone: "+1-234-567-8909",
    rollNumber: "21CE005",
    department: "Computer Engineering",
    semester: 6,
    company: "CloudTech Inc",
    position: "DevOps Intern",
    progress: 88,
    status: "on_track",
    reportsSubmitted: 8,
    totalReports: 10,
    lastActivity: "2024-01-16",
    supervisor: {
      name: "Emma Wilson",
      email: "emma.wilson@cloudtech.com",
      phone: "+1-234-567-8910",
      designation: "DevOps Manager",
    },
    skills: ["Docker", "Kubernetes", "AWS", "Jenkins"],
    startDate: "2024-01-01",
    endDate: "2024-04-01",
  },
  {
    id: 6,
    name: "Lisa Chen",
    email: "lisa.chen@student.edu",
    phone: "+1-234-567-8911",
    rollNumber: "21CE006",
    department: "Computer Engineering",
    semester: 6,
    company: "MobileTech Solutions",
    position: "Mobile App Developer Intern",
    progress: 95,
    status: "completed",
    reportsSubmitted: 10,
    totalReports: 10,
    lastActivity: "2024-01-17",
    supervisor: {
      name: "Ryan Martinez",
      email: "ryan.martinez@mobiletech.com",
      phone: "+1-234-567-8912",
      designation: "Mobile Development Lead",
    },
    skills: ["React Native", "Flutter", "iOS", "Android"],
    startDate: "2024-01-01",
    endDate: "2024-04-01",
  },
]

const mockReports: Report[] = [
  {
    id: 1,
    studentId: 1,
    studentName: "John Doe",
    studentEmail: "john.doe@student.edu",
    week: 8,
    title: "API Development and Testing",
    description:
      "This week I focused on developing RESTful APIs for the user management system and implementing comprehensive testing strategies.",
    achievements: [
      "Successfully implemented user authentication API",
      "Created comprehensive test suite with 95% coverage",
      "Optimized database queries reducing response time by 40%",
    ],
    challenges: ["Handling complex authentication edge cases", "Debugging asynchronous operations in tests"],
    learnings: [
      "Advanced understanding of JWT token management",
      "Best practices for API security",
      "Effective testing strategies for async operations",
    ],
    goals: ["Implement role-based access control", "Add API rate limiting", "Create API documentation"],
    status: "pending",
    submittedDate: "2024-01-15",
  },
  {
    id: 2,
    studentId: 2,
    studentName: "Jane Smith",
    studentEmail: "jane.smith@student.edu",
    week: 9,
    title: "Data Analysis and Visualization",
    description:
      "Completed analysis of customer behavior data and created interactive dashboards for stakeholder presentations.",
    achievements: [
      "Analyzed 1M+ customer records",
      "Created 5 interactive dashboards",
      "Identified key customer segments",
    ],
    challenges: ["Handling large datasets efficiently", "Creating meaningful visualizations"],
    learnings: ["Advanced Pandas operations", "Tableau dashboard design principles", "Statistical analysis techniques"],
    goals: ["Implement predictive models", "Automate report generation", "Present findings to management"],
    status: "approved",
    submittedDate: "2024-01-14",
    reviewedDate: "2024-01-16",
    reviewedBy: "Dr. Sarah Wilson",
    feedback: "Excellent work on the data analysis. The visualizations are clear and insightful.",
    grade: "A+",
  },
]

const mockCertificates: Certificate[] = [
  {
    id: "cert_001",
    studentId: "1",
    studentName: "John Doe",
    certificateType: "React Development Certification",
    issuer: "TechCorp Solutions",
    issueDate: "2024-01-10",
    submittedDate: "2024-01-12",
    status: "pending",
    comments: "",
  },
  {
    id: "cert_002",
    studentId: "2",
    studentName: "Jane Smith",
    certificateType: "Data Science Professional Certificate",
    issuer: "DataTech Analytics",
    issueDate: "2024-01-08",
    submittedDate: "2024-01-10",
    reviewDate: "2024-01-15",
    reviewedBy: "Dr. Sarah Wilson",
    status: "approved",
    comments: "Excellent achievement in data science fundamentals. Well deserved certification.",
  },
  {
    id: "cert_003",
    studentId: "3",
    studentName: "Mike Johnson",
    certificateType: "Machine Learning Fundamentals",
    issuer: "AI Innovations",
    issueDate: "2024-01-05",
    submittedDate: "2024-01-08",
    reviewDate: "2024-01-12",
    reviewedBy: "Dr. Sarah Wilson",
    status: "rejected",
    comments: "Certificate appears to be incomplete. Please resubmit with proper verification documents.",
  },
  {
    id: "cert_004",
    studentId: "4",
    studentName: "Sarah Davis",
    certificateType: "Frontend Development Bootcamp",
    issuer: "WebDev Studios",
    issueDate: "2024-01-12",
    submittedDate: "2024-01-14",
    status: "pending",
    comments: "",
  },
  {
    id: "cert_005",
    studentId: "5",
    studentName: "Alex Kumar",
    certificateType: "AWS Cloud Practitioner",
    issuer: "CloudTech Inc",
    issueDate: "2024-01-15",
    submittedDate: "2024-01-16",
    reviewDate: "2024-01-17",
    reviewedBy: "Dr. Sarah Wilson",
    status: "approved",
    comments: "Outstanding performance in cloud computing. This certification demonstrates strong technical skills.",
  },
  {
    id: "cert_006",
    studentId: "6",
    studentName: "Lisa Chen",
    certificateType: "Mobile App Development Certificate",
    issuer: "MobileTech Solutions",
    issueDate: "2024-01-16",
    submittedDate: "2024-01-17",
    status: "pending",
    comments: "",
  },
  {
    id: "cert_007",
    studentId: "1",
    studentName: "John Doe",
    certificateType: "Node.js Backend Development",
    issuer: "TechCorp Solutions",
    issueDate: "2024-01-14",
    submittedDate: "2024-01-16",
    reviewDate: "2024-01-17",
    reviewedBy: "Dr. Sarah Wilson",
    status: "approved",
    comments: "Great progress in backend development. Keep up the excellent work!",
  },
  {
    id: "cert_008",
    studentId: "3",
    studentName: "Mike Johnson",
    certificateType: "Python Programming Certificate",
    issuer: "AI Innovations",
    issueDate: "2024-01-13",
    submittedDate: "2024-01-15",
    status: "pending",
    comments: "",
  },
]

const mockTasks: Task[] = [
  {
    id: 1,
    title: "Complete Week 9 Progress Report",
    description: "Submit your weekly progress report including achievements, challenges, and next week's goals.",
    type: "report",
    assignedTo: "individual",
    studentId: 1,
    studentName: "John Doe",
    dueDate: "2024-01-22",
    priority: "high",
    status: "pending",
    createdBy: "Dr. Sarah Wilson",
    createdDate: "2024-01-15",
  },
  {
    id: 2,
    title: "Prepare Mid-term Presentation",
    description:
      "Create a 15-minute presentation covering your internship experience, key learnings, and project outcomes.",
    type: "assignment",
    assignedTo: "all",
    dueDate: "2024-01-25",
    priority: "medium",
    status: "pending",
    createdBy: "Dr. Sarah Wilson",
    createdDate: "2024-01-15",
  },
  {
    id: 3,
    title: "Schedule Supervisor Meeting",
    description: "Arrange a meeting with your industry supervisor to discuss project progress and get feedback.",
    type: "meeting",
    assignedTo: "individual",
    studentId: 2,
    studentName: "Jane Smith",
    dueDate: "2024-01-20",
    priority: "medium",
    status: "completed",
    createdBy: "Dr. Sarah Wilson",
    createdDate: "2024-01-10",
    submissionDate: "2024-01-18",
    feedback: "Great initiative in scheduling regular check-ins with supervisor.",
  },
  {
    id: 4,
    title: "Technical Skills Assessment",
    description: "Complete the online technical assessment covering the skills learned during your internship.",
    type: "evaluation",
    assignedTo: "individual",
    studentId: 3,
    studentName: "Mike Johnson",
    dueDate: "2024-01-18",
    priority: "high",
    status: "overdue",
    createdBy: "Dr. Sarah Wilson",
    createdDate: "2024-01-10",
  },
  {
    id: 5,
    title: "Project Documentation",
    description:
      "Create comprehensive documentation for your internship project including setup and usage instructions.",
    type: "assignment",
    assignedTo: "all",
    dueDate: "2024-01-30",
    priority: "medium",
    status: "pending",
    createdBy: "Dr. Sarah Wilson",
    createdDate: "2024-01-16",
  },
]

const mockOpportunities: Opportunity[] = [
  {
    id: "opp_001",
    title: "Full Stack Developer Intern",
    companyName: "TechCorp Solutions",
    description: "Work on cutting-edge web applications using React, Node.js, and MongoDB.",
    location: "San Francisco, CA",
    duration: "3 months",
    stipend: "$2000/month",
    requirements: ["JavaScript", "React", "Node.js", "Database knowledge"],
    applicationDeadline: "2024-02-15",
    startDate: "2024-03-01",
    status: "active",
    applicationsCount: 25,
  },
  {
    id: "opp_002",
    title: "Data Science Intern",
    companyName: "DataTech Analytics",
    description: "Analyze large datasets and build machine learning models for business insights.",
    location: "New York, NY",
    duration: "4 months",
    stipend: "$2200/month",
    requirements: ["Python", "Machine Learning", "SQL", "Statistics"],
    applicationDeadline: "2024-02-20",
    startDate: "2024-03-15",
    status: "active",
    applicationsCount: 18,
  },
  {
    id: "opp_003",
    title: "Mobile App Developer Intern",
    companyName: "MobileTech Solutions",
    description: "Develop cross-platform mobile applications using React Native and Flutter.",
    location: "Austin, TX",
    duration: "3 months",
    stipend: "$1800/month",
    requirements: ["React Native", "Flutter", "Mobile Development", "UI/UX"],
    applicationDeadline: "2024-02-10",
    startDate: "2024-02-25",
    status: "active",
    applicationsCount: 12,
  },
  {
    id: "opp_004",
    title: "DevOps Engineer Intern",
    companyName: "CloudTech Inc",
    description: "Learn cloud infrastructure management and CI/CD pipeline development.",
    location: "Seattle, WA",
    duration: "4 months",
    stipend: "$2100/month",
    requirements: ["Docker", "Kubernetes", "AWS", "Linux"],
    applicationDeadline: "2024-02-25",
    startDate: "2024-03-10",
    status: "active",
    applicationsCount: 8,
  },
]

// Helper functions
export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null
  const userStr = localStorage.getItem("user")
  return userStr ? JSON.parse(userStr) : null
}

export function setCurrentUser(user: User): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user))
  }
}

export function getTeacherStudents(teacherEmail: string): Student[] {
  return mockStudents
}

export function getReportsForTeacher(teacherId: string): Report[] {
  return mockReports
}

export function getTeacherDashboardData(teacherEmail: string) {
  return {
    profile: {
      name: "Dr. Sarah Wilson",
      department: "Computer Engineering",
      designation: "Associate Professor",
      employeeId: "EMP001",
    },
    stats: {
      totalStudents: 25,
      pendingReports: 8,
      approvedCertificates: 15,
      completedInternships: 12,
      upcomingMeetings: 3,
      thisWeekTasks: 5,
    },
    recentActivities: [
      { id: 1, student: "John Doe", action: "Week 8 Report submitted", date: "2024-01-15", status: "pending" },
      {
        id: 2,
        student: "Jane Smith",
        action: "Data Analysis Certificate approved",
        date: "2024-01-14",
        status: "approved",
      },
      {
        id: 3,
        student: "Mike Johnson",
        action: "Internship at AI Innovations started",
        date: "2024-01-12",
        status: "active",
      },
      {
        id: 4,
        student: "Sarah Johnson",
        action: "Weekly review meeting scheduled",
        date: "2024-01-11",
        status: "scheduled",
      },
      { id: 5, student: "Alex Kumar", action: "Mid-term evaluation submitted", date: "2024-01-10", status: "pending" },
    ],
    pendingTasks: [
      { id: 1, task: "Review weekly reports", count: 5, priority: "high", type: "reports" },
      { id: 2, task: "Approve certificates", count: 3, priority: "medium", type: "certificates" },
      { id: 3, task: "Schedule meetings", count: 2, priority: "low", type: "meetings" },
      { id: 4, task: "Grade submissions", count: 4, priority: "high", type: "grading" },
      { id: 5, task: "Update student progress", count: 6, priority: "medium", type: "progress" },
    ],
    studentProgress: [
      { id: 1, name: "John Doe", company: "TechCorp Solutions", progress: 85, status: "excellent" },
      { id: 2, name: "Jane Smith", company: "DataTech Inc", progress: 78, status: "good" },
      { id: 3, name: "Mike Wilson", company: "AI Innovations", progress: 92, status: "excellent" },
      { id: 4, name: "Sarah Johnson", company: "WebDev Studios", progress: 65, status: "average" },
    ],
  }
}

export function getReportsByStudent(studentId: string): Report[] {
  return mockReports.filter((report) => report.studentId.toString() === studentId)
}

export function getCertificatesByStudent(studentId: string): Certificate[] {
  return mockCertificates.filter((cert) => cert.studentId === studentId)
}

export function getNOCRequestsByStudent(studentId: string): NOCRequest[] {
  return []
}

export function getActiveOpportunities(): Opportunity[] {
  return mockOpportunities
}

export function getAllCompanies(): Company[] {
  return []
}

export function getAllNOCRequests(): NOCRequest[] {
  return []
}

export function getAllUsers(): User[] {
  return mockUsers
}

export function getTPOfficerDashboardData() {
  return {
    stats: {
      totalCompanies: 15,
      verifiedCompanies: 12,
      activeOpportunities: 8,
      pendingNOCs: 5,
      totalApplications: 156,
    },
    recentActivities: [
      { id: 1, type: "company", title: "AI Innovations verified", date: "2024-01-15", status: "approved" },
      { id: 2, type: "opportunity", title: "New ML internship posted", date: "2024-01-14", status: "active" },
      { id: 3, type: "noc", title: "NOC approved for John Doe", date: "2024-01-12", status: "approved" },
      { id: 4, type: "company", title: "WebDev Studios under review", date: "2024-01-10", status: "pending" },
    ],
  }
}

export function getAdminDashboardData() {
  return {
    stats: {
      totalUsers: 156,
      totalStudents: 120,
      totalTeachers: 25,
      systemHealth: 98,
      activeInternships: 45,
    },
    recentLogs: [
      {
        id: 1,
        action: "User login",
        user: "john.doe@student.edu",
        timestamp: "2024-01-15 10:30:00",
        status: "success",
      },
      {
        id: 2,
        action: "Report submission",
        user: "jane.smith@student.edu",
        timestamp: "2024-01-15 09:45:00",
        status: "success",
      },
      {
        id: 3,
        action: "NOC approval",
        user: "david.johnson@admin.edu",
        timestamp: "2024-01-15 09:15:00",
        status: "success",
      },
      {
        id: 4,
        action: "Failed login attempt",
        user: "unknown@domain.com",
        timestamp: "2024-01-15 08:30:00",
        status: "failed",
      },
      {
        id: 5,
        action: "Certificate upload",
        user: "mike.wilson@student.edu",
        timestamp: "2024-01-15 08:00:00",
        status: "success",
      },
    ],
  }
}

export function getCertificatesForTeacher(teacherEmail: string): Certificate[] {
  return mockCertificates
}

export function getTeacherMeetings(teacherEmail: string) {
  return []
}

export function getTeacherAnalytics(teacherEmail: string) {
  return {
    totalStudents: 25,
    reportsReviewed: 45,
    certificatesApproved: 15,
    avgResponseTime: 2.5,
    gradeDistribution: [
      { grade: "A+", count: 8, percentage: 32 },
      { grade: "A", count: 10, percentage: 40 },
      { grade: "B+", count: 5, percentage: 20 },
      { grade: "B", count: 2, percentage: 8 },
    ],
    monthlyActivity: [
      { month: "Jan", reviews: 15 },
      { month: "Feb", reviews: 12 },
      { month: "Mar", reviews: 18 },
    ],
    studentStatus: {
      onTrack: 20,
      needAttention: 3,
      completed: 2,
    },
    thisWeek: { reports: 8 },
    thisMonth: { certificates: 5 },
    efficiency: 94,
  }
}

// CRUD operations for tasks
export function createTask(taskData: Partial<Task>): Task {
  const newTask: Task = {
    id: Date.now(),
    title: taskData.title || "",
    description: taskData.description || "",
    type: taskData.type || "other",
    assignedTo: taskData.assignedTo || "individual",
    studentId: taskData.studentId,
    studentName: taskData.studentName,
    dueDate: taskData.dueDate || "",
    priority: taskData.priority || "medium",
    status: "pending",
    createdBy: taskData.createdBy || "",
    createdDate: new Date().toISOString(),
  }
  mockTasks.push(newTask)
  return newTask
}

export function updateTask(taskId: number, updates: Partial<Task>): Task | null {
  const taskIndex = mockTasks.findIndex((task) => task.id === taskId)
  if (taskIndex === -1) return null

  mockTasks[taskIndex] = { ...mockTasks[taskIndex], ...updates }
  return mockTasks[taskIndex]
}

export function deleteTask(taskId: number): boolean {
  const taskIndex = mockTasks.findIndex((task) => task.id === taskId)
  if (taskIndex === -1) return false

  mockTasks.splice(taskIndex, 1)
  return true
}

export function getTasksForTeacher(teacherId: string): Task[] {
  return mockTasks
}

export function getTasksForStudent(studentId: string): Task[] {
  return mockTasks.filter((task) => task.assignedTo === "all" || task.studentId?.toString() === studentId)
}

// Other CRUD operations
export function createWeeklyReport(reportData: any) {
  const newReport = {
    id: Date.now(),
    ...reportData,
    status: "pending",
    submittedDate: new Date().toISOString(),
  }
  return newReport
}

export function createCertificate(certData: any) {
  const newCert = {
    id: Date.now().toString(),
    ...certData,
    status: "pending",
    submittedDate: new Date().toISOString(),
  }
  return newCert
}

export function createNOCRequest(nocData: any) {
  const newNOC = {
    id: Date.now().toString(),
    ...nocData,
    status: "pending",
    submittedDate: new Date().toISOString(),
  }
  return newNOC
}

export function createApplication(appData: any) {
  // Mock application creation
  return { id: Date.now().toString(), ...appData }
}

export function approveReport(reportId: number, teacherId: string, feedback: string, grade: string) {
  // Mock approval
  return Promise.resolve()
}

export function rejectReport(reportId: number, teacherId: string, feedback: string) {
  // Mock rejection
  return Promise.resolve()
}

export function requestRevision(reportId: number, teacherId: string, feedback: string) {
  // Mock revision request
  return Promise.resolve()
}

export function approveCertificate(certId: string, feedback: string) {
  // Mock approval
  return Promise.resolve()
}

export function rejectCertificate(certId: string, feedback: string) {
  // Mock rejection
  return Promise.resolve()
}

export function scheduleMeeting(meetingData: any) {
  // Mock meeting scheduling
  return Promise.resolve({ id: Date.now(), ...meetingData })
}

export function updateMeeting(meetingId: number, meetingData: any) {
  // Mock meeting update
  return Promise.resolve()
}

export function deleteMeeting(meetingId: number) {
  // Mock meeting deletion
  return Promise.resolve()
}
