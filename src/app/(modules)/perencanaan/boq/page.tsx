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
  Calculator,
  ClipboardList,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileCheck
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
import { dummyBoQs } from "@/lib/mocks/boq"
import { StatusBadge } from "@/components/eam/status-badge"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function BoQListPage() {
  // Summary counts
  const totalBoQ = dummyBoQs.length
  const inProgress = dummyBoQs.filter(r => r.status === "In Progress").length
  const waitingApproval = dummyBoQs.filter(r => r.status === "Waiting Approval").length
  const readyForPR = dummyBoQs.filter(r => r.status === "Ready for PR").length

  return (
    <div className="flex flex-col gap-6 p-6">
      <ModuleHeader
        title="Bill of Quantities (BoQ) List"
        description="Penyusunan rincian kuantitas dan estimasi biaya (Phase 2.2.2)"
        actionLabel="Create BoQ from Plan"
        onAction={() => window.location.href = "/perencanaan/boq/create"}
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-pelni-blue shadow-sm">
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="p-3 rounded-full bg-pelni-blue/10 text-pelni-blue">
              <FileCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total BoQ</p>
              <p className="text-2xl font-bold">{totalBoQ}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500 shadow-sm">
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="p-3 rounded-full bg-blue-50 text-blue-600">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">In Progress</p>
              <p className="text-2xl font-bold">{inProgress}</p>
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
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Ready for PR</p>
              <p className="text-2xl font-bold">{readyForPR}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="shadow-sm border-slate-200">
        <CardContent className="p-4 flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input placeholder="Search BoQ No, Asset Name or Planning No..." className="pl-10" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="waiting">Waiting Approval</SelectItem>
              <SelectItem value="ready">Ready for PR</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="mechanical">Mechanical</SelectItem>
              <SelectItem value="electrical">Electrical</SelectItem>
              <SelectItem value="civil">Civil</SelectItem>
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
              <TableHead className="font-bold text-slate-700">BoQ No</TableHead>
              <TableHead className="font-bold text-slate-700">Planning No</TableHead>
              <TableHead className="font-bold text-slate-700">Asset Information</TableHead>
              <TableHead className="font-bold text-slate-700">Total Items</TableHead>
              <TableHead className="font-bold text-slate-700 text-right">Total Estimate</TableHead>
              <TableHead className="font-bold text-slate-700">Status</TableHead>
              <TableHead className="text-right font-bold text-slate-700 w-[80px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyBoQs.map((boq) => (
              <TableRow key={boq.id} className="hover:bg-slate-50/50">
                <TableCell className="font-mono font-bold text-pelni-blue text-xs">
                  {boq.boqNo}
                </TableCell>
                <TableCell className="font-mono text-slate-500 text-xs">
                  {boq.planningNo}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900">{boq.assetName}</span>
                    <span className="text-xs text-slate-500">{boq.assetCode} • {boq.location}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-semibold">{boq.itemCount} items</span>
                </TableCell>
                <TableCell className="text-right font-mono font-bold text-slate-700">
                  Rp {boq.totalEstimate.toLocaleString('id-ID')}
                </TableCell>
                <TableCell>
                  <StatusBadge status={boq.status} />
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
                        <Link href={`/perencanaan/boq/${boq.id}`} className="flex items-center">
                          <Eye className="mr-2 h-4 w-4 text-slate-500" /> View Detail
                        </Link>
                      } />
                      <DropdownMenuItem>
                        <FileEdit className="mr-2 h-4 w-4 text-slate-500" /> Edit Line Items
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Calculator className="mr-2 h-4 w-4 text-slate-500" /> Open Costing
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
