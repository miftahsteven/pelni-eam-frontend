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
  TrendingUp, 
  Search, 
  Filter, 
  Download, 
  ArrowRight,
  Box,
  Building2,
  FileText,
  DollarSign,
  History,
  Info
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const mockAllocations = [
  { assetId: 'AST-PELNI-000231', assetName: 'Radar Navigation Unit KM Kelud', invoiceNo: 'INV-STN-2026-0001', costType: 'Acquisition', amount: 943500000, module: 'Procurement', date: '2026-05-07' },
  { assetId: 'AST-PELNI-000232', assetName: 'Radar Navigation Unit KM Dobonsolo', invoiceNo: 'INV-STN-2026-0001', costType: 'Acquisition', amount: 943500000, module: 'Procurement', date: '2026-05-07' },
  { assetId: 'AST-PELNI-000231', assetName: 'Radar Navigation Unit KM Kelud', invoiceNo: 'INV-STN-2026-0001', costType: 'Installation', amount: 69375000, module: 'Installation', date: '2026-05-07' },
  { assetId: 'AST-PELNI-000232', assetName: 'Radar Navigation Unit KM Dobonsolo', invoiceNo: 'INV-STN-2026-0001', costType: 'Installation', amount: 69375000, module: 'Installation', date: '2026-05-07' },
  { assetId: 'AST-PELNI-000145', assetName: 'Main Engine Pump KM Labobar', invoiceNo: 'INV-BAH-2026-0003', costType: 'Maintenance', amount: 420000000, module: 'Maintenance', date: '2026-05-03' },
  { assetId: 'AST-PELNI-000188', assetName: 'Generator Panel KM Ciremai', invoiceNo: 'INV-EKM-2026-0004', costType: 'Replacement', amount: 680000000, module: 'Replacement', date: '2026-05-11' },
];

export default function AssetAllocationPage() {
  return (
    <div className="space-y-6 pb-12">
      <ModuleHeader
        title="Asset Cost Allocation"
        description="Hubungan antara pengeluaran invoice dan nilai histori aset di seluruh armada."
        showBack
        backUrl="/invoices"
        icon={<TrendingUp className="h-4 w-4" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         {/* ALLOCATION OVERVIEW */}
         <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
               <div className="flex items-center gap-2 mb-2 border-b border-slate-100 pb-2">
                  <Info className="h-4 w-4 text-blue-600" />
                  <h4 className="text-[10px] font-black uppercase text-slate-800 tracking-widest">Allocation Rules</h4>
               </div>
               <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                  Sistem secara otomatis mengalokasikan biaya invoice ke aset berdasarkan referensi <span className="font-bold text-slate-700 underline">WBS Code</span> dan <span className="font-bold text-slate-700 underline">Asset ID</span> yang tertera pada Purchase Order atau Work Order.
               </p>
               <div className="pt-2 space-y-2">
                  <div className="flex justify-between items-center bg-slate-50 p-2 rounded border border-slate-100">
                     <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">CapEx Invoices</span>
                     <Badge className="bg-emerald-100 text-emerald-700 text-[9px] font-black uppercase border-0">Auto-Capitalize</Badge>
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 p-2 rounded border border-slate-100">
                     <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">OpEx Invoices</span>
                     <Badge className="bg-blue-100 text-blue-700 text-[9px] font-black uppercase border-0">Expense Ledger</Badge>
                  </div>
               </div>
            </div>

            <div className="bg-slate-900 rounded-xl p-5 shadow-xl text-white relative overflow-hidden">
               <div className="absolute -right-2 -bottom-2 opacity-5">
                  <DollarSign className="h-24 w-24" />
               </div>
               <div className="relative z-10 space-y-4">
                  <div>
                     <h4 className="text-xl font-black tracking-tight leading-none mb-1 uppercase tracking-tighter">Total Asset Value</h4>
                     <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Updated via Invoices</p>
                  </div>
                  <p className="text-3xl font-black text-white tracking-tighter uppercase leading-none">Rp 1.48T</p>
                  <div className="pt-2 border-t border-white/10 flex items-center gap-2 text-emerald-400">
                     <TrendingUp className="h-4 w-4" />
                     <span className="text-[10px] font-black uppercase tracking-widest">+4.2% This Quarter</span>
                  </div>
               </div>
            </div>
         </div>

         {/* ALLOCATION TABLE */}
         <div className="lg:col-span-3">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
               <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                  <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                     <History className="h-3 w-3" /> Allocation History
                  </h3>
                  <div className="flex gap-2">
                     <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-300" />
                        <input placeholder="Search asset or invoice..." className="pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded text-[10px] font-bold w-56 focus:outline-none focus:ring-1 focus:ring-blue-500/20 shadow-sm" />
                     </div>
                     <Button variant="outline" size="sm" className="h-8 text-[10px] font-black border-slate-200 gap-1.5 shadow-sm"><Download className="h-3 w-3" /> Export Ledger</Button>
                  </div>
               </div>
               <Table>
                  <TableHeader className="bg-slate-50/50">
                     <TableRow className="hover:bg-transparent">
                        <TableHead className="text-[10px] font-black uppercase text-slate-500 py-4 px-6">Asset Identification</TableHead>
                        <TableHead className="text-[10px] font-black uppercase text-slate-500">Invoice Ref</TableHead>
                        <TableHead className="text-[10px] font-black uppercase text-slate-500">Cost Type</TableHead>
                        <TableHead className="text-[10px] font-black uppercase text-slate-500 text-right">Amount</TableHead>
                        <TableHead className="text-[10px] font-black uppercase text-slate-500 text-center">Module</TableHead>
                        <TableHead className="text-[10px] font-black uppercase text-slate-500 text-right pr-6">Date</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {mockAllocations.map((alloc, i) => (
                        <TableRow key={i} className="hover:bg-slate-50/50 border-slate-100 transition-colors group">
                           <TableCell className="py-4 px-6">
                              <div className="flex flex-col">
                                 <span className="font-black text-slate-900 tracking-tight text-sm uppercase">{alloc.assetId}</span>
                                 <span className="text-[11px] font-bold text-slate-500 line-clamp-1">{alloc.assetName}</span>
                              </div>
                           </TableCell>
                           <TableCell>
                              <span className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer">{alloc.invoiceNo}</span>
                           </TableCell>
                           <TableCell>
                              <Badge variant="outline" className={cn("text-[9px] uppercase font-black tracking-widest border-0 shadow-none", 
                                 alloc.costType === 'Acquisition' ? "bg-emerald-50 text-emerald-700" : 
                                 alloc.costType === 'Installation' ? "bg-blue-50 text-blue-700" : "bg-orange-50 text-orange-700"
                              )}>
                                 {alloc.costType}
                              </Badge>
                           </TableCell>
                           <TableCell className="text-right font-mono">
                              <span className="text-xs font-black text-slate-900 tracking-tighter uppercase leading-none">Rp {alloc.amount.toLocaleString()}</span>
                           </TableCell>
                           <TableCell className="text-center">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{alloc.module}</span>
                           </TableCell>
                           <TableCell className="text-right pr-6">
                              <span className="text-[10px] font-mono text-slate-400 font-bold italic">{alloc.date}</span>
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </div>
         </div>
      </div>
    </div>
  );
}
