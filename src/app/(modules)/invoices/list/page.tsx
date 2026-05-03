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
  Search, 
  Filter, 
  Download, 
  Eye, 
  ArrowRight,
  MoreVertical,
  Plus,
  CreditCard,
  AlertTriangle,
  CheckCircle2,
  Clock
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { invoices, InvoiceStatus } from "../invoice-data";
import { cn } from "@/lib/utils";

export default function InvoiceListPage() {
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

  const getMatchingStyle = (status: string) => {
    switch (status) {
      case 'Matched': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Mismatch': return 'bg-red-50 text-red-600 border-red-100 font-black';
      default: return 'bg-slate-50 text-slate-400 border-slate-100';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <ModuleHeader
        title="Vendor Invoice List"
        description="Daftar seluruh tagihan vendor yang masuk ke sistem EAM."
        actionLabel="Create Invoice"
        onAction={() => router.push('/invoices/create')}
        icon={<CreditCard className="h-4 w-4" />}
      />

      {/* FILTER BAR */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
           <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                placeholder="Search invoice no, vendor, or source document..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
           </div>
           <div className="flex gap-2 w-full md:w-auto">
              <Button variant="outline" className="gap-2 text-xs font-bold border-slate-200 flex-1 md:flex-none">
                 <Filter className="h-3.5 w-3.5" /> Advanced Filter
              </Button>
              <Button variant="outline" className="gap-2 text-xs font-bold border-slate-200 flex-1 md:flex-none">
                 <Download className="h-3.5 w-3.5" /> Export
              </Button>
           </div>
        </div>
      </div>

      {/* DATA TABLE */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50 border-b border-slate-200">
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 py-4">Invoice Identity</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Source Doc</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">WBS / Cost Center</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Total Amount</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">Matching</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">Status</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((inv) => (
              <TableRow key={inv.id} className="group hover:bg-slate-50/50 border-slate-100 transition-colors">
                <TableCell className="py-4">
                  <div className="flex flex-col">
                    <span className="font-black text-slate-900 tracking-tight text-sm uppercase">{inv.invoiceNo}</span>
                    <span className="text-[11px] font-bold text-slate-500 line-clamp-1">{inv.vendorName}</span>
                    <div className="flex gap-2 mt-1">
                       <span className="text-[9px] text-slate-400 font-mono italic">{inv.invoiceDate}</span>
                       <span className={cn("text-[9px] font-black uppercase tracking-tighter", 
                          new Date(inv.dueDate) < new Date() ? "text-red-500" : "text-slate-400"
                       )}>Due: {inv.dueDate}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                   <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{inv.sourceDocType}</span>
                      <span className="text-xs font-bold text-blue-600 hover:underline cursor-pointer">{inv.sourceDocNo}</span>
                   </div>
                </TableCell>
                <TableCell>
                   <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-700">{inv.wbsCode}</span>
                      <span className="text-[10px] font-medium text-slate-500">{inv.costCenter}</span>
                   </div>
                </TableCell>
                <TableCell className="text-right">
                   <div className="flex flex-col items-end">
                      <span className="text-sm font-black text-slate-900 tracking-tight">Rp {inv.totalAmount.toLocaleString()}</span>
                      {inv.paidAmount > 0 && (
                         <span className="text-[9px] font-bold text-emerald-600 uppercase">Paid: Rp {inv.paidAmount.toLocaleString()}</span>
                      )}
                   </div>
                </TableCell>
                <TableCell className="text-center">
                   <Badge variant="outline" className={cn("text-[9px] uppercase font-black tracking-widest px-2 py-0.5", getMatchingStyle(inv.matchingStatus))}>
                      {inv.matchingStatus === 'Mismatch' && <AlertTriangle className="h-2 w-2 mr-1" />}
                      {inv.matchingStatus}
                   </Badge>
                </TableCell>
                <TableCell className="text-center">
                   <Badge className={cn("text-[9px] uppercase font-black tracking-widest border-0 shadow-none", getStatusStyle(inv.status))}>
                      {inv.status}
                   </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50" render={
                       <Link href={`/invoices/${inv.id}`}><Eye className="h-4 w-4" /></Link>
                    } />
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
                       <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="px-4 py-4 border-t border-slate-100 bg-slate-50/30 flex justify-between items-center text-[11px] font-bold text-slate-500 uppercase tracking-widest">
           <span>Showing 4 of 42 invoices</span>
           <div className="flex gap-1">
              <Button variant="outline" size="sm" className="h-7 text-[10px] font-black border-slate-200" disabled>Previous</Button>
              <Button variant="outline" size="sm" className="h-7 text-[10px] font-black border-slate-200">Next</Button>
           </div>
        </div>
      </div>
    </div>
  );
}
