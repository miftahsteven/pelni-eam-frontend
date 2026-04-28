import { ModuleHeader } from "@/components/module-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Anchor, Calendar, History, MapPin, Wrench, ShieldCheck, AlertTriangle } from "lucide-react"

export default function AssetDetailPage() {
  // Mock data for a single asset (KM Kelud Main Engine)
  const asset = {
    id: "AST-KL-001",
    name: "Mesin Utama (Main Engine) - Hull #01",
    category: "Mechanical",
    location: "KM Kelud - Engine Room",
    status: "Active",
    registrationDate: "2024-01-15",
    lastMaintenance: "2026-03-10",
    nextMaintenance: "2026-05-10",
    manufacturer: "Wärtsilä",
    model: "12V46F",
    serialNumber: "W-5544-3322",
  }

  const history = [
    { date: "2026-03-10", activity: "Routine Maintenance", personnel: "Andry Siswanto", status: "Completed" },
    { date: "2026-01-05", activity: "Oil Filter Replacement", personnel: "Budi Santoso", status: "Completed" },
    { date: "2025-11-20", activity: "Performance Tuning", personnel: "Expert Team", status: "Completed" },
    { date: "2024-01-15", activity: "Installation & Acceptance", personnel: "Taufiq Hidayat", status: "Completed" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">{asset.id}</h1>
            <Badge variant="success" className="h-6">Active</Badge>
          </div>
          <p className="text-muted-foreground">{asset.name}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><History className="mr-2 h-4 w-4" /> Open Support Ticket</Button>
          <Button className="bg-pelni-blue hover:bg-pelni-mid shadow-md">Schedule Maintenance</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Asset Specification</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Manufacturer</p>
              <p className="font-semibold">{asset.manufacturer}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Model</p>
              <p className="font-semibold">{asset.model}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Serial Number</p>
              <p className="font-mono text-sm">{asset.serialNumber}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Category</p>
              <p className="font-semibold">{asset.category}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status & Location</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-pelni-blue/10 p-2 rounded-lg">
                <MapPin className="h-5 w-5 text-pelni-blue" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Current Location</p>
                <p className="font-semibold">{asset.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <ShieldCheck className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Condition</p>
                <p className="font-semibold text-green-600">Excellent</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <Calendar className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Next Maintenance</p>
                <p className="font-semibold">{asset.nextMaintenance}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Maintenance & Event History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative border-l ml-3 pl-6 space-y-8">
            {history.map((event, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-pelni-blue border-2 border-white shadow-sm" />
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold">{event.activity}</p>
                    <p className="text-sm text-muted-foreground">Performed by {event.personnel}</p>
                  </div>
                  <div className="flex flex-col md:items-end">
                    <p className="text-sm font-medium">{event.date}</p>
                    <Badge variant="outline" className="w-fit">{event.status}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
