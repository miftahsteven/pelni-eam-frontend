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
import { Trash2, MoveHorizontal, RefreshCcw } from "lucide-react"

const dummyDisposals = [
  {
    assetId: "AST-KL-099",
    assetName: "Old Radar Sys - KM Kelud",
    reason: "Damaged beyond repair",
    date: "2026-04-10",
    status: "Disposed",
  },
  {
    assetId: "AST-LB-112",
    assetName: "Deck Lighting - KM Labobar",
    reason: "Replacement",
    date: "2026-04-20",
    status: "In Progress",
  },
]

export default function PenghapusanPage() {
  return (
    <div className="space-y-4">
      <ModuleHeader
        title="Modul Penghapusan"
        description="Pelacakan mutasi aset (movement), penggantian (replacement), dan penghapusan (disposal)."
        actionLabel="Ajukan Disposal"
      />

      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset ID</TableHead>
              <TableHead>Asset Name</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyDisposals.map((item) => (
              <TableRow key={item.assetId}>
                <TableCell className="font-medium text-red-600">{item.assetId}</TableCell>
                <TableCell>{item.assetName}</TableCell>
                <TableCell>{item.reason}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>
                  <Badge
                    variant={item.status === "Disposed" ? "destructive" : "outline"}
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      <MoveHorizontal className="h-4 w-4 mr-1" /> Move
                    </Button>
                    <Button variant="outline" size="sm">
                      <RefreshCcw className="h-4 w-4 mr-1" /> Replace
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
