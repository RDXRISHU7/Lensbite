import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-[40px] text-sm font-black ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 active:scale-[0.96]",
  {
    variants: {
      variant: {
        default: "liquid-glass-base liquid-glass-purple",
        scan: "liquid-glass-base liquid-glass-aqua",
        destructive: "liquid-glass-base liquid-glass-destructive",
        outline: "liquid-glass-base liquid-glass-clear border-2",
        secondary: "liquid-glass-base liquid-glass-pink",
        ghost: "hover:bg-white/40 hover:backdrop-blur-md transition-all",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-14 px-10",
        sm: "h-10 rounded-full px-6 text-xs",
        lg: "h-20 rounded-full px-16 text-xl",
        icon: "h-12 w-12 rounded-full",
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