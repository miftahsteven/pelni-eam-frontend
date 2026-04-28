import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Anchor,
  Box,
  CheckCircle,
  Clock,
  FileText,
  Hammer,
  MapPin,
  TrendingUp,
} from "lucide-react"

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Asset",
      value: "1,248",
      description: "+12 from last month",
      icon: Box,
      color: "text-pelni-blue",
      bg: "bg-pelni-blue/10",
    },
    {
      title: "Asset Active",
      value: "1,102",
      description: "88% of total assets",
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "Under Maintenance",
      value: "42",
      description: "5 urgent repairs",
      icon: Hammer,
      color: "text-pelni-mid",
      bg: "bg-pelni-mid/10",
    },
    {
      title: "Disposed / Retired",
      value: "104",
      description: "Scheduled for auction",
      icon: Clock,
      color: "text-slate-500",
      bg: "bg-slate-100",
    },
  ]

  const secondaryStats = [
    { title: "Purchase Requests", value: "18", icon: FileText },
    { title: "Purchase Orders", value: "12", icon: FileText },
    { title: "Maintenance (Apr)", value: "56", icon: Hammer },
    { title: "Active Locations", value: "24", icon: MapPin },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-pelni-blue">Dashboard Overview</h1>
          <p className="text-slate-500 font-medium">Monitoring & Asset Lifecycle Management</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider text-pelni-mid border-pelni-mid/20">
            Last update: Today, 17:45
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Asset Lifecycle Status</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-lg bg-muted/20">
            <div className="text-center">
              <TrendingUp className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Chart: Asset Growth & Distribution</p>
              <p className="text-xs text-muted-foreground mt-1">(Real-time data visualization placeholder)</p>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Asset Registered", desc: "KM Kelud Hull #01", time: "2h ago" },
                { title: "Maintenance Done", desc: "Pump System - KM Labobar", time: "4h ago" },
                { title: "New PR Created", desc: "Sparepart for KM Ciremai", time: "1d ago" },
                { title: "Asset Disposed", desc: "Old Radar - KM Egon", time: "2d ago" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.desc}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {secondaryStats.map((stat, i) => (
          <div key={i} className="flex items-center gap-4 rounded-lg border p-4 bg-white shadow-sm">
            <div className="p-2 bg-slate-100 rounded-md">
              <stat.icon className="h-5 w-5 text-slate-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
              <p className="text-xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
