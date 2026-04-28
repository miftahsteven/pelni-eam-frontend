"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { 
  ArrowLeft, 
  Save, 
  Send, 
  ClipboardList, 
  Info, 
  FileCheck,
  Search,
  CheckCircle2,
  ChevronRight,
  Package,
  ShoppingCart
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { dummyBoQs } from "@/lib/mocks/boq"
import { StatusBadge } from "@/components/eam/status-badge"

export default function CreatePRPage() {
  const router = useRouter()
  // Filter "Ready for PR" BoQs
  const readyBoQs = dummyBoQs.filter(b => b.status === "Ready for PR")

  return (
    <div className="flex flex-col gap-6 p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" nativeButton={false} render={
            <Link href="/perencanaan/pr">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          } />
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Create Purchase Request</h1>
            <p className="text-sm text-slate-500 font-medium">Inisiasi permintaan pengadaan dari BoQ yang telah disetujui</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 font-bold text-slate-600">
            <Save className="h-4 w-4" />
            Save Draft
          </Button>
          <Button className="bg-pelni-blue hover:bg-pelni-mid gap-2 font-bold shadow-lg shadow-pelni-blue/20" onClick={() => router.push('/perencanaan/pr/pr-1')}>
            <ShoppingCart className="h-4 w-4" />
            Initialize PR
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Source Selection */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-sm border-pelni-blue/20">
            <CardHeader className="bg-pelni-blue/[0.02] border-b pb-4">
              <CardTitle className="text-base flex items-center gap-2 text-pelni-blue">
                <FileCheck className="h-5 w-5" />
                Select Source BoQ
              </CardTitle>
              <CardDescription>Pilih BoQ dengan status "Ready for PR"</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 p-0">
              <div className="p-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                  <Input placeholder="Search ready BoQs..." className="pl-9 text-xs" />
                </div>
              </div>
              <div className="divide-y border-t max-h-[500px] overflow-y-auto">
                {readyBoQs.map((boq) => (
                  <div key={boq.id} className="p-4 hover:bg-slate-50 cursor-pointer transition-colors group">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-mono font-bold text-pelni-blue">{boq.boqNo}</span>
                      <StatusBadge status={boq.status} className="text-[10px] py-0 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-pelni-blue mb-1">{boq.packageTitle}</h4>
                    <p className="text-xs text-slate-500 mb-3">{boq.assetName} • {boq.location}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Total: Rp {boq.totalEstimate.toLocaleString('id-ID')}</span>
                      <div className="h-5 w-5 rounded-full bg-pelni-blue/5 flex items-center justify-center text-pelni-blue opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: PR Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section A: PR Header */}
          <Card className="shadow-sm">
            <CardHeader className="border-b bg-slate-50/50 pb-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-pelni-blue/10 text-pelni-blue">
                  <ShoppingCart className="h-4 w-4" />
                </div>
                <CardTitle className="text-lg">PR Header Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Purchase Request No</label>
                <Input value="PR-PELNI-2026-XXXX" disabled className="bg-slate-50 font-mono text-xs font-bold" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Requesting Unit</label>
                <Select defaultValue="fleet">
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fleet">Fleet Engineering</SelectItem>
                    <SelectItem value="it">IT & Digitalization</SelectItem>
                    <SelectItem value="logistics">Logistics & Supply Chain</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Procurement Type</label>
                <Select defaultValue="mixed">
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="material">Material Procurement</SelectItem>
                    <SelectItem value="service">Service Procurement</SelectItem>
                    <SelectItem value="mixed">Mixed Procurement (Material & Service)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Required Date</label>
                <Input type="date" className="font-mono text-sm" defaultValue="2026-06-15" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Delivery Location</label>
                <Input defaultValue="KM Kelud - Jakarta Site" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Request Priority</label>
                <Select defaultValue="high">
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">Critical (Immediate)</SelectItem>
                    <SelectItem value="high">High (Urgent)</SelectItem>
                    <SelectItem value="medium">Medium (Regular)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-slate-700">Procurement Justification</label>
                <Textarea placeholder="Alasan kebutuhan pengadaan ini..." className="min-h-[80px]" />
              </div>
            </CardContent>
          </Card>

          {/* Source BoQ Summary Preview */}
          <Card className="shadow-sm border-dashed border-slate-300 bg-slate-50/30">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Package className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-slate-900 mb-1">Source BoQ Linked: BOQ-PELNI-2026-0008</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    Item PR akan diturunkan secara otomatis dari rincian BoQ. Harga satuan dari BoQ akan digunakan sebagai **Engineer Estimate (EE)**.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white p-2 rounded border border-slate-200">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Package</p>
                      <p className="text-[11px] font-bold text-slate-700 truncate">Cooling Pump Replacement</p>
                    </div>
                    <div className="bg-white p-2 rounded border border-slate-200">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Items</p>
                      <p className="text-[11px] font-bold text-slate-700">6 Items</p>
                    </div>
                    <div className="bg-white p-2 rounded border border-slate-200">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Estimate</p>
                      <p className="text-[11px] font-bold text-pelni-blue">Rp 450M</p>
                    </div>
                    <div className="bg-white p-2 rounded border border-slate-200">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">BoQ Status</p>
                      <p className="text-[11px] font-bold text-emerald-600">Ready for PR</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end gap-4 pb-12 pt-6 border-t">
        <Button variant="ghost" className="px-8 font-bold" nativeButton={false} render={
          <Link href="/perencanaan/pr">Cancel</Link>
        } />
        <Button variant="outline" className="px-8 font-bold border-slate-300">Save as Draft</Button>
        <Button className="px-10 bg-pelni-blue hover:bg-pelni-mid font-bold shadow-lg shadow-pelni-blue/20" onClick={() => router.push('/perencanaan/pr/pr-1')}>
          Create Purchase Request
        </Button>
      </div>
    </div>
  )
}
