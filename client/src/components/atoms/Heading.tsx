import clsx from "clsx";
import React from "react";

type Props = React.HTMLAttributes<HTMLHeadingElement>;

const Heading: React.FC<React.PropsWithChildren<Props>> = props => {
  const { children, className, ...rest } = props;
  return (
    <h2 className={clsx(className)} {...rest}>
      {children}
    </h2>
  );
};

export default Heading;
