import React from "react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { FlowProcessContainer } from "../organisms";

const FlowProcess: React.FC = () => {
  useDocumentTitle("Flow Proses");

  return (
    <>
      <FlowProcessContainer />
    </>
  );
};

export default FlowProcess;
