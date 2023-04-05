import clsx from "clsx";
import React from "react";
import { type HeaderGroup, flexRender } from "@tanstack/react-table";

interface Props<T> extends React.TableHTMLAttributes<HTMLTableRowElement> {
  headerGroup: HeaderGroup<T>;
}

const TableHeading = <T extends object>(props: Props<T>) => {
  const { headerGroup, className, ...rest } = props;
  return (
    <tr {...rest}>
      {headerGroup.headers.map(header => (
        <th key={header.id} scope="col" className={clsx("px-6 py-4", className)}>
          {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
        </th>
      ))}
    </tr>
  );
};

export default TableHeading;
