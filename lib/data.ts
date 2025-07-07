export interface Student {
  id: number
  name: string
  email: string
  rollNumber: string
  department: string
  semester: string
  phone: string
  teacherId: number
  company?: string
  position?: string
  status: "active" | "inactive" | "completed"
  progress: number
  reportsSubmitted: number
  totalReports: number
  lastActivity: string
  cgpa: number
  profileImage?: string
  address: string
  parentPhone: string
  skills: string[]
  internshipStartDate?: string
  internshipEndDate?: string
}

export interface WeeklyReport {
  id: number
  studentId: number
  studentName: string
  studentEmail: string
  teacherId: number
  week: number
  title: string
  description: string
  achievements: string[]
  submittedAt: string
  status: "pending" | "approved" | "rejected" | "revision_required"
  grade?: string
  feedback?: string
  reviewedBy?: string
  reviewedAt?: string
  fileName: string
  company: string
  hoursWorked: number
  challenges: string
  nextWeekPlan: string
}

export interface Certificate {
  id: number
  studentId: number
  studentName: string
  studentEmail: string
  teacherId: number
  internshipTitle: string
  company: string
  duration: string
  startDate: string
  endDate: string
  uploadDate: string
  status: "pending" | "approved" | "rejected"
  approvedBy?: string
  approvedDate?: string
  feedback?: string
  fileName: string
  grade: string
  supervisorName: string
  supervisorEmail: string
  skills: string[]
  projects: string[]
}

export interface NOCRequest {
  id: number
  studentId: number
  studentName: string
  studentEmail: string
  company: string
  position: string
  startDate: string
  endDate: string
  stipend: number
  location: string
  description: string
  submittedAt: string
  status: "pending" | "approved" | "rejected"
  reviewedBy?: string
  reviewedAt?: string
  feedback?: string
  duration: string
  documents: string[]
}

export interface AssignedTask {
  id: number
  teacherId: number
  title: string
  description: string
  dueDate: string
  fileName?: string
  assignedStudents: number[]
  createdAt: string
  updatedAt: string
  isDeleted: boolean
  priority: "low" | "medium" | "high"
  category: "report" | "presentation" | "documentation" | "meeting"
}

export interface TaskStatus {
  id: number
  taskId: number
  studentId: number
  status: "assigned" | "seen" | "completed"
  completedAt?: string
  submissionFile?: string
  notes?: string
}

export interface Company {
  id: number
  name: string
  email: string
  website: string
  industry: string
  location: string
  description: string
  verificationStatus: "pending" | "verified" | "rejected"
  verifiedBy?: string
  verifiedAt?: string
  contactPerson: string
  contactPhone: string
  contactEmail: string
  establishedYear: number
  employeeCount: string
  submittedAt: string
  address: string
  logoUrl?: string
  benefits: string[]
  workCulture: string
}

export interface Opportunity {
  id: number
  companyId: number
  companyName: string
  title: string
  description: string
  requirements: string[]
  skills: string[]
  location: string
  duration: string
  stipend: number
  type: "internship" | "job"
  status: "active" | "inactive" | "expired"
  postedBy: string
  postedAt: string
  deadline: string
  positions: number
  applicants: number
  verified: boolean
  workMode: "onsite" | "remote" | "hybrid"
  benefits: string[]
}

export interface User {
  id: number
  name: string
  email: string
  role: "student" | "teacher" | "tp-officer" | "admin"
  department?: string
  rollNumber?: string
  employeeId?: string
  phone: string
  status: "active" | "inactive"
  lastLogin: string
  createdAt: string
  profileImage?: string
  address?: string
  designation?: string
}

export interface SystemLog {
  id: number
  userId: number
  userName: string
  action: string
  details: string
  timestamp: string
  ipAddress: string
  userAgent: string
  status: "success" | "error" | "warning"
  module: string
}

export interface Application {
  id: number
  opportunityId: number
  studentId: number
  studentName: string
  studentEmail: string
  coverLetter: string
  resumeFileName: string
  appliedAt: string
  status: "pending" | "shortlisted" | "rejected" | "selected"
  reviewedBy?: string
  reviewedAt?: string
  feedback?: string
}

// Expanded Mock Data
const mockStudents: Student[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@charusat.edu.in",
    rollNumber: "21CE001",
    department: "Computer Engineering",
    semester: "6th",
    phone: "+91 9876543210",
    teacherId: 2,
    company: "TechCorp Solutions",
    position: "Software Developer Intern",
    status: "active",
    progress: 75,
    reportsSubmitted: 8,
    totalReports: 12,
    lastActivity: "2024-01-15",
    cgpa: 8.5,
    address: "123 Main Street, Ahmedabad, Gujarat",
    parentPhone: "+91 9876543200",
    skills: ["React.js", "Node.js", "MongoDB", "JavaScript", "Python"],
    internshipStartDate: "2024-01-15",
    internshipEndDate: "2024-07-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@charusat.edu.in",
    rollNumber: "21CE002",
    department: "Computer Engineering",
    semester: "6th",
    phone: "+91 9876543211",
    teacherId: 2,
    company: "DataTech Analytics",
    position: "Data Analyst Intern",
    status: "active",
    progress: 90,
    reportsSubmitted: 10,
    totalReports: 12,
    lastActivity: "2024-01-14",
    cgpa: 9.1,
    address: "456 Park Avenue, Vadodara, Gujarat",
    parentPhone: "+91 9876543201",
    skills: ["Python", "SQL", "Tableau", "Machine Learning", "Statistics"],
    internshipStartDate: "2024-01-10",
    internshipEndDate: "2024-07-10",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@charusat.edu.in",
    rollNumber: "21CE003",
    department: "Computer Engineering",
    semester: "6th",
    phone: "+91 9876543212",
    teacherId: 2,
    company: "WebTech Solutions",
    position: "Frontend Developer Intern",
    status: "active",
    progress: 65,
    reportsSubmitted: 7,
    totalReports: 12,
    lastActivity: "2024-01-12",
    cgpa: 7.8,
    address: "789 Tech Park, Gandhinagar, Gujarat",
    parentPhone: "+91 9876543202",
    skills: ["HTML", "CSS", "JavaScript", "React.js", "Vue.js"],
    internshipStartDate: "2024-01-05",
    internshipEndDate: "2024-07-05",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah.wilson@charusat.edu.in",
    rollNumber: "21CE004",
    department: "Computer Engineering",
    semester: "6th",
    phone: "+91 9876543213",
    teacherId: 3,
    company: "Microsoft India",
    position: "Software Engineer Intern",
    status: "completed",
    progress: 100,
    reportsSubmitted: 12,
    totalReports: 12,
    lastActivity: "2024-01-10",
    cgpa: 9.3,
    address: "321 Innovation Hub, Bangalore, Karnataka",
    parentPhone: "+91 9876543203",
    skills: ["C#", ".NET", "Azure", "SQL Server", "DevOps"],
    internshipStartDate: "2023-12-01",
    internshipEndDate: "2024-06-01",
  },
  {
    id: 5,
    name: "Alex Brown",
    email: "alex.brown@charusat.edu.in",
    rollNumber: "21CE005",
    department: "Computer Engineering",
    semester: "6th",
    phone: "+91 9876543214",
    teacherId: 2,
    company: "Google India",
    position: "ML Engineer Intern",
    status: "active",
    progress: 55,
    reportsSubmitted: 6,
    totalReports: 12,
    lastActivity: "2024-01-13",
    cgpa: 8.8,
    address: "654 Silicon Valley, Hyderabad, Telangana",
    parentPhone: "+91 9876543204",
    skills: ["Python", "TensorFlow", "PyTorch", "Machine Learning", "Deep Learning"],
    internshipStartDate: "2024-02-01",
    internshipEndDate: "2024-08-01",
  },
  {
    id: 6,
    name: "Emily Davis",
    email: "emily.davis@charusat.edu.in",
    rollNumber: "21CE006",
    department: "Computer Engineering",
    semester: "6th",
    phone: "+91 9876543215",
    teacherId: 3,
    company: "Amazon India",
    position: "Cloud Engineer Intern",
    status: "active",
    progress: 80,
    reportsSubmitted: 9,
    totalReports: 12,
    lastActivity: "2024-01-16",
    cgpa: 8.9,
    address: "987 Cloud Street, Pune, Maharashtra",
    parentPhone: "+91 9876543205",
    skills: ["AWS", "Docker", "Kubernetes", "Linux", "Python"],
    internshipStartDate: "2024-01-08",
    internshipEndDate: "2024-07-08",
  },
  {
    id: 7,
    name: "David Lee",
    email: "david.lee@charusat.edu.in",
    rollNumber: "21CE007",
    department: "Computer Engineering",
    semester: "6th",
    phone: "+91 9876543216",
    teacherId: 2,
    company: "Flipkart",
    position: "Backend Developer Intern",
    status: "active",
    progress: 70,
    reportsSubmitted: 8,
    totalReports: 12,
    lastActivity: "2024-01-11",
    cgpa: 8.2,
    address: "147 E-commerce Plaza, Chennai, Tamil Nadu",
    parentPhone: "+91 9876543206",
    skills: ["Java", "Spring Boot", "MySQL", "Redis", "Microservices"],
    internshipStartDate: "2024-01-12",
    internshipEndDate: "2024-07-12",
  },
  {
    id: 8,
    name: "Lisa Chen",
    email: "lisa.chen@charusat.edu.in",
    rollNumber: "21CE008",
    department: "Computer Engineering",
    semester: "6th",
    phone: "+91 9876543217",
    teacherId: 3,
    company: "Zomato",
    position: "Mobile App Developer Intern",
    status: "active",
    progress: 60,
    reportsSubmitted: 7,
    totalReports: 12,
    lastActivity: "2024-01-09",
    cgpa: 8.6,
    address: "258 Food Tech Avenue, Gurgaon, Haryana",
    parentPhone: "+91 9876543207",
    skills: ["React Native", "Flutter", "Firebase", "JavaScript", "Dart"],
    internshipStartDate: "2024-01-20",
    internshipEndDate: "2024-07-20",
  },
  {
    id: 9,
    name: "Ryan Miller",
    email: "ryan.miller@charusat.edu.in",
    rollNumber: "21CE009",
    department: "Computer Engineering",
    semester: "6th",
    phone: "+91 9876543218",
    teacherId: 2,
    company: "Paytm",
    position: "FinTech Developer Intern",
    status: "active",
    progress: 45,
    reportsSubmitted: 5,
    totalReports: 12,
    lastActivity: "2024-01-08",
    cgpa: 7.9,
    address: "369 FinTech Hub, Noida, Uttar Pradesh",
    parentPhone: "+91 9876543208",
    skills: ["Node.js", "Express.js", "MongoDB", "Payment APIs", "Security"],
    internshipStartDate: "2024-02-05",
    internshipEndDate: "2024-08-05",
  },
  {
    id: 10,
    name: "Emma Wilson",
    email: "emma.wilson@charusat.edu.in",
    rollNumber: "21CE010",
    department: "Computer Engineering",
    semester: "6th",
    phone: "+91 9876543219",
    teacherId: 3,
    company: "Swiggy",
    position: "Product Manager Intern",
    status: "active",
    progress: 85,
    reportsSubmitted: 10,
    totalReports: 12,
    lastActivity: "2024-01-17",
    cgpa: 9.0,
    address: "741 Product Lane, Mumbai, Maharashtra",
    parentPhone: "+91 9876543209",
    skills: ["Product Management", "Analytics", "SQL", "A/B Testing", "User Research"],
    internshipStartDate: "2024-01-03",
    internshipEndDate: "2024-07-03",
  },
]

