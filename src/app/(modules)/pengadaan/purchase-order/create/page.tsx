"use client"

import { useState } from "react"
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Search, 
  Send, 
  Save, 
  ChevronRight,
  Info,
  Building2,
  Truck,
  CreditCard,
  Package,
  Calendar,
  DollarSign
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
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { vendors, readyForPOItems } from "@/lib/mocks/purchase-order"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CreatePurchaseOrderPage() {
  const router = useRouter()
  const [selectedVendor, setSelectedVendor] = useState<string>("")
  const [items, setItems] = useState(readyForPOItems.slice(0, 2))

  const handleCreate = () => {
    // Simulate creation
    router.push("/pengadaan/purchase-order/po-1")
  }

  return (
    <div className="flex flex-col gap-6 p-6 max-w-7xl mx-auto w-full">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" nativeButton={false} render={
            <Link href="/pengadaan/purchase-order">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          } />
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Create Purchase Order</h1>
            <p className="text-sm text-slate-500 font-medium">Form PO-NEW-{new Date().getFullYear()}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="font-bold border-slate-300">
            <Save className="h-4 w-4 mr-2" /> Save Draft
          </Button>
          <Button onClick={handleCreate} className="bg-pelni-blue hover:bg-pelni-mid gap-2 font-bold shadow-lg shadow-pelni-blue/20">
            <Send className="h-4 w-4" /> Submit for Approval
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Form Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Vendor Selection */}
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="py-4 border-b bg-slate-50/50">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Building2 className="h-4 w-4 text-pelni-blue" /> Vendor Selection
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-500 uppercase">Vendor</Label>
                  <Select value={selectedVendor} onValueChange={(val) => setSelectedVendor(val || "")}>
                    <SelectTrigger className="bg-white border-slate-200">
                      <SelectValue placeholder="Select a vendor..." />
                    </SelectTrigger>
                    <SelectContent>
                      {vendors.map(v => (
                        <SelectItem key={v.id} value={v.id}>
                          <div className="flex flex-col text-left">
                            <span className="font-bold">{v.name}</span>
                            <span className="text-[10px] text-slate-400">{v.code}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {selectedVendor && (
                  <div className="p-3 rounded-lg bg-blue-50 border border-blue-100 animate-in fade-in slide-in-from-left-2">
                    <p className="text-[10px] font-bold text-blue-600 uppercase mb-1">Vendor Contact</p>
                    <p className="text-sm font-bold text-pelni-blue">
                      {vendors.find(v => v.id === selectedVendor)?.contact}
                    </p>
                    <p className="text-xs text-blue-700">
                       {vendors.find(v => v.id === selectedVendor)?.email}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Delivery & Logistics */}
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="py-4 border-b bg-slate-50/50">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Truck className="h-4 w-4 text-pelni-blue" /> Delivery & Payment Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-500 uppercase">Receiving Location</Label>
                <Select defaultValue="loc-1">
                  <SelectTrigger className="bg-white border-slate-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="loc-1">Gudang Pusat Jakarta</SelectItem>
                    <SelectItem value="loc-2">KM Kelud (On-Board)</SelectItem>
                    <SelectItem value="loc-3">Gudang Surabaya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-500 uppercase">Payment Term</Label>
                <Select defaultValue="net-30">
                  <SelectTrigger className="bg-white border-slate-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="net-15">Net 15 Days</SelectItem>
                    <SelectItem value="net-30">Net 30 Days</SelectItem>
                    <SelectItem value="cod">Cash on Delivery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-500 uppercase">Delivery Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input type="date" className="pl-10 border-slate-200" defaultValue="2026-05-15" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-500 uppercase">Shipping Method</Label>
                <Select defaultValue="sea">
                  <SelectTrigger className="bg-white border-slate-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sea">Sea Freight</SelectItem>
                    <SelectItem value="land">Land Transport</SelectItem>
                    <SelectItem value="air">Air Freight</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Item List */}
          <Card className="shadow-sm border-slate-200 overflow-hidden">
            <CardHeader className="py-4 border-b bg-slate-50/50 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Package className="h-4 w-4 text-pelni-blue" /> Line Items
              </CardTitle>
              <Button variant="ghost" size="sm" className="h-8 text-xs font-bold text-pelni-blue">
                <Plus className="h-3.5 w-3.5 mr-1" /> Add More Items
              </Button>
            </CardHeader>
            <Table>
              <TableHeader className="bg-slate-100/80">
                <TableRow>
                  <TableHead className="w-[80px] font-bold text-slate-700">Line</TableHead>
                  <TableHead className="font-bold text-slate-700 min-w-[200px]">Item Description</TableHead>
                  <TableHead className="font-bold text-slate-700 w-[120px]">Qty / UoM</TableHead>
                  <TableHead className="font-bold text-slate-700 w-[150px]">Unit Price</TableHead>
                  <TableHead className="font-bold text-slate-700 w-[150px] text-right">Subtotal</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item, idx) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono text-xs font-bold text-slate-400">{(idx + 1) * 10}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900">{item.name}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-[9px] bg-slate-50 font-mono">{item.prNo}</Badge>
                          <Badge variant="outline" className="text-[9px] bg-blue-50 text-blue-600 border-blue-100">{item.wbs}</Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Input defaultValue={item.qty} className="h-8 w-16 text-center border-slate-200" />
                        <span className="text-xs font-bold text-slate-500 uppercase">{item.uom}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="relative">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">Rp</span>
                        <Input defaultValue={item.estPrice.toLocaleString()} className="h-8 pl-7 border-slate-200 text-sm font-bold text-slate-700" />
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-mono font-bold text-slate-900">
                      {(item.qty * item.estPrice).toLocaleString('id-ID')}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-300 hover:text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="p-4 bg-slate-50 border-t flex flex-col items-end gap-2">
              <div className="flex items-center gap-8 text-sm">
                <span className="font-medium text-slate-500 uppercase tracking-widest text-[10px]">Subtotal:</span>
                <span className="font-bold text-slate-900 font-mono w-32 text-right">Rp 85.000.000</span>
              </div>
              <div className="flex items-center gap-8 text-sm">
                <span className="font-medium text-slate-500 uppercase tracking-widest text-[10px]">Tax (PPN 11%):</span>
                <span className="font-bold text-slate-900 font-mono w-32 text-right">Rp 9.350.000</span>
              </div>
              <div className="flex items-center gap-8 mt-2 pt-2 border-t border-slate-200">
                <span className="font-bold text-slate-900 uppercase tracking-widest text-xs">Grand Total:</span>
                <span className="font-bold text-pelni-blue text-xl font-mono w-32 text-right leading-none">Rp 94.350.000</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Context & Summary */}
        <div className="space-y-6">
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="py-4 border-b bg-slate-900 text-white">
              <CardTitle className="text-xs font-bold uppercase tracking-widest">Document Context</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
               <div className="space-y-1">
                <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Source PR</Label>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-bold text-pelni-blue font-mono">PR-2026-0041</span>
                  <Link href="#" className="text-[10px] font-bold text-slate-400 hover:text-pelni-blue flex items-center">
                    DETAILS <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
               <div className="space-y-1">
                <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">WBS Assignment</Label>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-xs font-bold text-slate-700">Docking KM Kelud 2026</p>
                  <p className="text-[10px] text-slate-500">WBS-DOCK-KLD-01</p>
                </div>
              </div>
              <div className="pt-4 border-t space-y-2">
                 <div className="flex items-center gap-2 text-amber-600">
                  <Info className="h-4 w-4" />
                  <span className="text-[10px] font-bold uppercase">Budget Check Warning</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-tight">
                  Total order exceeds the original planning estimate by 5%. Justification is required for the approver.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200">
            <CardHeader className="py-4 border-b bg-slate-50/50">
              <CardTitle className="text-xs font-bold uppercase tracking-widest">Internal Notes</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <Textarea 
                placeholder="Add instructions for the vendor or notes for the approver..." 
                className="text-xs min-h-[100px] bg-white border-slate-200"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
