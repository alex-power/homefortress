import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { ReportsList } from "@/components/reports/reports-list"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function ReportsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Reports" text="View detailed reports on network activity and blocked content.">
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </DashboardHeader>
      <ReportsList />
    </DashboardShell>
  )
}

