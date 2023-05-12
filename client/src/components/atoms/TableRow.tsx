import { type Row, flexRender } from "@tanstack/react-table";
import React from "react";
import clsx from "clsx";

interface Props<T> extends React.TdHTMLAttributes<HTMLTableCellElement> {
  row: Row<T>;
}

const TableItems = <T extends object>(props: Props<T>) => {
  const { row, className, ...rest } = props;

  return (
    <tr>
      {row.getVisibleCells().map(cell => (
        <td
          key={cell.id}
          className={clsx(
            "whitespace-nowrap border-b-[1.6px] p-4 text-left text-sm font-medium",
            "text-typo-light dark:text-typo-dark",
            "border-field-bd-light/40 dark:border-field-bd-dark/40",
            className
          )}
          {...rest}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
};

export default TableItems;
