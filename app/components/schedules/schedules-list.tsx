"use client"

import { useState } from "react"
import { Clock, Edit, Plus, Smartphone, Tablet, Trash2, Tv, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"

const schedules = [
  {
    id: "1",
    name: "Kids Bedtime",
    description: "Block internet access during bedtime",
    enabled: true,
    days: ["Mon", "Tue", "Wed", "Thu", "Sun"],
    timeStart: "21:00",
    timeEnd: "07:00",
    devices: ["Kids Tablet", "Kids PC"],
  },
  {
    id: "2",
    name: "Study Time",
    description: "Block social media during study hours",
    enabled: true,
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    timeStart: "15:00",
    timeEnd: "18:00",
    devices: ["Kids Tablet", "Kids PC"],
  },
  {
    id: "3",
    name: "Family Dinner",
    description: "Block internet during family dinner",
    enabled: true,
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    timeStart: "18:30",
    timeEnd: "19:30",
    devices: ["All Devices"],
  },
]

export function SchedulesList() {
  const [scheduleList, setScheduleList] = useState(schedules)

  const toggleSchedule = (id: string) => {
    setScheduleList(
      scheduleList.map((schedule) => (schedule.id === id ? { ...schedule, enabled: !schedule.enabled } : schedule)),
    )
  }

  const deleteSchedule = (id: string) => {
    setScheduleList(scheduleList.filter((schedule) => schedule.id !== id))
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {scheduleList.map((schedule) => (
        <Card key={schedule.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                {schedule.name}
              </CardTitle>
              <Switch checked={schedule.enabled} onCheckedChange={() => toggleSchedule(schedule.id)} />
            </div>
            <CardDescription>{schedule.description}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <div className="mb-1 text-sm font-medium">Schedule:</div>
              <div className="text-sm">
                {schedule.days.join(", ")} • {schedule.timeStart} - {schedule.timeEnd}
              </div>
            </div>
            <div>
              <div className="mb-1 text-sm font-medium">Applies to:</div>
              <div className="flex flex-wrap gap-2">
                {schedule.devices.map((device) => (
                  <Badge key={device} variant="secondary">
                    {device === "All Devices" ? (
                      <Users className="mr-1 h-3 w-3" />
                    ) : device.includes("Tablet") ? (
                      <Tablet className="mr-1 h-3 w-3" />
                    ) : device.includes("TV") ? (
                      <Tv className="mr-1 h-3 w-3" />
                    ) : (
                      <Smartphone className="mr-1 h-3 w-3" />
                    )}
                    {device}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button variant="outline" size="sm" onClick={() => deleteSchedule(schedule.id)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
      <Dialog>
        <DialogTrigger asChild>
          <Card className="flex h-full flex-col items-center justify-center p-6 text-center hover:bg-muted/50 cursor-pointer">
            <Plus className="mb-4 h-8 w-8 text-muted-foreground" />
            <CardTitle className="text-xl">Add New Schedule</CardTitle>
            <CardDescription className="mt-2">Create a new time-based access schedule</CardDescription>
          </Card>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Schedule</DialogTitle>
            <DialogDescription>Create a new schedule to limit internet access during specific times.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <p className="text-sm text-muted-foreground">Schedule creation form will be implemented here.</p>
          </div>
          <DialogFooter>
            <Button variant="outline">Cancel</Button>
            <Button>Create Schedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

