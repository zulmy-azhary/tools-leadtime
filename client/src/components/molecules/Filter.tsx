import React, { useEffect, useState } from "react";
import { Input } from "../atoms";
import { IoClose, IoSearch } from "react-icons/io5";
import type { FiltersInstance } from "@tanstack/react-table";
import clsx from "clsx";

interface Props<T> extends React.InputHTMLAttributes<HTMLInputElement> {
  instance: FiltersInstance<T>;
  delay?: number;
  clearable?: boolean;
  wrapperClassName?: string;
}

const Filter = <T extends object>(props: Props<T>) => {
  const { instance, clearable, delay = 1000, ...rest } = props;
  const [filterValue, setFilterValue] = useState<string>("");

  const handleFilterValue = (e: React.ChangeEvent<HTMLInputElement>) => setFilterValue(e.target.value);

  useEffect(() => {
    const debounce = setTimeout(() => instance.setGlobalFilter(filterValue), delay);
    return () => clearTimeout(debounce);
  }, [filterValue]);

  return (
    <Input
      value={filterValue ?? ""}
      onChange={handleFilterValue}
      autoComplete="off"
      className={clsx(clearable && "!pr-16")}
      icon={
        <div className="absolute right-5 flex items-center gap-x-2">
          {filterValue && clearable && (
            <IoClose onClick={() => setFilterValue("")} className="cursor-pointer text-[1.2em]" />
          )}
          <IoSearch />
        </div>
      }
      {...rest}
    />
  );
};

export default Filter;
