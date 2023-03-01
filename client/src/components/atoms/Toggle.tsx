import React from "react";
import { useTheme } from "../../context";
import clsx from "clsx";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const Toggle: React.FC<Props> = props => {
  const { className, ...rest } = props;
  const { themeChange } = useTheme();
  return (
    <div
      onClick={themeChange}
      className={clsx(
        className,
        "after:bg-cardLight dark:after:bg-cardDark relative flex h-4 w-9 cursor-pointer items-center rounded-full bg-indigo-500 px-1 after:sticky after:left-0 after:h-2 after:w-2 after:rounded-full dark:bg-teal-400 dark:after:left-full"
      )}
      {...rest}
    />
  );
};

export default Toggle;
