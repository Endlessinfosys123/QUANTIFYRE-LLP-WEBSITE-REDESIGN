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
    <div className={cn("bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50", className)}>
      {(title || headerAction || icon) && (
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
          <div className="flex items-center gap-3">
            {icon && <div className="text-[#6C3FEF] bg-[#6C3FEF]/10 p-2 rounded-xl">{icon}</div>}
            <div>
              {title && <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">{title}</h3>}
              {subtitle && <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">{subtitle}</p>}
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
