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
import { 
  Save, 
  Send, 
  ArrowLeft, 
  MapPin, 
  Box, 
  AlertCircle,
  FileText,
  Paperclip,
  UploadCloud,
  Map
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { assets, DummyAssetContext } from "../movement-data";
import { cn } from "@/lib/utils";

export default function CreateMovementPage() {
  const router = useRouter();
  const [selectedAssetCode, setSelectedAssetCode] = useState<string>("");
  const [selectedAsset, setSelectedAsset] = useState<DummyAssetContext | null>(null);

  const handleAssetSelect = (code: string) => {
    setSelectedAssetCode(code);
    const asset = assets.find(a => a.assetCode === code) || null;
    setSelectedAsset(asset);
  };

  return (
    <div className="space-y-6 pb-12">
      <ModuleHeader
        title="Create Movement Request"
        description="Buat permintaan pemindahan aset baru antar lokasi operasional."
        showBack
        backUrl="/penghapusan/movement"
        icon={<FileText className="h-4 w-4" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          
          {/* SECTION A: HEADER & ASSET SELECTION */}
          <Card className="rounded-xl border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex justify-between items-center">
               <h3 className="text-sm font-black text-slate-800 tracking-tight flex items-center gap-2">
                 <Box className="h-4 w-4 text-pelni-blue" />
                 Asset Identity
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
                  <Input value="Budi Santoso (Marine Engineering)" disabled className="bg-slate-50 border-slate-200 text-xs" />
                </div>
              </div>
              
              <div className="border-t border-slate-100 pt-6">
                <Label className="text-xs font-bold text-slate-700 mb-2 block">Select Asset <span className="text-red-500">*</span></Label>
                <Select value={selectedAssetCode} onValueChange={handleAssetSelect}>
                  <SelectTrigger className={cn("border-slate-200 h-10", !selectedAssetCode && "text-slate-400")}>
                    <SelectValue placeholder="Search and select asset by code or name..." />
                  </SelectTrigger>
                  <SelectContent>
                    {assets.map(asset => (
                      <SelectItem key={asset.id} value={asset.assetCode}>
                        <span className="font-mono text-[10px] bg-slate-100 px-1 py-0.5 rounded mr-2 text-slate-600">{asset.assetCode}</span>
                        <span className="font-medium text-slate-800">{asset.assetName}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedAsset && selectedAsset.status === 'Pending Disposal' && (
                  <p className="text-[10px] text-red-500 font-medium mt-1 flex items-center gap-1">
                     <AlertCircle className="h-3 w-3" /> Warning: Asset is currently marked for disposal.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* SECTION C: MOVEMENT DETAILS */}
          <Card className="rounded-xl border-slate-200 shadow-sm overflow-hidden">
             <div className="bg-slate-50 border-b border-slate-200 px-4 py-3">
               <h3 className="text-sm font-black text-slate-800 tracking-tight flex items-center gap-2">
                 <Map className="h-4 w-4 text-pelni-blue" />
                 Movement Route & Details
               </h3>
            </div>
            <CardContent className="p-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                  <div className="space-y-2 md:col-span-2">
                     <Label className="text-xs font-bold text-slate-700">Movement Type <span className="text-red-500">*</span></Label>
                     <Select>
                       <SelectTrigger className="border-slate-200 bg-white">
                         <SelectValue placeholder="Select movement purpose" />
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="operational">Operational Transfer</SelectItem>
                         <SelectItem value="warehouse">Warehouse Transfer</SelectItem>
                         <SelectItem value="maintenance">Maintenance Transfer</SelectItem>
                         <SelectItem value="disposal">Disposal Preparation</SelectItem>
                         <SelectItem value="replacement">Replacement Preparation</SelectItem>
                       </SelectContent>
                     </Select>
                  </div>

                  {/* Origin */}
                  <div className="space-y-4 p-4 bg-slate-50 border border-slate-200 rounded-lg relative">
                     <Badge variant="outline" className="absolute -top-2.5 left-3 bg-white text-[9px] uppercase font-bold text-slate-500 border-slate-300">Origin</Badge>
                     <div className="space-y-1">
                        <Label className="text-[10px] uppercase font-bold text-slate-400">Current Location</Label>
                        <Input value={selectedAsset ? selectedAsset.currentLocation : ""} disabled className="bg-slate-100 border-slate-200 text-xs h-8" />
                     </div>
                     <div className="space-y-1">
                        <Label className="text-[10px] uppercase font-bold text-slate-400">Current Department</Label>
                        <Input value={selectedAsset ? selectedAsset.currentDepartment : ""} disabled className="bg-slate-100 border-slate-200 text-xs h-8" />
                     </div>
                     <div className="space-y-1">
                        <Label className="text-[10px] uppercase font-bold text-slate-400">Current Custodian / PIC</Label>
                        <Input value={selectedAsset ? selectedAsset.currentPic : ""} disabled className="bg-slate-100 border-slate-200 text-xs h-8" />
                     </div>
                  </div>

                  {/* Destination */}
                  <div className="space-y-4 p-4 bg-blue-50/50 border border-blue-200 rounded-lg relative">
                     <Badge variant="outline" className="absolute -top-2.5 left-3 bg-blue-600 text-[9px] uppercase font-bold text-white border-blue-600">Destination</Badge>
                     <div className="space-y-1">
                        <Label className="text-[10px] uppercase font-bold text-slate-600">New Location <span className="text-red-500">*</span></Label>
                        <Select>
                          <SelectTrigger className="border-blue-200 bg-white text-xs h-8">
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="jkt">Central Warehouse Jakarta</SelectItem>
                            <SelectItem value="sby">Surabaya Branch Warehouse</SelectItem>
                            <SelectItem value="disposal">Disposal Holding Area</SelectItem>
                            <SelectItem value="kelud">KM Kelud</SelectItem>
                          </SelectContent>
                        </Select>
                     </div>
                     <div className="space-y-1">
                        <Label className="text-[10px] uppercase font-bold text-slate-600">New Department <span className="text-red-500">*</span></Label>
                        <Select>
                          <SelectTrigger className="border-blue-200 bg-white text-xs h-8">
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="log">Logistic</SelectItem>
                            <SelectItem value="eng">Marine Engineering</SelectItem>
                            <SelectItem value="am">Asset Management</SelectItem>
                          </SelectContent>
                        </Select>
                     </div>
                     <div className="space-y-1">
                        <Label className="text-[10px] uppercase font-bold text-slate-600">New Custodian / PIC <span className="text-red-500">*</span></Label>
                        <Input placeholder="Enter new PIC name..." className="border-blue-200 bg-white text-xs h-8" />
                     </div>
                  </div>

                  <div className="space-y-2">
                     <Label className="text-xs font-bold text-slate-700">Movement Date <span className="text-red-500">*</span></Label>
                     <Input type="date" className="border-slate-200 bg-white text-xs" />
                  </div>
                  <div className="space-y-2">
                     <Label className="text-xs font-bold text-slate-700">Expected Arrival Date</Label>
                     <Input type="date" className="border-slate-200 bg-white text-xs" />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                     <Label className="text-xs font-bold text-slate-700">Reason for Movement <span className="text-red-500">*</span></Label>
                     <Textarea placeholder="Explain why this asset is being moved..." className="min-h-[80px] border-slate-200 bg-white text-xs resize-none" />
                  </div>
               </div>
            </CardContent>
          </Card>

          {/* ATTACHMENTS */}
          <Card className="rounded-xl border-slate-200 shadow-sm overflow-hidden mb-6">
            <div className="bg-slate-50 border-b border-slate-200 px-4 py-3">
               <h3 className="text-sm font-black text-slate-800 tracking-tight flex items-center gap-2">
                 <Paperclip className="h-4 w-4 text-pelni-blue" />
                 Supporting Documents
               </h3>
            </div>
            <CardContent className="p-6">
               <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 flex flex-col items-center justify-center bg-slate-50 text-center hover:bg-blue-50 hover:border-blue-300 transition-colors cursor-pointer group">
                  <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-200 mb-3 group-hover:scale-110 transition-transform">
                     <UploadCloud className="h-5 w-5 text-slate-400 group-hover:text-pelni-blue" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-700">Upload Transfer Form or Photos</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-[250px]">Drag and drop files here, or click to browse. Max file size: 10MB.</p>
                  <Button variant="outline" size="sm" className="mt-4 bg-white text-xs shadow-sm">Browse Files</Button>
               </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: ASSET CONTEXT & ACTIONS */}
        <div className="space-y-6">
           <Card className="rounded-xl border-slate-200 shadow-sm overflow-hidden sticky top-6">
             <div className="bg-slate-800 border-b border-slate-900 px-4 py-3">
               <h3 className="text-sm font-black text-white tracking-tight">Asset Context</h3>
             </div>
             <CardContent className="p-0">
               {!selectedAsset ? (
                 <div className="p-8 text-center text-slate-400 flex flex-col items-center">
                    <MapPin className="h-8 w-8 mb-2 opacity-20" />
                    <p className="text-xs font-medium">Select an asset to view its current context and warnings.</p>
                 </div>
               ) : (
                 <div className="divide-y divide-slate-100">
                    <div className="p-4 space-y-3 bg-slate-50/50">
                       <div className="flex justify-between items-center">
                          <span className="text-[10px] uppercase font-bold text-slate-400">Current Status</span>
                          <Badge variant="outline" className={cn(
                             "text-[9px] uppercase tracking-widest",
                             selectedAsset.status === 'Active' ? "border-green-200 text-green-700 bg-green-50" : "border-slate-200 text-slate-700 bg-white"
                          )}>
                             {selectedAsset.status}
                          </Badge>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="text-[10px] uppercase font-bold text-slate-400">Category</span>
                          <span className="text-xs font-bold text-slate-800">{selectedAsset.category}</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="text-[10px] uppercase font-bold text-slate-400">Serial No</span>
                          <span className="text-xs font-mono text-slate-600">{selectedAsset.serialNumber}</span>
                       </div>
                    </div>
                    
                    <div className="p-4 space-y-4">
                       <div>
                          <div className="flex items-center justify-between mb-1">
                             <h4 className="text-[10px] font-black uppercase text-slate-700 tracking-wider flex items-center gap-1.5">
                                <MapPin className="h-3 w-3 text-slate-400" /> Asset Tracking
                             </h4>
                             <span className="text-[9px] font-mono text-slate-400">{selectedAsset.lastTrackingDate}</span>
                          </div>
                          <p className="text-xs text-slate-600 pl-4.5 font-medium border-l-2 border-slate-200 ml-1.5 pl-2">{selectedAsset.lastTrackingLocation}</p>
                       </div>
                       
                       <div>
                          <h4 className="text-[10px] font-black uppercase text-slate-700 tracking-wider flex items-center gap-1.5 mb-1">
                             <FileText className="h-3 w-3 text-slate-400" /> Opname Finding
                          </h4>
                          <Badge variant="secondary" className={cn(
                             "text-[9px] uppercase ml-4.5 bg-slate-100",
                             selectedAsset.lastOpnameFinding === 'Location Mismatch' ? "bg-red-50 text-red-700 border border-red-200" : ""
                          )}>
                             {selectedAsset.lastOpnameFinding}
                          </Badge>
                       </div>
                    </div>

                    <div className="p-4 bg-blue-50/50 space-y-2 border-t border-slate-200">
                       <Label className="text-[10px] uppercase font-bold text-slate-500">Related Document (Optional)</Label>
                       <Select>
                         <SelectTrigger className="border-slate-200 bg-white h-8 text-xs">
                           <SelectValue placeholder="Link to module..." />
                         </SelectTrigger>
                         <SelectContent>
                           <SelectItem value="maintenance">Maintenance WO</SelectItem>
                           <SelectItem value="opname">Stock Opname ID</SelectItem>
                           <SelectItem value="replacement">Replacement Req</SelectItem>
                         </SelectContent>
                       </Select>
                       <Input placeholder="Reference number..." className="h-8 text-xs bg-white border-slate-200" />
                    </div>
                 </div>
               )}
             </CardContent>
             
             {/* ACTIONS */}
             <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col gap-2">
                <Button className="w-full bg-pelni-blue hover:bg-blue-700 shadow-sm font-bold gap-2" disabled={!selectedAsset}>
                   <Send className="h-4 w-4" /> Submit Request
                </Button>
                <div className="flex gap-2">
                   <Button variant="outline" className="flex-1 bg-white border-slate-200 gap-2 shadow-sm" disabled={!selectedAsset}>
                      <Save className="h-4 w-4 text-slate-400" /> Draft
                   </Button>
                   <Button 
                      variant="outline" 
                      className="flex-1 bg-white border-slate-200 gap-2 shadow-sm text-red-600 hover:text-red-700 hover:bg-red-50" 
                      render={
                        <Link href="/penghapusan/movement">
                          Cancel
                        </Link>
                      }
                    />
                </div>
             </div>
           </Card>
        </div>
      </div>
    </div>
  );
}
