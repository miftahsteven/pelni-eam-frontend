import { ModuleHeader } from "@/components/module-header"

export default function InvoicesPage() {
  return (
    <div className="space-y-4">
      <ModuleHeader
        title="Invoices"
        description="Kelola tagihan dan pembayaran vendor terkait pengadaan dan pemasangan."
        actionLabel="Create Invoice"
      />
      <div className="bg-white p-20 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
        <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-slate-500 font-medium">Modul Invoices dalam tahap pengembangan.</p>
      </div>
    </div>
  )
}
