import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function RecentActivity() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Time</TableHead>
          <TableHead>Domain</TableHead>
          <TableHead>Device</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">10:42:15</TableCell>
          <TableCell>google.com</TableCell>
          <TableCell>Mom's Phone</TableCell>
          <TableCell>
            <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700">
              Allowed
            </Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">10:40:32</TableCell>
          <TableCell>ads.example.com</TableCell>
          <TableCell>Living Room PC</TableCell>
          <TableCell>
            <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 hover:text-red-700">
              Blocked
            </Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">10:39:45</TableCell>
          <TableCell>youtube.com</TableCell>
          <TableCell>Kids Tablet</TableCell>
          <TableCell>
            <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700">
              Allowed
            </Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">10:38:21</TableCell>
          <TableCell>tracker.example.net</TableCell>
          <TableCell>Smart TV</TableCell>
          <TableCell>
            <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 hover:text-red-700">
              Blocked
            </Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">10:36:10</TableCell>
          <TableCell>netflix.com</TableCell>
          <TableCell>Smart TV</TableCell>
          <TableCell>
            <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700">
              Allowed
            </Badge>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

