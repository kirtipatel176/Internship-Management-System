"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/data"

interface AuthGuardProps {
  children: React.ReactNode
  allowedRoles?: string[]
}

export function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const user = getCurrentUser()

    if (!user) {
      router.push("/auth")
      return
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      router.push(`/dashboard/${user.role}`)
      return
    }

    setIsAuthorized(true)
    setIsLoading(false)
  }, [router, allowedRoles])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-slate-600 font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthorized) {
    return null
  }

  return <>{children}</>
}
