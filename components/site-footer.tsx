import { Shield } from "lucide-react"
import Image from "next/image"

export function SiteFooter() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row">
        <div className="flex items-center gap-2">
          <div className="relative w-5 h-5">
            <Image 
              src="/images/logo.png" 
              alt="FortressHome Logo" 
              width={20} 
              height={20}
              className="object-contain"
            />
          </div>
          <p className="text-sm leading-loose text-muted-foreground md:text-left">
            FortressHome &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
        <div className="flex items-center">
          <p className="text-sm text-muted-foreground">Version 1.0.0</p>
        </div>
      </div>
    </footer>
  )
}

