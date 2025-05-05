"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Shield } from "lucide-react"

import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <svg strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
            <path
              d="M3 5H11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 12H16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 19H21"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <div className="px-7">
          <Link href="/" className="flex items-center space-x-2" onClick={() => setOpen(false)}>
            <Shield className="h-6 w-6" />
            <span className="font-bold">HomeGuard</span>
          </Link>
        </div>
        <div className="mt-8 flex flex-col space-y-3">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className={cn(
              "px-7 py-2 text-base font-medium transition-colors hover:text-primary",
              pathname === "/" ? "text-primary" : "text-muted-foreground",
            )}
          >
            Dashboard
          </Link>
          <Link
            href="/devices"
            onClick={() => setOpen(false)}
            className={cn(
              "px-7 py-2 text-base font-medium transition-colors hover:text-primary",
              pathname === "/devices" ? "text-primary" : "text-muted-foreground",
            )}
          >
            Devices
          </Link>
          <Link
            href="/content-filtering"
            onClick={() => setOpen(false)}
            className={cn(
              "px-7 py-2 text-base font-medium transition-colors hover:text-primary",
              pathname === "/content-filtering" ? "text-primary" : "text-muted-foreground",
            )}
          >
            Content Filtering
          </Link>
          <Link
            href="/schedules"
            onClick={() => setOpen(false)}
            className={cn(
              "px-7 py-2 text-base font-medium transition-colors hover:text-primary",
              pathname === "/schedules" ? "text-primary" : "text-muted-foreground",
            )}
          >
            Schedules
          </Link>
          <Link
            href="/reports"
            onClick={() => setOpen(false)}
            className={cn(
              "px-7 py-2 text-base font-medium transition-colors hover:text-primary",
              pathname === "/reports" ? "text-primary" : "text-muted-foreground",
            )}
          >
            Reports
          </Link>
          <Link
            href="/settings"
            onClick={() => setOpen(false)}
            className={cn(
              "px-7 py-2 text-base font-medium transition-colors hover:text-primary",
              pathname === "/settings" ? "text-primary" : "text-muted-foreground",
            )}
          >
            Settings
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}

