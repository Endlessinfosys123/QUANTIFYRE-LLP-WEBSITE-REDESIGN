"use client";

import React, { useState, useRef } from "react";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";
import { AdminButton } from "../ui/AdminButton";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  label?: string;
  value?: string;
  onChange: (url: string) => void;
  className?: string;
}

export const ImageUpload = ({
  label,
  value,
  onChange,
  className,
}: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload-media", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        onChange(data.url);
      } else {
        alert("Upload failed: " + data.error);
      }
    } catch (err) {
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    onChange("");
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && <label className="text-sm font-medium text-[#374151] block">{label}</label>}
      
      {value ? (
        <div className="relative group rounded-xl overflow-hidden border border-[#E5E7EB] bg-gray-50 aspect-video">
          <img src={value} alt="Uploaded" className="w-full h-full object-contain" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <AdminButton 
              size="sm" 
              variant="danger" 
              icon={<X size={16} />}
              onClick={removeImage}
            >
              Remove
            </AdminButton>
            <AdminButton 
              size="sm" 
              variant="primary" 
              icon={<Upload size={16} />}
              onClick={() => fileInputRef.current?.click()}
            >
              Replace
            </AdminButton>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="w-full aspect-video border-2 border-dashed border-[#D1D5DB] hover:border-[#6C3FEF] hover:bg-[#F3F0FF]/30 rounded-xl transition-all flex flex-col items-center justify-center gap-3 group"
        >
          {isUploading ? (
            <>
              <Loader2 className="animate-spin text-[#6C3FEF]" size={32} />
              <p className="text-sm font-bold text-[#6C3FEF]">Uploading image...</p>
            </>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-[#9CA3AF] group-hover:text-[#6C3FEF] group-hover:bg-[#F3F0FF] transition-all">
                <ImageIcon size={24} />
              </div>
              <div className="text-center px-4">
                <p className="text-sm font-bold text-[#111827]">Click to upload or drag & drop</p>
                <p className="text-xs text-[#6B7280] mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
              </div>
            </>
          )}
        </button>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleUpload}
        className="hidden"
        accept="image/*"
      />
    </div>
  );
};
