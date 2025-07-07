export interface User {
  email: string
  role: "student" | "teacher" | "tp-officer" | "admin"
  name: string
  loginTime: string
}

export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null

  const userData = localStorage.getItem("user")
  if (!userData) return null

  try {
    return JSON.parse(userData)
  } catch {
    return null
  }
}

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user")
    window.location.href = "/"
  }
}

export const requireAuth = (allowedRoles?: string[]) => {
  const user = getCurrentUser()

  if (!user) {
    if (typeof window !== "undefined") {
      window.location.href = "/auth"
    }
    return null
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (typeof window !== "undefined") {
      window.location.href = "/dashboard/" + user.role
    }
    return null
  }

  return user
}
