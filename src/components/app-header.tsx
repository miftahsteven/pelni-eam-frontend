"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function AppHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 px-4 sticky top-0 bg-gradient-to-r from-[#1e2d63] to-pelni-blue shadow-md z-10">
      <SidebarTrigger className="-ml-1 text-white hover:text-white/80 hover:bg-white/10" />
      <Separator orientation="vertical" className="mr-2 h-4 bg-white/20" />
      <div className="flex-1 flex items-center gap-4 md:gap-6">
        <div className="flex flex-col gap-0.5 border-r border-white/20 pr-4 md:pr-6 hidden sm:flex">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tighter leading-none text-white">
              EAM
            </span>
            <span className="bg-[#7fc241]/20 text-[#7fc241] text-[9px] px-1.5 py-0.5 rounded-full font-bold tracking-widest uppercase border border-[#7fc241]/30">
              v2
            </span>
          </div>
          <p className="text-[10px] font-semibold text-white/70 uppercase tracking-[0.2em] whitespace-nowrap">
            PELNI Assets
          </p>
        </div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-[#7fc241] font-semibold hover:text-[#7fc241]/80 transition-colors">EAM PELNI</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-white/40" />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium text-white/80">Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex relative w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-white/50" />
          <Input placeholder="Search assets, PR, PO..." className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-white/30" />
        </div>
        <Button variant="ghost" size="icon" className="relative text-white hover:text-white hover:bg-white/10">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-pelni-blue" />
        </Button>
      </div>
    </header>
  )
}
