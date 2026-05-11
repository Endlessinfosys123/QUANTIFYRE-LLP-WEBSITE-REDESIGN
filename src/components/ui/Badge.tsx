import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "surface";
  className?: string;
}

export const Badge = ({ children, variant = "primary", className }: BadgeProps) => {
  const variants = {
    primary: "bg-primary text-white shadow-lg shadow-primary/20",
    secondary: "bg-accent text-white shadow-lg shadow-accent/20",
    outline: "border-2 border-primary/20 text-primary",
    surface: "bg-primary/5 text-primary border border-primary/10 backdrop-blur-md",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
