"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
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

export default function CreateInstallationPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = React.useState("items")

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
            <h1 className="text-2xl font-black tracking-tight text-slate-900">Create New Installation</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-sm font-medium text-slate-500">Draft Document</span>
              <div className="h-1 w-1 rounded-full bg-slate-300" />
              <span className="text-sm font-medium text-slate-400">Pemasangan Modul</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 border-slate-200 font-bold text-slate-600">
            <Save className="h-4 w-4" />
            Save Draft
          </Button>
          <Button className="gap-2 bg-pelni-blue hover:bg-pelni-mid font-bold shadow-lg shadow-pelni-blue/20">
            <Send className="h-4 w-4" />
            Submit Installation
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
          <Badge className="bg-slate-200 text-slate-700 border-transparent hover:bg-slate-200 shadow-none">
            DOC-NEW
          </Badge>
        </div>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
            <div className="space-y-4">
              <div className="grid gap-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Installation No</label>
                <Input disabled value="AUTO-GENERATED" className="bg-slate-50 border-slate-200 font-bold text-slate-400 h-10" />
              </div>
              <div className="grid gap-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  WBS Code <span className="text-red-500 font-black">*</span>
                </label>
                <Select>
                  <SelectTrigger className="border-slate-200 h-10 font-medium">
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
                <Select>
                  <SelectTrigger className="border-slate-200 h-10 font-medium">
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
              <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-blue-600/70 font-bold text-[10px] uppercase tracking-wider">Linked References</span>
                  <Badge variant="outline" className="text-[9px] bg-blue-100/50 text-blue-700 border-blue-200">Auto-filled</Badge>
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
      <Tabs defaultValue="items" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="bg-slate-100/50 p-1 border border-slate-200 rounded-xl mb-6">
          <TabsTrigger value="items" className="gap-2 px-6 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-pelni-blue font-bold text-slate-500">
            <Truck className="h-4 w-4" />
            Items
          </TabsTrigger>
          <TabsTrigger value="assignment" className="gap-2 px-6 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-pelni-blue font-bold text-slate-500">
            <User className="h-4 w-4" />
            Assignment
          </TabsTrigger>
          <TabsTrigger value="documentation" className="gap-2 px-6 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-pelni-blue font-bold text-slate-500">
            <Camera className="h-4 w-4" />
            Documentation
          </TabsTrigger>
          <TabsTrigger value="flow" className="gap-2 px-6 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-pelni-blue font-bold text-slate-500">
            <LinkIcon className="h-4 w-4" />
            Reference Flow
          </TabsTrigger>
          <TabsTrigger value="log" className="gap-2 px-6 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-pelni-blue font-bold text-slate-500">
            <History className="h-4 w-4" />
            Activity Log
          </TabsTrigger>
        </TabsList>

        <Card className="border-slate-200 shadow-sm min-h-[400px]">
          <CardContent className="p-0">
            {/* Items Tab Content */}
            <TabsContent value="items" className="m-0">
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[120px] font-bold text-slate-700">Item Code</TableHead>
                    <TableHead className="w-[250px] font-bold text-slate-700">Item Name & Specs</TableHead>
                    <TableHead className="font-bold text-slate-700 text-center">Qty Delivered</TableHead>
                    <TableHead className="w-[150px] font-bold text-slate-700 text-center">Qty Installed</TableHead>
                    <TableHead className="font-bold text-slate-700">Serial Number</TableHead>
                    <TableHead className="font-bold text-slate-700">Installation Point</TableHead>
                    <TableHead className="w-[80px] text-right px-6"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="hover:bg-slate-50/50">
                    <TableCell className="font-bold text-slate-900">EQP-PMP-001</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-bold text-slate-700">Cooling Water Pump</p>
                        <p className="text-xs text-slate-500 leading-tight">Marine Grade Pump 5.5 KW, Stainless Steel Casing</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-bold text-slate-600">2 Unit</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Input type="number" defaultValue={0} className="w-20 text-center border-slate-200 h-9 font-bold" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Input placeholder="SN-XXXXX" className="border-slate-200 h-9 text-sm" />
                    </TableCell>
                    <TableCell>
                      <Input placeholder="Engine Room - Port" className="border-slate-200 h-9 text-sm" />
                    </TableCell>
                    <TableCell className="text-right px-6">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-slate-50/50">
                    <TableCell className="font-bold text-slate-900">ACC-BLT-004</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-bold text-slate-700">Mounting Bolt Set</p>
                        <p className="text-xs text-slate-500 leading-tight">Stainless Bolt Set M16 x 100mm, with Washers</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-bold text-slate-600">8 Set</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Input type="number" defaultValue={0} className="w-20 text-center border-slate-200 h-9 font-bold" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Input placeholder="Not Applicable" disabled className="border-slate-200 h-9 text-sm bg-slate-50" />
                    </TableCell>
                    <TableCell>
                      <Input placeholder="Pump Base" className="border-slate-200 h-9 text-sm" />
                    </TableCell>
                    <TableCell className="text-right px-6">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="p-4 border-t border-slate-100 flex justify-center bg-slate-50/30">
                <Button variant="ghost" className="text-pelni-blue font-bold gap-2 text-sm hover:bg-blue-50">
                  <Plus className="h-4 w-4" />
                  Add Item Manually
                </Button>
              </div>
            </TabsContent>

            {/* Other Tabs Placeholder */}
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
                          <SelectItem value="riko">Riko Prawira</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Supervisor</label>
                      <Select defaultValue="ahmad">
                        <SelectTrigger className="border-slate-200 h-10">
                          <SelectValue placeholder="Select Supervisor" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ahmad">Ahmad Subarjo</SelectItem>
                          <SelectItem value="budi">Budi Santoso</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="grid gap-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Actual Date</label>
                      <Input type="date" className="border-slate-200 h-10" defaultValue="2026-04-27" />
                    </div>
                    <div className="grid gap-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Work Location</label>
                      <Input placeholder="Engine Room KM Kelud" className="border-slate-200 h-10" />
                    </div>
                  </div>
                </div>
                <div className="grid gap-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Safety Notes</label>
                  <Textarea placeholder="Enter safety precautions..." className="border-slate-200 min-h-[100px]" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="documentation" className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-3 hover:border-pelni-blue/50 hover:bg-blue-50/30 transition-all cursor-pointer">
                  <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <Camera className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-700">Before Photo</p>
                    <p className="text-xs text-slate-400">Upload condition before installation</p>
                  </div>
                </div>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-3 hover:border-pelni-blue/50 hover:bg-blue-50/30 transition-all cursor-pointer">
                  <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <Camera className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-700">After Photo</p>
                    <p className="text-xs text-slate-400">Upload condition after installation</p>
                  </div>
                </div>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-3 hover:border-pelni-blue/50 hover:bg-blue-50/30 transition-all cursor-pointer">
                  <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-700">Supporting Docs</p>
                    <p className="text-xs text-slate-400">Manuals, test reports, etc.</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="flow" className="p-8">
              <div className="max-w-md mx-auto">
                <div className="space-y-0 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200">
                  {[
                    { label: "Plan & Design", val: "PLN-2026-0007", status: "Approved" },
                    { label: "Create BoQ", val: "BOQ-2026-0012", status: "Approved" },
                    { label: "Purchase Request", val: "PR-2026-0018", status: "Completed" },
                    { label: "WBS Assignment", val: "WBS-ENG-004", status: "Active" },
                    { label: "Purchase Order", val: "PO-2026-0022", status: "Ordered" },
                    { label: "Delivery Order", val: "DO-2026-0019", status: "Delivered" },
                    { label: "Installation", val: "NEW-DOC", status: "Draft", active: true },
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-6 pb-8 last:pb-0 relative">
                      <div className={cn(
                        "h-9 w-9 rounded-full flex items-center justify-center z-10 border-4 border-white shadow-sm",
                        step.active ? "bg-pelni-blue text-white ring-4 ring-blue-100" : "bg-slate-100 text-slate-400"
                      )}>
                        {step.active ? <Plus className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                      </div>
                      <div className="pt-1.5 flex-1">
                        <div className="flex justify-between items-center">
                          <p className={cn("text-sm font-bold", step.active ? "text-pelni-blue" : "text-slate-700")}>{step.label}</p>
                          <Badge variant="outline" className={cn(
                            "text-[10px] font-bold px-2 py-0 border-none rounded-full",
                            step.active ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-500"
                          )}>{step.status}</Badge>
                        </div>
                        <p className="text-xs font-medium text-slate-500 mt-0.5">{step.val}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="log" className="p-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Draft Document Created</p>
                    <p className="text-xs text-slate-500 mt-1">Today at 09:00 AM by Administrator</p>
                    <p className="text-xs text-slate-400 italic mt-2 font-medium">"Initial document created for engine room pump installation."</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  )
}
