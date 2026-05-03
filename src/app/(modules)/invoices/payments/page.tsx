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
  CreditCard, 
  Search, 
  Filter, 
  Download, 
  History, 
  CheckCircle2, 
  AlertCircle,
  MoreVertical,
  ArrowRight,
  TrendingUp,
  DollarSign
} from "lucide-react";
import Link from "next/link";
import { invoices } from "../invoice-data";
import { cn } from "@/lib/utils";

export default function PaymentMonitoringPage() {
  const payableInvoices = invoices.filter(i => i.status === 'Ready for Payment' || i.status === 'Partially Paid' || i.status === 'Paid');

  return (
    <div className="space-y-6 pb-12">
      <ModuleHeader
        title="Payment Monitoring"
        description="Pantau realisasi pembayaran vendor dan jadwal jatuh tempo tagihan."
        showBack
        backUrl="/invoices"
        icon={<DollarSign className="h-4 w-4" />}
      />

      {/* PAYMENT SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex items-center justify-between">
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">Total Payables</p>
               <p className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Rp 12.8B</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
               <CreditCard className="h-6 w-6" />
            </div>
         </div>
         <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex items-center justify-between border-l-4 border-l-emerald-500">
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">Total Realized</p>
               <p className="text-2xl font-black text-emerald-600 tracking-tighter uppercase">Rp 8.2B</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
               <TrendingUp className="h-6 w-6" />
            </div>
         </div>
         <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex items-center justify-between border-l-4 border-l-orange-500">
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">Outstanding</p>
               <p className="text-2xl font-black text-orange-600 tracking-tighter uppercase">Rp 4.6B</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
               <AlertCircle className="h-6 w-6" />
            </div>
         </div>
      </div>

      {/* DATA TABLE */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/30 flex justify-between items-center">
           <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <History className="h-3 w-3" /> Payment Status Ledger
           </h3>
           <div className="flex gap-2">
              <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-300" />
                 <input placeholder="Search vendor or invoice..." className="pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded text-[10px] font-bold w-56 focus:outline-none focus:ring-1 focus:ring-blue-500/20 shadow-sm" />
              </div>
              <Button variant="outline" size="sm" className="h-8 text-[10px] font-black border-slate-200 gap-1.5 shadow-sm"><Download className="h-3 w-3" /> Report</Button>
           </div>
        </div>
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-[10px] font-black uppercase text-slate-500 py-4">Invoice / Vendor</TableHead>
              <TableHead className="text-[10px] font-black uppercase text-slate-500">Due Date</TableHead>
              <TableHead className="text-[10px] font-black uppercase text-slate-500 text-right">Invoice Amount</TableHead>
              <TableHead className="text-[10px] font-black uppercase text-slate-500 text-right">Paid Amount</TableHead>
              <TableHead className="text-[10px] font-black uppercase text-slate-500 text-right">Remaining</TableHead>
              <TableHead className="text-[10px] font-black uppercase text-slate-500 text-center">Status</TableHead>
              <TableHead className="text-[10px] font-black uppercase text-slate-500 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payableInvoices.map((inv) => (
              <TableRow key={inv.id} className="hover:bg-slate-50/50 border-slate-100 transition-colors">
                <TableCell className="py-4">
                  <div className="flex flex-col">
                    <span className="font-black text-slate-900 tracking-tight text-sm uppercase">{inv.invoiceNo}</span>
                    <span className="text-[11px] font-bold text-slate-500 truncate max-w-[200px]">{inv.vendorName}</span>
                  </div>
                </TableCell>
                <TableCell>
                   <span className={cn("text-[10px] font-black uppercase tracking-widest", 
                      new Date(inv.dueDate) < new Date() && inv.status !== 'Paid' ? "text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-100" : "text-slate-600"
                   )}>{inv.dueDate}</span>
                </TableCell>
                <TableCell className="text-right">
                   <span className="text-xs font-black text-slate-900 tracking-tight">Rp {inv.totalAmount.toLocaleString()}</span>
                </TableCell>
                <TableCell className="text-right">
                   <span className="text-xs font-bold text-emerald-600">Rp {inv.paidAmount.toLocaleString()}</span>
                </TableCell>
                <TableCell className="text-right font-mono">
                   <span className={cn("text-xs font-black tracking-tighter", 
                      inv.remainingAmount > 0 ? "text-orange-600" : "text-slate-300"
                   )}>Rp {inv.remainingAmount.toLocaleString()}</span>
                </TableCell>
                <TableCell className="text-center">
                   <Badge className={cn("text-[9px] uppercase font-black tracking-widest border-0 shadow-none", 
                      inv.status === 'Paid' ? "bg-emerald-600 text-white" : 
                      inv.status === 'Partially Paid' ? "bg-amber-100 text-amber-700" : "bg-blue-600 text-white"
                   )}>
                      {inv.status}
                   </Badge>
                </TableCell>
                <TableCell className="text-right">
                   <Button variant="outline" size="sm" className="h-8 text-[10px] font-black uppercase tracking-widest border-slate-200 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm">
                      Update Payment
                   </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* PAYMENT ANALYTICS BANNER */}
      <div className="bg-slate-900 rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl relative overflow-hidden">
         <div className="absolute left-0 top-0 h-full w-2 bg-blue-500"></div>
         <div className="space-y-1">
            <h4 className="text-white text-xl font-black tracking-tight">Cash Flow Outlook</h4>
            <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest flex items-center gap-2">
               <TrendingUp className="h-3.5 w-3.5 text-emerald-500" /> Projected Payables for June 2026
            </p>
         </div>
         <div className="flex gap-8 items-center bg-white/5 p-4 rounded-xl border border-white/10 px-8">
            <div className="text-center">
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Weekly Forecast</p>
               <p className="text-2xl font-black text-white uppercase tracking-tighter leading-none">Rp 3.2B</p>
            </div>
            <div className="h-10 w-px bg-white/10 hidden md:block"></div>
            <div className="text-center">
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Monthly Forecast</p>
               <p className="text-2xl font-black text-blue-400 uppercase tracking-tighter leading-none">Rp 12.5B</p>
            </div>
         </div>
         <Button className="bg-blue-600 hover:bg-blue-700 h-11 px-8 font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-900/40">
            Download Cash Flow Plan
         </Button>
      </div>
    </div>
  );
}
