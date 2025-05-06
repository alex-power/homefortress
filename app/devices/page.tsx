import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DevicesList } from "@/components/devices/devices-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function DevicesPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Devices" text="Manage and monitor all devices on your network.">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Device
        </Button>
      </DashboardHeader>
      <DevicesList />
    </DashboardShell>
  )
}

