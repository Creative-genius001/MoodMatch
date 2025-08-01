import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "card-gradient relative rounded-xl border border-[#2e4635] shadow-elegant backdrop-blur-sm",
      className
    )}
    {...props}
  />
))

Card.displayName = "Card"

export { Card }