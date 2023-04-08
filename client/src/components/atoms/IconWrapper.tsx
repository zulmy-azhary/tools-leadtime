import clsx from "clsx";
import React from "react";

type Props = React.HTMLAttributes<HTMLDivElement>;

const IconWrapper: React.FC<Props> = props => {
  const { children, className, ...rest } = props;
  return (
    <figure
      className={clsx(
        "rounded-md border-[1px] border-blue-500 bg-blue-500/30 p-3.5 text-2xl dark:border-teal-400 dark:bg-teal-400/30",
        className
      )}
      {...rest}
    >
      {children}
    </figure>
  );
};

export default IconWrapper;
