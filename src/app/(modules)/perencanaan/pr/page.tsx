"use client"

import { ModuleHeader } from "@/components/module-header"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  FileEdit, 
  ShoppingCart,
  ClipboardList,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Send,
  Package
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { dummyPRs } from "@/lib/mocks/purchase-request"
import { StatusBadge } from "@/components/eam/status-badge"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function PRListPage() {
  // Summary counts
  const totalPR = dummyPRs.length
  const inPreparation = dummyPRs.filter(r => r.status === "In Preparation" || r.status === "Draft").length
  const waitingApproval = dummyPRs.filter(r => r.status === "Waiting Approval").length
  const sentToProcurement = dummyPRs.filter(r => r.status === "Sent to Procurement").length

  return (
    <div className="flex flex-col gap-6 p-6">
      <ModuleHeader
        title="Purchase Request (PR) List"
        description="Daftar permintaan pengadaan internal (Phase 2.2.3)"
        actionLabel="Create PR from BoQ"
        onAction={() => window.location.href = "/perencanaan/pr/create"}
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-pelni-blue shadow-sm">
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="p-3 rounded-full bg-pelni-blue/10 text-pelni-blue">
              <ShoppingCart className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total PR</p>
              <p className="text-2xl font-bold">{totalPR}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500 shadow-sm">
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="p-3 rounded-full bg-blue-50 text-blue-600">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">In Preparation</p>
              <p className="text-2xl font-bold">{inPreparation}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-500 shadow-sm">
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="p-3 rounded-full bg-amber-50 text-amber-600">
              <AlertCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Waiting Approval</p>
              <p className="text-2xl font-bold">{waitingApproval}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-emerald-500 shadow-sm">
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="p-3 rounded-full bg-emerald-50 text-emerald-600">
              <Send className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Sent to Procurement</p>
              <p className="text-2xl font-bold">{sentToProcurement}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="shadow-sm border-slate-200">
        <CardContent className="p-4 flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input placeholder="Search PR No, BoQ No or Package Title..." className="pl-10" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="waiting">Waiting Approval</SelectItem>
              <SelectItem value="sent">Sent to Procurement</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Fiscal Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2026">2026</SelectItem>
              <SelectItem value="2027">2027</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2 text-slate-600 border-slate-200">
            <Filter className="h-4 w-4" /> Filters
          </Button>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="shadow-sm border-slate-200 overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-bold text-slate-700">PR No</TableHead>
              <TableHead className="font-bold text-slate-700">BoQ / Planning Ref</TableHead>
              <TableHead className="font-bold text-slate-700">Package Title</TableHead>
              <TableHead className="font-bold text-slate-700">Requesting Unit</TableHead>
              <TableHead className="font-bold text-slate-700 text-right">Estimate Total</TableHead>
              <TableHead className="font-bold text-slate-700">Status</TableHead>
              <TableHead className="text-right font-bold text-slate-700 w-[80px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyPRs.map((pr) => (
              <TableRow key={pr.id} className="hover:bg-slate-50/50">
                <TableCell className="font-mono font-bold text-pelni-blue text-xs">
                  {pr.prNo}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-0.5 font-mono text-[10px] text-slate-500">
                    <span>{pr.boqNo}</span>
                    <span>{pr.planningNo}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-bold text-slate-900">{pr.packageTitle}</span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-700 text-sm">{pr.requestingUnit}</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">{pr.requesterName}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-mono font-bold text-slate-700">
                  Rp {pr.totalEstimate.toLocaleString('id-ID')}
                </TableCell>
                <TableCell>
                  <StatusBadge status={pr.status} />
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger render={
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    } />
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem render={
                        <Link href={`/perencanaan/pr/${pr.id}`} className="flex items-center">
                          <Eye className="mr-2 h-4 w-4 text-slate-500" /> View Detail
                        </Link>
                      } />
                      <DropdownMenuItem>
                        <FileEdit className="mr-2 h-4 w-4 text-slate-500" /> Edit Procurement Info
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CheckCircle2 className="mr-2 h-4 w-4 text-slate-500" /> Open Validation
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
