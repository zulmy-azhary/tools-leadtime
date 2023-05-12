import React from "react";
import clsx from "clsx";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const Card: React.FC<Props> = props => {
  const { className, children, ...rest } = props;

  return (
    <div
      className={clsx(
        "dark:border-card-bd-dark border-card-bd-light bg-card-bg-light dark:bg-card-bg-dark relative rounded-lg border-[1.6px] shadow-lg shadow-gray-200 dark:shadow-gray-900",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card;
