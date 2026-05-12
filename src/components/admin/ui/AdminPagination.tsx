import React from "react";
import { AdminButton } from "./AdminButton";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AdminPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export const AdminPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}: AdminPaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <p className="text-sm text-[#6B7280]">
        Showing page <span className="font-bold text-[#111827]">{currentPage}</span> of{" "}
        <span className="font-bold text-[#111827]">{totalPages}</span>
      </p>
      <div className="flex items-center gap-2">
        <AdminButton
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          icon={<ChevronLeft size={16} />}
        >
          Previous
        </AdminButton>
        <AdminButton
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isLoading}
          icon={<ChevronRight size={16} />}
        >
          Next
        </AdminButton>
      </div>
    </div>
  );
};
