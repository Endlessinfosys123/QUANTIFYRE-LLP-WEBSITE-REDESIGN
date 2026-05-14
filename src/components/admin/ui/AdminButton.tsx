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
    primary: "bg-[#6C3FEF] text-white hover:bg-[#5B35D1] shadow-lg shadow-[#6C3FEF20]",
    secondary: "bg-[#13131F] text-white border border-[#1E1E2E] hover:border-[#6C3FEF]",
    outline: "bg-transparent border border-[#1E1E2E] text-[#A0A0B0] hover:text-white hover:border-[#6C3FEF]",
    danger: "bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white",
    ghost: "bg-transparent text-[#A0A0B0] hover:text-white hover:bg-[#1E1E2E]",
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
