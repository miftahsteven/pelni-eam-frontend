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
import { Anchor, Edit, Box } from "lucide-react"

const dummyEquipments = [
  { id: "EQP-001", name: "Mesin Utama (Main Engine)", category: "Mechanical", unit: "Unit" },
  { id: "EQP-002", name: "Radar Navigation System", category: "Electronics", unit: "Set" },
  { id: "EQP-003", name: "Pompa Pemadam (Fire Pump)", category: "Safety", unit: "Unit" },
  { id: "EQP-004", name: "SekocI Penyelamat", category: "Safety", unit: "Unit" },
]

export default function EquipmentPage() {
  return (
    <div className="space-y-4">
      <ModuleHeader
        title="Master Equipment"
        description="Daftar tipe peralatan / equipment yang dapat diregistrasikan sebagai aset."
        actionLabel="Tambah Equipment"
      />

      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">ID</TableHead>
              <TableHead>Equipment Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>UoM</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyEquipments.map((eqp) => (
              <TableRow key={eqp.id}>
                <TableCell className="font-medium">{eqp.id}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <Box className="h-4 w-4 text-muted-foreground" />
                  {eqp.name}
                </TableCell>
                <TableCell>{eqp.category}</TableCell>
                <TableCell>{eqp.unit}</TableCell>
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
