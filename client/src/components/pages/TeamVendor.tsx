import React from "react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { TeamVendorContainer } from "../organisms";

const FlowProcess: React.FC = () => {
  useDocumentTitle("Team Vendor");
  return (
    <section>
      <TeamVendorContainer />
    </section>
  );
};

export default FlowProcess;