const mockReports: WeeklyReport[] = [
  {
    id: 1,
    studentId: 1,
    studentName: "John Doe",
    studentEmail: "john.doe@charusat.edu.in",
    teacherId: 2,
    week: 8,
    title: "Database Optimization and Performance Tuning",
    description:
      "This week I focused on optimizing database queries and improving application performance. I worked on indexing strategies, query optimization, and implemented caching mechanisms to reduce database load.",
    achievements: [
      "Optimized 15 critical database queries reducing execution time by 60%",
      "Implemented Redis caching reducing API response time by 40%",
      "Created database indexing strategy improving search performance",
      "Documented optimization techniques for team reference",
    ],
    submittedAt: "2024-01-15T10:30:00Z",
    status: "pending",
    fileName: "week8_report_john_doe.pdf",
    company: "TechCorp Solutions",
    hoursWorked: 45,
    challenges: "Understanding complex query execution plans and identifying bottlenecks in legacy code",
    nextWeekPlan: "Focus on implementing microservices architecture and API gateway setup",
  },
  {
    id: 2,
    studentId: 2,
    studentName: "Jane Smith",
    studentEmail: "jane.smith@charusat.edu.in",
    teacherId: 2,
    week: 10,
    title: "Advanced Machine Learning Model Development",
    description:
      "Developed and deployed a sophisticated customer segmentation model using advanced ML techniques. Implemented feature engineering, model selection, and hyperparameter tuning to achieve optimal performance.",
    achievements: [
      "Built customer segmentation model with 92% accuracy using ensemble methods",
      "Implemented automated feature engineering pipeline",
      "Created comprehensive data visualization dashboard using Plotly",
      "Deployed model to production with monitoring and alerting",
      "Presented findings to senior management team",
    ],
    submittedAt: "2024-01-14T14:20:00Z",
    status: "approved",
    grade: "A+",
    feedback:
      "Outstanding work on the ML model. Your approach to feature engineering and model validation is exemplary. The presentation to management was highly appreciated.",
    reviewedBy: "Dr. Sarah Wilson",
    reviewedAt: "2024-01-15T09:15:00Z",
    fileName: "week10_report_jane_smith.pdf",
    company: "DataTech Analytics",
    hoursWorked: 48,
    challenges: "Handling imbalanced datasets and ensuring model interpretability for business stakeholders",
    nextWeekPlan: "Work on real-time prediction system and A/B testing framework",
  },
  {
    id: 3,
    studentId: 3,
    studentName: "Mike Johnson",
    studentEmail: "mike.johnson@charusat.edu.in",
    teacherId: 2,
    week: 7,
    title: "React Component Library Development",
    description:
      "Created a comprehensive component library for the company's design system. Focused on reusability, accessibility, and performance optimization.",
    achievements: [
      "Developed 25+ reusable React components following design system",
      "Implemented comprehensive unit tests with 95% coverage",
      "Created Storybook documentation for all components",
      "Set up automated testing and deployment pipeline",
    ],
    submittedAt: "2024-01-12T16:45:00Z",
    status: "revision_required",
    feedback:
      "Good progress on component development. Please add more accessibility features and improve TypeScript type definitions. Also, consider adding more interactive examples in Storybook.",
    reviewedBy: "Dr. Sarah Wilson",
    reviewedAt: "2024-01-13T11:20:00Z",
    fileName: "week7_report_mike_johnson.pdf",
    company: "WebTech Solutions",
    hoursWorked: 42,
    challenges: "Ensuring cross-browser compatibility and implementing complex accessibility requirements",
    nextWeekPlan: "Address feedback on accessibility, improve TypeScript definitions, and add more Storybook examples",
  },
  {
    id: 4,
    studentId: 4,
    studentName: "Sarah Wilson",
    studentEmail: "sarah.wilson@charusat.edu.in",
    teacherId: 3,
    week: 12,
    title: "Final Project: Enterprise Cloud Migration",
    description:
      "Successfully completed the migration of legacy applications to Azure cloud platform. Implemented DevOps practices, monitoring, and security best practices.",
    achievements: [
      "Migrated 5 legacy applications to Azure with zero downtime",
      "Implemented CI/CD pipelines reducing deployment time by 80%",
      "Set up comprehensive monitoring and alerting system",
      "Achieved 99.9% uptime for all migrated applications",
      "Reduced infrastructure costs by 35%",
      "Mentored 2 junior developers on cloud technologies",
    ],
    submittedAt: "2024-01-10T18:30:00Z",
    status: "approved",
    grade: "A+",
    feedback:
      "Exceptional work throughout the internship. Your technical leadership and project management skills are outstanding. The cloud migration project exceeded all expectations.",
    reviewedBy: "Dr. Michael Brown",
    reviewedAt: "2024-01-11T10:15:00Z",
    fileName: "week12_report_sarah_wilson.pdf",
    company: "Microsoft India",
    hoursWorked: 50,
    challenges: "Managing complex dependencies during migration and ensuring security compliance",
    nextWeekPlan: "Internship completed successfully. Preparing final presentation and documentation handover.",
  },
  {
    id: 5,
    studentId: 5,
    studentName: "Alex Brown",
    studentEmail: "alex.brown@charusat.edu.in",
    teacherId: 2,
    week: 6,
    title: "Computer Vision Model for Image Classification",
    description:
      "Developed a state-of-the-art computer vision model for product image classification. Implemented transfer learning and data augmentation techniques.",
    achievements: [
      "Built CNN model achieving 89% accuracy on product classification",
      "Implemented data augmentation pipeline increasing dataset size by 300%",
      "Used transfer learning with pre-trained ResNet model",
      "Created automated model evaluation and comparison framework",
    ],
    submittedAt: "2024-01-13T12:15:00Z",
    status: "approved",
    grade: "A",
    feedback:
      "Excellent work on the computer vision model. Your understanding of deep learning concepts is impressive. Consider exploring attention mechanisms for further improvement.",
    reviewedBy: "Dr. Sarah Wilson",
    reviewedAt: "2024-01-14T14:30:00Z",
    fileName: "week6_report_alex_brown.pdf",
    company: "Google India",
    hoursWorked: 46,
    challenges: "Handling large image datasets and optimizing model inference time for production deployment",
    nextWeekPlan: "Implement attention mechanisms and work on model optimization for mobile deployment",
  },
]

