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
        "flex justify-center items-center w-9 h-4 bg-indigo-500 dark:bg-teal-400 rounded-full cursor-pointer relative after:absolute after:w-2 after:h-2 after:bg-cardLight dark:after:bg-cardDark after:rounded-full after:left-1 dark:after:left-auto dark:after:right-1 transition-colors"
      )}
      {...rest}
    />
  );
};

export default Toggle;
