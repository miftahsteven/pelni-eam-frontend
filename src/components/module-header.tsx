import { Button } from "@/components/ui/button"
import { Plus, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface ModuleHeaderProps {
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  icon?: React.ReactNode
  children?: React.ReactNode
  showBack?: boolean
  backUrl?: string
}

export function ModuleHeader({ 
  title, 
  description, 
  actionLabel, 
  onAction,
  icon,
  children,
  showBack,
  backUrl 
}: ModuleHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        {showBack && (
          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-900" render={
            <Link href={backUrl || "#"}>
               <ArrowLeft className="h-4 w-4" />
            </Link>
          } />
        )}
        <div className="h-10 w-10 rounded-xl bg-pelni-blue/10 flex items-center justify-center text-pelni-blue shrink-0">
          {icon || <Plus className="h-5 w-5" />}
        </div>
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none mb-1">{title}</h1>
          {description && <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">{description}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {children}
        {actionLabel && (
          <Button onClick={onAction} className="bg-pelni-blue hover:bg-blue-700 shadow-md shadow-blue-500/20 font-bold px-6 h-10 gap-2">
            <Plus className="h-4 w-4" />
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  )
}
