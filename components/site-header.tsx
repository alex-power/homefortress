import Link from "next/link"
import { Shield } from "lucide-react"
import Image from "next/image"

import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative w-7 h-7">
            <Image 
              src="/images/logo.png" 
              alt="FortressHome Logo" 
              width={28} 
              height={28}
              className="object-contain"
            />
          </div>
          <span className="font-bold text-lg brand-gradient-text">FortressHome</span>
        </Link>
        <MainNav className="mx-6 hidden md:flex" />
        <MobileNav />
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  )
}

