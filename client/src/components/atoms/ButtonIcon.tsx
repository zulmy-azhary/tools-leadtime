import clsx from "clsx";
import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const ButtonIcon: React.FC<React.PropsWithChildren<Props>> = props => {
  const { children, className, ...rest } = props;

  return (
    <button type="button" className={clsx("absolute inset-y-2 right-3 p-1", className)} {...rest}>
      {children}
    </button>
  );
};

export default ButtonIcon;
