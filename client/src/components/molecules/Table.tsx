import React, { useMemo } from "react";
import { TableRow, TableHeading } from "../atoms";
import clsx from "clsx";
import { useReactTable, getCoreRowModel, type ColumnDef } from "@tanstack/react-table";

interface Props<T> extends React.HTMLAttributes<HTMLDivElement> {
  data: T[];
  columns: Array<ColumnDef<T>>;
  action?: ColumnDef<T>;
}

const Table = <T extends object>(props: Props<T>) => {
  const { data, columns, action, className, ...rest } = props;
  const datas = useMemo(() => data, [data]);
  const headerColumns = useMemo(() => (action ? [...columns, action] : columns), []);

  const table = useReactTable({
    data: datas,
    columns: headerColumns,
    getCoreRowModel: getCoreRowModel()
  });

  const rows = table.getRowModel().rows;

  return (
    <div className={clsx("relative overflow-x-auto", className)} {...rest}>
      <table className="w-full text-left text-sm">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <TableHeading key={headerGroup.id} headerGroup={headerGroup} />
          ))}
        </thead>
        <tbody>
          {rows.length ? (
            rows.map(row => <TableRow key={row.id} row={row} />)
          ) : (
            <tr className="whitespace-nowrap border-b dark:border-slate-700">
              <td align="center" colSpan={100} className="px-6 py-5">
                <span>No data available.</span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
