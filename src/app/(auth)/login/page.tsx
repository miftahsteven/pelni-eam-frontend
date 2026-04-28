import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Anchor } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 relative overflow-hidden bg-[#0a1a3a]">
      {/* 4K Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/background_pelni.png"
          alt="PELNI background"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1a3a]/80 via-[#0a1a3a]/40 to-[#0a1a3a]/80" />
      </div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-2xl transition-all hover:bg-white/15">
            <div className="bg-white p-2.5 rounded-xl shadow-xl flex items-center justify-center">
              <img src="/pelni_logo.png" alt="logo-pelni" className="h-12 w-auto object-contain" />
            </div>
            <div className="flex flex-col gap-0.5 text-white">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-black tracking-tighter leading-none">
                  EAM
                </span>
                <span className="bg-pelni-sky text-white text-[10px] px-2 py-0.5 rounded-full font-bold tracking-widest uppercase shadow-lg shadow-pelni-sky/40">
                  v2
                </span>
              </div>
              <p className="text-xs font-semibold text-white/60 uppercase tracking-[0.25em] whitespace-nowrap">
                Digitalizing Maritim
              </p>
            </div>
          </div>
        </div>

        <Card className="border-white/20 shadow-2xl bg-white/95 backdrop-blur-xl ring-1 ring-white/10 rounded-2xl overflow-hidden">
          <CardHeader className="space-y-2 pb-6 pt-10 px-8">
            <CardTitle className="text-3xl text-center font-black tracking-tight text-slate-900">Selamat Datang</CardTitle>
            <CardDescription className="text-center font-semibold text-slate-500">
              Silakan login untuk mengelola aset perusahaan
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 px-8">
            <div className="grid gap-2.5">
              <label className="text-sm font-bold tracking-wide text-slate-700" htmlFor="email">
                Username / Email Perusahaan
              </label>
              <Input
                id="email"
                placeholder="npp@pelni.co.id"
                type="email"
                className="h-12 bg-slate-50/50 border-slate-200 focus-visible:ring-pelni-blue/20 font-medium rounded-xl"
                required
              />
            </div>
            <div className="grid gap-2.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold tracking-wide text-slate-700" htmlFor="password">
                  Password
                </label>
                <a href="#" className="text-xs font-bold text-pelni-blue hover:text-pelni-mid transition-colors underline-offset-4 hover:underline">
                  Lupa password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                className="h-12 bg-slate-50/50 border-slate-200 focus-visible:ring-pelni-blue/20 rounded-xl"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="pb-12 pt-6 px-8 flex flex-col gap-6">
            <Link
              href="/"
              className={buttonVariants({
                className: "w-full h-13 bg-pelni-blue hover:bg-pelni-mid font-black text-lg shadow-xl shadow-pelni-blue/30 transition-all active:scale-[0.98] rounded-xl"
              })}
            >
              Sign In ke Dashboard
            </Link>
            <div className="flex flex-col items-center gap-3 pt-2">
              <div className="h-px w-12 bg-slate-200" />
              <p className="text-center text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">
                Internal Corporate System
              </p>
            </div>
          </CardFooter>
        </Card>

        <p className="text-center text-xs font-bold text-white/70 drop-shadow-sm">
          © 2026 PT PELNI (Persero). Digitalisasi Maritim Indonesia.
        </p>
      </div>
    </div>
  )
}
