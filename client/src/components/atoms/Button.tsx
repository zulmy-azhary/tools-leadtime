import React from "react";
import clsx from "clsx";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<React.PropsWithChildren<Props>> = ({ children, className, ...rest }) => {
  return (
    <button
      className={clsx(
        "text-bgLight dark:text-bgDark bg-indigo-500 px-5 py-2 font-medium disabled:bg-indigo-500/75 dark:bg-teal-400 dark:disabled:bg-teal-400/75",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
