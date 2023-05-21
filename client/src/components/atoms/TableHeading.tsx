import clsx from "clsx";
import React from "react";
import { type HeaderGroup, flexRender } from "@tanstack/react-table";
import { IoArrowDown, IoArrowUp, IoSwapVertical } from "react-icons/io5";

interface Props<T> extends React.TableHTMLAttributes<HTMLTableCellElement> {
  headerGroup: HeaderGroup<T>;
}

const TableHeading = <T extends object>(props: Props<T>) => {
  const { headerGroup, className, ...rest } = props;
  return (
    <tr className="whitespace-nowrap">
      {headerGroup.headers.map(header => (
        <th
          key={header.id}
          scope="col"
          className={clsx(
            "text-typo-light/60 dark:text-typo-dark/60 bg-base-light dark:bg-field-bg-dark border-field-bd-light dark:border-field-bd-dark/70 whitespace-nowrap border-y-[1.6px] p-4 text-left text-sm font-semibold",
            className
          )}
          {...rest}
        >
          <span onClick={header.column.getToggleSortingHandler()} className="flex items-center gap-2">
            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
            {(header.column.getCanSort() &&
              {
                asc: <IoArrowDown size="1.1rem" />,
                desc: <IoArrowUp size="1.1rem" />
              }[header.column.getIsSorted() as string]) ?? <IoSwapVertical size="1.1rem" />}
          </span>
        </th>
      ))}
    </tr>
  );
};

export default TableHeading;
