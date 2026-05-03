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
  Truck,
  Building2,
  User,
  Info
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { movementRequests, MovementStatus } from "../movement-data";
import { cn } from "@/lib/utils";

const StatusBadge = ({ status }: { status: MovementStatus }) => {
  const styles = {
    'Draft': 'bg-slate-100 text-slate-600 border-slate-200',
    'Submitted': 'bg-blue-50 text-blue-700 border-blue-200',
    'Under Review': 'bg-yellow-50 text-yellow-700 border-yellow-200',
    'Approved': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Rejected': 'bg-red-50 text-red-700 border-red-200',
    'In Transit': 'bg-purple-50 text-purple-700 border-purple-200',
    'Completed': 'bg-green-100 text-green-800 border-green-300',
    'Cancelled': 'bg-slate-100 text-slate-500 border-slate-200',
  };

  return (
    <Badge variant="outline" className={cn("text-[10px] font-bold uppercase tracking-wider", styles[status])}>
      {status}
    </Badge>
  );
};

export default function MovementDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [activeTab, setActiveTab] = useState("overview");

  // Mock finding data
  const req = movementRequests.find(r => r.id === id) || movementRequests[0];

  return (
    <div className="space-y-6 pb-12">
      <ModuleHeader
        title={`Movement Request ${req.requestNo}`}
        description="Detail dokumen pemindahan aset."
        showBack
        backUrl="/penghapusan/movement"
      >
        <div className="flex gap-2">
          {req.status === 'Draft' && (
             <Button variant="outline" className="gap-2 border-slate-200 shadow-sm text-blue-600">
               <Edit className="h-4 w-4" /> Edit Draft
             </Button>
          )}
          <Button variant="outline" className="gap-2 border-slate-200 shadow-sm">
             <Printer className="h-4 w-4" /> Print Document
          </Button>
          {req.status === 'Submitted' && (
             <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700 shadow-sm">
               <CheckCircle2 className="h-4 w-4" /> Approve
             </Button>
          )}
        </div>
      </ModuleHeader>

      {/* HEADER CARD */}
      <Card className="rounded-xl border-slate-200 shadow-sm overflow-hidden bg-white">
        <div className="p-6">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-6 mb-6">
              <div>
                 <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">{req.requestNo}</h2>
                    <StatusBadge status={req.status} />
                 </div>
                 <p className="text-sm font-medium text-slate-500 flex items-center gap-2">
                    <span className="font-mono">{req.assetCode}</span>
                    <span>•</span>
                    <span>{req.assetName}</span>
                 </p>
              </div>
              <div className="flex gap-6 text-sm">
                 <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Request Date</span>
                    <span className="font-medium text-slate-900">{req.movementDate.split('T')[0]}</span>
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Requester</span>
                    <span className="font-medium text-slate-900">{req.requester}</span>
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Movement Type</span>
                    <span className="font-medium text-slate-900">{req.movementType}</span>
                 </div>
              </div>
           </div>

           {/* ORIGIN vs DESTINATION SUMMARY */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 items-center">
              <div className="lg:col-span-3 p-4 bg-slate-50 border border-slate-200 rounded-xl relative">
                 <Badge variant="outline" className="absolute -top-2.5 left-4 bg-white text-[9px] uppercase font-bold text-slate-500">Origin</Badge>
                 <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded bg-slate-200 flex items-center justify-center text-slate-500 shrink-0 mt-0.5">
                       <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                       <h4 className="font-bold text-slate-900 text-sm">{req.currentLocation}</h4>
                       <p className="text-xs text-slate-500 mt-1 flex flex-col gap-0.5">
                          <span className="flex items-center gap-1.5"><Building2 className="h-3 w-3" /> {req.currentDepartment}</span>
                          <span className="flex items-center gap-1.5"><User className="h-3 w-3" /> {req.currentPic}</span>
                       </p>
                    </div>
                 </div>
              </div>

              <div className="lg:col-span-1 flex justify-center text-slate-300">
                 <ArrowRight className="h-8 w-8 hidden lg:block" />
              </div>

              <div className="lg:col-span-3 p-4 bg-blue-50/50 border border-blue-200 rounded-xl relative">
                 <Badge variant="outline" className="absolute -top-2.5 left-4 bg-blue-600 text-[9px] uppercase font-bold text-white border-blue-600">Destination</Badge>
                 <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded bg-blue-100 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                       <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                       <h4 className="font-bold text-slate-900 text-sm">{req.destinationLocation}</h4>
                       <p className="text-xs text-slate-500 mt-1 flex flex-col gap-0.5">
                          <span className="flex items-center gap-1.5"><Building2 className="h-3 w-3" /> {req.destinationDepartment}</span>
                          <span className="flex items-center gap-1.5"><User className="h-3 w-3" /> {req.destinationPic}</span>
                       </p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </Card>

      {/* TABS */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-white border border-slate-200 w-full justify-start h-12 px-2 overflow-x-auto">
          <TabsTrigger value="overview" className="data-[state=active]:bg-slate-100 data-[state=active]:text-pelni-blue text-xs font-bold gap-2">
             <Info className="h-3.5 w-3.5" /> Overview
          </TabsTrigger>
          <TabsTrigger value="asset" className="data-[state=active]:bg-slate-100 data-[state=active]:text-pelni-blue text-xs font-bold gap-2">
             <Box className="h-3.5 w-3.5" /> Asset Detail
          </TabsTrigger>
          <TabsTrigger value="movement" className="data-[state=active]:bg-slate-100 data-[state=active]:text-pelni-blue text-xs font-bold gap-2">
             <Truck className="h-3.5 w-3.5" /> Movement Detail
          </TabsTrigger>
          <TabsTrigger value="approval" className="data-[state=active]:bg-slate-100 data-[state=active]:text-pelni-blue text-xs font-bold gap-2 relative">
             <CheckCircle2 className="h-3.5 w-3.5" /> Approval
             {req.status === 'Submitted' && <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>}
          </TabsTrigger>
          <TabsTrigger value="attachments" className="data-[state=active]:bg-slate-100 data-[state=active]:text-pelni-blue text-xs font-bold gap-2">
             <Paperclip className="h-3.5 w-3.5" /> Attachments
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-slate-100 data-[state=active]:text-pelni-blue text-xs font-bold gap-2">
             <History className="h-3.5 w-3.5" /> History & Audit Trail
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="overview" className="m-0">
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="rounded-xl border-slate-200 shadow-sm lg:col-span-2">
                   <CardContent className="p-6 space-y-6">
                      <div>
                         <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2">Reason for Movement</h3>
                         <div className="p-4 bg-slate-50 border border-slate-100 rounded-lg text-sm text-slate-800 font-medium">
                            {req.reason}
                         </div>
                      </div>
                      {req.notes && (
                         <div>
                            <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2">Additional Notes</h3>
                            <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-lg text-sm text-yellow-800 font-medium">
                               {req.notes}
                            </div>
                         </div>
                      )}
                      
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                         <div className="space-y-1">
                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Expected Arrival Date</span>
                            <span className="text-sm font-bold text-slate-900">{req.expectedArrivalDate || '-'}</span>
                         </div>
                         <div className="space-y-1">
                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Related Document</span>
                            {req.relatedModule ? (
                               <Link href="#" className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-1.5">
                                  {req.referenceNumber} <span className="text-[10px] text-slate-400 font-medium bg-slate-100 px-1.5 py-0.5 rounded">({req.relatedModule})</span>
                               </Link>
                            ) : (
                               <span className="text-sm font-bold text-slate-900">-</span>
                            )}
                         </div>
                      </div>
                   </CardContent>
                </Card>

                <Card className="rounded-xl border-slate-200 shadow-sm">
                   <CardContent className="p-6">
                      <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-4">Approval Status</h3>
                      <div className="space-y-4">
                         <div className="flex gap-3">
                            <div className="mt-1"><CheckCircle2 className="h-4 w-4 text-emerald-500" /></div>
                            <div>
                               <p className="text-xs font-bold text-slate-900">Requester Submitted</p>
                               <p className="text-[10px] text-slate-500">{req.createdAt.replace('T', ' ').replace('Z', '')}</p>
                            </div>
                         </div>
                         <div className="flex gap-3 relative">
                            <div className="absolute top-0 bottom-0 left-[7.5px] w-px bg-slate-200 -z-10 -my-3"></div>
                            <div className="mt-1">
                               {req.status === 'Draft' ? <Clock className="h-4 w-4 text-slate-300" /> :
                                req.status === 'Submitted' ? <Clock className="h-4 w-4 text-blue-500" /> :
                                req.status === 'Rejected' ? <XCircle className="h-4 w-4 text-red-500" /> :
                                <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                            </div>
                            <div>
                               <p className="text-xs font-bold text-slate-900">Manager Review</p>
                               <p className="text-[10px] text-slate-500">
                                  {req.status === 'Submitted' ? 'Pending Action' : req.updatedAt.replace('T', ' ').replace('Z', '')}
                               </p>
                            </div>
                         </div>
                         <div className="flex gap-3 relative">
                            <div className="absolute top-0 bottom-0 left-[7.5px] w-px bg-slate-200 -z-10 -my-3"></div>
                            <div className="mt-1">
                               {req.status === 'Completed' ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> :
                                req.status === 'In Transit' ? <Clock className="h-4 w-4 text-purple-500" /> :
                                <Clock className="h-4 w-4 text-slate-300" />}
                            </div>
                            <div>
                               <p className="text-xs font-bold text-slate-900">Logistic Confirmation</p>
                               <p className="text-[10px] text-slate-500">Pending</p>
                            </div>
                         </div>
                      </div>
                      <div className="mt-6 pt-6 border-t border-slate-100">
                         <Button variant="outline" className="w-full text-xs font-bold" onClick={() => setActiveTab('approval')}>
                            View Full Approval Log
                         </Button>
                      </div>
                   </CardContent>
                </Card>
             </div>
          </TabsContent>

          {/* Dummy content for other tabs */}
          <TabsContent value="asset" className="m-0">
             <Card className="rounded-xl border-slate-200 shadow-sm">
                <CardContent className="p-8 text-center text-slate-500">
                   <Box className="h-8 w-8 mx-auto mb-3 opacity-20" />
                   <p className="text-sm font-medium">Asset Identity Information goes here.</p>
                </CardContent>
             </Card>
          </TabsContent>
          
          <TabsContent value="approval" className="m-0">
             <Card className="rounded-xl border-slate-200 shadow-sm">
                <CardContent className="p-0">
                   <Table>
                      <TableHeader className="bg-slate-50">
                         <TableRow>
                            <TableHead className="text-[10px] uppercase font-bold text-slate-500">Step</TableHead>
                            <TableHead className="text-[10px] uppercase font-bold text-slate-500">Approver</TableHead>
                            <TableHead className="text-[10px] uppercase font-bold text-slate-500">Status</TableHead>
                            <TableHead className="text-[10px] uppercase font-bold text-slate-500">Date</TableHead>
                            <TableHead className="text-[10px] uppercase font-bold text-slate-500">Notes</TableHead>
                         </TableRow>
                      </TableHeader>
                      <TableBody>
                         <TableRow>
                            <TableCell className="font-medium text-xs">1. Submission</TableCell>
                            <TableCell className="text-xs">{req.requester} (Requester)</TableCell>
                            <TableCell><Badge className="bg-emerald-50 text-emerald-700 border-0">Submitted</Badge></TableCell>
                            <TableCell className="text-xs text-slate-500">{req.createdAt.replace('T', ' ').replace('Z', '')}</TableCell>
                            <TableCell className="text-xs">-</TableCell>
                         </TableRow>
                         <TableRow>
                            <TableCell className="font-medium text-xs">2. Manager Review</TableCell>
                            <TableCell className="text-xs">System Auto / Assigner</TableCell>
                            <TableCell>
                               {req.status === 'Submitted' ? <Badge className="bg-blue-50 text-blue-700 border-0">Pending</Badge> :
                                req.status === 'Approved' || req.status === 'Completed' || req.status === 'In Transit' ? <Badge className="bg-emerald-50 text-emerald-700 border-0">Approved</Badge> :
                                <Badge className="bg-red-50 text-red-700 border-0">Rejected</Badge>}
                            </TableCell>
                            <TableCell className="text-xs text-slate-500">
                               {req.status !== 'Submitted' && req.status !== 'Draft' ? req.updatedAt.replace('T', ' ').replace('Z', '') : '-'}
                            </TableCell>
                            <TableCell className="text-xs italic text-slate-500">"Ok proceed."</TableCell>
                         </TableRow>
                      </TableBody>
                   </Table>
                </CardContent>
             </Card>
          </TabsContent>

          <TabsContent value="attachments" className="m-0">
             <Card className="rounded-xl border-slate-200 shadow-sm">
                <CardContent className="p-8 text-center text-slate-500">
                   <Paperclip className="h-8 w-8 mx-auto mb-3 opacity-20" />
                   <p className="text-sm font-medium">No attachments found.</p>
                </CardContent>
             </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
