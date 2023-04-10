import clsx from "clsx";
import { Button } from ".";
import { IoCaretDown } from "react-icons/io5";
import React, { useRef } from "react";
import { useToggle, useOnClickOutside } from "../../hooks";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: string[];
}

const Select: React.ForwardRefRenderFunction<HTMLSelectElement, Props> = (props, ref) => {
  const { options, className, ...rest } = props;
  const selectRef = useRef(null);
  const [isOpen, onToggle, setOpen] = useToggle();
  useOnClickOutside(selectRef, () => setOpen(false));

  return (
    <div className="relative" ref={selectRef}>
      <div className={clsx("relative flex items-center")}>
        <select
          ref={ref}
          onClick={onToggle}
          className={clsx(
            "flex w-full cursor-pointer appearance-none items-center gap-2 rounded border-[1.5px] bg-slate-50 py-3 px-5 pr-16 text-sm capitalize outline-none dark:border-slate-600 dark:bg-slate-800",
            className
          )}
          {...rest}
        >
          <option value="" disabled>
            Choose an option :
          </option>
          {options?.map((item, idx) => (
            <option key={idx} value={item} className="capitalize">
              {item}
            </option>
          ))}
        </select>
        <Button
          type="button"
          icon={IoCaretDown}
          onClick={onToggle}
          className={clsx("absolute right-5 text-xs text-slate-600", isOpen && "rotate-180")}
          tabIndex={-1}
        />
      </div>
    </div>
  );
};

export default React.forwardRef(Select);