const mockCertificates: Certificate[] = [
  {
    id: 1,
    studentId: 1,
    studentName: "John Doe",
    studentEmail: "john.doe@charusat.edu.in",
    teacherId: 2,
    internshipTitle: "Software Developer Intern",
    company: "TechCorp Solutions",
    duration: "6 months",
    startDate: "2024-01-15",
    endDate: "2024-07-15",
    uploadDate: "2024-07-16T16:20:00Z",
    status: "pending",
    fileName: "certificate_john_doe_techcorp.pdf",
    grade: "A",
    supervisorName: "Rajesh Kumar",
    supervisorEmail: "rajesh.kumar@techcorp.com",
    skills: ["React.js", "Node.js", "MongoDB", "REST APIs", "Git", "Agile Development"],
    projects: ["E-commerce Web Application", "Customer Management System", "API Gateway Implementation"],
  },
  {
    id: 2,
    studentId: 2,
    studentName: "Jane Smith",
    studentEmail: "jane.smith@charusat.edu.in",
    teacherId: 2,
    internshipTitle: "Data Analyst Intern",
    company: "DataTech Analytics",
    duration: "6 months",
    startDate: "2024-01-10",
    endDate: "2024-07-10",
    uploadDate: "2024-07-11T09:15:00Z",
    status: "approved",
    approvedBy: "Dr. Sarah Wilson",
    approvedDate: "2024-07-12T10:30:00Z",
    feedback:
      "Outstanding performance throughout the internship. Jane demonstrated exceptional analytical skills and contributed significantly to multiple high-impact projects.",
    fileName: "certificate_jane_smith_datatech.pdf",
    grade: "A+",
    supervisorName: "Priya Sharma",
    supervisorEmail: "priya.sharma@datatech.com",
    skills: ["Python", "SQL", "Tableau", "Machine Learning", "Statistical Analysis", "Data Visualization"],
    projects: ["Customer Segmentation Analysis", "Predictive Analytics Dashboard", "Real-time Data Pipeline"],
  },
  {
    id: 3,
    studentId: 4,
    studentName: "Sarah Wilson",
    studentEmail: "sarah.wilson@charusat.edu.in",
    teacherId: 3,
    internshipTitle: "Software Engineer Intern",
    company: "Microsoft India",
    duration: "6 months",
    startDate: "2023-12-01",
    endDate: "2024-06-01",
    uploadDate: "2024-06-02T14:30:00Z",
    status: "approved",
    approvedBy: "Dr. Michael Brown",
    approvedDate: "2024-06-03T09:45:00Z",
    feedback:
      "Exceptional performance and leadership throughout the internship. Sarah exceeded all expectations and made significant contributions to our cloud migration project.",
    fileName: "certificate_sarah_wilson_microsoft.pdf",
    grade: "A+",
    supervisorName: "Vikram Singh",
    supervisorEmail: "vikram.singh@microsoft.com",
    skills: ["C#", ".NET Core", "Azure", "DevOps", "Microservices", "Cloud Architecture"],
    projects: ["Enterprise Cloud Migration", "DevOps Pipeline Implementation", "Monitoring System Setup"],
  },
  {
    id: 4,
    studentId: 6,
    studentName: "Emily Davis",
    studentEmail: "emily.davis@charusat.edu.in",
    teacherId: 3,
    internshipTitle: "Cloud Engineer Intern",
    company: "Amazon India",
    duration: "6 months",
    startDate: "2024-01-08",
    endDate: "2024-07-08",
    uploadDate: "2024-07-09T11:45:00Z",
    status: "pending",
    fileName: "certificate_emily_davis_amazon.pdf",
    grade: "A",
    supervisorName: "Amit Patel",
    supervisorEmail: "amit.patel@amazon.com",
    skills: ["AWS", "Docker", "Kubernetes", "Terraform", "Linux", "Python"],
    projects: ["Container Orchestration Platform", "Infrastructure as Code", "Automated Deployment Pipeline"],
  },
]

const mockNOCRequests: NOCRequest[] = [
  {
    id: 1,
    studentId: 1,
    studentName: "John Doe",
    studentEmail: "john.doe@charusat.edu.in",
    company: "TechCorp Solutions",
    position: "Software Developer Intern",
    startDate: "2024-01-15",
    endDate: "2024-07-15",
    stipend: 25000,
    location: "Ahmedabad, Gujarat",
    description:
      "Full-stack development internship focusing on modern web technologies, database optimization, and cloud deployment. Will work on e-commerce platform development and API design.",
    submittedAt: "2024-01-10T10:30:00Z",
    status: "approved",
    reviewedBy: "TP Officer",
    reviewedAt: "2024-01-11T14:20:00Z",
    feedback:
      "Application approved. Excellent opportunity for full-stack development experience. Best wishes for your internship.",
    duration: "6 months",
    documents: ["offer_letter.pdf", "company_profile.pdf"],
  },
  {
    id: 2,
    studentId: 2,
    studentName: "Jane Smith",
    studentEmail: "jane.smith@charusat.edu.in",
    company: "DataTech Analytics",
    position: "Data Analyst Intern",
    startDate: "2024-01-10",
    endDate: "2024-07-10",
    stipend: 22000,
    location: "Mumbai, Maharashtra",
    description:
      "Data analysis and machine learning internship with focus on business intelligence, predictive analytics, and data visualization. Will work with large datasets and advanced ML algorithms.",
    submittedAt: "2024-01-05T16:45:00Z",
    status: "approved",
    reviewedBy: "TP Officer",
    reviewedAt: "2024-01-06T09:30:00Z",
    feedback: "Approved. Great opportunity to work with cutting-edge data science technologies.",
    duration: "6 months",
    documents: ["offer_letter.pdf", "job_description.pdf"],
  },
  {
    id: 3,
    studentId: 5,
    studentName: "Alex Brown",
    studentEmail: "alex.brown@charusat.edu.in",
    company: "Google India",
    position: "ML Engineer Intern",
    startDate: "2024-02-01",
    endDate: "2024-08-01",
    stipend: 45000,
    location: "Hyderabad, Telangana",
    description:
      "Machine learning engineering internship focusing on computer vision, natural language processing, and deep learning model deployment at scale.",
    submittedAt: "2024-01-25T11:15:00Z",
    status: "pending",
    duration: "6 months",
    documents: ["offer_letter.pdf", "company_brochure.pdf", "project_details.pdf"],
  },
  {
    id: 4,
    studentId: 6,
    studentName: "Emily Davis",
    studentEmail: "emily.davis@charusat.edu.in",
    company: "Amazon India",
    position: "Cloud Engineer Intern",
    startDate: "2024-01-08",
    endDate: "2024-07-08",
    stipend: 35000,
    location: "Pune, Maharashtra",
    description:
      "Cloud infrastructure and DevOps internship working with AWS services, containerization, and infrastructure automation.",
    submittedAt: "2024-01-02T14:30:00Z",
    status: "approved",
    reviewedBy: "TP Officer",
    reviewedAt: "2024-01-03T10:15:00Z",
    feedback: "Excellent opportunity with a leading cloud provider. Approved with best wishes.",
    duration: "6 months",
    documents: ["offer_letter.pdf", "internship_guidelines.pdf"],
  },
  {
    id: 5,
    studentId: 8,
    studentName: "Lisa Chen",
    studentEmail: "lisa.chen@charusat.edu.in",
    company: "Zomato",
    position: "Mobile App Developer Intern",
    startDate: "2024-01-20",
    endDate: "2024-07-20",
    stipend: 28000,
    location: "Gurgaon, Haryana",
    description:
      "Mobile application development internship focusing on React Native and Flutter development for food delivery platform.",
    submittedAt: "2024-01-15T09:20:00Z",
    status: "rejected",
    reviewedBy: "TP Officer",
    reviewedAt: "2024-01-16T11:45:00Z",
    feedback:
      "Please provide additional documentation regarding the company's internship program structure and mentorship details.",
    duration: "6 months",
    documents: ["offer_letter.pdf"],
  },
]

