"use client";

import React from "react";
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
import { 
  Save, 
  Settings2, 
  ArrowLeft, 
  CalendarDays,
  UserCheck,
  Building2,
  PackageCheck,
  CheckSquare
} from "lucide-react";
import Link from "next/link";
import { officers, supervisors } from "../stock-opname-data";

export default function CreateStockOpnamePage() {
  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full"
          render={
            <Link href="/pemeliharaan/stock-opname">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          }
        />
        <ModuleHeader
          title="Create Stock Opname Plan"
          description="Initialize a new physical asset verification task."
        />
        <div className="ml-auto flex gap-2">
          <Button variant="outline" className="gap-2 border-slate-200">
            <Save className="h-4 w-4" /> Save as Draft
          </Button>
          <Button className="gap-2 bg-pelni-blue hover:bg-pelni-blue/90">
            <Settings2 className="h-4 w-4" /> Generate Asset List
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
              <PackageCheck className="h-4 w-4 text-slate-500" />
              <span className="text-xs font-black uppercase tracking-widest text-slate-700">Audit Configuration</span>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Document No</Label>
                <Input value="SO-2026-AUTO" disabled className="bg-slate-50 border-slate-200 font-mono font-bold text-blue-600" />
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Audit Period <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Input type="month" className="border-slate-200 pl-9" defaultValue="2026-06" />
                  <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Target Location <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Select>
                    <SelectTrigger className="border-slate-200 pl-9 focus:ring-pelni-blue/20">
                      <SelectValue placeholder="Select location (Vessel/Branch)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="km-kelud">Kapal KM Kelud</SelectItem>
                      <SelectItem value="km-dobonsolo">Kapal KM Dobonsolo</SelectItem>
                      <SelectItem value="km-labobar">Kapal KM Labobar</SelectItem>
                      <SelectItem value="ho">Kantor Pusat</SelectItem>
                      <SelectItem value="cb-sby">Cabang Surabaya</SelectItem>
                    </SelectContent>
                  </Select>
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Target Category (Optional)</Label>
                <Select>
                  <SelectTrigger className="border-slate-200 focus:ring-pelni-blue/20">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="nav">Navigation Equipment</SelectItem>
                    <SelectItem value="mech">Mechanical</SelectItem>
                    <SelectItem value="elec">Electrical</SelectItem>
                    <SelectItem value="it">IT Equipment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Specific Unit/Department (Optional)</Label>
                <Select>
                  <SelectTrigger className="border-slate-200 focus:ring-pelni-blue/20">
                    <SelectValue placeholder="All Departments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="deck">Deck Department</SelectItem>
                    <SelectItem value="engine">Engine Department</SelectItem>
                    <SelectItem value="hotel">Hotel/Catering</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Assigned Officer <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Select>
                    <SelectTrigger className="border-slate-200 pl-9 focus:ring-pelni-blue/20">
                      <SelectValue placeholder="Select inspection officer" />
                    </SelectTrigger>
                    <SelectContent>
                      {officers.map(o => (
                         <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <CheckSquare className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Reviewing Supervisor <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Select>
                    <SelectTrigger className="border-slate-200 pl-9 focus:ring-pelni-blue/20">
                      <SelectValue placeholder="Select supervisor" />
                    </SelectTrigger>
                    <SelectContent>
                       {supervisors.map(s => (
                         <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 space-y-2">
                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Instruction / Notes</Label>
                <Textarea placeholder="Specific instructions for the inspection officer..." className="border-slate-200 min-h-[100px]" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-pelni-blue rounded-xl border border-blue-700 shadow-md p-6 text-white">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center">
                <Settings2 className="h-4 w-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-100">Generation Process</span>
            </div>
            
            <p className="text-sm text-blue-50 leading-relaxed">
              When you click <strong className="text-white">"Generate Asset List"</strong>, the system will query the active Asset Registry for all assets matching your selected location and category filters.
            </p>
            
            <div className="mt-6 pt-4 border-t border-blue-500/50 space-y-3">
              <div className="flex items-center gap-2 text-xs">
                <div className="h-5 w-5 rounded-full bg-blue-500/50 flex items-center justify-center font-bold text-[10px]">1</div>
                <span className="font-medium text-blue-100">Filters applied</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="h-5 w-5 rounded-full bg-blue-500/50 flex items-center justify-center font-bold text-[10px]">2</div>
                <span className="font-medium text-blue-100">Status changed to 'Generated'</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="h-5 w-5 rounded-full bg-blue-500/50 flex items-center justify-center font-bold text-[10px]">3</div>
                <span className="font-medium text-blue-100">Officer notified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
