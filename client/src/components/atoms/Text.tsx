import clsx from "clsx";
import React from "react";

type Props = React.HTMLAttributes<HTMLParagraphElement>;

const Text: React.FC<React.PropsWithChildren<Props>> = props => {
  const { children, className, ...rest } = props;
  return (
    <p className={clsx(className)} {...rest}>
      {children}
    </p>
  );
};

export default Text;
