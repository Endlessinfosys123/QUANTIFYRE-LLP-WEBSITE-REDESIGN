import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error" | "info";

interface AdminToastProps {
  message: string;
  type?: ToastType;
  isVisible: boolean;
  onClose: () => void;
}

export const AdminToast = ({
  message,
  type = "success",
  isVisible,
  onClose,
}: AdminToastProps) => {
  const variants = {
    success: { icon: CheckCircle, className: "bg-green-600" },
    error: { icon: AlertCircle, className: "bg-red-600" },
    info: { icon: Info, className: "bg-blue-600" },
  };

  const { icon: Icon, className } = variants[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className={cn(
            "fixed bottom-6 right-6 z-[200] flex items-center gap-3 px-6 py-4 rounded-xl text-white shadow-2xl min-w-[300px] max-w-md",
            className
          )}
        >
          <Icon size={20} className="shrink-0" />
          <p className="text-sm font-bold flex-1">{message}</p>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
