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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ArrowLeft, 
  Printer,
  MoreVertical,
  Activity,
  CheckCircle2,
  AlertCircle,
  ScanLine,
  Upload,
  UserCheck,
  ClipboardCheck,
  AlertTriangle,
  History,
  FileCheck,
  Search
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  stockOpnameDocuments,
  stockOpnameAssets,
  varianceSummary
} from "../stock-opname-data";
import { StatusBadge } from "@/components/eam/status-badge";
import { cn } from "@/lib/utils";

export default function StockOpnameDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const doc = stockOpnameDocuments.find(d => d.id === id) || stockOpnameDocuments[0];

  const [activeTab, setActiveTab] = useState("general");

  const progressPct = doc.totalAsset > 0 ? Math.round((doc.checked / doc.totalAsset) * 100) : 0;

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
          title={`Stock Opname: ${doc.id}`}
          description={`Physical verification for ${doc.location} (${doc.period}).`}
        />
        <div className="ml-auto flex gap-2">
          {doc.status === 'Draft' && (
            <Button className="bg-pelni-blue hover:bg-pelni-blue/90">
                Generate Asset List
            </Button>
          )}
          {doc.status === 'In Progress' && (
             <Button className="bg-blue-600 hover:bg-blue-700">
                Submit Review
             </Button>
          )}
          <Button variant="outline" className="gap-2 border-slate-200">
            <Printer className="h-4 w-4" /> Print Report
          </Button>
          <Button variant="ghost" size="icon" className="border border-slate-200">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Header Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Stock Opname Header</span>
            <StatusBadge status={doc.status} />
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
            <div className="space-y-1">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">SO Number</Label>
              <p className="font-bold text-blue-600">{doc.id}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">Audit Period</Label>
              <p className="font-bold text-slate-900">{doc.period}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">Location</Label>
              <p className="font-bold text-slate-900">{doc.location}</p>
            </div>
            
            <div className="space-y-1">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">Category Filter</Label>
              <p className="font-bold text-slate-900">{doc.category}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">Assigned Officer</Label>
              <p className="font-bold text-slate-900">{doc.officer}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">Review Supervisor</Label>
              <p className="font-bold text-slate-900">{doc.supervisor}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col justify-center space-y-4">
            <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em] text-center w-full block">Inspection Progress</Label>
            <div className="flex flex-col items-center">
                <div className="text-3xl font-black text-slate-900 mb-2">
                    {progressPct}%
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                        className={`h-full ${progressPct === 100 ? 'bg-green-500' : 'bg-blue-500'}`} 
                        style={{ width: `${progressPct}%` }}
                    />
                </div>
                <div className="flex justify-between w-full mt-2 text-xs font-bold text-slate-500">
                    <span>{doc.checked} Checked</span>
                    <span>{doc.totalAsset} Total</span>
                </div>
            </div>
            {doc.variance > 0 && (
                <div className="mt-2 bg-red-50 border border-red-100 rounded-lg p-2 flex items-center justify-center gap-2 text-red-700 text-xs font-bold">
                    <AlertTriangle className="h-4 w-4" />
                    {doc.variance} Variances Found
                </div>
            )}
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
              Asset Checklist
            </TabsTrigger>
            <TabsTrigger value="variance" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-pelni-blue data-[state=active]:text-pelni-blue data-[state=active]:shadow-none rounded-none px-6 text-slate-500 font-bold text-xs uppercase tracking-wider h-full transition-all flex items-center gap-2">
              Variance Report
              {doc.variance > 0 && <Badge variant="destructive" className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]">{doc.variance}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="approval" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-pelni-blue data-[state=active]:text-pelni-blue data-[state=active]:shadow-none rounded-none px-6 text-slate-500 font-bold text-xs uppercase tracking-wider h-full transition-all flex items-center gap-2">
              <UserCheck className="h-4 w-4" /> Approval
            </TabsTrigger>
            <TabsTrigger value="audit" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-pelni-blue data-[state=active]:text-pelni-blue data-[state=active]:shadow-none rounded-none px-6 text-slate-500 font-bold text-xs uppercase tracking-wider h-full transition-all">
              Audit Trail
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="bg-white rounded-b-xl border border-slate-200 shadow-sm min-h-[400px]">
          {/* TAB: GENERAL INFO */}
          <TabsContent value="general" className="m-0 p-8">
            <div className="max-w-3xl space-y-8">
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Description / Notes</Label>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 min-h-[100px]">
                  <p className="text-sm text-slate-700 font-medium italic opacity-60">No specific instructions provided.</p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* TAB: ASSET CHECKLIST */}
          <TabsContent value="checklist" className="m-0 p-0">
             <div className="p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 flex-1 min-w-[250px]">
                     <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input placeholder="Search asset ID or name..." className="pl-9 h-9 border-slate-200" />
                     </div>
                     <Select defaultValue="all">
                        <SelectTrigger className="w-[150px] h-9 border-slate-200">
                           <SelectValue placeholder="Status Filter" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="all">All Status</SelectItem>
                           <SelectItem value="Pending">Pending Check</SelectItem>
                           <SelectItem value="Found">Found</SelectItem>
                           <SelectItem value="Not Found">Not Found</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
                  <div className="flex items-center gap-2">
                     <Button variant="outline" size="sm" className="h-9 gap-2">
                        <ScanLine className="h-4 w-4" /> Scan QR
                     </Button>
                     <Button size="sm" className="h-9 gap-2 bg-blue-600 hover:bg-blue-700">
                        <CheckCircle2 className="h-4 w-4" /> Bulk Mark Found
                     </Button>
                  </div>
                </div>

                <div className="rounded-lg border border-slate-200 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-slate-50">
                      <TableRow>
                        <TableHead className="w-[40px] text-center">
                           <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                        </TableHead>
                        <TableHead className="text-[11px] font-black uppercase text-slate-500 tracking-wider">Asset Info</TableHead>
                        <TableHead className="text-[11px] font-black uppercase text-slate-500 tracking-wider">System Location</TableHead>
                        <TableHead className="text-[11px] font-black uppercase text-slate-500 tracking-wider">Actual Status</TableHead>
                        <TableHead className="text-[11px] font-black uppercase text-slate-500 tracking-wider">Physical Verification</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {stockOpnameAssets.map((asset) => (
                        <TableRow key={asset.assetId} className="hover:bg-slate-50/50">
                          <TableCell className="text-center">
                             <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                          </TableCell>
                          <TableCell>
                             <div className="flex flex-col">
                                <span className="font-bold text-slate-900">{asset.assetName}</span>
                                <span className="text-xs text-slate-500 font-mono">{asset.assetId}</span>
                             </div>
                          </TableCell>
                          <TableCell>
                             <div className="flex flex-col">
                                <span className="text-sm font-medium text-slate-700">{asset.systemLocation}</span>
                                <span className="text-[10px] text-slate-400">Condition: {asset.systemCondition}</span>
                             </div>
                          </TableCell>
                          <TableCell>
                             <Select defaultValue={asset.foundStatus}>
                                <SelectTrigger className="w-[120px] h-8 text-xs border-slate-200 font-bold bg-white">
                                   <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                   <SelectItem value="Pending">Pending</SelectItem>
                                   <SelectItem value="Found">Found</SelectItem>
                                   <SelectItem value="Not Found">Not Found</SelectItem>
                                </SelectContent>
                             </Select>
                          </TableCell>
                          <TableCell>
                             <div className="flex flex-col gap-2 p-1">
                                {asset.foundStatus === 'Found' && (
                                   <>
                                      <div className="grid grid-cols-2 gap-2">
                                         <Input placeholder="Actual Location..." defaultValue={asset.actualLocation} className="h-8 text-xs border-slate-200 bg-white" />
                                         <Select defaultValue={asset.actualCondition}>
                                            <SelectTrigger className="h-8 text-xs border-slate-200 bg-white">
                                               <SelectValue placeholder="Condition" />
                                            </SelectTrigger>
                                            <SelectContent>
                                               <SelectItem value="Good">Good</SelectItem>
                                               <SelectItem value="Warning">Warning</SelectItem>
                                               <SelectItem value="Critical">Critical</SelectItem>
                                               <SelectItem value="Need Replacement">Need Replacement</SelectItem>
                                            </SelectContent>
                                         </Select>
                                      </div>
                                      <div className="flex gap-2">
                                         <Input placeholder="Notes..." defaultValue={asset.notes} className="h-8 text-xs border-slate-200 flex-1 bg-white" />
                                         <Button variant="outline" size="icon" className="h-8 w-8 shrink-0 bg-white border-slate-200">
                                            <Upload className="h-3 w-3 text-slate-500" />
                                         </Button>
                                      </div>
                                   </>
                                )}
                             </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
             </div>
          </TabsContent>

          {/* TAB: VARIANCE */}
          <TabsContent value="variance" className="m-0 p-6">
            <div className="grid grid-cols-4 gap-4 mb-6">
               <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex flex-col justify-center items-center">
                  <span className="text-2xl font-black text-slate-900">{varianceSummary.total}</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Total Variances</span>
               </div>
               <div className="bg-red-50 border border-red-100 rounded-lg p-4 flex flex-col justify-center items-center">
                  <span className="text-2xl font-black text-red-700">{varianceSummary.missing}</span>
                  <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest mt-1">Missing Assets</span>
               </div>
               <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 flex flex-col justify-center items-center">
                  <span className="text-2xl font-black text-amber-700">{varianceSummary.location}</span>
                  <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mt-1">Location Mismatch</span>
               </div>
               <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex flex-col justify-center items-center">
                  <span className="text-2xl font-black text-blue-700">{varianceSummary.condition}</span>
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1">Condition Mismatch</span>
               </div>
            </div>

            <div className="rounded-lg border border-slate-200 overflow-hidden">
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow>
                    <TableHead className="text-[11px] font-black uppercase text-slate-500 tracking-wider">Asset</TableHead>
                    <TableHead className="text-[11px] font-black uppercase text-slate-500 tracking-wider">Variance Type</TableHead>
                    <TableHead className="text-[11px] font-black uppercase text-slate-500 tracking-wider">System Record</TableHead>
                    <TableHead className="text-[11px] font-black uppercase text-slate-500 tracking-wider">Actual Record</TableHead>
                    <TableHead className="text-[11px] font-black uppercase text-slate-500 tracking-wider">Severity</TableHead>
                    <TableHead className="text-[11px] font-black uppercase text-slate-500 tracking-wider text-right">Recommendation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stockOpnameAssets.filter(a => a.varianceType !== 'None').map((asset, index) => (
                    <TableRow key={index} className="hover:bg-slate-50">
                      <TableCell>
                         <div className="flex flex-col">
                            <span className="font-bold text-slate-900">{asset.assetName}</span>
                            <span className="text-xs text-slate-500 font-mono">{asset.assetId}</span>
                         </div>
                      </TableCell>
                      <TableCell>
                         <Badge variant="outline" className={cn(
                            "font-bold uppercase text-[9px]",
                            asset.varianceType === 'Missing' ? "border-red-200 text-red-700 bg-red-50" :
                            asset.varianceType === 'Location' ? "border-amber-200 text-amber-700 bg-amber-50" :
                            "border-blue-200 text-blue-700 bg-blue-50"
                         )}>
                            {asset.varianceType}
                         </Badge>
                      </TableCell>
                      <TableCell>
                         <span className="text-xs font-medium text-slate-500 line-through">
                            {asset.varianceType === 'Missing' ? 'Exists in system' : 
                             asset.varianceType === 'Location' ? asset.systemLocation : 
                             asset.systemCondition}
                         </span>
                      </TableCell>
                      <TableCell>
                         <span className="text-xs font-bold text-slate-900">
                            {asset.varianceType === 'Missing' ? 'Not Found' : 
                             asset.varianceType === 'Location' ? asset.actualLocation : 
                             asset.actualCondition}
                         </span>
                      </TableCell>
                      <TableCell>
                          <Badge variant={asset.varianceType === 'Missing' ? 'destructive' : 'warning'} className="text-[9px] px-1.5 py-0">
                            {asset.varianceType === 'Missing' ? 'HIGH' : 'MEDIUM'}
                          </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                         <Select defaultValue={asset.varianceType === 'Missing' ? 'investigate' : 'update'}>
                            <SelectTrigger className="w-[140px] h-8 text-[10px] font-bold border-slate-200 bg-white ml-auto">
                               <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                               <SelectItem value="update" className="text-[10px] font-bold">Update System Data</SelectItem>
                               <SelectItem value="investigate" className="text-[10px] font-bold">Requires Investigation</SelectItem>
                               <SelectItem value="ignore" className="text-[10px] font-bold">Ignore Variance</SelectItem>
                            </SelectContent>
                         </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* TAB: APPROVAL */}
          <TabsContent value="approval" className="m-0 p-8">
            <div className="max-w-2xl bg-slate-50 rounded-xl border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-4">
                    <ClipboardCheck className="h-6 w-6 text-pelni-blue" />
                    <div>
                        <h3 className="font-black text-slate-900 text-lg">Supervisor Review</h3>
                        <p className="text-xs font-medium text-slate-500">Review findings and variance recommendations before finalizing.</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label className="text-xs font-bold text-slate-700">Review Notes</Label>
                        <Textarea placeholder="Add any comments regarding the variances or physical checking process..." className="min-h-[120px] bg-white border-slate-200" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <Button variant="outline" className="border-amber-200 text-amber-700 bg-amber-50 hover:bg-amber-100 font-bold h-10">
                            Request Revision
                        </Button>
                        <Button className="bg-green-600 hover:bg-green-700 font-bold h-10 gap-2">
                            <CheckCircle2 className="h-4 w-4" /> Approve & Finalize
                        </Button>
                    </div>
                </div>
            </div>
          </TabsContent>

          {/* TAB: AUDIT TRAIL */}
          <TabsContent value="audit" className="m-0 p-8">
            <div className="max-w-2xl">
              <h3 className="text-lg font-black text-slate-900 tracking-tight mb-6">Stock Opname History Log</h3>
              
              <div className="space-y-6">
                {[
                  { user: "Supervisor Teknik", action: "Assigned Officer", time: "05 May 2026, 09:30", color: "bg-indigo-500" },
                  { user: "Petugas Aset 01", action: "Started Physical Check", time: "05 May 2026, 09:45", color: "bg-blue-500" },
                  { user: "Petugas Aset 01", action: "Updated Asset Results (20 items)", time: "05 May 2026, 14:20", color: "bg-slate-500" },
                  { user: "Admin", action: "Stock Opname Plan Created", time: "04 May 2026, 10:00", color: "bg-slate-300" },
                ].map((log, i) => (
                  <div key={i} className="flex gap-4 items-start border-b border-slate-50 pb-4 last:border-0 relative">
                    {i !== 3 && <div className="absolute left-[15px] top-[32px] bottom-[-24px] w-0.5 bg-slate-100"></div>}
                    <div className={cn("h-8 w-8 rounded-full flex items-center justify-center text-white shrink-0 shadow-sm relative z-10", log.color)}>
                      <History className="h-4 w-4" />
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
