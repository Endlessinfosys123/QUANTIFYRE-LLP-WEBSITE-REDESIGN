import React from "react";
import { cn } from "@/lib/utils";

interface AdminInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const AdminInput = React.forwardRef<HTMLInputElement, AdminInputProps>(
  ({ label, error, icon, className, ...props }, ref) => {
    return (
      <div className="space-y-2 w-full">
        {label && (
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 outline-none transition-all focus:bg-white focus:ring-4 focus:ring-[#6C3FEF10] focus:border-[#6C3FEF] placeholder:text-slate-400 font-medium",
              icon && "pl-11",
              error && "border-red-500",
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-[10px] font-bold text-red-500 ml-1">{error}</p>}
      </div>
    );
  }
);

AdminInput.displayName = "AdminInput";

