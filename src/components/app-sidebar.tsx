"use client"

import * as React from "react"
import {
  LayoutDashboard,
  ClipboardList,
  ShoppingCart,
  Wrench,
  Trash2,
  MapPin,
  Anchor,
  Settings,
  ChevronRight,
  User,
  LogOut,
  FileText,
  FileCheck,
  Building2,
  ChevronUp,
  ClipboardCheck,
  ClipboardPlus,
  ShoppingCart as PRIcon,
  PackageCheck,
  Truck,
  Repeat,
  Trash,
  CreditCard,
  TrendingUp
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  // {
  //   title: "Asset Management",
  //   icon: Anchor,
  //   items: [
  //     {
  //       title: "Asset Inventory",
  //       url: "/asset",
  //       icon: ClipboardList,
  //     },
  //   ],
  // },
  {
    title: "Perencanaan",
    icon: ClipboardList,
    items: [
      {
        title: "Plan & Desain",
        url: "/perencanaan",
        icon: FileText,
      },
      {
        title: "Create BoQ",
        url: "/perencanaan/boq",
        icon: FileCheck,
      },
      {
        title: "Purchase Request",
        url: "/perencanaan/pr",
        icon: PRIcon,
      },
    ],
  },
  {
    title: "Pengadaan",
    icon: ClipboardList,
    items: [
      {
        title: "WBS Assignment",
        url: "/pengadaan/wbs-assignment",
        icon: ClipboardList,
      },
      {
        title: "Purchase Order",
        url: "/pengadaan/purchase-order",
        icon: ClipboardList,
      },
      {
        title: "Delivery Order",
        url: "/pengadaan/delivery-order",
        icon: ClipboardList,
      },
      {
        title: "Vendor Reference",
        url: "/pengadaan/vendor",
        icon: Building2,
      },
    ]
  },
  {
    title: "Pemasangan",
    icon: ClipboardList,
    items: [
      {
        title: "Instalasi",
        url: "/pemasangan/installasi",
        icon: ClipboardPlus,
      },
      {
        title: "Acceptance Test",
        url: "/pemasangan/installasi/acceptance-test",
        icon: ClipboardCheck,
      },
      {
        title: "Asset Registration",
        url: "/pemasangan/assetregistration",
        icon: Wrench,
      }
    ]
  },
  {
    title: "Pemeliharaan",
    icon: Wrench,
    items: [
      {
        title: "Maintenance",
        url: "/pemeliharaan/maintenance",
        icon: FileText,
      },
      {
        title: "Stock Opname",
        url: "/pemeliharaan/stock-opname",
        icon: PackageCheck,
      },
      {
        title: "Asset Tracking",
        url: "/pemeliharaan/asset-tracking",
        icon: MapPin,
      }
    ]
  },
  {
    title: "Penghapusan",
    icon: Trash2,
    items: [
      {
        title: "Movement",
        url: "/penghapusan/movement",
        icon: Truck,
      },
      {
        title: "Replacement",
        url: "/penghapusan/replacement",
        icon: Repeat,
      },
      {
        title: "Dismantle / Disposal",
        url: "/penghapusan/disposal",
        icon: Trash,
      }
    ]
  },
  {
    title: "Invoices",
    icon: FileText,
    items: [
      {
        title: "Dashboard",
        url: "/invoices",
        icon: LayoutDashboard,
      },
      {
        title: "Vendor Invoice",
        url: "/invoices/list",
        icon: FileText,
      },
      {
        title: "Invoice Matching",
        url: "/invoices/matching",
        icon: FileCheck,
      },
      {
        title: "Approval Queue",
        url: "/invoices/approval",
        icon: ClipboardCheck,
      },
      {
        title: "Payment Monitoring",
        url: "/invoices/payments",
        icon: CreditCard,
      },
      {
        title: "Cost Allocation",
        url: "/invoices/allocation",
        icon: TrendingUp,
      },
    ]
  },
  {
    title: "Master Data",
    icon: Settings,
    items: [
      {
        title: "Location",
        url: "/master/location",
        icon: MapPin,
      },
      {
        title: "Equipment",
        url: "/master/equipment",
        icon: Anchor,
      },
    ],
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [openMenus, setOpenMenus] = React.useState<Record<string, boolean>>(() => {
    // Automatically open the menu that contains the active sub-item
    const initialState: Record<string, boolean> = {}
    items.forEach(item => {
      if (item.items?.some(sub => pathname === sub.url)) {
        initialState[item.title] = true
      }
    })
    // Default fallback for demo
    if (Object.keys(initialState).length === 0) {
      initialState["Perencanaan"] = true
    }
    return initialState
  })

  const toggleMenu = (title: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [title]: !prev[title]
    }))
  }

  // Helper to check if a menu has an active sub-item
  const isSubItemActive = (item: any) => {
    if (!item.items) return pathname === item.url
    return item.items.some((sub: any) => pathname === sub.url)
  }

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="border-r-0">
      <SidebarHeader className="border-b border-white/5 bg-gradient-to-b from-[#1e2d63] to-pelni-blue px-6 py-8 text-white">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <div className="absolute -inset-2 bg-pelni-sky/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-white p-2.5 rounded-xl shadow-2xl shadow-black/20 flex items-center justify-center ring-1 ring-white/10">
              <img src="/pelni_logo.png" alt="logo-pelni" className="h-10 w-auto object-contain" />
            </div>
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tighter leading-none">
                EAM
              </span>
              <span className="bg-pelni-sky/20 text-pelni-sky text-[9px] px-1.5 py-0.5 rounded-full font-bold tracking-widest uppercase border border-pelni-sky/30">
                v2
              </span>
            </div>
            <p className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.2em] whitespace-nowrap">
              PELNI Assets
            </p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-slate-50">
        <SidebarGroup>
          <SidebarMenu className="gap-1 mt-2">
            {items.map((item) => {
              const active = isSubItemActive(item)
              const isOpen = openMenus[item.title]

              return (
                <SidebarMenuItem key={item.title} data-state={isOpen ? "open" : "closed"}>
                  {item.items ? (
                    <>
                      <SidebarMenuButton
                        tooltip={item.title}
                        onClick={() => toggleMenu(item.title)}
                        className={cn(
                          "font-bold transition-colors",
                          active ? "text-pelni-blue bg-pelni-blue/5" : "text-slate-700 hover:bg-slate-200/50"
                        )}
                      >
                        <item.icon className={cn("h-5 w-5", active ? "text-pelni-blue" : "text-slate-500")} />
                        <span>{item.title}</span>
                        <ChevronRight className={cn(
                          "ml-auto transition-transform duration-200",
                          isOpen && "rotate-90"
                        )} />
                      </SidebarMenuButton>

                      {isOpen && (
                        <SidebarMenuSub className="mt-1 transition-all">
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                isActive={pathname === subItem.url}
                                className={cn(
                                  "transition-all duration-200",
                                  pathname === subItem.url
                                    ? "bg-pelni-blue text-white font-bold shadow-sm shadow-pelni-blue/20"
                                    : "text-slate-600 hover:text-pelni-blue hover:bg-pelni-blue/5"
                                )}
                                render={
                                  <Link href={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </Link>
                                }
                              />
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      )}
                    </>
                  ) : (
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={pathname === item.url}
                      className={cn(
                        "font-bold transition-colors",
                        pathname === item.url
                          ? "bg-pelni-blue text-white shadow-md shadow-pelni-blue/20"
                          : "text-slate-700 hover:bg-slate-200/50"
                      )}
                      render={
                        <Link href={item.url}>
                          <item.icon className={cn("h-5 w-5", pathname === item.url ? "text-white" : "text-slate-500")} />
                          <span>{item.title}</span>
                        </Link>
                      } />
                  )}
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-pelni-blue/10 bg-slate-50 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton
                    size="lg"
                    className="w-full justify-start gap-3 hover:bg-pelni-blue/5 transition-colors"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-pelni-blue text-white shadow-sm ring-2 ring-white">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col items-start text-sm group-data-[collapsible=icon]:hidden overflow-hidden text-left">
                      <span className="font-semibold text-slate-900 truncate w-full">
                        Administrator
                      </span>
                      <span className="text-xs text-pelni-mid font-medium truncate w-full">
                        Admin EAM
                      </span>
                    </div>
                    <ChevronUp className="ml-auto h-4 w-4 text-slate-400 group-data-[collapsible=icon]:hidden" />
                  </SidebarMenuButton>
                }
              />
              <DropdownMenuContent
                side="top"
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-xl p-2 shadow-xl border-pelni-blue/10"
                align="start"
              >
                <DropdownMenuItem className="gap-2 px-3 py-2.5 cursor-pointer rounded-lg focus:bg-pelni-blue/5 focus:text-pelni-blue transition-colors">
                  <User className="h-4 w-4 opacity-70" />
                  <span className="font-medium">Profile</span>
                </DropdownMenuItem>
                <div className="h-px bg-slate-100 my-1 mx-1" />
                <Link href="/login" className="block w-full">
                  <DropdownMenuItem className="gap-2 px-3 py-2.5 cursor-pointer rounded-lg text-red-600 focus:text-red-600 focus:bg-red-50 transition-colors">
                    <LogOut className="h-4 w-4" />
                    <span className="font-medium">Logout</span>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
