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
import { 
  Eye, 
  FileEdit, 
  MoreHorizontal, 
  Search, 
  Filter, 
  ArrowUpDown,
  ClipboardList,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { dummyRequests } from "@/lib/mocks/planning"
import { StatusBadge } from "@/components/eam/status-badge"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function PerencanaanPage() {
  // Summary counts
  const totalRequests = dummyRequests.length
  const underAssessment = dummyRequests.filter(r => r.status.includes("Assessment")).length
  const pendingApproval = dummyRequests.filter(r => r.status === "Pending Approval").length
  const approvedForBoQ = dummyRequests.filter(r => r.status === "Approved for BoQ").length

  return (
    <div className="flex flex-col gap-6 p-6">
      <ModuleHeader
        title="Planning Request List"
        description="Kelola usulan perencanaan aset dan kajian teknis (Phase 2.2.1)"
        actionLabel="Create New Request"
        onAction={() => window.location.href = "/perencanaan/create"}
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-pelni-blue shadow-sm">
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="p-3 rounded-full bg-pelni-blue/10 text-pelni-blue">
              <ClipboardList className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Requests</p>
              <p className="text-2xl font-bold">{totalRequests}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-500 shadow-sm">
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="p-3 rounded-full bg-amber-50 text-amber-600">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Under Assessment</p>
              <p className="text-2xl font-bold">{underAssessment}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-indigo-500 shadow-sm">
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="p-3 rounded-full bg-indigo-50 text-indigo-600">
              <AlertCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Pending Approval</p>
              <p className="text-2xl font-bold">{pendingApproval}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-emerald-500 shadow-sm">
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="p-3 rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Approved for BoQ</p>
              <p className="text-2xl font-bold">{approvedForBoQ}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-end bg-white p-4 rounded-xl border shadow-sm">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Search</label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <Input placeholder="Search request, asset..." className="pl-9 bg-slate-50/50" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status</label>
            <Select>
              <SelectTrigger className="bg-slate-50/50">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="assessment">Under Assessment</SelectItem>
                <SelectItem value="design">Under Planning & Design</SelectItem>
                <SelectItem value="approved">Approved for BoQ</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Category</label>
            <Select>
              <SelectTrigger className="bg-slate-50/50">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="mechanical">Mechanical</SelectItem>
                <SelectItem value="electrical">Electrical</SelectItem>
                <SelectItem value="navigation">Navigation</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Priority</label>
            <Select>
              <SelectTrigger className="bg-slate-50/50">
                <SelectValue placeholder="All Priorities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          More Filters
        </Button>
      </div>

      {/* Table List */}
      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="w-[140px] font-bold text-slate-700">Request No</TableHead>
                <TableHead className="font-bold text-slate-700">Asset Name</TableHead>
                <TableHead className="font-bold text-slate-700">Category</TableHead>
                <TableHead className="font-bold text-slate-700">Location</TableHead>
                <TableHead className="font-bold text-slate-700">Type</TableHead>
                <TableHead className="font-bold text-slate-700">
                  <div className="flex items-center gap-1">
                    Priority <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead className="font-bold text-slate-700">Status</TableHead>
                <TableHead className="font-bold text-slate-700 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyRequests.map((req) => (
                <TableRow key={req.id} className="hover:bg-slate-50/50 transition-colors">
                  <TableCell className="font-mono text-xs font-bold text-pelni-blue">{req.requestNo}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900">{req.assetName}</span>
                      <span className="text-[10px] text-slate-500 uppercase">{req.assetCode}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-medium bg-slate-100 text-slate-600 border-none">
                      {req.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-slate-600">{req.location}</TableCell>
                  <TableCell className="text-sm font-medium">{req.requestType}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "font-bold",
                        req.priority === "Critical" ? "text-red-600 border-red-200 bg-red-50" :
                        req.priority === "High" ? "text-orange-600 border-orange-200 bg-orange-50" :
                        req.priority === "Medium" ? "text-blue-600 border-blue-200 bg-blue-50" :
                        "text-slate-600 border-slate-200 bg-slate-50"
                      )}
                    >
                      {req.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={req.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger render={
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      } />
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem render={
                          <Link href={`/perencanaan/${req.id}`} className="flex items-center">
                            <Eye className="mr-2 h-4 w-4 text-slate-500" /> View Detail
                          </Link>
                        } />
                        <DropdownMenuItem>
                          <FileEdit className="mr-2 h-4 w-4 text-slate-500" /> Open Assessment
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-pelni-blue font-medium">
                          <ClipboardList className="mr-2 h-4 w-4" /> Plan & Design
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="p-4 border-t bg-slate-50/30 flex items-center justify-between">
          <p className="text-xs text-slate-500 font-medium">Showing {dummyRequests.length} of {dummyRequests.length} entries</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" className="bg-white">1</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
