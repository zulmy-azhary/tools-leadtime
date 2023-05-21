import React from "react";
import { TableRow, TableHeading } from "../atoms";
import clsx from "clsx";
import type { HeadersInstance, CoreInstance } from "@tanstack/react-table";
import { ImSpinner4 } from "react-icons/im";

interface Props<T> extends React.HTMLAttributes<HTMLDivElement> {
  instance: HeadersInstance<T> & CoreInstance<T>;
  isLoading?: boolean;
}

const Table = <T extends object>(props: Props<T>) => {
  const { instance, className, isLoading, ...rest } = props;
  const headerColumns = instance.getHeaderGroups();
  const rows = instance.getRowModel().rows;

  return (
    <div className={clsx("relative overflow-x-auto", className)} {...rest}>
      <table className="w-full text-left text-sm">
        <thead>
          {headerColumns.map(headerGroup => (
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
