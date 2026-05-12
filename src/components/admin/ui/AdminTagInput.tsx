import React, { useState, KeyboardEvent } from "react";
import { X, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminTagInputProps {
  label?: string;
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
}

export const AdminTagInput = ({
  label,
  tags,
  onChange,
  placeholder = "Type and press Enter...",
  className,
}: AdminTagInputProps) => {
  const [input, setInput] = useState("");

  const addTag = () => {
    const trimmed = input.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
      setInput("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && !input && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  const removeTag = (index: number) => {
    onChange(tags.filter((_, i) => i !== index));
  };

  return (
    <div className={cn("space-y-1.5 w-full", className)}>
      {label && <label className="text-sm font-medium text-[#374151] block">{label}</label>}
      <div className="flex flex-wrap gap-2 p-2 bg-white border border-[#D1D5DB] rounded-lg min-h-[40px] focus-within:ring-2 focus-within:ring-[#6C3FEF] focus-within:border-transparent transition-all">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F3F0FF] text-[#6C3FEF] text-xs font-bold rounded-md border border-[#E5E7EB]"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(i)}
              className="hover:text-red-500 transition-colors"
            >
              <X size={14} />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTag}
          placeholder={tags.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[120px] bg-transparent outline-none text-sm text-[#111827] placeholder:text-[#9CA3AF]"
        />
      </div>
    </div>
  );
};
