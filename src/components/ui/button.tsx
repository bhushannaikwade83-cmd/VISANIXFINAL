import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "motion-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-hero !text-white shadow-lg hover:bg-hero/90 hover:shadow-[0_12px_32px_rgba(21,79,157,0.4)]",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border-2 border-hero text-hero bg-transparent hover:bg-hero/10 hover:text-hero font-semibold transition-all duration-300 shadow-sm hover:shadow-md",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-hero underline-offset-4 hover:underline",
        hero: "bg-gradient-to-br from-hero to-hero/80 !text-white shadow-xl hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 font-bold tracking-wide border border-hero/50",
        ivory: "border border-hero-foreground/40 bg-transparent text-hero-foreground hover:bg-hero-foreground hover:text-hero",
        ivoryWhite: "border border-hero-foreground/40 bg-transparent !text-white hover:bg-hero-foreground hover:!text-hero",
        gold: "bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-[0_12px_32px_rgba(196,169,97,0.5)]",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-md px-7",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
