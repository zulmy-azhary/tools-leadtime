import React from "react";
import { Input, Label, Text } from "../atoms";
import type { TUserProps, TUnitProps } from "../../types";
import { useFormContext } from "react-hook-form";
import clsx from "clsx";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  inputName: TUserProps | TUnitProps;
  label: string;
  icon?: React.ReactNode;
}

const InputForm: React.FC<Props> = props => {
  const { inputName, className, icon, type, label, ...rest } = props;
  const {
    register,
    formState: { errors }
  } = useFormContext();

  return (
    <div className={clsx("flex flex-col gap-y-2", className)}>
      <Label className="text-sm font-medium">{label}</Label>
      <Input
        {...register(inputName)}
        icon={icon}
        autoComplete="off"
        className={clsx(errors[inputName] ? "border-rose-500" : "border-slate-300")}
        type={type}
        {...rest}
      />
      {errors[inputName]?.message && (
        <Text className="text-xs font-medium tracking-wide text-red-500">{`${errors[inputName]?.message}`}</Text>
      )}
    </div>
  );
};

export default InputForm;
