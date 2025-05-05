"use client"

import { BarChart3, Download, Filter, PieChart, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ReportsList() {
  return (
    <Tabs defaultValue="summary" className="space-y-4">
      <TabsList>
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger value="devices">By Device</TabsTrigger>
        <TabsTrigger value="content">Content</TabsTrigger>
      </TabsList>
      <TabsContent value="summary" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Network Activity</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,543</div>
              <p className="text-xs text-muted-foreground">Total queries in the last 24 hours</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Content Filtering</CardTitle>
              <Filter className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,350</div>
              <p className="text-xs text-muted-foreground">Blocked queries in the last 24 hours</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Protection Status</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Active</div>
              <p className="text-xs text-muted-foreground">All protection features are enabled</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
            </CardFooter>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
            <CardDescription>Network activity over the past week</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <PieChart className="mx-auto h-16 w-16 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Weekly Activity Report</h3>
                <p className="mt-2 text-sm text-muted-foreground">Detailed weekly reports are available for download</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download Full Report
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="devices" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Device Reports</CardTitle>
            <CardDescription>Activity reports by device</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <h3 className="text-lg font-medium">Device Reports</h3>
                <p className="mt-2 text-sm text-muted-foreground">Select a device to view detailed reports</p>
                <Button variant="outline" className="mt-4">
                  View Sample Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="content" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Content Reports</CardTitle>
            <CardDescription>Reports on blocked content categories</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <h3 className="text-lg font-medium">Content Reports</h3>
                <p className="mt-2 text-sm text-muted-foreground">View reports on blocked content by category</p>
                <Button variant="outline" className="mt-4">
                  View Sample Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

