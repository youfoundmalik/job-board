"use client";

import { ReactNode, TableHTMLAttributes } from "react";
import Pagination from "./pagination";

interface TableBaseProps extends TableHTMLAttributes<HTMLTableElement> {
  children?: ReactNode;
  hidePagination?: boolean;
  containerClassName?: string;
}

const TableBase: React.FC<TableBaseProps> = ({ children, className = "", hidePagination = false, containerClassName = "", ...tableProps }) => {
  return (
    <div className={`w-full flex flex-col gap-4 flex-grow justify-between ${containerClassName}`}>
      <table className={`w-full overflow-x-auto ${className}`} {...tableProps}>
        {children}
      </table>
      {!hidePagination && <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />}
    </div>
  );
};

export default TableBase;

interface TableCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode;
}

export const TableCell: React.FC<TableCellProps> = ({ children, className = "", ...cellProps }) => {
  return (
    <td className={`text-left text-base font-normal text-foreground bg-white py-1.5 px-5 ${className}`} {...cellProps}>
      {children}
    </td>
  );
};

interface TableHeaderCellProps extends React.HTMLAttributes<HTMLTableHeaderCellElement> {
  children?: ReactNode;
}

export const TableHeaderCell: React.FC<TableHeaderCellProps> = ({ children, className = "", ...headerCellProps }) => {
  return (
    <th className={`text-left text-sm font-bold text-base-gray-800 bg-base-gray-500 py-3 px-5 ${className}`} {...headerCellProps}>
      {children}
    </th>
  );
};
