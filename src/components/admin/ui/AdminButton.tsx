import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface AdminButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  icon?: React.ReactNode;
  href?: string;
  target?: string;
}

export const AdminButton = ({
  children,
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
  icon,
  disabled,
  href,
  target,
  ...props
}: AdminButtonProps) => {
  const variants = {
    primary: "bg-[#6C3FEF] text-white hover:bg-[#5a32d4] shadow-sm",
    secondary: "bg-[#F3F0FF] text-[#6C3FEF] hover:bg-[#e9e4ff]",
    danger: "bg-[#EF4444] text-white hover:bg-[#dc2626]",
    outline: "border-2 border-[#6C3FEF] text-[#6C3FEF] bg-transparent hover:bg-[#F3F0FF]",
    ghost: "text-[#6B7280] hover:bg-gray-100",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const commonClasses = cn(
    "inline-flex items-center justify-center gap-2 font-bold rounded-lg transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
    variants[variant],
    sizes[size],
    className
  );

  const content = (
    <>
      {isLoading ? <Loader2 className="animate-spin" size={18} /> : icon}
      {children}
    </>
  );

  if (href) {
    return (
      <Link href={href} target={target} className={commonClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={commonClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {content}
    </button>
  );
};
