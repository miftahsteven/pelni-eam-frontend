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
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 sticky top-0 bg-background z-10">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <div className="flex-1">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-pelni-blue font-semibold hover:text-pelni-mid transition-colors">EAM PELNI</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium text-slate-500">Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex relative w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-pelni-mid" />
          <Input placeholder="Search assets, PR, PO..." className="pl-10 border-slate-200 focus-visible:ring-pelni-blue/20" />
        </div>
        <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-pelni-blue hover:bg-pelni-blue/5">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white" />
        </Button>
      </div>
    </header>
  )
}
