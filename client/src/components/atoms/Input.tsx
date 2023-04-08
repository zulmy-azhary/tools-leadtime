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
          "inline-flex w-full items-center gap-2 rounded border-[1.5px] bg-slate-50 py-3 text-sm outline-none placeholder:text-slate-500 dark:border-slate-600 dark:bg-slate-800",
          icon ? "pr-11 pl-5" : "px-5",
          className
        )}
        {...rest}
      />
      {icon}
    </div>
  );
};

export default React.forwardRef(Input);
