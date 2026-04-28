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
import { QrCode, ClipboardCheck, Wrench } from "lucide-react"

const dummyInstallations = [
  {
    id: "INST-001",
    assetName: "GPS Navigation System",
    location: "KM Kelud - Bridge",
    installer: "Taufiq Hidayat",
    date: "2026-04-18",
    status: "Installed",
  },
  {
    id: "INST-002",
    assetName: "Water Cooling Pump #2",
    location: "KM Labobar - Engine Room",
    installer: "Riko Prawira",
    date: "2026-04-19",
    status: "Testing",
  },
]

export default function PemasanganPage() {
  return (
    <div className="space-y-4">
      <ModuleHeader
        title="Modul Pemasangan"
        description="Pencatatan instalasi aset baru, acceptance test, dan registrasi nomor identitas aset."
        actionLabel="Register Pemasangan"
      />

      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Installation ID</TableHead>
              <TableHead>Asset Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Installer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyInstallations.map((inst) => (
              <TableRow key={inst.id}>
                <TableCell className="font-medium text-blue-600">{inst.id}</TableCell>
                <TableCell>{inst.assetName}</TableCell>
                <TableCell>{inst.location}</TableCell>
                <TableCell>{inst.installer}</TableCell>
                <TableCell>{inst.date}</TableCell>
                <TableCell>
                  <Badge
                    variant={inst.status === "Installed" ? "success" : "warning"}
                  >
                    {inst.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      <ClipboardCheck className="h-4 w-4 mr-1" /> Test
                    </Button>
                    <Button variant="outline" size="sm">
                      <QrCode className="h-4 w-4 mr-1" /> ID
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
