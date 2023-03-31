import React from "react";
import clsx from "clsx";
import { Heading } from "../atoms";

const QuantityUnit: React.FC = () => {
  return (
    <div className={clsx("grid h-96 place-items-center rounded-lg bg-white px-8 py-6 shadow-lg")}>
      <Heading className="text-lg font-semibold"> Quantity Unit / Month Chart </Heading>
    </div>
  );
};

export default QuantityUnit;
