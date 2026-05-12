import React from "react";
import { AdminModal } from "./AdminModal";
import { AdminButton } from "./AdminButton";
import { AlertTriangle } from "lucide-react";

interface AdminConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "primary";
  isLoading?: boolean;
}

export const AdminConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  isLoading = false,
}: AdminConfirmDialogProps) => {
  return (
    <AdminModal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 shrink-0">
            <AlertTriangle size={24} />
          </div>
          <p className="text-sm text-[#6B7280] leading-relaxed py-2">
            {description}
          </p>
        </div>
        <div className="flex items-center justify-end gap-3 pt-4">
          <AdminButton variant="ghost" onClick={onClose} disabled={isLoading}>
            {cancelText}
          </AdminButton>
          <AdminButton
            variant={variant}
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmText}
          </AdminButton>
        </div>
      </div>
    </AdminModal>
  );
};
