"use client";

import React, { useState } from "react";
import { ModuleHeader } from "@/components/module-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Save, 
  Send, 
  Trash2, 
  FileText, 
  Search, 
  Plus, 
  Box, 
  AlertCircle,
  CreditCard,
  UploadCloud,
  ChevronDown,
  Info,
  Calendar,
  Building2,
  DollarSign
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { InvoiceType } from "../invoice-data";
import { cn } from "@/lib/utils";

const mockVendors = [
  { id: 'VEN-001', name: 'PT Samudera Teknik Nusantara' },
  { id: 'VEN-002', name: 'PT Bahari Maintenance Indonesia' },
  { id: 'VEN-003', name: 'PT Elektrika Kapal Mandiri' },
];

const mockSourceDocs = [
  { no: 'PO-EAM-2026-0004', type: 'PO', amount: 2025750000 },
  { no: 'PO-EAM-2026-0009', type: 'PO', amount: 680000000 },
  { no: 'WO-MNT-2026-014', type: 'WO', amount: 420000000 },
];

export default function CreateInvoicePage() {
  const router = useRouter();
  const [invoiceType, setInvoiceType] = useState<InvoiceType>("Procurement");
  const [selectedVendor, setSelectedVendor] = useState("");
  const [selectedSourceDoc, setSelectedSourceDoc] = useState("");

  return (
    <div className="space-y-6 pb-12">
      <ModuleHeader
        title="Create New Vendor Invoice"
        description="Input tagihan vendor dan hubungkan dengan dokumen sumber pengadaan atau pemeliharaan."
        showBack
        backUrl="/invoices"
        icon={<CreditCard className="h-4 w-4" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN: MAIN FORM */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* SECTION 1: GENERAL INFO */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
               <h3 className="text-sm font-black text-slate-800 tracking-tight flex items-center gap-2 uppercase">
                 <Info className="h-4 w-4 text-blue-600" /> General Information
               </h3>
            </div>
            <div className="p-6 space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Invoice Number <span className="text-red-500">*</span></label>
                     <input placeholder="E.g. INV/STN/2026/001" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold placeholder:font-normal placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Invoice Type <span className="text-red-500">*</span></label>
                     <select 
                       value={invoiceType} 
                       onChange={(e) => setInvoiceType(e.target.value as InvoiceType)}
                       className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                     >
                        <option value="Procurement">Procurement</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Installation">Installation</option>
                        <option value="Replacement">Replacement</option>
                        <option value="Disposal">Disposal</option>
                     </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Vendor <span className="text-red-500">*</span></label>
                     <select 
                       value={selectedVendor} 
                       onChange={(e) => setSelectedVendor(e.target.value)}
                       className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                     >
                        <option value="">Select Vendor</option>
                        {mockVendors.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                     </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Invoice Date</label>
                        <div className="relative">
                           <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                           <input type="date" className="w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Due Date</label>
                        <div className="relative">
                           <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                           <input type="date" className="w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-red-600" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* SECTION 2: SOURCE REFERENCE & MATCHING */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
               <h3 className="text-sm font-black text-slate-800 tracking-tight flex items-center gap-2 uppercase">
                 <Link href="#" className="flex items-center gap-2"><Plus className="h-4 w-4 text-emerald-600" /> Reference Documents</Link>
               </h3>
               <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100 text-[10px] font-black">4-Way Matching Enabled</Badge>
            </div>
            <div className="p-6 space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Source Document No <span className="text-red-500">*</span></label>
                     <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <select 
                          value={selectedSourceDoc} 
                          onChange={(e) => setSelectedSourceDoc(e.target.value)}
                          className="w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        >
                           <option value="">Search PO / WO / DO...</option>
                           {mockSourceDocs.map(doc => <option key={doc.no} value={doc.no}>{doc.no} ({doc.type})</option>)}
                        </select>
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">WBS Pembebanan</label>
                     <input disabled value={selectedSourceDoc ? "WBS-NAV-2026-001" : "-"} className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm font-bold text-slate-500" />
                  </div>
               </div>

               {selectedSourceDoc && (
                  <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-4 animate-in fade-in slide-in-from-top-2 duration-300">
                     <div className="flex justify-between items-start mb-4">
                        <div className="flex gap-3">
                           <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                              <FileText className="h-5 w-5" />
                           </div>
                           <div>
                              <p className="text-xs font-black text-blue-900 tracking-tight uppercase">PO Verified</p>
                              <p className="text-lg font-black text-slate-900 tracking-tighter">Rp 2.025.750.000</p>
                           </div>
                        </div>
                        <Badge className="bg-blue-600 text-white font-black text-[9px] uppercase tracking-widest">Matched with DO</Badge>
                     </div>
                     <div className="text-[10px] text-blue-700 font-medium leading-relaxed italic">
                        * Data baris item akan ditarik secara otomatis dari Purchase Order yang dipilih. Anda hanya perlu memverifikasi kuantitas yang ditagihkan.
                     </div>
                  </div>
               )}

               <div className="space-y-4">
                  <div className="flex justify-between items-center">
                     <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Line Item Details</h4>
                     <Button variant="outline" size="sm" className="h-8 text-[10px] font-black gap-2 border-slate-200 shadow-sm">
                        <Plus className="h-3 w-3" /> Add Item
                     </Button>
                  </div>
                  <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                     <table className="w-full text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200">
                           <tr className="text-[10px] font-black uppercase text-slate-500 text-left tracking-widest">
                              <th className="px-4 py-3">Item</th>
                              <th className="px-4 py-3">PO Qty</th>
                              <th className="px-4 py-3">Inv Qty</th>
                              <th className="px-4 py-3">Price</th>
                              <th className="px-4 py-3 text-right">Total</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                           {selectedSourceDoc ? (
                              <tr>
                                 <td className="px-4 py-3">
                                    <p className="font-bold text-slate-900">Radar Navigation Unit</p>
                                    <p className="text-[10px] text-slate-400 font-mono italic uppercase">AST-NAV-001</p>
                                 </td>
                                 <td className="px-4 py-3 font-bold text-slate-500">2</td>
                                 <td className="px-4 py-3">
                                    <input defaultValue="2" className="w-16 px-2 py-1 bg-white border border-slate-200 rounded text-xs font-black text-center" />
                                 </td>
                                 <td className="px-4 py-3 font-bold text-slate-900">850.000.000</td>
                                 <td className="px-4 py-3 font-black text-slate-900 text-right uppercase tracking-tighter">1.700.000.000</td>
                              </tr>
                           ) : (
                              <tr>
                                 <td colSpan={5} className="px-4 py-12 text-center text-slate-300 font-black uppercase text-xs tracking-widest opacity-50 italic">
                                    No source document selected
                                 </td>
                              </tr>
                           )}
                        </tbody>
                        {selectedSourceDoc && (
                           <tfoot className="bg-slate-50 font-black text-slate-900 text-xs">
                              <tr className="border-t border-slate-200">
                                 <td colSpan={4} className="px-4 py-3 text-right uppercase tracking-widest text-slate-500">Subtotal</td>
                                 <td className="px-4 py-3 text-right">1.700.000.000</td>
                              </tr>
                              <tr>
                                 <td colSpan={4} className="px-4 py-3 text-right uppercase tracking-widest text-slate-500">PPN (11%)</td>
                                 <td className="px-4 py-3 text-right text-blue-600">187.000.000</td>
                              </tr>
                              <tr className="bg-slate-900 text-white text-sm">
                                 <td colSpan={4} className="px-4 py-4 text-right uppercase tracking-widest text-slate-400">Total Invoice</td>
                                 <td className="px-4 py-4 text-right text-lg">Rp 1.887.000.000</td>
                              </tr>
                           </tfoot>
                        )}
                     </table>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: EVIDENCE & ACTIONS */}
        <div className="space-y-6">
           <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-slate-800 p-4 border-b border-slate-900">
                 <h3 className="text-sm font-black text-white tracking-tight flex items-center gap-2">
                   <UploadCloud className="h-4 w-4 text-blue-400" /> Evidence Upload
                 </h3>
              </div>
              <div className="p-6 space-y-4">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Invoice PDF (Vendor) <span className="text-red-500">*</span></label>
                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 hover:border-blue-400 transition-all group cursor-pointer">
                       <UploadCloud className="h-8 w-8 text-slate-300 group-hover:text-blue-500 mb-2" />
                       <span className="text-[10px] font-black text-slate-500 group-hover:text-blue-700 uppercase tracking-widest">Upload Invoice</span>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Faktur Pajak <span className="text-red-500">*</span></label>
                    <div className="border border-slate-200 rounded-lg p-3 flex items-center justify-between bg-white shadow-sm">
                       <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-slate-400" />
                          <span className="text-xs font-bold text-slate-600">Select file...</span>
                       </div>
                       <Button size="icon" variant="ghost" className="h-7 w-7 text-slate-300 hover:text-blue-600"><Plus className="h-4 w-4" /></Button>
                    </div>
                 </div>
                 <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                    <Button className="w-full bg-slate-900 hover:bg-slate-800 shadow-xl h-12 font-black gap-2 text-sm uppercase tracking-wider group">
                       <Send className="h-4 w-4 text-blue-400 group-hover:scale-110 transition-transform" /> Submit to Verification
                    </Button>
                    <div className="flex gap-2">
                       <Button variant="outline" className="flex-1 border-slate-200 h-10 font-black text-xs gap-2 shadow-sm text-slate-600">
                          <Save className="h-4 w-4 text-slate-400" /> Save Draft
                       </Button>
                       <Button variant="outline" className="flex-1 border-slate-200 h-10 font-black text-xs gap-2 shadow-sm text-red-600 hover:bg-red-50" render={
                          <Link href="/invoices">Cancel</Link>
                       } />
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex gap-4 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                 <AlertCircle className="h-16 w-16" />
              </div>
              <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                 <DollarSign className="h-5 w-5" />
              </div>
              <div className="space-y-1 relative z-10">
                 <h4 className="text-xs font-black text-amber-900 tracking-tight uppercase">Cost Allocation Info</h4>
                 <p className="text-[11px] text-amber-700 leading-relaxed font-medium italic">
                    Biaya dari invoice ini akan dialokasikan sebagai <span className="font-black underline">Acquisition Cost</span> untuk aset yang terdaftar dalam Purchase Order terkait.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
