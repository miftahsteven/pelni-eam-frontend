"use client"

import { use, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  ShoppingCart,
  Building2,
  History,
  MoreVertical,
  ChevronRight,
  Info,
  DollarSign,
  Package,
  Send,
  FileCheck,
  Truck,
  MapPin,
  Calendar,
  CreditCard,
  ExternalLink,
  Printer,
  Download
} from "lucide-react"
import Link from "next/link"
import { dummyPOs, poItems, vendors } from "@/lib/mocks/purchase-order"
import { StatusBadge } from "@/components/eam/status-badge"
import { cn } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function PurchaseOrderDetailWorkspace({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const po = dummyPOs.find(p => p.id === resolvedParams.id) || dummyPOs[0]
  const items = poItems[po.id] || []
  const vendor = vendors.find(v => v.id === po.vendorId) || vendors[0]
  
  const [activeTab, setActiveTab] = useState("items")

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" nativeButton={false} render={
            <Link href="/pengadaan/purchase-order">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          } />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-slate-400 tracking-widest uppercase text-[10px]">Procurement</span>
              <div className="h-1 w-1 rounded-full bg-slate-300" />
              <span className="text-xs font-bold text-slate-400 tracking-widest uppercase text-[10px]">Purchase Order</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">{po.poNo}</h1>
          </div>
        </div>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-[140px] font-bold border-slate-300">
              <SelectValue placeholder="Copy From" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pr">Purchase Request</SelectItem>
              <SelectItem value="wbs">WBS Assignment</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[140px] bg-emerald-600 hover:bg-emerald-700 text-white font-bold border-none shadow-md">
              <SelectValue placeholder="Copy To" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="do">Delivery Order</SelectItem>
              <SelectItem value="inv">A/P Invoice</SelectItem>
            </SelectContent>
          </Select>
          <div className="w-[1px] h-9 bg-slate-200 mx-1" />
          <Button variant="outline" className="font-bold border-slate-300">
            <Printer className="h-4 w-4 mr-2" /> Print
          </Button>
          <Button className="bg-pelni-blue hover:bg-pelni-mid gap-2 font-bold shadow-lg shadow-pelni-blue/20">
            <Send className="h-4 w-4" /> Send
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Workspace */}
        <div className="lg:col-span-9 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-white border w-full justify-start h-12 p-1 gap-1">
              <TabsTrigger value="overview" className="gap-2 data-[state=active]:bg-pelni-blue data-[state=active]:text-white h-full px-6">
                <Info className="h-4 w-4" /> Order Overview
              </TabsTrigger>
              <TabsTrigger value="items" className="gap-2 data-[state=active]:bg-pelni-blue data-[state=active]:text-white h-full px-6">
                <Package className="h-4 w-4" /> Line Items
              </TabsTrigger>
              <TabsTrigger value="vendor" className="gap-2 data-[state=active]:bg-pelni-blue data-[state=active]:text-white h-full px-6">
                <Building2 className="h-4 w-4" /> Vendor & Shipping
              </TabsTrigger>
              <TabsTrigger value="workflow" className="gap-2 data-[state=active]:bg-pelni-blue data-[state=active]:text-white h-full px-6">
                <History className="h-4 w-4" /> Document Flow
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader className="py-4 border-b bg-slate-50/50">
                    <CardTitle className="text-sm font-bold">General Information</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 grid grid-cols-2 gap-y-6 gap-x-12">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">PO Date</p>
                      <p className="text-sm font-bold text-slate-700">{po.poDate}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Created By</p>
                      <p className="text-sm font-bold text-slate-700">{po.createdBy}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Document Type</p>
                      <p className="text-sm font-bold text-slate-700">Standard Purchase Order</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Currency</p>
                      <p className="text-sm font-bold text-slate-700">{po.currency} - Indonesian Rupiah</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900 text-white border-none shadow-xl shadow-slate-900/20">
                  <CardHeader className="py-4 border-b border-white/10">
                    <CardTitle className="text-sm font-bold">Financial Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-6">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Total Net Amount</p>
                      <p className="text-2xl font-bold font-mono">Rp {(po.totalAmount * 0.89).toLocaleString('id-ID')}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Tax (PPN 11%)</p>
                      <p className="text-sm font-bold font-mono">Rp {(po.totalAmount * 0.11).toLocaleString('id-ID')}</p>
                    </div>
                    <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                      <p className="text-xs font-bold text-white/60 uppercase">Grand Total</p>
                      <p className="text-3xl font-bold text-emerald-400 font-mono">Rp {po.totalAmount.toLocaleString('id-ID')}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="py-4 border-b bg-slate-50/50">
                  <CardTitle className="text-sm font-bold">Terms & Conditions</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase mb-1">Payment Term</p>
                      <p className="text-sm font-bold text-slate-900">{po.paymentTerm}</p>
                      <p className="text-xs text-slate-500">Payment will be processed after receipt of invoice & DO.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                      <Truck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase mb-1">Delivery Term</p>
                      <p className="text-sm font-bold text-slate-900">{po.deliveryTerm} - Delivered Duty Paid</p>
                      <p className="text-xs text-slate-500">Vendor is responsible for all shipping costs and insurance.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Items Tab */}
            <TabsContent value="items" className="mt-6 space-y-6">
               <Card className="overflow-hidden shadow-sm border-slate-200">
                <Table>
                  <TableHeader className="bg-slate-100/80">
                    <TableRow>
                      <TableHead className="w-[60px] font-bold text-slate-700">Line</TableHead>
                      <TableHead className="font-bold text-slate-700">Item Information</TableHead>
                      <TableHead className="font-bold text-slate-700 text-right">Qty</TableHead>
                      <TableHead className="font-bold text-slate-700 text-right">Unit Price</TableHead>
                      <TableHead className="font-bold text-slate-700 text-right">Subtotal</TableHead>
                      <TableHead className="font-bold text-slate-700 text-center">Fulfillment</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item) => (
                      <TableRow key={item.id} className="hover:bg-slate-50/50">
                        <TableCell className="font-mono text-xs font-bold text-slate-400">{item.lineNo}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-900">{item.itemName}</span>
                            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">{item.itemCode}</span>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-[9px] bg-slate-50">{item.prNo}</Badge>
                              <Badge variant="outline" className="text-[9px] bg-blue-50 text-blue-600 border-blue-100">{item.wbsCode}</Badge>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="text-sm font-bold text-slate-900">{item.qtyOrdered}</span>
                          <span className="text-[10px] text-slate-400 ml-1 uppercase">{item.uom}</span>
                        </TableCell>
                        <TableCell className="text-right font-mono font-bold text-slate-700">
                          {item.unitPrice.toLocaleString('id-ID')}
                        </TableCell>
                        <TableCell className="text-right font-mono font-bold text-slate-900">
                          {item.subtotal.toLocaleString('id-ID')}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col items-center gap-1">
                            <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500" style={{ width: '100%' }}></div>
                            </div>
                            <span className="text-[9px] font-bold text-emerald-600 uppercase">Received</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            {/* Vendor Tab */}
            <TabsContent value="vendor" className="mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="py-4 border-b bg-slate-50/50">
                    <CardTitle className="text-sm font-bold">Vendor Details</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-xl font-bold">
                        {vendor.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{vendor.name}</h3>
                        <p className="text-sm text-slate-500">{vendor.code}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Contact Person</p>
                        <p className="text-sm font-bold text-slate-700">{vendor.contact}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phone</p>
                        <p className="text-sm font-bold text-slate-700">{vendor.phone}</p>
                      </div>
                      <div className="col-span-2 space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email</p>
                        <p className="text-sm font-bold text-pelni-blue">{vendor.email}</p>
                      </div>
                      <div className="col-span-2 space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Address</p>
                        <p className="text-sm text-slate-600 leading-relaxed">{vendor.address}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="py-4 border-b bg-slate-50/50">
                    <CardTitle className="text-sm font-bold">Shipping & Receiving</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-6">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ship-To Location</p>
                      <div className="flex items-start gap-3 mt-2">
                        <MapPin className="h-5 w-5 text-red-500 shrink-0" />
                        <div>
                          <p className="text-sm font-bold text-slate-900">{po.receivingLocation}</p>
                          <p className="text-xs text-slate-500 italic mt-1">KM Kelud Docking Port, Tanjung Priok, Jakarta</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1 pt-4 border-t">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Estimated Arrival</p>
                      <div className="flex items-center gap-3 mt-2 text-emerald-600 bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                        <Calendar className="h-5 w-5" />
                        <span className="text-sm font-bold uppercase tracking-wide">15 May 2026</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Document Flow Tab */}
            <TabsContent value="workflow" className="mt-6 space-y-6">
              <Card>
                <CardHeader className="py-4 border-b">
                  <CardTitle className="text-sm font-bold">Document Relations (Digital Thread)</CardTitle>
                </CardHeader>
                <CardContent className="pt-10 pb-20">
                  <div className="flex flex-col md:flex-row items-center justify-center gap-8 relative">
                    {/* PR Node */}
                    <div className="flex flex-col items-center gap-2 z-10">
                      <div className="h-16 w-16 rounded-2xl bg-white border-2 border-slate-200 shadow-sm flex items-center justify-center text-slate-400">
                        <FileText className="h-8 w-8" />
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Purchase Request</p>
                        <p className="text-xs font-bold text-pelni-blue">{po.prReference}</p>
                      </div>
                    </div>

                    <div className="hidden md:block w-12 h-0.5 bg-slate-200" />

                    {/* WBS Node */}
                    <div className="flex flex-col items-center gap-2 z-10">
                      <div className="h-16 w-16 rounded-2xl bg-white border-2 border-slate-200 shadow-sm flex items-center justify-center text-slate-400">
                        <Building2 className="h-8 w-8" />
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">WBS Assignment</p>
                        <p className="text-xs font-bold text-slate-700">{po.wbsReference}</p>
                      </div>
                    </div>

                    <div className="hidden md:block w-12 h-0.5 bg-pelni-blue" />

                    {/* PO Node */}
                    <div className="flex flex-col items-center gap-2 z-10">
                      <div className="h-20 w-20 rounded-2xl bg-pelni-blue shadow-xl shadow-pelni-blue/20 flex items-center justify-center text-white scale-110">
                        <ShoppingCart className="h-10 w-10" />
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] font-bold text-pelni-blue uppercase">Current Purchase Order</p>
                        <p className="text-sm font-bold text-slate-900">{po.poNo}</p>
                      </div>
                    </div>

                    <div className="hidden md:block w-12 h-0.5 bg-slate-200 border-dashed" />

                    {/* DO Node */}
                    <div className="flex flex-col items-center gap-2 z-10 opacity-50">
                      <div className="h-16 w-16 rounded-2xl bg-white border-2 border-slate-200 border-dashed flex items-center justify-center text-slate-300">
                        <Truck className="h-8 w-8" />
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Next Stage</p>
                        <p className="text-xs font-bold text-slate-300 italic">Delivery Order</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column: Life Cycle & Actions */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="shadow-md border-pelni-blue/10 overflow-hidden sticky top-6">
            <CardHeader className="bg-slate-900 text-white py-4">
              <CardTitle className="text-xs font-bold uppercase tracking-widest">Order Lifecycle</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2 text-center">
                <p className="text-xs font-bold text-slate-400 uppercase">Current Status</p>
                <StatusBadge status={po.status} className="w-full justify-center py-2 text-sm font-bold" />
              </div>
              
              <div className="space-y-4 pt-4 border-t">
                <div className="flex justify-between items-center p-2 rounded-lg bg-emerald-50 border border-emerald-100">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-emerald-700 uppercase">Released</span>
                    <span className="text-[9px] text-emerald-600/70 font-medium">20 Apr 2026, 14:22</span>
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-emerald-50 border border-emerald-100">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-emerald-700 uppercase">Sent to Vendor</span>
                    <span className="text-[9px] text-emerald-600/70 font-medium">20 Apr 2026, 15:45</span>
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-blue-50 border border-blue-100">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-blue-700 uppercase">In Delivery</span>
                    <span className="text-[9px] text-blue-600/70 font-medium italic">Pending Arrival</span>
                  </div>
                  <Clock className="h-4 w-4 text-blue-600" />
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button className="w-full bg-pelni-blue hover:bg-pelni-mid h-12 font-bold shadow-xl shadow-pelni-blue/20" nativeButton={false} render={
                  <Link href="/pengadaan/delivery-order">Create Delivery Order</Link>
                } />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-xs font-bold uppercase flex items-center gap-2 text-slate-500">
                <ExternalLink className="h-4 w-4" /> Quick Links
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-2">
              <Button variant="ghost" className="w-full justify-between text-xs font-bold text-pelni-blue hover:bg-pelni-blue/5 h-9 px-2">
                View Source PR
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" className="w-full justify-between text-xs font-bold text-pelni-blue hover:bg-pelni-blue/5 h-9 px-2">
                View WBS Details
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" className="w-full justify-between text-xs font-bold text-pelni-blue hover:bg-pelni-blue/5 h-9 px-2">
                Download Terms PDF
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
