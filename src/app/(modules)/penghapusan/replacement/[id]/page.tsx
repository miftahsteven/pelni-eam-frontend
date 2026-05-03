"use client";

import React, { useState } from "react";
import { ModuleHeader } from "@/components/module-header";
import { Button } from "@/components/ui/badge"; // Note: badge import used accidentally for Button name in detail? No, use UI button.
import { Button as UIButton } from "@/components/ui/button";
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
  FileText,
  Printer,
  Edit,
  ArrowRight,
  MapPin,
  CheckCircle2,
  XCircle,
  Clock,
  History,
  Paperclip,
  Eye,
  Box,
  Repeat,
  ShoppingCart,
  Wrench,
  PackageSearch,
  Building2,
  User,
  Info,
  ShieldCheck,
  ChevronRight,
  Trash2
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { replacementRequests, ReplacementStatus } from "../replacement-data";
import { cn } from "@/lib/utils";

const StatusBadge = ({ status }: { status: ReplacementStatus }) => {
  const styles: Record<string, string> = {
    'Draft': 'bg-slate-100 text-slate-600 border-slate-200',
    'Submitted': 'bg-blue-50 text-blue-700 border-blue-200',
    'Technical Review': 'bg-amber-50 text-amber-700 border-amber-200',
    'Approved': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Rejected': 'bg-red-50 text-red-700 border-red-200',
    'Waiting Procurement': 'bg-purple-50 text-purple-700 border-purple-200',
    'Waiting Installation': 'bg-orange-50 text-orange-700 border-orange-200',
    'Completed': 'bg-green-600 text-white border-green-700',
    'Pending Disposal': 'bg-slate-700 text-white border-slate-800',
  };

  const style = styles[status] || 'bg-slate-50 text-slate-500 border-slate-200';

  return (
    <Badge variant="outline" className={cn("text-[10px] font-bold uppercase tracking-wider", style)}>
      {status}
    </Badge>
  );
};

