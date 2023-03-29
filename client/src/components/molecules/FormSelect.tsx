import React from "react";
import { Select, Label, Text } from "../atoms";
import type { TUserProps } from "../../types";
import { useFormContext } from "react-hook-form";
import clsx from "clsx";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  inputName: TUserProps;
  label: string;
  options: string[];
}

const SelectForm: React.FC<Props> = props => {
  const { inputName, className, options, label, ...rest } = props;

  const {
    register,
    formState: { errors }
  } = useFormContext();

  return (
    <div className={clsx("flex flex-col gap-y-2", className)}>
      <Label className="text-sm font-medium">{label}</Label>
      <Select
        options={options}
        className={clsx(errors[inputName]?.message ? "border-rose-500" : "border-slate-300", className)}
        {...register(inputName)}
        {...rest}
      />
      {errors[inputName]?.message && (
        <Text className="text-xs font-medium tracking-wide text-red-500">{`${errors[inputName]?.message}`}</Text>
      )}
    </div>
  );
};

export default SelectForm;
