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
import { 
  ShieldCheck, 
  Eye, 
  CheckCircle2, 
  XCircle, 
  Clock,
  Building2,
  FileText,
  Search,
  Filter,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { invoices } from "../invoice-data";
import { cn } from "@/lib/utils";

export default function InvoiceApprovalPage() {
  const approvalQueue = invoices.filter(i => i.status === 'Waiting Approval' || i.status === 'Waiting Matching');

  return (
    <div className="space-y-6 pb-12">
      <ModuleHeader
        title="Invoice Approval Queue"
        description="Daftar invoice yang membutuhkan tinjauan teknis dan finansial Anda."
        showBack
        backUrl="/invoices"
        icon={<ShieldCheck className="h-4 w-4" />}
      />

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
           <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Clock className="h-3 w-3" /> Pending Approvals ({approvalQueue.length})
           </h3>
           <div className="flex gap-2">
              <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-300" />
                 <input placeholder="Search queue..." className="pl-9 pr-3 py-1 bg-white border border-slate-200 rounded text-[10px] font-bold w-48 focus:outline-none focus:ring-1 focus:ring-blue-500/20" />
              </div>
              <Button variant="outline" size="sm" className="h-7 text-[10px] font-black border-slate-200"><Filter className="h-3 w-3 mr-1" /> Filter</Button>
           </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-[10px] font-black uppercase text-slate-400 py-4">Invoice Info</TableHead>
              <TableHead className="text-[10px] font-black uppercase text-slate-400">Vendor</TableHead>
              <TableHead className="text-[10px] font-black uppercase text-slate-400">Source Doc</TableHead>
              <TableHead className="text-[10px] font-black uppercase text-slate-400 text-right">Amount</TableHead>
              <TableHead className="text-[10px] font-black uppercase text-slate-400 text-center">Current Status</TableHead>
              <TableHead className="text-[10px] font-black uppercase text-slate-400 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {approvalQueue.map((inv) => (
              <TableRow key={inv.id} className="hover:bg-slate-50/50 border-slate-100 group transition-colors">
                <TableCell className="py-4">
                  <div className="flex flex-col">
                    <span className="font-black text-slate-900 tracking-tight text-sm uppercase">{inv.invoiceNo}</span>
                    <span className="text-[9px] font-black text-slate-400 tracking-widest uppercase mt-0.5">{inv.invoiceType}</span>
                  </div>
                </TableCell>
                <TableCell>
                   <div className="flex items-center gap-2">
                      <Building2 className="h-3.5 w-3.5 text-slate-300" />
                      <span className="text-xs font-bold text-slate-600 line-clamp-1">{inv.vendorName}</span>
                   </div>
                </TableCell>
                <TableCell>
                   <span className="text-xs font-bold text-blue-600 uppercase font-mono">{inv.sourceDocNo}</span>
                </TableCell>
                <TableCell className="text-right">
                   <span className="text-sm font-black text-slate-900 tracking-tight">Rp {inv.totalAmount.toLocaleString()}</span>
                </TableCell>
                <TableCell className="text-center">
                   <Badge variant="outline" className="text-[9px] uppercase font-black tracking-widest bg-orange-50 text-orange-700 border-orange-100">
                      {inv.status}
                   </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" className="h-8 text-[10px] font-black border-slate-200 hover:bg-emerald-50 hover:text-emerald-700 transition-colors uppercase tracking-widest">
                       <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Quick Approve
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600 bg-slate-50 group-hover:bg-blue-50/50" render={
                       <Link href={`/invoices/${inv.id}`}><Eye className="h-4 w-4" /></Link>
                    } />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="bg-slate-900 rounded-xl p-8 text-white relative overflow-hidden shadow-2xl">
         <div className="absolute top-0 right-0 p-8 opacity-5">
            <ShieldCheck className="h-32 w-32" />
         </div>
         <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
               <h4 className="text-2xl font-black tracking-tight">Bulk Approval Action</h4>
               <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
                  Anda dapat menyetujui beberapa invoice sekaligus jika hasil matching dokumen (4-Way) sudah dinyatakan 100% valid oleh sistem.
               </p>
               <Button className="bg-emerald-600 hover:bg-emerald-700 h-11 px-8 font-black text-xs uppercase tracking-widest shadow-lg shadow-emerald-900/40">
                  Execute Bulk Approval
               </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Pending Value</p>
                  <p className="text-lg font-black text-white uppercase tracking-tighter leading-none">Rp 1.47B</p>
               </div>
               <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Due within 3 Days</p>
                  <p className="text-lg font-black text-orange-400 uppercase tracking-tighter leading-none">3 Invoices</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
