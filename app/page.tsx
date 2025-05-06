import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { FortressHomeWelcome } from "@/components/dashboard/fortress-home-welcome"
import { OverviewStats } from "@/components/dashboard/overview-stats"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { TopDevices } from "@/components/dashboard/top-devices"
import { TopDomains } from "@/components/dashboard/top-domains"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, ShieldCheck } from "lucide-react"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Monitor and secure your network with FortressHome.">
        <Button variant="outline" className="ml-auto">
          <ShieldCheck className="mr-2 h-4 w-4 text-primary" />
          Protection Active
        </Button>
      </DashboardHeader>
      
      <div className="mb-6">
        <FortressHomeWelcome />
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <OverviewStats />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Top Blocked Domains</CardTitle>
                <CardDescription>The most frequently blocked domains in the last 24 hours</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <TopDomains />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Top Devices</CardTitle>
                <CardDescription>Devices with the most activity</CardDescription>
              </CardHeader>
              <CardContent>
                <TopDevices />
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest network activity across all devices</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentActivity />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>Detailed analytics will be displayed here</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-lg font-medium">Analytics Dashboard</h3>
                <p className="text-muted-foreground mt-2">Detailed analytics view is under development</p>
                <Button variant="outline" className="mt-4">
                  View Sample Report
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="devices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Devices</CardTitle>
              <CardDescription>Manage all devices on your network</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-lg font-medium">Device Management</h3>
                <p className="text-muted-foreground mt-2">Device management view is under development</p>
                <Button variant="outline" className="mt-4">
                  View Sample Devices
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

