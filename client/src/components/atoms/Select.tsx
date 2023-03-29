import clsx from "clsx";
import { Button } from ".";
import { IoCaretDown } from "react-icons/io5";
import React, { useRef } from "react";
import { useToggle, useOnClickOutside } from "../../hooks";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: string[];
}

const Select: React.ForwardRefRenderFunction<HTMLSelectElement, Props> = (props, refs) => {
  const { options, className, ...rest } = props;
  const selectRef = useRef(null);
  const [isOpen, toggler, setClose] = useToggle();
  useOnClickOutside(selectRef, () => setClose(false));

  return (
    <div className="relative" ref={selectRef}>
      <div className={clsx("relative flex items-center")}>
        <select
          ref={refs}
          onClick={toggler}
          className={clsx(
            "flex w-full cursor-pointer appearance-none items-center gap-2 rounded border-[1.5px] py-3 text-sm capitalize outline-none",
            "bg-slate-50 text-slate-600",
            "px-5 pr-16",
            className
          )}
          {...rest}
        >
          {options?.map((item, idx) => (
            <option key={idx} value={item} className="capitalize">
              {item}
            </option>
          ))}
        </select>
        <Button
          type="button"
          icon={IoCaretDown}
          onClick={toggler}
          className={clsx("absolute right-5 text-xs text-slate-600", isOpen && "rotate-180")}
        />
      </div>
    </div>
  );
};

export default React.forwardRef(Select);
