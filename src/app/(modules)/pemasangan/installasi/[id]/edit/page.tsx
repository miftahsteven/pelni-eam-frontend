"use client"

import * as React from "react"
import { useRouter, useParams } from "next/navigation"
import { 
  ChevronLeft, 
  Save, 
  Send, 
  Plus, 
  Trash2, 
  Info, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Truck, 
  User, 
  MapPin,
  Camera,
  Link as LinkIcon,
  History,
  Calendar
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

export default function EditInstallationPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  return (
    <div className="space-y-6 pb-20">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full hover:bg-slate-100"
            onClick={() => router.back()}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">Edit Installation: {id || "INS-2026-0001"}</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <Badge className="bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full border-none text-[10px] uppercase shadow-none">
                In Progress
              </Badge>
              <div className="h-1 w-1 rounded-full bg-slate-300" />
              <span className="text-sm font-medium text-slate-400">Pemasangan Modul</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 border-slate-200 font-bold text-slate-600">
            <Save className="h-4 w-4" />
            Update Draft
          </Button>
          <Button className="gap-2 bg-pelni-blue hover:bg-pelni-mid font-bold shadow-lg shadow-pelni-blue/20">
            <Send className="h-4 w-4" />
            Submit Final Installation
          </Button>
        </div>
      </div>

      {/* SAP B1 Style Header Section */}
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
            <Info className="h-4 w-4 text-pelni-blue" />
            Document Header
          </h2>
          <span className="text-xs font-bold text-slate-400 italic">Last modified by Taufiq H. 1h ago</span>
        </div>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
            <div className="space-y-4">
              <div className="grid gap-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Installation No</label>
                <Input disabled value={id || "INS-2026-0001"} className="bg-slate-50 border-slate-200 font-bold text-slate-600 h-10" />
              </div>
              <div className="grid gap-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  WBS Code <span className="text-red-500 font-black">*</span>
                </label>
                <Select defaultValue="wbs-001">
                  <SelectTrigger className="border-slate-200 h-10 font-medium bg-slate-50/50">
                    <SelectValue placeholder="Select WBS Reference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wbs-001">WBS-ENG-001 - Pompa Pendingin KM Kelud</SelectItem>
                    <SelectItem value="wbs-002">WBS-NAV-002 - Navigasi KM Dobonsolo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid gap-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  Delivery Order No <span className="text-red-500 font-black">*</span>
                </label>
                <Select defaultValue="do-001">
                  <SelectTrigger className="border-slate-200 h-10 font-medium bg-slate-50/50">
                    <SelectValue placeholder="Select DO Reference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="do-001">DO-2026-0019 (PT Marine Equipment)</SelectItem>
                    <SelectItem value="do-002">DO-2026-0025 (PT Navigasi Jaya)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Installation Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input type="date" className="pl-10 border-slate-200 h-10 font-medium" defaultValue="2026-04-27" />
                </div>
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-3">
                <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-bold text-[10px] uppercase tracking-wider">Quick Reference</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">PO No</p>
                    <p className="font-bold text-slate-700">PO-2026-0022</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">PR No</p>
                    <p className="font-bold text-slate-700">PR-2026-0018</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Vessel</p>
                    <p className="font-bold text-slate-700">KM Kelud</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Location</p>
                    <p className="font-bold text-slate-700">Engine Room</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Section */}
      <Tabs defaultValue="items" className="w-full">
        <TabsList className="bg-slate-100/50 p-1 border border-slate-200 rounded-xl mb-6">
          <TabsTrigger value="items" className="gap-2 px-6 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-pelni-blue font-bold text-slate-500">
            Items
          </TabsTrigger>
          <TabsTrigger value="assignment" className="gap-2 px-6 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-pelni-blue font-bold text-slate-500">
            Assignment
          </TabsTrigger>
          <TabsTrigger value="documentation" className="gap-2 px-6 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-pelni-blue font-bold text-slate-500">
            Documentation
          </TabsTrigger>
          <TabsTrigger value="flow" className="gap-2 px-6 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-pelni-blue font-bold text-slate-500">
            Flow
          </TabsTrigger>
          <TabsTrigger value="log" className="gap-2 px-6 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-pelni-blue font-bold text-slate-500">
            History
          </TabsTrigger>
        </TabsList>

        <Card className="border-slate-200 shadow-sm min-h-[400px] bg-white">
          <CardContent className="p-0">
            <TabsContent value="items" className="m-0">
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[120px] font-bold text-slate-700">Item Code</TableHead>
                    <TableHead className="w-[250px] font-bold text-slate-700">Item Name</TableHead>
                    <TableHead className="font-bold text-slate-700 text-center">Delivered</TableHead>
                    <TableHead className="w-[150px] font-bold text-slate-700 text-center">Qty Installed</TableHead>
                    <TableHead className="font-bold text-slate-700">Serial Number</TableHead>
                    <TableHead className="font-bold text-slate-700">Location Point</TableHead>
                    <TableHead className="w-[80px] text-right px-6"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="hover:bg-slate-50/50">
                    <TableCell className="font-bold text-slate-900">EQP-PMP-001</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-bold text-slate-700">Cooling Water Pump</p>
                        <p className="text-xs text-slate-500">Marine Grade Pump 5.5 KW</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-bold text-slate-600">2 Unit</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Input type="number" defaultValue={2} className="w-20 text-center border-slate-200 h-9 font-bold text-blue-600 bg-blue-50/30" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Input defaultValue="SN-KELUD-PMP-001, 002" className="border-slate-200 h-9 text-sm" />
                    </TableCell>
                    <TableCell>
                      <Input defaultValue="Engine Room - Port Side" className="border-slate-200 h-9 text-sm" />
                    </TableCell>
                    <TableCell className="text-right px-6">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="assignment" className="p-8">
              <div className="max-w-2xl mx-auto space-y-8">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="grid gap-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">PIC Technician</label>
                      <Select defaultValue="taufiq">
                        <SelectTrigger className="border-slate-200 h-10">
                          <SelectValue placeholder="Select Technician" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="taufiq">Taufiq Hidayat</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="grid gap-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Actual Date</label>
                      <Input type="date" className="border-slate-200 h-10" defaultValue="2026-04-27" />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="documentation" className="p-8 text-center space-y-4">
               <div className="grid grid-cols-4 gap-4">
                  <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 flex flex-col items-center gap-2">
                    <div className="h-10 w-10 rounded bg-white shadow-sm flex items-center justify-center text-slate-400">
                      <Camera className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Before</span>
                  </div>
               </div>
               <Button variant="ghost" className="text-pelni-blue font-bold gap-2">
                 <Plus className="h-4 w-4" />
                 Upload More Files
               </Button>
            </TabsContent>

            <TabsContent value="flow" className="p-8">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest text-center mb-8">Data Traceability Flow</p>
              {/* Stepper logic similar to detail page */}
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  )
}
