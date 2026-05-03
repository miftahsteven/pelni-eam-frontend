"use client";

import React, { useState } from "react";
import { ModuleHeader } from "@/components/module-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  ChevronRight, 
  Info, 
  MapPin, 
  ShieldCheck, 
  Wrench, 
  FileText,
  Clock,
  History,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Printer,
  MoreVertical,
  Edit,
  Activity
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  dummyAssetRegistrations,
  dummyAcceptanceTests
} from "../asset-registration-data";
import { StatusBadge } from "@/components/eam/status-badge";
import { cn } from "@/lib/utils";

export default function AssetRegistrationDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const reg = dummyAssetRegistrations.find(r => r.id === id) || dummyAssetRegistrations[0];
  const atData = dummyAcceptanceTests.find(at => at.id === reg.acceptanceTestNo);

  const [activeTab, setActiveTab] = useState("master");

  const timelineSteps = [
    { label: "Plan & Design", date: "2026-03-01", status: "Completed", id: "PLN-2026-001" },
    { label: "BoQ Creation", date: "2026-03-05", status: "Completed", id: "BOQ-2026-001" },
    { label: "Purchase Request", date: "2026-03-10", status: "Completed", id: "PR-2026-001" },
    { label: "WBS Assignment", date: "2026-03-15", status: "Completed", id: "WBS-ENG-001" },
    { label: "Purchase Order", date: "2026-03-20", status: "Completed", id: "PO-2026-001" },
    { label: "Delivery Order", date: "2026-04-05", status: "Completed", id: "DO-2026-001" },
    { label: "Installation", date: "2026-04-15", status: "Completed", id: "INS-2026-001" },
    { label: "Acceptance Test", date: "2026-04-20", status: "Completed", id: "AT-2026-001" },
    { label: "Asset Registration", date: "2026-04-25", status: "Current", id: reg.registrationNo },
  ];

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full"
          render={
            <Link href="/pemasangan/assetregistration">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          }
        />
        <ModuleHeader
          title={`Asset Registration: ${reg.registrationNo}`}
          description={`Details for registered asset from ${reg.vessel}.`}
        />
        <div className="ml-auto flex gap-2">
          <Button variant="outline" className="gap-2 border-slate-200">
            <Printer className="h-4 w-4" /> Print Document
          </Button>
          <Button variant="outline" className="gap-2 border-slate-200 text-amber-600 hover:bg-amber-50">
            <Edit className="h-4 w-4" /> Edit Registration
          </Button>
          <Button variant="ghost" size="icon" className="border border-slate-200">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Header Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Document Header</span>
            <StatusBadge status={reg.status} />
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
            <div className="space-y-1">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">Registration No</Label>
              <p className="font-bold text-blue-600">{reg.registrationNo}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">Acceptance Reference</Label>
              <div className="flex items-center gap-2">
                 <p className="font-bold text-slate-900">{reg.acceptanceTestNo}</p>
                 <ExternalLink className="h-3 w-3 text-slate-300" />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">Registration Date</Label>
              <p className="font-bold text-slate-900">{reg.registrationDate}</p>
            </div>
             <div className="space-y-1">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">Registered By</Label>
              <p className="font-bold text-slate-900">{reg.registeredBy}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">Owner Department</Label>
              <p className="font-bold text-slate-900">{reg.ownerDepartment}</p>
            </div>
             <div className="space-y-1">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">WBS Code</Label>
              <p className="font-mono font-bold text-slate-700">{reg.wbsCode}</p>
            </div>
             <div className="space-y-1">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">Location</Label>
              <p className="font-bold text-slate-900 truncate">{reg.location}</p>
            </div>
             <div className="space-y-1">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">Vessel</Label>
              <p className="font-black text-slate-900">{reg.vessel}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col justify-center">
            <div className="flex flex-col items-center text-center space-y-3">
                <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-inner border border-blue-100">
                    <CheckCircle2 className="h-8 w-8" />
                </div>
                <div>
                    <h4 className="text-xl font-black text-slate-900 tracking-tight">Successfully Registered</h4>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Asset Master Created</p>
                </div>
                <div className="pt-4 w-full flex flex-col gap-2">
                    <Button variant="outline" size="sm" className="w-full text-[10px] font-black uppercase tracking-widest h-9">View Lifecycle History</Button>
                    <Button size="sm" className="w-full bg-pelni-blue text-[10px] font-black uppercase tracking-widest h-9">Go to Maintenance</Button>
                </div>
            </div>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="bg-white rounded-t-xl border border-slate-200 border-b-0 overflow-x-auto">
          <TabsList className="h-12 bg-transparent gap-0 px-2 flex whitespace-nowrap min-w-max">
            <TabsTrigger value="master" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-pelni-blue data-[state=active]:text-pelni-blue data-[state=active]:shadow-none rounded-none px-6 text-slate-500 font-bold text-xs uppercase tracking-wider h-full transition-all">
              Asset Master
            </TabsTrigger>
            <TabsTrigger value="items" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-pelni-blue data-[state=active]:text-pelni-blue data-[state=active]:shadow-none rounded-none px-6 text-slate-500 font-bold text-xs uppercase tracking-wider h-full transition-all">
              Registered Items
            </TabsTrigger>
            <TabsTrigger value="financial" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-pelni-blue data-[state=active]:text-pelni-blue data-[state=active]:shadow-none rounded-none px-6 text-slate-500 font-bold text-xs uppercase tracking-wider h-full transition-all">
              Warranty & Financial
            </TabsTrigger>
            <TabsTrigger value="technical" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-pelni-blue data-[state=active]:text-pelni-blue data-[state=active]:shadow-none rounded-none px-6 text-slate-500 font-bold text-xs uppercase tracking-wider h-full transition-all">
              Technical Data
            </TabsTrigger>
            <TabsTrigger value="flow" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-pelni-blue data-[state=active]:text-pelni-blue data-[state=active]:shadow-none rounded-none px-6 text-slate-500 font-bold text-xs uppercase tracking-wider h-full transition-all">
              Reference Flow
            </TabsTrigger>
            <TabsTrigger value="logs" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-pelni-blue data-[state=active]:text-pelni-blue data-[state=active]:shadow-none rounded-none px-6 text-slate-500 font-bold text-xs uppercase tracking-wider h-full transition-all">
              Activity Log
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="bg-white rounded-b-xl border border-slate-200 shadow-sm min-h-[400px]">
          {/* TAB: ASSET MASTER */}
          <TabsContent value="master" className="m-0 p-8">
            <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <div className="space-y-6">
                <div className="space-y-1">
                  <Label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Asset Code</Label>
                  <p className="text-lg font-black text-blue-600 font-mono tracking-tight">{reg.items[0]?.generatedAssetCode || "NO CODE"}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Asset Name</Label>
                  <p className="text-xl font-black text-slate-900 tracking-tight">{reg.items[0]?.itemName}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Category</Label>
                    <p className="font-bold text-slate-800">Machinery</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Asset Class</Label>
                    <p className="font-bold text-slate-800">Class 1 - Main Machinery</p>
                  </div>
                </div>
                 <div className="space-y-1">
                  <Label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Serial Number</Label>
                  <p className="font-bold text-slate-800 italic">{reg.items[0]?.serialNumber}</p>
                </div>
              </div>

              <div className="space-y-6">
                 <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Criticality</Label>
                    <Badge variant="destructive" className="font-black text-[10px] px-2 py-0">CRITICAL</Badge>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Current Status</Label>
                    <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 font-black text-[10px] px-2 py-0">ACTIVE</Badge>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Manufacturer</Label>
                  <p className="font-bold text-slate-800">Caterpillar</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Model / Type</Label>
                  <p className="font-bold text-slate-800">3512C-HD / Marine Propulsion</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Asset Description</Label>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">Main auxiliary generator for vessel power supply. Installed during dry docking in March 2026.</p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* TAB: REGISTERED ITEMS */}
          <TabsContent value="items" className="m-0 p-0">
             <div className="p-6">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow className="border-slate-100">
                    <TableHead className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Item Code</TableHead>
                    <TableHead className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Item Name</TableHead>
                    <TableHead className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Serial Number</TableHead>
                    <TableHead className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Asset Code</TableHead>
                    <TableHead className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reg.items.map(item => (
                    <TableRow key={item.itemCode} className="border-slate-100">
                      <TableCell className="font-mono font-bold text-slate-700 text-xs">{item.itemCode}</TableCell>
                      <TableCell className="font-bold text-slate-900">{item.itemName}</TableCell>
                      <TableCell className="text-slate-600 italic text-xs">{item.serialNumber}</TableCell>
                      <TableCell className="font-mono font-bold text-blue-600 text-xs">{item.generatedAssetCode}</TableCell>
                      <TableCell>
                        <Badge variant="success" className="text-[10px] font-black px-2 py-0">REGISTERED</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

           {/* TAB: REFERENCE FLOW */}
           <TabsContent value="flow" className="m-0 p-8">
             <div className="relative max-w-2xl mx-auto py-10">
               {/* Timeline Line */}
               <div className="absolute left-6 top-10 bottom-10 w-0.5 bg-slate-100"></div>

               <div className="space-y-12 relative z-10">
                 {timelineSteps.map((step, idx) => (
                   <div key={idx} className="flex items-start gap-12 group">
                     <div className={cn(
                       "h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 border-4 border-white shadow-md transition-all duration-300",
                       step.status === "Current" ? "bg-blue-600 text-white scale-110 shadow-blue-200" : "bg-green-500 text-white"
                     )}>
                        {step.status === "Current" ? <Clock className="h-6 w-6 animate-pulse" /> : <CheckCircle2 className="h-6 w-6" />}
                     </div>
                     <div className="flex flex-col gap-1 pt-1">
                       <span className={cn(
                         "text-xs font-black uppercase tracking-widest",
                         step.status === "Current" ? "text-blue-600" : "text-slate-400"
                       )}>{step.label}</span>
                       <div className="flex items-center gap-3">
                         <h4 className="text-lg font-black text-slate-900 tracking-tight">{step.id}</h4>
                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{step.date}</span>
                       </div>
                       <Button variant="link" className="p-0 h-auto w-fit text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:no-underline group-hover:underline">View Document Reference</Button>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           </TabsContent>

           {/* TAB: ACTIVITY LOG */}
           <TabsContent value="logs" className="m-0 p-8">
              <div className="space-y-6">
                {[
                  { user: "Admin EAM", action: "Registered Asset", time: "25 Apr 2026, 14:30", color: "bg-blue-500" },
                  { user: "Supervisor Engineering", action: "Approved Registration", time: "25 Apr 2026, 11:15", color: "bg-green-500" },
                  { user: "Admin EAM", action: "Submitted for Approval", time: "24 Apr 2026, 16:45", color: "bg-slate-500" },
                  { user: "Admin EAM", action: "Created Draft", time: "24 Apr 2026, 09:20", color: "bg-slate-500" },
                ].map((log, i) => (
                  <div key={i} className="flex gap-4 items-start border-b border-slate-50 pb-4 last:border-0">
                    <div className={cn("h-8 w-8 rounded-full flex items-center justify-center text-white shrink-0 shadow-sm", log.color)}>
                      <Activity className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm font-bold text-slate-900">{log.action}</p>
                      <p className="text-[10px] text-slate-500 font-medium">By <span className="font-bold text-slate-700">{log.user}</span> • {log.time}</p>
                    </div>
                  </div>
                ))}
              </div>
           </TabsContent>

           {/* Fallback contents for simplicity in demo */}
           <TabsContent value="financial" className="m-0 p-8 text-center text-slate-400 italic font-medium">Financial data displayed as defined in Create Page.</TabsContent>
           <TabsContent value="technical" className="m-0 p-8 text-center text-slate-400 italic font-medium">Technical specifications displayed as defined in Create Page.</TabsContent>

        </div>
      </Tabs>
    </div>
  );
}
