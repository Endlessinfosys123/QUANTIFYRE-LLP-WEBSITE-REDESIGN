import React from "react";
import { cn } from "@/lib/utils";

interface AdminBadgeProps {
  children: React.ReactNode;
  variant?: "success" | "warning" | "error" | "info" | "neutral" | "primary" | "secondary";
  className?: string;
}

export const AdminBadge = ({ children, variant = "neutral", className }: AdminBadgeProps) => {
  const variants = {
    success: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    error: "bg-red-500/10 text-red-500 border-red-500/20",
    info: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    neutral: "bg-[#1E1E2E] text-[#A0A0B0] border-[#3F3F46]",
    primary: "bg-[#6C3FEF]/10 text-[#6C3FEF] border-[#6C3FEF]/20",
    secondary: "bg-[#13131F] text-[#3F3F46] border-[#1E1E2E]",
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
