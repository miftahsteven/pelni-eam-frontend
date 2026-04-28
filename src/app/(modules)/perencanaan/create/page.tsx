"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { 
  ArrowLeft, 
  Save, 
  Send, 
  Upload, 
  ClipboardCheck, 
  Info, 
  ShieldAlert,
  Calendar
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CreatePlanningRequest() {
  const router = useRouter()

  return (
    <div className="flex flex-col gap-6 p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" nativeButton={false} render={
            <Link href="/perencanaan">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          } />
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Create New Planning Request</h1>
            <p className="text-sm text-slate-500 font-medium">Usulkan kebutuhan perencanaan aset baru</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 font-bold text-slate-600">
            <Save className="h-4 w-4" />
            Save as Draft
          </Button>
          <Button className="bg-pelni-blue hover:bg-pelni-mid gap-2 font-bold shadow-lg shadow-pelni-blue/20">
            <Send className="h-4 w-4" />
            Submit Request
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Section A: Informasi Umum */}
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="border-b bg-slate-50/50 pb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-pelni-blue/10 text-pelni-blue">
                <Info className="h-4 w-4" />
              </div>
              <div>
                <CardTitle className="text-lg">A. Informasi Umum</CardTitle>
                <CardDescription>Detail pengusul dan jenis permintaan</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Request No</label>
              <Input value="PLN-PLAN-2026-XXXX" disabled className="bg-slate-50 font-mono text-xs font-bold" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Request Date</label>
              <div className="relative">
                <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                <Input type="date" className="pl-9" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Requester Unit</label>
              <Select defaultValue="fleet-1">
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fleet-1">Technical Fleet I</SelectItem>
                  <SelectItem value="fleet-2">Technical Fleet II</SelectItem>
                  <SelectItem value="port-fac">Port Facility Unit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Request Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="replacement">Replacement</SelectItem>
                  <SelectItem value="upgrade">Upgrade</SelectItem>
                  <SelectItem value="rehab">Rehabilitation</SelectItem>
                  <SelectItem value="new">New Requirement</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Priority</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Section B: Informasi Aset */}
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="border-b bg-slate-50/50 pb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-pelni-blue/10 text-pelni-blue">
                <ClipboardCheck className="h-4 w-4" />
              </div>
              <div>
                <CardTitle className="text-lg">B. Informasi Aset</CardTitle>
                <CardDescription>Pilih aset yang akan direncanakan</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Asset Code / Search</label>
              <div className="flex gap-2">
                <Input placeholder="Search Asset Code..." className="flex-1" />
                <Button variant="outline">Browse</Button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Asset Name</label>
              <Input placeholder="Select asset first" disabled />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Asset Category</label>
              <Input disabled placeholder="-" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Location / Site</label>
              <Input disabled placeholder="-" />
            </div>
          </CardContent>
        </Card>

        {/* Section C: Kebutuhan / Permasalahan */}
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="border-b bg-slate-50/50 pb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-pelni-blue/10 text-pelni-blue">
                <ShieldAlert className="h-4 w-4" />
              </div>
              <div>
                <CardTitle className="text-lg">C. Kebutuhan / Permasalahan</CardTitle>
                <CardDescription>Detail permasalahan dan justifikasi bisnis</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Problem Title</label>
              <Input placeholder="Contoh: Penggantian Pompa Pendingin Mesin Utama yang Sering Overheat" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Problem Description</label>
                <Textarea placeholder="Jelaskan kondisi saat ini dan masalah teknis yang terjadi..." className="min-h-[100px]" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Business Justification</label>
                <Textarea placeholder="Kenapa permintaan ini diperlukan secara bisnis?" className="min-h-[100px]" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section D: Rencana Awal */}
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="border-b bg-slate-50/50 pb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-pelni-blue/10 text-pelni-blue">
                <Calendar className="h-4 w-4" />
              </div>
              <div>
                <CardTitle className="text-lg">D. Rencana Awal</CardTitle>
                <CardDescription>Estimasi waktu dan catatan tambahan</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Proposed Action</label>
              <Input placeholder="e.g. Full Replacement with New Unit" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Target Start Date</label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Target Finish Date</label>
              <Input type="date" />
            </div>
          </CardContent>
        </Card>

        {/* Section E: Lampiran */}
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="border-b bg-slate-50/50 pb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-pelni-blue/10 text-pelni-blue">
                <Upload className="h-4 w-4" />
              </div>
              <div>
                <CardTitle className="text-lg">E. Lampiran</CardTitle>
                <CardDescription>Upload foto kondisi atau dokumen pendukung</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-12 flex flex-col items-center justify-center bg-slate-50/30">
              <Upload className="h-10 w-10 text-slate-400 mb-4" />
              <p className="text-sm font-bold text-slate-600 mb-1">Click or drag files to upload</p>
              <p className="text-xs text-slate-500">JPG, PNG, or PDF up to 10MB</p>
              <Button variant="outline" className="mt-6">Select Files</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Final Action Buttons */}
      <div className="flex justify-end gap-4 pb-12 pt-6 border-t">
        <Button variant="ghost" className="px-8 font-bold" nativeButton={false} render={
          <Link href="/perencanaan">Cancel</Link>
        } />
        <Button variant="outline" className="px-8 font-bold border-slate-300">Save as Draft</Button>
        <Button className="px-10 bg-pelni-blue hover:bg-pelni-mid font-bold shadow-lg shadow-pelni-blue/20">Submit Request</Button>
      </div>
    </div>
  )
}
