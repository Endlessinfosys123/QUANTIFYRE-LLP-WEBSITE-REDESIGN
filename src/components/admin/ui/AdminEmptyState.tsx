import React from "react";
import { LucideIcon, Plus } from "lucide-react";
import { AdminButton } from "./AdminButton";

interface AdminEmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const AdminEmptyState = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: AdminEmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center border-2 border-dashed border-[#E5E7EB] rounded-2xl bg-white/50">
      <div className="w-20 h-20 rounded-full bg-[#F3F0FF] flex items-center justify-center text-[#6C3FEF] mb-6">
        <Icon size={40} />
      </div>
      <h3 className="text-xl font-bold text-[#111827] mb-2">{title}</h3>
      <p className="text-[#6B7280] max-w-sm mb-8">{description}</p>
      {actionLabel && onAction && (
        <AdminButton icon={<Plus size={18} />} onClick={onAction}>
          {actionLabel}
        </AdminButton>
      )}
    </div>
  );
};
