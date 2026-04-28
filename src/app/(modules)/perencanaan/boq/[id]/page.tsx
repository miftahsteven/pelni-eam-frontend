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
  Calculator,
  ListChecks,
  Settings,
  History,
  MoreVertical,
  ChevronRight,
  ExternalLink,
  Info,
  DollarSign,
  Plus,
  Trash2,
  Copy,
  GripVertical,
  ClipboardList,
  FileCheck
} from "lucide-react"
import Link from "next/link"
import { dummyBoQs, boqLineItems } from "@/lib/mocks/boq"
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

export default function BoQDetailWorkspace({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const boq = dummyBoQs.find(b => b.id === resolvedParams.id) || dummyBoQs[0]
  const items = boqLineItems[boq.id] || []

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" nativeButton={false} render={
            <Link href="/perencanaan/boq">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          } />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-slate-400 tracking-widest uppercase text-[10px]">Bill of Quantities</span>
              <div className="h-1 w-1 rounded-full bg-slate-300" />
              <span className="text-xs font-mono font-bold text-pelni-blue text-[10px]">{boq.boqNo}</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">{boq.packageTitle}</h1>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="font-bold border-slate-300">
            Export BoQ
          </Button>
          <Button className="bg-pelni-blue hover:bg-pelni-mid font-bold shadow-lg shadow-pelni-blue/20">
            Submit for Review
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
                <ListChecks className="h-4 w-4" /> Line Items
              </TabsTrigger>
              <TabsTrigger value="costing" className="gap-2 data-[state=active]:bg-pelni-blue data-[state=active]:text-white h-full px-6">
                <DollarSign className="h-4 w-4" /> Cost Estimation
              </TabsTrigger>
              <TabsTrigger value="review" className="gap-2 data-[state=active]:bg-pelni-blue data-[state=active]:text-white h-full px-6">
                <FileText className="h-4 w-4" /> Review & PR Readiness
              </TabsTrigger>
            </TabsList>

            {/* Header Tab */}
            <TabsContent value="header" className="mt-6 space-y-6">
              <Card>
                <CardHeader className="border-b">
                  <CardTitle className="text-lg">BoQ Identity</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-500 uppercase">BoQ Number</p>
                    <p className="font-bold text-pelni-blue font-mono">{boq.boqNo}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-500 uppercase">Fiscal Year</p>
                    <p className="font-semibold text-slate-900">{boq.fiscalYear}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-500 uppercase">Cost Category</p>
                    <Badge variant="outline" className="font-bold text-blue-600 bg-blue-50">{boq.costCategory}</Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-500 uppercase">Planner PIC</p>
                    <p className="font-semibold text-slate-900">{boq.planner}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-500 uppercase">Package Type</p>
                    <p className="font-semibold text-slate-900">{boq.packageType}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-dashed border-slate-300">
                <CardHeader className="pb-4">
                  <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-500">
                    <ClipboardList className="h-4 w-4" /> Source Planning Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Planning No</p>
                    <p className="text-sm font-bold text-slate-700">{boq.planningNo}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Asset Name</p>
                    <p className="text-sm font-bold text-slate-700">{boq.assetName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Location</p>
                    <p className="text-sm font-bold text-slate-700">{boq.location}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Line Items Tab (ERP Grid Style) */}
            <TabsContent value="items" className="mt-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Work Breakdown Structure</h3>
                  <p className="text-sm text-slate-500">Susun rincian pekerjaan dan material</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2 font-bold">
                    <Plus className="h-4 w-4" /> Add Section
                  </Button>
                  <Button className="bg-pelni-blue hover:bg-pelni-mid size-sm gap-2 font-bold shadow-md shadow-pelni-blue/20">
                    <Plus className="h-4 w-4" /> Add Item
                  </Button>
                </div>
              </div>

              <Card className="overflow-hidden border-slate-200 shadow-sm">
                <Table>
                  <TableHeader className="bg-slate-100/80">
                    <TableRow className="hover:bg-transparent border-b-2 border-slate-200">
                      <TableHead className="w-[50px]"></TableHead>
                      <TableHead className="w-[80px] font-bold text-slate-700">No</TableHead>
                      <TableHead className="font-bold text-slate-700 min-w-[300px]">Item Description</TableHead>
                      <TableHead className="font-bold text-slate-700 w-[120px]">Tech Ref</TableHead>
                      <TableHead className="font-bold text-slate-700 w-[100px]">Qty</TableHead>
                      <TableHead className="font-bold text-slate-700 w-[80px]">UoM</TableHead>
                      <TableHead className="font-bold text-slate-700 w-[100px] text-center">Critical</TableHead>
                      <TableHead className="w-[100px] text-right"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* Material Section */}
                    <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                      <TableCell colSpan={8} className="py-2 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-pelni-blue uppercase tracking-widest">Section 1: Main Materials</span>
                          <div className="h-px flex-1 bg-slate-200" />
                        </div>
                      </TableCell>
                    </TableRow>
                    {items.filter(i => i.group === "Main Material").map((item) => (
                      <TableRow key={item.id} className="group hover:bg-slate-50 transition-colors">
                        <TableCell className="text-slate-300 group-hover:text-slate-400 cursor-grab">
                          <GripVertical className="h-4 w-4" />
                        </TableCell>
                        <TableCell className="font-mono text-xs font-bold text-slate-500">{item.itemNo}</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <span className="font-bold text-slate-900">{item.name}</span>
                            <span className="text-[11px] text-slate-500 italic">{item.description}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-slate-100 text-[10px] font-mono h-5">{item.techRef || "-"}</Badge>
                        </TableCell>
                        <TableCell>
                          <Input defaultValue={item.quantity} className="h-8 text-xs font-bold text-center w-16" />
                        </TableCell>
                        <TableCell className="text-sm font-medium text-slate-600">{item.uom}</TableCell>
                        <TableCell className="text-center">
                          <div className={cn(
                            "mx-auto h-2 w-2 rounded-full",
                            item.critical ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" : "bg-slate-200"
                          )} />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-slate-600">
                              <Copy className="h-3.5 w-3.5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-red-600">
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}

                    {/* Service Section */}
                    <TableRow className="bg-slate-50/50 hover:bg-slate-50/50 mt-4">
                      <TableCell colSpan={8} className="py-2 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-pelni-blue uppercase tracking-widest">Section 2: Installation & Services</span>
                          <div className="h-px flex-1 bg-slate-200" />
                        </div>
                      </TableCell>
                    </TableRow>
                    {items.filter(i => i.group === "Service").map((item) => (
                      <TableRow key={item.id} className="group hover:bg-slate-50 transition-colors">
                        <TableCell className="text-slate-300 group-hover:text-slate-400 cursor-grab">
                          <GripVertical className="h-4 w-4" />
                        </TableCell>
                        <TableCell className="font-mono text-xs font-bold text-slate-500">{item.itemNo}</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <span className="font-bold text-slate-900">{item.name}</span>
                            <span className="text-[11px] text-slate-500 italic">{item.description}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-slate-100 text-[10px] font-mono h-5">{item.techRef || "-"}</Badge>
                        </TableCell>
                        <TableCell>
                          <Input defaultValue={item.quantity} className="h-8 text-xs font-bold text-center w-16" />
                        </TableCell>
                        <TableCell className="text-sm font-medium text-slate-600">{item.uom}</TableCell>
                        <TableCell className="text-center">
                          <div className={cn(
                            "mx-auto h-2 w-2 rounded-full",
                            item.critical ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" : "bg-slate-200"
                          )} />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-slate-600">
                              <Copy className="h-3.5 w-3.5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-red-600">
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            {/* Costing Tab */}
            <TabsContent value="costing" className="mt-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 text-center md:text-left">Cost Estimation Detail</h3>
                  <p className="text-sm text-slate-500">Lengkapi estimasi harga satuan untuk setiap item</p>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 px-6 flex items-center gap-4 shadow-sm">
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">Total Estimate</p>
                    <p className="text-xl font-bold text-pelni-blue font-mono">Rp {boq.totalEstimate.toLocaleString('id-ID')}</p>
                  </div>
                  <Calculator className="h-8 w-8 text-amber-500 opacity-50" />
                </div>
              </div>

              <Card className="overflow-hidden border-slate-200 shadow-sm">
                <Table>
                  <TableHeader className="bg-slate-100/80">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-[80px] font-bold text-slate-700">No</TableHead>
                      <TableHead className="font-bold text-slate-700">Item Name</TableHead>
                      <TableHead className="font-bold text-slate-700 w-[100px]">Qty</TableHead>
                      <TableHead className="font-bold text-slate-700 w-[200px] text-right">Unit Price (Rp)</TableHead>
                      <TableHead className="font-bold text-slate-700 w-[200px] text-right">Subtotal (Rp)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-mono text-xs font-bold text-slate-500">{item.itemNo}</TableCell>
                        <TableCell className="font-bold text-slate-800">{item.name}</TableCell>
                        <TableCell className="font-semibold text-slate-600">{item.quantity} {item.uom}</TableCell>
                        <TableCell className="text-right">
                          <Input 
                            defaultValue={item.unitPrice.toLocaleString('id-ID')} 
                            className="h-9 text-right font-mono font-bold text-emerald-700 bg-emerald-50/20 border-emerald-100" 
                          />
                        </TableCell>
                        <TableCell className="text-right font-mono font-bold text-slate-900">
                          {item.subtotal.toLocaleString('id-ID')}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-slate-900 text-white">
                      <TableCell colSpan={4} className="text-right font-bold uppercase tracking-widest text-xs py-4">Grand Total Estimate</TableCell>
                      <TableCell className="text-right font-mono font-bold text-lg py-4">Rp {boq.totalEstimate.toLocaleString('id-ID')}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Card>

              {/* Budget Variance */}
              <Card className="border-pelni-blue/20 bg-pelni-blue/[0.02]">
                <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-pelni-blue text-white flex items-center justify-center shadow-lg">
                      <DollarSign className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Budget Comparison</h4>
                      <p className="text-sm text-slate-500">Estimasi vs RKAP Ceiling (Fleet I - 2026)</p>
                    </div>
                  </div>
                  <div className="flex gap-12">
                    <div className="text-center">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Ceiling</p>
                      <p className="font-mono font-bold">Rp 600.000.000</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Variance</p>
                      <p className="font-mono font-bold text-emerald-600">Rp 150.000.000</p>
                    </div>
                  </div>
                  <Badge className="bg-emerald-500 text-white border-none font-bold py-1 px-4">WITHIN BUDGET</Badge>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Review & PR Readiness Tab */}
            <TabsContent value="review" className="mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="border-b">
                    <CardTitle className="text-lg">Validation Checklist</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    {[
                      { label: "BoQ Itemization completed", status: true },
                      { label: "Quantity & UoM verified", status: true },
                      { label: "Technical specifications mapped", status: true },
                      { label: "Unit prices verified by Cost Eng", status: true },
                      { label: "Budget allocation confirmed", status: true },
                      { label: "Attachments & Drawings ready", status: false },
                    ].map((check, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-lg border bg-slate-50/50">
                        <span className="text-sm font-medium text-slate-700">{check.label}</span>
                        {check.status ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-amber-500" />
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-pelni-blue/20">
                  <CardHeader className="bg-pelni-blue text-white">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileCheck className="h-5 w-5" />
                      PR Readiness Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-6">
                    <div className="text-center py-6">
                      <div className="h-20 w-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-xl">
                        <CheckCircle2 className="h-10 w-10" />
                      </div>
                      <h4 className="text-xl font-bold text-slate-900">Package Ready for PR</h4>
                      <p className="text-sm text-slate-500 mt-2 px-6">
                        Seluruh item BoQ dan rujukan teknis telah divalidasi. Paket siap diteruskan ke Purchase Request.
                      </p>
                    </div>
                    <div className="pt-6 border-t space-y-4">
                      <Button 
                        className="w-full bg-pelni-blue font-bold shadow-lg shadow-pelni-blue/20 h-12 text-lg"
                        nativeButton={false}
                        render={
                          <Link href="/perencanaan/pr/create">Go to Purchase Request (2.2.3)</Link>
                        }
                      />
                      <Button variant="outline" className="w-full font-bold border-slate-300">
                        View Approval Summary
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column: Workflow & History */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="shadow-md border-pelni-blue/10 overflow-hidden">
            <CardHeader className="bg-slate-900 text-white py-4">
              <CardTitle className="text-xs font-bold uppercase tracking-widest">BoQ Workflow</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2 text-center">
                <p className="text-xs font-bold text-slate-400 uppercase">Current Status</p>
                <StatusBadge status={boq.status} className="w-full justify-center py-2 text-sm" />
              </div>
              
              <div className="space-y-4 pt-4 border-t">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Planner PIC</p>
                  <p className="text-sm font-bold text-slate-700">{boq.planner}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">BoQ Date</p>
                  <p className="text-sm font-bold text-slate-700">22 Apr 2026</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Target Completion</p>
                  <p className="text-sm font-bold text-pelni-blue font-mono">15 May 2026</p>
                </div>
              </div>

              <div className="pt-4 border-t space-y-3">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 font-bold uppercase">BoQ Completion</span>
                  <span className="font-bold text-pelni-blue">82%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[82%]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-3 border-b flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-bold uppercase flex items-center gap-2 text-slate-500">
                <History className="h-4 w-4" /> History
              </CardTitle>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Settings className="h-3 w-3" />
              </Button>
            </CardHeader>
            <CardContent className="pt-6 px-4">
              <div className="space-y-6">
                {[
                  { status: "Costing Initialized", date: "22 Apr 2026", actor: "Aris Setiawan", current: true },
                  { status: "Line Items Mapped", date: "21 Apr 2026", actor: "Aris Setiawan" },
                  { status: "BoQ Form Initialized", date: "20 Apr 2026", actor: "System" },
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
