"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, Plus, User, Settings, Sun, Moon, X, AlertTriangle, Clock, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"
import Link from "next/link"
// import { useStore } from "@/lib/store"
import { LogoutButton } from "@/components/logout-button";
import { ConnectButton } from '@rainbow-me/rainbowkit';


export function TopBar() {
  const [date, setDate] = useState(new Date())
  const [showAddTask, setShowAddTask] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  // const { tasks } = useStore()
  const notificationsRef = useRef<HTMLDivElement>(null)

  // Set mounted state after hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  // Update date every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date())
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  // Close notifications when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Format date: Monday, January 1, 2023
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Format time: 12:00 PM
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Get notifications

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="h-16 border-b border-border/50 glassmorphism flex items-center justify-between px-4 md:px-6 z-40"
    >
      <div className="flex items-center space-x-4">
        <div className="hidden md:block">
          <p className="text-sm text-muted-foreground">{formattedDate}</p>
          <p className="text-lg font-semibold">{formattedTime}</p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {mounted && (
          <Button variant="outline" size="icon" className="relative glow-hover" onClick={toggleTheme}>
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle Theme</span>
          </Button>
        )}

        <div  className="relative ">
          {/* <Plus className="h-5 w-5" />
          <span className="sr-only">Add Task</span> */}
          <ConnectButton label="Sign in" />
        </div>

        <div className="relative" ref={notificationsRef}>
          <Button
            variant="outline"
            size="icon"
            className="relative glow-hover"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
            {/* {hasNotifications && <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary"></span>} */}
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="glow-hover">
              <User className="h-5 w-5" />
              <span className="sr-only">User Menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/account">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/account">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogoutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      
    </motion.div>
  )
}
