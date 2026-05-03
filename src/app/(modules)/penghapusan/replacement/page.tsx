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
  Repeat,
  FileText,
  Clock,
  CheckCircle2,
  RefreshCw,
  Eye,
  Plus,
  ShoppingCart,
  Wrench
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { replacementRequests, summaryStats, ReplacementStatus } from "./replacement-data";
import { cn } from "@/lib/utils";

const StatusBadge = ({ status }: { status: ReplacementStatus }) => {
  const styles: Record<string, string> = {
    'Draft': 'bg-slate-100 text-slate-600 border-slate-200',
    'Submitted': 'bg-blue-50 text-blue-700 border-blue-200',
    'Technical Review': 'bg-amber-50 text-amber-700 border-amber-200',
    'Approved': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Rejected': 'bg-red-50 text-red-700 border-red-200',
    'Waiting Procurement': 'bg-purple-50 text-purple-700 border-purple-200',
    'Waiting Installation': 'bg-orange-50 text-orange-700 border-orange-200',
    'Completed': 'bg-green-600 text-white border-green-700',
    'Pending Disposal': 'bg-slate-700 text-white border-slate-800',
  };

  const style = styles[status] || 'bg-slate-50 text-slate-500 border-slate-200';

  return (
    <Badge variant="outline" className={cn("text-[10px] font-bold uppercase tracking-wider", style)}>
      {status}
    </Badge>
  );
};

export default function ReplacementDashboardPage() {
  const router = useRouter();

  return (
    <div className="space-y-6 pb-12">
      <ModuleHeader
        title="Asset Replacement"
        description="Kelola permintaan penggantian aset lama dengan aset baru atau stok tersedia."
        actionLabel="Create Replacement"
        onAction={() => router.push('/penghapusan/replacement/create')}
        icon={<Repeat className="h-4 w-4" />}
      />

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-1"><FileText className="h-3 w-3" /> Total Requests</span>
          <span className="text-3xl font-black text-slate-900">{summaryStats.total}</span>
        </div>
        <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 shadow-sm flex flex-col justify-center">
          <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest mb-1 flex items-center gap-1"><Clock className="h-3 w-3" /> Pending Approval</span>
          <span className="text-3xl font-black text-amber-800">{summaryStats.pendingApproval}</span>
        </div>
        <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 shadow-sm flex flex-col justify-center">
          <span className="text-[10px] font-black text-purple-700 uppercase tracking-widest mb-1 flex items-center gap-1"><ShoppingCart className="h-3 w-3" /> Waiting Procurement</span>
          <span className="text-3xl font-black text-purple-800">{summaryStats.waitingProcurement}</span>
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
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1">Search Document</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Search request no, asset code..." className="pl-9 bg-slate-50 border-slate-200 h-9 text-sm" />
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
                <SelectItem value="technical">Technical Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="procurement">Waiting Procurement</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1">Replacement Type</label>
            <Select defaultValue="all">
              <SelectTrigger className="bg-slate-50 border-slate-200 h-9 text-sm">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="existing">Existing Asset</SelectItem>
                <SelectItem value="procurement">New Procurement</SelectItem>
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
                <SelectItem value="jkt">Jakarta</SelectItem>
                <SelectItem value="sby">Surabaya</SelectItem>
                <SelectItem value="kapal">All Vessels</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* DATA TABLE */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50 border-b border-slate-200">
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Request No</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Old Asset</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Type</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Requester</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Date</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Status</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {replacementRequests.map((req) => (
              <TableRow key={req.id} className="hover:bg-slate-50/80 border-slate-100 group">
                <TableCell>
                  <Link href={`/penghapusan/replacement/${req.id}`} className="font-bold text-blue-600 hover:underline text-sm font-mono tracking-tight">
                    {req.requestNo}
                  </Link>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-bold text-slate-900 text-xs truncate max-w-[180px]">{req.oldAssetName}</span>
                    <span className="text-[10px] text-slate-500 font-mono tracking-tight">{req.oldAssetCode}</span>
                  </div>
                </TableCell>
                <TableCell>
                   <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
                      {req.replacementType === 'New Procurement' ? <ShoppingCart className="h-3 w-3 text-purple-500" /> : <RefreshCw className="h-3 w-3 text-blue-500" />}
                      {req.replacementType}
                   </div>
                </TableCell>
                <TableCell>
                  <span className="text-xs font-medium text-slate-900">{req.requester}</span>
                </TableCell>
                <TableCell>
                  <span className="text-xs text-slate-500">{req.requestDate}</span>
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
                        <Link href={`/penghapusan/replacement/${req.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      }
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