const mockCompanies: Company[] = [
  {
    id: 1,
    name: "TechCorp Solutions",
    email: "hr@techcorp.com",
    website: "https://techcorp.com",
    industry: "Information Technology",
    location: "Ahmedabad, Gujarat",
    description:
      "Leading software development company specializing in web and mobile applications, cloud solutions, and enterprise software development.",
    verificationStatus: "verified",
    verifiedBy: "TP Officer",
    verifiedAt: "2024-01-10T09:30:00Z",
    contactPerson: "Rajesh Kumar",
    contactPhone: "+91 9876543210",
    contactEmail: "rajesh.kumar@techcorp.com",
    establishedYear: 2015,
    employeeCount: "100-500",
    submittedAt: "2024-01-05T14:20:00Z",
    address: "Tech Park, SG Highway, Ahmedabad, Gujarat 380015",
    benefits: ["Health Insurance", "Flexible Hours", "Learning Budget", "Free Meals"],
    workCulture:
      "Collaborative and innovation-focused environment with emphasis on continuous learning and professional growth.",
  },
  {
    id: 2,
    name: "DataTech Analytics",
    email: "careers@datatech.com",
    website: "https://datatech.com",
    industry: "Data Analytics & AI",
    location: "Mumbai, Maharashtra",
    description:
      "Premier data analytics and artificial intelligence solutions provider helping businesses make data-driven decisions through advanced analytics and machine learning.",
    verificationStatus: "verified",
    verifiedBy: "TP Officer",
    verifiedAt: "2024-01-12T15:45:00Z",
    contactPerson: "Priya Sharma",
    contactPhone: "+91 9876543211",
    contactEmail: "priya.sharma@datatech.com",
    establishedYear: 2018,
    employeeCount: "50-200",
    submittedAt: "2024-01-08T11:45:00Z",
    address: "Business District, Bandra Kurla Complex, Mumbai, Maharashtra 400051",
    benefits: ["Competitive Salary", "Stock Options", "Remote Work", "Professional Development"],
    workCulture: "Data-driven culture with focus on innovation, research, and cutting-edge technology implementation.",
  },
  {
    id: 3,
    name: "Microsoft India",
    email: "internships@microsoft.com",
    website: "https://microsoft.com/india",
    industry: "Technology & Cloud Services",
    location: "Bangalore, Karnataka",
    description:
      "Global technology leader providing cloud computing, productivity software, and enterprise solutions with strong focus on innovation and digital transformation.",
    verificationStatus: "verified",
    verifiedBy: "TP Officer",
    verifiedAt: "2023-11-15T10:20:00Z",
    contactPerson: "Vikram Singh",
    contactPhone: "+91 9876543220",
    contactEmail: "vikram.singh@microsoft.com",
    establishedYear: 1975,
    employeeCount: "10000+",
    submittedAt: "2023-11-10T16:30:00Z",
    address: "Microsoft Campus, Bellandur, Bangalore, Karnataka 560103",
    benefits: ["Comprehensive Health Coverage", "Stock Purchase Plan", "Learning Resources", "Flexible Work"],
    workCulture:
      "Inclusive and diverse workplace focused on empowering every person and organization on the planet to achieve more.",
  },
  {
    id: 4,
    name: "Google India",
    email: "university@google.com",
    website: "https://careers.google.com/locations/india/",
    industry: "Technology & Internet Services",
    location: "Hyderabad, Telangana",
    description:
      "World's leading search engine and technology company focusing on artificial intelligence, cloud computing, and innovative internet services.",
    verificationStatus: "verified",
    verifiedBy: "TP Officer",
    verifiedAt: "2024-01-20T14:15:00Z",
    contactPerson: "Neha Gupta",
    contactPhone: "+91 9876543230",
    contactEmail: "neha.gupta@google.com",
    establishedYear: 1998,
    employeeCount: "10000+",
    submittedAt: "2024-01-18T12:00:00Z",
    address: "Google Campus, HITEC City, Hyderabad, Telangana 500081",
    benefits: ["World-class Benefits", "Free Meals", "Wellness Programs", "Innovation Time"],
    workCulture:
      "Open and collaborative environment encouraging innovation, creativity, and making a positive impact on the world.",
  },
  {
    id: 5,
    name: "Amazon India",
    email: "university-recruiting@amazon.com",
    website: "https://amazon.jobs/en/locations/india",
    industry: "E-commerce & Cloud Computing",
    location: "Pune, Maharashtra",
    description:
      "Global e-commerce and cloud computing giant offering diverse technology solutions, logistics, and digital services worldwide.",
    verificationStatus: "verified",
    verifiedBy: "TP Officer",
    verifiedAt: "2024-01-03T11:30:00Z",
    contactPerson: "Amit Patel",
    contactPhone: "+91 9876543240",
    contactEmail: "amit.patel@amazon.com",
    establishedYear: 1994,
    employeeCount: "10000+",
    submittedAt: "2023-12-28T09:45:00Z",
    address: "Amazon Development Center, Pune, Maharashtra 411014",
    benefits: ["Competitive Compensation", "Health Benefits", "Career Development", "Employee Discounts"],
    workCulture:
      "Customer-obsessed culture with high standards, ownership mentality, and commitment to operational excellence.",
  },
  {
    id: 6,
    name: "Flipkart",
    email: "talent@flipkart.com",
    website: "https://www.flipkart.com/careers",
    industry: "E-commerce & Technology",
    location: "Chennai, Tamil Nadu",
    description:
      "India's leading e-commerce marketplace providing a platform for online shopping with focus on technology innovation and customer experience.",
    verificationStatus: "pending",
    contactPerson: "Suresh Reddy",
    contactPhone: "+91 9876543250",
    contactEmail: "suresh.reddy@flipkart.com",
    establishedYear: 2007,
    employeeCount: "1000-5000",
    submittedAt: "2024-01-22T13:20:00Z",
    address: "Flipkart Campus, OMR, Chennai, Tamil Nadu 600096",
    benefits: ["Employee Stock Options", "Health Insurance", "Flexible Work", "Learning Opportunities"],
    workCulture:
      "Fast-paced, entrepreneurial environment with focus on innovation, customer satisfaction, and continuous learning.",
  },
]

