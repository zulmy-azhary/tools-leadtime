import React from "react";
import type { CoreInstance, PaginationInstance } from "@tanstack/react-table";
import { generatePagination } from "../../helpers/generatePagination";
import { IoCaretBack, IoCaretForward } from "react-icons/io5";
import { Button } from "../atoms";
import clsx from "clsx";

interface Props<T> {
  instance: PaginationInstance<T> & Pick<CoreInstance<T>, "getState">;
}

const Pagination = <T extends object>({ instance }: Props<T>) => {
  const totalPage = instance.getPageCount();
  const currentPage = instance.getState().pagination.pageIndex + 1;
  const pagination = generatePagination({ totalPage, currentPage });

  return (
    <div className="flex w-full select-none items-center justify-center gap-x-2">
      <Button
        icon={IoCaretBack}
        onClick={instance.previousPage}
        disabled={!instance.getCanPreviousPage()}
        className="border-button-bd-light bg-button-bg-light dark:border-button-bd-dark dark:bg-button-bg-dark h-10 w-10 rounded-full border-[1.6px] text-sm"
      />
      {pagination?.map((page, idx) => (
        <Button
          key={idx}
          disabled={page === "..."}
          onClick={() => instance.setPageIndex((page as number) - 1)}
          className={clsx(
            "h-8 w-8 rounded-full text-sm duration-150",
            page === currentPage
              ? "!text-typo-white bg-primary font-medium"
              : page !== "..." && "hover:!text-primary hover:bg-primary/20"
          )}
        >
          {page}
        </Button>
      ))}
      <Button
        icon={IoCaretForward}
        onClick={instance.nextPage}
        disabled={!instance.getCanNextPage()}
        className="border-button-bd-light bg-button-bg-light dark:border-button-bd-dark dark:bg-button-bg-dark h-10 w-10 rounded-full border-[1.6px] text-sm"
      />
    </div>
  );
};

export default Pagination;
