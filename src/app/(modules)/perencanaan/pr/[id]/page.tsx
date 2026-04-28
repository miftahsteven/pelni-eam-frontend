"use client"

import { use } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
  ClipboardList,
  History,
  MoreVertical,
  ChevronRight,
  Info,
  DollarSign,
  Package,
  Send,
  FileCheck,
  Building2,
  MapPin,
  Calendar,
  FileSearch,
  CheckCircle,
  FileStack
} from "lucide-react"
import Link from "next/link"
import { dummyPRs, prItems } from "@/lib/mocks/purchase-request"
import { StatusBadge } from "@/components/eam/status-badge"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function PRDetailWorkspace({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const pr = dummyPRs.find(p => p.id === resolvedParams.id) || dummyPRs[0]
  const items = prItems[pr.id] || []

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" nativeButton={false} render={
            <Link href="/perencanaan/pr">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          } />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-slate-400 tracking-widest uppercase text-[10px]">Purchase Request</span>
              <div className="h-1 w-1 rounded-full bg-slate-300" />
              <span className="text-xs font-mono font-bold text-pelni-blue text-[10px]">{pr.prNo}</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">{pr.packageTitle}</h1>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="font-bold border-slate-300">
            Print PR
          </Button>
          <Button className="bg-pelni-blue hover:bg-pelni-mid gap-2 font-bold shadow-lg shadow-pelni-blue/20">
            <Send className="h-4 w-4" />
            Send to Procurement
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Workspace */}
        <div className="lg:col-span-9 space-y-6">
          <Tabs defaultValue="items" className="w-full">
            <TabsList className="bg-white border w-full justify-start h-12 p-1 gap-1 overflow-x-auto no-scrollbar">
              <TabsTrigger value="header" className="gap-2 data-[state=active]:bg-pelni-blue data-[state=active]:text-white h-full px-6">
                <Info className="h-4 w-4" /> Header
              </TabsTrigger>
              <TabsTrigger value="items" className="gap-2 data-[state=active]:bg-pelni-blue data-[state=active]:text-white h-full px-6">
                <Package className="h-4 w-4" /> PR Items
              </TabsTrigger>
              <TabsTrigger value="procurement" className="gap-2 data-[state=active]:bg-pelni-blue data-[state=active]:text-white h-full px-6">
                <ShoppingCart className="h-4 w-4" /> Procurement Info
              </TabsTrigger>
              <TabsTrigger value="budget" className="gap-2 data-[state=active]:bg-pelni-blue data-[state=active]:text-white h-full px-6">
                <DollarSign className="h-4 w-4" /> Budget & Approval
              </TabsTrigger>
              <TabsTrigger value="handover" className="gap-2 data-[state=active]:bg-pelni-blue data-[state=active]:text-white h-full px-6">
                <Send className="h-4 w-4" /> Handover
              </TabsTrigger>
            </TabsList>

            {/* Header Tab */}
            <TabsContent value="header" className="mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="border-b bg-slate-50/50">
                    <CardTitle className="text-sm font-bold flex items-center gap-2">
                      <Info className="h-4 w-4 text-pelni-blue" /> PR Identity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">PR Number</p>
                      <p className="text-sm font-bold text-pelni-blue font-mono">{pr.prNo}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Request Date</p>
                      <p className="text-sm font-semibold text-slate-700">{pr.prDate}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Fiscal Year</p>
                      <p className="text-sm font-semibold text-slate-700">{pr.fiscalYear}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Priority</p>
                      <Badge className="bg-red-50 text-red-700 border-red-200 text-[10px] font-bold">HIGH</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="border-b bg-slate-50/50">
                    <CardTitle className="text-sm font-bold flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-pelni-blue" /> Requester Info
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Requesting Unit</p>
                      <p className="text-sm font-bold text-slate-700">{pr.requestingUnit}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Requester Name</p>
                      <p className="text-sm font-bold text-slate-700">{pr.requesterName}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Cost Center</p>
                      <p className="text-sm font-bold text-slate-700">FLT-ENG-001</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-dashed border-slate-300">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xs font-bold flex items-center gap-2 text-slate-500 uppercase tracking-widest">
                    Source Document References
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="h-10 w-10 rounded-full bg-pelni-blue text-white flex items-center justify-center shrink-0">
                      <FileCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Bill of Quantities (BoQ)</p>
                      <p className="text-sm font-bold text-pelni-blue font-mono">{pr.boqNo}</p>
                      <p className="text-[10px] text-slate-500 font-medium">Status: Approved • 22 Apr 2026</p>
                    </div>
                    <Button variant="ghost" size="icon" className="ml-auto text-slate-400">
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="h-10 w-10 rounded-full bg-slate-700 text-white flex items-center justify-center shrink-0">
                      <ClipboardList className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Planning Request</p>
                      <p className="text-sm font-bold text-slate-700 font-mono">{pr.planningNo}</p>
                      <p className="text-[10px] text-slate-500 font-medium">Status: Approved • 18 Apr 2026</p>
                    </div>
                    <Button variant="ghost" size="icon" className="ml-auto text-slate-400">
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* PR Items Tab */}
            <TabsContent value="items" className="mt-6 space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-4 shadow-sm">
                <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Package className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-blue-900">Items Synchronized from BoQ</h4>
                  <p className="text-xs text-blue-700">Rincian item di bawah ini adalah turunan langsung dari BoQ yang telah disetujui.</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Reference Total</p>
                  <p className="text-lg font-bold text-pelni-blue font-mono leading-none">Rp {pr.totalEstimate.toLocaleString('id-ID')}</p>
                </div>
              </div>

              <Card className="overflow-hidden border-slate-200 shadow-sm">
                <Table>
                  <TableHeader className="bg-slate-100/80">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-[60px] font-bold text-slate-700">No</TableHead>
                      <TableHead className="font-bold text-slate-700 min-w-[250px]">Item Description</TableHead>
                      <TableHead className="font-bold text-slate-700 w-[100px]">Qty</TableHead>
                      <TableHead className="font-bold text-slate-700 w-[80px]">UoM</TableHead>
                      <TableHead className="font-bold text-slate-700 w-[180px] text-right">Est. Unit Price (Rp)</TableHead>
                      <TableHead className="font-bold text-slate-700 w-[180px] text-right">Est. Subtotal (Rp)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item) => (
                      <TableRow key={item.id} className="hover:bg-slate-50/50 transition-colors">
                        <TableCell className="font-mono text-xs font-bold text-slate-500">{item.itemNo}</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <span className="font-bold text-slate-900">{item.name}</span>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="bg-slate-100 text-[9px] font-mono h-4">BoQ Ref: {item.sourceBoQItemNo}</Badge>
                              <span className="text-[10px] text-slate-400 italic truncate max-w-[200px]">{item.description}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-bold text-slate-700">{item.quantity}</TableCell>
                        <TableCell className="text-sm font-medium text-slate-600 uppercase">{item.uom}</TableCell>
                        <TableCell className="text-right font-mono text-slate-600">{item.unitPrice.toLocaleString('id-ID')}</TableCell>
                        <TableCell className="text-right font-mono font-bold text-slate-900">{item.subtotal.toLocaleString('id-ID')}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-slate-900 text-white">
                      <TableCell colSpan={5} className="text-right font-bold uppercase tracking-widest text-xs py-4">Total PR Estimate</TableCell>
                      <TableCell className="text-right font-mono font-bold text-lg py-4">Rp {pr.totalEstimate.toLocaleString('id-ID')}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            {/* Procurement Info Tab */}
            <TabsContent value="procurement" className="mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="border-b">
                    <CardTitle className="text-lg">Procurement Attributes</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Procurement Type</label>
                        <Input value="Mixed Package" disabled className="bg-slate-50" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Purchasing Group</label>
                        <Input value="FLT-01" disabled className="bg-slate-50" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Required Date</label>
                        <div className="flex items-center gap-2 p-2 bg-slate-50 border rounded-md font-mono text-sm">
                          <Calendar className="h-4 w-4 text-slate-400" />
                          {pr.requiredDate}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Delivery Location</label>
                        <div className="flex items-center gap-2 p-2 bg-slate-50 border rounded-md text-sm truncate">
                          <MapPin className="h-4 w-4 text-slate-400" />
                          {pr.location}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Suggested Method</label>
                      <Badge variant="outline" className="text-indigo-600 border-indigo-200 bg-indigo-50 font-bold px-4">Tender Terbatas</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="border-b">
                    <CardTitle className="text-lg">Account Assignment</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 rounded-lg border bg-slate-50/50">
                        <span className="text-sm font-medium text-slate-600">Source of Fund</span>
                        <span className="text-sm font-bold text-slate-900 uppercase">RKAP FLEET I - 2026</span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg border bg-slate-50/50">
                        <span className="text-sm font-medium text-slate-600">Asset Category</span>
                        <span className="text-sm font-bold text-slate-900 uppercase">MECHANICAL (1030)</span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg border bg-slate-50/50">
                        <span className="text-sm font-medium text-slate-600">WBS Element</span>
                        <span className="text-sm font-mono font-bold text-pelni-blue">WBS-2026-FLT-0012</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Budget & Approval Tab */}
            <TabsContent value="budget" className="mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-pelni-blue/20">
                  <CardHeader className="bg-pelni-blue/[0.03] border-b">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-pelni-blue" />
                      Budget Confirmation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-6">
                    <div className="text-center p-6 border rounded-xl bg-slate-50">
                      <div className="h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
                        <CheckCircle className="h-8 w-8" />
                      </div>
                      <h4 className="text-lg font-bold text-slate-900">Budget Confirmed</h4>
                      <p className="text-xs text-slate-500 mt-1">Confirmed by Budget Officer: **Fitri Amalia**</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 border rounded-lg bg-white">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Budget Ceiling</p>
                        <p className="text-sm font-bold text-slate-700">Rp 600.000.000</p>
                      </div>
                      <div className="p-3 border rounded-lg bg-white">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Available Balance</p>
                        <p className="text-sm font-bold text-emerald-600">Rp 150.000.000</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="border-b">
                    <CardTitle className="text-lg">Approval Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-6">
                    <div className="space-y-4">
                      {[
                        { role: "Requester", name: "Aris Setiawan", status: "Submitted", date: "22 Apr 2026" },
                        { role: "Budget Officer", name: "Fitri Amalia", status: "Confirmed", date: "22 Apr 2026" },
                        { role: "Div Head Fleet", name: "Supriadi", status: "Pending Approval", date: "-" },
                      ].map((step, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-3 rounded-lg border bg-slate-50/50">
                          <div className={cn(
                            "h-8 w-8 rounded-full flex items-center justify-center shrink-0 text-white shadow-sm",
                            step.status === "Pending Approval" ? "bg-amber-500" : "bg-emerald-500"
                          )}>
                            {step.status === "Pending Approval" ? <Clock className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-bold text-slate-900 leading-none mb-1">{step.name}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase">{step.role}</p>
                          </div>
                          <div className="text-right">
                            <p className={cn(
                              "text-[10px] font-bold uppercase mb-1",
                              step.status === "Pending Approval" ? "text-amber-600" : "text-emerald-600"
                            )}>{step.status}</p>
                            <p className="text-[10px] text-slate-400">{step.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Handover Tab */}
            <TabsContent value="handover" className="mt-6 space-y-6">
              <Card className="border-pelni-blue/20 shadow-xl shadow-pelni-blue/5">
                <CardContent className="p-12">
                  <div className="max-w-md mx-auto text-center space-y-6">
                    <div className="relative inline-block">
                      <div className="h-24 w-24 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center border-4 border-white shadow-2xl">
                        <Send className="h-12 w-12" />
                      </div>
                      <div className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-white border-2 border-emerald-500 flex items-center justify-center text-emerald-500 shadow-lg animate-bounce">
                        <CheckCircle2 className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-slate-900">PR Ready for Procurement</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        Dokumen Purchase Request telah lengkap divalidasi dan disetujui. Paket pengadaan ini siap untuk diproses oleh unit Procurement.
                      </p>
                    </div>
                    <div className="pt-8 grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Queue Priority</p>
                        <p className="text-sm font-bold text-red-600">P1 - URGENT</p>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Assigned Buyer</p>
                        <p className="text-sm font-bold text-slate-700">TBD</p>
                      </div>
                    </div>
                    <div className="pt-6 border-t flex flex-col gap-3">
                      <Button 
                        className="w-full bg-pelni-blue hover:bg-pelni-mid h-12 font-bold shadow-xl shadow-pelni-blue/20 text-lg"
                        nativeButton={false}
                        render={
                          <Link href="/pengadaan/wbs-assignment">Proceed to WBS Assignment (2.3.1)</Link>
                        }
                      />
                      <Button variant="outline" className="w-full font-bold border-slate-300">
                        View Complete Handover Package
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column: Workflow & History */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="shadow-md border-pelni-blue/10 overflow-hidden">
            <CardHeader className="bg-slate-900 text-white py-4">
              <CardTitle className="text-xs font-bold uppercase tracking-widest">PR Lifecycle</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2 text-center">
                <p className="text-xs font-bold text-slate-400 uppercase">Workflow Status</p>
                <StatusBadge status={pr.status} className="w-full justify-center py-2 text-sm" />
              </div>
              
              <div className="space-y-4 pt-4 border-t">
                <div className="flex justify-between items-center p-2 rounded-lg bg-emerald-50 border border-emerald-100">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase">BoQ Verified</span>
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-emerald-50 border border-emerald-100">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase">Budget Check</span>
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-amber-50 border border-amber-100">
                  <span className="text-[10px] font-bold text-amber-700 uppercase">Final Approval</span>
                  <Clock className="h-4 w-4 text-amber-600" />
                </div>
              </div>

              <div className="pt-4 border-t space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Estimated Delivery</p>
                <div className="flex items-center gap-2 text-slate-700">
                  <Calendar className="h-4 w-4 text-pelni-blue" />
                  <span className="text-sm font-bold font-mono">{pr.requiredDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-3 border-b flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-bold uppercase flex items-center gap-2 text-slate-500">
                <History className="h-4 w-4" /> Activity Log
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 px-4">
              <div className="space-y-6">
                {[
                  { status: "Budget Confirmed", date: "22 Apr 2026", actor: "Fitri Amalia", current: true },
                  { status: "PR Initialized", date: "22 Apr 2026", actor: "Aris Setiawan" },
                  { status: "BoQ Synchronized", date: "22 Apr 2026", actor: "System" },
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-4 relative">
                    {idx !== 2 && <div className="absolute left-[7px] top-4 bottom-[-24px] w-0.5 bg-slate-100" />}
                    <div className={cn(
                      "mt-1 h-[15px] w-[15px] rounded-full border-2 flex items-center justify-center shrink-0 z-10",
                      step.current ? "bg-pelni-blue border-pelni-blue/20" : "bg-white border-slate-200"
                    )}>
                      {step.current && <div className="h-1 w-1 rounded-full bg-white" />}
                    </div>
                    <div className="space-y-1 pb-4">
                      <p className={cn("text-xs font-bold", step.current ? "text-pelni-blue" : "text-slate-700")}>{step.status}</p>
                      <div className="flex flex-col text-[10px] text-slate-500 font-medium">
                        <span>{step.actor}</span>
                        <span>{step.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
