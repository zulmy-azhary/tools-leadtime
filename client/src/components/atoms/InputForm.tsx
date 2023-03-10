import clsx from "clsx";
import React from "react";
import type { TUserProps } from "../../types";
import { useFormContext } from "react-hook-form";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  inputName: TUserProps;
  label: string;
  renderButton?: React.ReactNode;
}

const InputForm: React.ForwardRefRenderFunction<HTMLDivElement, Props> = (props, forwardRef) => {
  const { inputName, label, className, type, renderButton, ...rest } = props;
  const {
    register,
    formState: { errors }
  } = useFormContext();

  return (
    <div className={clsx("flex h-fit flex-col", className)} ref={forwardRef}>
      <label htmlFor={inputName} className="text-sm">
        {label}
      </label>
      <div className="relative">
        <input
          id={inputName}
          {...register(inputName)}
          className={clsx(
            "bg-bgLight dark:bg-bgDark w-full border-[1px] px-5 py-3 text-sm tracking-wider text-slate-600 outline-none placeholder:text-slate-600/50 dark:text-blue-200 dark:placeholder:text-blue-200/50",
            errors[inputName] ? "border-red-500" : "border-gray-400 dark:border-gray-900"
          )}
          autoComplete="off"
          type={type}
          {...rest}
        />
        {renderButton}
      </div>
      {errors[inputName]?.message && (
        <span className="text-xs tracking-wide text-red-500">{`${errors[inputName]?.message}`}</span>
      )}
    </div>
  );
};

export default React.forwardRef(InputForm);
