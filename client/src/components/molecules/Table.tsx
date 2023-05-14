import React, { useMemo } from "react";
import { TableRow, TableHeading } from "../atoms";
import clsx from "clsx";
import { useReactTable, getCoreRowModel, type ColumnDef } from "@tanstack/react-table";
import { ImSpinner4 } from "react-icons/im";

interface Props<T> extends React.HTMLAttributes<HTMLDivElement> {
  data: T[];
  columns: Array<ColumnDef<T>>;
  action?: ColumnDef<T>;
  isLoading?: boolean;
}

const Table = <T extends object>(props: Props<T>) => {
  const { data, columns, action, className, isLoading, ...rest } = props;
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
          {isLoading && (
            <Message
              message={
                <div className="flex w-full items-center justify-center gap-x-2">
                  <ImSpinner4 className="animate-spin" />
                  <p>Loading data...</p>
                </div>
              }
            />
          )}
          {!isLoading && rows.length === 0 && <Message message="No data available." />}
          {!isLoading && rows.length !== 0 && rows.map(row => <TableRow key={row.id} row={row} />)}
        </tbody>
      </table>
    </div>
  );
};

const Message = (props: { message: string | React.ReactNode }) => (
  <tr className="whitespace-nowrap border-b dark:border-slate-700">
    <td align="center" colSpan={100} className="px-6 py-5">
      <span>{props.message}</span>
    </td>
  </tr>
);

export default Table;
