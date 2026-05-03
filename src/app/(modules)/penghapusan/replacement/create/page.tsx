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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Save, 
  Send, 
  Repeat, 
  Box, 
  Wrench,
  PackageSearch,
  MapPin,
  AlertCircle,
  FileText,
  Paperclip,
  UploadCloud,
  ShoppingCart,
  ChevronDown,
  Info,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { mockAssets, ReplacementType } from "../replacement-data";
import { cn } from "@/lib/utils";

export default function CreateReplacementPage() {
  const router = useRouter();
  const [selectedOldAssetCode, setSelectedOldAssetCode] = useState<string>("");
  const [selectedNewAssetCode, setSelectedNewAssetCode] = useState<string>("");
  const [replacementType, setReplacementType] = useState<ReplacementType>("New Procurement");

  const oldAsset = mockAssets.find(a => a.code === selectedOldAssetCode);
  const newAsset = mockAssets.find(a => a.code === selectedNewAssetCode);

  return (
    <div className="space-y-6 pb-12">
      <ModuleHeader
        title="Create Replacement Request"
        description="Buat permintaan penggantian aset lama yang sudah tidak layak pakai."
        showBack
        backUrl="/penghapusan/replacement"
        icon={<Repeat className="h-4 w-4" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          
          {/* SECTION A: OLD ASSET SELECTION */}
          <Card className="rounded-xl border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex justify-between items-center">
               <h3 className="text-sm font-black text-slate-800 tracking-tight flex items-center gap-2">
                 <Box className="h-4 w-4 text-pelni-blue" />
                 Old Asset Identity
               </h3>
               <Badge className="bg-slate-200 text-slate-600 hover:bg-slate-200 border-0 text-[10px] uppercase font-bold tracking-widest">Draft</Badge>
            </div>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-700">Request Date</Label>
                  <Input value={new Date().toISOString().split('T')[0]} disabled className="bg-slate-50 border-slate-200 font-mono text-xs" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-700">Requester</Label>
                  <Input value="Budi Santoso (Engineering)" disabled className="bg-slate-50 border-slate-200 text-xs" />
                </div>
              </div>
              
              <div className="border-t border-slate-100 pt-6">
                <Label className="text-xs font-bold text-slate-700 mb-2 block">Select Old Asset <span className="text-red-500">*</span></Label>
                <Select value={selectedOldAssetCode} onValueChange={setSelectedOldAssetCode}>
                  <SelectTrigger className={cn("border-slate-200 h-10", !selectedOldAssetCode && "text-slate-400")}>
                    <SelectValue placeholder="Select asset to be replaced..." />
                  </SelectTrigger>
                  <SelectContent>
                    {mockAssets.filter(a => a.status === 'Active').map(asset => (
                      <SelectItem key={asset.code} value={asset.code}>
                        <span className="font-mono text-[10px] bg-slate-100 px-1 py-0.5 rounded mr-2 text-slate-600">{asset.code}</span>
                        <span className="font-medium text-slate-800">{asset.name}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {oldAsset && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                   <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Category</span>
                      <p className="text-xs font-bold text-slate-800">{oldAsset.category}</p>
                   </div>
                   <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Location</span>
                      <p className="text-xs font-bold text-slate-800">{oldAsset.location}</p>
                   </div>
                   <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Condition</span>
                      <Badge variant="outline" className="text-[9px] bg-white border-amber-200 text-amber-700">{oldAsset.condition}</Badge>
                   </div>
                   <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Current Status</span>
                      <Badge className="text-[9px] bg-emerald-500">{oldAsset.status}</Badge>
                   </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* SECTION B: REPLACEMENT DETAILS */}
          <Card className="rounded-xl border-slate-200 shadow-sm overflow-hidden">
             <div className="bg-slate-50 border-b border-slate-200 px-4 py-3">
               <h3 className="text-sm font-black text-slate-800 tracking-tight flex items-center gap-2">
                 <FileText className="h-4 w-4 text-pelni-blue" />
                 Replacement Information
               </h3>
            </div>
            <CardContent className="p-6 space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <Label className="text-xs font-bold text-slate-700">Replacement Reason <span className="text-red-500">*</span></Label>
                     <Select>
                       <SelectTrigger className="border-slate-200 bg-white">
                         <SelectValue placeholder="Select reason" />
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="damage">Heavy Damage</SelectItem>
                         <SelectItem value="obsolete">Obsolete</SelectItem>
                         <SelectItem value="cost">High Repair Cost</SelectItem>
                         <SelectItem value="lost">Lost Asset</SelectItem>
                         <SelectItem value="upgrade">Upgrade Requirement</SelectItem>
                         <SelectItem value="life">End of Useful Life</SelectItem>
                       </SelectContent>
                     </Select>
                  </div>
                  <div className="space-y-2">
                     <Label className="text-xs font-bold text-slate-700">Urgency Level <span className="text-red-500">*</span></Label>
                     <Select defaultValue="normal">
                       <SelectTrigger className="border-slate-200 bg-white">
                         <SelectValue />
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="critical">Critical (Immediate)</SelectItem>
                         <SelectItem value="high">High</SelectItem>
                         <SelectItem value="normal">Normal</SelectItem>
                         <SelectItem value="low">Low</SelectItem>
                       </SelectContent>
                     </Select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                     <Label className="text-xs font-bold text-slate-700">Technical Recommendation <span className="text-red-500">*</span></Label>
                     <Textarea placeholder="Detail rekomendasi teknis dari tim maintenance..." className="min-h-[80px] border-slate-200 bg-white text-xs resize-none" />
                  </div>
               </div>
            </CardContent>
          </Card>

          {/* SECTION C: REPLACEMENT TYPE & NEW ASSET */}
          <Card className="rounded-xl border-slate-200 shadow-sm overflow-hidden">
             <div className="bg-slate-50 border-b border-slate-200 px-4 py-3">
               <h3 className="text-sm font-black text-slate-800 tracking-tight flex items-center gap-2">
                 <ShoppingCart className="h-4 w-4 text-pelni-blue" />
                 Replacement Type & Strategy
               </h3>
            </div>
            <CardContent className="p-6 space-y-8">
               <RadioGroup 
                 value={replacementType} 
                 onValueChange={(v) => setReplacementType(v as ReplacementType)}
                 className="grid grid-cols-2 gap-4"
               >
                 <div>
                   <RadioGroupItem value="Existing Asset" id="existing" className="peer sr-only" />
                   <Label
                     htmlFor="existing"
                     className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-blue-600 [&:has([data-state=checked])]:border-blue-600 cursor-pointer"
                   >
                     <Repeat className="mb-3 h-6 w-6 text-blue-600" />
                     <span className="text-xs font-black uppercase">Existing Asset</span>
                     <span className="text-[10px] text-slate-500 mt-1">Replace from current stock</span>
                   </Label>
                 </div>
                 <div>
                   <RadioGroupItem value="New Procurement" id="procurement" className="peer sr-only" />
                   <Label
                     htmlFor="procurement"
                     className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-purple-600 [&:has([data-state=checked])]:border-purple-600 cursor-pointer"
                   >
                     <ShoppingCart className="mb-3 h-6 w-6 text-purple-600" />
                     <span className="text-xs font-black uppercase">New Procurement</span>
                     <span className="text-[10px] text-slate-500 mt-1">Purchase new asset</span>
                   </Label>
                 </div>
               </RadioGroup>

               {replacementType === 'Existing Asset' ? (
                  <div className="space-y-4 p-5 bg-blue-50/50 border border-blue-100 rounded-xl relative">
                     <Badge className="absolute -top-2.5 left-4 bg-blue-600 text-[10px] uppercase font-bold">Target Asset</Badge>
                     <div className="space-y-2">
                        <Label className="text-xs font-bold text-slate-700">Select Available Asset <span className="text-red-500">*</span></Label>
                        <Select value={selectedNewAssetCode} onValueChange={setSelectedNewAssetCode}>
                           <SelectTrigger className="bg-white border-blue-200">
                              <SelectValue placeholder="Search available stock..." />
                           </SelectTrigger>
                           <SelectContent>
                              {mockAssets.filter(a => a.status === 'Available' || a.status === 'Ready').map(asset => (
                                 <SelectItem key={asset.code} value={asset.code}>
                                    <span className="font-mono text-[10px] bg-slate-100 px-1 py-0.5 rounded mr-2 text-slate-600">{asset.code}</span>
                                    <span className="font-medium text-slate-800">{asset.name}</span>
                                 </SelectItem>
                              ))}
                           </SelectContent>
                        </Select>
                     </div>
                     {newAsset && (
                        <div className="grid grid-cols-2 gap-4 pt-2">
                           <div className="space-y-1">
                              <span className="text-[10px] uppercase font-bold text-slate-400">Location</span>
                              <p className="text-xs font-bold text-slate-800">{newAsset.location}</p>
                           </div>
                           <div className="space-y-1 text-right">
                              <span className="text-[10px] uppercase font-bold text-slate-400">Current Status</span>
                              <p className="text-xs font-bold text-blue-600">{newAsset.status}</p>
                           </div>
                        </div>
                     )}
                  </div>
               ) : (
                  <div className="space-y-4 p-5 bg-purple-50/50 border border-purple-100 rounded-xl relative">
                     <Badge className="absolute -top-2.5 left-4 bg-purple-600 text-[10px] uppercase font-bold">Procurement Reference</Badge>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                           <Label className="text-[10px] uppercase font-bold text-slate-500">Purchase Request (PR) No</Label>
                           <Input placeholder="PR-2026-XXXX" className="h-9 bg-white border-purple-200 text-xs" />
                        </div>
                        <div className="space-y-1.5">
                           <Label className="text-[10px] uppercase font-bold text-slate-500">PO Reference (Optional)</Label>
                           <Input placeholder="PO-2026-XXXX" className="h-9 bg-white border-purple-200 text-xs" />
                        </div>
                     </div>
                     <div className="flex items-center gap-2 p-3 bg-white border border-purple-100 rounded-lg">
                        <Info className="h-4 w-4 text-purple-400" />
                        <p className="text-[10px] text-slate-500 italic">Replacement will remain in 'Waiting Procurement' status until the new asset is registered.</p>
                     </div>
                  </div>
               )}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: ASSET CONTEXT & ACTIONS */}
        <div className="space-y-6">
           <Card className="rounded-xl border-slate-200 shadow-sm overflow-hidden sticky top-6">
             <div className="bg-slate-800 border-b border-slate-900 px-4 py-3">
               <h3 className="text-sm font-black text-white tracking-tight">Context Verification</h3>
             </div>
             <CardContent className="p-0">
               {!oldAsset ? (
                 <div className="p-8 text-center text-slate-400 flex flex-col items-center">
                    <Box className="h-8 w-8 mb-2 opacity-20" />
                    <p className="text-xs font-medium px-4">Select an old asset to pull its maintenance and condition history.</p>
                 </div>
               ) : (
                 <div className="divide-y divide-slate-100">
                    <div className="p-4 space-y-4">
                       <div className="flex items-start gap-3">
                          <div className="h-8 w-8 rounded-full bg-red-50 flex items-center justify-center text-red-600 shrink-0">
                             <Wrench className="h-4 w-4" />
                          </div>
                          <div>
                             <h4 className="text-[10px] font-black uppercase text-slate-700 tracking-wider">Maintenance Summary</h4>
                             <p className="text-xs font-bold text-slate-900 mt-0.5">Critical Failure Reported</p>
                             <p className="text-[10px] text-slate-500 mt-1">Ref: MNT-2026-0031 • 12 Apr 2026</p>
                          </div>
                       </div>
                       <div className="flex items-start gap-3">
                          <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                             <PackageSearch className="h-4 w-4" />
                          </div>
                          <div>
                             <h4 className="text-[10px] font-black uppercase text-slate-700 tracking-wider">Stock Opname Results</h4>
                             <p className="text-xs font-bold text-slate-900 mt-0.5">Condition: Heavy Damage</p>
                             <p className="text-[10px] text-slate-500 mt-1">Ref: SO-2026-0018 • 15 Apr 2026</p>
                          </div>
                       </div>
                       <div className="flex items-start gap-3">
                          <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                             <MapPin className="h-4 w-4" />
                          </div>
                          <div>
                             <h4 className="text-[10px] font-black uppercase text-slate-700 tracking-wider">Last Tracked Location</h4>
                             <p className="text-xs font-bold text-slate-900 mt-0.5">KM Kelud - Engine Room</p>
                             <p className="text-[10px] text-slate-500 mt-1">Confirmed via TRK-2026-0022</p>
                          </div>
                       </div>
                    </div>

                    <div className="p-4 bg-slate-50 border-t border-slate-200">
                       <Label className="text-[10px] uppercase font-bold text-slate-500 block mb-2">Supporting Documents</Label>
                       <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 flex flex-col items-center justify-center bg-white text-center hover:bg-blue-50 hover:border-blue-300 transition-colors cursor-pointer group">
                          <UploadCloud className="h-5 w-5 text-slate-400 group-hover:text-pelni-blue mb-1" />
                          <span className="text-[10px] font-bold text-slate-600">Upload Photos/PDF</span>
                       </div>
                    </div>
                 </div>
               )}
             </CardContent>
             
             {/* ACTIONS */}
             <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col gap-2">
                <Button className="w-full bg-pelni-blue hover:bg-blue-700 shadow-sm font-bold gap-2" disabled={!oldAsset}>
                   <Send className="h-4 w-4" /> Submit Request
                </Button>
                <div className="flex gap-2">
                   <Button variant="outline" className="flex-1 bg-white border-slate-200 gap-2 shadow-sm" disabled={!oldAsset}>
                      <Save className="h-4 w-4 text-slate-400" /> Draft
                   </Button>
                   <Button variant="outline" className="flex-1 bg-white border-slate-200 gap-2 shadow-sm text-red-600 hover:text-red-700 hover:bg-red-50" render={
                      <Link href="/penghapusan/replacement">
                        Cancel
                      </Link>
                   } />
                </div>
             </div>
           </Card>
        </div>
      </div>
    </div>
  );
}