const mockOpportunities: Opportunity[] = [
  {
    id: 1,
    companyId: 1,
    companyName: "TechCorp Solutions",
    title: "Full Stack Developer Intern",
    description:
      "Join our development team to work on cutting-edge web applications using modern technologies. You'll be involved in both frontend and backend development, working with React.js, Node.js, and cloud technologies.",
    requirements: ["React.js", "Node.js", "MongoDB", "JavaScript", "Git"],
    skills: ["HTML/CSS", "REST APIs", "Database Design", "Agile Methodology"],
    location: "Ahmedabad, Gujarat",
    duration: "6 months",
    stipend: 25000,
    type: "internship",
    status: "active",
    postedBy: "HR Team",
    postedAt: "2024-01-01T10:00:00Z",
    deadline: "2024-02-15",
    positions: 5,
    applicants: 23,
    verified: true,
    workMode: "hybrid",
    benefits: ["Mentorship Program", "Flexible Hours", "Learning Budget", "Certificate"],
  },
  {
    id: 2,
    companyId: 2,
    companyName: "DataTech Analytics",
    title: "Data Science Intern",
    description:
      "Work with our data science team on machine learning projects, data analysis, and business intelligence solutions. Gain hands-on experience with large datasets and advanced analytics tools.",
    requirements: ["Python", "SQL", "Machine Learning", "Statistics"],
    skills: ["Data Visualization", "Pandas", "Scikit-learn", "Tableau"],
    location: "Mumbai, Maharashtra",
    duration: "6 months",
    stipend: 22000,
    type: "internship",
    status: "active",
    postedBy: "Data Science Team",
    postedAt: "2024-01-05T14:30:00Z",
    deadline: "2024-02-20",
    positions: 3,
    applicants: 18,
    verified: true,
    workMode: "onsite",
    benefits: ["Industry Exposure", "Real Projects", "Certification", "Full-time Opportunity"],
  },
  {
    id: 3,
    companyId: 3,
    companyName: "Microsoft India",
    title: "Software Engineer Intern",
    description:
      "Contribute to Microsoft's cloud and productivity solutions. Work on enterprise-grade software development with focus on scalability, performance, and user experience.",
    requirements: ["C#", ".NET", "Azure", "SQL Server"],
    skills: ["Object-Oriented Programming", "Cloud Computing", "DevOps", "Agile"],
    location: "Bangalore, Karnataka",
    duration: "6 months",
    stipend: 40000,
    type: "internship",
    status: "active",
    postedBy: "Engineering Team",
    postedAt: "2023-12-15T09:00:00Z",
    deadline: "2024-02-01",
    positions: 8,
    applicants: 45,
    verified: true,
    workMode: "hybrid",
    benefits: ["Microsoft Certification", "Global Exposure", "Mentorship", "Full-time Conversion"],
  },
  {
    id: 4,
    companyId: 4,
    companyName: "Google India",
    title: "Machine Learning Engineer Intern",
    description:
      "Work on cutting-edge ML projects including computer vision, natural language processing, and recommendation systems. Contribute to products used by millions of users worldwide.",
    requirements: ["Python", "TensorFlow", "Machine Learning", "Deep Learning"],
    skills: ["Computer Vision", "NLP", "PyTorch", "Data Structures"],
    location: "Hyderabad, Telangana",
    duration: "6 months",
    stipend: 45000,
    type: "internship",
    status: "active",
    postedBy: "AI Research Team",
    postedAt: "2024-01-18T11:30:00Z",
    deadline: "2024-03-01",
    positions: 4,
    applicants: 67,
    verified: true,
    workMode: "onsite",
    benefits: ["Research Exposure", "Publication Opportunities", "Google Certification", "Networking"],
  },
  {
    id: 5,
    companyId: 5,
    companyName: "Amazon India",
    title: "Cloud Engineer Intern",
    description:
      "Join AWS team to work on cloud infrastructure, containerization, and DevOps practices. Gain experience with large-scale distributed systems and cloud technologies.",
    requirements: ["AWS", "Docker", "Kubernetes", "Linux"],
    skills: ["Python", "Terraform", "CI/CD", "Monitoring"],
    location: "Pune, Maharashtra",
    duration: "6 months",
    stipend: 35000,
    type: "internship",
    status: "active",
    postedBy: "Cloud Engineering Team",
    postedAt: "2024-01-02T16:45:00Z",
    deadline: "2024-02-28",
    positions: 6,
    applicants: 34,
    verified: true,
    workMode: "hybrid",
    benefits: ["AWS Certification", "Cloud Expertise", "Industry Projects", "Career Growth"],
  },
  {
    id: 6,
    companyName: "Flipkart",
    companyId: 6,
    title: "Backend Developer Intern",
    description:
      "Develop scalable backend systems for India's largest e-commerce platform. Work with microservices, databases, and high-traffic applications.",
    requirements: ["Java", "Spring Boot", "MySQL", "Redis"],
    skills: ["Microservices", "System Design", "Performance Optimization", "API Development"],
    location: "Chennai, Tamil Nadu",
    duration: "6 months",
    stipend: 30000,
    type: "internship",
    status: "active",
    postedBy: "Backend Team",
    postedAt: "2024-01-22T10:15:00Z",
    deadline: "2024-03-15",
    positions: 4,
    applicants: 28,
    verified: false,
    workMode: "onsite",
    benefits: ["E-commerce Experience", "Scale Learning", "Performance Bonus", "Full-time Offer"],
  },
]

const mockUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@charusat.edu.in",
    role: "student",
    department: "Computer Engineering",
    rollNumber: "21CE001",
    phone: "+91 9876543210",
    status: "active",
    lastLogin: "2024-01-15T10:30:00Z",
    createdAt: "2023-08-01T09:00:00Z",
    address: "123 Main Street, Ahmedabad, Gujarat",
  },
  {
    id: 2,
    name: "Dr. Sarah Wilson",
    email: "sarah.wilson@charusat.ac.in",
    role: "teacher",
    department: "Computer Engineering",
    employeeId: "EMP001",
    phone: "+91 9876543220",
    status: "active",
    lastLogin: "2024-01-15T08:45:00Z",
    createdAt: "2020-06-01T09:00:00Z",
    designation: "Associate Professor",
    address: "Faculty Quarters, CHARUSAT Campus",
  },
  {
    id: 3,
    name: "Dr. Michael Brown",
    email: "michael.brown@charusat.ac.in",
    role: "teacher",
    department: "Computer Engineering",
    employeeId: "EMP002",
    phone: "+91 9876543221",
    status: "active",
    lastLogin: "2024-01-14T16:20:00Z",
    createdAt: "2019-08-15T09:00:00Z",
    designation: "Professor",
    address: "Faculty Quarters, CHARUSAT Campus",
  },
  {
    id: 4,
    name: "TP Officer",
    email: "tp@charusat.ac.in",
    role: "tp-officer",
    department: "T&P Cell",
    employeeId: "TPO001",
    phone: "+91 9876543230",
    status: "active",
    lastLogin: "2024-01-15T09:15:00Z",
    createdAt: "2021-01-01T09:00:00Z",
    designation: "Training & Placement Officer",
    address: "T&P Office, CHARUSAT Campus",
  },
  {
    id: 5,
    name: "Admin User",
    email: "admin@charusat.ac.in",
    role: "admin",
    department: "IT Department",
    employeeId: "ADM001",
    phone: "+91 9876543240",
    status: "active",
    lastLogin: "2024-01-15T07:30:00Z",
    createdAt: "2019-01-01T09:00:00Z",
    designation: "System Administrator",
    address: "IT Department, CHARUSAT Campus",
  },
  // Additional students
  {
    id: 6,
    name: "Jane Smith",
    email: "jane.smith@charusat.edu.in",
    role: "student",
    department: "Computer Engineering",
    rollNumber: "21CE002",
    phone: "+91 9876543211",
    status: "active",
    lastLogin: "2024-01-14T14:20:00Z",
    createdAt: "2023-08-01T09:00:00Z",
    address: "456 Park Avenue, Vadodara, Gujarat",
  },
  {
    id: 7,
    name: "Mike Johnson",
    email: "mike.johnson@charusat.edu.in",
    role: "student",
    department: "Computer Engineering",
    rollNumber: "21CE003",
    phone: "+91 9876543212",
    status: "active",
    lastLogin: "2024-01-12T16:45:00Z",
    createdAt: "2023-08-01T09:00:00Z",
    address: "789 Tech Park, Gandhinagar, Gujarat",
  },
  {
    id: 8,
    name: "Sarah Wilson",
    email: "sarah.wilson.student@charusat.edu.in",
    role: "student",
    department: "Computer Engineering",
    rollNumber: "21CE004",
    phone: "+91 9876543213",
    status: "active",
    lastLogin: "2024-01-10T18:30:00Z",
    createdAt: "2023-08-01T09:00:00Z",
    address: "321 Innovation Hub, Bangalore, Karnataka",
  },
]

