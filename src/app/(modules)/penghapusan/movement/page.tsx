"use client";

import React from "react";
import { ModuleHeader } from "@/components/module-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Truck,
  FileText,
  Clock,
  CheckCircle2,
  RefreshCw,
  Plus,
  Eye,
  ChevronRight,
  MoreVertical
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { movementRequests, summaryStats, MovementStatus } from "./movement-data";
import { cn } from "@/lib/utils";

const StatusBadge = ({ status }: { status: MovementStatus }) => {
  const styles = {
    'Draft': 'bg-slate-100 text-slate-600 border-slate-200',
    'Submitted': 'bg-blue-50 text-blue-700 border-blue-200',
    'Under Review': 'bg-yellow-50 text-yellow-700 border-yellow-200',
    'Approved': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Rejected': 'bg-red-50 text-red-700 border-red-200',
    'In Transit': 'bg-purple-50 text-purple-700 border-purple-200',
    'Completed': 'bg-green-100 text-green-800 border-green-300',
    'Cancelled': 'bg-slate-100 text-slate-500 border-slate-200',
  };

  return (
    <Badge variant="outline" className={cn("text-[10px] font-bold uppercase tracking-wider", styles[status])}>
      {status}
    </Badge>
  );
};

export default function MovementDashboardPage() {
  const router = useRouter();

  return (
    <div className="space-y-6 pb-12">
      <ModuleHeader
        title="Movement Request"
        description="Kelola proses perpindahan aset antar lokasi, cabang, atau kapal."
        actionLabel="Create Movement"
        onAction={() => router.push('/penghapusan/movement/create')}
        icon={<Truck className="h-4 w-4" />}
      >
        <Button 
          variant="outline" 
          className="gap-2 border-slate-200 shadow-sm"
          render={
            <Link href="/penghapusan/movement/approval">
              <CheckCircle2 className="h-4 w-4 text-slate-500" /> Approval Queue
              <Badge className="ml-1 h-5 px-1.5 bg-red-500 text-white font-mono text-[10px]">{summaryStats.pendingApproval}</Badge>
            </Link>
          }
        />
      </ModuleHeader>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-1"><FileText className="h-3 w-3" /> Total Movement</span>
          <span className="text-3xl font-black text-slate-900">{summaryStats.total}</span>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1 flex items-center gap-1">Draft</span>
          <span className="text-3xl font-black text-slate-700">{summaryStats.draft}</span>
        </div>
        <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 shadow-sm flex flex-col justify-center">
          <span className="text-[10px] font-black text-yellow-700 uppercase tracking-widest mb-1 flex items-center gap-1"><Clock className="h-3 w-3" /> Pending Approval</span>
          <span className="text-3xl font-black text-yellow-800">{summaryStats.pendingApproval}</span>
        </div>
        <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 shadow-sm flex flex-col justify-center">
          <span className="text-[10px] font-black text-purple-700 uppercase tracking-widest mb-1 flex items-center gap-1"><Truck className="h-3 w-3" /> In Transit</span>
          <span className="text-3xl font-black text-purple-800">{summaryStats.inTransit}</span>
        </div>
        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 shadow-sm flex flex-col justify-center">
          <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest mb-1 flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Completed (Month)</span>
          <span className="text-3xl font-black text-emerald-800">{summaryStats.completedThisMonth}</span>
        </div>
      </div>

      {/* FILTER PANEL */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="space-y-1.5 lg:col-span-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1">Search Request</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Search request no, asset code, or name..." className="pl-9 bg-slate-50 border-slate-200 h-9 text-sm" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1">Status</label>
            <Select defaultValue="all">
              <SelectTrigger className="bg-slate-50 border-slate-200 h-9 text-sm">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="intransit">In Transit</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1">Movement Type</label>
            <Select defaultValue="all">
              <SelectTrigger className="bg-slate-50 border-slate-200 h-9 text-sm">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="operational">Operational Transfer</SelectItem>
                <SelectItem value="maintenance">Maintenance Transfer</SelectItem>
                <SelectItem value="disposal">Disposal Preparation</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1">Location</label>
            <Select defaultValue="all">
              <SelectTrigger className="bg-slate-50 border-slate-200 h-9 text-sm">
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="jkt">Central Warehouse JKT</SelectItem>
                <SelectItem value="sby">Surabaya Branch</SelectItem>
                <SelectItem value="dobonsolo">KM Dobonsolo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-slate-100">
          <Button variant="ghost" size="sm" className="text-xs font-bold text-slate-500 hover:text-slate-800">
            Reset Filters
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-slate-200 shadow-sm">
              <RefreshCw className="h-3.5 w-3.5 text-slate-500" />
            </Button>
            <Button size="sm" className="h-8 gap-2 bg-slate-800 hover:bg-slate-900 text-xs shadow-sm">
              <Filter className="h-3.5 w-3.5" /> Apply Filters
            </Button>
          </div>
        </div>
      </div>

      {/* DATA TABLE */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50 border-b border-slate-200">
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Request No</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Asset Identity</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Movement Route</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Movement Type</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Requester & Date</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Status</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {movementRequests.map((req) => (
              <TableRow key={req.id} className="hover:bg-slate-50/80 border-slate-100 group">
                <TableCell>
                  <Link href={`/penghapusan/movement/${req.id}`} className="font-bold text-blue-600 hover:underline text-sm font-mono tracking-tight">
                    {req.requestNo}
                  </Link>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-bold text-slate-900 text-xs truncate max-w-[180px]">{req.assetName}</span>
                    <span className="text-[10px] text-slate-500 font-mono tracking-tight">{req.assetCode}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1 max-w-[220px]">
                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <div className="h-1.5 w-1.5 rounded-full bg-slate-300 shrink-0"></div>
                      <span className="truncate" title={req.currentLocation}>{req.currentLocation}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-900">
                      <div className="h-1.5 w-1.5 rounded-full bg-pelni-blue shrink-0"></div>
                      <span className="truncate" title={req.destinationLocation}>{req.destinationLocation}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-xs font-medium text-slate-700 bg-slate-100 px-2 py-1 rounded-md">{req.movementType}</span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-medium text-slate-900">{req.requester}</span>
                    <span className="text-[10px] text-slate-500">{req.movementDate.split('T')[0]}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <StatusBadge status={req.status} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                      render={
                        <Link href={`/penghapusan/movement/${req.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      }
                    />
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-900 hover:bg-slate-100">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="bg-slate-50 border-t border-slate-200 px-4 py-3 flex justify-between items-center text-xs text-slate-500 font-medium">
          <span>Showing 1 to 15 of 128 entries</span>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" className="h-7 px-2 text-[10px] bg-white">Prev</Button>
            <Button variant="outline" size="sm" className="h-7 px-2 text-[10px] bg-slate-800 text-white hover:bg-slate-700 hover:text-white">1</Button>
            <Button variant="outline" size="sm" className="h-7 px-2 text-[10px] bg-white">2</Button>
            <Button variant="outline" size="sm" className="h-7 px-2 text-[10px] bg-white">3</Button>
            <span className="px-2 py-1">...</span>
            <Button variant="outline" size="sm" className="h-7 px-2 text-[10px] bg-white">9</Button>
            <Button variant="outline" size="sm" className="h-7 px-2 text-[10px] bg-white">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
