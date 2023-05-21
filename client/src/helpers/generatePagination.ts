import { useMemo } from "react";

interface TPaginationProps {
  totalPage: number;
  currentPage: number;
  siblings?: number;
}

export const generatePagination = ({ totalPage, currentPage, siblings = 1 }: TPaginationProps) => {
  const totalPageNumber = siblings + 5;

  const leftSiblings = Math.max(currentPage - siblings, 1);
  const rightSiblings = Math.min(currentPage + siblings, totalPage);

  const showLeftDot = leftSiblings > 2;
  const showRightDot = rightSiblings < totalPage - 2;

  const pagination = useMemo(() => {
    if (totalPageNumber >= totalPage) return generateRange(1, totalPage);

    if (!showLeftDot && showRightDot) {
      const leftItemCount = 3 + 2 * siblings;
      const leftRange = generateRange(1, leftItemCount);
      return [...leftRange, "...", totalPage];
    }
    if (showLeftDot && showRightDot) {
      const midRange = generateRange(leftSiblings, rightSiblings);
      return [1, "...", ...midRange, "...", totalPage];
    }
    if (showLeftDot && !showRightDot) {
      const rightItemCount = 3 + 2 * siblings;
      const rightRange = generateRange(totalPage - rightItemCount + 1, totalPage);
      return [1, "...", ...rightRange];
    }
  }, [totalPage, currentPage, siblings]);

  return pagination;
};

const generateRange = (start: number, end: number) => {
  const length: number = end - start + 1;
  return Array.from({ length }, (_, index) => index + start);
};
