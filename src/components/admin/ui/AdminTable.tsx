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
          <tr className="border-b border-slate-100 bg-slate-50/50">
            {headers.map((header, i) => (
              <th
                key={i}
                className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">{children}</tbody>
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
        "group transition-colors hover:bg-slate-50",
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
      className={cn("px-6 py-4 text-sm text-slate-700 font-medium", className)} 
      colSpan={colSpan}
      {...props}
    >
      {children}
    </td>
  );
};
