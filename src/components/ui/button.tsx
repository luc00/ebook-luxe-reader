import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground",
        sunny: "bg-highlight text-highlight-foreground hover:bg-background",
        outline: "border border-border bg-card text-foreground hover:border-accent hover:text-accent",
        ghost: "bg-foreground/10 text-background hover:bg-foreground/20",
        icon: "size-10 bg-background/10 px-0 text-background hover:bg-background/20",
      },
      size: {
        default: "h-10 px-5",
        small: "h-9 px-4 text-xs",
        large: "h-12 px-6",
        icon: "size-10 px-0",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

function Button({ className, variant, size, asChild, ...props }: ButtonProps) {
  const Component = asChild ? Slot : "button";
  return <Component className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { Button, buttonVariants };