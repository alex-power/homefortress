import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { FilteringRules } from "@/components/content-filtering/filtering-rules"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function ContentFilteringPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Content Filtering"
        text="Set up rules to block inappropriate content and protect your family."
      >
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Rule
        </Button>
      </DashboardHeader>
      <FilteringRules />
    </DashboardShell>
  )
}

