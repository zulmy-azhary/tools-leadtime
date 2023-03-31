import clsx from "clsx";
import React from "react";
import { Heading } from "../atoms";

const ProcesUnit: React.FC = () => {
  return (
    <div className={clsx("grid h-96 place-items-center rounded-lg bg-white px-8 py-6 shadow-lg")}>
      <Heading className="text-lg font-semibold"> Proces Unit Chart </Heading>
    </div>
  );
};

export default ProcesUnit;