const mockSystemLogs: SystemLog[] = [
  {
    id: 1,
    userId: 1,
    userName: "John Doe",
    action: "Login",
    details: "User logged in successfully from web browser",
    timestamp: "2024-01-15T10:30:00Z",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    status: "success",
    module: "Authentication",
  },
  {
    id: 2,
    userId: 2,
    userName: "Dr. Sarah Wilson",
    action: "Report Review",
    details: "Approved weekly report #8 for John Doe with grade A",
    timestamp: "2024-01-15T09:45:00Z",
    ipAddress: "192.168.1.101",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    status: "success",
    module: "Report Management",
  },
  {
    id: 3,
    userId: 4,
    userName: "TP Officer",
    action: "NOC Approval",
    details: "Approved NOC request for Jane Smith - DataTech Analytics internship",
    timestamp: "2024-01-15T08:30:00Z",
    ipAddress: "192.168.1.102",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    status: "success",
    module: "NOC Management",
  },
  {
    id: 4,
    userId: 5,
    userName: "Admin User",
    action: "User Creation",
    details: "Created new student account for Emily Davis (21CE006)",
    timestamp: "2024-01-14T16:20:00Z",
    ipAddress: "192.168.1.103",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    status: "success",
    module: "User Management",
  },
  {
    id: 5,
    userId: 3,
    userName: "Dr. Michael Brown",
    action: "Certificate Approval",
    details: "Approved internship certificate for Sarah Wilson - Microsoft India",
    timestamp: "2024-01-14T11:15:00Z",
    ipAddress: "192.168.1.104",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    status: "success",
    module: "Certificate Management",
  },
]

const mockApplications: Application[] = [
  {
    id: 1,
    opportunityId: 1,
    studentId: 1,
    studentName: "John Doe",
    studentEmail: "john.doe@charusat.edu.in",
    coverLetter:
      "I am excited to apply for the Full Stack Developer Intern position at TechCorp Solutions. With my strong foundation in React.js and Node.js, I am confident I can contribute effectively to your development team.",
    resumeFileName: "john_doe_resume.pdf",
    appliedAt: "2024-01-10T14:30:00Z",
    status: "selected",
    reviewedBy: "HR Team",
    reviewedAt: "2024-01-12T10:15:00Z",
    feedback: "Excellent technical skills and strong motivation. Selected for the internship program.",
  },
  {
    id: 2,
    opportunityId: 2,
    studentId: 2,
    studentName: "Jane Smith",
    studentEmail: "jane.smith@charusat.edu.in",
    coverLetter:
      "I am passionate about data science and machine learning. My experience with Python, SQL, and statistical analysis makes me a perfect fit for this Data Science Intern role.",
    resumeFileName: "jane_smith_resume.pdf",
    appliedAt: "2024-01-08T16:45:00Z",
    status: "selected",
    reviewedBy: "Data Science Team",
    reviewedAt: "2024-01-09T11:30:00Z",
    feedback: "Outstanding academic record and relevant project experience. Welcome to the team!",
  },
  {
    id: 3,
    opportunityId: 4,
    studentId: 5,
    studentName: "Alex Brown",
    studentEmail: "alex.brown@charusat.edu.in",
    coverLetter:
      "Machine learning has been my passion since college. I have worked on several computer vision and NLP projects, and I'm excited about the opportunity to contribute to Google's AI initiatives.",
    resumeFileName: "alex_brown_resume.pdf",
    appliedAt: "2024-01-20T09:20:00Z",
    status: "shortlisted",
    reviewedBy: "AI Research Team",
    reviewedAt: "2024-01-22T14:45:00Z",
    feedback: "Strong technical background. Shortlisted for technical interview round.",
  },
]

const mockTasks: AssignedTask[] = [
  {
    id: 1,
    teacherId: 2,
    title: "Mid-term Presentation Preparation",
    description:
      "Prepare a comprehensive presentation covering your internship progress, key learnings, challenges faced, and future goals. Include technical details and project outcomes.",
    dueDate: "2024-02-15",
    assignedStudents: [1, 2, 3, 5],
    createdAt: "2024-01-20T10:00:00Z",
    updatedAt: "2024-01-20T10:00:00Z",
    isDeleted: false,
    priority: "high",
    category: "presentation",
  },
  {
    id: 2,
    teacherId: 2,
    title: "Technical Documentation Review",
    description:
      "Review and update your project documentation including API documentation, user guides, and technical specifications. Ensure all documentation follows company standards.",
    dueDate: "2024-02-20",
    fileName: "documentation_guidelines.pdf",
    assignedStudents: [1, 3],
    createdAt: "2024-01-18T14:30:00Z",
    updatedAt: "2024-01-18T14:30:00Z",
    isDeleted: false,
    priority: "medium",
    category: "documentation",
  },
  {
    id: 3,
    teacherId: 3,
    title: "Industry Best Practices Research",
    description:
      "Research and document current industry best practices in your internship domain. Prepare a detailed report with recommendations for implementation.",
    dueDate: "2024-02-25",
    assignedStudents: [4, 6, 8],
    createdAt: "2024-01-22T11:15:00Z",
    updatedAt: "2024-01-22T11:15:00Z",
    isDeleted: false,
    priority: "medium",
    category: "report",
  },
  {
    id: 4,
    teacherId: 2,
    title: "Weekly Progress Meeting",
    description:
      "Attend weekly progress meeting to discuss current work, challenges, and next steps. Come prepared with status updates and questions.",
    dueDate: "2024-01-25",
    assignedStudents: [1, 2, 3, 5, 7, 9],
    createdAt: "2024-01-23T09:30:00Z",
    updatedAt: "2024-01-23T09:30:00Z",
    isDeleted: false,
    priority: "high",
    category: "meeting",
  },
]

const mockTaskStatuses: TaskStatus[] = [
  {
    id: 1,
    taskId: 1,
    studentId: 1,
    status: "seen",
  },
  {
    id: 2,
    taskId: 1,
    studentId: 2,
    status: "completed",
    completedAt: "2024-01-22T16:45:00Z",
    notes: "Presentation completed and ready for review. Included all technical details and project outcomes.",
  },
  {
    id: 3,
    taskId: 2,
    studentId: 1,
    status: "assigned",
  },
  {
    id: 4,
    taskId: 1,
    studentId: 3,
    status: "completed",
    completedAt: "2024-01-23T14:20:00Z",
    submissionFile: "midterm_presentation_mike_johnson.pptx",
    notes: "Comprehensive presentation covering all internship aspects with detailed technical analysis.",
  },
  {
    id: 5,
    taskId: 3,
    studentId: 4,
    status: "seen",
  },
]

// Export functions
export const getCurrentUser = () => {
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem("user")
    return userData ? JSON.parse(userData) : null
  }
  return null
}

// Student functions
export const getStudentsByTeacher = (teacherId: number): Student[] => {
  return mockStudents.filter((student) => student.teacherId === teacherId)
}

export const getReportsByStudent = (studentId: number): WeeklyReport[] => {
  return mockReports.filter((report) => report.studentId === studentId)
}

export const getCertificatesByStudent = (studentId: number): Certificate[] => {
  return mockCertificates.filter((cert) => cert.studentId === studentId)
}

export const getNOCRequestsByStudent = (studentId: number): NOCRequest[] => {
  return mockNOCRequests.filter((noc) => noc.studentId === studentId)
}

export const getApplicationsByStudent = (studentId: number): Application[] => {
  return mockApplications.filter((app) => app.studentId === studentId)
}

// Teacher functions
export const getReportsByTeacher = (teacherId: number): WeeklyReport[] => {
  return mockReports.filter((report) => report.teacherId === teacherId)
}

