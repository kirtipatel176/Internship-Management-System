"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Bell, LogOut, Settings, User, Menu } from "lucide-react"
import { getCurrentUser } from "@/lib/data"
import { useRouter } from "next/navigation"
import { useIsMobile } from "@/hooks/use-mobile"

interface HeaderProps {
  onMenuClick?: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [showMobileLogoutDialog, setShowMobileLogoutDialog] = useState(false)
  const router = useRouter()
  const isMobile = useIsMobile()
  const user = getCurrentUser()

  const handleLogout = () => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("user")
        localStorage.clear()
      }
      setShowLogoutDialog(false)
      setShowMobileLogoutDialog(false)
      window.location.replace("/auth")
    } catch (error) {
      console.error("Logout error:", error)
      window.location.href = "/auth"
    }
  }

  const handleMobileLogout = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowMobileLogoutDialog(true)
  }

  const handleDesktopLogout = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowLogoutDialog(true)
  }

  if (!user) return null

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-white/20 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 shadow-sm">
        <div className="container flex h-16 max-w-screen-2xl items-center px-4">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="mr-3 lg:hidden hover:bg-blue-50 transition-colors"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5 text-slate-700" />
            <span className="sr-only">Toggle menu</span>
          </Button>

          {/* Logo/Title */}
          <div className="mr-4 hidden lg:flex">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Internship Management
            </h1>
          </div>

          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            {/* Mobile user info and logout */}
            <div className="flex items-center space-x-3 lg:hidden">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-800 truncate max-w-32">{user.name}</span>
                <span className="text-xs text-slate-500 capitalize">{user.role.replace("-", " ")}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMobileLogout}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="sr-only">Logout</span>
              </Button>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden lg:flex items-center space-x-3">
              <Button variant="ghost" size="icon" className="relative hover:bg-blue-50 transition-colors">
                <Bell className="h-5 w-5 text-slate-600" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                <span className="sr-only">Notifications</span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full hover:ring-2 hover:ring-blue-200 transition-all"
                  >
                    <Avatar className="h-9 w-9 border-2 border-white shadow-md">
                      <AvatarImage src="/avatars/01.png" alt={user.name} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 p-2" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg mb-2">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-semibold leading-none text-slate-800">{user.name}</p>
                      <p className="text-xs leading-none text-slate-500">{user.email}</p>
                      <p className="text-xs leading-none text-blue-600 capitalize font-medium">
                        {user.role.replace("-", " ")}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="hover:bg-blue-50 transition-colors">
                    <User className="mr-2 h-4 w-4 text-slate-600" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-blue-50 transition-colors">
                    <Settings className="mr-2 h-4 w-4 text-slate-600" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600 focus:text-red-600 hover:bg-red-50 transition-colors"
                    onClick={handleDesktopLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          </div>
        </div>
      </header>

      {/* Desktop Logout Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent className="border-0 shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-slate-800">Are you sure you want to logout?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-600">
              You will be redirected to the login page and will need to sign in again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="hover:bg-slate-50">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all"
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Mobile Logout Dialog */}
      <AlertDialog open={showMobileLogoutDialog} onOpenChange={setShowMobileLogoutDialog}>
        <AlertDialogContent className="mx-4 border-0 shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-slate-800">Are you sure you want to logout?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-600">
              You will be redirected to the login page and will need to sign in again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="hover:bg-slate-50">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all"
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
