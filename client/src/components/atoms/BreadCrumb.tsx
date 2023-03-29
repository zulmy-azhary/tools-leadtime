import React from "react";
import { AiFillHome } from "react-icons/ai";
import { IoChevronForwardOutline } from "react-icons/io5";

const Breadcrumb: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex items-center gap-x-4 font-semibold">
      <AiFillHome className="text-lg" />
      <IoChevronForwardOutline className="text-lg" />
      <span className="capitalize">{children}</span>
    </div>
  );
};

export default Breadcrumb;
