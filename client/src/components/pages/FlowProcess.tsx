import React from "react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { FlowProcessContainer } from "../organisms";

const FlowProcess: React.FC = () => {
  useDocumentTitle("Flow Proses");
  return (
    <section>
      <FlowProcessContainer />
    </section>
  );
};

export default FlowProcess;
