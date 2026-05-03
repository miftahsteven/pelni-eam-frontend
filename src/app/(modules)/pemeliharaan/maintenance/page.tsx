"use client";

import { ModuleHeader } from "@/components/module-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  MoreHorizontal,
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  CalendarDays,
  Activity
} from "lucide-react";
import Link from "next/link";
import { workOrders, maintenanceSummary } from "./maintenance-data";
import { StatusBadge } from "@/components/eam/status-badge";

export default function MaintenanceDashboardPage() {
  return (
    <div className="space-y-6 pb-12">
      <ModuleHeader
        title="2.5.1 Maintenance"
        description="Dashboard and Work Order Management for Asset Maintenance."
        actionLabel="Create Work Order"
        onAction={() => window.location.href = "/pemeliharaan/maintenance/create"}
      />

      {/* DASHBOARD SUMMARY CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total WO</span>
          <span className="text-3xl font-black text-slate-900">{maintenanceSummary.totalWorkOrders}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-1"><FileText className="h-3 w-3" /> Open</span>
          <span className="text-3xl font-black text-slate-700">{maintenanceSummary.open}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-1"><Activity className="h-3 w-3" /> Assigned</span>
          <span className="text-3xl font-black text-indigo-600">{maintenanceSummary.assigned}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-1"><Clock className="h-3 w-3" /> In Progress</span>
          <span className="text-3xl font-black text-blue-600">{maintenanceSummary.inProgress}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Completed</span>
          <span className="text-3xl font-black text-green-600">{maintenanceSummary.completed}</span>
        </div>
        <div className="bg-red-50 p-4 rounded-xl border border-red-200 shadow-sm flex flex-col justify-center">
          <span className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-1 flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> Critical</span>
          <span className="text-3xl font-black text-red-700">{maintenanceSummary.critical}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* CALENDAR & RECENT WIDGET */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <CalendarDays className="h-5 w-5 text-pelni-blue" />
              <h3 className="font-black text-slate-900 tracking-tight">Maintenance Calendar</h3>
            </div>
            {/* Simplified Calendar UI for Demo */}
            <div className="border border-slate-100 rounded-lg overflow-hidden">
               <div className="bg-slate-50 p-2 text-center border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-700">May 2026</span>
               </div>
               <div className="p-3 flex flex-col gap-2">
                 <div className="p-2 bg-blue-50 border border-blue-100 rounded text-xs">
                    <span className="font-bold text-blue-700 block">5 May</span>
                    <span className="text-blue-600 line-clamp-1">WO-2026-0001 - Preventive</span>
                 </div>
                 <div className="p-2 bg-red-50 border border-red-100 rounded text-xs">
                    <span className="font-bold text-red-700 block">6 May</span>
                    <span className="text-red-600 line-clamp-1">WO-2026-0002 - Corrective</span>
                 </div>
                 <div className="p-2 bg-slate-50 border border-slate-100 rounded text-xs text-center text-slate-500 font-medium">
                    + 3 more scheduled
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* WORK ORDER LIST */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-end bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex-1 space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Search Work Order</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input placeholder="Search by WO No, Asset Name..." className="pl-9 bg-slate-50/50 border-slate-200 focus:ring-pelni-blue/20" />
              </div>
            </div>
            
            <div className="w-full md:w-40 space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Type</label>
              <Select defaultValue="all">
                <SelectTrigger className="bg-slate-50/50 border-slate-200">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Preventive">Preventive</SelectItem>
                  <SelectItem value="Corrective">Corrective</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full md:w-40 space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Status</label>
              <Select defaultValue="all">
                <SelectTrigger className="bg-slate-50/50 border-slate-200">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="Assigned">Assigned</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" className="gap-2 border-slate-200 text-slate-600 hover:bg-slate-50">
              <Filter className="h-4 w-4" /> Filters
            </Button>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50/80">
                <TableRow className="hover:bg-transparent border-slate-200">
                  <TableHead className="font-bold text-slate-700">WO Number</TableHead>
                  <TableHead className="font-bold text-slate-700">Asset Detail</TableHead>
                  <TableHead className="font-bold text-slate-700">Type & Priority</TableHead>
                  <TableHead className="font-bold text-slate-700">Schedule</TableHead>
                  <TableHead className="font-bold text-slate-700">Status</TableHead>
                  <TableHead className="font-bold text-slate-700 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workOrders.map((wo) => (
                  <TableRow key={wo.id} className="hover:bg-slate-50/50 transition-colors border-slate-100">
                    <TableCell className="font-bold text-blue-600 tracking-tight">
                      <Link href={`/pemeliharaan/maintenance/${wo.id}`} className="hover:underline">
                        {wo.id}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900">{wo.assetName}</span>
                        <span className="text-[10px] text-slate-500 font-medium">{wo.vessel} • {wo.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1 items-start">
                        <span className="text-xs font-medium text-slate-700">{wo.type}</span>
                        <Badge variant={
                          wo.priority === 'Critical' ? 'destructive' : 
                          wo.priority === 'High' ? 'warning' : 
                          wo.priority === 'Medium' ? 'default' : 'success'
                        } className="text-[9px] px-1.5 py-0">
                          {wo.priority.toUpperCase()}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                         <span className="font-medium text-slate-700">{wo.scheduleDate}</span>
                         <span className="text-[10px] text-slate-400">{wo.technician[0]}{wo.technician.length > 1 ? ` +${wo.technician.length - 1}` : ''}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={wo.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                          render={
                            <Link href={`/pemeliharaan/maintenance/${wo.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          }
                        />
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-amber-600 hover:bg-amber-50">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
