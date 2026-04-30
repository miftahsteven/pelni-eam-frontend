"use client"

import { useState } from "react"
import { 
  ArrowLeft, 
  Search, 
  Send, 
  Save, 
  ChevronRight,
  Info,
  Building2,
  Truck,
  Package,
  Calendar,
  FileText,
  User,
  MoreVertical,
  ClipboardCheck,
  CheckCircle2,
  PackageCheck
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { dummyPOs, poItems } from "@/lib/mocks/purchase-order"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CreateDeliveryOrderPage() {
  const router = useRouter()
  const [selectedPO, setSelectedPO] = useState<string>("")
  const currentPO = dummyPOs.find(p => p.id === selectedPO)
  const items = selectedPO ? (poItems[selectedPO] || []) : []

  const handleCreate = () => {
    router.push("/pengadaan/delivery-order/do-1")
  }

  return (
    <div className="flex flex-col gap-6 p-6 max-w-7xl mx-auto w-full">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" nativeButton={false} render={
            <Link href="/pengadaan/delivery-order">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          } />
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Create Delivery Order</h1>
            <p className="text-sm text-slate-500 font-medium tracking-tight">Record new incoming shipment from vendor.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="font-bold border-slate-300">
            <Save className="h-4 w-4 mr-2" /> Save Draft
          </Button>
          <Button onClick={handleCreate} className="bg-pelni-blue hover:bg-pelni-mid gap-2 font-bold shadow-lg shadow-pelni-blue/20">
            <PackageCheck className="h-4 w-4" /> Finalize Document
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Base Document Selection */}
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="py-4 border-b bg-slate-50/50 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <FileText className="h-4 w-4 text-pelni-blue" /> Base Document (PO)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Select Released Purchase Order</Label>
                  <Select value={selectedPO} onValueChange={(val) => setSelectedPO(val || "")}>
                    <SelectTrigger className="bg-white border-slate-200 h-10 font-bold text-slate-700">
                      <SelectValue placeholder="Choose a PO..." />
                    </SelectTrigger>
                    <SelectContent>
                      {dummyPOs.filter(p => p.status === "Released" || p.status === "Partially Fulfilled").map(po => (
                        <SelectItem key={po.id} value={po.id}>
                          <div className="flex items-center gap-3">
                            <span className="font-bold font-mono">{po.poNo}</span>
                            <span className="text-slate-400">|</span>
                            <span className="text-xs">{po.vendorName}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {currentPO && (
                  <div className="p-4 rounded-lg bg-blue-50 border border-blue-100 flex flex-col justify-center">
                    <p className="text-[10px] font-bold text-blue-600 uppercase mb-1">Vendor Reference</p>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-blue-400" />
                      <span className="text-sm font-bold text-pelni-blue">{currentPO.vendorName}</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Shipment Logistics */}
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="py-4 border-b bg-slate-50/50">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Truck className="h-4 w-4 text-pelni-blue" /> Shipment & Logistics
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Vendor DO / Surat Jalan No</Label>
                <Input placeholder="e.g. SJ/2026/001" className="border-slate-200 h-10" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Expedition / Carrier</Label>
                <Input placeholder="e.g. JNE, Internal, etc." className="border-slate-200 h-10" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Vehicle Number</Label>
                <Input placeholder="e.g. B 1234 ABC" className="border-slate-200 h-10" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Expected Arrival</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input type="date" className="pl-10 border-slate-200 h-10" defaultValue={new Date().toISOString().split('T')[0]} />
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Receiving Location</Label>
                <Input className="border-slate-200 h-10" readOnly value={currentPO?.receivingLocation || "Select PO first..."} />
              </div>
            </CardContent>
          </Card>

          {/* Item Matrix */}
          <Card className="shadow-sm border-slate-200 overflow-hidden">
             <CardHeader className="py-4 border-b bg-slate-50/50">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Package className="h-4 w-4 text-pelni-blue" /> Shipment Line Items
              </CardTitle>
            </CardHeader>
            <Table>
              <TableHeader className="bg-slate-100/80">
                <TableRow>
                  <TableHead className="w-[60px] font-bold text-slate-700">Line</TableHead>
                  <TableHead className="font-bold text-slate-700">Item Information</TableHead>
                  <TableHead className="font-bold text-slate-700 text-center">Ordered</TableHead>
                  <TableHead className="font-bold text-slate-700 text-center">Prev. Deliv</TableHead>
                  <TableHead className="font-bold text-slate-700 w-[140px] text-center">Delivered NOW</TableHead>
                  <TableHead className="font-bold text-slate-700 text-center">UoM</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.length > 0 ? items.map((item, idx) => (
                  <TableRow key={item.id} className="hover:bg-slate-50/50">
                    <TableCell className="font-mono text-xs font-bold text-slate-400">{(idx + 1) * 10}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900">{item.itemName}</span>
                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">{item.itemCode}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-bold text-slate-600">{item.qtyOrdered}</TableCell>
                    <TableCell className="text-center font-medium text-slate-400">0</TableCell>
                    <TableCell>
                      <Input 
                        type="number" 
                        defaultValue={item.qtyOrdered} 
                        max={item.qtyOrdered} 
                        className="h-9 w-24 mx-auto text-center font-bold text-pelni-blue border-pelni-blue/30 focus:border-pelni-blue"
                      />
                    </TableCell>
                    <TableCell className="text-center font-bold text-slate-400 uppercase text-xs">{item.uom}</TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center text-slate-400 italic">
                      Please select a base document (PO) to load items.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        </div>

        {/* Sidebar Summary */}
        <div className="space-y-6">
          <Card className="shadow-sm border-slate-200">
             <CardHeader className="py-4 border-b bg-slate-900 text-white">
              <CardTitle className="text-xs font-bold uppercase tracking-widest">Shipment Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Package className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-emerald-700 uppercase">Fulfillment Status</p>
                  <p className="text-sm font-bold text-emerald-900">100% Items Selected</p>
                </div>
              </div>

              <div className="pt-2 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Reference PR</span>
                  <span className="font-mono font-bold text-slate-700">{currentPO?.prReference || "-"}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Reference WBS</span>
                  <span className="font-mono font-bold text-slate-700">{currentPO?.wbsReference || "-"}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">PIC Receiver</span>
                  <span className="font-bold text-slate-700">{currentPO?.createdBy || "-"}</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Internal Delivery Notes</Label>
                <textarea 
                  className="w-full min-h-[100px] p-3 text-xs border border-slate-200 rounded-lg bg-slate-50 focus:bg-white transition-colors"
                  placeholder="Add arrival instructions or notes for the warehouse team..."
                />
              </div>
            </CardContent>
          </Card>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 flex items-start gap-3">
            <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-800 leading-snug">
              <strong>SAP B1 Logic:</strong> Qty Delivered Now will reduce the "Open Quantity" in the base Purchase Order once finalized. 
              If qty is less than ordered, the PO will remain "Partially Fulfilled".
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
