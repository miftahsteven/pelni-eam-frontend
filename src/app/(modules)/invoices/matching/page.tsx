"use client";

import React, { useState } from "react";
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
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  History,
  FileText,
  Search,
  Eye,
  Filter,
  ArrowRight,
  Info
} from "lucide-react";
import Link from "next/link";
import { invoices, matchingCheckpoints } from "../invoice-data";
import { cn } from "@/lib/utils";

export default function InvoiceMatchingPage() {
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(invoices[3].id); // Default to Mismatch one

  const selectedInvoice = invoices.find(i => i.id === selectedInvoiceId);
  const checkpoints = selectedInvoice ? matchingCheckpoints[selectedInvoice.id] || [] : [];

  return (
    <div className="space-y-6 pb-12">
      <ModuleHeader
        title="Invoice Matching Workbench"
        description="Pencocokan 2-way, 3-way, dan 4-way antara tagihan vendor dan dokumen operasional."
        showBack
        backUrl="/invoices"
        icon={<ShieldCheck className="h-4 w-4" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[700px]">
         {/* LEFT PANEL: WAITING MATCHING */}
         <div className="lg:col-span-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50">
               <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <FileText className="h-3 w-3" /> Queue List
               </h3>
            </div>
            <div className="p-2 border-b border-slate-100">
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-300" />
                  <input placeholder="Search queue..." className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border-slate-200 rounded text-[10px] font-bold focus:outline-none focus:ring-1 focus:ring-blue-500/20" />
               </div>
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
               {invoices.map((inv) => (
                  <div 
                    key={inv.id} 
                    onClick={() => setSelectedInvoiceId(inv.id)}
                    className={cn(
                       "p-4 cursor-pointer transition-colors hover:bg-slate-50",
                       selectedInvoiceId === inv.id ? "bg-blue-50/50 border-l-4 border-l-blue-600" : ""
                    )}
                  >
                     <div className="flex justify-between items-start mb-1">
                        <span className="text-[10px] font-black text-slate-900 tracking-tight uppercase">{inv.invoiceNo}</span>
                        <Badge className={cn("text-[8px] uppercase px-1 border-0 shadow-none font-black", 
                           inv.matchingStatus === 'Matched' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                        )}>{inv.matchingStatus}</Badge>
                     </div>
                     <p className="text-[11px] font-bold text-slate-500 line-clamp-1">{inv.vendorName}</p>
                     <p className="text-[9px] text-slate-400 font-mono mt-1 italic">{inv.sourceDocNo}</p>
                  </div>
               ))}
            </div>
         </div>

         {/* RIGHT PANEL: MATCHING DETAIL */}
         <div className="lg:col-span-3 space-y-6 overflow-y-auto pr-1">
            {selectedInvoice ? (
               <div className="space-y-6">
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex justify-between items-center bg-gradient-to-r from-white to-slate-50/50">
                     <div className="flex gap-4 items-center">
                        <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center", 
                           selectedInvoice.matchingStatus === 'Matched' ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"
                        )}>
                           {selectedInvoice.matchingStatus === 'Matched' ? <CheckCircle2 className="h-6 w-6" /> : <AlertTriangle className="h-6 w-6" />}
                        </div>
                        <div>
                           <h2 className="text-xl font-black text-slate-900 tracking-tight leading-none mb-1">{selectedInvoice.invoiceNo}</h2>
                           <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{selectedInvoice.vendorName}</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Matching Status</p>
                        <Badge className={cn("text-xs font-black uppercase px-3 py-1 mt-1 border-0 shadow-none", 
                           selectedInvoice.matchingStatus === 'Matched' ? "bg-emerald-600 text-white" : "bg-red-600 text-white animate-pulse"
                        )}>{selectedInvoice.matchingStatus}</Badge>
                     </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                     <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/30 flex justify-between items-center">
                        <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Comparison Checkpoints (4-Way)</h4>
                        <Button variant="ghost" size="sm" className="h-7 text-[10px] font-black uppercase text-blue-600 gap-1.5" render={
                           <Link href={`/invoices/${selectedInvoice.id}`}>View Invoice Detail <ArrowRight className="h-3 w-3" /></Link>
                        } />
                     </div>
                     <Table>
                        <TableHeader>
                           <TableRow className="hover:bg-transparent bg-slate-50/20">
                              <TableHead className="text-[10px] font-black uppercase text-slate-400 py-4">Checkpoint</TableHead>
                              <TableHead className="text-[10px] font-black uppercase text-slate-400">Source System Value</TableHead>
                              <TableHead className="text-[10px] font-black uppercase text-slate-400">Invoice Value</TableHead>
                              <TableHead className="text-[10px] font-black uppercase text-slate-400 text-center">Result</TableHead>
                              <TableHead className="text-[10px] font-black uppercase text-slate-400">Notes</TableHead>
                           </TableRow>
                        </TableHeader>
                        <TableBody>
                           {checkpoints.length > 0 ? checkpoints.map((cp) => (
                              <TableRow key={cp.id} className="text-xs font-medium border-slate-100 transition-colors">
                                 <TableCell className="font-black text-slate-700 py-4">{cp.checkpoint}</TableCell>
                                 <TableCell className="text-slate-500 font-mono tracking-tight">{typeof cp.sourceValue === 'number' ? cp.sourceValue.toLocaleString() : cp.sourceValue}</TableCell>
                                 <TableCell className={cn("font-black text-slate-900", cp.result === 'Mismatch' ? "text-red-600 underline decoration-2 underline-offset-4" : "")}>
                                    {typeof cp.invoiceValue === 'number' ? cp.invoiceValue.toLocaleString() : cp.invoiceValue}
                                 </TableCell>
                                 <TableCell className="text-center">
                                    <div className={cn("inline-flex items-center justify-center h-6 w-6 rounded-full", 
                                       cp.result === 'Match' ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"
                                    )}>
                                       {cp.result === 'Match' ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                                    </div>
                                 </TableCell>
                                 <TableCell className="max-w-[200px]">
                                    <p className="text-[10px] text-slate-500 italic leading-relaxed">{cp.notes || '-'}</p>
                                 </TableCell>
                              </TableRow>
                           )) : (
                              <TableRow>
                                 <td colSpan={5} className="py-12 text-center">
                                    <p className="text-sm font-black text-slate-300 uppercase italic tracking-widest">No matching data available for this document</p>
                                 </td>
                              </TableRow>
                           )}
                        </TableBody>
                     </Table>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-4">
                        <div className="flex items-center gap-2 mb-2 border-b border-slate-100 pb-2">
                           <Info className="h-4 w-4 text-blue-600" />
                           <h4 className="text-[10px] font-black uppercase text-slate-800 tracking-widest">Mismatch Resolution Action</h4>
                        </div>
                        <div className="space-y-3">
                           <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                              Sistem mendeteksi perbedaan data yang menghalangi proses approval otomatis. Silakan pilih tindakan resolusi:
                           </p>
                           <div className="grid grid-cols-2 gap-2">
                              <Button className="h-9 bg-slate-900 hover:bg-slate-800 text-[10px] font-black uppercase tracking-wider">Request Revision</Button>
                              <Button variant="outline" className="h-9 border-slate-200 text-[10px] font-black uppercase tracking-wider">Force Match</Button>
                           </div>
                        </div>
                     </div>
                     <div className="flex flex-col gap-3">
                        <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 shadow-xl h-full font-black text-sm uppercase tracking-wider gap-2 py-4" disabled={selectedInvoice.matchingStatus !== 'Matched'}>
                           <ShieldCheck className="h-5 w-5" /> Confirm Match & Approve
                        </Button>
                        <Button variant="outline" className="h-12 border-slate-200 font-black text-xs uppercase tracking-wider gap-2 text-red-600 bg-white">
                           <AlertTriangle className="h-4 w-4" /> Reject Invoice (Hold)
                        </Button>
                     </div>
                  </div>
               </div>
            ) : (
               <div className="h-full flex flex-col items-center justify-center text-slate-300 bg-slate-50/50 rounded-xl border-2 border-dashed border-slate-200">
                  <Search className="h-16 w-16 mb-4 opacity-10" />
                  <p className="text-xl font-black uppercase tracking-widest opacity-20 italic">Select an invoice from the queue</p>
               </div>
            )}
         </div>
      </div>
    </div>
  );
}
