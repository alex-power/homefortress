import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { SchedulesList } from "@/components/schedules/schedules-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function SchedulesPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Time Schedules" text="Create schedules to limit internet access during specific times.">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Schedule
        </Button>
      </DashboardHeader>
      <SchedulesList />
    </DashboardShell>
  )
}

