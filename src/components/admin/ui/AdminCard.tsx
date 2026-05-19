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
    <div className={cn("bg-[#13131F] border border-white/5 rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)]", className)}>
      {(title || headerAction || icon) && (
        <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between bg-[#0A0A0F]/50">
          <div className="flex items-center gap-3">
            {icon && <div className="text-[#6C3FEF] bg-[#6C3FEF]/10 p-2 rounded-xl shadow-[0_0_10px_rgba(108,63,239,0.2)]">{icon}</div>}
            <div>
              {title && <h3 className="text-sm font-black text-slate-200 uppercase tracking-widest">{title}</h3>}
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
