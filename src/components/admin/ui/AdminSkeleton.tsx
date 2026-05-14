import React from "react";
import { cn } from "@/lib/utils";

interface AdminSkeletonProps {
  className?: string;
  variant?: "text" | "rect" | "circle";
}

export const AdminSkeleton = ({ className, variant = "rect" }: AdminSkeletonProps) => {
  return (
    <div
      className={cn(
        "animate-pulse bg-[#13131F] border border-[#1E1E2E]",
        variant === "text" && "h-4 w-3/4 rounded",
        variant === "rect" && "rounded-2xl",
        variant === "circle" && "rounded-full",
        className
      )}
    />
  );
};
