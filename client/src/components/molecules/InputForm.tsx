import React from "react";
import { Input, Label, Text } from "../atoms";
import type { TUserProps, TUnitProps } from "../../types";
import { useFormContext } from "react-hook-form";
import clsx from "clsx";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  inputName: TUserProps | TUnitProps;
  label: string;
  icon?: React.ReactNode;
  additionalValue?: string;
}

const InputForm: React.FC<Props> = props => {
  const { inputName, className, icon, additionalValue, type, label, ...rest } = props;
  const {
    register,
    formState: { errors }
  } = useFormContext();

  return (
    <div className={clsx("flex flex-col gap-y-2", className)}>
      <Label className="text-sm font-medium">{label}</Label>
      <div className="flex w-full gap-x-3">
        {additionalValue && (
          <Input
            icon={icon}
            autoComplete="off"
            className={"grow read-only:text-slate-500 read-only:opacity-75"}
            type={"text"}
            {...register("code")}
            value={additionalValue}
            readOnly
          />
        )}
        <Input
          {...register(inputName)}
          icon={icon}
          autoComplete="off"
          className={clsx(
            "read-only:text-slate-500 read-only:opacity-75",
            errors[inputName] && "!border-error"
          )}
          wrapperClassName="w-full"
          type={type}
          {...rest}
        />
      </div>
      {errors[inputName]?.message && (
        <Text className="text-error text-xs font-medium tracking-wide">{`${errors[inputName]?.message}`}</Text>
      )}
    </div>
  );
};

export default InputForm;
