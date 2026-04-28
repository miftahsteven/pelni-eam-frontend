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
  ChevronRight
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { dummyRequests } from "@/lib/mocks/planning"
import { StatusBadge } from "@/components/eam/status-badge"

export default function CreateBoQPage() {
  const router = useRouter()
  // Filter only approved plans
  const approvedPlans = dummyRequests.filter(r => r.status === "Approved for BoQ")

  return (
    <div className="flex flex-col gap-6 p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" nativeButton={false} render={
            <Link href="/perencanaan/boq">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          } />
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Create New BoQ Package</h1>
            <p className="text-sm text-slate-500 font-medium">Turunkan Approved Plan menjadi rincian kuantitas</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 font-bold text-slate-600">
            <Save className="h-4 w-4" />
            Save Draft
          </Button>
          <Button className="bg-pelni-blue hover:bg-pelni-mid gap-2 font-bold shadow-lg shadow-pelni-blue/20" onClick={() => router.push('/perencanaan/boq/boq-1')}>
            <FileCheck className="h-4 w-4" />
            Initialize BoQ
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Source Selection */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-sm border-pelni-blue/20">
            <CardHeader className="bg-pelni-blue/[0.02] border-b pb-4">
              <CardTitle className="text-base flex items-center gap-2 text-pelni-blue">
                <ClipboardList className="h-5 w-5" />
                Select Source Plan
              </CardTitle>
              <CardDescription>Pilih paket perencanaan yang telah disetujui</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 p-0">
              <div className="p-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                  <Input placeholder="Search approved plans..." className="pl-9 text-xs" />
                </div>
              </div>
              <div className="divide-y border-t max-h-[500px] overflow-y-auto">
                {approvedPlans.map((plan) => (
                  <div key={plan.id} className="p-4 hover:bg-slate-50 cursor-pointer transition-colors group">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-mono font-bold text-pelni-blue">{plan.requestNo}</span>
                      <StatusBadge status={plan.status} className="text-[10px] py-0 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-pelni-blue mb-1">{plan.assetName}</h4>
                    <p className="text-xs text-slate-500 mb-3">{plan.location} • {plan.category}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Est: Rp {plan.id === 'req-1' ? '450.000.000' : '245.000.000'}</span>
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

        {/* Right Column: BoQ Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section A: BoQ Header */}
          <Card className="shadow-sm">
            <CardHeader className="border-b bg-slate-50/50 pb-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-pelni-blue/10 text-pelni-blue">
                  <Info className="h-4 w-4" />
                </div>
                <CardTitle className="text-lg">BoQ Identity & Header</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">BoQ Number</label>
                <Input value="BOQ-PELNI-2026-XXXX" disabled className="bg-slate-50 font-mono text-xs font-bold" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Package Title</label>
                <Input placeholder="e.g. Replacement Main Engine Cooling Pump Package" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Package Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="material">Material-heavy</SelectItem>
                    <SelectItem value="service">Service-heavy</SelectItem>
                    <SelectItem value="mixed">Mixed Package</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Fiscal Year</label>
                <Select defaultValue="2026">
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                    <SelectItem value="2027">2027</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Cost Category</label>
                <Select defaultValue="capex">
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="capex">CAPEX</SelectItem>
                    <SelectItem value="opex">OPEX</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Planner / PIC</label>
                <Input value="Aris Setiawan" disabled className="bg-slate-50" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-slate-700">Internal Notes</label>
                <Textarea placeholder="Catatan tambahan untuk tim procurement..." className="min-h-[80px]" />
              </div>
            </CardContent>
          </Card>

          {/* Source Info Preview */}
          <Card className="shadow-sm border-dashed border-slate-300 bg-slate-50/30">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-slate-900 mb-1">Source Plan Selected: PLN-PLAN-2026-0012</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    Data perencanaan, spesifikasi awal, dan hasil kajian teknis akan disalin ke BoQ ini sebagai rujukan dasar penyusunan item.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded-lg border border-slate-200">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Asset</p>
                      <p className="text-xs font-bold text-slate-700">Main Engine Cooling Pump</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-slate-200">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Prelim. Estimate</p>
                      <p className="text-xs font-bold text-pelni-blue">Rp 450.000.000</p>
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
          <Link href="/perencanaan/boq">Cancel</Link>
        } />
        <Button variant="outline" className="px-8 font-bold border-slate-300">Save as Draft</Button>
        <Button className="px-10 bg-pelni-blue hover:bg-pelni-mid font-bold shadow-lg shadow-pelni-blue/20" onClick={() => router.push('/perencanaan/boq/boq-1')}>
          Initialize BoQ Line Items
        </Button>
      </div>
    </div>
  )
}
