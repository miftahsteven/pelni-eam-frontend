"use client";

import React, { useState } from "react";
import { ModuleHeader } from "@/components/module-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Trash2, 
  Printer, 
  FileText,
  CheckCircle2, 
  Clock, 
  History, 
  Paperclip, 
  Eye, 
  Box, 
  Info, 
  ShieldCheck, 
  Wrench,
  Repeat,
  PackageSearch,
  ChevronRight,
  User,
  Building2,
  AlertTriangle,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { disposalRequests, mockLifecycle, mockApprovalSteps, DisposalStatus } from "../disposal-data";
import { cn } from "@/lib/utils";

const StatusBadge = ({ status }: { status: DisposalStatus }) => {
  const styles: Record<string, string> = {
    'Draft': 'bg-slate-100 text-slate-600 border-slate-200',
    'Submitted': 'bg-blue-50 text-blue-700 border-blue-200',
    'Technical Review': 'bg-amber-50 text-amber-700 border-amber-200',
    'Finance Review': 'bg-purple-50 text-purple-700 border-purple-200',
    'Approved': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Rejected': 'bg-red-50 text-red-700 border-red-200',
    'Dismantling': 'bg-orange-50 text-orange-700 border-orange-200',
    'Disposed': 'bg-slate-700 text-white border-slate-800',
    'Sold': 'bg-blue-600 text-white border-blue-700',
    'Scrapped': 'bg-amber-600 text-white border-amber-700',
  };

  const style = styles[status] || 'bg-slate-50 text-slate-500 border-slate-200';

  return (
    <Badge variant="outline" className={cn("text-[10px] font-bold uppercase tracking-wider", style)}>
      {status}
    </Badge>
  );
};

