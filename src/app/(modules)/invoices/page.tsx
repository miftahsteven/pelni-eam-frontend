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
  FileText, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  CreditCard,
  History,
  TrendingUp,
  Filter,
  Search,
  ArrowRight
} from "lucide-react";
import { useRouter } from "next/navigation";
import { invoices, invoiceStats, InvoiceStatus } from "./invoice-data";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function InvoiceDashboardPage() {
  const router = useRouter();

  const getStatusStyle = (status: InvoiceStatus) => {
    const styles: Record<string, string> = {
      'Draft': 'bg-slate-100 text-slate-600 border-slate-200',
      'Submitted': 'bg-blue-50 text-blue-700 border-blue-200',
      'Waiting Matching': 'bg-amber-50 text-amber-700 border-amber-200',
      'Matched': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      'Mismatch': 'bg-red-50 text-red-700 border-red-200',
      'Waiting Approval': 'bg-orange-50 text-orange-700 border-orange-200',
      'Ready for Payment': 'bg-blue-600 text-white border-blue-700',
      'Paid': 'bg-emerald-600 text-white border-emerald-700',
    };
    return styles[status] || 'bg-slate-50 text-slate-500 border-slate-200';
  };

  return (
    <div className="space-y-6 pb-12">
      <ModuleHeader
        title="Invoice Management"
        description="Monitor status tagihan vendor, pencocokan dokumen, dan siklus pembayaran."
        actionLabel="New Invoice"
        onAction={() => router.push('/invoices/create')}
        icon={<CreditCard className="h-4 w-4" />}
      />

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[
          { label: 'Total Invoices', value: invoiceStats.totalCount, icon: FileText, color: 'text-slate-600', bg: 'bg-white' },
          { label: 'Total Amount', value: `Rp ${(invoiceStats.totalAmount / 1e9).toFixed(1)}B`, icon: TrendingUp, color: 'text-blue-600', bg: 'bg-white' },
          { label: 'Waiting Approval', value: invoiceStats.waitingApproval, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50/50 border-orange-100' },
          { label: 'Mismatch Found', value: invoiceStats.mismatchCount, icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50/50 border-red-100' },
          { label: 'Ready to Pay', value: invoiceStats.readyForPayment, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50/50 border-emerald-100' },
          { label: 'Overdue', value: invoiceStats.overdueCount, icon: History, color: 'text-rose-600', bg: 'bg-rose-50/50 border-rose-100' },
        ].map((card, i) => (
          <div key={i} className={cn("p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-28 transition-all hover:shadow-md", card.bg)}>
            <div className="flex justify-between items-start">
               <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 max-w-[80px] leading-tight">{card.label}</span>
               <card.icon className={cn("h-4 w-4 opacity-40", card.color)} />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tight">{card.value}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* MAIN CONTENT: RECENT INVOICES */}
         <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
               <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                  <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                     <History className="h-3 w-3" /> Recent Invoices
                  </h3>
                  <Button variant="ghost" size="sm" className="h-7 text-[10px] font-black uppercase tracking-wider text-blue-600 hover:text-blue-700" render={
                     <Link href="/invoices/list">View All List <ArrowRight className="h-3 w-3 ml-1" /></Link>
                  } />
               </div>
               <Table>
                  <TableHeader>
                     <TableRow className="hover:bg-transparent border-slate-100">
                        <TableHead className="text-[10px] font-black uppercase text-slate-400">Inv No</TableHead>
                        <TableHead className="text-[10px] font-black uppercase text-slate-400">Vendor</TableHead>
                        <TableHead className="text-[10px] font-black uppercase text-slate-400 text-right">Amount</TableHead>
                        <TableHead className="text-[10px] font-black uppercase text-slate-400 text-center">Status</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {invoices.map((inv) => (
                        <TableRow key={inv.id} className="hover:bg-slate-50/50 border-slate-100 transition-colors">
                           <TableCell>
                              <Link href={`/invoices/${inv.id}`} className="font-bold text-slate-900 hover:text-blue-600 transition-colors block py-1">
                                 {inv.invoiceNo}
                                 <span className="text-[9px] text-slate-400 font-mono block tracking-tight uppercase">{inv.invoiceType}</span>
                              </Link>
                           </TableCell>
                           <TableCell>
                              <span className="text-xs font-medium text-slate-600 line-clamp-1">{inv.vendorName}</span>
                           </TableCell>
                           <TableCell className="text-right">
                              <span className="text-xs font-black text-slate-900">Rp {inv.totalAmount.toLocaleString()}</span>
                           </TableCell>
                           <TableCell className="text-center">
                              <Badge variant="outline" className={cn("text-[9px] uppercase font-black tracking-widest", getStatusStyle(inv.status))}>
                                 {inv.status}
                              </Badge>
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </div>

            {/* QUICK ACTIONS / ALERTS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                     <AlertCircle className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                     <h4 className="text-xs font-black text-amber-900 tracking-tight uppercase">Mismatch Resolution Required</h4>
                     <p className="text-[11px] text-amber-700 leading-relaxed font-medium">Ada 2 invoice pengadaan yang memiliki selisih kuantitas antara fisik (DO) dan tagihan. Segera lakukan verifikasi.</p>
                     <Button size="sm" variant="ghost" className="h-6 p-0 text-[10px] font-black text-amber-900 hover:bg-transparent underline decoration-amber-300">Open Matching Workbench</Button>
                  </div>
               </div>
               <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                     <Filter className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                     <h4 className="text-xs font-black text-blue-900 tracking-tight uppercase">Financial Period Closing</h4>
                     <p className="text-[11px] text-blue-700 leading-relaxed font-medium">Periode Mei 2026 akan segera berakhir. Pastikan seluruh invoice vendor telah di-matching untuk alokasi biaya aset.</p>
                     <Button size="sm" variant="ghost" className="h-6 p-0 text-[10px] font-black text-blue-900 hover:bg-transparent underline decoration-blue-300">View Cost Allocation</Button>
                  </div>
               </div>
            </div>
         </div>

         {/* SIDEBAR: ANALYTICS & QUICK SEARCH */}
         <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
               <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Search className="h-3 w-3" /> Quick Filter Documents
               </h3>
               <div className="space-y-3">
                  <div className="space-y-1">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1">Search Anything</label>
                     <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-300" />
                        <input placeholder="Inv No, PO, Vendor..." className="flex h-9 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs pl-9 placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-slate-400" />
                     </div>
                  </div>
                  <div className="pt-2">
                     <Button className="w-full h-10 bg-slate-900 hover:bg-slate-800 text-xs font-bold gap-2 shadow-lg">
                        Apply Global Filter
                     </Button>
                  </div>
               </div>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-5 shadow-xl text-white relative overflow-hidden group">
               <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform">
                  <FileText className="h-32 w-32" />
               </div>
               <div className="relative z-10 space-y-4">
                  <div className="h-8 w-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                     <TrendingUp className="h-4 w-4" />
                  </div>
                  <div>
                     <h4 className="text-xl font-black tracking-tight">Financial Health</h4>
                     <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Acquisition Cost Allocation</p>
                  </div>
                  <div className="space-y-2 pt-2">
                     <div className="flex justify-between items-end">
                        <span className="text-[10px] font-bold text-slate-300">Budget Allocated</span>
                        <span className="text-xs font-black">74%</span>
                     </div>
                     <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[74%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                     </div>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed italic">
                     Rp 9.5B from Rp 12.8B has been successfully allocated to Asset History.
                  </p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
