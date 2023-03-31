import React from "react";
import { ContentWrapper, Headers, UnitCard } from "../molecules";
import clsx from "clsx";
import { Heading, Input, Label, Select } from "../atoms";
import { IoSearch, IoBuild } from "react-icons/io5";

const FlowProcessContainer: React.FC = () => {
  return (
    <>
      <ContentWrapper className="grid grid-cols-4 gap-x-6">
        <Headers headerTitle="Flow Proses" description="Leadtime & Paint" className="col-span-full" />
        <div className={clsx("col-span-3 flex flex-col gap-y-2 rounded-lg bg-white px-8 py-6 shadow-lg")}>
          <Label className="text-sm font-medium">Tampilkan Proses</Label>
          <Select
            options={["ketokan", "putty", "removal", "masking", "epoxy", "spraying", "assembling", "polishing"]}
          />
        </div>
        <UnitCard icon={IoBuild} title="Ketokan" unitValue={0} subTitle="Proses Unit" />
        <div className={clsx("col-span-full h-96 rounded-lg bg-white px-8 py-6 shadow-lg")}>
          <div className="flex h-fit items-center justify-between">
            <Heading className="text-lg font-semibold">Flow Proses Table</Heading>
            <Input placeholder="Search Work Order" renderElement={<IoSearch className="absolute right-5" />} />
          </div>
        </div>
      </ContentWrapper>
    </>
  );
};

export default FlowProcessContainer;
