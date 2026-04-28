"use client"

import * as React from "react"
import { ModuleHeader } from "@/components/module-header"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  MoreVertical,
  ClipboardCheck,
  Calendar
} from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

const dummyInstallations = [
  {
    id: "INS-2026-0001",
    wbsCode: "WBS-ENG-001",
    doNo: "DO-2026-0019",
    poNo: "PO-2026-0022",
    location: "KM Kelud - Engine Room",
    date: "2026-04-27",
    pic: "Taufiq Hidayat",
    status: "Draft",
  },
  {
    id: "INS-2026-0002",
    wbsCode: "WBS-NAV-002",
    doNo: "DO-2026-0025",
    poNo: "PO-2026-0028",
    location: "KM Dobonsolo - Bridge",
    date: "2026-04-26",
    pic: "Riko Prawira",
    status: "Completed",
  },
  {
    id: "INS-2026-0003",
    wbsCode: "WBS-ENG-001",
    doNo: "DO-2026-0021",
    poNo: "PO-2026-0024",
    location: "KM Kelud - Engine Room",
    date: "2026-04-25",
    pic: "Ahmad Subarjo",
    status: "In Progress",
  },
  {
    id: "INS-2026-0004",
    wbsCode: "WBS-ENG-005",
    doNo: "DO-2026-0030",
    poNo: "PO-2026-0035",
    location: "KM Labobar - Deck A",
    date: "2026-04-24",
    pic: "Budi Santoso",
    status: "Submitted",
  }
]

const statusVariants: Record<string, string> = {
  "Draft": "bg-slate-100 text-slate-700 border-slate-200",
  "In Progress": "bg-blue-50 text-blue-700 border-blue-200",
  "Completed": "bg-green-50 text-green-700 border-green-200",
  "Submitted": "bg-purple-50 text-purple-700 border-purple-200",
  "Partial": "bg-orange-50 text-orange-700 border-orange-200",
}

export default function InstallationListPage() {
  const router = useRouter()

  return (
    <div className="space-y-6 pb-10">
      <ModuleHeader
        title="Installation List"
        description="Daftar pencatatan pemasangan equipment dan aset berdasarkan Delivery Order."
        actionLabel="Register Pemasangan"
        onAction={() => router.push("/pemasangan/installasi/create")}
      />

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search Installation No, WBS, or DO..." 
            className="pl-10 bg-slate-50/50 border-slate-200 focus:bg-white transition-all"
          />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Button variant="outline" className="gap-2 border-slate-200 text-slate-600">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" className="gap-2 border-slate-200 text-slate-600">
            <Calendar className="h-4 w-4" />
            Date Range
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[180px] font-bold text-slate-700">Installation No</TableHead>
              <TableHead className="font-bold text-slate-700">WBS Code</TableHead>
              <TableHead className="font-bold text-slate-700">DO No</TableHead>
              <TableHead className="font-bold text-slate-700">Location</TableHead>
              <TableHead className="font-bold text-slate-700">PIC</TableHead>
              <TableHead className="font-bold text-slate-700 text-center">Status</TableHead>
              <TableHead className="text-right font-bold text-slate-700 px-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyInstallations.map((inst) => (
              <TableRow key={inst.id} className="group transition-colors hover:bg-slate-50/50">
                <TableCell className="font-bold text-pelni-blue">
                  {inst.id}
                </TableCell>
                <TableCell className="font-medium text-slate-600">
                  {inst.wbsCode}
                </TableCell>
                <TableCell className="text-slate-500 text-sm">
                  {inst.doNo}
                </TableCell>
                <TableCell className="text-slate-600 font-medium">
                  {inst.location}
                </TableCell>
                <TableCell className="text-slate-600">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 border border-slate-200">
                      {inst.pic.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span>{inst.pic}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Badge 
                    className={cn(
                      "px-2.5 py-0.5 rounded-full border font-semibold shadow-none text-[11px]",
                      statusVariants[inst.status]
                    )}
                  >
                    {inst.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right px-6">
                  <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-slate-400 hover:text-pelni-blue hover:bg-blue-50"
                      onClick={() => router.push(`/pemasangan/installasi/${inst.id}`)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-slate-400 hover:text-pelni-blue hover:bg-blue-50"
                      onClick={() => router.push(`/pemasangan/installasi/${inst.id}/edit`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
          <p className="text-xs text-slate-500 font-medium">Showing 4 of 48 records</p>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" disabled className="h-8 text-xs">Previous</Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-pelni-blue text-white border-pelni-blue">1</Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-slate-600">2</Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-slate-600">3</Button>
            <Button variant="outline" size="sm" className="h-8 text-xs">Next</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
