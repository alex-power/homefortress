"use client"

import { useState } from "react"
import { AlertCircle } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SettingsTabs() {
  const [advancedMode, setAdvancedMode] = useState(false)
  const [autoUpdate, setAutoUpdate] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [telemetry, setTelemetry] = useState(false)

  return (
    <Tabs defaultValue="general" className="space-y-4">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="network">Network</TabsTrigger>
        <TabsTrigger value="privacy">Privacy</TabsTrigger>
        <TabsTrigger value="advanced">Advanced</TabsTrigger>
      </TabsList>
      <TabsContent value="general" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Manage general application settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="advanced-mode" className="flex flex-col space-y-1">
                <span>Advanced Mode</span>
                <span className="font-normal text-sm text-muted-foreground">Enable advanced features and settings</span>
              </Label>
              <Switch id="advanced-mode" checked={advancedMode} onCheckedChange={setAdvancedMode} />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="auto-update" className="flex flex-col space-y-1">
                <span>Automatic Updates</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Automatically update blocklists and rules
                </span>
              </Label>
              <Switch id="auto-update" checked={autoUpdate} onCheckedChange={setAutoUpdate} />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="notifications" className="flex flex-col space-y-1">
                <span>Notifications</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Receive notifications about important events
                </span>
              </Label>
              <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="network" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Network Settings</CardTitle>
            <CardDescription>Configure network and DNS settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="ip-address">IP Address</Label>
              <Input id="ip-address" value="192.168.1.100" readOnly />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subnet-mask">Subnet Mask</Label>
              <Input id="subnet-mask" value="255.255.255.0" readOnly />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="gateway">Gateway</Label>
              <Input id="gateway" value="192.168.1.1" readOnly />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dns-servers">DNS Servers</Label>
              <Input id="dns-servers" value="1.1.1.1, 1.0.0.1" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="privacy" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Privacy Settings</CardTitle>
            <CardDescription>Manage privacy and data collection settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Privacy Notice</AlertTitle>
              <AlertDescription>
                Your privacy is important to us. We only collect data necessary for the functioning of the application.
              </AlertDescription>
            </Alert>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="telemetry" className="flex flex-col space-y-1">
                <span>Usage Telemetry</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Send anonymous usage data to help improve the application
                </span>
              </Label>
              <Switch id="telemetry" checked={telemetry} onCheckedChange={setTelemetry} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="data-retention">Data Retention Period</Label>
              <select
                id="data-retention"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="7">7 days</option>
                <option value="30">30 days</option>
                <option value="90">90 days</option>
                <option value="365">1 year</option>
              </select>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="advanced" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Advanced Settings</CardTitle>
            <CardDescription>Configure advanced system settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                These settings are for advanced users only. Incorrect configuration may affect system performance.
              </AlertDescription>
            </Alert>
            <div className="grid gap-2">
              <Label htmlFor="custom-blocklist">Custom Blocklist URL</Label>
              <Input id="custom-blocklist" placeholder="https://example.com/blocklist.txt" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cache-size">Cache Size (MB)</Label>
              <Input id="cache-size" type="number" defaultValue={512} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="log-level">Log Level</Label>
              <select
                id="log-level"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="error">Error</option>
                <option value="warn">Warning</option>
                <option value="info">Info</option>
                <option value="debug">Debug</option>
              </select>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

