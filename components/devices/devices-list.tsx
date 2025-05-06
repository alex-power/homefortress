"use client"

import { useState } from "react"
import { CheckCircle2, MoreHorizontal, PauseCircle, Smartphone, Tablet, Tv } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"

const devices = [
  {
    id: "1",
    name: "Living Room PC",
    ip: "192.168.1.101",
    mac: "00:1A:2B:3C:4D:5E",
    type: "desktop",
    status: "active",
    protection: true,
    lastSeen: "2 minutes ago",
  },
  {
    id: "2",
    name: "Mom's Phone",
    ip: "192.168.1.102",
    mac: "00:2B:3C:4D:5E:6F",
    type: "phone",
    status: "active",
    protection: true,
    lastSeen: "5 minutes ago",
  },
  {
    id: "3",
    name: "Kids Tablet",
    ip: "192.168.1.103",
    mac: "00:3C:4D:5E:6F:7G",
    type: "tablet",
    status: "active",
    protection: true,
    lastSeen: "10 minutes ago",
  },
  {
    id: "4",
    name: "Smart TV",
    ip: "192.168.1.104",
    mac: "00:4D:5E:6F:7G:8H",
    type: "tv",
    status: "active",
    protection: true,
    lastSeen: "15 minutes ago",
  },
  {
    id: "5",
    name: "Guest Laptop",
    ip: "192.168.1.105",
    mac: "00:5E:6F:7G:8H:9I",
    type: "desktop",
    status: "inactive",
    protection: false,
    lastSeen: "2 days ago",
  },
]

export function DevicesList() {
  const [deviceList, setDeviceList] = useState(devices)

  const toggleProtection = (id: string) => {
    setDeviceList(
      deviceList.map((device) => (device.id === id ? { ...device, protection: !device.protection } : device)),
    )
  }

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "phone":
        return <Smartphone className="h-8 w-8 text-muted-foreground" />
      case "tablet":
        return <Tablet className="h-8 w-8 text-muted-foreground" />
      case "tv":
        return <Tv className="h-8 w-8 text-muted-foreground" />
      default:
        return <Smartphone className="h-8 w-8 text-muted-foreground" />
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {deviceList.map((device) => (
        <Card key={device.id}>
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div className="flex space-x-4">
              {getDeviceIcon(device.type)}
              <div>
                <CardTitle>{device.name}</CardTitle>
                <CardDescription>{device.ip}</CardDescription>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>Edit Device</DropdownMenuItem>
                <DropdownMenuItem>View Activity</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Block Device</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status:</span>
                <Badge
                  variant="outline"
                  className={device.status === "active" ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-700"}
                >
                  {device.status === "active" ? (
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                  ) : (
                    <PauseCircle className="mr-1 h-3 w-3" />
                  )}
                  {device.status === "active" ? "Online" : "Offline"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">MAC Address:</span>
                <span className="text-sm text-muted-foreground">{device.mac}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Last Seen:</span>
                <span className="text-sm text-muted-foreground">{device.lastSeen}</span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-medium">Protection:</span>
                <Switch checked={device.protection} onCheckedChange={() => toggleProtection(device.id)} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

