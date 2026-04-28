import { ModuleHeader } from "@/components/module-header"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, History, Wrench } from "lucide-react"

const dummyMaintenance = [
  {
    assetId: "AST-KL-001",
    assetName: "Hull KM Kelud",
    type: "Routine Check",
    scheduled: "2026-05-01",
    status: "Scheduled",
    technician: "Andry Siswanto",
  },
  {
    assetId: "AST-LB-042",
    assetName: "Engine Pump KM Labobar",
    type: "Repair",
    scheduled: "2026-04-20",
    status: "In Progress",
    technician: "Bambang Kurnia",
  },
]

export default function PemeliharaanPage() {
  return (
    <div className="space-y-4">
      <ModuleHeader
        title="Modul Pemeliharaan"
        description="Jadwal maintenance, stok opname sparepart, dan asset tracking."
        actionLabel="Jadwal Maintenance"
      />

      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset ID</TableHead>
              <TableHead>Asset Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Scheduled Date</TableHead>
              <TableHead>Technician</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyMaintenance.map((maint) => (
              <TableRow key={maint.assetId}>
                <TableCell className="font-medium">{maint.assetId}</TableCell>
                <TableCell>{maint.assetName}</TableCell>
                <TableCell>{maint.type}</TableCell>
                <TableCell>{maint.scheduled}</TableCell>
                <TableCell>{maint.technician}</TableCell>
                <TableCell>
                  <Badge
                    variant={maint.status === "Scheduled" ? "outline" : "warning"}
                  >
                    {maint.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      <History className="h-4 w-4 mr-1" /> History
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-1" /> Re-schedule
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