export default function ReplacementDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [activeTab, setActiveTab] = useState("overview");

  const req = replacementRequests.find(r => r.id === id) || replacementRequests[0];

  return (
    <div className="space-y-6 pb-12">
      <ModuleHeader
        title={`Replacement Request ${req.requestNo}`}
        description="Detail dokumen penggantian aset."
        showBack
        backUrl="/penghapusan/replacement"
      >
        <div className="flex gap-2">
          {req.status === 'Completed' || req.status === 'Pending Disposal' ? (
             <UIButton className="gap-2 bg-slate-800 hover:bg-slate-900 shadow-sm" render={
                <Link href="/penghapusan/disposal/create">
                   <Trash2 className="h-4 w-4" /> Create Disposal Request
                </Link>
             } />
          ) : null}
          <UIButton variant="outline" className="gap-2 border-slate-200 shadow-sm">
             <Printer className="h-4 w-4" /> Print Document
          </UIButton>
          {req.status === 'Technical Review' && (
             <UIButton className="gap-2 bg-emerald-600 hover:bg-emerald-700 shadow-sm">
               <CheckCircle2 className="h-4 w-4" /> Approve Technical
             </UIButton>
          )}
        </div>
      </ModuleHeader>

      {/* APPROVAL STEPPER */}
      <Card className="rounded-xl border-slate-200 shadow-sm overflow-hidden bg-white">
        <div className="p-6 border-b border-slate-100">
           <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-6">Replacement Workflow Progress</h3>
           <div className="flex justify-between relative">
              <div className="absolute top-4 left-0 right-0 h-0.5 bg-slate-100 -z-0"></div>
              
              {[
                { label: 'Submitted', status: 'completed' },
                { label: 'Technical Review', status: req.status === 'Submitted' ? 'active' : 'completed' },
                { label: 'Asset Manager', status: req.status === 'Technical Review' ? 'active' : (['Submitted', 'Technical Review'].includes(req.status) ? 'pending' : 'completed') },
                { label: 'Finance Approval', status: req.status === 'Asset Manager Review' ? 'active' : (['Approved', 'Waiting Procurement', 'Waiting Installation', 'Completed', 'Pending Disposal'].includes(req.status) ? 'completed' : 'pending') },
                { label: 'Procurement / Existing', status: ['Waiting Procurement', 'Waiting Delivery'].includes(req.status) ? 'active' : (['Waiting Installation', 'Completed', 'Pending Disposal'].includes(req.status) ? 'completed' : 'pending') },
                { label: 'Completed', status: req.status === 'Completed' ? 'completed' : 'pending' }
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

      {/* RELATION SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
         <Card className="md:col-span-3 rounded-xl border-slate-200 shadow-sm relative overflow-hidden">
            <div className="bg-slate-800 px-4 py-2 flex justify-between items-center">
               <span className="text-[10px] font-black text-white/70 uppercase">Old Asset</span>
               <Badge className="bg-red-500/20 text-red-200 border-red-500/30 text-[9px]">To be Replaced</Badge>
            </div>
            <CardContent className="p-4 flex items-start gap-3">
               <div className="h-10 w-10 rounded bg-slate-100 flex items-center justify-center text-slate-400">
                  <Box className="h-5 w-5" />
               </div>
               <div>
                  <h4 className="font-black text-slate-900 text-sm">{req.oldAssetName}</h4>
                  <p className="text-[11px] font-mono text-slate-500">{req.oldAssetCode}</p>
                  <div className="flex gap-2 mt-2">
                     <Badge variant="outline" className="text-[9px] uppercase">{req.location}</Badge>
                     <Badge variant="outline" className="text-[9px] uppercase bg-amber-50 text-amber-700 border-amber-200">{req.condition}</Badge>
                  </div>
               </div>
            </CardContent>
         </Card>

         <div className="md:col-span-1 flex justify-center">
            <div className="h-10 w-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
               <ArrowRight className="h-6 w-6" />
            </div>
         </div>

         <Card className="md:col-span-3 rounded-xl border-slate-200 shadow-sm relative overflow-hidden border-dashed border-2">
            <div className={cn(
               "px-4 py-2 flex justify-between items-center",
               req.replacementType === 'New Procurement' ? "bg-purple-800" : "bg-blue-800"
            )}>
               <span className="text-[10px] font-black text-white/70 uppercase">New Asset</span>
               <Badge className="bg-white/20 text-white border-white/30 text-[9px]">{req.replacementType}</Badge>
            </div>
            <CardContent className="p-4 flex items-start gap-3">
               <div className={cn(
                  "h-10 w-10 rounded flex items-center justify-center shrink-0",
                  req.replacementType === 'New Procurement' ? "bg-purple-50 text-purple-400" : "bg-blue-50 text-blue-400"
               )}>
                  {req.replacementType === 'New Procurement' ? <ShoppingCart className="h-5 w-5" /> : <Repeat className="h-5 w-5" />}
               </div>
               <div className="flex-1">
                  {req.newAssetCode ? (
                     <>
                        <h4 className="font-black text-slate-900 text-sm">Awaiting New Identity</h4>
                        <p className="text-[11px] font-mono text-slate-500">{req.newAssetCode}</p>
                        <Badge variant="outline" className="text-[9px] uppercase mt-2 bg-emerald-50 text-emerald-700 border-emerald-200">Reserved</Badge>
                     </>
                  ) : (
                     <>
                        <h4 className="font-black text-slate-400 text-sm italic">Procurement in Progress</h4>
                        <p className="text-[11px] font-mono text-slate-400">Ref: {req.prRef || 'Not Yet Linked'}</p>
                     </>
                  )}
               </div>
            </CardContent>
         </Card>
      </div>

      {/* TABS */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-white border border-slate-200 w-full justify-start h-12 px-2 overflow-x-auto">
          <TabsTrigger value="overview" className="data-[state=active]:bg-slate-100 data-[state=active]:text-pelni-blue text-xs font-bold gap-2">
             <Info className="h-3.5 w-3.5" /> Overview
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-slate-100 data-[state=active]:text-pelni-blue text-xs font-bold gap-2">
             <Wrench className="h-3.5 w-3.5" /> Maintenance History
          </TabsTrigger>
          <TabsTrigger value="condition" className="data-[state=active]:bg-slate-100 data-[state=active]:text-pelni-blue text-xs font-bold gap-2">
             <PackageSearch className="h-3.5 w-3.5" /> Condition & SO
          </TabsTrigger>
          <TabsTrigger value="procurement" className="data-[state=active]:bg-slate-100 data-[state=active]:text-pelni-blue text-xs font-bold gap-2">
             <ShoppingCart className="h-3.5 w-3.5" /> Procurement / Delivery
          </TabsTrigger>
          <TabsTrigger value="approval" className="data-[state=active]:bg-slate-100 data-[state=active]:text-pelni-blue text-xs font-bold gap-2">
             <ShieldCheck className="h-3.5 w-3.5" /> Approval Log
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="overview" className="m-0 space-y-6">
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="rounded-xl border-slate-200 shadow-sm lg:col-span-2">
                   <CardContent className="p-6 space-y-6">
                      <div className="grid grid-cols-2 gap-y-6">
                         <div>
                            <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Replacement Reason</h4>
                            <p className="text-sm font-bold text-slate-900">{req.reason}</p>
                         </div>
                         <div>
                            <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Requester</h4>
                            <p className="text-sm font-bold text-slate-900">{req.requester}</p>
                         </div>
                         <div className="col-span-2">
                            <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Technical Recommendation</h4>
                            <div className="p-4 bg-slate-50 border border-slate-100 rounded-lg text-sm text-slate-800 font-medium">
                               Berdasarkan hasil pengecekan berkala (MNT-2026-0031), unit mengalami kerusakan pada motherboard utama dan suku cadang untuk tipe ini sudah tidak diproduksi kembali oleh vendor (EOL). Disarankan penggantian unit secara menyeluruh untuk menjaga keandalan sistem navigasi.
                            </div>
                         </div>
                      </div>
                   </CardContent>
                </Card>

                <Card className="rounded-xl border-slate-200 shadow-sm">
                   <CardContent className="p-6 space-y-4">
                      <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Document Metadata</h4>
                      <div className="space-y-3">
                         <div className="flex justify-between">
                            <span className="text-xs text-slate-500">Created At</span>
                            <span className="text-xs font-bold">{req.requestDate}</span>
                         </div>
                         <div className="flex justify-between">
                            <span className="text-xs text-slate-500">Last Updated</span>
                            <span className="text-xs font-bold">{req.updatedAt.split('T')[0]}</span>
                         </div>
                         <div className="flex justify-between">
                            <span className="text-xs text-slate-500">Urgency</span>
                            <Badge variant="outline" className="text-[10px] bg-red-50 text-red-700 border-red-200">High Priority</Badge>
                         </div>
                         <div className="flex justify-between border-t border-slate-100 pt-3">
                            <span className="text-xs text-slate-500">Current Status</span>
                            <StatusBadge status={req.status} />
                         </div>
                      </div>
                   </CardContent>
                </Card>
             </div>
          </TabsContent>

          <TabsContent value="history" className="m-0">
             <Card className="rounded-xl border-slate-200 shadow-sm">
                <CardContent className="p-0">
                   <Table>
                      <TableHeader className="bg-slate-50">
                         <TableRow>
                            <TableHead className="text-[10px] uppercase font-bold text-slate-500">Date</TableHead>
                            <TableHead className="text-[10px] uppercase font-bold text-slate-500">WO Number</TableHead>
                            <TableHead className="text-[10px] uppercase font-bold text-slate-500">Technician</TableHead>
                            <TableHead className="text-[10px] uppercase font-bold text-slate-500">Result</TableHead>
                            <TableHead className="text-[10px] uppercase font-bold text-slate-500">Notes</TableHead>
                         </TableRow>
                      </TableHeader>
                      <TableBody>
                         <TableRow>
                            <TableCell className="text-xs font-medium">2026-04-12</TableCell>
                            <TableCell className="text-xs font-bold text-blue-600">MNT-2026-0031</TableCell>
                            <TableCell className="text-xs">Andi Herlambang</TableCell>
                            <TableCell><Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-[9px]">FAILED</Badge></TableCell>
                            <TableCell className="text-xs">Main unit non-functional, components scorched.</TableCell>
                         </TableRow>
                         <TableRow>
                            <TableCell className="text-xs font-medium">2026-03-05</TableCell>
                            <TableCell className="text-xs font-bold text-blue-600">MNT-2026-0012</TableCell>
                            <TableCell className="text-xs">Andi Herlambang</TableCell>
                            <TableCell><Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-[9px]">WARNING</Badge></TableCell>
                            <TableCell className="text-xs">Intermittent signal loss, suggested component cleaning.</TableCell>
                         </TableRow>
                      </TableBody>
                   </Table>
                </CardContent>
             </Card>
          </TabsContent>

          <TabsContent value="approval" className="m-0">
             <Card className="rounded-xl border-slate-200 shadow-sm">
                <CardContent className="p-0">
                   <Table>
                      <TableHeader className="bg-slate-50">
                         <TableRow>
                            <TableHead className="text-[10px] uppercase font-bold text-slate-500">Level</TableHead>
                            <TableHead className="text-[10px] uppercase font-bold text-slate-500">Approver</TableHead>
                            <TableHead className="text-[10px] uppercase font-bold text-slate-500">Decision</TableHead>
                            <TableHead className="text-[10px] uppercase font-bold text-slate-500">Date</TableHead>
                            <TableHead className="text-[10px] uppercase font-bold text-slate-500">Notes</TableHead>
                         </TableRow>
                      </TableHeader>
                      <TableBody>
                         <TableRow>
                            <TableCell className="font-bold text-xs">1. Maintenance Review</TableCell>
                            <TableCell className="text-xs">Agus Setiawan (Sr. Technician)</TableCell>
                            <TableCell><Badge className="bg-emerald-50 text-emerald-700 border-0">APPROVED</Badge></TableCell>
                            <TableCell className="text-xs text-slate-500">2026-05-03 09:00</TableCell>
                            <TableCell className="text-xs">Verified. Repair not possible.</TableCell>
                         </TableRow>
                         <TableRow>
                            <TableCell className="font-bold text-xs">2. Asset Manager</TableCell>
                            <TableCell className="text-xs">Ratna Sari (Manager)</TableCell>
                            <TableCell><Badge className="bg-blue-50 text-blue-700 border-0">PENDING</Badge></TableCell>
                            <TableCell className="text-xs text-slate-500">-</TableCell>
                            <TableCell className="text-xs italic text-slate-400">Awaiting review</TableCell>
                         </TableRow>
                      </TableBody>
                   </Table>
                </CardContent>
             </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
