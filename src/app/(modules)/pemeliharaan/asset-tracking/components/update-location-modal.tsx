import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, ScanLine, Save, X } from "lucide-react";
import { AssetTrackingItem } from "../asset-tracking-data";

interface UpdateLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset: AssetTrackingItem | null;
}

export function UpdateLocationModal({ isOpen, onClose, asset }: UpdateLocationModalProps) {
  if (!asset) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden bg-slate-50">
        <DialogHeader className="px-6 py-4 bg-white border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <MapPin className="h-4 w-4" />
            </div>
            <div>
              <DialogTitle className="text-lg font-black text-slate-900">Update Asset Location</DialogTitle>
              <p className="text-xs font-medium text-slate-500">Record a new physical location for this asset.</p>
            </div>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Readonly Info */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
            <div className="space-y-1">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Asset Code</Label>
              <p className="font-bold text-slate-900 text-sm">{asset.assetCode}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Asset Name</Label>
              <p className="font-bold text-slate-900 text-sm">{asset.assetName}</p>
            </div>
            <div className="col-span-2 space-y-1">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Registered Location (System)</Label>
              <p className="font-bold text-slate-500 text-sm">{asset.registeredLocation}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div className="md:col-span-2 space-y-2">
              <Label className="text-xs font-bold text-slate-700">New Physical Location <span className="text-red-500">*</span></Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input defaultValue={asset.currentLocation} className="pl-9 border-slate-200 bg-white" />
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                </div>
                <Button variant="outline" className="gap-2 border-slate-200 bg-white shrink-0">
                  <ScanLine className="h-4 w-4" /> Scan
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-700">Movement Type <span className="text-red-500">*</span></Label>
              <Select defaultValue="Relocation">
                <SelectTrigger className="border-slate-200 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Transfer">Transfer</SelectItem>
                  <SelectItem value="Relocation">Relocation</SelectItem>
                  <SelectItem value="Inspection">Inspection</SelectItem>
                  <SelectItem value="Check-out">Check-out</SelectItem>
                  <SelectItem value="Check-in">Check-in</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-700">PIC / Custodian</Label>
              <Input defaultValue={asset.pic} className="border-slate-200 bg-white" />
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label className="text-xs font-bold text-slate-700">Notes / Remarks</Label>
              <Textarea placeholder="Explain why this asset was moved..." className="min-h-[80px] border-slate-200 bg-white" />
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-white border-t border-slate-200 flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose} className="text-slate-600 font-bold">
            <X className="h-4 w-4 mr-2" /> Cancel
          </Button>
          <Button onClick={onClose} className="bg-pelni-blue hover:bg-blue-700 font-bold">
            <Save className="h-4 w-4 mr-2" /> Update Location
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
