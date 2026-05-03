"use client";

import React, { useState } from "react";
import { ModuleHeader } from "@/components/module-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Eye, 
  MapPin,
  Map,
  Package,
  AlertTriangle,
  FileWarning,
  Wrench,
  Download,
  ScanLine,
  RefreshCw,
  MoreVertical
} from "lucide-react";
import { 
  assetTrackingData, 
  trackingSummary,
  AssetTrackingItem 
} from "./asset-tracking-data";
import { AssetDetailDrawer } from "./components/asset-detail-drawer";
import { UpdateLocationModal } from "./components/update-location-modal";
import { cn } from "@/lib/utils";

export default function AssetTrackingDashboardPage() {
  const [selectedAsset, setSelectedAsset] = useState<AssetTrackingItem | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const handleViewAsset = (asset: AssetTrackingItem) => {
    setSelectedAsset(asset);
    setIsDrawerOpen(true);
  };

  const handleUpdateLocation = (asset?: AssetTrackingItem) => {
    if (asset) {
       setSelectedAsset(asset);
    }
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    // Don't clear selected asset if drawer is still open
    if (!isDrawerOpen) {
       setSelectedAsset(null);
    }
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    if (!isUpdateModalOpen) {
       setSelectedAsset(null);
    }
  };

  const anomalies = assetTrackingData.filter(a => a.status === 'Location Mismatch' || a.status === 'Missing');

  return (
    <div className="space-y-6 pb-12">
      <ModuleHeader
        title="2.5.3 Asset Tracking"
        description="Monitoring lokasi, status, dan histori perpindahan aset."
        actionLabel="Update Location"
        onAction={() => handleUpdateLocation()}
        icon={<MapPin className="h-4 w-4" />}
      >
         <Button variant="outline" className="gap-2 border-slate-200">
            <ScanLine className="h-4 w-4" /> Scan QR
         </Button>
         <Button variant="outline" className="gap-2 border-slate-200">
            <Download className="h-4 w-4" /> Export Report
         </Button>
      </ModuleHeader>

      {/* DASHBOARD SUMMARY CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-1"><Package className="h-3 w-3" /> Total Assets</span>
          <span className="text-3xl font-black text-slate-900">{trackingSummary.totalAssets}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-1"><MapPin className="h-3 w-3" /> Tracked Assets</span>
          <span className="text-3xl font-black text-blue-600">{trackingSummary.trackedAssets}</span>
        </div>
        <div className="bg-red-50 p-4 rounded-xl border border-red-200 shadow-sm flex flex-col justify-center">
          <span className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-1 flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> Location Mismatch</span>
          <span className="text-3xl font-black text-red-700">{trackingSummary.locationMismatch}</span>
        </div>
        <div className="bg-red-600 p-4 rounded-xl border border-red-700 shadow-sm flex flex-col justify-center">
          <span className="text-[10px] font-black text-red-100 uppercase tracking-widest mb-1 flex items-center gap-1"><FileWarning className="h-3 w-3" /> Missing Assets</span>
          <span className="text-3xl font-black text-white">{trackingSummary.missingAssets}</span>
        </div>
        <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 shadow-sm flex flex-col justify-center">
          <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1 flex items-center gap-1"><Wrench className="h-3 w-3" /> Under Maintenance</span>
          <span className="text-3xl font-black text-amber-700">{trackingSummary.underMaintenance}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-4">
           {/* FILTER PANEL */}
           <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                 <div className="space-y-1.5 lg:col-span-2">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1">Search Asset</label>
                   <div className="relative">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                     <Input placeholder="Search code, name, or serial..." className="pl-9 bg-slate-50 border-slate-200 h-9 text-sm" />
                   </div>
                 </div>
                 <div className="space-y-1.5">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1">Location / Branch</label>
                   <Select defaultValue="all">
                     <SelectTrigger className="bg-slate-50 border-slate-200 h-9 text-sm">
                       <SelectValue placeholder="All Locations" />
                     </SelectTrigger>
                     <SelectContent>
                       <SelectItem value="all">All Locations</SelectItem>
                       <SelectItem value="km-kelud">KM Kelud</SelectItem>
                       <SelectItem value="km-dobonsolo">KM Dobonsolo</SelectItem>
                       <SelectItem value="ho">Kantor Pusat</SelectItem>
                       <SelectItem value="gudang">Gudang Utama</SelectItem>
                     </SelectContent>
                   </Select>
                 </div>
                 <div className="space-y-1.5">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1">Status Tracking</label>
                   <Select defaultValue="all">
                     <SelectTrigger className="bg-slate-50 border-slate-200 h-9 text-sm">
                       <SelectValue placeholder="All Status" />
                     </SelectTrigger>
                     <SelectContent>
                       <SelectItem value="all">All Status</SelectItem>
                       <SelectItem value="Active">Active / Normal</SelectItem>
                       <SelectItem value="Location Mismatch">Location Mismatch</SelectItem>
                       <SelectItem value="Missing">Missing</SelectItem>
                       <SelectItem value="Under Maintenance">Under Maintenance</SelectItem>
                     </SelectContent>
                   </Select>
                 </div>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                  <Button variant="ghost" size="sm" className="text-xs font-bold text-slate-500 hover:text-slate-800">
                     Reset Filters
                  </Button>
                  <div className="flex gap-2">
                     <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-slate-200">
                        <RefreshCw className="h-3.5 w-3.5 text-slate-500" />
                     </Button>
                     <Button size="sm" className="h-8 gap-2 bg-slate-800 hover:bg-slate-900 text-xs">
                        <Filter className="h-3.5 w-3.5" /> Apply Filters
                     </Button>
                  </div>
              </div>
           </div>

           {/* ASSET LOCATION TABLE */}
           <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
             <Table>
               <TableHeader className="bg-slate-50 border-b border-slate-200">
                 <TableRow className="hover:bg-transparent">
                   <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Asset Identity</TableHead>
                   <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Current Location</TableHead>
                   <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Custodian</TableHead>
                   <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Last Update</TableHead>
                   <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Status</TableHead>
                   <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Actions</TableHead>
                 </TableRow>
               </TableHeader>
               <TableBody>
                 {assetTrackingData.map((asset) => (
                   <TableRow key={asset.id} className="hover:bg-slate-50 border-slate-100">
                     <TableCell>
                        <div className="flex flex-col gap-0.5">
                           <button 
                             onClick={() => handleViewAsset(asset)}
                             className="text-left font-bold text-blue-600 hover:underline text-sm truncate max-w-[200px]"
                           >
                             {asset.assetName}
                           </button>
                           <span className="text-[10px] text-slate-500 font-mono tracking-tight">{asset.assetCode}</span>
                        </div>
                     </TableCell>
                     <TableCell>
                        <div className="flex flex-col gap-0.5">
                           <span className="font-bold text-slate-900 text-xs flex items-center gap-1 truncate max-w-[180px]">
                              {asset.status === 'Missing' ? (
                                 <span className="text-red-600 flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> Unknown</span>
                              ) : (
                                 asset.currentLocation
                              )}
                           </span>
                           {asset.currentLocation !== asset.registeredLocation && asset.status !== 'Missing' ? (
                              <span className="text-[9px] text-slate-400 font-medium line-through truncate max-w-[150px]">
                                 Reg: {asset.registeredLocation}
                              </span>
                           ) : (
                              <span className="text-[9px] text-slate-400 font-medium truncate max-w-[150px]">
                                 Matched Reg. Loc
                              </span>
                           )}
                        </div>
                     </TableCell>
                     <TableCell>
                        <span className="text-xs font-medium text-slate-700">{asset.pic}</span>
                     </TableCell>
                     <TableCell>
                        <div className="flex flex-col gap-0.5">
                           <span className="text-xs font-medium text-slate-700">{asset.lastUpdate.split('T')[0]}</span>
                           <span className="text-[9px] text-slate-400 font-mono">{asset.trackingMethod}</span>
                        </div>
                     </TableCell>
                     <TableCell>
                        <Badge variant="outline" className={cn(
                           "font-bold uppercase tracking-wider text-[9px] px-2 py-0.5",
                           asset.status === 'Active' ? "border-green-200 text-green-700 bg-green-50" :
                           asset.status === 'In Use' ? "border-blue-200 text-blue-700 bg-blue-50" :
                           asset.status === 'Location Mismatch' ? "border-red-200 text-red-700 bg-red-50" :
                           asset.status === 'Missing' ? "border-red-500 text-white bg-red-600" :
                           asset.status === 'Under Maintenance' ? "border-amber-200 text-amber-700 bg-amber-50" :
                           "border-slate-200 text-slate-700 bg-slate-50"
                        )}>
                           {asset.status}
                        </Badge>
                     </TableCell>
                     <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                           <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleViewAsset(asset)}
                              className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                           >
                              <Eye className="h-4 w-4" />
                           </Button>
                           <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleUpdateLocation(asset)}
                              className="h-8 w-8 text-slate-400 hover:text-slate-900 hover:bg-slate-100"
                           >
                              <MapPin className="h-4 w-4" />
                           </Button>
                        </div>
                     </TableCell>
                   </TableRow>
                 ))}
               </TableBody>
             </Table>
             <div className="bg-slate-50 border-t border-slate-200 px-4 py-2 flex justify-between items-center text-xs text-slate-500 font-medium">
                <span>Showing 1 to 12 of 240 assets</span>
                <div className="flex gap-1">
                   <Button variant="outline" size="sm" className="h-7 px-2 text-[10px]">Prev</Button>
                   <Button variant="outline" size="sm" className="h-7 px-2 text-[10px] bg-white">1</Button>
                   <Button variant="outline" size="sm" className="h-7 px-2 text-[10px]">2</Button>
                   <Button variant="outline" size="sm" className="h-7 px-2 text-[10px]">Next</Button>
                </div>
             </div>
           </div>
        </div>

        <div className="space-y-6">
           {/* ANOMALY LIST */}
           {anomalies.length > 0 && (
              <div className="bg-white rounded-xl border border-red-200 shadow-sm overflow-hidden flex flex-col h-fit">
                 <div className="bg-red-50 border-b border-red-100 px-4 py-3 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <span className="text-xs font-black uppercase tracking-widest text-red-800">Anomaly Review Required</span>
                    <Badge className="ml-auto bg-red-600 text-[10px] hover:bg-red-700">{anomalies.length}</Badge>
                 </div>
                 <div className="divide-y divide-slate-100 max-h-[300px] overflow-y-auto">
                    {anomalies.map(anomaly => (
                       <div key={anomaly.id} className="p-3 hover:bg-slate-50 transition-colors">
                          <div className="flex justify-between items-start mb-1">
                             <button 
                               onClick={() => handleViewAsset(anomaly)}
                               className="font-bold text-xs text-slate-900 text-left hover:text-blue-600 hover:underline"
                             >
                                {anomaly.assetName}
                             </button>
                             <Button variant="ghost" size="icon" className="h-5 w-5 text-slate-400 -mr-1">
                                <MoreVertical className="h-3 w-3" />
                             </Button>
                          </div>
                          <div className="flex items-center gap-1.5 mb-2">
                             <Badge variant="outline" className={cn(
                                "text-[8px] uppercase font-bold px-1.5 py-0 border-0 h-4",
                                anomaly.status === 'Missing' ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                             )}>
                                {anomaly.status}
                             </Badge>
                             <span className="text-[9px] text-slate-400 font-mono">{anomaly.assetCode}</span>
                          </div>
                          <div className="text-[10px] text-slate-500">
                             {anomaly.status === 'Missing' 
                               ? <span>Last seen at <span className="font-bold text-slate-700">{anomaly.registeredLocation}</span></span>
                               : <span>Found at <span className="font-bold text-slate-700">{anomaly.currentLocation}</span></span>
                             }
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           )}

           {/* MAP PLACEHOLDER */}
           <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-[300px] flex flex-col">
               <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <Map className="h-4 w-4 text-slate-500" />
                     <span className="text-xs font-black uppercase tracking-widest text-slate-700">Distribution Map</span>
                  </div>
                  <Badge variant="outline" className="text-[9px] bg-white border-slate-200">Global View</Badge>
               </div>
               <div className="flex-1 bg-slate-100 relative overflow-hidden flex flex-col items-center justify-center p-6 text-center border-t border-white/50 shadow-inner">
                  {/* Decorative map elements */}
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  
                  <MapPin className="h-10 w-10 text-slate-300 mb-2 drop-shadow-sm" />
                  <h4 className="font-bold text-slate-700 text-sm">Interactive Map View</h4>
                  <p className="text-[10px] text-slate-500 mt-1 max-w-[200px]">Asset distribution mapping is initialized in mock mode for this demo.</p>
                  
                  <Button variant="outline" size="sm" className="mt-4 text-xs h-8 bg-white/80 backdrop-blur-sm shadow-sm border-slate-200">
                     Open Full Map
                  </Button>

                  {/* Mock markers */}
                  <div className="absolute top-[20%] left-[30%] h-3 w-3 rounded-full bg-blue-500 shadow-md border border-white animate-pulse"></div>
                  <div className="absolute top-[60%] left-[70%] h-3 w-3 rounded-full bg-green-500 shadow-md border border-white animate-pulse"></div>
                  <div className="absolute top-[40%] left-[80%] h-3 w-3 rounded-full bg-red-500 shadow-md border border-white animate-pulse" style={{ animationDelay: '1s' }}></div>
               </div>
           </div>
        </div>
      </div>

      <AssetDetailDrawer 
         isOpen={isDrawerOpen} 
         onClose={handleCloseDrawer} 
         asset={selectedAsset}
         onUpdateLocation={handleUpdateLocation}
      />
      
      <UpdateLocationModal 
         isOpen={isUpdateModalOpen} 
         onClose={handleCloseUpdateModal} 
         asset={selectedAsset} 
      />
    </div>
  );
}
