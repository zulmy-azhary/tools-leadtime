import React from "react";
import { ContentWrapper, Headers, UnitCard } from "../molecules";
import { IoBuild } from "react-icons/io5";
import type { TProcess } from "../../types";

const proses: TProcess[] = ["Ketokan", "Putty", "Removal", "Masking", "Epoxy", "Spraying", "Assembling", "Polishing"];

const UnitProcessCard: React.FC = () => {
  return (
    <ContentWrapper className="grid-flow-dense sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <Headers headerTitle="Dashboard" description="Leadtime & Paint" className="col-span-full" />
      {proses.map((item, idx) => (
        <UnitCard key={idx} icon={IoBuild} title={item} unitValue={0} subTitle="Proses Unit" />
      ))}
    </ContentWrapper>
  );
};

export default UnitProcessCard;
