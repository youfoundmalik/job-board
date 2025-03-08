"use client";

import { Fragment, ReactNode, TableHTMLAttributes } from "react";
import NoData from "./empty";

interface TableBaseProps extends TableHTMLAttributes<HTMLTableElement> {
  children?: ReactNode;
  count: number;
  containerClassName?: string;
  emptyDescription?: ReactNode;
  emptyTitle?: string;
  isLoading: boolean;
  pagination?: ReactNode;
}

const TableBase: React.FC<TableBaseProps> = ({
  children,
  className = "",
  containerClassName = "",
  emptyTitle,
  emptyDescription,
  isLoading,
  count,
  pagination,
  ...tableProps
}) => {
  return (
    <Fragment>
      <div className={`w-full flex flex-col gap-4 flex-grow justify-between hide-scrollbar overflow-x-auto ${containerClassName}`}>
        <table className={`w-full overflow-x-auto ${className}`} {...tableProps}>
          {children}
        </table>
        {pagination}
      </div>
      {!isLoading && count === 0 && (
        <div className='flex-grow flex items-center justify-center pb-8'>
          <NoData title={emptyTitle} subText={emptyDescription} />
        </div>
      )}
    </Fragment>
  );
};

export default TableBase;

interface TableCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode;
}

export const TableCell: React.FC<TableCellProps> = ({ children, className = "", ...cellProps }) => {
  return (
    <td className={`text-left text-sm md:text-base font-normal text-foreground bg-white py-1.5 px-5 ${className}`} {...cellProps}>
      {children}
    </td>
  );
};

interface TableHeaderCellProps extends React.HTMLAttributes<HTMLTableHeaderCellElement> {
  children?: ReactNode;
}

export const TableHeaderCell: React.FC<TableHeaderCellProps> = ({ children, className = "", ...headerCellProps }) => {
  return (
    <th
      className={`text-left text-sm first:rounded-l-lg last:rounded-r-lg font-bold text-base-gray-800 bg-base-gray-500 py-3 px-5 min-w-fit text-nowrap ${className}`}
      {...headerCellProps}
    >
      {children}
    </th>
  );
};
