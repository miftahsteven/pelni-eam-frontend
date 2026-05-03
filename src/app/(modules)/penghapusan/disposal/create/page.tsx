"use client";

import React, { useState } from "react";
import { ModuleHeader } from "@/components/module-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/eam-checkbox";
import { 
  Save, 
  Send, 
  Trash2, 
  Box, 
  Search,
  FileText,
  AlertTriangle,
  MapPin,
  Wrench,
  PackageSearch,
  UploadCloud,
  ChevronDown,
  Info,
  CheckCircle2,
  DollarSign,
  History
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DisposalType } from "../disposal-data";
import { cn } from "@/lib/utils";

const mockAssets = [
  { code: 'AST-NAV-00021', name: 'Radar Navigasi Lama', category: 'Navigation Equipment', location: 'KM Kelud', status: 'Pending Disposal' },
  { code: 'AST-MCH-00102', name: 'Pompa Air Mesin', category: 'Machinery', location: 'Surabaya', status: 'In Maintenance' },
  { code: 'AST-IT-0087', name: 'Server Rack Module', category: 'IT Equipment', location: 'Jakarta', status: 'Replaced' },
];

export default function CreateDisposalPage() {
  const router = useRouter();
  const [selectedAssetCode, setSelectedAssetCode] = useState<string>("");
  const [disposalType, setDisposalType] = useState<DisposalType>("Scrap");
  const [needDismantle, setNeedDismantle] = useState(false);

  const selectedAsset = mockAssets.find(a => a.code === selectedAssetCode);

  return (
    <div className="space-y-6 pb-12">
      <ModuleHeader
        title="Create Disposal Request"
        description="Ajukan penghapusan aset dari sistem EAM Pelni."
        showBack
        backUrl="/penghapusan/disposal"
        icon={<Trash2 className="h-4 w-4" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          
          {/* SECTION 1: ASSET SELECTION */}
          <Card className="rounded-xl border-slate-200 shadow-sm overflow-hidden bg-white">
            <div className="bg-slate-50 border-b border-slate-200 px-4 py-3">
               <h3 className="text-sm font-black text-slate-800 tracking-tight flex items-center gap-2">
                 <Box className="h-4 w-4 text-red-600" />
                 Target Asset Identification
               </h3>
            </div>
            <CardContent className="p-6 space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <Label className="text-xs font-bold text-slate-700">Request Date</Label>
                     <Input value={new Date().toISOString().split('T')[0]} disabled className="bg-slate-50 border-slate-200 text-xs" />
                  </div>
                  <div className="space-y-2">
                     <Label className="text-xs font-bold text-slate-700">Requester</Label>
                     <Input value="Agus Hermawan (Technical)" disabled className="bg-slate-50 border-slate-200 text-xs" />
                  </div>
               </div>

               <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-700">Select Asset <span className="text-red-500">*</span></Label>
                  <Select value={selectedAssetCode} onValueChange={(v) => v && setSelectedAssetCode(v)}>
                     <SelectTrigger className="border-slate-200 h-10">
                        <SelectValue placeholder="Search asset to dispose..." />
                     </SelectTrigger>
                     <SelectContent>
                        {mockAssets.map(asset => (
                           <SelectItem key={asset.code} value={asset.code}>
                              <span className="font-mono text-[10px] bg-slate-100 px-1 py-0.5 rounded mr-2">{asset.code}</span>
                              {asset.name}
                           </SelectItem>
                        ))}
                     </SelectContent>
                  </Select>
               </div>

               {selectedAsset && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                     <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Category</span>
                        <p className="text-xs font-bold text-slate-800">{selectedAsset.category}</p>
                     </div>
                     <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Location</span>
                        <p className="text-xs font-bold text-slate-800">{selectedAsset.location}</p>
                     </div>
                     <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Current Status</span>
                        <Badge variant="outline" className="text-[9px] bg-white border-blue-200 text-blue-700">{selectedAsset.status}</Badge>
                     </div>
                     <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Value (Book)</span>
                        <p className="text-xs font-bold text-slate-800">Rp 12.000.000</p>
                     </div>
                  </div>
               )}
            </CardContent>
          </Card>

          {/* SECTION 2: DISPOSAL DETAILS */}
          <Card className="rounded-xl border-slate-200 shadow-sm overflow-hidden bg-white">
            <div className="bg-slate-50 border-b border-slate-200 px-4 py-3">
               <h3 className="text-sm font-black text-slate-800 tracking-tight flex items-center gap-2">
                 <FileText className="h-4 w-4 text-red-600" />
                 Disposal Plan & Justification
               </h3>
            </div>
            <CardContent className="p-6 space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <Label className="text-xs font-bold text-slate-700">Disposal Type <span className="text-red-500">*</span></Label>
                     <Select value={disposalType} onValueChange={(v) => v && setDisposalType(v as DisposalType)}>
                        <SelectTrigger className="border-slate-200">
                           <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="Scrap">Scrap</SelectItem>
                           <SelectItem value="Sale">Sale</SelectItem>
                           <SelectItem value="Donation">Donation</SelectItem>
                           <SelectItem value="Write-off">Write-off</SelectItem>
                           <SelectItem value="Lost Asset">Lost Asset</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
                  <div className="space-y-2">
                     <Label className="text-xs font-bold text-slate-700">Proposed Disposal Date <span className="text-red-500">*</span></Label>
                     <Input type="date" className="border-slate-200 h-10 text-xs" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                     <Label className="text-xs font-bold text-slate-700">Disposal Reason <span className="text-red-500">*</span></Label>
                     <Textarea placeholder="Berikan alasan mendetail mengapa aset ini harus dihapus..." className="min-h-[100px] border-slate-200 bg-white text-xs resize-none" />
                  </div>
               </div>

               <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl space-y-4">
                  <div className="flex items-center gap-2">
                     <Checkbox id="dismantle" checked={needDismantle} onCheckedChange={(checked) => setNeedDismantle(checked as boolean)} className="border-orange-400 data-[state=checked]:bg-orange-500" />
                     <Label htmlFor="dismantle" className="text-xs font-bold text-orange-900 cursor-pointer">Aset memerlukan proses pembongkaran (Dismantle Task)</Label>
                  </div>
                  {needDismantle && (
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div className="space-y-1.5">
                           <Label className="text-[10px] font-black text-orange-700 uppercase">Dismantle Location</Label>
                           <Select defaultValue="workshop">
                              <SelectTrigger className="bg-white border-orange-200 h-9 text-xs">
                                 <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="workshop">Central Workshop</SelectItem>
                                 <SelectItem value="vendor">Vendor Facility</SelectItem>
                                 <SelectItem value="onsite">On-site (Vessel)</SelectItem>
                              </SelectContent>
                           </Select>
                        </div>
                        <div className="space-y-1.5">
                           <Label className="text-[10px] font-black text-orange-700 uppercase">Technician Team</Label>
                           <Input placeholder="Assign team..." className="h-9 bg-white border-orange-200 text-xs" />
                        </div>
                     </div>
                  )}
               </div>

               {disposalType === 'Sale' && (
                  <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="space-y-1.5">
                        <Label className="text-[10px] font-black text-blue-700 uppercase flex items-center gap-1"><DollarSign className="h-3 w-3" /> Estimated Selling Price</Label>
                        <Input placeholder="Rp 0" className="h-9 bg-white border-blue-200 text-xs font-bold" />
                     </div>
                     <div className="space-y-1.5">
                        <Label className="text-[10px] font-black text-blue-700 uppercase">Potential Buyer</Label>
                        <Input placeholder="Nama calon pembeli..." className="h-9 bg-white border-blue-200 text-xs" />
                     </div>
                  </div>
               )}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: CONTEXT & EVIDENCE */}
        <div className="space-y-6">
           <Card className="rounded-xl border-slate-200 shadow-sm overflow-hidden bg-white sticky top-6">
              <div className="bg-slate-800 px-4 py-3 border-b border-slate-900">
                 <h3 className="text-sm font-black text-white tracking-tight">Lifecycle Verification</h3>
              </div>
              <CardContent className="p-0">
                 {!selectedAsset ? (
                    <div className="p-12 text-center text-slate-400 flex flex-col items-center">
                       <PackageSearch className="h-8 w-8 mb-2 opacity-20" />
                       <p className="text-xs font-medium px-4 leading-relaxed">Pilih aset untuk menarik histori maintenance, tracking, dan stock opname secara otomatis.</p>
                    </div>
                 ) : (
                    <div className="divide-y divide-slate-100">
                       <div className="p-4 space-y-4">
                          <div className="flex items-start gap-3">
                             <div className="h-8 w-8 rounded-full bg-red-50 flex items-center justify-center text-red-600 shrink-0">
                                <Wrench className="h-4 w-4" />
                             </div>
                             <div>
                                <h4 className="text-[10px] font-black uppercase text-slate-700 tracking-wider">Maintenance Justification</h4>
                                <p className="text-xs font-bold text-slate-900 mt-0.5">Heavy Damage (Failed Repair)</p>
                                <p className="text-[10px] text-slate-500 mt-1">Ref: MNT-2026-0041</p>
                             </div>
                          </div>
                          <div className="flex items-start gap-3">
                             <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                                <PackageSearch className="h-4 w-4" />
                             </div>
                             <div>
                                <h4 className="text-[10px] font-black uppercase text-slate-700 tracking-wider">Stock Opname Validated</h4>
                                <p className="text-xs font-bold text-slate-900 mt-0.5">Found at KM Kelud (Bridge)</p>
                                <p className="text-[10px] text-slate-500 mt-1">Ref: SO-2026-0012</p>
                          </div>
                       </div>
                       <div className="flex items-start gap-3">
                          <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                             <History className="h-4 w-4" />
                          </div>
                          <div>
                             <h4 className="text-[10px] font-black uppercase text-slate-700 tracking-wider">Source Module</h4>
                             <p className="text-xs font-bold text-slate-900 mt-0.5">From Replacement REP-001</p>
                          </div>
                       </div>
                    </div>

                    <div className="p-4 bg-slate-50 border-t border-slate-200">
                       <Label className="text-[10px] uppercase font-bold text-slate-500 block mb-2">Disposal Evidence</Label>
                       <div className="border-2 border-dashed border-slate-200 rounded-lg p-5 flex flex-col items-center justify-center bg-white text-center hover:bg-red-50 hover:border-red-300 transition-colors cursor-pointer group">
                          <UploadCloud className="h-6 w-6 text-slate-400 group-hover:text-red-500 mb-2" />
                          <span className="text-[11px] font-black text-slate-600">UPLOAD PHOTOS / BERITA ACARA</span>
                          <p className="text-[9px] text-slate-400 mt-1 uppercase tracking-tight">Drop files or click to browse</p>
                       </div>
                    </div>
                 </div>
                 )}
              </CardContent>
              
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col gap-2">
                 <Button className="w-full bg-red-600 hover:bg-red-700 shadow-sm font-bold gap-2 py-6" disabled={!selectedAsset}>
                    <Send className="h-4 w-4" /> Submit Disposal Request
                 </Button>
                 <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 bg-white border-slate-200 gap-2 shadow-sm h-10 font-bold" disabled={!selectedAsset}>
                       <Save className="h-4 w-4 text-slate-400" /> Save Draft
                    </Button>
                    <Button variant="outline" className="flex-1 bg-white border-slate-200 gap-2 shadow-sm h-10 font-bold text-slate-600" render={
                       <Link href="/penghapusan/disposal">
                         Cancel
                       </Link>
                    } />
                 </div>
              </div>
           </Card>

           {selectedAsset && (
              <div className="p-4 rounded-xl bg-blue-600 text-white shadow-lg space-y-3 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-10">
                    <CheckCircle2 className="h-24 w-24" />
                 </div>
                 <h4 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                    <Info className="h-4 w-4" /> Approval Path
                 </h4>
                 <div className="space-y-2 relative z-10">
                    <div className="flex items-center gap-2 text-[10px] font-bold">
                       <span className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center">1</span> Technical Review
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold opacity-70">
                       <span className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center">2</span> Asset Manager
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold opacity-50">
                       <span className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center">3</span> Finance Approval
                    </div>
                 </div>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}
