import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminStarRatingProps {
  label?: string;
  rating: number;
  onChange?: (rating: number) => void;
  max?: number;
  className?: string;
  readonly?: boolean;
}

export const AdminStarRating = ({
  label,
  rating,
  onChange,
  max = 5,
  className,
  readonly = false,
}: AdminStarRatingProps) => {
  return (
    <div className={cn("space-y-1.5", className)}>
      {label && <label className="text-sm font-medium text-[#374151] block">{label}</label>}
      <div className="flex items-center gap-1">
        {[...Array(max)].map((_, i) => {
          const starValue = i + 1;
          const isActive = starValue <= rating;
          return (
            <button
              key={i}
              type="button"
              disabled={readonly}
              onClick={() => onChange?.(starValue)}
              className={cn(
                "transition-all",
                !readonly && "hover:scale-125 active:scale-95",
                isActive ? "text-amber-400 fill-amber-400" : "text-gray-300 fill-transparent"
              )}
            >
              <Star size={20} strokeWidth={isActive ? 0 : 2} />
            </button>
          );
        })}
      </div>
    </div>
  );
};
