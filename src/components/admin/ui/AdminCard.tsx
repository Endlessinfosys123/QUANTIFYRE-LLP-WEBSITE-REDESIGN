import React from "react";
import { cn } from "@/lib/utils";

interface AdminCardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  headerAction?: React.ReactNode;
  icon?: React.ReactNode;
}

export const AdminCard = ({ children, title, subtitle, className, headerAction, icon }: AdminCardProps) => {
  return (
    <div className={cn("bg-[#13131F] border border-[#1E1E2E] rounded-3xl overflow-hidden shadow-2xl shadow-black/20", className)}>
      {(title || headerAction || icon) && (
        <div className="px-6 py-5 border-b border-[#1E1E2E] flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon && <div className="text-[#6C3FEF]">{icon}</div>}
            <div>
              {title && <h3 className="text-sm font-black text-white uppercase tracking-widest">{title}</h3>}
              {subtitle && <p className="text-[10px] font-bold text-[#A0A0B0] uppercase tracking-wider mt-0.5">{subtitle}</p>}
            </div>
          </div>
          {headerAction}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};
