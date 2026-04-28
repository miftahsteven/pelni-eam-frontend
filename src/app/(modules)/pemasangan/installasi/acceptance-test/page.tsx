import { ModuleHeader } from "@/components/module-header"

export default function AcceptanceTestPage() {
  return (
    <div className="space-y-4">
      <ModuleHeader
        title="2.4.2 Acceptance Test"
        description="Pengujian hasil pemasangan equipment sebelum diregistrasi sebagai aset operasional."
        actionLabel="New Test Record"
      />
      <div className="bg-white p-20 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
        <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-slate-500 font-medium">Modul Acceptance Test dalam tahap pengembangan.</p>
      </div>
    </div>
  )
}
