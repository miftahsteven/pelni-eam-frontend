import { ModuleHeader } from "@/components/module-header"

export default function AssetListPage() {
  return (
    <div className="space-y-4">
      <ModuleHeader
        title="Asset Inventory"
        description="Daftar seluruh aset operasional PT PELNI (Persero)."
        actionLabel="Add Asset"
      />
      <div className="bg-white p-20 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
        <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <p className="text-slate-500 font-medium">Modul Asset Inventory dalam tahap pengembangan.</p>
      </div>
    </div>
  )
}
