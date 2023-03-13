import clsx from "clsx";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
}

const IconWrapper: React.FC<Props> = props => {
  const { icon, className, ...rest } = props;
  return (
    <div
      className={clsx(
        "rounded-lg border-[1px] border-indigo-500 bg-indigo-500/25 p-3 dark:border-teal-400 dark:bg-teal-400/25",
        className
      )}
      {...rest}
    >
      {icon}
    </div>
  );
};

export default IconWrapper;
