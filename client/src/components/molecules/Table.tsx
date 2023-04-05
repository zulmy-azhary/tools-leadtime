import React, { useMemo } from "react";
import { TableItems, TableHeading } from "../atoms";
import clsx from "clsx";
import { useReactTable, getCoreRowModel, type ColumnDef } from "@tanstack/react-table";

interface Props<T> extends React.HTMLAttributes<HTMLDivElement> {
  data: T[];
  columns: Array<ColumnDef<T>>;
}

const Table = <T extends object>(props: Props<T>) => {
  const { data, columns, className, ...rest } = props;
  const datas = useMemo(() => data, []);
  const headerColumns = useMemo(() => columns, []);

  const table = useReactTable({
    data: datas,
    columns: headerColumns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className={clsx("relative overflow-x-auto", className)} {...rest}>
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          {table.getHeaderGroups().map(headerGroup => (
            <TableHeading key={headerGroup.id} headerGroup={headerGroup} />
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <TableItems key={row.id} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
