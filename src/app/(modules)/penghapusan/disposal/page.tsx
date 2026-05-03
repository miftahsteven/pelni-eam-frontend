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
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Trash2, 
  Clock, 
  CheckCircle2, 
  Wrench,
  Eye,
  FileText,
  AlertTriangle,
  History,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { disposalRequests, summaryStats, DisposalStatus } from "./disposal-data";
import { cn } from "@/lib/utils";

const StatusBadge = ({ status }: { status: DisposalStatus }) => {
  const styles: Record<string, string> = {
    'Draft': 'bg-slate-100 text-slate-600 border-slate-200',
    'Submitted': 'bg-blue-50 text-blue-700 border-blue-200',
    'Technical Review': 'bg-amber-50 text-amber-700 border-amber-200',
    'Finance Review': 'bg-purple-50 text-purple-700 border-purple-200',
    'Approved': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Rejected': 'bg-red-50 text-red-700 border-red-200',
    'Dismantling': 'bg-orange-50 text-orange-700 border-orange-200',
    'Disposed': 'bg-slate-700 text-white border-slate-800',
    'Sold': 'bg-blue-600 text-white border-blue-700',
    'Scrapped': 'bg-amber-600 text-white border-amber-700',
    'Donated': 'bg-teal-600 text-white border-teal-700',
  };

  const style = styles[status] || 'bg-slate-50 text-slate-500 border-slate-200';

  return (
    <Badge variant="outline" className={cn("text-[10px] font-bold uppercase tracking-wider", style)}>
      {status}
    </Badge>
  );
};

export default function DisposalDashboardPage() {
  const router = useRouter();

  return (
    <div className="space-y-6 pb-12">
      <ModuleHeader
        title="Dismantle & Disposal"
        description="Kelola tahap akhir siklus hidup aset: pembongkaran, penghapusan, penjualan, atau scrap."
        actionLabel="New Disposal Request"
        onAction={() => router.push('/penghapusan/disposal/create')}
        icon={<Trash2 className="h-4 w-4" />}
      >
        <Button variant="outline" className="gap-2 border-slate-200 shadow-sm" render={
          <Link href="/penghapusan/disposal/approval">
            <ShieldCheck className="h-4 w-4 text-amber-500" /> Approval Queue
          </Link>
        } />
      </ModuleHeader>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-1"><FileText className="h-3 w-3" /> Total Requests</span>
          <span className="text-3xl font-black text-slate-900">{summaryStats.total}</span>
        </div>
        <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 shadow-sm flex flex-col justify-center">
          <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest mb-1 flex items-center gap-1"><Clock className="h-3 w-3" /> Pending Review</span>
          <span className="text-3xl font-black text-amber-800">{summaryStats.pendingApproval}</span>
        </div>
        <div className="bg-orange-50 p-4 rounded-xl border border-orange-200 shadow-sm flex flex-col justify-center">
          <span className="text-[10px] font-black text-orange-700 uppercase tracking-widest mb-1 flex items-center gap-1"><Wrench className="h-3 w-3" /> Dismantling</span>
          <span className="text-3xl font-black text-orange-800">{summaryStats.dismantling}</span>
        </div>
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-900 shadow-sm flex flex-col justify-center">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-emerald-400" /> Disposed (Month)</span>
          <span className="text-3xl font-black text-white">{summaryStats.disposedThisMonth}</span>
        </div>
      </div>

      {/* FILTER PANEL */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="space-y-1.5 lg:col-span-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1">Search Aset / Request</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Search request no, asset code..." className="pl-9 bg-slate-50 border-slate-200 h-9 text-sm" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1">Disposal Type</label>
            <Select defaultValue="all">
              <SelectTrigger className="bg-slate-50 border-slate-200 h-9 text-sm">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="scrap">Scrap</SelectItem>
                <SelectItem value="sale">Sale</SelectItem>
                <SelectItem value="writeoff">Write-off</SelectItem>
                <SelectItem value="lost">Lost Asset</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1">Status</label>
            <Select defaultValue="all">
              <SelectTrigger className="bg-slate-50 border-slate-200 h-9 text-sm">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="review">Under Review</SelectItem>
                <SelectItem value="dismantle">Dismantling</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
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
                <SelectItem value="vessel">All Vessels</SelectItem>
                <SelectItem value="warehouse">Warehouse Area</SelectItem>
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
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Asset Identity</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Type</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Condition</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Date</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Status</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {disposalRequests.map((req) => (
              <TableRow key={req.id} className="hover:bg-slate-50/80 border-slate-100 group text-sm">
                <TableCell>
                  <Link href={`/penghapusan/disposal/${req.id}`} className="font-bold text-blue-600 hover:underline font-mono tracking-tight">
                    {req.requestNo}
                  </Link>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-bold text-slate-900 text-xs truncate max-w-[200px]">{req.assetName}</span>
                    <span className="text-[10px] text-slate-500 font-mono tracking-tight">{req.assetCode}</span>
                  </div>
                </TableCell>
                <TableCell>
                   <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
                      <span className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        req.disposalType === 'Scrap' ? "bg-amber-500" : 
                        req.disposalType === 'Sale' ? "bg-blue-500" : "bg-slate-400"
                      )}></span>
                      {req.disposalType}
                   </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-[9px] bg-slate-50 border-slate-200 text-slate-600">
                    {req.condition}
                  </Badge>
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
                        <Link href={`/penghapusan/disposal/${req.id}`}>
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

      {/* RECENT ACTIVITY / LOGS */}
      <Card className="rounded-xl border-slate-200 shadow-sm overflow-hidden bg-white">
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex justify-between items-center">
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <History className="h-3 w-3" /> Recent Disposal Activities
          </h3>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-400 font-mono">10:45</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            <p className="text-slate-600">Disposal Certificate for <span className="font-bold text-slate-900">DIS-2026-0004</span> has been issued.</p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-400 font-mono">09:12</span>
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
            <p className="text-slate-600"><span className="font-bold text-slate-900">Ratna Sari</span> approved technical review for DIS-2026-0001.</p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-400 font-mono">Yesterday</span>
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
            <p className="text-slate-600">Dismantle task started for <span className="font-bold text-slate-900">DIS-2026-0003</span> in Surabaya.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
