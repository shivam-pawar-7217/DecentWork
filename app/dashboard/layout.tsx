"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Briefcase,
  MessageSquare,
  Wallet,
  BarChart2,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion, AnimatePresence } from "framer-motion"
import { SubtleBackground } from "@/components/ui/subtle-background"

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Jobs", href: "/dashboard/jobs", icon: Briefcase },
  { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { name: "Wallet", href: "/dashboard/wallet", icon: Wallet },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart2 },
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar */}
      <div className="lg:hidden">
        <div className="fixed inset-0 z-40 flex">
          <AnimatePresence>
            {sidebarOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 bg-black/50"
                  onClick={() => setSidebarOpen(false)}
                />
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="relative flex w-full max-w-xs flex-1 flex-col bg-card pt-5 pb-4"
                >
                  <div className="absolute top-0 right-0 pt-2 pr-2">
                    <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                      <X className="h-6 w-6" />
                    </Button>
                  </div>
                  <div className="flex flex-shrink-0 items-center px-4">
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                      DecentWork
                    </span>
                  </div>
                  <div className="mt-8 flex flex-1 flex-col">
                    <nav className="flex-1 space-y-1 px-2">
                      {navItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                            pathname === item.href
                              ? "bg-primary text-primary-foreground"
                              : "text-foreground hover:bg-accent hover:text-accent-foreground"
                          }`}
                        >
                          <item.icon className="mr-4 h-6 w-6 flex-shrink-0" />
                          {item.name}
                        </Link>
                      ))}
                    </nav>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r border-white/5 bg-card">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                DecentWork
              </span>
            </div>
            <nav className="mt-8 flex-1 space-y-1 px-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-shrink-0 border-t border-white/5 p-4">
            <div className="flex items-center">
              <div>
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">Verified Freelancer</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col lg:pl-64">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-background/80 backdrop-blur-sm border-b border-white/5">
          <Button variant="ghost" size="icon" className="lg:hidden px-4" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </Button>

          <div className="flex flex-1 justify-between px-4">
            <div className="flex flex-1">
              <div className="w-full max-w-lg lg:max-w-xs">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input type="search" placeholder="Search..." className="pl-10" />
                </div>
              </div>
            </div>
            <div className="ml-4 flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <main className="flex-1">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <SubtleBackground type="grid" intensity="low" className="z-0" />
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

