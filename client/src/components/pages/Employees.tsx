import React from "react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { DataEmployeeContainer } from "../organisms";

const Employees: React.FC = () => {
  useDocumentTitle("Data Karyawan");
  return (
    <section>
      <DataEmployeeContainer />
    </section>
  );
};

export default Employees;
