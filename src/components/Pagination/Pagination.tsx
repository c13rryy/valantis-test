import { cn } from "@/lib/utils";
import Link from "next/link";
import { FC } from "react";

type PaginationProps = {
  page?: number;
  totalPages: number;
  hasNextPage: boolean;
  pageCategory?: string;
};

const Pagination: FC<PaginationProps> = ({
  page,
  totalPages,
  hasNextPage,
  pageCategory,
}) => {
  const currentPage = Math.min(Math.max(Number(page), 1), totalPages);
  return (
    <div className="flex items-center justify-center space-x-6 text-black">
      <Link
        className={cn(
          "rounded-md bg-blue-700  px-[10px] py-[4px] text-white  w-[120px] flex justify-center text-[14px] font-medium hover:bg-blue-500",
          currentPage === 1 ? "pointer-events-none bg-gray-500" : ""
        )}
        href={`?page=${currentPage - 1}&category=${pageCategory}`}
      >
        Previous Page
      </Link>

      <Link
        className={cn(
          "rounded-md bg-blue-700  text-white px-[10px] py-[4px] w-[120px] text-[14px] flex justify-center font-medium hover:bg-blue-500",
          !hasNextPage ? "pointer-events-none bg-gray-500" : ""
        )}
        href={`?page=${currentPage + 1}&category=${pageCategory}`}
      >
        Next Page
      </Link>
    </div>
  );
};

export default Pagination;
