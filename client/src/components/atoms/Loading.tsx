import React from "react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { CgSpinnerTwoAlt } from "react-icons/cg";

const Loading: React.FC = () => {
  useDocumentTitle("Loading...");
  return (
    <div className="grid min-h-screen place-items-center">
      <div className="flex items-center gap-x-2">
        <CgSpinnerTwoAlt className="animate-spin" />
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
