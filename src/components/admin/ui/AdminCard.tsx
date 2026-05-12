import React from "react";
import { cn } from "@/lib/utils";

interface AdminCardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export const AdminCard = ({
  children,
  title,
  subtitle,
  headerAction,
  footer,
  className,
  noPadding = false,
}: AdminCardProps) => {
  return (
    <div className={cn("bg-white border border-[#E5E7EB] rounded-xl shadow-sm overflow-hidden", className)}>
      {(title || subtitle || headerAction) && (
        <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between gap-4">
          <div>
            {title && <h3 className="text-lg font-semibold text-[#111827]">{title}</h3>}
            {subtitle && <p className="text-sm text-[#6B7280]">{subtitle}</p>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className={cn(!noPadding && "p-6")}>{children}</div>
      {footer && <div className="px-6 py-4 bg-[#F9F9FF] border-t border-[#E5E7EB]">{footer}</div>}
    </div>
  );
};
