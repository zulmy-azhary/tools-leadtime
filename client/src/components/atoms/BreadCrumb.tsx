import React from "react";
import { AiFillHome } from "react-icons/ai";
import { IoChevronForwardOutline } from "react-icons/io5";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  paths: string[];
}

const Breadcrumb: React.FC<Props> = props => {
  const { paths, className, ...rest } = props;

  return (
    <div className="flex items-center gap-x-4 font-semibold" {...rest}>
      <AiFillHome className="text-lg" />
      {paths
        .filter((_, idx) => idx <= 1)
        .map((path, idx) => (
          <React.Fragment key={idx}>
            <IoChevronForwardOutline className="text-lg" />
            <span className="capitalize">{path}</span>
          </React.Fragment>
        ))}
    </div>
  );
};

export default Breadcrumb;
