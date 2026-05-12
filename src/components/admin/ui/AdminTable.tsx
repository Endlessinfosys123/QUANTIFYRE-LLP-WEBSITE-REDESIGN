import React from "react";
import { cn } from "@/lib/utils";

interface AdminTableProps {
  headers: string[];
  children: React.ReactNode;
  className?: string;
}

export const AdminTable = ({ headers, children, className }: AdminTableProps) => {
  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-[#E5E7EB]">
            {headers.map((header, i) => (
              <th
                key={i}
                className="px-6 py-4 text-[13px] font-semibold text-[#374151] uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E5E7EB]">{children}</tbody>
      </table>
    </div>
  );
};

export const AdminTableRow = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <tr
      onClick={onClick}
      className={cn(
        "group transition-colors hover:bg-[#F9F9FF]",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </tr>
  );
};

export const AdminTableCell = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <td className={cn("px-6 py-4 text-sm text-[#111827]", className)}>
      {children}
    </td>
  );
};
