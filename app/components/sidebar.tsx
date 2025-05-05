"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Clock, Filter, LayoutDashboard, Monitor, Settings, Shield, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-sidebar text-sidebar-foreground md:block">
      <div className="flex h-full flex-col gap-2 p-4">
        <Link href="/" className="flex h-12 items-center justify-center rounded-md px-3 text-sm font-medium mb-2">
          <div className="relative w-8 h-8 mr-2">
            <Image 
              src="/images/logo.png" 
              alt="FortressHome Logo" 
              width={32} 
              height={32}
              className="object-contain"
            />
          </div>
          <span className="text-lg font-semibold brand-gradient-text">FortressHome</span>
        </Link>
        <div className="mt-4 flex flex-col gap-1">
          <Button asChild variant={pathname === "/" ? "secondary" : "ghost"} className="justify-start">
            <Link href="/">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </Button>
          <Button asChild variant={pathname === "/devices" ? "secondary" : "ghost"} className="justify-start">
            <Link href="/devices">
              <Monitor className="mr-2 h-4 w-4" />
              Devices
            </Link>
          </Button>
          <Button asChild variant={pathname === "/content-filtering" ? "secondary" : "ghost"} className="justify-start">
            <Link href="/content-filtering">
              <Filter className="mr-2 h-4 w-4" />
              Content Filtering
            </Link>
          </Button>
          <Button asChild variant={pathname === "/schedules" ? "secondary" : "ghost"} className="justify-start">
            <Link href="/schedules">
              <Clock className="mr-2 h-4 w-4" />
              Schedules
            </Link>
          </Button>
          <Button asChild variant={pathname === "/reports" ? "secondary" : "ghost"} className="justify-start">
            <Link href="/reports">
              <BarChart3 className="mr-2 h-4 w-4" />
              Reports
            </Link>
          </Button>
          <Button asChild variant={pathname === "/settings" ? "secondary" : "ghost"} className="justify-start">
            <Link href="/settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </Button>
        </div>
        <div className="mt-auto">
          <div className="rounded-md border brand-gradient p-4 text-white">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-white" />
              <h4 className="font-medium">Protection Active</h4>
            </div>
            <p className="mt-2 text-xs">
              Your network is protected. Security monitoring is active.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