export default function DisposalDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [activeTab, setActiveTab] = useState("overview");

  const req = disposalRequests.find(r => r.id === id) || disposalRequests[0];

  return (
    <div className="space-y-6 pb-12">
      <ModuleHeader
        title={`Disposal Request ${req.requestNo}`}
        description="Detail permohonan penghapusan aset dari sistem EAM."
        showBack
        backUrl="/penghapusan/disposal"
      >
        <div className="flex gap-2">
          {['Approved', 'Disposed', 'Sold', 'Scrapped', 'Donated'].includes(req.status) && (
             <Button variant="outline" className="gap-2 border-slate-200 shadow-sm" render={
                <Link href={`/penghapusan/disposal/${req.id}/certificate`}>
                   <FileText className="h-4 w-4 text-emerald-600" /> View Certificate
                </Link>
             } />
          )}
          <Button variant="outline" className="gap-2 border-slate-200 shadow-sm">
             <Printer className="h-4 w-4" /> Print Form
          </Button>
          {req.status === 'Finance Review' && (
             <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700 shadow-sm">
               <ShieldCheck className="h-4 w-4" /> Approve Disposal
             </Button>
          )}
        </div>
      </ModuleHeader>

      {/* APPROVAL STEPPER */}
      <Card className="rounded-xl border-slate-200 shadow-sm overflow-hidden bg-white">
        <div className="p-6 border-b border-slate-100">
           <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-6">Disposal Approval Progress</h3>
           <div className="flex justify-between relative">
              <div className="absolute top-4 left-0 right-0 h-0.5 bg-slate-100 -z-0"></div>
              
              {[
                { label: 'Submitted', status: 'completed' },
                { label: 'Technical Review', status: ['Submitted'].includes(req.status) ? 'active' : 'completed' },
                { label: 'Asset Manager', status: ['Technical Review'].includes(req.status) ? 'active' : (['Submitted', 'Technical Review'].includes(req.status) ? 'pending' : 'completed') },
                { label: 'Finance Review', status: req.status === 'Finance Review' ? 'active' : (['Approved', 'Disposed', 'Sold', 'Scrapped'].includes(req.status) ? 'completed' : 'pending') },
                { label: 'Execution', status: req.status === 'Approved' ? 'active' : (['Disposed', 'Sold', 'Scrapped'].includes(req.status) ? 'completed' : 'pending') },
                { label: 'Closed', status: ['Disposed', 'Sold', 'Scrapped', 'Donated'].includes(req.status) ? 'completed' : 'pending' }
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center gap-2 relative z-10 bg-white px-2">
                   <div className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center border-2",
                      step.status === 'completed' ? "bg-emerald-500 border-emerald-500 text-white" : 
                      step.status === 'active' ? "bg-white border-blue-600 text-blue-600 ring-4 ring-blue-50" : 
                      "bg-white border-slate-200 text-slate-300"
                   )}>
                      {step.status === 'completed' ? <CheckCircle2 className="h-4 w-4" /> : <span className="text-xs font-bold">{i+1}</span>}
                   </div>
                   <span className={cn(
                      "text-[9px] font-black uppercase tracking-tight text-center max-w-[80px]",
                      step.status === 'pending' ? "text-slate-400" : "text-slate-800"
                   )}>{step.label}</span>
                </div>
              ))}
           </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-white border border-slate-200 w-full justify-start h-12 px-2 overflow-x-auto">
              <TabsTrigger value="overview" className="data-[state=active]:bg-slate-100 data-[state=active]:text-pelni-blue text-xs font-bold gap-2">
                 <Info className="h-3.5 w-3.5" /> Overview
              </TabsTrigger>
              <TabsTrigger value="lifecycle" className="data-[state=active]:bg-slate-100 data-[state=active]:text-pelni-blue text-xs font-bold gap-2">
                 <History className="h-3.5 w-3.5" /> Lifecycle History
              </TabsTrigger>
              <TabsTrigger value="approval" className="data-[state=active]:bg-slate-100 data-[state=active]:text-pelni-blue text-xs font-bold gap-2">
                 <ShieldCheck className="h-3.5 w-3.5" /> Approval Log
              </TabsTrigger>
              <TabsTrigger value="documents" className="data-[state=active]:bg-slate-100 data-[state=active]:text-pelni-blue text-xs font-bold gap-2">
                 <Paperclip className="h-3.5 w-3.5" /> Documents
              </TabsTrigger>
            </TabsList>

            <div className="mt-6">
               <TabsContent value="overview" className="m-0 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <Card className="rounded-xl border-slate-200 shadow-sm bg-white overflow-hidden">
                        <div className="bg-slate-50 px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                           <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Asset Information</h4>
                           <Link href={`/perencanaan/asset-registration/${req.assetCode}`} className="text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-1">View Registration <ChevronRight className="h-3 w-3" /></Link>
                        </div>
                        <CardContent className="p-4 space-y-4">
                           <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded bg-slate-100 flex items-center justify-center text-slate-400">
                                 <Box className="h-5 w-5" />
                              </div>
                              <div>
                                 <p className="text-sm font-bold text-slate-900">{req.assetName}</p>
                                 <p className="text-[11px] font-mono text-slate-500">{req.assetCode}</p>
                              </div>
                           </div>
                           <div className="grid grid-cols-2 gap-4 pt-2">
                              <div className="space-y-1">
                                 <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Category</span>
                                 <p className="text-xs font-bold text-slate-800">{req.category}</p>
                              </div>
                              <div className="space-y-1">
                                 <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Location</span>
                                 <p className="text-xs font-bold text-slate-800">{req.currentLocation}</p>
                              </div>
                           </div>
                        </CardContent>
                     </Card>

                     <Card className="rounded-xl border-slate-200 shadow-sm bg-white overflow-hidden">
                        <div className="bg-slate-50 px-4 py-2 border-b border-slate-100">
                           <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Disposal Summary</h4>
                        </div>
                        <CardContent className="p-4 space-y-4">
                           <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1">
                                 <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Disposal Type</span>
                                 <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                                    <Trash2 className="h-3.5 w-3.5 text-red-500" /> {req.disposalType}
                                 </div>
                              </div>
                              <div className="space-y-1 text-right">
                                 <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Book Value</span>
                                 <p className="text-sm font-black text-slate-900">Rp {req.bookValue?.toLocaleString() || '-'}</p>
                              </div>
                           </div>
                           <div className="pt-2">
                              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Justification Reason</span>
                              <p className="text-xs text-slate-700 leading-relaxed mt-1 font-medium italic">
                                 "Unit radar navigasi (Radar-991) telah mencapai usia pakai maksimal (EOL) dan biaya perbaikan untuk kerusakan modul utama melebihi 60% dari nilai pengadaan unit baru. Rekomendasi teknis dari tim MNT-2026-0041 adalah scrap."
                              </p>
                           </div>
                        </CardContent>
                     </Card>
                  </div>

                  {/* REFERENCES SECTION */}
                  <Card className="rounded-xl border-slate-200 shadow-sm bg-white overflow-hidden">
                     <div className="bg-slate-50 px-4 py-2 border-b border-slate-100">
                        <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Lifecycle Justification Refs</h4>
                     </div>
                     <CardContent className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                           {req.maintenanceRef && (
                              <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                                 <div className="flex items-center gap-2 mb-1">
                                    <Wrench className="h-3.5 w-3.5 text-red-600" />
                                    <span className="text-[10px] font-black text-red-700 uppercase">Maintenance</span>
                                 </div>
                                 <p className="text-xs font-bold text-red-900">{req.maintenanceRef}</p>
                                 <p className="text-[10px] text-red-600 mt-0.5 italic">Fail - Unrepairable</p>
                              </div>
                           )}
                           {req.stockOpnameRef && (
                              <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                                 <div className="flex items-center gap-2 mb-1">
                                    <PackageSearch className="h-3.5 w-3.5 text-blue-600" />
                                    <span className="text-[10px] font-black text-blue-700 uppercase">Stock Opname</span>
                                 </div>
                                 <p className="text-xs font-bold text-blue-900">{req.stockOpnameRef}</p>
                                 <p className="text-[10px] text-blue-600 mt-0.5 italic">Physically Verified</p>
                              </div>
                           )}
                           {req.replacementRef && (
                              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                                 <div className="flex items-center gap-2 mb-1">
                                    <Repeat className="h-3.5 w-3.5 text-slate-600" />
                                    <span className="text-[10px] font-black text-slate-700 uppercase">Replacement</span>
                                 </div>
                                 <p className="text-xs font-bold text-slate-900">{req.replacementRef}</p>
                                 <p className="text-[10px] text-slate-500 mt-0.5 italic">Replaced by AST-NAV-009</p>
                              </div>
                           )}
                        </div>
                     </CardContent>
                  </Card>
               </TabsContent>

               <TabsContent value="lifecycle" className="m-0">
                  <Card className="rounded-xl border-slate-200 shadow-sm bg-white overflow-hidden">
                     <div className="p-6">
                        <div className="relative space-y-6">
                           <div className="absolute top-0 bottom-0 left-[3.25rem] w-0.5 bg-slate-100"></div>
                           {mockLifecycle.map((item, i) => (
                              <div key={i} className="flex gap-6 relative">
                                 <div className="w-12 text-right">
                                    <p className="text-[10px] font-bold text-slate-400">{item.date.split('-')[1]}/{item.date.split('-')[0]}</p>
                                 </div>
                                 <div className={cn(
                                    "h-4 w-4 rounded-full border-2 border-white shadow-sm mt-1 shrink-0 z-10",
                                    i === mockLifecycle.length - 1 ? "bg-red-500 animate-pulse" : "bg-slate-300"
                                 )}></div>
                                 <div className="flex-1 pb-4">
                                    <div className="flex items-center gap-2">
                                       <Badge variant="outline" className="text-[9px] uppercase bg-slate-50 text-slate-500 border-slate-200">{item.module}</Badge>
                                       <span className="text-xs font-bold text-slate-900">{item.ref}</span>
                                    </div>
                                    <p className="text-xs text-slate-600 mt-1">{item.note}</p>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </Card>
               </TabsContent>

               <TabsContent value="approval" className="m-0">
                  <Card className="rounded-xl border-slate-200 shadow-sm bg-white overflow-hidden">
                     <Table>
                        <TableHeader className="bg-slate-50">
                           <TableRow>
                              <TableHead className="text-[10px] uppercase font-bold text-slate-500">Level</TableHead>
                              <TableHead className="text-[10px] uppercase font-bold text-slate-500">Approver</TableHead>
                              <TableHead className="text-[10px] uppercase font-bold text-slate-500">Decision</TableHead>
                              <TableHead className="text-[10px] uppercase font-bold text-slate-500">Date</TableHead>
                           </TableRow>
                        </TableHeader>
                        <TableBody>
                           {mockApprovalSteps.map((step, i) => (
                              <TableRow key={i} className="text-xs">
                                 <TableCell className="font-bold text-slate-700">{step.level}. {step.role}</TableCell>
                                 <TableCell className="font-medium">{step.approver}</TableCell>
                                 <TableCell>
                                    <Badge className={cn(
                                       "text-[9px] uppercase font-bold border-0 shadow-none",
                                       step.status === 'Approved' ? "bg-emerald-50 text-emerald-700" : 
                                       step.status === 'Pending' ? "bg-blue-50 text-blue-700" : "bg-slate-50 text-slate-400"
                                    )}>{step.status}</Badge>
                                 </TableCell>
                                 <TableCell className="text-slate-500 font-mono tracking-tight">{step.date}</TableCell>
                              </TableRow>
                           ))}
                        </TableBody>
                     </Table>
                  </Card>
               </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* RIGHT SIDEBAR PANEL */}
        <div className="space-y-6">
           <Card className="rounded-xl border-slate-200 shadow-sm bg-white overflow-hidden">
              <div className="bg-slate-800 p-4 border-b border-slate-900">
                 <h3 className="text-sm font-black text-white tracking-tight flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    Asset Integrity Scan
                 </h3>
              </div>
              <CardContent className="p-4 space-y-4">
                 <div className="space-y-3">
                    {[
                       { label: 'Registered Master', status: true },
                       { label: 'Ownership Confirmed', status: true },
                       { label: 'Condition Verified', status: true },
                       { label: 'Accounting Impact Sync', status: false }
                    ].map((scan, i) => (
                       <div key={i} className="flex justify-between items-center text-[11px] font-medium">
                          <span className="text-slate-500">{scan.label}</span>
                          {scan.status ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> : <Clock className="h-3.5 w-3.5 text-amber-500" />}
                       </div>
                    ))}
                 </div>
                 <div className="pt-4 border-t border-slate-100">
                    <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                       <div className="flex items-center gap-2 text-red-700 mb-1">
                          <AlertTriangle className="h-3.5 w-3.5" />
                          <span className="text-[10px] font-black uppercase">Attention</span>
                       </div>
                       <p className="text-[10px] text-red-600 leading-relaxed font-medium">
                          Penghapusan ini akan mendepresiasi nilai aset sebesar <span className="font-black">Rp 12.000.000</span> dari buku besar PT PELNI.
                       </p>
                    </div>
                 </div>
              </CardContent>
           </Card>

           <div className="rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 p-5 shadow-lg border border-slate-700 relative overflow-hidden group cursor-pointer hover:shadow-xl transition-all">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                 <Printer className="h-24 w-24 text-white" />
              </div>
              <h4 className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-1">Official Document</h4>
              <p className="text-lg font-black text-white mb-4">Berita Acara Penghapusan</p>
              <Button size="sm" className="w-full bg-white/10 hover:bg-white/20 border-white/20 text-white text-[10px] font-bold h-8" render={
                 <Link href={`/penghapusan/disposal/${req.id}/certificate`}>
                    PREVIEW DOCUMENT <ArrowRight className="h-3 w-3 ml-2" />
                 </Link>
              } />
           </div>
        </div>
      </div>
    </div>
  );
}
