import React from "react";
import clsx from "clsx";
import { Button, Heading, Input, Label, Text } from "../atoms";
import type { TUnitProps } from "../../types";
import { Controller, useFormContext } from "react-hook-form";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import { IoCalendar, IoCaretBack, IoCaretForward } from "react-icons/io5";
import id from "date-fns/locale/id";

import "react-datepicker/dist/react-datepicker.min.css";

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  inputName: TUnitProps;
  label: string;
  fieldClassName?: string;
}

registerLocale("id", id);

const DatePickerForm: React.FC<Props> = props => {
  const { inputName, label, className, fieldClassName, defaultValue } = props;
  const {
    control,
    formState: { errors }
  } = useFormContext();

  return (
    <div className={clsx("flex flex-col gap-y-2", className)}>
      <Label className="text-sm font-medium">{label}</Label>
      <Controller
        name={inputName}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <ReactDatePicker
            onChange={(date: Date) => onChange(date)}
            placeholderText="e.g. 25/12/2022"
            dateFormat={"dd/MM/yyyy"}
            showPopperArrow={false}
            selected={value ? new Date(value) : null}
            locale={"id"}
            customInput={
              <Input
                icon={<IoCalendar className={clsx("absolute right-5")} />}
                className={clsx(errors[inputName] && "!border-error", fieldClassName)}
              />
            }
            calendarClassName={clsx(
              "!bg-field-bg-light dark:!bg-field-bg-dark !border-field-bd-light dark:!border-field-bd-dark/70 text-typo-light dark:text-typo-dark !border-[1.6px] p-3"
            )}
            renderCustomHeader={({
              date,
              increaseMonth,
              decreaseMonth,
              nextMonthButtonDisabled,
              prevMonthButtonDisabled
            }) => {
              const year = date.getFullYear();
              const month = date.toLocaleDateString("id", { month: "long" });
              return (
                <div className={clsx("flex items-center justify-between")}>
                  <Button type="button" onClick={decreaseMonth} icon={IoCaretBack} disabled={prevMonthButtonDisabled} />
                  <div className={clsx("flex")}>
                    <Heading
                      className={clsx("text-typo-light dark:text-typo-dark text-lg font-semibold")}
                    >{`${month}, ${year}`}</Heading>
                  </div>
                  <Button
                    type="button"
                    onClick={increaseMonth}
                    icon={IoCaretForward}
                    disabled={nextMonthButtonDisabled}
                  />
                </div>
              );
            }}
          />
        )}
      />
      {errors[inputName]?.message && (
        <Text
          className={clsx("text-xs font-medium", errors[inputName] && "!text-error")}
        >{`${errors[inputName]?.message}`}</Text>
      )}
    </div>
  );
};

export default DatePickerForm;
