import clsx from "clsx";
import React from "react";
import { useFormContext } from "react-hook-form";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
  inputName: string;
  label: string;
  defaultOption?: string;
}

const InputSelectForm: React.FC<Props> = props => {
  const { options, inputName, label, defaultOption, className, ...rest } = props;
  const {
    register,
    formState: { errors }
  } = useFormContext();

  return (
    <div className={clsx("flex h-fit flex-col", className)}>
      <label htmlFor={inputName} className="text-sm">
        {label}
      </label>
      <select
        defaultValue={defaultOption ? "" : options[0]}
        className={clsx(
          "bg-bgLight dark:bg-bgDark w-full border-[1px] px-5 py-3 text-sm tracking-wider text-slate-600 outline-none disabled:text-slate-600/50 dark:text-blue-200 dark:disabled:text-blue-200/50",
          className,
          errors[inputName] ? "border-red-500" : "border-gray-400 dark:border-gray-900"
        )}
        {...register(inputName)}
        {...rest}
      >
        {defaultOption && (
          <option value="" disabled>
            {defaultOption}
          </option>
        )}
        {options.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </select>
      {errors[inputName]?.message && (
        <span className="text-xs tracking-wide text-red-500">{`${errors[inputName]?.message}`}</span>
      )}
    </div>
  );
};

export default InputSelectForm;
