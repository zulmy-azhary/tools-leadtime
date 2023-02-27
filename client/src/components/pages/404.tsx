import React from "react";
import { LinkToPage } from "../molecules";

const Custom404: React.FC = () => {
  return (
    <div className="col-span-full grid place-items-center gap-y-5">
      <p>Oops! The page you are looking for does not exist. 😕</p>
      <LinkToPage to="/" linkClassName="px-6 py-1 border-[1px] border-blue-500">
        Back
      </LinkToPage>
    </div>
  );
};

export default Custom404;
