import React from "react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

const Loading: React.FC = () => {
  useDocumentTitle("Loading...");
  return <div className="grid min-h-screen place-items-center">Loading...</div>;
};

export default Loading;
