import { type Row, flexRender } from "@tanstack/react-table";
import React from "react";
import clsx from "clsx";

interface Props<T> extends React.TdHTMLAttributes<HTMLTableCellElement> {
  row: Row<T>;
}

const TableItems = <T extends object>(props: Props<T>) => {
  const { row, className, ...rest } = props;

  return (
    <tr className="whitespace-nowrap border-b bg-white dark:border-gray-700 dark:bg-gray-800">
      {row.getVisibleCells().map(cell => (
        <td key={cell.id} className={clsx("px-6 py-4", className)} {...rest}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
};

export default TableItems;
