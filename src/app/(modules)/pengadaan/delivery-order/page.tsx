"use client"

import { useState } from "react"
import { 
  Truck, 
  Search, 
  Filter, 
  Plus, 
  ArrowRight, 
  Clock,
  CheckCircle2,
  AlertCircle,
  Package,
  Calendar,
  History,
  FileText,
  MapPin,
  ClipboardCheck
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"
import { dummyDOs } from "@/lib/mocks/delivery-order"
import { StatusBadge } from "@/components/eam/status-badge"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export default function DeliveryOrderDashboard() {
  const [activeTab, setActiveTab] = useState("all")

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Delivery Order</h1>
          <p className="text-sm text-slate-500 font-medium tracking-tight">Monitor vendor shipments and incoming goods.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 font-bold border-slate-300">
            <History className="h-4 w-4" /> Transit History
          </Button>
          <Button className="bg-pelni-blue hover:bg-pelni-mid gap-2 font-bold shadow-lg shadow-pelni-blue/20" nativeButton={false} render={
            <Link href="/pengadaan/delivery-order/create">
              <Plus className="h-4 w-4" /> Create from PO
            </Link>
          } />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-pelni-blue shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">In-Transit</p>
              <h3 className="text-2xl font-bold text-slate-900">8</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-pelni-blue">
              <Truck className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-500 shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Under Verification</p>
              <h3 className="text-2xl font-bold text-slate-900">12</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
              <ClipboardCheck className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-emerald-500 shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verified Today</p>
              <h3 className="text-2xl font-bold text-emerald-600">5</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-red-500 shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Discrepancies</p>
              <h3 className="text-2xl font-bold text-red-600">2</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-red-50 flex items-center justify-center text-red-600">
              <AlertCircle className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <TabsList className="bg-slate-100 border h-10 p-1">
            <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:text-pelni-blue font-bold px-6">
              All Shipments
            </TabsTrigger>
            <TabsTrigger value="waiting" className="data-[state=active]:bg-white data-[state=active]:text-pelni-blue font-bold px-6 gap-2">
              Waiting Arrival
            </TabsTrigger>
            <TabsTrigger value="verification" className="data-[state=active]:bg-white data-[state=active]:text-pelni-blue font-bold px-6">
              Verification
            </TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
             <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Search DO, PO or Vendor..." className="pl-9 h-10 bg-white" />
            </div>
            <Button variant="outline" size="icon" className="h-10 w-10 border-slate-300">
              <Filter className="h-4 w-4 text-slate-500" />
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          <Card className="shadow-sm border-slate-200 overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="w-[150px] font-bold text-slate-700">DO Number</TableHead>
                  <TableHead className="font-bold text-slate-700">Vendor & Expedition</TableHead>
                  <TableHead className="font-bold text-slate-700">Reference PO</TableHead>
                  <TableHead className="font-bold text-slate-700">Shipment Date</TableHead>
                  <TableHead className="font-bold text-slate-700">Location</TableHead>
                  <TableHead className="font-bold text-slate-700">Status</TableHead>
                  <TableHead className="w-[80px] text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dummyDOs.map((doc) => (
                  <TableRow key={doc.id} className="hover:bg-slate-50/50 transition-colors">
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-bold text-pelni-blue font-mono">{doc.doNo}</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">{doc.vendorDoNo}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900">{doc.vendorName}</span>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Truck className="h-3 w-3 text-slate-400" />
                          <span className="text-[10px] text-slate-500 font-medium">{doc.expedition}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono text-[10px] bg-slate-50 text-slate-600">
                        {doc.poNo}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm font-medium text-slate-600">{doc.shipmentDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3 w-3 text-red-500" />
                        <span className="text-xs font-bold text-slate-700">{doc.receivingLocation}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <StatusBadge status={doc.status} />
                        {doc.discrepancyFlag && (
                          <Badge className="bg-red-50 text-red-600 border-red-100 h-5 px-1 text-[9px] font-bold">DISCREPANCY</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-pelni-blue" nativeButton={false} render={
                        <Link href={`/pengadaan/delivery-order/${doc.id}`}>
                          <ArrowRight className="h-5 w-5" />
                        </Link>
                      } />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
