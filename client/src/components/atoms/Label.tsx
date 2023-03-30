import clsx from "clsx";
import React from "react";

type Props = React.HTMLAttributes<HTMLLabelElement>;

const Text: React.FC<React.PropsWithChildren<Props>> = props => {
  const { children, className, ...rest } = props;
  return (
    <label className={clsx(className)} {...rest}>
      {children}
    </label>
  );
};

export default Text;
