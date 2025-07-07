"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Chrome, ArrowLeft, Loader2, Shield } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function AuthPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const getUserRole = (email: string): string | null => {
    if (email.endsWith("@charusat.edu.in")) {
      return "student"
    } else if (email.endsWith("@charusat.ac.in")) {
      if (email.includes("admin") || email === "admin@charusat.ac.in") {
        return "admin"
      } else if (email.includes("tp") || email === "tp@charusat.ac.in") {
        return "tp-officer"
      } else {
        return "teacher"
      }
    }
    return null
  }

  const handleGoogleLogin = async () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address first.",
        variant: "destructive",
      })
      return
    }

    const role = getUserRole(email)
    if (!role) {
      toast({
        title: "Invalid Email Domain",
        description: "Please use your institutional email address (@charusat.edu.in or @charusat.ac.in).",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      const userData = {
        id: Math.floor(Math.random() * 1000) + 1,
        email,
        role,
        name: getNameFromEmail(email),
        loginTime: new Date().toISOString(),
      }

      localStorage.setItem("user", JSON.stringify(userData))

      toast({
        title: "Login Successful",
        description: `Welcome! Redirecting to ${role.replace("-", " ")} dashboard...`,
      })

      router.push(`/dashboard/${role}`)
    }, 1500)
  }

  const getNameFromEmail = (email: string): string => {
    const name = email.split("@")[0]
    return name
      .split(".")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")
  }

  const getRoleDescription = (email: string): string => {
    const role = getUserRole(email)
    switch (role) {
      case "student":
        return "Student Portal - Apply for NOC, submit reports, track progress"
      case "teacher":
        return "Faculty Portal - Review reports, approve certificates, mentor students"
      case "tp-officer":
        return "T&P Portal - Manage NOC requests, verify companies, post opportunities"
      case "admin":
        return "Admin Portal - System oversight, analytics, user management"
      default:
        return "Please enter a valid institutional email address"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl">
          <CardHeader className="text-center space-y-4">
            <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Link>
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
            <CardDescription className="text-gray-600">
              Enter your institutional email to access the appropriate portal
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.name@charusat.edu.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="h-11"
              />
            </div>

            {email && (
              <div className="p-4 bg-gray-50 rounded-lg border">
                <p className="text-sm text-gray-700">{getRoleDescription(email)}</p>
              </div>
            )}

            <Button className="w-full h-11" size="lg" onClick={handleGoogleLogin} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <Chrome className="h-5 w-5 mr-2" />
                  Continue with Google
                </>
              )}
            </Button>

            <div className="text-center space-y-2">
              <p className="text-xs text-gray-500">Supported email domains:</p>
              <div className="flex flex-col space-y-1">
                <p className="text-xs text-gray-500">@charusat.edu.in (Students)</p>
                <p className="text-xs text-gray-500">@charusat.ac.in (Faculty/Staff)</p>
              </div>
            </div>

            {/* Demo Credentials */}
            <div className="border-t pt-4">
              <p className="text-xs text-gray-500 mb-2 text-center">Demo Credentials:</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-blue-50 rounded">
                  <p className="font-medium">Student:</p>
                  <p className="text-gray-600">john.doe@charusat.edu.in</p>
                </div>
                <div className="p-2 bg-green-50 rounded">
                  <p className="font-medium">Teacher:</p>
                  <p className="text-gray-600">sarah.wilson@charusat.ac.in</p>
                </div>
                <div className="p-2 bg-purple-50 rounded">
                  <p className="font-medium">T&P Officer:</p>
                  <p className="text-gray-600">tp@charusat.ac.in</p>
                </div>
                <div className="p-2 bg-orange-50 rounded">
                  <p className="font-medium">Admin:</p>
                  <p className="text-gray-600">admin@charusat.ac.in</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
