import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Link from "next/link";

interface AdminButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  icon?: React.ReactNode;
  href?: string;
}

export const AdminButton = ({
  children,
  variant = "primary",
  size = "md",
  isLoading,
  icon,
  href,
  className,
  disabled,
  ...props
}: AdminButtonProps) => {
  const sizeStyles = {
    sm: "px-4 py-1.5 text-[10px]",
    md: "px-6 py-2.5 text-xs",
    lg: "px-8 py-3.5 text-sm",
  };

  const baseStyles = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl font-black uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed",
    sizeStyles[size]
  );
  
  const variants = {
    primary: "bg-gradient-to-br from-[#6C3FEF] to-[#5B35D1] text-white hover:shadow-2xl hover:shadow-[#6C3FEF40] shadow-xl shadow-[#6C3FEF20] hover:-translate-y-0.5",
    secondary: "bg-white text-slate-900 border border-slate-200 hover:border-[#6C3FEF] hover:text-[#6C3FEF] shadow-sm",
    outline: "bg-transparent border border-slate-200 text-slate-500 hover:text-[#6C3FEF] hover:border-[#6C3FEF] hover:bg-[#6C3FEF]/5",
    danger: "bg-red-50 text-red-600 border border-red-100 hover:bg-red-600 hover:text-white shadow-sm",
    ghost: "bg-transparent text-slate-500 hover:text-[#6C3FEF] hover:bg-[#6C3FEF]/5",
  };

  const content = (
    <>
      {isLoading ? <Loader2 className="animate-spin" size={16} /> : icon}
      {children}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn(baseStyles, variants[variant], className)}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={cn(baseStyles, variants[variant], className)}
      disabled={isLoading || disabled}
      {...props}
    >
      {content}
    </button>
  );
};
