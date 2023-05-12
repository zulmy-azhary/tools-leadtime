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
            "text-typo-light/60 dark:text-typo-dark/60 bg-base-light dark:bg-field-bg-dark border-field-bd-light dark:border-field-bd-dark/70 whitespace-nowrap border-y-[1.6px] p-4 text-left text-sm font-semibold",
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
