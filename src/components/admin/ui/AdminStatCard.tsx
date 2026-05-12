import React from "react";
import { AdminCard } from "./AdminCard";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminStatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isUp: boolean;
  };
  className?: string;
}

export const AdminStatCard = ({
  label,
  value,
  icon: Icon,
  trend,
  className,
}: AdminStatCardProps) => {
  return (
    <AdminCard className={cn("p-6", className)}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-[#6B7280] mb-1">
            {label}
          </p>
          <h3 className="text-3xl font-black text-[#111827]">{value}</h3>
          {trend && (
            <p
              className={cn(
                "text-xs font-bold mt-2",
                trend.isUp ? "text-green-600" : "text-red-600"
              )}
            >
              {trend.isUp ? "↑" : "↓"} {trend.value}% vs last month
            </p>
          )}
        </div>
        <div className="w-14 h-14 rounded-2xl bg-[#F3F0FF] flex items-center justify-center text-[#6C3FEF]">
          <Icon size={28} />
        </div>
      </div>
    </AdminCard>
  );
};
