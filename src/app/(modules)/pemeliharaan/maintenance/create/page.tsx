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
import { Checkbox } from "@/components/ui/eam-checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  Save, 
  Send, 
  ArrowLeft, 
  CalendarDays,
  UserCheck,
  ClipboardList,
  Wrench
} from "lucide-react";
import Link from "next/link";
import { assets, technicians } from "../maintenance-data";
import { cn } from "@/lib/utils";

export default function CreateWorkOrderPage() {
  const [selectedAssetId, setSelectedAssetId] = useState<string>("");

  const selectedAsset = assets.find(a => a.id === selectedAssetId);

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full"
          render={
            <Link href="/pemeliharaan/maintenance">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          }
        />
        <ModuleHeader
          title="Create Work Order"
          description="Initiate a new preventive or corrective maintenance task."
        />
        <div className="ml-auto flex gap-2">
          <Button variant="outline" className="gap-2 border-slate-200">
            <Save className="h-4 w-4" /> Save as Draft
          </Button>
          <Button className="gap-2 bg-pelni-blue hover:bg-pelni-blue/90">
            <Send className="h-4 w-4" /> Submit Work Order
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
              <Wrench className="h-4 w-4 text-slate-500" />
              <span className="text-xs font-black uppercase tracking-widest text-slate-700">General Information</span>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">WO Number</Label>
                <Input value="WO-2026-AUTO" disabled className="bg-slate-50 border-slate-200 font-mono font-bold text-blue-600" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Maintenance Type <span className="text-red-500">*</span></Label>
                <Select>
                  <SelectTrigger className="border-slate-200 focus:ring-pelni-blue/20">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Preventive">Preventive Maintenance</SelectItem>
                    <SelectItem value="Corrective">Corrective Maintenance</SelectItem>
                    <SelectItem value="Condition-Based">Condition-Based</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Target Asset <span className="text-red-500">*</span></Label>
                <Select onValueChange={(val) => setSelectedAssetId(val || "")} value={selectedAssetId}>
                  <SelectTrigger className="border-slate-200 focus:ring-pelni-blue/20">
                    <SelectValue placeholder="Select asset to maintain" />
                  </SelectTrigger>
                  <SelectContent>
                    {assets.map(a => (
                      <SelectItem key={a.id} value={a.id}>[{a.code}] {a.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Priority <span className="text-red-500">*</span></Label>
                <Select>
                  <SelectTrigger className="border-slate-200 focus:ring-pelni-blue/20">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Schedule Date <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Input type="date" className="border-slate-200 pl-9" />
                  <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Assigned Technician <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Select>
                    <SelectTrigger className="border-slate-200 pl-9 focus:ring-pelni-blue/20">
                      <SelectValue placeholder="Select technician" />
                    </SelectTrigger>
                    <SelectContent>
                      {technicians.map(t => (
                         <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Estimated Duration (Hours)</Label>
                <Input type="number" placeholder="e.g. 4" className="border-slate-200" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Location context</Label>
                <Input value={selectedAsset ? `${selectedAsset.vessel} - ${selectedAsset.location}` : ""} disabled className="bg-slate-50 border-slate-200 text-slate-500" placeholder="Auto-filled from asset" />
              </div>

              <div className="col-span-1 md:col-span-2 space-y-2">
                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Work Description <span className="text-red-500">*</span></Label>
                <Textarea placeholder="Describe the maintenance task required..." className="border-slate-200 min-h-[100px]" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Asset Preview Card */}
          <div className="bg-pelni-blue rounded-xl border border-blue-700 shadow-md p-6 text-white">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center">
                <Wrench className="h-4 w-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-100">Asset Context</span>
            </div>
            {selectedAsset ? (
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] uppercase font-bold text-blue-200 tracking-wider">Asset Name</p>
                  <p className="text-lg font-black leading-tight">{selectedAsset.name}</p>
                  <p className="font-mono text-xs text-blue-200 mt-1">{selectedAsset.code}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-blue-500/50">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-blue-200 tracking-wider">Vessel</p>
                    <p className="font-bold text-sm">{selectedAsset.vessel}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-blue-200 tracking-wider">Category</p>
                    <p className="font-bold text-sm">{selectedAsset.category}</p>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-blue-200 tracking-wider">Current Condition</p>
                  <div className={cn(
                    "inline-block px-2 py-1 rounded text-xs font-black uppercase mt-1",
                    selectedAsset.condition === 'Good' ? "bg-green-500 text-white" : 
                    selectedAsset.condition === 'Warning' ? "bg-amber-500 text-white" : "bg-red-500 text-white"
                  )}>
                    {selectedAsset.condition}
                  </div>
                </div>
              </div>
            ) : (
               <div className="h-32 flex items-center justify-center border-2 border-dashed border-white/20 rounded-lg">
                <p className="text-sm text-blue-100 font-medium italic opacity-70">Select an asset to view details</p>
              </div>
            )}
          </div>

          {/* Checklist Template Setup */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ClipboardList className="h-4 w-4 text-slate-500" />
                <span className="text-xs font-black uppercase tracking-widest text-slate-700">Checklist Setup</span>
              </div>
              <Badge variant="outline" className="text-[9px] font-bold">OPTIONAL</Badge>
            </div>
            <div className="p-4 space-y-4">
               <div className="space-y-2">
                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Select Template</Label>
                <Select>
                  <SelectTrigger className="border-slate-200">
                    <SelectValue placeholder="Standard Preventive" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sp">Standard Preventive</SelectItem>
                    <SelectItem value="ep">Engine Overhaul</SelectItem>
                    <SelectItem value="el">Electrical Inspection</SelectItem>
                    <SelectItem value="none">Custom / Blank</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 pt-2">
                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Included Items</Label>
                <div className="space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  {['Visual Inspection', 'Cleaning components', 'Lubrication', 'Operational Test'].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Checkbox id={`check-${i}`} defaultChecked disabled className="opacity-50" />
                      <label htmlFor={`check-${i}`} className="text-xs font-medium text-slate-600">{item}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
