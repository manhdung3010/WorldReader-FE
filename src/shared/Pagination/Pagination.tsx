import React, { FC } from "react";
import twFocusClass from "@/utils/twFocusClass";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) => {
  const generatePages = () => {
    const pages: (number | string)[] = [];
    const showPages = 2; // Số trang lân cận được hiển thị

    if (totalPages <= 7) {
      // Nếu tổng số trang ít, hiển thị tất cả
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > showPages + 2) pages.push("...");
      for (
        let i = Math.max(2, currentPage - showPages);
        i <= Math.min(totalPages - 1, currentPage + showPages);
        i++
      ) {
        pages.push(i);
      }
      if (currentPage < totalPages - showPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <nav
      className={`nc-Pagination inline-flex space-x-1 text-base font-medium ${className}`}
    >
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-white border border-neutral-200 hover:bg-neutral-100"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
      )}
      {generatePages().map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`w-11 h-11 flex items-center justify-center rounded-full ${
              currentPage === page
                ? "bg-primary-6000 text-white"
                : "bg-white border border-neutral-200 hover:bg-neutral-100"
            } ${twFocusClass()}`}
          >
            {page}
          </button>
        ) : (
          <span
            key={index}
            className="w-11 h-11 flex items-center justify-center text-neutral-500"
          >
            {page}
          </span>
        )
      )}
      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-white border border-neutral-200 hover:bg-neutral-100"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      )}
    </nav>
  );
};

export default Pagination;
