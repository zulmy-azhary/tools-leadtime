import clsx from "clsx";
import React from "react";

type Props = React.HTMLAttributes<HTMLDivElement>;

const IconWrapper: React.FC<Props> = props => {
  const { children, className, ...rest } = props;
  return (
    <figure
      className={clsx(
        "rounded-xl border-2 border-blue-500 bg-blue-500/20 bg-gradient-to-r p-3.5 text-3xl text-blue-500"
      )}
      {...rest}
    >
      {children}
    </figure>
  );
};

export default IconWrapper;
