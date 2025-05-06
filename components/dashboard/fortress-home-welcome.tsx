"use client"

import { Shield, Lock, Wifi } from "lucide-react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export function FortressHomeWelcome() {
  return (
    <Card className="overflow-hidden brand-gradient-border">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative w-24 h-24 flex-shrink-0">
            <Image 
              src="/images/logo.png" 
              alt="FortressHome Logo" 
              width={96} 
              height={96}
              className="object-contain"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold brand-gradient-text mb-2">Welcome to FortressHome</h2>
            <p className="text-muted-foreground mb-4">Your comprehensive solution for home network security and protection</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Network Protection</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Family Safety</span>
              </div>
              <div className="flex items-center gap-2">
                <Wifi className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Content Filtering</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 