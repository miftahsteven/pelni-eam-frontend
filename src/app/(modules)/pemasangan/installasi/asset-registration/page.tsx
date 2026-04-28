import { ModuleHeader } from "@/components/module-header"

export default function AssetRegistrationPage() {
  return (
    <div className="space-y-4">
      <ModuleHeader
        title="2.4.3 Asset Registration"
        description="Registrasi identitas aset (nomor lambung, nomor mesin, dll) setelah lolos acceptance test."
        actionLabel="Register Asset"
      />
      <div className="bg-white p-20 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
        <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <p className="text-slate-500 font-medium">Modul Asset Registration dalam tahap pengembangan.</p>
      </div>
    </div>
  )
}
