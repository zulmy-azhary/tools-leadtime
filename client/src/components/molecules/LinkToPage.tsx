import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";

interface Props extends React.HTMLAttributes<HTMLParagraphElement> {
  desc?: string | React.ReactNode;
  to: string;
  linkClassName?: string;
}

const LinkToPage: React.FC<React.PropsWithChildren<Props>> = props => {
  const { desc, to, linkClassName, children, className, ...rest } = props;
  return (
    <p className={clsx("flex items-center gap-x-1 text-sm", className)} {...rest}>
      {desc}
      <Link to={to} className={clsx("text-blue-500", linkClassName)}>
        {children}
      </Link>
    </p>
  );
};

export default LinkToPage;
