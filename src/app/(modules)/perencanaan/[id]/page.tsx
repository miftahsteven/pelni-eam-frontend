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
  Wrench, 
  BarChart4, 
  MessageSquare, 
  DollarSign,
  History,
  MoreVertical,
  ChevronRight,
  ExternalLink,
  Info
} from "lucide-react"
import Link from "next/link"
import { dummyRequests } from "@/lib/mocks/planning"
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

export default function PlanningDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const req = dummyRequests.find(r => r.id === resolvedParams.id) || dummyRequests[0]

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" nativeButton={false} render={
            <Link href="/perencanaan">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          } />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">Planning Request</span>
              <div className="h-1 w-1 rounded-full bg-slate-300" />
              <span className="text-xs font-mono font-bold text-pelni-blue">{req.requestNo}</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">{req.assetName}</h1>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="font-bold border-slate-300">
            Edit Request
          </Button>
          <Button className="bg-pelni-blue hover:bg-pelni-mid font-bold shadow-lg shadow-pelni-blue/20">
            Send to Review
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Content & Tabs */}
        <div className="lg:col-span-8 space-y-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="bg-white border w-full justify-start h-12 p-1 gap-1 overflow-x-auto no-scrollbar">
              <TabsTrigger value="overview" className="gap-2 data-[state=active]:bg-pelni-blue data-[state=active]:text-white h-full px-6">
                <FileText className="h-4 w-4" /> Overview
              </TabsTrigger>
              <TabsTrigger value="assessment" className="gap-2 data-[state=active]:bg-pelni-blue data-[state=active]:text-white h-full px-6">
                <Wrench className="h-4 w-4" /> Technical Assessment
              </TabsTrigger>
              <TabsTrigger value="design" className="gap-2 data-[state=active]:bg-pelni-blue data-[state=active]:text-white h-full px-6">
                <BarChart4 className="h-4 w-4" /> Plan & Design
              </TabsTrigger>
              <TabsTrigger value="review" className="gap-2 data-[state=active]:bg-pelni-blue data-[state=active]:text-white h-full px-6">
                <MessageSquare className="h-4 w-4" /> Review
              </TabsTrigger>
              <TabsTrigger value="budget" className="gap-2 data-[state=active]:bg-pelni-blue data-[state=active]:text-white h-full px-6">
                <DollarSign className="h-4 w-4" /> Budget
              </TabsTrigger>
              <TabsTrigger value="handover" className="gap-2 data-[state=active]:bg-pelni-blue data-[state=active]:text-white h-full px-6">
                <CheckCircle2 className="h-4 w-4" /> Handover
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6 space-y-6">
              {/* Request Info */}
              <Card className="shadow-sm">
                <CardHeader className="border-b pb-4">
                  <CardTitle className="text-lg">Informasi Permintaan</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-500 uppercase">Requester Unit</p>
                    <p className="font-semibold text-slate-900">{req.requesterUnit}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-500 uppercase">Requester Name</p>
                    <p className="font-semibold text-slate-900">{req.requesterName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-500 uppercase">Request Type</p>
                    <p className="font-semibold text-slate-900">{req.requestType}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-500 uppercase">Priority</p>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "font-bold",
                        req.priority === "Critical" ? "text-red-600 bg-red-50" : "text-blue-600 bg-blue-50"
                      )}
                    >
                      {req.priority}
                    </Badge>
                  </div>
                  <div className="md:col-span-2 space-y-1">
                    <p className="text-xs font-bold text-slate-500 uppercase">Description</p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Kondisi pompa pendingin saat ini sering mengalami overheat ketika mesin utama beroperasi pada RPM tinggi. 
                      Analisa awal menunjukkan adanya keausan pada impeller dan seal yang mengakibatkan efisiensi aliran menurun drastis. 
                      Diperlukan penggantian unit pompa untuk menjaga reliabilitas operasional kapal.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Asset Profile */}
              <Card className="shadow-sm border-pelni-blue/20">
                <CardHeader className="border-b bg-pelni-blue/[0.02] pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart4 className="h-5 w-5 text-pelni-blue" />
                    Asset Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-500 uppercase">Asset Code</p>
                    <p className="font-mono text-sm font-bold text-pelni-blue">{req.assetCode}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-500 uppercase">Category</p>
                    <p className="font-semibold text-slate-900">{req.category}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-500 uppercase">Location</p>
                    <p className="font-semibold text-slate-900">{req.location}</p>
                  </div>
                  <div className="md:col-span-3">
                    <Button variant="outline" size="sm" className="text-xs font-bold gap-2">
                      <ExternalLink className="h-3 w-3" /> View Asset Registry Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assessment" className="mt-6">
              <Card className="shadow-sm">
                <CardHeader className="border-b flex flex-row items-center justify-between pb-4">
                  <div>
                    <CardTitle className="text-lg">Technical Assessment Results</CardTitle>
                    <CardDescription>Hasil kajian teknis oleh tim Engineering</CardDescription>
                  </div>
                  <StatusBadge status="Under Technical Assessment" />
                </CardHeader>
                <CardContent className="pt-6 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-slate-900 border-l-4 border-pelni-blue pl-3 uppercase tracking-wider">Findings & Root Cause</h4>
                      <div className="space-y-4">
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                          <p className="text-xs font-bold text-slate-500 mb-1">Existing Technical Condition</p>
                          <p className="text-sm text-slate-700">Impeller mengalami erosi parah (cavitation). Casing pompa menipis melebihi toleransi (reduction {">"} 30%).</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                          <p className="text-xs font-bold text-slate-500 mb-1">Root Cause Analysis</p>
                          <p className="text-sm text-slate-700">Penggunaan material yang tidak tahan korosi air laut dalam jangka panjang dan umur ekonomi aset yang sudah terlampaui (12 tahun).</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-slate-900 border-l-4 border-pelni-blue pl-3 uppercase tracking-wider">Risk Assessment</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-red-50 border border-red-100">
                          <p className="text-[10px] font-bold text-red-500 uppercase">Safety Impact</p>
                          <p className="font-bold text-red-700">HIGH</p>
                        </div>
                        <div className="p-4 rounded-lg bg-orange-50 border border-orange-100">
                          <p className="text-[10px] font-bold text-orange-500 uppercase">Operational Impact</p>
                          <p className="font-bold text-orange-700">CRITICAL</p>
                        </div>
                        <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                          <p className="text-[10px] font-bold text-blue-500 uppercase">Complexity</p>
                          <p className="font-bold text-blue-700">MEDIUM</p>
                        </div>
                        <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100">
                          <p className="text-[10px] font-bold text-emerald-500 uppercase">Environmental</p>
                          <p className="font-bold text-emerald-700">LOW</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <h4 className="text-sm font-bold text-slate-900 border-l-4 border-emerald-500 pl-3 uppercase tracking-wider">Recommendation</h4>
                    <div className="bg-emerald-50/30 p-6 rounded-xl border border-emerald-100">
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-emerald-500 text-white">
                          <CheckCircle2 className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="font-bold text-emerald-900 text-lg mb-1">Recommendation: FULL REPLACEMENT</p>
                          <p className="text-sm text-emerald-700 leading-relaxed">
                            Berdasarkan tingkat keausan casing, overhaul tidak lagi direkomendasikan secara teknis dan ekonomis. 
                            Disarankan penggantian unit lengkap dengan material stainless steel (SS316) untuk impeller dan casing guna meminimalisir korosi.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="design" className="mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Scope of Work */}
                <Card className="shadow-sm">
                  <CardHeader className="border-b pb-4">
                    <CardTitle className="text-base">Scope of Work</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">In Scope</p>
                      <ul className="text-sm text-slate-600 space-y-1 list-disc pl-4">
                        <li>Dismantling old pump unit AST-KPL-MESIN-001</li>
                        <li>Procurement of new centrifugal pump (SS316)</li>
                        <li>Installation of new baseplate and alignment</li>
                        <li>Commissioning and sea trial testing</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Out of Scope</p>
                      <ul className="text-sm text-slate-600 space-y-1 list-disc pl-4">
                        <li>Electrical cabling to main switchboard</li>
                        <li>Modification of suction/discharge piping</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Resource Planning */}
                <Card className="shadow-sm">
                  <CardHeader className="border-b pb-4">
                    <CardTitle className="text-base">Resource Planning</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">ME</div>
                        <span className="text-sm font-semibold">Mechanical Engineer</span>
                      </div>
                      <span className="text-sm font-bold">2 Persons</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-xs">TC</div>
                        <span className="text-sm font-semibold">Technician</span>
                      </div>
                      <span className="text-sm font-bold">4 Persons</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">EQ</div>
                        <span className="text-sm font-semibold">Lifting Equipment</span>
                      </div>
                      <span className="text-sm font-bold">1 Set</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Preliminary Cost Estimate */}
              <Card className="shadow-sm border-amber-200">
                <CardHeader className="border-b bg-amber-50/30 pb-4">
                  <div className="flex items-center justify-between w-full">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-amber-600" />
                      Preliminary Cost Estimate
                    </CardTitle>
                    <Badge className="bg-amber-100 text-amber-700 border-amber-200 uppercase tracking-widest font-bold">Estimation Only</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="font-bold text-slate-700">Cost Item Category</TableHead>
                        <TableHead className="font-bold text-slate-700">Description</TableHead>
                        <TableHead className="font-bold text-slate-700 text-right">Estimated Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-semibold">Material / Equipment</TableCell>
                        <TableCell className="text-slate-500">Main Pump Unit, Baseplate, Coupling</TableCell>
                        <TableCell className="text-right font-mono font-bold">Rp 350.000.000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-semibold">Services</TableCell>
                        <TableCell className="text-slate-500">Installation, Laser Alignment, Testing</TableCell>
                        <TableCell className="text-right font-mono font-bold">Rp 75.000.000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-semibold">Logistics</TableCell>
                        <TableCell className="text-slate-500">Shipping to KM Kelud (Docking Site)</TableCell>
                        <TableCell className="text-right font-mono font-bold">Rp 25.000.000</TableCell>
                      </TableRow>
                      <TableRow className="bg-slate-50">
                        <TableCell colSpan={2} className="text-right font-bold uppercase text-slate-500">Total Preliminary Estimate</TableCell>
                        <TableCell className="text-right font-mono font-bold text-lg text-pelni-blue">Rp 450.000.000</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <div className="mt-6 p-4 rounded-lg bg-blue-50 border border-blue-100 flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-blue-900">Budget Accuracy Notice</p>
                      <p className="text-xs text-blue-700">Estimasi biaya awal memiliki margin error +/- 15%. Detail BoQ akan disusun pada tahap 2.2.2.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="review" className="mt-6 space-y-6">
              <Card className="shadow-sm">
                <CardHeader className="border-b pb-4">
                  <CardTitle className="text-lg">Review & Comments</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">EM</div>
                      <div className="flex-1 bg-slate-50 p-4 rounded-xl border">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-bold text-slate-900">Engineering Manager</span>
                          <span className="text-xs text-slate-500 font-medium">21 Apr 2026, 15:30</span>
                        </div>
                        <p className="text-sm text-slate-700 leading-relaxed">
                          Scope teknis sudah sesuai dengan temuan assessment. Pastikan vendor yang dipilih nanti memiliki pengalaman alignment laser untuk pompa kapasitas besar.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="h-10 w-10 rounded-full bg-pelni-blue/10 flex items-center justify-center font-bold text-pelni-blue">AM</div>
                      <div className="flex-1 bg-slate-50 p-4 rounded-xl border">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-bold text-slate-900">Asset Manager</span>
                          <span className="text-xs text-slate-500 font-medium">22 Apr 2026, 09:10</span>
                        </div>
                        <p className="text-sm text-slate-700 leading-relaxed">
                          Secara aset, penggantian ini memang sudah masuk jadwal replacement tahun ini. Lanjutkan ke budget check.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 border-t">
                    <label className="text-sm font-bold text-slate-700 mb-2 block">Add New Comment</label>
                    <div className="flex gap-3">
                      <Input placeholder="Type your comment here..." className="flex-1" />
                      <Button className="bg-pelni-blue font-bold">Post</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="budget" className="mt-6 space-y-6">
              <Card className="shadow-sm">
                <CardHeader className="border-b pb-4">
                  <CardTitle className="text-lg">Budget Check Result</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-500 uppercase">Fiscal Year</p>
                        <p className="font-bold text-slate-900">2026</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-500 uppercase">Cost Center</p>
                        <p className="font-bold text-slate-900">7720 - Fleet I</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-500 uppercase">Budget Type</p>
                        <Badge className="bg-blue-100 text-blue-700 border-none font-bold">CAPEX</Badge>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-500 uppercase">Program</p>
                        <p className="font-bold text-slate-900 text-xs">RKAP - Asset Modernization</p>
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium text-slate-400 uppercase">Budget Ceiling</span>
                        <span className="font-mono font-bold">Rp 600.000.000</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium text-slate-400 uppercase">Estimated Cost</span>
                        <span className="font-mono font-bold">Rp 450.000.000</span>
                      </div>
                      <div className="pt-2 border-t border-slate-700 flex justify-between items-center">
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Remaining (Variance)</span>
                        <span className="font-mono font-bold text-emerald-400">Rp 150.000.000</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center p-8 bg-emerald-50 rounded-xl border border-emerald-100">
                    <div className="h-16 w-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mb-4 shadow-lg shadow-emerald-200">
                      <DollarSign className="h-8 w-8" />
                    </div>
                    <h4 className="text-xl font-bold text-emerald-900 mb-1">Budget Feasible</h4>
                    <p className="text-sm text-emerald-700 text-center mb-6">
                      Anggaran tersedia dan mencukupi untuk estimasi yang diajukan.
                    </p>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 font-bold w-full">Apply Budget Status</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="handover" className="mt-6 space-y-6">
              <div className="max-w-3xl mx-auto text-center space-y-6 py-12">
                <div className="h-24 w-24 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-xl">
                  <CheckCircle2 className="h-12 w-12" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">Ready for BoQ Creation</h2>
                  <p className="text-slate-500 font-medium">Seluruh dokumen perencanaan Phase 2.2.1 telah lengkap dan disetujui.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mt-8">
                  {[
                    "Kajian Teknis Lengkap",
                    "Desain Awal & Spec Tersedia",
                    "Estimasi Biaya Terverifikasi",
                    "Budget Sudah Dialokasikan",
                    "Reviewer Telah Menyetujui",
                    "Safety Risk Assessment OK"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-4 bg-white rounded-xl border shadow-sm">
                      <div className="h-6 w-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-bold text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-10 flex gap-4 justify-center">
                  <Button size="lg" className="bg-slate-900 hover:bg-slate-800 font-bold px-8 shadow-xl">
                    Generate Planning Package (PDF)
                  </Button>
                  <Button size="lg" className="bg-pelni-blue hover:bg-pelni-mid font-bold px-10 shadow-xl shadow-pelni-blue/20" nativeButton={false} render={
                    <Link href="/perencanaan/boq/create">Proceed to Create BoQ (Phase 2.2.2)</Link>
                  } />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column: Summary & Timeline */}
        <div className="lg:col-span-4 space-y-6">
          {/* Status Summary Card */}
          <Card className="shadow-md border-pelni-blue/10 overflow-hidden">
            <CardHeader className="bg-pelni-blue text-white py-4">
              <CardTitle className="text-sm font-bold uppercase tracking-widest">Workflow Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-500 uppercase">Current Status</p>
                <StatusBadge status={req.status} className="w-full justify-center py-2 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Planner PIC</p>
                  <p className="text-sm font-bold text-slate-700">{req.picPlanner}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Target BoQ</p>
                  <p className="text-sm font-bold text-slate-700">{req.targetDate}</p>
                </div>
              </div>
              <div className="pt-4 border-t space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 font-medium">Progress</span>
                  <span className="font-bold text-pelni-blue">45%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-pelni-blue w-[45%]" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Workflow Timeline */}
          <Card className="shadow-sm">
            <CardHeader className="pb-4 border-b">
              <CardTitle className="text-sm font-bold uppercase flex items-center gap-2">
                <History className="h-4 w-4 text-slate-400" />
                Workflow History
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 px-4">
              <div className="space-y-6">
                {[
                  { status: "Under Planning & Design", date: "22 Apr 2026", time: "10:30", actor: "Aris Setiawan (Planner)", current: true },
                  { status: "Assessment Submitted", date: "20 Apr 2026", time: "14:15", actor: "Aris Setiawan (Planner)" },
                  { status: "Under Technical Assessment", date: "15 Apr 2026", time: "09:00", actor: "Engineering Dept" },
                  { status: "Request Submitted", date: "10 Apr 2026", time: "11:20", actor: "Bambang (Requester)" },
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-4 relative">
                    {idx !== 3 && <div className="absolute left-[11px] top-6 bottom-[-24px] w-0.5 bg-slate-100" />}
                    <div className={cn(
                      "mt-1.5 h-[22px] w-[22px] rounded-full border-4 flex items-center justify-center shrink-0 z-10",
                      step.current ? "bg-pelni-blue border-pelni-blue/20" : "bg-white border-slate-200"
                    )}>
                      {step.current && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                    </div>
                    <div className="space-y-1 pb-2">
                      <p className={cn("text-sm font-bold", step.current ? "text-pelni-blue" : "text-slate-700")}>{step.status}</p>
                      <div className="flex flex-col text-[11px] text-slate-500 font-medium">
                        <span>{step.actor}</span>
                        <span>{step.date} • {step.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-4 text-xs font-bold text-pelni-blue">
                View Full Logs
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
