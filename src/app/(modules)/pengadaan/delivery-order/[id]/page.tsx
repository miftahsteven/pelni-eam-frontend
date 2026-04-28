"use client"

import { use, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
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
  Package,
  Truck,
  MapPin,
  Calendar,
  ClipboardCheck,
  PackageCheck,
  Printer,
  Download,
  Camera,
  ExternalLink,
  ShieldCheck,
  User
} from "lucide-react"
import Link from "next/link"
import { dummyDOs, doItems } from "@/lib/mocks/delivery-order"
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

export default function DeliveryOrderDetailWorkspace({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const doc = dummyDOs.find(d => d.id === resolvedParams.id) || dummyDOs[0]
  const items = doItems[doc.id] || []
  
  const [activeTab, setActiveTab] = useState("items")

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" nativeButton={false} render={
            <Link href="/pengadaan/delivery-order">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          } />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-slate-400 tracking-widest uppercase text-[10px]">Procurement</span>
              <div className="h-1 w-1 rounded-full bg-slate-300" />
              <span className="text-xs font-bold text-slate-400 tracking-widest uppercase text-[10px]">Delivery Order</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">{doc.doNo}</h1>
          </div>
        </div>
        <div className="flex gap-2">
           <Select>
            <SelectTrigger className="w-[140px] font-bold border-slate-300">
              <SelectValue placeholder="Copy From" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="po">Purchase Order</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[140px] bg-emerald-600 hover:bg-emerald-700 text-white font-bold border-none shadow-md">
              <SelectValue placeholder="Copy To" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gr">Goods Receipt</SelectItem>
              <SelectItem value="sc">Service Confirmation</SelectItem>
            </SelectContent>
          </Select>
          <div className="w-[1px] h-9 bg-slate-200 mx-1" />
          <Button variant="outline" className="font-bold border-slate-300">
            <Printer className="h-4 w-4 mr-2" /> Print
          </Button>
          <Button className="bg-pelni-blue hover:bg-pelni-mid gap-2 font-bold shadow-lg shadow-pelni-blue/20">
            <ShieldCheck className="h-4 w-4" /> Verify Document
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-9 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-white border w-full justify-start h-12 p-1 gap-1">
              <TabsTrigger value="overview" className="gap-2 data-[state=active]:bg-pelni-blue data-[state=active]:text-white h-full px-6">
                <Info className="h-4 w-4" /> Overview
              </TabsTrigger>
              <TabsTrigger value="items" className="gap-2 data-[state=active]:bg-pelni-blue data-[state=active]:text-white h-full px-6">
                <Package className="h-4 w-4" /> Receipt Items
              </TabsTrigger>
              <TabsTrigger value="verification" className="gap-2 data-[state=active]:bg-pelni-blue data-[state=active]:text-white h-full px-6">
                <ClipboardCheck className="h-4 w-4" /> Verification
              </TabsTrigger>
              <TabsTrigger value="workflow" className="gap-2 data-[state=active]:bg-pelni-blue data-[state=active]:text-white h-full px-6">
                <History className="h-4 w-4" /> Document Flow
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-6 space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="py-4 border-b bg-slate-50/50">
                    <CardTitle className="text-sm font-bold">Logistics Information</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 grid grid-cols-2 gap-y-6 gap-x-12">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Shipment Date</p>
                      <p className="text-sm font-bold text-slate-700">{doc.shipmentDate}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Arrival Date</p>
                      <p className="text-sm font-bold text-slate-700">{doc.actualArrivalDate || "-"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Expedition</p>
                      <p className="text-sm font-bold text-slate-700">{doc.expedition}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Vehicle No</p>
                      <p className="text-sm font-bold text-slate-700">{doc.vehicleNo}</p>
                    </div>
                    <div className="col-span-2 space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Receiving Location</p>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="h-4 w-4 text-red-500" />
                        <p className="text-sm font-bold text-slate-900">{doc.receivingLocation}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="py-4 border-b bg-slate-50/50">
                    <CardTitle className="text-sm font-bold">Vendor Document Reference</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-6">
                     <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Vendor Surat Jalan No</p>
                      <p className="text-lg font-bold text-pelni-blue font-mono">{doc.vendorDoNo}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Packing List No</p>
                        <p className="text-sm font-bold text-slate-700">{doc.packingListNo}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Driver Name</p>
                        <p className="text-sm font-bold text-slate-700">{doc.driverName}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Receipt Items Tab */}
            <TabsContent value="items" className="mt-6 space-y-6">
              <Card className="overflow-hidden shadow-sm border-slate-200">
                <Table>
                  <TableHeader className="bg-slate-100/80">
                    <TableRow>
                      <TableHead className="w-[60px] font-bold text-slate-700">Line</TableHead>
                      <TableHead className="font-bold text-slate-700">Item Information</TableHead>
                      <TableHead className="font-bold text-slate-700 text-center">Ordered</TableHead>
                      <TableHead className="font-bold text-slate-700 text-center">Delivered Now</TableHead>
                      <TableHead className="font-bold text-slate-700 text-center">Accepted</TableHead>
                      <TableHead className="font-bold text-slate-700 text-center">Rejected</TableHead>
                      <TableHead className="font-bold text-slate-700 text-center">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item) => (
                      <TableRow key={item.id} className="hover:bg-slate-50/50 transition-colors">
                        <TableCell className="font-mono text-xs font-bold text-slate-400">{item.lineNo}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-900">{item.itemName}</span>
                            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">{item.itemCode}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center font-bold text-slate-400">{item.qtyOrdered}</TableCell>
                        <TableCell className="text-center font-bold text-slate-900">{item.qtyDeliveredNow}</TableCell>
                        <TableCell className="text-center">
                          <span className="inline-flex items-center justify-center h-8 w-12 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-100">
                            {item.qtyAccepted}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className={cn(
                            "inline-flex items-center justify-center h-8 w-12 rounded font-bold border",
                            item.qtyRejected > 0 ? "bg-red-50 text-red-700 border-red-100" : "bg-slate-50 text-slate-300 border-slate-100"
                          )}>
                            {item.qtyRejected}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-center">
                            <StatusBadge status={item.status} className="text-[9px] py-0.5" />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            {/* Verification Tab */}
            <TabsContent value="verification" className="mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader className="py-4 border-b bg-slate-50/50">
                    <CardTitle className="text-sm font-bold">Physical & Document Check</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-6">
                     <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Verification Status</Label>
                        <Select defaultValue="match">
                          <SelectTrigger className="bg-emerald-50 text-emerald-700 font-bold border-emerald-100 h-10">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="match">Match (Clean Receipt)</SelectItem>
                            <SelectItem value="partial">Partial / Discrepancy</SelectItem>
                            <SelectItem value="damaged">Damaged Goods</SelectItem>
                            <SelectItem value="rejected">Total Rejection</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Verified By</Label>
                        <div className="h-10 border border-slate-200 rounded-lg bg-slate-50 flex items-center px-3 gap-2">
                          <User className="h-4 w-4 text-slate-400" />
                          <span className="text-sm font-bold text-slate-700">{doc.receiverPIC}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Verification Notes</Label>
                      <textarea 
                        className="w-full min-h-[120px] p-3 text-sm border border-slate-200 rounded-lg bg-white"
                        placeholder="Add detailed report about the shipment condition..."
                        defaultValue={doc.notes}
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card>
                    <CardHeader className="py-4 border-b bg-slate-50/50">
                      <CardTitle className="text-sm font-bold">Evidence / Photos</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                       <div className="grid grid-cols-2 gap-2">
                        <div className="aspect-square bg-slate-100 rounded-lg border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-200 transition-colors cursor-pointer">
                          <Camera className="h-6 w-6 mb-1" />
                          <span className="text-[10px] font-bold">PHOTO 1</span>
                        </div>
                        <div className="aspect-square bg-slate-100 rounded-lg border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-200 transition-colors cursor-pointer">
                          <Camera className="h-6 w-6 mb-1" />
                          <span className="text-[10px] font-bold">PHOTO 2</span>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full text-xs font-bold border-slate-300">
                        Upload Attachments
                      </Button>
                    </CardContent>
                  </Card>

                  <div className={cn(
                    "p-4 rounded-xl border flex items-start gap-3",
                    doc.discrepancyFlag ? "bg-red-50 border-red-100" : "bg-emerald-50 border-emerald-100"
                  )}>
                    {doc.discrepancyFlag ? (
                      <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className={cn(
                        "text-xs font-bold uppercase tracking-tight",
                        doc.discrepancyFlag ? "text-red-700" : "text-emerald-700"
                      )}>
                        {doc.discrepancyFlag ? "Discrepancy Found" : "Clean Verification"}
                      </p>
                      <p className="text-[10px] text-slate-600 leading-tight mt-1">
                        {doc.discrepancyFlag 
                          ? "Quantities or conditions do not match the PO. Follow-up required."
                          : "Shipment matches the Purchase Order parameters exactly."
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Document Flow Tab */}
            <TabsContent value="workflow" className="mt-6 space-y-6">
               <Card>
                <CardHeader className="py-4 border-b">
                  <CardTitle className="text-sm font-bold">Document Relations (Digital Thread)</CardTitle>
                </CardHeader>
                <CardContent className="pt-10 pb-20 overflow-x-auto">
                  <div className="flex flex-row items-center justify-center gap-6 min-w-[800px]">
                    {/* Chain nodes */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-14 w-14 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400">
                        <FileText className="h-6 w-6" />
                      </div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase">PR</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-300" />
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-14 w-14 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400">
                        <Building2 className="h-6 w-6" />
                      </div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase">WBS</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-300" />
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-14 w-14 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400">
                        <ShoppingCart className="h-6 w-6" />
                      </div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase">PO</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-pelni-blue" />
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-16 w-16 rounded-xl bg-pelni-blue shadow-lg shadow-pelni-blue/20 flex items-center justify-center text-white scale-110">
                        <Truck className="h-8 w-8" />
                      </div>
                      <p className="text-[10px] font-bold text-pelni-blue uppercase mt-2">DO (Current)</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-300" />
                    <div className="flex flex-col items-center gap-2 opacity-40">
                      <div className="h-14 w-14 rounded-xl bg-white border border-slate-200 border-dashed flex items-center justify-center text-slate-300">
                        <PackageCheck className="h-6 w-6" />
                      </div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Goods Receipt</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Action Column */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="shadow-md border-pelni-blue/10 overflow-hidden sticky top-6">
            <CardHeader className="bg-slate-900 text-white py-4">
              <CardTitle className="text-xs font-bold uppercase tracking-widest">Document Status</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2 text-center">
                <p className="text-xs font-bold text-slate-400 uppercase">Current Stage</p>
                <StatusBadge status={doc.status} className="w-full justify-center py-2 text-sm font-bold" />
              </div>

              <div className="space-y-3 pt-4 border-t">
                 <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Base PO</span>
                  <Link href={`/pengadaan/purchase-order/${doc.poId}`} className="font-mono font-bold text-pelni-blue hover:underline">
                    {doc.poNo}
                  </Link>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Vendor Code</span>
                  <span className="font-bold text-slate-700">{doc.vendorId}</span>
                </div>
              </div>

              <div className="pt-4 border-t space-y-2">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 h-11 font-bold shadow-lg shadow-emerald-600/20">
                  Confirm Receipt
                </Button>
                <Button variant="outline" className="w-full h-11 font-bold border-slate-300">
                  Record Discrepancy
                </Button>
              </div>
            </CardContent>
          </Card>

           <Card className="shadow-sm">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-xs font-bold uppercase flex items-center gap-2 text-slate-500">
                <ExternalLink className="h-4 w-4" /> Quick References
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-2">
              <Button variant="ghost" className="w-full justify-between text-xs font-bold text-pelni-blue hover:bg-pelni-blue/5 h-9 px-2">
                View Vendor Profile
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" className="w-full justify-between text-xs font-bold text-pelni-blue hover:bg-pelni-blue/5 h-9 px-2">
                Download Packing List
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" className="w-full justify-between text-xs font-bold text-pelni-blue hover:bg-pelni-blue/5 h-9 px-2">
                Shipment Audit Log
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
