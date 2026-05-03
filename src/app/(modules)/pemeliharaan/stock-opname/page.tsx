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
  ClipboardCheck,
  Activity,
  CheckCircle2,
  AlertTriangle,
  PackageSearch,
  RefreshCw,
  Download
} from "lucide-react";
import Link from "next/link";
import { stockOpnameDocuments } from "./stock-opname-data";
import { StatusBadge } from "@/components/eam/status-badge";

export default function StockOpnameDashboardPage() {
  const stats = {
    total: stockOpnameDocuments.length,
    inProgress: stockOpnameDocuments.filter(d => d.status === 'In Progress' || d.status === 'Assigned').length,
    needReview: stockOpnameDocuments.filter(d => d.status === 'Review' || d.status === 'Revision Required').length,
    approved: stockOpnameDocuments.filter(d => d.status === 'Approved' || d.status === 'Closed').length,
    varianceFound: stockOpnameDocuments.reduce((sum, d) => sum + d.variance, 0)
  };

  return (
    <div className="space-y-6 pb-12">
      <ModuleHeader
        title="2.5.2 Stock Opname"
        description="Physical asset verification and discrepancy management."
        actionLabel="Create Stock Opname"
        onAction={() => window.location.href = "/pemeliharaan/stock-opname/create"}
      />

      {/* DASHBOARD SUMMARY CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-1"><PackageSearch className="h-3 w-3" /> Total SO</span>
          <span className="text-3xl font-black text-slate-900">{stats.total}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-1"><Activity className="h-3 w-3" /> In Progress</span>
          <span className="text-3xl font-black text-blue-600">{stats.inProgress}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-1"><ClipboardCheck className="h-3 w-3" /> Need Review</span>
          <span className="text-3xl font-black text-amber-600">{stats.needReview}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Approved/Closed</span>
          <span className="text-3xl font-black text-green-600">{stats.approved}</span>
        </div>
        <div className="bg-red-50 p-4 rounded-xl border border-red-200 shadow-sm flex flex-col justify-center">
          <span className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-1 flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> Variance Found</span>
          <span className="text-3xl font-black text-red-700">{stats.varianceFound}</span>
        </div>
      </div>

      {/* STOCK OPNAME LIST */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-end bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex-1 space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Search Document</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Search by SO No, Location..." className="pl-9 bg-slate-50/50 border-slate-200 focus:ring-pelni-blue/20" />
            </div>
          </div>
          
          <div className="w-full md:w-40 space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Period</label>
            <Select defaultValue="all">
              <SelectTrigger className="bg-slate-50/50 border-slate-200">
                <SelectValue placeholder="All Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Period</SelectItem>
                <SelectItem value="May 2026">May 2026</SelectItem>
                <SelectItem value="April 2026">April 2026</SelectItem>
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
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Review">Review</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" className="gap-2 border-slate-200 text-slate-600 hover:bg-slate-50">
            <Filter className="h-4 w-4" /> Filters
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="border-slate-200 text-slate-600 hover:bg-slate-50">
                <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="border-slate-200 text-slate-600 hover:bg-slate-50">
                <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50/80">
              <TableRow className="hover:bg-transparent border-slate-200">
                <TableHead className="font-bold text-slate-700 w-[140px]">SO Number</TableHead>
                <TableHead className="font-bold text-slate-700">Period & Location</TableHead>
                <TableHead className="font-bold text-slate-700">Category</TableHead>
                <TableHead className="font-bold text-slate-700 text-center">Progress</TableHead>
                <TableHead className="font-bold text-slate-700 text-center">Variance</TableHead>
                <TableHead className="font-bold text-slate-700">Status</TableHead>
                <TableHead className="font-bold text-slate-700">Officer</TableHead>
                <TableHead className="font-bold text-slate-700 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stockOpnameDocuments.map((doc) => {
                const progressPct = doc.totalAsset > 0 ? Math.round((doc.checked / doc.totalAsset) * 100) : 0;
                
                return (
                  <TableRow key={doc.id} className="hover:bg-slate-50/50 transition-colors border-slate-100">
                    <TableCell className="font-bold text-blue-600 tracking-tight">
                      <Link href={`/pemeliharaan/stock-opname/${doc.id}`} className="hover:underline">
                        {doc.id}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900">{doc.period}</span>
                        <span className="text-[10px] text-slate-500 font-medium">{doc.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs font-medium text-slate-700">{doc.category}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col items-center">
                        <span className="text-xs font-bold text-slate-700">{doc.checked} / {doc.totalAsset}</span>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
                           <div 
                              className={`h-full ${progressPct === 100 ? 'bg-green-500' : 'bg-blue-500'}`} 
                              style={{ width: `${progressPct}%` }}
                           />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {doc.variance > 0 ? (
                        <span className="inline-flex items-center justify-center bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {doc.variance} Found
                        </span>
                      ) : (
                         <span className="text-xs text-slate-400 font-medium">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={doc.status} />
                    </TableCell>
                    <TableCell>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-slate-700">{doc.officer}</span>
                            <span className="text-[9px] text-slate-400">By: {doc.supervisor}</span>
                        </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                          render={
                            <Link href={`/pemeliharaan/stock-opname/${doc.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          }
                        />
                        {doc.status === 'Draft' && (
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-amber-600 hover:bg-amber-50">
                                <Edit className="h-4 w-4" />
                            </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
