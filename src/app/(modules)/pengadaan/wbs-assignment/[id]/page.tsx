"use client"

import { use, useState } from "react"
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
  CheckCircle,
  Search,
  Check,
  X
} from "lucide-react"
import Link from "next/link"
import { dummyAssignmentPRs, prItemsForAssignment, wbsMasterData } from "@/lib/mocks/wbs-assignment"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function WBSAssignmentDetailWorkspace({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const pr = dummyAssignmentPRs.find(p => p.id === resolvedParams.id) || dummyAssignmentPRs[0]
  const items = prItemsForAssignment[pr.id] || []
  
  const [activeTab, setActiveTab] = useState("items")
  const [isValidated, setIsValidated] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" nativeButton={false} render={
            <Link href="/pengadaan/wbs-assignment">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          } />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-slate-400 tracking-widest uppercase text-[10px]">Procurement</span>
              <div className="h-1 w-1 rounded-full bg-slate-300" />
              <span className="text-xs font-bold text-slate-400 tracking-widest uppercase text-[10px]">WBS Assignment</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">{pr.prNo}</h1>
          </div>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="font-bold border-slate-300"
            onClick={() => setIsValidated(true)}
          >
            Validate Assignment
          </Button>
          <Button 
            className="bg-pelni-blue hover:bg-pelni-mid gap-2 font-bold shadow-lg shadow-pelni-blue/20"
            onClick={() => setIsSubmitted(true)}
            disabled={!isValidated || isSubmitted}
          >
            {isSubmitted ? <CheckCircle2 className="h-4 w-4" /> : <Send className="h-4 w-4" />}
            {isSubmitted ? "Submitted" : "Submit Assignment"}
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {isSubmitted && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-emerald-900">Assignment Successfully Submitted</h4>
            <p className="text-xs text-emerald-700">PR ini sekarang menunggu persetujuan dari Budget Owner/Supervisor.</p>
          </div>
          <div className="flex flex-col gap-2 ml-auto">
            <Button variant="outline" size="sm" className="border-emerald-200 text-emerald-700 font-bold bg-white" nativeButton={false} render={
              <Link href="/pengadaan/wbs-assignment">Go Back to List</Link>
            } />
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md" nativeButton={false} render={
              <Link href="/pengadaan/purchase-order">Proceed to Purchase Order (2.3.2)</Link>
            } />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Workspace */}
        <div className="lg:col-span-9 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-white border w-full justify-start h-12 p-1 gap-1 overflow-x-auto no-scrollbar">
              <TabsTrigger value="overview" className="gap-2 data-[state=active]:bg-pelni-blue data-[state=active]:text-white h-full px-6">
                <Info className="h-4 w-4" /> Overview
              </TabsTrigger>
              <TabsTrigger value="items" className="gap-2 data-[state=active]:bg-pelni-blue data-[state=active]:text-white h-full px-6">
                <ClipboardList className="h-4 w-4" /> Items Assignment
              </TabsTrigger>
              <TabsTrigger value="audit" className="gap-2 data-[state=active]:bg-pelni-blue data-[state=active]:text-white h-full px-6">
                <History className="h-4 w-4" /> Assignment Log
              </TabsTrigger>
              <TabsTrigger value="approval" className="gap-2 data-[state=active]:bg-pelni-blue data-[state=active]:text-white h-full px-6">
                <FileCheck className="h-4 w-4" /> Approval Review
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="border-b bg-slate-50/50 py-4">
                    <CardTitle className="text-sm font-bold flex items-center gap-2">
                      <FileText className="h-4 w-4 text-pelni-blue" /> PR Context Info
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Planning Ref</p>
                      <p className="text-sm font-bold text-pelni-blue font-mono">{pr.planningRef}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">PR Date</p>
                      <p className="text-sm font-semibold text-slate-700">{pr.prDate}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Requesting Unit</p>
                      <p className="text-sm font-bold text-slate-700">{pr.requestingUnit}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Vessel / Asset</p>
                      <p className="text-sm font-bold text-slate-700">{pr.vessel}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="border-b bg-slate-50/50 py-4">
                    <CardTitle className="text-sm font-bold flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-pelni-blue" /> Financial Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Total Estimate</p>
                      <p className="text-lg font-bold text-slate-900 font-mono leading-none">Rp {pr.totalEstimate.toLocaleString('id-ID')}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Total Items</p>
                      <p className="text-sm font-bold text-slate-700">{pr.totalItems} Items</p>
                    </div>
                    <div className="col-span-2 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                      <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">Budget Group</p>
                      <p className="text-sm font-bold text-pelni-blue">RKAP FLEET I - TECHNICAL (2026)</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-dashed border-slate-300">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xs font-bold flex items-center gap-2 text-slate-500 uppercase tracking-widest">
                    Notes from PR Phase
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 leading-relaxed italic">
                    "Kebutuhan mendesak untuk persiapan docking tahunan. Suku cadang harus orisinil dan memiliki sertifikat klasifikasi."
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Items Assignment Tab */}
            <TabsContent value="items" className="mt-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <Button variant="outline" size="sm" className="h-8 gap-2 text-xs font-bold border-slate-300">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Bulk Assign WBS
                  </Button>
                   <Button variant="ghost" size="sm" className="h-8 gap-2 text-xs font-bold text-pelni-blue">
                    <Search className="h-3.5 w-3.5" /> Filter Items
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Assignment Progress:</span>
                  <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="bg-pelni-blue h-full w-[0%]" style={{ width: isValidated ? '100%' : '33%' }}></div>
                  </div>
                  <span className="text-[10px] font-bold text-pelni-blue">{isValidated ? '3/3' : '1/3'}</span>
                </div>
              </div>

              <Card className="overflow-hidden border-slate-200 shadow-sm">
                <Table>
                  <TableHeader className="bg-slate-100/80">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-[60px] font-bold text-slate-700">No</TableHead>
                      <TableHead className="font-bold text-slate-700 min-w-[200px]">Item Information</TableHead>
                      <TableHead className="font-bold text-slate-700 w-[100px]">Qty / UoM</TableHead>
                      <TableHead className="font-bold text-slate-700 w-[280px]">WBS Assignment</TableHead>
                      <TableHead className="font-bold text-slate-700 w-[120px] text-center">Validation</TableHead>
                      <TableHead className="font-bold text-slate-700 w-[150px] text-right">Est. Subtotal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item, idx) => (
                      <TableRow key={item.id} className={cn(
                        "hover:bg-slate-50/50 transition-colors",
                        isValidated && idx === 0 ? "bg-emerald-50/30" : ""
                      )}>
                        <TableCell className="font-mono text-xs font-bold text-slate-500">{item.itemNo}</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-0.5">
                            <span className="font-bold text-slate-900">{item.name}</span>
                            <span className="text-[10px] text-slate-400 italic truncate max-w-[180px]">{item.specification}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm font-bold text-slate-700">{item.qty} {item.uom}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                              <Select defaultValue={item.suggestedWBSId}>
                                <SelectTrigger className="h-9 text-xs font-medium border-slate-200 bg-white">
                                  <SelectValue placeholder="Select WBS..." />
                                </SelectTrigger>
                                <SelectContent>
                                  {wbsMasterData.map(wbs => (
                                    <SelectItem key={wbs.id} value={wbs.id} className="text-xs">
                                      <div className="flex flex-col">
                                        <span className="font-bold">{wbs.code}</span>
                                        <span className="text-[10px] text-slate-500">{wbs.name}</span>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Button variant="outline" size="icon" className="h-9 w-9 border-slate-200 bg-slate-50 text-slate-400 hover:text-pelni-blue">
                                <Search className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="flex items-center gap-1.5 px-1">
                               <Badge variant="outline" className="text-[9px] font-bold bg-blue-50 text-blue-600 border-blue-100 uppercase py-0">Recommended</Badge>
                               <span className="text-[9px] font-bold text-slate-400 truncate">Source: Technical Planning</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          {isValidated ? (
                            <div className="flex items-center justify-center gap-1.5 text-emerald-600">
                              <CheckCircle2 className="h-5 w-5" />
                              <span className="text-[10px] font-bold uppercase tracking-widest">Valid</span>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center gap-1.5 text-slate-400">
                              <Clock className="h-5 w-5" />
                              <span className="text-[10px] font-bold uppercase tracking-widest">Not Checked</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-right font-mono font-bold text-slate-900">
                          {item.subtotal.toLocaleString('id-ID')}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-slate-900 text-white">
                      <TableCell colSpan={5} className="text-right font-bold uppercase tracking-widest text-xs py-4 px-6">Total WBS Assigned Amount</TableCell>
                      <TableCell className="text-right font-mono font-bold text-lg py-4 px-6">Rp {pr.totalEstimate.toLocaleString('id-ID')}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            {/* Audit Log Tab */}
            <TabsContent value="audit" className="mt-6 space-y-6">
               <Card className="shadow-sm border-slate-200">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead className="font-bold text-slate-700">Timestamp</TableHead>
                      <TableHead className="font-bold text-slate-700">User</TableHead>
                      <TableHead className="font-bold text-slate-700">Action</TableHead>
                      <TableHead className="font-bold text-slate-700">Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { time: "22 Apr 2026, 14:20", user: "Aris Setiawan", action: "Submit Assignment", desc: "Submitted to Supervisor for review" },
                      { time: "22 Apr 2026, 11:15", user: "System", action: "Validation", desc: "Automated WBS validation success" },
                      { time: "22 Apr 2026, 09:30", user: "Aris Setiawan", action: "WBS Mapping", desc: "Assigned items 0010, 0020, 0030 to WBS-DOCK-KLD" },
                    ].map((log, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="text-xs font-mono text-slate-500">{log.time}</TableCell>
                        <TableCell className="font-bold text-slate-700">{log.user}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-[10px] font-bold">{log.action}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-slate-600">{log.desc}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            {/* Approval Tab */}
            <TabsContent value="approval" className="mt-6 space-y-6">
              <Card className="border-amber-200 bg-amber-50/30">
                <CardHeader>
                  <CardTitle className="text-sm font-bold flex items-center gap-2 text-amber-700">
                    <AlertCircle className="h-4 w-4" /> Approval Notes Needed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-amber-900/70">Please provide justification if WBS deviates from the suggested planning reference.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column: Life Cycle & Quick Tools */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="shadow-md border-pelni-blue/10 overflow-hidden">
            <CardHeader className="bg-slate-900 text-white py-4">
              <CardTitle className="text-xs font-bold uppercase tracking-widest">Workflow Engine</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2 text-center">
                <p className="text-xs font-bold text-slate-400 uppercase">Assignment Status</p>
                <StatusBadge status={isSubmitted ? "Ready for PO" : pr.assignmentStatus} className="w-full justify-center py-2 text-sm font-bold" />
              </div>
              
              <div className="space-y-4 pt-4 border-t">
                <div className="flex justify-between items-center p-2 rounded-lg bg-emerald-50 border border-emerald-100">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase">PR Validated</span>
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                </div>
                <div className={cn(
                  "flex justify-between items-center p-2 rounded-lg border transition-colors",
                  isValidated ? "bg-emerald-50 border-emerald-100" : "bg-amber-50 border-amber-100"
                )}>
                  <span className={cn("text-[10px] font-bold uppercase", isValidated ? "text-emerald-700" : "text-amber-700")}>WBS Mapping</span>
                  {isValidated ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <Clock className="h-4 w-4 text-amber-600" />}
                </div>
                <div className={cn(
                  "flex justify-between items-center p-2 rounded-lg border",
                  isSubmitted ? "bg-emerald-50 border-emerald-100" : "bg-slate-50 border-slate-100"
                )}>
                  <span className={cn("text-[10px] font-bold uppercase", isSubmitted ? "text-emerald-700" : "text-slate-400")}>Internal Approval</span>
                  {isSubmitted ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <Clock className="h-4 w-4 text-slate-300" />}
                </div>
              </div>

              {isValidated && !isSubmitted && (
                <div className="pt-4 border-t animate-in fade-in zoom-in-95">
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-center">
                    <p className="text-[10px] font-bold text-emerald-700 uppercase mb-1">Validation Success</p>
                    <p className="text-[9px] text-emerald-600 font-medium">All items correctly mapped to active WBS codes.</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-xs font-bold uppercase flex items-center gap-2 text-slate-500">
                <Info className="h-4 w-4" /> Reference Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Procurement Package</p>
                <p className="text-sm font-bold text-slate-700">Fleet Maintenance 2026 - Q2</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Associated Work</p>
                <p className="text-sm font-bold text-slate-700">Docking Annual KM Kelud</p>
              </div>
              <div className="pt-4 border-t">
                <Button variant="ghost" className="w-full justify-between text-xs font-bold text-pelni-blue hover:bg-pelni-blue/5 h-9 px-2">
                  View Source Planning
                  <ChevronRight className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" className="w-full justify-between text-xs font-bold text-pelni-blue hover:bg-pelni-blue/5 h-9 px-2">
                  View Source PR
                  <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
