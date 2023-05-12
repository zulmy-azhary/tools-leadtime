/* eslint-disable @typescript-eslint/consistent-type-assertions */
import clsx from "clsx";
import { IoCaretDown, IoClose } from "react-icons/io5";
import React, { type ChangeEvent } from "react";
import { useToggle, useOnClickOutside } from "../../hooks";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  options: string[];
}

const Select: React.ForwardRefRenderFunction<HTMLInputElement, Props> = (props, forwardRef) => {
  const { value, options, onChange, className, ...rest } = props;
  const [isOpen, onToggle, setOpen] = useToggle();
  const selectRef = useOnClickOutside<HTMLDivElement>(isOpen, () => setOpen(false));
  const isDisabled = rest.disabled;

  const handleClear = () => {
    !isDisabled && onChange({ target: { value: "" } } as ChangeEvent<HTMLInputElement>);
  };

  const handleOption = (item: string) => {
    !isDisabled && onChange({ target: { value: item } } as ChangeEvent<HTMLInputElement>);
  };

  return (
    <div
      ref={selectRef}
      onClick={!isDisabled ? onToggle : undefined}
      className={clsx(
        "text-typo-light dark:text-typo-dark relative flex items-center",
        isDisabled && "cursor-not-allowed opacity-60"
      )}
    >
      <input
        readOnly
        ref={forwardRef}
        value={value ?? ""}
        className={clsx(
          "placeholder:text-typo-light/70 dark:placeholder:text-typo-dark/50 border-field-bd-light dark:border-field-bd-dark/70 bg-field-bg-light dark:bg-field-bg-dark text-typo-black dark:text-typo-white flex w-full appearance-none items-center gap-2 rounded border-[1.6px] py-3 px-5 pr-20 text-sm outline-none",
          isDisabled ? "cursor-not-allowed" : "cursor-pointer",
          className
        )}
        {...rest}
      />
      {isOpen && (
        <ul className="border-field-bd-light dark:border-field-bd-dark/70 bg-field-bg-light dark:bg-field-bg-dark text-typo-light dark:text-typo-dark absolute top-14 z-20 flex w-full cursor-pointer flex-col rounded border-[1.6px] py-3 text-sm">
          {options.map((item, idx) => (
            <li
              key={idx}
              onClick={() => handleOption(item)}
              className="hover:bg-primary p-2 duration-150 hover:text-white"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
      <div
        className={clsx(
          "absolute right-5 flex items-center gap-x-2",
          isDisabled ? "cursor-not-allowed" : "cursor-pointer"
        )}
      >
        {value && (
          <button type="button" onClick={handleClear} className={isDisabled ? "cursor-not-allowed" : "cursor-pointer"}>
            {<IoClose className="text-xl" />}
          </button>
        )}
        <IoCaretDown className={clsx("text-xl duration-150", isOpen && "rotate-180")} />
      </div>
    </div>
  );
};

export default React.forwardRef(Select);
