"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const RadioGroupContext = React.createContext<{
  value?: string
  onValueChange?: (value: string) => void
}>({})

const RadioGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value?: string
    onValueChange?: (value: string) => void
  }
>(({ className, value, onValueChange, ...props }, ref) => {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div
        ref={ref}
        role="radiogroup"
        className={cn("grid gap-2", className)}
        {...props}
      />
    </RadioGroupContext.Provider>
  )
})
RadioGroup.displayName = "RadioGroup"

const RadioGroupItem = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    value: string
  }
>(({ className, value, ...props }, ref) => {
  const context = React.useContext(RadioGroupContext)
  const checked = context.value === value

  return (
    <div className="flex items-center space-x-2">
      <div className={cn(
        "aspect-square h-4 w-4 rounded-full border border-blue-600 text-blue-600 focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center transition-all",
        checked ? "bg-white" : "bg-white border-slate-300"
      )}>
        <input
          type="radio"
          ref={ref}
          value={value}
          checked={checked}
          onChange={() => context.onValueChange?.(value)}
          className={cn("peer sr-only", className)}
          {...props}
        />
        {checked && (
          <div className="h-2 w-2 rounded-full bg-blue-600" />
        )}
      </div>
    </div>
  )
})
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }
