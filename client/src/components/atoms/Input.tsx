import React from "react";
import clsx from "clsx";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  wrapperClassName?: string;
  icon?: React.ReactNode;
}

const Input: React.ForwardRefRenderFunction<HTMLInputElement, Props> = (props, forwardRef) => {
  const { wrapperClassName, icon, className, ...rest } = props;

  return (
    <div className={clsx("relative flex items-center", wrapperClassName)}>
      <input
        ref={forwardRef}
        className={clsx(
          "read-only:text-typo-light dark:read-only:text-typo-dark placeholder:text-typo-light/70 dark:placeholder:text-typo-dark/50 border-field-bd-light dark:border-field-bd-dark/70 text-typo-black dark:text-typo-white bg-field-bg-light dark:bg-field-bg-dark relative inline-flex w-full items-center rounded border-[1.6px] py-3 text-sm outline-none read-only:opacity-60",
          icon ? "pl-5 pr-14" : "px-5",
          className
        )}
        {...rest}
      />
      {icon}
    </div>
  );
};

export default React.forwardRef(Input);
