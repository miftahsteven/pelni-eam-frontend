"use client"

import * as React from "react"
import { useRouter, useParams } from "next/navigation"
import { 
  ChevronLeft, 
  Edit, 
  Printer, 
  Send, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Truck, 
  User, 
  MapPin,
  Camera,
  Link as LinkIcon,
  History,
  Info,
  ExternalLink
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

export default function InstallationDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  // Simple status mapping for demo
  const status = id === "INS-2026-0001" ? "Draft" : "Completed"

  return (
    <div className="space-y-6 pb-20">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full hover:bg-slate-100"
            onClick={() => router.push("/pemasangan/installasi")}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">{id || "INS-2026-0001"}</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <Badge className={cn(
                "px-2 py-0.5 rounded-full font-bold tracking-widest text-[10px] uppercase shadow-none",
                status === "Draft" ? "bg-slate-100 text-slate-700" : "bg-green-100 text-green-700"
              )}>
                {status}
              </Badge>
              <div className="h-1 w-1 rounded-full bg-slate-300" />
              <span className="text-sm font-medium text-slate-400">Pemasangan Modul</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 border-slate-200 font-bold text-slate-600 shadow-sm">
            <Printer className="h-4 w-4" />
            Print Report
          </Button>
          <Button 
            variant="outline" 
            className="gap-2 border-slate-200 font-bold text-slate-600 shadow-sm"
            onClick={() => router.push(`/pemasangan/installasi/${id}/edit`)}
          >
            <Edit className="h-4 w-4" />
            Edit Document
          </Button>
          {status === "Completed" && (
            <Button className="gap-2 bg-pelni-blue hover:bg-pelni-mid font-bold shadow-lg shadow-pelni-blue/20">
              <Send className="h-4 w-4" />
              Submit to Acceptance Test
            </Button>
          )}
        </div>
      </div>

      {/* SAP B1 Style Header Section */}
      <Card className="border-slate-200 shadow-sm overflow-hidden bg-white">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
            <Info className="h-4 w-4 text-pelni-blue" />
            General Information
          </h2>
          <span className="text-xs font-bold text-slate-400">Created on 27 Apr 2026</span>
        </div>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-x divide-slate-100">
            <div className="p-6 space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">WBS Reference</p>
              <p className="font-bold text-slate-800">WBS-ENG-001</p>
              <p className="text-xs text-slate-500 truncate">Pompa Pendingin KM Kelud</p>
            </div>
            <div className="p-6 space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Delivery Order</p>
              <div className="flex items-center gap-2">
                <p className="font-bold text-slate-800">DO-2026-0019</p>
                <ExternalLink className="h-3 w-3 text-blue-500" />
              </div>
              <p className="text-xs text-slate-500">PT Marine Equipment</p>
            </div>
            <div className="p-6 space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Installation Date</p>
              <p className="font-bold text-slate-800">27 Apr 2026</p>
              <p className="text-xs text-slate-500">Actual Realization</p>
            </div>
            <div className="p-6 space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">PIC Technician</p>
              <p className="font-bold text-slate-800">Taufiq Hidayat</p>
              <p className="text-xs text-slate-500">Mechanical Engineer</p>
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
          <TabsTrigger value="documentation" className="gap-2 px-6 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-pelni-blue font-bold text-slate-500">
            Documentation
          </TabsTrigger>
          <TabsTrigger value="flow" className="gap-2 px-6 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-pelni-blue font-bold text-slate-500">
            Reference Flow
          </TabsTrigger>
          <TabsTrigger value="log" className="gap-2 px-6 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-pelni-blue font-bold text-slate-500">
            Activity Log
          </TabsTrigger>
        </TabsList>

        <Card className="border-slate-200 shadow-sm min-h-[300px] bg-white">
          <CardContent className="p-0">
            <TabsContent value="items" className="m-0">
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="font-bold text-slate-700">Item Name</TableHead>
                    <TableHead className="font-bold text-slate-700 text-center">Delivered</TableHead>
                    <TableHead className="font-bold text-slate-700 text-center">Installed</TableHead>
                    <TableHead className="font-bold text-slate-700">Serial Number</TableHead>
                    <TableHead className="font-bold text-slate-700">Location Point</TableHead>
                    <TableHead className="font-bold text-slate-700 text-right px-6">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <p className="font-bold text-slate-800 text-sm">Cooling Water Pump</p>
                      <p className="text-[10px] text-slate-400 font-medium tracking-tight">EQP-PMP-001 | Marine Grade 5.5 KW</p>
                    </TableCell>
                    <TableCell className="text-center font-bold text-slate-500">2 Unit</TableCell>
                    <TableCell className="text-center">
                      <Badge className="bg-blue-50 text-blue-700 border-blue-100 shadow-none font-bold">2 Unit</Badge>
                    </TableCell>
                    <TableCell className="font-medium text-slate-600 text-sm">SN-KELUD-PMP-001, 002</TableCell>
                    <TableCell className="text-sm text-slate-600">Engine Room - Port Side</TableCell>
                    <TableCell className="text-right px-6">
                      <Badge className="bg-green-100 text-green-700 border-transparent shadow-none font-black text-[9px] uppercase tracking-widest">Installed</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <p className="font-bold text-slate-800 text-sm">Mounting Bolt Set</p>
                      <p className="text-[10px] text-slate-400 font-medium tracking-tight">ACC-BLT-004 | Stainless M16</p>
                    </TableCell>
                    <TableCell className="text-center font-bold text-slate-500">8 Set</TableCell>
                    <TableCell className="text-center">
                      <Badge className="bg-blue-50 text-blue-700 border-blue-100 shadow-none font-bold">8 Set</Badge>
                    </TableCell>
                    <TableCell className="font-medium text-slate-400 text-sm italic">N/A</TableCell>
                    <TableCell className="text-sm text-slate-600">Pump Base</TableCell>
                    <TableCell className="text-right px-6">
                      <Badge className="bg-green-100 text-green-700 border-transparent shadow-none font-black text-[9px] uppercase tracking-widest">Installed</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="documentation" className="p-8">
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Before Installation", type: "photo" },
                    { label: "During Process", type: "photo" },
                    { label: "After Installation", type: "photo" },
                    { label: "Technical Report", type: "pdf" }
                  ].map((doc, i) => (
                    <div key={i} className="group relative rounded-xl border border-slate-200 overflow-hidden aspect-square bg-slate-50 flex flex-col items-center justify-center gap-2 hover:border-blue-300 transition-all cursor-pointer shadow-sm">
                      <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-slate-400 shadow-sm group-hover:scale-110 transition-transform">
                        {doc.type === "photo" ? <Camera className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{doc.label}</span>
                      <div className="absolute inset-0 bg-pelni-blue/0 group-hover:bg-pelni-blue/5 transition-colors" />
                    </div>
                  ))}
               </div>
            </TabsContent>

            <TabsContent value="flow" className="p-10">
              <div className="flex flex-wrap items-start justify-between gap-y-12 relative px-4">
                <div className="absolute top-[22px] left-10 right-10 h-[2px] bg-slate-100 -z-0 hidden md:block" />
                {[
                  { label: "Plan", doc: "PLN-0007", active: true },
                  { label: "BoQ", doc: "BOQ-0012", active: true },
                  { label: "Request", doc: "PR-0018", active: true },
                  { label: "Assignment", doc: "WBS-004", active: true },
                  { label: "Order", doc: "PO-0022", active: true },
                  { label: "Delivery", doc: "DO-0019", active: true },
                  { label: "Installation", doc: id || "INS-0001", active: true, current: true },
                  { label: "Acceptance", doc: "WAITING", active: false }
                ].map((step, i) => (
                  <div key={i} className="flex flex-col items-center gap-3 relative z-10 w-1/2 md:w-auto">
                    <div className={cn(
                      "h-11 w-11 rounded-full flex items-center justify-center border-4 border-white shadow-md transition-all",
                      step.current ? "bg-pelni-blue text-white ring-4 ring-blue-100 scale-110" : 
                      step.active ? "bg-green-500 text-white" : "bg-slate-100 text-slate-300"
                    )}>
                      {step.active ? <CheckCircle2 className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                    </div>
                    <div className="text-center">
                      <p className={cn("text-[10px] font-black uppercase tracking-tighter", step.current ? "text-pelni-blue" : "text-slate-400")}>{step.label}</p>
                      <p className="text-[11px] font-bold text-slate-700">{step.doc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="log" className="p-8">
              <div className="space-y-6 max-w-xl">
                {[
                  { time: "27 Apr 2026, 09:00", user: "Admin Project", action: "Created installation draft" },
                  { time: "27 Apr 2026, 11:15", user: "Taufiq Hidayat", action: "Updated realization quantity (2/2 units)" },
                  { time: "27 Apr 2026, 14:00", user: "Administrator", action: "Uploaded documentation & finalized" }
                ].map((log, i) => (
                  <div key={i} className="flex gap-4 relative before:absolute before:left-5 before:top-10 before:bottom-0 before:w-px before:bg-slate-100 last:before:hidden pb-6">
                    <div className="h-10 w-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 shadow-sm shrink-0">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="pt-0.5">
                      <p className="text-sm font-bold text-slate-800">{log.action}</p>
                      <p className="text-xs text-slate-500 font-medium mt-1">by <span className="text-blue-600">{log.user}</span> • {log.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  )
}
