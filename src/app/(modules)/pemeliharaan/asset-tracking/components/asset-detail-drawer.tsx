import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, ScanLine, AlertTriangle, History, Info, X, Map } from "lucide-react";
import { AssetTrackingItem } from "../asset-tracking-data";
import { cn } from "@/lib/utils";

interface AssetDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  asset: AssetTrackingItem | null;
  onUpdateLocation: (asset: AssetTrackingItem) => void;
}

export function AssetDetailDrawer({ isOpen, onClose, asset, onUpdateLocation }: AssetDetailDrawerProps) {
  if (!asset) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-xl md:max-w-2xl p-0 overflow-y-auto bg-slate-50 border-l border-slate-200">
        <SheetHeader className="p-6 bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <SheetTitle className="text-xl font-black text-slate-900 tracking-tight">{asset.assetName}</SheetTitle>
                <Badge variant="outline" className={cn(
                  "font-bold uppercase text-[10px]",
                  asset.status === 'Active' ? "border-green-200 text-green-700 bg-green-50" :
                  asset.status === 'In Use' ? "border-blue-200 text-blue-700 bg-blue-50" :
                  asset.status === 'Location Mismatch' ? "border-red-200 text-red-700 bg-red-50" :
                  asset.status === 'Missing' ? "border-red-500 text-white bg-red-600" :
                  asset.status === 'Under Maintenance' ? "border-amber-200 text-amber-700 bg-amber-50" :
                  "border-slate-200 text-slate-700 bg-slate-50"
                )}>
                  {asset.status}
                </Badge>
              </div>
              <p className="text-sm font-mono text-slate-500">{asset.assetCode} • {asset.category}</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => onUpdateLocation(asset)} size="sm" className="bg-pelni-blue hover:bg-blue-700 gap-2 h-9 font-bold shadow-sm">
                <ScanLine className="h-4 w-4" /> Update Location
              </Button>
            </div>
          </div>
        </SheetHeader>

        <div className="p-6 space-y-6">
          {/* Section: Current Location Alert (if mismatch/missing) */}
          {(asset.status === 'Location Mismatch' || asset.status === 'Missing') && (
             <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3 shadow-sm">
                <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                   <h4 className="font-bold text-red-800 text-sm">Location Anomaly Detected</h4>
                   <p className="text-xs text-red-600 mt-1">
                      {asset.status === 'Missing' 
                        ? `Asset could not be found at its registered location during the last check on ${asset.lastUpdate.split('T')[0]}.`
                        : `Asset is currently at ${asset.currentLocation}, which does not match its registered location (${asset.registeredLocation}).`
                      }
                   </p>
                </div>
             </div>
          )}

          {/* Section: Location Info */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-slate-500" />
              <span className="text-xs font-black uppercase tracking-widest text-slate-700">Location Status</span>
            </div>
            <div className="p-5 grid grid-cols-2 gap-y-6 gap-x-4">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Current Location</span>
                <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                   {asset.currentLocation}
                   {asset.status === 'Location Mismatch' && <AlertTriangle className="h-3 w-3 text-red-500" />}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Registered System Location</span>
                <span className="font-medium text-slate-600 text-sm">{asset.registeredLocation}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Last Updated</span>
                <span className="font-medium text-slate-600 text-sm">{asset.lastUpdate.replace('T', ' ').replace('Z', '')}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Updated By</span>
                <span className="font-medium text-slate-600 text-sm">{asset.lastUpdatedBy} ({asset.trackingMethod})</span>
              </div>
            </div>
          </div>

          {/* Section: Asset Details */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
              <Info className="h-4 w-4 text-slate-500" />
              <span className="text-xs font-black uppercase tracking-widest text-slate-700">Asset Identity</span>
            </div>
            <div className="p-5 grid grid-cols-2 gap-y-6 gap-x-4">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Serial Number</span>
                <span className="font-mono font-medium text-slate-700 text-sm">{asset.serialNumber}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Current Custodian / PIC</span>
                <span className="font-medium text-slate-900 text-sm">{asset.pic}</span>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-slate-100 rounded-xl border border-slate-200 h-[200px] flex flex-col items-center justify-center text-slate-400 relative overflow-hidden shadow-inner">
             <Map className="h-8 w-8 mb-2 opacity-50" />
             <span className="text-xs font-bold uppercase tracking-wider">Map Visualization Unavailable</span>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                 <div className="h-4 w-4 rounded-full bg-pelni-blue shadow-lg border-2 border-white animate-pulse"></div>
                 <span className="text-[10px] font-bold mt-1 bg-white px-2 py-0.5 rounded shadow-sm text-slate-700">{asset.currentLocation}</span>
             </div>
          </div>

          {/* Section: Movement History */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <History className="h-5 w-5 text-slate-400" />
              <h3 className="text-lg font-black text-slate-900 tracking-tight">Movement Timeline</h3>
            </div>

            {asset.movementHistory.length === 0 ? (
               <div className="text-center py-8 bg-white rounded-xl border border-slate-200 border-dashed">
                  <p className="text-sm text-slate-500 font-medium">No movement history recorded yet.</p>
               </div>
            ) : (
               <div className="space-y-6 ml-2">
                 {asset.movementHistory.map((mov, i) => (
                   <div key={mov.id} className="flex gap-4 items-start border-b border-slate-100 pb-5 last:border-0 relative">
                     {i !== asset.movementHistory.length - 1 && (
                        <div className="absolute left-[11px] top-[24px] bottom-[-24px] w-0.5 bg-slate-200"></div>
                     )}
                     <div className="h-6 w-6 rounded-full bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center shrink-0 relative z-10 mt-1 text-slate-400">
                        <MapPin className="h-3 w-3" />
                     </div>
                     <div className="flex flex-col gap-1 w-full">
                       <div className="flex justify-between items-start">
                          <div>
                             <p className="text-sm font-bold text-slate-900">{mov.movementType}</p>
                             <p className="text-[10px] text-slate-500 font-medium">{mov.movementDate.replace('T', ' ').replace('Z', '')} by {mov.updatedBy}</p>
                          </div>
                          <Badge variant="secondary" className="text-[9px] uppercase tracking-wider bg-slate-100 text-slate-500 border-slate-200">{mov.movementType}</Badge>
                       </div>
                       
                       <div className="mt-2 bg-white rounded-lg border border-slate-200 p-3 shadow-sm">
                          <div className="grid grid-cols-2 gap-2 text-xs">
                             <div>
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">From</span>
                                <span className="font-medium text-slate-700">{mov.fromLocation}</span>
                             </div>
                             <div>
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">To</span>
                                <span className="font-medium text-slate-900">{mov.toLocation}</span>
                             </div>
                          </div>
                          {mov.notes && (
                             <p className="mt-2 pt-2 border-t border-slate-100 text-xs italic text-slate-500">"{mov.notes}"</p>
                          )}
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
            )}
          </div>
          
        </div>
      </SheetContent>
    </Sheet>
  );
}
