import React from "react";
import clsx from "clsx";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const Card: React.FC<Props> = props => {
  const { className, children, ...rest } = props;

  return (
    <div
      className={clsx(
        "relative rounded-lg",
        "border-[1.6px] border-gray-200 dark:border-gray-800 ",
        "shadow-lg shadow-gray-200 dark:shadow-gray-900",
        "bg-card-bg-light dark:bg-card-bg-dark",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card;
