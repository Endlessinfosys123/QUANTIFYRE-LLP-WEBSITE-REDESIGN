import React from "react";
import { cn } from "@/lib/utils";

interface AdminBadgeProps {
  children: React.ReactNode;
  variant?: "success" | "warning" | "error" | "info" | "neutral" | "primary" | "secondary";
  className?: string;
}

export const AdminBadge = ({ children, variant = "neutral", className }: AdminBadgeProps) => {
  const variants = {
    success: "bg-emerald-50 text-emerald-600 border-emerald-100",
    warning: "bg-amber-50 text-amber-600 border-amber-100",
    error: "bg-red-50 text-red-600 border-red-100",
    info: "bg-blue-50 text-blue-600 border-blue-100",
    neutral: "bg-slate-50 text-slate-500 border-slate-200",
    primary: "bg-[#6C3FEF]/5 text-[#6C3FEF] border-[#6C3FEF]/10",
    secondary: "bg-slate-100 text-slate-500 border-slate-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
