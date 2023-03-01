import React from "react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

const Employees: React.FC = () => {
  useDocumentTitle("Data Karyawan");
  return <h2 className="grow text-center">Karyawan Page</h2>;
};

export default Employees;
