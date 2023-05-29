import React from "react";
import { TableRow, TableHeading } from "../atoms";
import clsx from "clsx";
import type { HeadersInstance, CoreInstance, HeaderGroup } from "@tanstack/react-table";
import { ImSpinner4 } from "react-icons/im";
import type { IconType } from "react-icons";

// An empty row
const createEmptyRow = <T,>(headerColumns: Array<HeaderGroup<T>>) =>
  headerColumns.map(headerGroup => (
    <tr key={headerGroup.id} className="whitespace-nowrap border-b dark:border-slate-700">
      {headerGroup.headers.map(header => (
        <td
          key={header.id}
          className="border-field-bd-light/40 dark:border-field-bd-dark/40 border-b-[1.6px] py-[17.45px]"
        >
          <span>&nbsp;</span>
        </td>
      ))}
    </tr>
  ));

interface Props<T> extends React.HTMLAttributes<HTMLDivElement> {
  instance: HeadersInstance<T> & CoreInstance<T>;
  isLoading?: boolean;
}

const Table = <T extends object>(props: Props<T>) => {
  const { instance, className, isLoading, ...rest } = props;
  const headerColumns = instance.getHeaderGroups();
  const rows = instance.getRowModel().rows;

  const getEmptyRow = () => {
    const getRemainRowLength = 10 - (!isLoading || rows.length !== 0 ? rows.length : 0);

    return Array.from(new Array(getRemainRowLength)).map(() => {
      return createEmptyRow(headerColumns);
    });
  };

  return (
    <div className={clsx("relative overflow-x-auto", className)} {...rest}>
      <table className="w-full text-left text-sm">
        <thead>
          {headerColumns.map(headerGroup => (
            <TableHeading key={headerGroup.id} headerGroup={headerGroup} />
          ))}
        </thead>
        <tbody className="relative">
          {isLoading && <Message message="Loading data..." startIcon={<ImSpinner4 className="animate-spin" />} />}
          {!isLoading && rows.length === 0 && <Message message="No Data Available." />}
          {!isLoading && rows.length !== 0 && rows.map(row => <TableRow key={row.id} row={row} />)}
          {getEmptyRow()}
        </tbody>
      </table>
    </div>
  );
};

const Message = (props: { startIcon?: IconType | React.ReactNode; message: string }) => (
  <tr>
    <td
      align="center"
      colSpan={100}
      className={clsx("text-typo-light dark:text-typo-dark whitespace-nowrap text-sm font-medium")}
    >
      <div className="bg-card-bg-light/50 dark:bg-card-bg-dark/50 absolute inset-0 flex w-full items-center justify-center gap-x-2">
        {typeof props.startIcon === "function" ? <props.startIcon /> : props.startIcon}
        <p>{props.message}</p>
      </div>
    </td>
  </tr>
);

export default Table;
