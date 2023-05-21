import React, { useEffect, useState } from "react";
import { Button, Input } from "../atoms";
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
  const { instance, wrapperClassName, clearable, delay = 500, ...rest } = props;
  const [value, setValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

  useEffect(() => {
    const debounce = setTimeout(() => instance.setGlobalFilter(value), delay);
    return () => clearTimeout(debounce);
  }, [value]);

  return (
    <div className={clsx("relative flex items-center", wrapperClassName)}>
      <Input
        value={value ?? ""}
        onChange={handleChange}
        icon={<IoSearch className="absolute right-5" />}
        wrapperClassName={wrapperClassName}
        className="!pr-16"
        autoComplete="off"
        {...rest}
      />
      {value && clearable && (
        <Button icon={IoClose} onClick={() => setValue("")} className="absolute right-11 text-sm" />
      )}
    </div>
  );
};

export default Filter;
