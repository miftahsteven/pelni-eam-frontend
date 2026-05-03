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
import { Card } from "@/components/ui/card";
import { 
  ShieldCheck, 
  Eye, 
  CheckCircle2, 
  XCircle, 
  History,
  AlertCircle,
  FileText
} from "lucide-react";
import Link from "next/link";
import { disposalRequests } from "../disposal-data";
import { cn } from "@/lib/utils";

export default function DisposalApprovalPage() {
  const pendingRequests = disposalRequests.filter(r => 
    ['Submitted', 'Technical Review', 'Finance Review', 'Asset Manager Review', 'Management Approval'].includes(r.status)
  );

  return (
    <div className="space-y-6 pb-12">
      <ModuleHeader
        title="Disposal Approval Queue"
        description="Daftar pengajuan penghapusan aset yang memerlukan persetujuan Anda."
        showBack
        backUrl="/penghapusan/disposal"
        icon={<ShieldCheck className="h-4 w-4" />}
      />

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-4">
        <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
           <AlertCircle className="h-5 w-5" />
        </div>
        <div>
           <h4 className="text-sm font-black text-amber-900 tracking-tight">Perhatian: Penghapusan Aset</h4>
           <p className="text-xs text-amber-700 leading-relaxed mt-1">
              Menyetujui permohonan disposal berarti mengakui bahwa aset tersebut telah memenuhi kriteria teknis untuk dihapus dari buku besar perusahaan. Pastikan bukti fisik telah diverifikasi.
           </p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Request No</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Asset Identity</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Type</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Value</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">Status</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingRequests.map((req) => (
              <TableRow key={req.id} className="hover:bg-slate-50/80 border-slate-100">
                <TableCell>
                  <span className="font-black text-slate-900 font-mono tracking-tight text-sm">
                    {req.requestNo}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900 text-xs">{req.assetName}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{req.assetCode}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-[9px] uppercase bg-slate-50 border-slate-200 text-slate-600">
                    {req.disposalType}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-xs font-bold text-slate-900">Rp {req.bookValue?.toLocaleString() || '-'}</span>
                </TableCell>
                <TableCell className="text-center">
                  <Badge className="text-[9px] uppercase font-bold bg-amber-50 text-amber-700 border-amber-200">
                    {req.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 text-xs font-bold text-slate-600 shadow-sm gap-1.5" 
                      render={
                        <Link href={`/penghapusan/disposal/${req.id}`}>
                          <Eye className="h-3.5 w-3.5" /> Review
                        </Link>
                      }
                    />
                    <Button size="icon" className="h-8 w-8 bg-emerald-600 hover:bg-emerald-700 shadow-sm">
                      <CheckCircle2 className="h-4 w-4" />
                    </Button>
                    <Button size="icon" className="h-8 w-8 bg-red-600 hover:bg-red-700 shadow-sm">
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* QUICK STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="rounded-xl border-slate-200 shadow-sm p-4 bg-white flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
               <FileText className="h-5 w-5" />
            </div>
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Awaiting Your Review</p>
               <p className="text-xl font-black text-slate-900">{pendingRequests.length} Documents</p>
            </div>
         </Card>
         <Card className="rounded-xl border-slate-200 shadow-sm p-4 bg-white flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
               <History className="h-5 w-5" />
            </div>
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Avg. Processing Time</p>
               <p className="text-xl font-black text-slate-900">1.2 Days</p>
            </div>
         </Card>
      </div>
    </div>
  );
}
