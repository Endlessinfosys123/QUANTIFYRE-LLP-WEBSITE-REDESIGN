import React from "react";
import { AdminInput } from "./AdminInput";
import { cn } from "@/lib/utils";

interface AdminColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const AdminColorPicker = ({
  label,
  value,
  onChange,
  className,
}: AdminColorPickerProps) => {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label className="text-sm font-medium text-[#374151] block">{label}</label>
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 shrink-0 border border-[#D1D5DB] rounded-lg overflow-hidden group">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-[-10px] w-[200%] h-[200%] cursor-pointer border-none p-0 outline-none"
          />
        </div>
        <AdminInput
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 font-mono uppercase"
          placeholder="#000000"
          maxLength={7}
        />
      </div>
    </div>
  );
};
