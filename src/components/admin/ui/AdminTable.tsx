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
          <tr className="border-b border-[#1E1E2E] bg-[#0A0A0F]">
            {headers.map((header, i) => (
              <th
                key={i}
                className="px-6 py-4 text-[10px] font-black text-[#A0A0B0] uppercase tracking-widest"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1E1E2E] bg-[#13131F]">{children}</tbody>
      </table>
    </div>
  );
};

export const AdminTableRow = React.forwardRef<
  HTMLTableRowElement,
  {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
  } & React.HTMLAttributes<HTMLTableRowElement>
>(({ children, className, onClick, ...props }, ref) => {
  return (
    <tr
      ref={ref}
      onClick={onClick}
      className={cn(
        "group transition-colors hover:bg-[#1E1E2E]/50",
        onClick && "cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </tr>
  );
});

AdminTableRow.displayName = "AdminTableRow";

export const AdminTableCell = ({
  children,
  className,
  colSpan,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  colSpan?: number;
} & React.TdHTMLAttributes<HTMLTableCellElement>) => {
  return (
    <td 
      className={cn("px-6 py-4 text-sm text-white", className)} 
      colSpan={colSpan}
      {...props}
    >
      {children}
    </td>
  );
};