export const getCertificatesByTeacher = (teacherId: number): Certificate[] => {
  return mockCertificates.filter((cert) => cert.teacherId === teacherId)
}

export const getTasksByTeacher = (teacherId: number): AssignedTask[] => {
  return mockTasks.filter((task) => task.teacherId === teacherId && !task.isDeleted)
}

export const getTaskStatuses = (taskId: number): TaskStatus[] => {
  return mockTaskStatuses.filter((status) => status.taskId === taskId)
}

// TP Officer functions
export const getAllNOCRequests = (): NOCRequest[] => {
  return mockNOCRequests
}

export const getAllCompanies = (): Company[] => {
  return mockCompanies
}

export const getAllOpportunities = (): Opportunity[] => {
  return mockOpportunities
}

export const getCompanyById = (companyId: number): Company | undefined => {
  return mockCompanies.find((company) => company.id === companyId)
}

export const getOpportunitiesByCompany = (companyId: number): Opportunity[] => {
  return mockOpportunities.filter((opp) => opp.companyId === companyId)
}

// Admin functions
export const getAllUsers = (): User[] => {
  return mockUsers
}

export const getAllSystemLogs = (): SystemLog[] => {
  return mockSystemLogs
}

export const getUsersByRole = (role: string): User[] => {
  return mockUsers.filter((user) => user.role === role)
}

export const getSystemStats = () => {
  return {
    totalUsers: mockUsers.length,
    activeUsers: mockUsers.filter((user) => user.status === "active").length,
    totalStudents: mockUsers.filter((user) => user.role === "student").length,
    totalTeachers: mockUsers.filter((user) => user.role === "teacher").length,
    totalReports: mockReports.length,
    totalCertificates: mockCertificates.length,
    totalCompanies: mockCompanies.length,
    totalOpportunities: mockOpportunities.length,
    pendingNOCs: mockNOCRequests.filter((noc) => noc.status === "pending").length,
    approvedNOCs: mockNOCRequests.filter((noc) => noc.status === "approved").length,
    verifiedCompanies: mockCompanies.filter((company) => company.verificationStatus === "verified").length,
    activeOpportunities: mockOpportunities.filter((opp) => opp.status === "active").length,
  }
}

// Create functions
export const createWeeklyReport = (reportData: Omit<WeeklyReport, "id" | "submittedAt">) => {
  const newReport: WeeklyReport = {
    id: mockReports.length + 1,
    ...reportData,
    submittedAt: new Date().toISOString(),
  }
  mockReports.push(newReport)
  return newReport
}

export const createCertificate = (certificateData: Omit<Certificate, "id" | "uploadDate">) => {
  const newCertificate: Certificate = {
    id: mockCertificates.length + 1,
    ...certificateData,
    uploadDate: new Date().toISOString(),
  }
  mockCertificates.push(newCertificate)
  return newCertificate
}

export const createNOCRequest = (nocData: Omit<NOCRequest, "id" | "submittedAt">) => {
  const newNOC: NOCRequest = {
    id: mockNOCRequests.length + 1,
    ...nocData,
    submittedAt: new Date().toISOString(),
  }
  mockNOCRequests.push(newNOC)
  return newNOC
}

export const createCompany = (companyData: Omit<Company, "id" | "submittedAt">) => {
  const newCompany: Company = {
    id: mockCompanies.length + 1,
    ...companyData,
    submittedAt: new Date().toISOString(),
  }
  mockCompanies.push(newCompany)
  return newCompany
}

export const createOpportunity = (opportunityData: Omit<Opportunity, "id" | "postedAt">) => {
  const newOpportunity: Opportunity = {
    id: mockOpportunities.length + 1,
    ...opportunityData,
    postedAt: new Date().toISOString(),
  }
  mockOpportunities.push(newOpportunity)
  return newOpportunity
}

export const createApplication = (applicationData: Omit<Application, "id" | "appliedAt">) => {
  const newApplication: Application = {
    id: mockApplications.length + 1,
    ...applicationData,
    appliedAt: new Date().toISOString(),
  }
  mockApplications.push(newApplication)
  return newApplication
}

export const createTask = (taskData: Omit<AssignedTask, "id" | "createdAt" | "updatedAt">) => {
  const now = new Date().toISOString()
  const newTask: AssignedTask = {
    id: mockTasks.length + 1,
    ...taskData,
    createdAt: now,
    updatedAt: now,
  }
  mockTasks.push(newTask)
  return newTask
}

// Dashboard data functions
export const getStudentDashboardData = (studentId: number) => {
  const student = mockStudents.find((s) => s.id === studentId)
  const reports = getReportsByStudent(studentId)
  const certificates = getCertificatesByStudent(studentId)
  const nocRequests = getNOCRequestsByStudent(studentId)
  const applications = getApplicationsByStudent(studentId)

  return {
    student,
    reports,
    certificates,
    nocRequests,
    applications,
    stats: {
      totalReports: reports.length,
      approvedReports: reports.filter((r) => r.status === "approved").length,
      pendingReports: reports.filter((r) => r.status === "pending").length,
      totalApplications: applications.length,
      selectedApplications: applications.filter((a) => a.status === "selected").length,
    },
  }
}

export const getTeacherDashboardData = (teacherId: number) => {
  const students = getStudentsByTeacher(teacherId)
  const reports = getReportsByTeacher(teacherId)
  const certificates = getCertificatesByTeacher(teacherId)
  const tasks = getTasksByTeacher(teacherId)

  return {
    students,
    reports,
    certificates,
    tasks,
    stats: {
      totalStudents: students.length,
      activeStudents: students.filter((s) => s.status === "active").length,
      completedStudents: students.filter((s) => s.status === "completed").length,
      totalReports: reports.length,
      pendingReports: reports.filter((r) => r.status === "pending").length,
      approvedReports: reports.filter((r) => r.status === "approved").length,
      totalTasks: tasks.length,
      totalCertificates: certificates.length,
    },
  }
}

export const getTPOfficerDashboardData = () => {
  const companies = getAllCompanies()
  const opportunities = getAllOpportunities()
  const nocRequests = getAllNOCRequests()

  return {
    companies,
    opportunities,
    nocRequests,
    stats: {
      totalCompanies: companies.length,
      verifiedCompanies: companies.filter((c) => c.verificationStatus === "verified").length,
      pendingCompanies: companies.filter((c) => c.verificationStatus === "pending").length,
      totalOpportunities: opportunities.length,
      activeOpportunities: opportunities.filter((o) => o.status === "active").length,
      totalNOCs: nocRequests.length,
      pendingNOCs: nocRequests.filter((n) => n.status === "pending").length,
      approvedNOCs: nocRequests.filter((n) => n.status === "approved").length,
    },
  }
}

export const getAdminDashboardData = () => {
  const users = getAllUsers()
  const logs = getAllSystemLogs()
  const systemStats = getSystemStats()

  return {
    users,
    logs,
    systemStats,
    stats: {
      totalUsers: users.length,
      activeUsers: users.filter((u) => u.status === "active").length,
      totalStudents: users.filter((u) => u.role === "student").length,
      totalTeachers: users.filter((u) => u.role === "teacher").length,
      recentLogs: logs.slice(0, 10),
      errorLogs: logs.filter((l) => l.status === "error").length,
    },
  }
}

// Update functions
export const updateReportStatus = (
  reportId: number,
  status: WeeklyReport["status"],
  feedback?: string,
  grade?: string,
) => {
  const reportIndex = mockReports.findIndex((r) => r.id === reportId)
  if (reportIndex !== -1) {
    mockReports[reportIndex] = {
      ...mockReports[reportIndex],
      status,
      feedback,
      grade,
      reviewedAt: new Date().toISOString(),
    }
    return mockReports[reportIndex]
  }
  return null
}

export const updateCertificateStatus = (certificateId: number, status: Certificate["status"], feedback?: string) => {
  const certIndex = mockCertificates.findIndex((c) => c.id === certificateId)
  if (certIndex !== -1) {
    mockCertificates[certIndex] = {
      ...mockCertificates[certIndex],
      status,
      feedback,
      approvedDate: status === "approved" ? new Date().toISOString() : undefined,
    }
    return mockCertificates[certIndex]
  }
  return null
}

