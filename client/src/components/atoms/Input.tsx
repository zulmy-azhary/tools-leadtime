import React from "react";
import clsx from "clsx";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  renderElement?: React.ReactNode;
}

const Input: React.ForwardRefRenderFunction<HTMLInputElement, Props> = (props, forwardRef) => {
  const { renderElement, className, ...rest } = props;

  return (
    <div className={clsx("relative flex items-center")}>
      <input
        ref={forwardRef}
        className={clsx(
          "inline-flex w-full items-center gap-2 rounded border-[1.5px] py-3 text-sm outline-none",
          " bg-slate-50",
          renderElement ? "pr-11 pl-5" : "px-5",
          className
        )}
        {...rest}
      />
      {renderElement}
    </div>
  );
};

export default React.forwardRef(Input);
