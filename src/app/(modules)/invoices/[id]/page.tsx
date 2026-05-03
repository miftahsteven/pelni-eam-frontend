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
  Printer, 
  FileText, 
  CheckCircle2, 
  Clock, 
  History, 
  Paperclip, 
  CreditCard,
  ShieldCheck,
  AlertTriangle,
  Download,
  Info,
  DollarSign,
  TrendingUp,
  Search,
  Building2,
  Box,
  User,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { invoices, lineItems, matchingCheckpoints, InvoiceStatus } from "../invoice-data";
import { cn } from "@/lib/utils";

export default function InvoiceDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [activeTab, setActiveTab] = useState("general");

  const inv = invoices.find(i => i.id === id) || invoices[0];

  const getStatusStyle = (status: InvoiceStatus) => {
    const styles: Record<string, string> = {
      'Draft': 'bg-slate-100 text-slate-600 border-slate-200',
      'Submitted': 'bg-blue-50 text-blue-700 border-blue-200',
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
        title={`Invoice ${inv.invoiceNo}`}
        description="Detail tagihan vendor dan status verifikasi finansial."
        showBack
        backUrl="/invoices/list"
      >
        <div className="flex gap-2">
           <Button variant="outline" className="gap-2 border-slate-200 shadow-sm">
              <Printer className="h-4 w-4" /> Print Voucher
           </Button>
           <Button variant="outline" className="gap-2 border-slate-200 shadow-sm text-blue-600">
              <Download className="h-4 w-4" /> Download PDF
           </Button>
           {inv.status === 'Waiting Approval' && (
              <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700 shadow-lg">
                <ShieldCheck className="h-4 w-4" /> Approve Invoice
              </Button>
           )}
        </div>
      </ModuleHeader>

      {/* HEADER SUMMARY SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         <Card className="rounded-xl border-slate-200 shadow-sm bg-white overflow-hidden">
            <div className="p-4 flex items-center gap-4">
               <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <CreditCard className="h-5 w-5" />
               </div>
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Amount</p>
                  <p className="text-lg font-black text-slate-900 tracking-tight uppercase">Rp {inv.totalAmount.toLocaleString()}</p>
               </div>
            </div>
         </Card>
         <Card className="rounded-xl border-slate-200 shadow-sm bg-white overflow-hidden">
            <div className="p-4 flex items-center gap-4">
               <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <Building2 className="h-5 w-5" />
               </div>
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Vendor</p>
                  <p className="text-xs font-bold text-slate-700 line-clamp-1">{inv.vendorName}</p>
               </div>
            </div>
         </Card>
         <Card className="rounded-xl border-slate-200 shadow-sm bg-white overflow-hidden">
            <div className="p-4 flex items-center gap-4">
               <div className="h-10 w-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                  <Clock className="h-5 w-5" />
               </div>
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Due Date</p>
                  <p className={cn("text-xs font-black uppercase tracking-widest", 
                     new Date(inv.dueDate) < new Date() ? "text-red-600" : "text-slate-700"
                  )}>{inv.dueDate}</p>
               </div>
            </div>
         </Card>
         <Card className="rounded-xl border-slate-200 shadow-sm bg-white overflow-hidden">
            <div className="p-4 flex items-center gap-4">
               <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center">
                  <Badge variant="outline" className={cn("text-[9px] uppercase font-black tracking-widest", getStatusStyle(inv.status))}>
                     {inv.status}
                  </Badge>
               </div>
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Workflow Status</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase italic">Matching Passed</p>
               </div>
            </div>
         </Card>
      </div>

      {/* MAIN TABBED CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
               <TabsList className="bg-white border border-slate-200 w-full justify-start h-12 px-2 overflow-x-auto rounded-xl">
                  <TabsTrigger value="general" className="data-[state=active]:bg-slate-100 data-[state=active]:text-blue-700 text-xs font-bold gap-2">
                     <Info className="h-3.5 w-3.5" /> General
                  </TabsTrigger>
                  <TabsTrigger value="items" className="data-[state=active]:bg-slate-100 data-[state=active]:text-blue-700 text-xs font-bold gap-2">
                     <Box className="h-3.5 w-3.5" /> Line Items
                  </TabsTrigger>
                  <TabsTrigger value="matching" className="data-[state=active]:bg-slate-100 data-[state=active]:text-blue-700 text-xs font-bold gap-2">
                     <ShieldCheck className="h-3.5 w-3.5" /> Matching
                  </TabsTrigger>
                  <TabsTrigger value="verification" className="data-[state=active]:bg-slate-100 data-[state=active]:text-blue-700 text-xs font-bold gap-2">
                     <User className="h-3.5 w-3.5" /> Verification
                  </TabsTrigger>
                  <TabsTrigger value="allocation" className="data-[state=active]:bg-slate-100 data-[state=active]:text-blue-700 text-xs font-bold gap-2">
                     <TrendingUp className="h-3.5 w-3.5" /> Cost Allocation
                  </TabsTrigger>
                  <TabsTrigger value="attachments" className="data-[state=active]:bg-slate-100 data-[state=active]:text-blue-700 text-xs font-bold gap-2">
                     <Paperclip className="h-3.5 w-3.5" /> Attachments
                  </TabsTrigger>
               </TabsList>

               <div className="mt-6">
                  <TabsContent value="general" className="m-0 space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="rounded-xl border-slate-200 shadow-sm bg-white overflow-hidden">
                           <div className="bg-slate-50 px-4 py-2 border-b border-slate-100">
                              <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Invoice References</h4>
                           </div>
                           <CardContent className="p-4 space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                 <div className="space-y-1">
                                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Source Doc Type</span>
                                    <p className="text-xs font-bold text-slate-800">{inv.sourceDocType}</p>
                                 </div>
                                 <div className="space-y-1">
                                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Source Doc No</span>
                                    <p className="text-xs font-black text-blue-600 hover:underline cursor-pointer">{inv.sourceDocNo}</p>
                                 </div>
                                 <div className="space-y-1">
                                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">WBS Code</span>
                                    <p className="text-xs font-bold text-slate-800">{inv.wbsCode}</p>
                                 </div>
                                 <div className="space-y-1">
                                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Cost Center</span>
                                    <p className="text-xs font-bold text-slate-800">{inv.costCenter}</p>
                                 </div>
                              </div>
                           </CardContent>
                        </Card>
                        <Card className="rounded-xl border-slate-200 shadow-sm bg-white overflow-hidden">
                           <div className="bg-slate-50 px-4 py-2 border-b border-slate-100">
                              <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Payment Terms</h4>
                           </div>
                           <CardContent className="p-4 space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                 <div className="space-y-1">
                                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Payment Term</span>
                                    <p className="text-xs font-bold text-slate-800">{inv.paymentTerm}</p>
                                 </div>
                                 <div className="space-y-1">
                                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Currency</span>
                                    <p className="text-xs font-bold text-slate-800">{inv.currency}</p>
                                 </div>
                              </div>
                              <div className="pt-2">
                                 <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">Bank Account</span>
                                 <div className="p-3 bg-slate-50 rounded border border-slate-100 font-mono text-xs text-slate-700">
                                    BNI 1234567890 (PT Samudera Teknik Nusantara)
                                 </div>
                              </div>
                           </CardContent>
                        </Card>
                     </div>
                  </TabsContent>

                  <TabsContent value="items" className="m-0">
                     <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <Table>
                           <TableHeader className="bg-slate-50 border-b border-slate-200">
                              <TableRow className="hover:bg-transparent">
                                 <TableHead className="text-[10px] font-black uppercase text-slate-500">Item Detail</TableHead>
                                 <TableHead className="text-[10px] font-black uppercase text-slate-500 text-center">Source Qty</TableHead>
                                 <TableHead className="text-[10px] font-black uppercase text-slate-500 text-center">Inv Qty</TableHead>
                                 <TableHead className="text-[10px] font-black uppercase text-slate-500 text-right">Unit Price</TableHead>
                                 <TableHead className="text-[10px] font-black uppercase text-slate-500 text-right">Tax</TableHead>
                                 <TableHead className="text-[10px] font-black uppercase text-slate-500 text-right">Total</TableHead>
                              </TableRow>
                           </TableHeader>
                           <TableBody>
                              {(lineItems[inv.id] || []).map((item) => (
                                 <TableRow key={item.id} className="text-xs hover:bg-slate-50/50">
                                    <TableCell>
                                       <div className="flex flex-col">
                                          <span className="font-bold text-slate-900">{item.description}</span>
                                          <span className="text-[10px] font-mono text-slate-400 uppercase">{item.itemCode}</span>
                                       </div>
                                    </TableCell>
                                    <TableCell className="text-center font-bold text-slate-500">{item.sourceQty}</TableCell>
                                    <TableCell className="text-center font-black text-slate-900">{item.invoiceQty}</TableCell>
                                    <TableCell className="text-right font-medium text-slate-700">{item.unitPrice.toLocaleString()}</TableCell>
                                    <TableCell className="text-right font-medium text-blue-600">{item.tax.toLocaleString()}</TableCell>
                                    <TableCell className="text-right font-black text-slate-900">{item.total.toLocaleString()}</TableCell>
                                 </TableRow>
                              ))}
                           </TableBody>
                        </Table>
                     </div>
                  </TabsContent>

                  <TabsContent value="matching" className="m-0">
                     <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-4 bg-emerald-50 border-b border-emerald-100 flex items-center gap-3">
                           <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                           <h4 className="text-sm font-black text-emerald-900 tracking-tight uppercase">4-Way Matching Successfully Passed</h4>
                        </div>
                        <Table>
                           <TableHeader className="bg-slate-50">
                              <TableRow>
                                 <TableHead className="text-[10px] uppercase font-bold text-slate-500">Checkpoint</TableHead>
                                 <TableHead className="text-[10px] uppercase font-bold text-slate-500">Source (PO/DO)</TableHead>
                                 <TableHead className="text-[10px] uppercase font-bold text-slate-500">Invoice Value</TableHead>
                                 <TableHead className="text-[10px] uppercase font-bold text-slate-500 text-center">Result</TableHead>
                              </TableRow>
                           </TableHeader>
                           <TableBody>
                              {(matchingCheckpoints[inv.id] || []).map((cp) => (
                                 <TableRow key={cp.id} className="text-xs">
                                    <TableCell className="font-bold text-slate-700">{cp.checkpoint}</TableCell>
                                    <TableCell className="font-medium text-slate-500 italic">{typeof cp.sourceValue === 'number' ? cp.sourceValue.toLocaleString() : cp.sourceValue}</TableCell>
                                    <TableCell className="font-black text-slate-900">{typeof cp.invoiceValue === 'number' ? cp.invoiceValue.toLocaleString() : cp.invoiceValue}</TableCell>
                                    <TableCell className="text-center">
                                       <Badge className={cn(
                                          "text-[9px] uppercase font-black px-2 py-0.5 border-0 shadow-none",
                                          cp.result === 'Match' ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                                       )}>{cp.result}</Badge>
                                    </TableCell>
                                 </TableRow>
                              ))}
                           </TableBody>
                        </Table>
                     </div>
                  </TabsContent>
               </div>
            </Tabs>
         </div>

         {/* RIGHT SIDEBAR: TIMELINE & STATUS */}
         <div className="space-y-6">
            <Card className="rounded-xl border-slate-200 shadow-sm bg-white overflow-hidden">
               <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                  <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                     <ShieldCheck className="h-3 w-3" /> Approval Trail
                  </h3>
               </div>
               <div className="p-4 space-y-4">
                  {[
                     { role: 'Chief Engineer', name: 'Agus P.', date: '2026-05-08', status: 'Approved', icon: CheckCircle2, color: 'text-emerald-500' },
                     { role: 'Procurement Mgr', name: 'Linda W.', date: '2026-05-09', status: 'Approved', icon: CheckCircle2, color: 'text-emerald-500' },
                     { role: 'Finance Verifier', name: 'Bambang S.', date: '-', status: 'Pending', icon: Clock, color: 'text-blue-500' },
                     { role: 'Asset Manager', name: 'Ratna Sari', date: '-', status: 'Waiting', icon: Clock, color: 'text-slate-300' },
                  ].map((step, i) => (
                     <div key={i} className="flex gap-3 relative">
                        {i < 3 && <div className="absolute top-6 left-2.5 bottom-0 w-px bg-slate-100"></div>}
                        <div className={cn("h-5 w-5 rounded-full bg-white border-2 flex items-center justify-center z-10 shrink-0 mt-0.5", step.color.replace('text', 'border'))}>
                           <step.icon className={cn("h-3 w-3", step.color)} />
                        </div>
                        <div className="flex flex-col gap-0.5">
                           <span className="text-[10px] font-black text-slate-900 uppercase tracking-tight leading-none">{step.role}</span>
                           <span className="text-[10px] font-bold text-slate-500">{step.name}</span>
                           {step.date !== '-' && <span className="text-[9px] text-slate-400 font-mono italic">{step.date}</span>}
                        </div>
                     </div>
                  ))}
               </div>
            </Card>

            <div className="rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 p-5 shadow-xl text-white relative overflow-hidden group hover:scale-[1.02] transition-all cursor-pointer">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                  <DollarSign className="h-24 w-24" />
               </div>
               <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-200 mb-1">Financial Link</h4>
               <p className="text-lg font-black text-white leading-tight">Asset Cost Allocation</p>
               <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                  <div className="flex justify-between items-center text-[11px] font-bold">
                     <span className="text-blue-200">Allocated to Asset</span>
                     <span className="bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded text-[9px]">COMPLETED</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="h-8 w-8 rounded bg-white/10 flex items-center justify-center text-white/40 font-mono text-[10px]">AST</div>
                     <div>
                        <p className="text-[10px] font-black tracking-tight">AST-PELNI-000231</p>
                        <p className="text-[9px] text-blue-200">Radar Nav KM Kelud</p>
                     </div>
                  </div>
                  <Button size="sm" className="w-full bg-white/10 hover:bg-white/20 border-white/20 text-white text-[9px] font-black h-8 mt-2">
                     VIEW ALLOCATION DETAILS <ArrowRight className="h-3 w-3 ml-2" />
                  </Button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
