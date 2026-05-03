"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange?: (checked: boolean) => void
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, onCheckedChange, ...props }, ref) => {
    return (
      <div className="relative flex items-center justify-center h-4 w-4 shrink-0 rounded-sm border border-blue-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white transition-all">
        <input
          type="checkbox"
          className={cn(
            "peer h-4 w-4 cursor-pointer opacity-0 absolute inset-0 z-10",
            className
          )}
          ref={ref}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          {...props}
        />
        <div className="hidden peer-checked:flex items-center justify-center h-full w-full bg-blue-600 text-white rounded-sm transition-all">
          <Check className="h-3 w-3 stroke-[4px]" />
        </div>
      </div>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
