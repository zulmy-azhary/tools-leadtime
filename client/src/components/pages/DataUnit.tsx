import React from "react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { DataUnitContainer } from "../organisms";

const DataUnit: React.FC = () => {
  useDocumentTitle("Unit");

  return (
    <section>
      <DataUnitContainer />
    </section>
  );
};

export default DataUnit;
