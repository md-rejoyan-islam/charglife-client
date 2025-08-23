"use client"

import React from "react"
import { Root, Indicator } from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof Root>,
  React.ComponentPropsWithoutRef<typeof Root>
>(({ className, value, ...props }, ref) => (
  <Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <Indicator
      className="h-full w-full flex-1 bg-[#FAD70F] transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </Root>
))

Progress.displayName = Root.displayName

export { Progress }