export const updateNOCStatus = (nocId: number, status: NOCRequest["status"], feedback?: string) => {
  const nocIndex = mockNOCRequests.findIndex((n) => n.id === nocId)
  if (nocIndex !== -1) {
    mockNOCRequests[nocIndex] = {
      ...mockNOCRequests[nocIndex],
      status,
      feedback,
      reviewedAt: new Date().toISOString(),
    }
    return mockNOCRequests[nocIndex]
  }
  return null
}

export const updateCompanyVerification = (companyId: number, status: Company["verificationStatus"]) => {
  const companyIndex = mockCompanies.findIndex((c) => c.id === companyId)
  if (companyIndex !== -1) {
    mockCompanies[companyIndex] = {
      ...mockCompanies[companyIndex],
      verificationStatus: status,
      verifiedAt: status === "verified" ? new Date().toISOString() : undefined,
    }
    return mockCompanies[companyIndex]
  }
  return null
}

export const updateTaskStatus = (taskId: number, studentId: number, status: TaskStatus["status"], notes?: string) => {
  const existingStatusIndex = mockTaskStatuses.findIndex((ts) => ts.taskId === taskId && ts.studentId === studentId)

  if (existingStatusIndex !== -1) {
    mockTaskStatuses[existingStatusIndex] = {
      ...mockTaskStatuses[existingStatusIndex],
      status,
      notes,
      completedAt: status === "completed" ? new Date().toISOString() : undefined,
    }
    return mockTaskStatuses[existingStatusIndex]
  } else {
    const newTaskStatus: TaskStatus = {
      id: mockTaskStatuses.length + 1,
      taskId,
      studentId,
      status,
      notes,
      completedAt: status === "completed" ? new Date().toISOString() : undefined,
    }
    mockTaskStatuses.push(newTaskStatus)
    return newTaskStatus
  }
}

// Delete functions
export const deleteTask = (taskId: number) => {
  const taskIndex = mockTasks.findIndex((t) => t.id === taskId)
  if (taskIndex !== -1) {
    mockTasks[taskIndex] = {
      ...mockTasks[taskIndex],
      isDeleted: true,
      updatedAt: new Date().toISOString(),
    }
    return true
  }
  return false
}

// Search and filter functions
export const searchStudents = (query: string, teacherId?: number): Student[] => {
  const students = teacherId ? getStudentsByTeacher(teacherId) : mockStudents

  if (!query) return students

  const lowerQuery = query.toLowerCase()
  return students.filter(
    (student) =>
      student.name.toLowerCase().includes(lowerQuery) ||
      student.email.toLowerCase().includes(lowerQuery) ||
      student.rollNumber.toLowerCase().includes(lowerQuery) ||
      student.company?.toLowerCase().includes(lowerQuery),
  )
}

export const searchReports = (query: string, teacherId?: number): WeeklyReport[] => {
  const reports = teacherId ? getReportsByTeacher(teacherId) : mockReports

  if (!query) return reports

  const lowerQuery = query.toLowerCase()
  return reports.filter(
    (report) =>
      report.title.toLowerCase().includes(lowerQuery) ||
      report.studentName.toLowerCase().includes(lowerQuery) ||
      report.company.toLowerCase().includes(lowerQuery),
  )
}

export const searchCertificates = (query: string, teacherId?: number): Certificate[] => {
  const certificates = teacherId ? getCertificatesByTeacher(teacherId) : mockCertificates

  if (!query) return certificates

  const lowerQuery = query.toLowerCase()
  return certificates.filter(
    (cert) =>
      cert.studentName.toLowerCase().includes(lowerQuery) ||
      cert.company.toLowerCase().includes(lowerQuery) ||
      cert.internshipTitle.toLowerCase().includes(lowerQuery),
  )
}

export const searchCompanies = (query: string): Company[] => {
  if (!query) return mockCompanies

  const lowerQuery = query.toLowerCase()
  return mockCompanies.filter(
    (company) =>
      company.name.toLowerCase().includes(lowerQuery) ||
      company.industry.toLowerCase().includes(lowerQuery) ||
      company.location.toLowerCase().includes(lowerQuery),
  )
}

export const searchOpportunities = (query: string): Opportunity[] => {
  if (!query) return mockOpportunities

  const lowerQuery = query.toLowerCase()
  return mockOpportunities.filter(
    (opp) =>
      opp.title.toLowerCase().includes(lowerQuery) ||
      opp.companyName.toLowerCase().includes(lowerQuery) ||
      opp.location.toLowerCase().includes(lowerQuery) ||
      opp.skills.some((skill) => skill.toLowerCase().includes(lowerQuery)),
  )
}

// Analytics functions
export const getStudentProgressAnalytics = (teacherId: number) => {
  const students = getStudentsByTeacher(teacherId)
  const reports = getReportsByTeacher(teacherId)

  return {
    progressDistribution: students.map((student) => ({
      name: student.name,
      progress: student.progress,
      reportsSubmitted: student.reportsSubmitted,
      totalReports: student.totalReports,
    })),
    reportStatusDistribution: {
      pending: reports.filter((r) => r.status === "pending").length,
      approved: reports.filter((r) => r.status === "approved").length,
      rejected: reports.filter((r) => r.status === "rejected").length,
      revision_required: reports.filter((r) => r.status === "revision_required").length,
    },
    weeklySubmissions: Array.from({ length: 12 }, (_, i) => ({
      week: i + 1,
      submissions: reports.filter((r) => r.week === i + 1).length,
    })),
  }
}

export const getCompanyAnalytics = () => {
  return {
    industryDistribution: mockCompanies.reduce(
      (acc, company) => {
        acc[company.industry] = (acc[company.industry] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    ),
    locationDistribution: mockCompanies.reduce(
      (acc, company) => {
        const location = company.location.split(",")[1]?.trim() || company.location
        acc[location] = (acc[location] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    ),
    verificationStatus: {
      verified: mockCompanies.filter((c) => c.verificationStatus === "verified").length,
      pending: mockCompanies.filter((c) => c.verificationStatus === "pending").length,
      rejected: mockCompanies.filter((c) => c.verificationStatus === "rejected").length,
    },
  }
}

export const getOpportunityAnalytics = () => {
  return {
    typeDistribution: {
      internship: mockOpportunities.filter((o) => o.type === "internship").length,
      job: mockOpportunities.filter((o) => o.type === "job").length,
    },
    workModeDistribution: {
      onsite: mockOpportunities.filter((o) => o.workMode === "onsite").length,
      remote: mockOpportunities.filter((o) => o.workMode === "remote").length,
      hybrid: mockOpportunities.filter((o) => o.workMode === "hybrid").length,
    },
    stipendRanges: {
      "0-20k": mockOpportunities.filter((o) => o.stipend <= 20000).length,
      "20k-30k": mockOpportunities.filter((o) => o.stipend > 20000 && o.stipend <= 30000).length,
      "30k-40k": mockOpportunities.filter((o) => o.stipend > 30000 && o.stipend <= 40000).length,
      "40k+": mockOpportunities.filter((o) => o.stipend > 40000).length,
    },
    applicationStats: mockOpportunities.map((opp) => ({
      title: opp.title,
      company: opp.companyName,
      applicants: opp.applicants,
      positions: opp.positions,
      ratio: opp.positions > 0 ? (opp.applicants / opp.positions).toFixed(1) : "0",
    })),
  }
}


export function getTeacherMeetings(email: string) {
  // Replace this mock with your real meetings logic or data source
  return [
    {
      id: 1,
      title: "Weekly Progress Review",
      date: "2024-07-10T10:00:00Z",
      students: ["John Doe", "Jane Smith"],
      status: "scheduled",
    },
    {
      id: 2,
      title: "Final Evaluation",
      date: "2024-07-20T14:00:00Z",
      students: ["Alex Brown"],
      status: "pending",
    },
    {
      id: 3,
      title: "Certificate Discussion",
      date: "2024-07-25T11:30:00Z",
      students: ["Emma Davis"],
      status: "completed",
    },
  ]
}