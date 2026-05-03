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
import { Plus, Search, Filter, Eye, Edit, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { dummyAssetRegistrations } from "./asset-registration-data";
import { StatusBadge } from "@/components/eam/status-badge";

export default function AssetRegistrationListPage() {
  return (
    <div className="space-y-4">
      <ModuleHeader
        title="2.4.3 Asset Registration"
        description="Daftar dokumen registrasi aset dari hasil acceptance test."
        actionLabel="Create Asset Registration"
        onAction={() => window.location.href = "/pemasangan/assetregistration/create"}
      />

      <div className="flex flex-col md:flex-row gap-3 items-end bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex-1 space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Search Asset</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input placeholder="Search by Asset Name, Code or AR No..." className="pl-9 bg-slate-50/50 border-slate-200 focus:ring-pelni-blue/20" />
          </div>
        </div>
        
        <div className="w-full md:w-48 space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Status</label>
          <Select defaultValue="all">
            <SelectTrigger className="bg-slate-50/50 border-slate-200">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Registered">Registered</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full md:w-48 space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Category</label>
          <Select defaultValue="all">
            <SelectTrigger className="bg-slate-50/50 border-slate-200">
              <SelectValue placeholder="Filter Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Machinery">Machinery</SelectItem>
              <SelectItem value="Navigation">Navigation</SelectItem>
              <SelectItem value="Electrical">Electrical</SelectItem>
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
              <TableHead className="font-bold text-slate-700 w-[150px]">Reg No</TableHead>
              <TableHead className="font-bold text-slate-700">Acceptance No</TableHead>
              <TableHead className="font-bold text-slate-700">Asset Name</TableHead>
              <TableHead className="font-bold text-slate-700">Location</TableHead>
              <TableHead className="font-bold text-slate-700">Vessel</TableHead>
              <TableHead className="font-bold text-slate-700">Reg Status</TableHead>
              <TableHead className="font-bold text-slate-700 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyAssetRegistrations.map((reg) => (
              <TableRow key={reg.id} className="hover:bg-slate-50/50 transition-colors border-slate-100">
                <TableCell className="font-bold text-blue-600 tracking-tight">
                  <Link href={`/pemasangan/assetregistration/${reg.id}`} className="hover:underline">
                    {reg.registrationNo}
                  </Link>
                </TableCell>
                <TableCell className="font-medium text-slate-600">{reg.acceptanceTestNo}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-900">{reg.items[0]?.itemName}</span>
                    <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">{reg.items[0]?.generatedAssetCode || "NO CODE"}</span>
                  </div>
                </TableCell>
                <TableCell className="text-slate-600">{reg.location}</TableCell>
                <TableCell className="text-slate-600 font-medium">{reg.vessel}</TableCell>
                <TableCell>
                  <StatusBadge status={reg.status} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                      render={
                        <Link href={`/pemasangan/assetregistration/${reg.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      }
                    />
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-amber-600 hover:bg-amber-50">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {dummyAssetRegistrations.length === 0 && (
          <div className="p-20 text-center flex flex-col items-center justify-center">
            <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4 border border-slate-100">
              <Search className="h-8 w-8" />
            </div>
            <p className="text-slate-500 font-medium">No asset registration records found.</p>
            <p className="text-slate-400 text-sm">Create a new registration from an acceptance test.</p>
          </div>
        )}
      </div>
    </div>
  );
}
