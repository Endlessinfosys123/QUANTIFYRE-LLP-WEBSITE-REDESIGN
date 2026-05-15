import React from "react";
import { cn } from "@/lib/utils";

interface AdminTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const AdminTextarea = React.forwardRef<HTMLTextAreaElement, AdminTextareaProps>(
  ({ label, error, icon, className, ...props }, ref) => {
    return (
      <div className="space-y-2 w-full">
        {label && (
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
            {label}
          </label>
        )}
        <div className="relative group">
          {icon && (
            <div className="absolute left-4 top-4 text-slate-300 group-focus-within:text-[#6C3FEF] transition-colors pointer-events-none">
              {icon}
            </div>
          )}
          <textarea
            ref={ref}
            className={cn(
              "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 outline-none transition-all focus:bg-white focus:ring-4 focus:ring-[#6C3FEF10] focus:border-[#6C3FEF] placeholder:text-slate-400 font-medium min-h-[120px]",
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

AdminTextarea.displayName = "AdminTextarea";
