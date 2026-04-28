"use client"

import { useState } from "react"
import { 
  ClipboardList, 
  Search, 
  Filter, 
  ArrowRight, 
  MoreVertical,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { dummyAssignmentPRs } from "@/lib/mocks/wbs-assignment"
import { StatusBadge } from "@/components/eam/status-badge"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function WBSAssignmentListPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">WBS Assignment</h1>
          <p className="text-sm text-slate-500">Assign Work Breakdown Structure to Purchase Request items.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 font-bold border-slate-300">
            <Filter className="h-4 w-4" /> Filter
          </Button>
          <Button className="bg-pelni-blue hover:bg-pelni-mid gap-2 font-bold shadow-lg shadow-pelni-blue/20">
            Download Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-amber-500 shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Waiting Assignment</p>
              <h3 className="text-2xl font-bold text-slate-900">12</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
              <Clock className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-cyan-500 shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Partially Assigned</p>
              <h3 className="text-2xl font-bold text-slate-900">5</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600">
              <AlertCircle className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-emerald-500 shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ready for PO</p>
              <h3 className="text-2xl font-bold text-slate-900">28</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-pelni-blue shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total PR</p>
              <h3 className="text-2xl font-bold text-slate-900">45</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-pelni-blue">
              <ClipboardList className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table Section */}
      <Card className="shadow-sm border-slate-200 overflow-hidden">
        <div className="p-4 border-b bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search by PR No, Unit, or Vessel..." 
              className="pl-10 bg-white border-slate-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Status:</span>
            <div className="flex gap-1 p-1 bg-slate-100 rounded-lg">
              <Button variant="ghost" size="sm" className="h-7 px-3 text-[10px] font-bold bg-white shadow-sm text-pelni-blue">ALL</Button>
              <Button variant="ghost" size="sm" className="h-7 px-3 text-[10px] font-bold text-slate-500">PENDING</Button>
              <Button variant="ghost" size="sm" className="h-7 px-3 text-[10px] font-bold text-slate-500">READY</Button>
            </div>
          </div>
        </div>

        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-[180px] font-bold text-slate-700">PR Number</TableHead>
              <TableHead className="font-bold text-slate-700">Requesting Unit</TableHead>
              <TableHead className="font-bold text-slate-700">Vessel / Asset</TableHead>
              <TableHead className="font-bold text-slate-700 text-center">Items</TableHead>
              <TableHead className="font-bold text-slate-700 text-right">Est. Amount (Rp)</TableHead>
              <TableHead className="font-bold text-slate-700">Assignment Status</TableHead>
              <TableHead className="w-[100px] text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyAssignmentPRs.map((pr) => (
              <TableRow key={pr.id} className="hover:bg-slate-50/50 transition-colors">
                <TableCell>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-bold text-pelni-blue font-mono text-sm">{pr.prNo}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">{pr.prDate}</span>
                      <span className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        pr.priority === "HIGH" ? "bg-red-500" : "bg-slate-300"
                      )} />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-medium text-slate-700">{pr.requestingUnit}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded bg-slate-100 flex items-center justify-center text-slate-500">
                      <FileText className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-bold text-slate-900">{pr.vessel}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <span className="text-sm font-bold text-slate-700">{pr.totalItems}</span>
                </TableCell>
                <TableCell className="text-right font-mono font-bold text-slate-700">
                  {pr.totalEstimate.toLocaleString('id-ID')}
                </TableCell>
                <TableCell>
                  <StatusBadge status={pr.assignmentStatus} />
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-pelni-blue" nativeButton={false} render={
                    <Link href={`/pengadaan/wbs-assignment/${pr.id}`}>
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  } />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="p-4 border-t bg-slate-50/30 flex items-center justify-between">
          <p className="text-xs text-slate-500">Showing **3** of **45** pending requests</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled className="h-8 text-xs font-bold">Previous</Button>
            <Button variant="outline" size="sm" className="h-8 text-xs font-bold">Next</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
