import clsx from "clsx";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
  childClassName?: string;
}

const LabelContent: React.FC<Props> = props => {
  const { label, value, className, childClassName, ...rest } = props;
  return (
    <div className={clsx("flex flex-col items-center", className)} {...rest}>
      <p className="font-semibold">{label}</p>
      <span className={clsx("text-base", childClassName ?? "opacity-60")}>{value}</span>
    </div>
  );
};

export default LabelContent;
