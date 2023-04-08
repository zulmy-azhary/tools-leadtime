import React from "react";
import clsx from "clsx";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const Card: React.FC<Props> = props => {
  const { className, children, ...rest } = props;

  return (
    <div className={clsx("rounded-lg bg-white shadow-lg dark:bg-slate-900", className)} {...rest}>
      {children}
    </div>
  );
};

export default Card;
