"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Printer, 
  ArrowLeft, 
  Download, 
  CheckCircle2, 
  ShieldCheck 
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { disposalRequests } from "../../disposal-data";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function DisposalCertificatePage() {
  const params = useParams();
  const id = params.id as string;
  const req = disposalRequests.find(r => r.id === id) || disposalRequests[0];

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* TOP BAR */}
        <div className="flex justify-between items-center no-print">
          <Button variant="ghost" className="gap-2 text-slate-600 font-bold" render={
             <Link href={`/penghapusan/disposal/${req.id}`}>
               <ArrowLeft className="h-4 w-4" /> Back to Detail
             </Link>
          } />
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2 bg-white border-slate-200 shadow-sm" onClick={() => window.print()}>
              <Printer className="h-4 w-4" /> Print Document
            </Button>
            <Button className="gap-2 bg-slate-900 shadow-sm">
              <Download className="h-4 w-4" /> Export PDF
            </Button>
          </div>
        </div>

        {/* CERTIFICATE CONTENT */}
        <Card className="bg-white shadow-xl border-0 rounded-none p-16 print:p-0 print:shadow-none min-h-[1100px] relative overflow-hidden">
           {/* WATERMARK */}
           <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none rotate-[-45deg] select-none">
              <span className="text-[120px] font-black tracking-tighter">PT PELNI</span>
           </div>

           {/* HEADER */}
           <div className="flex justify-between items-start border-b-4 border-slate-900 pb-8 relative z-10">
              <div className="space-y-1">
                 <h1 className="text-3xl font-black tracking-tighter text-slate-900">PT PELNI (PERSERO)</h1>
                 <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Enterprise Asset Management System</p>
                 <p className="text-[10px] text-slate-400">Jl. Gajah Mada No. 14, Jakarta Pusat, 10130</p>
              </div>
              <div className="text-right space-y-1">
                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded text-emerald-700 font-black text-[10px] uppercase tracking-widest mb-4">
                    <ShieldCheck className="h-3 w-3" /> Digitally Verified
                 </div>
                 <p className="text-xs font-bold text-slate-400 uppercase">Document No.</p>
                 <p className="text-xl font-black text-slate-900 font-mono">{req.requestNo}/CERT/2026</p>
              </div>
           </div>

           {/* TITLE */}
           <div className="py-12 text-center space-y-2 relative z-10">
              <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900">Berita Acara Penghapusan Aset</h2>
              <div className="h-1 w-24 bg-slate-900 mx-auto"></div>
           </div>

           {/* BODY */}
           <div className="space-y-8 text-sm leading-relaxed text-slate-800 relative z-10">
              <p>
                 Pada hari ini, <span className="font-bold underline">{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>, telah dilaksanakan verifikasi akhir dan eksekusi penghapusan aset tetap milik PT PELNI (Persero) dengan rincian sebagai berikut:
              </p>

              <div className="grid grid-cols-2 gap-y-4 py-6 border-y border-slate-100">
                 <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase text-slate-400">Kode Aset</span>
                    <p className="font-bold font-mono text-slate-900">{req.assetCode}</p>
                 </div>
                 <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase text-slate-400">Nama Aset</span>
                    <p className="font-bold text-slate-900">{req.assetName}</p>
                 </div>
                 <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase text-slate-400">Kategori</span>
                    <p className="font-bold text-slate-900">{req.category}</p>
                 </div>
                 <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase text-slate-400">Tipe Penghapusan</span>
                    <p className="font-bold text-slate-900">{req.disposalType}</p>
                 </div>
                 <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase text-slate-400">Lokasi Terakhir</span>
                    <p className="font-bold text-slate-900">{req.currentLocation}</p>
                 </div>
                 <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase text-slate-400">Nilai Buku</span>
                    <p className="font-bold text-slate-900 font-mono tracking-tight text-lg">Rp {req.bookValue?.toLocaleString() || '0'}</p>
                 </div>
              </div>

              <div className="space-y-3">
                 <h4 className="font-black text-slate-900 uppercase text-xs tracking-wider">Justifikasi Penghapusan:</h4>
                 <p className="p-4 bg-slate-50 border border-slate-100 rounded text-xs italic text-slate-600">
                    "{req.reason || 'Asset reached end of useful life and technical condition is unrepairable.'}"
                 </p>
              </div>

              <p>
                 Penghapusan ini telah disetujui secara berjenjang melalui sistem Enterprise Asset Management (EAM) oleh unit teknis, unit aset, unit finansial, dan manajemen terkait. Segala konsekuensi akuntansi dan perpindahan fisik aset telah dicatatkan sesuai dengan regulasi perusahaan.
              </p>

              {/* SIGNATURES */}
              <div className="pt-24 grid grid-cols-3 gap-12 text-center">
                 <div className="space-y-16">
                    <div className="space-y-1">
                       <p className="text-[10px] font-black uppercase text-slate-400">Requester</p>
                       <div className="h-16 flex items-center justify-center opacity-30 italic text-xs">Digitally Signed</div>
                       <p className="font-bold text-xs border-t border-slate-200 pt-2">{req.requester}</p>
                    </div>
                 </div>
                 <div className="space-y-16">
                    <div className="space-y-1">
                       <p className="text-[10px] font-black uppercase text-slate-400">Asset Manager</p>
                       <div className="h-16 flex items-center justify-center">
                          <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                       </div>
                       <p className="font-bold text-xs border-t border-slate-200 pt-2">Ratna Sari</p>
                    </div>
                 </div>
                 <div className="space-y-16">
                    <div className="space-y-1">
                       <p className="text-[10px] font-black uppercase text-slate-400">Finance Controller</p>
                       <div className="h-16 flex items-center justify-center opacity-30 italic text-xs">Digitally Signed</div>
                       <p className="font-bold text-xs border-t border-slate-200 pt-2">Bambang Wijaya</p>
                    </div>
                 </div>
              </div>

              {/* FOOTER */}
              <div className="pt-24 text-[9px] text-slate-400 text-center uppercase tracking-widest border-t border-slate-100 mt-auto">
                 Dokumen ini dihasilkan secara otomatis oleh sistem EAM PELNI dan sah tanpa tanda tangan basah.
              </div>
           </div>
        </Card>
      </div>
    </div>
  );
}


