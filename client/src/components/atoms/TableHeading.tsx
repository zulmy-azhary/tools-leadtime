import clsx from "clsx";
import React from "react";
import { type HeaderGroup, flexRender } from "@tanstack/react-table";

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
            "bg-gray-50 px-6 py-4 text-xs uppercase text-gray-700 dark:bg-slate-800 dark:text-blue-200",
            className
          )}
          {...rest}
        >
          {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
        </th>
      ))}
    </tr>
  );
};

export default TableHeading;
