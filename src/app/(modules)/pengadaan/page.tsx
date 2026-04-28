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
import { Eye, FileText, Truck } from "lucide-react"

const dummyPOs = [
  {
    id: "PO-2026-001",
    vendor: "PT. Bahtera Jaya",
    date: "2026-04-19",
    status: "Processed",
    total: "Rp 1.250.000.000",
    prReference: "PR-2026-003",
  },
  {
    id: "PO-2026-002",
    vendor: "Marine Solutions Ltd",
    date: "2026-04-20",
    status: "Sent to Vendor",
    total: "Rp 450.000.000",
    prReference: "PR-2026-002",
  },
]

export default function PengadaanPage() {
  return (
    <div className="space-y-4">
      <ModuleHeader
        title="Modul Pengadaan"
        description="Kelola Purchase Order (PO), WBS Assignment, dan Delivery Order (DO)."
        actionLabel="Buat PO Baru"
      />

      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">PO Number</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>PR Ref</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyPOs.map((po) => (
              <TableRow key={po.id}>
                <TableCell className="font-medium text-pelni-blue">{po.id}</TableCell>
                <TableCell>{po.vendor}</TableCell>
                <TableCell className="text-muted-foreground">{po.prReference}</TableCell>
                <TableCell>{po.date}</TableCell>
                <TableCell>{po.total}</TableCell>
                <TableCell>
                  <Badge
                    variant={po.status === "Processed" ? "default" : "secondary"}
                  >
                    {po.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" /> View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Truck className="h-4 w-4 mr-1" /> DO
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
