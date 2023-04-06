import React from "react";
import clsx from "clsx";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const ContentWrapper: React.FC<React.PropsWithChildren<Props>> = props => {
  const { children, className } = props;

  return <div className={clsx("flex flex-col gap-y-8", className)}>{children}</div>;
};

export default ContentWrapper;
