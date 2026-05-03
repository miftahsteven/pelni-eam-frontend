"use client";

import React from "react";
import { ModuleHeader } from "@/components/module-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  CheckCircle2, 
  Search,
  Filter,
  RefreshCw,
  Eye,
  Check,
  X
} from "lucide-react";
import Link from "next/link";
import { movementRequests, MovementStatus } from "../movement-data";
import { cn } from "@/lib/utils";

const StatusBadge = ({ status }: { status: MovementStatus }) => {
  const styles = {
    'Submitted': 'bg-blue-50 text-blue-700 border-blue-200',
    'Under Review': 'bg-yellow-50 text-yellow-700 border-yellow-200',
    'In Transit': 'bg-purple-50 text-purple-700 border-purple-200',
  };

  // @ts-ignore
  const style = styles[status] || 'bg-slate-50 text-slate-700 border-slate-200';

  return (
    <Badge variant="outline" className={cn("text-[10px] font-bold uppercase tracking-wider", style)}>
      {status}
    </Badge>
  );
};

export default function MovementApprovalQueuePage() {
  // Only show requests that need approval/review
  const pendingRequests = movementRequests.filter(req => 
    req.status === 'Submitted' || req.status === 'Under Review' || req.status === 'In Transit'
  );

  return (
    <div className="space-y-6 pb-12">
      <ModuleHeader
        title="Movement Approval Queue"
        description="Daftar permintaan pemindahan aset yang membutuhkan persetujuan atau konfirmasi."
        showBack
        backUrl="/penghapusan/movement"
        icon={<CheckCircle2 className="h-4 w-4" />}
      />

      {/* FILTER PANEL */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Search request no, asset code..." className="pl-9 bg-slate-50 border-slate-200 h-9 text-sm" />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="h-9 gap-2 border-slate-200 shadow-sm">
            <Filter className="h-4 w-4 text-slate-500" /> Filter
          </Button>
          <Button variant="outline" size="sm" className="h-9 w-9 p-0 border-slate-200 shadow-sm">
            <RefreshCw className="h-4 w-4 text-slate-500" />
          </Button>
        </div>
      </div>

      {/* DATA TABLE */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50 border-b border-slate-200">
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Request No</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Asset Identity</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Route</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Requester</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Date</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Status</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingRequests.length === 0 ? (
               <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-slate-500">
                     <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-emerald-400 opacity-50" />
                     <p className="text-sm font-medium">No pending approvals at the moment.</p>
                  </TableCell>
               </TableRow>
            ) : pendingRequests.map((req) => (
              <TableRow key={req.id} className="hover:bg-slate-50/80 border-slate-100 group">
                <TableCell>
                  <Link href={`/penghapusan/movement/${req.id}?tab=approval`} className="font-bold text-blue-600 hover:underline text-sm font-mono tracking-tight">
                    {req.requestNo}
                  </Link>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-bold text-slate-900 text-xs truncate max-w-[150px]">{req.assetName}</span>
                    <span className="text-[10px] text-slate-500 font-mono tracking-tight">{req.assetCode}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1 max-w-[150px]">
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                      <span className="font-bold uppercase">From:</span>
                      <span className="truncate">{req.currentLocation}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-900 font-medium">
                      <span className="font-bold uppercase text-pelni-blue">To:</span>
                      <span className="truncate">{req.destinationLocation}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-xs font-medium text-slate-900">{req.requester}</span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-0.5">
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Submitted</span>
                     <span className="text-xs font-medium text-slate-700">{req.createdAt.split('T')[0]}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <StatusBadge status={req.status} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 text-xs font-bold text-slate-600 shadow-sm" 
                      render={
                        <Link href={`/penghapusan/movement/${req.id}?tab=approval`}>
                          <Eye className="h-3.5 w-3.5 mr-1.5" /> Review
                        </Link>
                      }
                    />
                    {(req.status === 'Submitted' || req.status === 'Under Review') && (
                       <>
                          <Button size="icon" className="h-8 w-8 bg-emerald-600 hover:bg-emerald-700 shadow-sm">
                             <Check className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="outline" className="h-8 w-8 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 shadow-sm">
                             <X className="h-4 w-4" />
                          </Button>
                       </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
