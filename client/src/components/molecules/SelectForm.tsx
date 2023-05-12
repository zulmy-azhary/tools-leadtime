import React from "react";
import { Select, Label, Text } from "../atoms";
import type { TUnitProps, TUserProps } from "../../types";
import { useFormContext, Controller } from "react-hook-form";
import clsx from "clsx";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  inputName: TUserProps | TUnitProps;
  label: string;
  options: string[];
}

const SelectForm: React.FC<Props> = props => {
  const { inputName, className, options, label, ...rest } = props;

  const {
    control,
    formState: { errors }
  } = useFormContext();

  return (
    <div className={clsx("flex flex-col gap-y-2", className)}>
      <Label className="text-sm font-medium">{label}</Label>
      <Controller
        control={control}
        name={inputName}
        render={({ field: { onChange, value } }) => (
          <Select
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
            options={options}
            value={value}
            className={clsx(errors[inputName] && "!border-error")}
            {...rest}
          />
        )}
      />
      {errors[inputName]?.message && (
        <Text className="text-xs font-medium tracking-wide text-red-500">{`${errors[inputName]?.message}`}</Text>
      )}
    </div>
  );
};

export default SelectForm;
