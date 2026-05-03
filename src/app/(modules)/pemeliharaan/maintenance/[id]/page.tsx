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
import { Checkbox } from "@/components/ui/eam-checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ArrowLeft, 
  ChevronRight, 
  Info, 
  MapPin, 
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
  Activity,
  Plus,
  Trash2,
  Upload
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  workOrders,
  spareParts,
  assets
} from "../maintenance-data";
import { StatusBadge } from "@/components/eam/status-badge";
import { cn } from "@/lib/utils";

export default function MaintenanceDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const wo = workOrders.find(r => r.id === id) || workOrders[0];
  const asset = assets.find(a => a.code === wo.assetCode);

  const [activeTab, setActiveTab] = useState("general");
  const [usedSpareParts, setUsedSpareParts] = useState([{ code: "", qty: 1, notes: "" }]);

  const addSparePartRow = () => {
    setUsedSpareParts([...usedSpareParts, { code: "", qty: 1, notes: "" }]);
  };

  const removeSparePartRow = (index: number) => {
    const newParts = [...usedSpareParts];
    newParts.splice(index, 1);
    setUsedSpareParts(newParts);
  };

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
          title={`Work Order: ${wo.id}`}
          description={`Maintenance details for ${wo.assetName}.`}
        />
        <div className="ml-auto flex gap-2">
          <Button variant="outline" className="gap-2 border-slate-200 text-amber-600 hover:bg-amber-50">
            <Edit className="h-4 w-4" /> Edit WO
          </Button>
          <Button variant="outline" className="gap-2 border-slate-200">
            <Printer className="h-4 w-4" /> Print
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
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Work Order Header</span>
            <StatusBadge status={wo.status} />
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
            <div className="space-y-1">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">WO Number</Label>
              <p className="font-bold text-blue-600">{wo.id}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">Target Asset</Label>
              <div className="flex items-center gap-2">
                 <p className="font-bold text-slate-900 truncate" title={wo.assetName}>{wo.assetName}</p>
                 <ExternalLink className="h-3 w-3 text-slate-300 shrink-0" />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">Maint. Type</Label>
              <p className="font-bold text-slate-900">{wo.type}</p>
            </div>
             <div className="space-y-1">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">Priority</Label>
              <Badge variant={
                wo.priority === 'Critical' ? 'destructive' : 
                wo.priority === 'High' ? 'warning' : 
                wo.priority === 'Medium' ? 'default' : 'success'
              } className="text-[9px] px-1.5 py-0 mt-0.5">
                {wo.priority.toUpperCase()}
              </Badge>
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">Schedule Date</Label>
              <p className="font-bold text-slate-900">{wo.scheduleDate}</p>
            </div>
             <div className="space-y-1 lg:col-span-2">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">Location Context</Label>
              <p className="font-bold text-slate-900">{wo.vessel} - {wo.location}</p>
            </div>
             <div className="space-y-1">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">Assigned Tech</Label>
              <p className="font-bold text-slate-900">{wo.technician.join(", ")}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col justify-center">
            <div className="flex flex-col items-center text-center space-y-3">
                <div className={cn(
                  "h-16 w-16 rounded-2xl flex items-center justify-center shadow-inner border",
                  wo.status === "Completed" || wo.status === "Closed" ? "bg-green-50 text-green-600 border-green-100" :
                  wo.status === "In Progress" ? "bg-blue-50 text-blue-600 border-blue-100" :
                  "bg-slate-50 text-slate-400 border-slate-100"
                )}>
                  {wo.status === "Completed" || wo.status === "Closed" ? <CheckCircle2 className="h-8 w-8" /> :
                   wo.status === "In Progress" ? <Wrench className="h-8 w-8 animate-pulse" /> :
                   <Clock className="h-8 w-8" />}
                </div>
                <div>
                    <h4 className="text-xl font-black text-slate-900 tracking-tight">{wo.status}</h4>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Current Status</p>
                </div>
                <div className="pt-4 w-full flex flex-col gap-2">
                    {wo.status !== "Completed" && wo.status !== "Closed" && (
                      <Button size="sm" className="w-full bg-pelni-blue text-[10px] font-black uppercase tracking-widest h-9">
                        Update Status
                      </Button>
                    )}
                    {wo.status === "Completed" && (
                       <Button size="sm" variant="outline" className="w-full text-green-700 border-green-200 bg-green-50 hover:bg-green-100 text-[10px] font-black uppercase tracking-widest h-9">
                        Close Work Order
                      </Button>
                    )}
                </div>
            </div>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="bg-white rounded-t-xl border border-slate-200 border-b-0 overflow-x-auto">
          <TabsList className="h-12 bg-transparent gap-0 px-2 flex whitespace-nowrap min-w-max">
            <TabsTrigger value="general" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-pelni-blue data-[state=active]:text-pelni-blue data-[state=active]:shadow-none rounded-none px-6 text-slate-500 font-bold text-xs uppercase tracking-wider h-full transition-all">
              General Info
            </TabsTrigger>
            <TabsTrigger value="checklist" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-pelni-blue data-[state=active]:text-pelni-blue data-[state=active]:shadow-none rounded-none px-6 text-slate-500 font-bold text-xs uppercase tracking-wider h-full transition-all flex items-center gap-2">
              Checklist
              {wo.status !== 'Closed' && <Badge variant="destructive" className="h-4 w-4 rounded-full p-0 flex items-center justify-center text-[8px]">!</Badge>}
            </TabsTrigger>
            <TabsTrigger value="spareparts" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-pelni-blue data-[state=active]:text-pelni-blue data-[state=active]:shadow-none rounded-none px-6 text-slate-500 font-bold text-xs uppercase tracking-wider h-full transition-all">
              Sparepart Usage
            </TabsTrigger>
            <TabsTrigger value="worklog" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-pelni-blue data-[state=active]:text-pelni-blue data-[state=active]:shadow-none rounded-none px-6 text-slate-500 font-bold text-xs uppercase tracking-wider h-full transition-all">
              Work Log
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-pelni-blue data-[state=active]:text-pelni-blue data-[state=active]:shadow-none rounded-none px-6 text-slate-500 font-bold text-xs uppercase tracking-wider h-full transition-all">
              History
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="bg-white rounded-b-xl border border-slate-200 shadow-sm min-h-[400px]">
          {/* TAB: GENERAL INFO */}
          <TabsContent value="general" className="m-0 p-8">
            <div className="max-w-3xl space-y-8">
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Work Description</Label>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">{wo.description}</p>
                </div>
              </div>

              {asset && (
                <div className="space-y-4">
                  <Label className="text-[10px] font-black text-slate-400 uppercase tracking-wider border-b pb-2 flex w-full">Asset Details Reference</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                     <div className="space-y-1">
                        <span className="text-[10px] text-slate-500 font-medium">Asset Code</span>
                        <p className="font-mono text-xs font-bold text-slate-900">{asset.code}</p>
                     </div>
                     <div className="space-y-1">
                        <span className="text-[10px] text-slate-500 font-medium">Category</span>
                        <p className="text-xs font-bold text-slate-900">{asset.category}</p>
                     </div>
                     <div className="space-y-1">
                        <span className="text-[10px] text-slate-500 font-medium">Initial Condition</span>
                        <p className="text-xs font-bold text-slate-900">{asset.condition}</p>
                     </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* TAB: CHECKLIST */}
          <TabsContent value="checklist" className="m-0 p-0">
             <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">Maintenance Checklist</h3>
                    <p className="text-sm text-slate-500 font-medium">Required tasks to complete this work order.</p>
                  </div>
                  <Button variant="outline" size="sm" className="h-8">Load Template</Button>
                </div>

                <div className="rounded-lg border border-slate-200 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-slate-50">
                      <TableRow>
                        <TableHead className="w-[50px]"></TableHead>
                        <TableHead className="text-xs font-bold text-slate-600">Task Description</TableHead>
                        <TableHead className="text-xs font-bold text-slate-600 w-[200px]">Status</TableHead>
                        <TableHead className="text-xs font-bold text-slate-600">Technician Notes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { id: 1, task: "Visual inspection for leaks or damage", checked: wo.status === 'Completed' },
                        { id: 2, task: "Clean components and surrounding area", checked: wo.status === 'Completed' },
                        { id: 3, task: "Apply lubrication to moving parts", checked: false },
                        { id: 4, task: "Perform functional test under load", checked: false },
                      ].map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <Checkbox defaultChecked={item.checked} />
                          </TableCell>
                          <TableCell className="font-medium text-slate-800">{item.task}</TableCell>
                          <TableCell>
                            <Badge variant={item.checked ? "success" : "outline"} className={item.checked ? "" : "text-slate-400 border-slate-200 bg-transparent"}>
                              {item.checked ? "DONE" : "PENDING"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Input placeholder="Add notes..." className="h-8 text-xs border-slate-200" disabled={wo.status === 'Closed'} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
             </div>
          </TabsContent>

          {/* TAB: SPAREPART USAGE */}
          <TabsContent value="spareparts" className="m-0 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight">Sparepart Usage</h3>
                <p className="text-sm text-slate-500 font-medium">Record any materials or parts consumed during maintenance.</p>
              </div>
              <Button size="sm" onClick={addSparePartRow} className="bg-blue-600 hover:bg-blue-700 h-8 gap-1">
                <Plus className="h-4 w-4" /> Add Row
              </Button>
            </div>

            <div className="rounded-lg border border-slate-200 overflow-hidden">
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow>
                    <TableHead className="text-xs font-bold text-slate-600 w-[250px]">Select Sparepart</TableHead>
                    <TableHead className="text-xs font-bold text-slate-600 w-[120px]">Quantity</TableHead>
                    <TableHead className="text-xs font-bold text-slate-600">Notes / Reason</TableHead>
                    <TableHead className="text-xs font-bold text-slate-600 w-[80px] text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usedSpareParts.map((sp, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Select>
                          <SelectTrigger className="border-slate-200">
                            <SelectValue placeholder="Select item..." />
                          </SelectTrigger>
                          <SelectContent>
                            {spareParts.map(part => (
                              <SelectItem key={part.code} value={part.code}>{part.name} ({part.code})</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                           <Input type="number" defaultValue={sp.qty} min={1} className="w-16 border-slate-200 text-center" />
                           <span className="text-xs text-slate-500 font-medium">Unit</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Input placeholder="Enter reason for usage..." className="border-slate-200" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="icon" onClick={() => removeSparePartRow(index)} className="h-8 w-8 text-red-400 hover:text-red-600 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {usedSpareParts.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-slate-400 italic py-8">
                        No spareparts recorded. Click 'Add Row' to record usage.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
            {usedSpareParts.length > 0 && (
              <div className="mt-4 flex justify-end">
                <Button variant="outline" className="border-blue-200 text-blue-700 bg-blue-50">Save Sparepart Records</Button>
              </div>
            )}
          </TabsContent>

          {/* TAB: WORK LOG */}
          <TabsContent value="worklog" className="m-0 p-8">
            <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-wider text-slate-500">Technician Work Notes</Label>
                    <Textarea placeholder="Detail the actual work performed, findings, and resolutions..." className="border-slate-200 min-h-[150px]" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-wider text-slate-500">Actual Start Time</Label>
                      <Input type="datetime-local" className="border-slate-200 text-xs" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-wider text-slate-500">Actual End Time</Label>
                      <Input type="datetime-local" className="border-slate-200 text-xs" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-wider text-slate-500">Asset Condition After Maintenance</Label>
                    <Select defaultValue={asset?.condition}>
                      <SelectTrigger className="border-slate-200">
                        <SelectValue placeholder="Select final condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Good">Good - Operational</SelectItem>
                        <SelectItem value="Warning">Warning - Usable with monitoring</SelectItem>
                        <SelectItem value="Critical">Critical - Requires further action</SelectItem>
                        <SelectItem value="Need Replacement">Need Replacement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
               </div>

               <div className="space-y-6">
                 <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
                      <Upload className="h-4 w-4" /> Photo Evidence
                    </Label>
                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                       <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                         <Upload className="h-5 w-5" />
                       </div>
                       <p className="text-sm font-bold text-slate-700">Click to upload photos</p>
                       <p className="text-xs text-slate-500 mt-1">or drag and drop here (Max 5MB)</p>
                    </div>
                 </div>

                 <Button className="w-full bg-pelni-blue hover:bg-pelni-blue/90">
                   Submit Work Log
                 </Button>
               </div>
            </div>
          </TabsContent>

          {/* TAB: HISTORY */}
          <TabsContent value="history" className="m-0 p-8">
            <div className="max-w-2xl">
              <h3 className="text-lg font-black text-slate-900 tracking-tight mb-6">Work Order History Log</h3>
              
              <div className="space-y-6">
                {[
                  { user: "System", action: "Status changed to In Progress", time: "05 May 2026, 09:30", color: "bg-blue-500" },
                  { user: "Ahmad Fauzi", action: "Checklist updated", time: "05 May 2026, 09:15", color: "bg-slate-500" },
                  { user: "Supervisor Eng", action: "Assigned to Technician", time: "04 May 2026, 14:20", color: "bg-indigo-500" },
                  { user: "Admin", action: "Work Order Created", time: "04 May 2026, 10:00", color: "bg-slate-300" },
                ].map((log, i) => (
                  <div key={i} className="flex gap-4 items-start border-b border-slate-50 pb-4 last:border-0 relative">
                    {i !== 3 && <div className="absolute left-[15px] top-[32px] bottom-[-24px] w-0.5 bg-slate-100"></div>}
                    <div className={cn("h-8 w-8 rounded-full flex items-center justify-center text-white shrink-0 shadow-sm relative z-10", log.color)}>
                      <Activity className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col gap-0.5 pt-1">
                      <p className="text-sm font-bold text-slate-900">{log.action}</p>
                      <p className="text-[10px] text-slate-500 font-medium">By <span className="font-bold text-slate-700">{log.user}</span> • {log.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

        </div>
      </Tabs>
    </div>
  );
}
