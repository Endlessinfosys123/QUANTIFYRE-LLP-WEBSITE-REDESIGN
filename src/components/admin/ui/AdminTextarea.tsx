import React from "react";
import { cn } from "@/lib/utils";

interface AdminTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const AdminTextarea = React.forwardRef<HTMLTextAreaElement, AdminTextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="space-y-1.5 w-full">
        {label && (
          <label className="text-sm font-medium text-[#374151] block">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            "w-full px-4 py-3 bg-white border border-[#D1D5DB] rounded-lg text-sm text-[#111827] outline-none transition-all focus:ring-2 focus:ring-[#6C3FEF] focus:border-transparent placeholder:text-[#9CA3AF] min-h-[100px] resize-y",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs font-medium text-red-500">{error}</p>}
      </div>
    );
  }
);

AdminTextarea.displayName = "AdminTextarea";
