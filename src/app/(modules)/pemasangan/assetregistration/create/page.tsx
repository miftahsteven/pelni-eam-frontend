"use client";

import React, { useState } from "react";
import { ModuleHeader } from "@/components/module-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/eam-checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  Save, 
  Send, 
  ArrowLeft, 
  ChevronRight, 
  Info, 
  MapPin, 
  ShieldCheck, 
  Wrench, 
  FileText,
  Clock,
  History,
  Upload,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import { 
  dummyAcceptanceTests, 
  assetCategories, 
  criticalityLevels, 
  assetStatuses,
  departments
} from "../asset-registration-data";
import { cn } from "@/lib/utils";

export default function CreateAssetRegistrationPage() {
  const [selectedAT, setSelectedAT] = useState<string>("");
  const [activeTab, setActiveTab] = useState("eligible");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const atData = dummyAcceptanceTests.find(at => at.id === selectedAT);

  const handleToggleItem = (itemCode: string) => {
    setSelectedItems(prev => 
      prev.includes(itemCode) ? prev.filter(i => i !== itemCode) : [...prev, itemCode]
    );
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full"
          render={
            <Link href="/pemasangan/assetregistration">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          }
        />
        <ModuleHeader
          title="Create Asset Registration"
          description="Register new assets from accepted installation items."
        />
        <div className="ml-auto flex gap-2">
          <Button variant="outline" className="gap-2 border-slate-200">
            <Save className="h-4 w-4" /> Save as Draft
          </Button>
          <Button className="gap-2 bg-pelni-blue hover:bg-pelni-blue/90">
            <Send className="h-4 w-4" /> Submit Registration
          </Button>
        </div>
      </div>

      {/* Header Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Document Header</span>
            <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200 text-[10px] font-bold px-2 py-0">DRAFT</Badge>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div className="space-y-1.5">
              <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Registration No</Label>
              <Input value="AR-2026-AUTO" disabled className="bg-slate-50 border-slate-200 font-mono font-bold text-blue-600" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Acceptance Test Reference</Label>
              <Select onValueChange={(val) => setSelectedAT(val || "")} value={selectedAT}>
                <SelectTrigger className="border-slate-200 focus:ring-pelni-blue/20">
                  <SelectValue placeholder="Select Acceptance Test" />
                </SelectTrigger>
                <SelectContent>
                  {dummyAcceptanceTests.map(at => (
                    <SelectItem key={at.id} value={at.id}>{at.id} - {at.vessel}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Registration Date</Label>
              <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="border-slate-200" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Registered By</Label>
              <Input value="Administrator" disabled className="bg-slate-50 border-slate-200" />
            </div>
          </div>
        </div>

        <div className="bg-blue-600 rounded-xl border border-blue-700 shadow-md p-6 text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
            <Wrench className="h-24 w-24" />
          </div>
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center">
                <Info className="h-4 w-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-100">Asset Context</span>
            </div>
            {atData ? (
              <div className="space-y-3 mt-2">
                <div>
                  <p className="text-[10px] uppercase font-bold text-blue-200 tracking-wider">Vessel / Unit</p>
                  <p className="text-xl font-black">{atData.vessel}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-blue-200 tracking-wider">Location</p>
                    <p className="font-bold">{atData.location}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-blue-200 tracking-wider">WBS Code</p>
                    <p className="font-mono text-sm">{atData.wbsCode}</p>
                  </div>
                </div>
                <div className="pt-2 border-t border-blue-500/50 flex items-center justify-between">
                  <span className="text-[10px] text-blue-100 italic">Data automatically synced from Installation</span>
                  <ExternalLink className="h-3 w-3 opacity-50" />
                </div>
              </div>
            ) : (
              <div className="h-32 flex items-center justify-center border-2 border-dashed border-white/20 rounded-lg">
                <p className="text-sm text-blue-100 font-medium italic opacity-70">Please select AT Reference first</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="bg-white rounded-t-xl border border-slate-200 border-b-0">
          <TabsList className="h-12 bg-transparent gap-0 px-2">
            <TabsTrigger value="eligible" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-pelni-blue data-[state=active]:text-pelni-blue data-[state=active]:shadow-none rounded-none px-6 text-slate-500 font-bold text-xs uppercase tracking-wider h-full transition-all">
              1. Eligible Items
            </TabsTrigger>
            <TabsTrigger value="master" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-pelni-blue data-[state=active]:text-pelni-blue data-[state=active]:shadow-none rounded-none px-6 text-slate-500 font-bold text-xs uppercase tracking-wider h-full transition-all">
              2. Asset Master
            </TabsTrigger>
            <TabsTrigger value="location" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-pelni-blue data-[state=active]:text-pelni-blue data-[state=active]:shadow-none rounded-none px-6 text-slate-500 font-bold text-xs uppercase tracking-wider h-full transition-all">
              3. Location & Ownership
            </TabsTrigger>
            <TabsTrigger value="financial" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-pelni-blue data-[state=active]:text-pelni-blue data-[state=active]:shadow-none rounded-none px-6 text-slate-500 font-bold text-xs uppercase tracking-wider h-full transition-all">
              4. Warranty & Financial
            </TabsTrigger>
            <TabsTrigger value="technical" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-pelni-blue data-[state=active]:text-pelni-blue data-[state=active]:shadow-none rounded-none px-6 text-slate-500 font-bold text-xs uppercase tracking-wider h-full transition-all">
              5. Technical Data
            </TabsTrigger>
            <TabsTrigger value="docs" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-pelni-blue data-[state=active]:text-pelni-blue data-[state=active]:shadow-none rounded-none px-6 text-slate-500 font-bold text-xs uppercase tracking-wider h-full transition-all">
              6. Documentation
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="bg-white rounded-b-xl border border-slate-200 shadow-sm min-h-[400px]">
          {/* TAB 1: ELIGIBLE ITEMS */}
          <TabsContent value="eligible" className="m-0 p-0">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-black text-slate-900 tracking-tight">Select Items to Register</h3>
                  <p className="text-sm text-slate-500 font-medium">Only items with 'Pass' or 'Accepted with Notes' results are shown.</p>
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-2 flex items-center gap-3">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Selected Items</span>
                    <span className="text-xl font-black text-blue-700">{selectedItems.length}</span>
                  </div>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 h-8" disabled={selectedItems.length === 0} onClick={() => setActiveTab("master")}>
                    Continue <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border border-slate-100 overflow-hidden">
                <Table>
                  <TableHeader className="bg-slate-50/50">
                    <TableRow className="border-slate-100">
                      <TableHead className="w-[50px]"></TableHead>
                      <TableHead className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Item Code</TableHead>
                      <TableHead className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Item Name</TableHead>
                      <TableHead className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Serial Number</TableHead>
                      <TableHead className="text-[10px] font-black uppercase text-slate-500 tracking-wider text-center">Qty</TableHead>
                      <TableHead className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Test Result</TableHead>
                      <TableHead className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Installation Point</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {atData?.items.map(item => (
                      <TableRow key={item.itemCode} className={cn(
                        "hover:bg-slate-50/50 transition-colors cursor-pointer border-slate-100",
                        selectedItems.includes(item.itemCode) && "bg-blue-50/30"
                      )} onClick={() => handleToggleItem(item.itemCode)}>
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <Checkbox 
                            checked={selectedItems.includes(item.itemCode)} 
                            onCheckedChange={() => handleToggleItem(item.itemCode)}
                          />
                        </TableCell>
                        <TableCell className="font-mono font-bold text-slate-700 text-xs">{item.itemCode}</TableCell>
                        <TableCell className="font-bold text-slate-900">{item.itemName}</TableCell>
                        <TableCell className="text-slate-600 italic text-xs">{item.serialNumber}</TableCell>
                        <TableCell className="text-center font-bold text-slate-600">{item.qtyAccepted}</TableCell>
                        <TableCell>
                          <Badge variant={item.testResult === "Pass" ? "success" : "warning"} className="text-[10px] font-black px-2 py-0">
                            {item.testResult.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-500 text-xs font-medium">{item.installationPoint}</TableCell>
                      </TableRow>
                    ))}
                    {!atData && (
                      <TableRow>
                        <TableCell colSpan={7} className="h-40 text-center text-slate-400 font-medium italic">
                          Select Acceptance Test reference to load eligible items.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          {/* TAB 2: ASSET MASTER */}
          <TabsContent value="master" className="m-0 p-8">
            <div className="max-w-4xl space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-wider text-slate-500">Asset Code (Generated)</Label>
                    <Input value="AST-2026-[CATEGORY]-[AUTO]" disabled className="bg-slate-50 border-slate-200 font-mono text-blue-600 font-bold" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-wider text-slate-500">Asset Name</Label>
                    <Input defaultValue={selectedItems.length > 0 ? atData?.items.find(i => i.itemCode === selectedItems[0])?.itemName : ""} placeholder="Enter asset name" className="border-slate-200" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase tracking-wider text-slate-500">Asset Category</Label>
                      <Select>
                        <SelectTrigger className="border-slate-200">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {assetCategories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase tracking-wider text-slate-500">Asset Class</Label>
                      <Select>
                        <SelectTrigger className="border-slate-200">
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="class1">Class 1 - Critical</SelectItem>
                          <SelectItem value="class2">Class 2 - Main</SelectItem>
                          <SelectItem value="class3">Class 3 - Aux</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-wider text-slate-500">Serial Number</Label>
                    <Input defaultValue={selectedItems.length > 0 ? atData?.items.find(i => i.itemCode === selectedItems[0])?.serialNumber : ""} placeholder="Enter serial number" className="border-slate-200" />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase tracking-wider text-slate-500">Criticality Level</Label>
                      <Select>
                        <SelectTrigger className="border-slate-200">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          {criticalityLevels.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase tracking-wider text-slate-500">Initial Asset Status</Label>
                      <Select defaultValue="Active">
                        <SelectTrigger className="border-slate-200">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {assetStatuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-wider text-slate-500">Manufacturer</Label>
                    <Input placeholder="Enter manufacturer" className="border-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-wider text-slate-500">Model / Type</Label>
                    <Input placeholder="Enter model or type" className="border-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-wider text-slate-500">Description / Notes</Label>
                    <Textarea placeholder="Enter asset description" className="border-slate-200 min-h-[100px]" />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* TAB 3: LOCATION & OWNERSHIP */}
          <TabsContent value="location" className="m-0 p-8">
            <div className="max-w-4xl space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-wider text-slate-500 font-bold">Vessel / Unit / Office</Label>
                    <Input value={atData?.vessel || ""} disabled className="bg-slate-50 border-slate-200 font-bold" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-wider text-slate-500 font-bold">Main Location</Label>
                    <Input value={atData?.location || ""} className="border-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-wider text-slate-500 font-bold">Sub Location</Label>
                    <Input placeholder="e.g. Starboard Side" className="border-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-wider text-slate-500 font-bold">Installation Point</Label>
                    <Input defaultValue={selectedItems.length > 0 ? atData?.items.find(i => i.itemCode === selectedItems[0])?.installationPoint : ""} className="border-slate-200" />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-wider text-slate-500 font-bold">Owner Department</Label>
                    <Select>
                      <SelectTrigger className="border-slate-200">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-wider text-slate-500 font-bold">Responsible Person</Label>
                    <Input placeholder="Enter name" className="border-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-wider text-slate-500 font-bold">Cost Center</Label>
                    <Select>
                      <SelectTrigger className="border-slate-200">
                        <SelectValue placeholder="Select cost center" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cc1">CC-001-ENG</SelectItem>
                        <SelectItem value="cc2">CC-002-NAV</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-pelni-blue" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Location Preview</span>
                    </div>
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-xs font-bold text-slate-900">{atData?.vessel || "---"}</span>
                      <ChevronRight className="h-3 w-3 text-slate-400" />
                      <span className="text-xs font-bold text-slate-900">{atData?.location || "---"}</span>
                      <ChevronRight className="h-3 w-3 text-slate-400" />
                      <span className="text-xs font-bold text-pelni-blue">New Asset Base</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* TAB 4: WARRANTY & FINANCIAL */}
          <TabsContent value="financial" className="m-0 p-8">
            <div className="max-w-4xl space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-wider text-slate-500">Vendor</Label>
                    <Input value={selectedItems.length > 0 ? atData?.items.find(i => i.itemCode === selectedItems[0])?.vendor : ""} disabled className="bg-slate-50 border-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-wider text-slate-500">Purchase Order Reference</Label>
                    <div className="relative">
                      <Input value={selectedItems.length > 0 ? atData?.items.find(i => i.itemCode === selectedItems[0])?.poReference : ""} disabled className="bg-slate-50 border-slate-200 pl-9" />
                      <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase tracking-wider text-slate-500">Acquisition Date</Label>
                      <Input type="date" className="border-slate-200" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase tracking-wider text-slate-500">Acquisition Value</Label>
                      <Input type="number" placeholder="0.00" className="border-slate-200" />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-4 space-y-4">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-amber-600" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">Warranty Information</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-wider text-slate-500">Start Date</Label>
                        <Input type="date" className="border-amber-200 bg-white" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-wider text-slate-500">End Date</Label>
                        <Input type="date" className="border-amber-200 bg-white" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-wider text-slate-500">Warranty Provider</Label>
                      <Input placeholder="Enter provider name" className="border-amber-200 bg-white" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase tracking-wider text-slate-500">Depreciation Method</Label>
                      <Select>
                        <SelectTrigger className="border-slate-200">
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sl">Straight Line</SelectItem>
                          <SelectItem value="ddb">Double Declining Balance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase tracking-wider text-slate-500">Useful Life (Years)</Label>
                      <Input type="number" defaultValue="10" className="border-slate-200" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* TAB 5: TECHNICAL DATA */}
          <TabsContent value="technical" className="m-0 p-8">
            <div className="max-w-4xl space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-wider text-slate-500">Technical Specifications</Label>
                    <Textarea placeholder="Detailed specs..." className="border-slate-200 min-h-[120px]" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-wider text-slate-500">Operational Parameters</Label>
                    <Textarea placeholder="Temp, pressure, RPM, etc..." className="border-slate-200 min-h-[120px]" />
                  </div>
                </div>

                <div className="space-y-4">
                   <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase tracking-wider text-slate-500">Capacity</Label>
                      <Input placeholder="e.g. 50 m3/h" className="border-slate-200" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase tracking-wider text-slate-500">Power Rating</Label>
                      <Input placeholder="e.g. 15 kW" className="border-slate-200" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase tracking-wider text-slate-500">Material</Label>
                      <Input placeholder="e.g. Stainless Steel" className="border-slate-200" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase tracking-wider text-slate-500">Dimensions</Label>
                      <Input placeholder="e.g. 1.2m x 0.8m" className="border-slate-200" />
                    </div>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 border-dashed flex flex-col items-center justify-center text-center">
                    <Wrench className="h-8 w-8 text-slate-300 mb-2" />
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Additional Tech Params</p>
                    <Button variant="link" className="text-pelni-blue text-xs font-bold underline mt-1">Add custom parameter field</Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* TAB 6: DOCUMENTATION */}
          <TabsContent value="docs" className="m-0 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Acceptance Report", icon: FileText, desc: "Automatic reference from AT", locked: true },
                { title: "Installation Photo", icon: FileText, desc: "Automatic reference from Installation", locked: true },
                { title: "Asset Photo", icon: Upload, desc: "Upload final photo", locked: false },
                { title: "Warranty Document", icon: Upload, desc: "Upload scanned warranty", locked: false },
                { title: "Manual Book", icon: Upload, desc: "Upload PDF manual", locked: false },
                { title: "Supporting Document", icon: Upload, desc: "Other documents", locked: false },
              ].map((doc, i) => (
                <div key={i} className={cn(
                  "p-6 rounded-xl border flex flex-col items-center justify-center text-center transition-all",
                  doc.locked ? "bg-slate-50/50 border-slate-200" : "bg-white border-slate-200 hover:border-pelni-blue border-dashed"
                )}>
                  <div className={cn(
                    "h-12 w-12 rounded-full flex items-center justify-center mb-4 shadow-sm",
                    doc.locked ? "bg-slate-200 text-slate-400" : "bg-blue-50 text-blue-600"
                  )}>
                    <doc.icon className="h-6 w-6" />
                  </div>
                  <h4 className="text-sm font-black text-slate-900 tracking-tight">{doc.title}</h4>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{doc.desc}</p>
                  {!doc.locked && (
                    <Button variant="outline" size="sm" className="mt-4 h-8 text-[10px] font-bold border-slate-200">
                      SELECT FILE
                    </Button>
                  )}
                  {doc.locked && (
                    <span className="mt-4 text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                      <Clock className="h-3 w-3" /> ATTACHED
                    </span>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
