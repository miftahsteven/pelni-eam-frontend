import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface ModuleHeaderProps {
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

export function ModuleHeader({ title, description, actionLabel, onAction }: ModuleHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      {actionLabel && (
        <Button onClick={onAction} className="bg-pelni-blue hover:bg-pelni-mid shadow-md shadow-pelni-blue/20 font-bold px-6">
          <Plus className="mr-2 h-4 w-4" />
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
