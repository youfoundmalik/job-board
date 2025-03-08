"use client";

import { ArrowIcon } from "../common";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className='flex items-center justify-center gap-4'>
      <div className='flex items-center gap-2'>
        <p className={`text-sm ${currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-500"}`}>
          {currentPage > 1 ? currentPage - 1 : ""}
        </p>
        <button
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`w-7.5 h-7.5 flex items-center justify-center border hover:bg-gray-100 transition-all duration-100 border-gray-300 rounded-sm ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <ArrowIcon width={18} height={18} />
        </button>
      </div>
      <p className='text-primary font-medium text-base underline'>{currentPage}</p>
      <div className='flex items-center gap-2'>
        <button
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`w-7.5 h-7.5 flex items-center justify-center border hover:bg-gray-100 transition-all duration-100 border-gray-300 rounded-sm ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <ArrowIcon className='rotate-180' width={18} height={18} />
        </button>
        <p className={`text-sm ${currentPage === totalPages ? "text-gray-300 cursor-not-allowed" : "text-gray-500"}`}>
          {currentPage < totalPages ? currentPage + 1 : ""}
        </p>
      </div>
    </div>
  );
};

export default Pagination;
