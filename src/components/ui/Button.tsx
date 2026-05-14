"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  target?: string;
  className?: string;
  children: React.ReactNode;
}


export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", href, target, className, children, ...props }, ref) => {
    const variants = {
      primary: "bg-primary text-white hover:bg-primary/90 shadow-md",
      secondary: "bg-accent text-white hover:bg-accent/90 shadow-md",
      outline: "border-2 border-primary text-primary hover:bg-primary/5",
      ghost: "text-primary hover:bg-primary/5",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base font-semibold",
      lg: "px-8 py-4 text-lg font-bold",
    };

    const baseStyles = cn(
      "inline-flex items-center justify-center rounded-full transition-all duration-500 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden relative group",
      variants[variant],
      sizes[size],
      className
    );

    const Shimmer = () => (
      <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
    );

    if (href) {
      return (
        <Link href={href} target={target} className={baseStyles}>
          <Shimmer />
          <span className="relative z-10">{children}</span>
        </Link>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={baseStyles}
        whileHover={{ 
          scale: 1.05,
          boxShadow: variant === "primary" ? "0 20px 40px -15px rgba(108,63,239,0.5)" : "none"
        }}
        whileTap={{ scale: 0.95 }}
        {...(props as any)}
      >
        <Shimmer />
        <span className="relative z-10">{children}</span>
      </motion.button>
    );

  }
);

Button.displayName = "Button";
