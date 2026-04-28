"use client"

import { useState } from "react"
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  Plus, 
  ArrowRight, 
  MoreVertical,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  FileText,
  Package,
  Building2,
  History
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
import { dummyPOs, readyForPOItems } from "@/lib/mocks/purchase-order"
import { StatusBadge } from "@/components/eam/status-badge"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function PurchaseOrderDashboard() {
  const [activeTab, setActiveTab] = useState("monitoring")

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Purchase Order</h1>
          <p className="text-sm text-slate-500">Manage and monitor vendor purchase orders.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 font-bold border-slate-300">
            <History className="h-4 w-4" /> Audit Log
          </Button>
          <Button className="bg-pelni-blue hover:bg-pelni-mid gap-2 font-bold shadow-lg shadow-pelni-blue/20" nativeButton={false} render={
            <Link href="/pengadaan/purchase-order/create">
              <Plus className="h-4 w-4" /> Create Manual PO
            </Link>
          } />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-pelni-blue shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Active PO</p>
              <h3 className="text-2xl font-bold text-slate-900">128</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-pelni-blue">
              <ShoppingCart className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-500 shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Waiting Approval</p>
              <h3 className="text-2xl font-bold text-slate-900">14</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
              <Clock className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-emerald-500 shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ready for PO</p>
              <h3 className="text-2xl font-bold text-emerald-600">42 Items</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Package className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-indigo-500 shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Open Fulfillment</p>
              <h3 className="text-2xl font-bold text-slate-900">32%</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Truck className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <TabsList className="bg-slate-100 border h-10 p-1">
            <TabsTrigger value="monitoring" className="data-[state=active]:bg-white data-[state=active]:text-pelni-blue font-bold px-6">
              PO Monitoring
            </TabsTrigger>
            <TabsTrigger value="ready" className="data-[state=active]:bg-white data-[state=active]:text-pelni-blue font-bold px-6 gap-2">
              Ready for PO
              <Badge className="bg-emerald-500 text-white border-none h-5 px-1.5 min-w-[20px] justify-center">42</Badge>
            </TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
             <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Search PO or Vendor..." className="pl-9 h-10 bg-white" />
            </div>
            <Button variant="outline" size="icon" className="h-10 w-10 border-slate-300">
              <Filter className="h-4 w-4 text-slate-500" />
            </Button>
          </div>
        </div>

        {/* PO Monitoring Tab */}
        <TabsContent value="monitoring" className="mt-0">
          <Card className="shadow-sm border-slate-200 overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="w-[150px] font-bold text-slate-700">PO Number</TableHead>
                  <TableHead className="font-bold text-slate-700">Vendor</TableHead>
                  <TableHead className="font-bold text-slate-700">Date</TableHead>
                  <TableHead className="font-bold text-slate-700">Vessel</TableHead>
                  <TableHead className="font-bold text-slate-700 text-right">Total Amount (Rp)</TableHead>
                  <TableHead className="font-bold text-slate-700">Status</TableHead>
                  <TableHead className="w-[80px] text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dummyPOs.map((po) => (
                  <TableRow key={po.id} className="hover:bg-slate-50/50 transition-colors">
                    <TableCell className="font-bold text-pelni-blue font-mono">{po.poNo}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900">{po.vendorName}</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">{po.paymentTerm}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm font-medium text-slate-600">{po.poDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-pelni-blue" />
                        <span className="text-sm font-bold text-slate-700">{po.vessel}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-mono font-bold text-slate-700">
                      {po.totalAmount.toLocaleString('id-ID')}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={po.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-pelni-blue" nativeButton={false} render={
                        <Link href={`/pengadaan/purchase-order/${po.id}`}>
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

        {/* Ready for PO Tab */}
        <TabsContent value="ready" className="mt-0">
          <Card className="shadow-sm border-slate-200 overflow-hidden">
             <div className="p-4 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <Package className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-900">Approved Items Pending PO</h4>
                  <p className="text-[10px] text-emerald-700 font-medium uppercase tracking-widest">Select items to generate a Purchase Order</p>
                </div>
              </div>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2 h-9 shadow-md shadow-emerald-600/20" nativeButton={false} render={
                <Link href="/pengadaan/purchase-order/create">
                  Create PO from Selection
                </Link>
              } />
            </div>
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Input type="checkbox" className="h-4 w-4" />
                  </TableHead>
                  <TableHead className="w-[140px] font-bold text-slate-700">PR Ref</TableHead>
                  <TableHead className="font-bold text-slate-700">Item Information</TableHead>
                  <TableHead className="font-bold text-slate-700">WBS / Project</TableHead>
                  <TableHead className="font-bold text-slate-700">Suggested Vendor</TableHead>
                  <TableHead className="font-bold text-slate-700 text-right">Qty</TableHead>
                  <TableHead className="font-bold text-slate-700 text-right">Est. Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {readyForPOItems.map((item) => (
                  <TableRow key={item.id} className="hover:bg-emerald-50/20 transition-colors">
                    <TableCell>
                      <Input type="checkbox" className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="font-mono text-xs font-bold text-pelni-blue">{item.prNo}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900">{item.name}</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">{item.vessel}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono text-[10px] bg-slate-50">{item.wbs}</Badge>
                    </TableCell>
                    <TableCell className="text-sm font-bold text-slate-600">{item.suggestedVendor}</TableCell>
                    <TableCell className="text-right">
                      <span className="text-sm font-bold text-slate-900">{item.qty}</span>
                      <span className="text-[10px] text-slate-400 ml-1">{item.uom}</span>
                    </TableCell>
                    <TableCell className="text-right font-mono font-bold text-slate-700">
                      {item.estPrice.toLocaleString('id-ID')}
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
