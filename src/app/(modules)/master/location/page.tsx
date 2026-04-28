import { ModuleHeader } from "@/components/module-header"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { MapPin, Edit } from "lucide-react"

const dummyLocations = [
  { id: "LOC-001", name: "KM Kelud", type: "Vessel", description: "Utama Service Area" },
  { id: "LOC-002", name: "KM Labobar", type: "Vessel", description: "Utama Service Area" },
  { id: "LOC-003", name: "Gudang Pusat Jakarta", type: "Warehouse", description: "Main Sparepart Storage" },
  { id: "LOC-004", name: "Kantor Pusat PELNI", type: "Office", description: "Admin HQ" },
]

export default function LocationPage() {
  return (
    <div className="space-y-4">
      <ModuleHeader
        title="Master Location"
        description="Daftar lokasi aset, baik di atas kapal maupun di fasilitas darat."
        actionLabel="Tambah Lokasi"
      />

      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Location Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyLocations.map((loc) => (
              <TableRow key={loc.id}>
                <TableCell className="font-medium">{loc.id}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  {loc.name}
                </TableCell>
                <TableCell>{loc.type}</TableCell>
                <TableCell className="text-muted-foreground">{loc.description}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
