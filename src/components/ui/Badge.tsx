import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "surface";
  className?: string;
}

export const Badge = ({ children, variant = "primary", className }: BadgeProps) => {
  const variants = {
    primary: "bg-primary text-white",
    secondary: "bg-accent text-white",
    outline: "border border-primary text-primary",
    surface: "bg-surface text-primary border border-primary/10",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
