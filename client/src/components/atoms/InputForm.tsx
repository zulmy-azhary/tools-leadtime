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
    <div className={clsx("flex flex-col h-fit", className)} ref={forwardRef}>
      <label htmlFor={inputName} className="text-sm">
        {label}
      </label>
      <div className="relative">
        <input
          id={inputName}
          {...register(inputName)}
          className={clsx(
            "border-[1px] text-primaryTextDark bg-bgDark px-5 py-3 outline-none text-sm w-full",
            errors[inputName] ? "border-red-500" : "border-black"
          )}
          autoComplete="off"
          type={type}
          {...rest}
        />
        {renderButton}
      </div>
      {errors[inputName]?.message && <span className="text-red-500 text-xs">{`${errors[inputName]?.message}`}</span>}
    </div>
  );
};

export default React.forwardRef(InputForm);
