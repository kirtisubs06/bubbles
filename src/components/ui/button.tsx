
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        blue: "bg-bubbles-blue text-white hover:bg-bubbles-blue/90 shadow-md hover:shadow-lg hover:translate-y-[-2px]",
        purple: "bg-[#9b87f5] text-white hover:bg-[#9b87f5]/90 shadow-md hover:shadow-lg hover:translate-y-[-2px]",
        teal: "bg-bubbles-teal text-white hover:bg-bubbles-teal/90 shadow-md hover:shadow-lg hover:translate-y-[-2px]",
        navy: "bg-bubbles-navy text-white hover:bg-bubbles-navy/90 shadow-md hover:shadow-lg hover:translate-y-[-2px]",
        cream: "bg-bubbles-cream text-bubbles-deep hover:bg-bubbles-cream/90 shadow-md hover:shadow-lg hover:translate-y-[-2px]",
        sand: "bg-bubbles-sand text-bubbles-deep hover:bg-bubbles-sand/90 shadow-md hover:shadow-lg hover:translate-y-[-2px]",
        fun: "bg-gradient-to-r from-bubbles-teal to-bubbles-lightblue text-white shadow-bubbly hover:shadow-lg hover:translate-y-[-3px] border-2 border-white",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3",
        lg: "h-11 rounded-xl px-8",
        xl: "h-12 rounded-xl px-10 text-base",
        full: "w-full h-10 px-4 py-2 text-base font-semibold",
        icon: "h-10 w-10 rounded-full",
        bubble: "h-12 w-12 rounded-full p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
