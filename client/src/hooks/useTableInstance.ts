import { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  type ColumnDef
} from "@tanstack/react-table";

export interface Props<T> {
  data: T[];
  columns: Array<ColumnDef<T>>;
  action?: ColumnDef<T>;
}

const useTableInstance = <T extends object>({ data, columns, action }: Props<T>) => {
  const memoizedData = useMemo(() => data, [data]);
  const headerColumn = useMemo(() => (action ? [...columns, action] : columns), []);

  const instance = useReactTable({
    data: memoizedData,
    columns: headerColumn,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });

  return instance;
};

export default useTableInstance;
