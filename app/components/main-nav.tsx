"use client"

import type * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link
        href="/"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Dashboard
      </Link>
      <Link
        href="/devices"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/devices" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Devices
      </Link>
      <Link
        href="/content-filtering"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/content-filtering" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Content Filtering
      </Link>
      <Link
        href="/schedules"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/schedules" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Schedules
      </Link>
      <Link
        href="/reports"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/reports" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Reports
      </Link>
    </nav>
  )
}

