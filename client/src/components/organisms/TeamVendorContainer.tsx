import React from "react";
import { ContentWrapper, Headers, UnitCard } from "../molecules";
import clsx from "clsx";
import { Heading, Input, Label, Select } from "../atoms";
import { IoSearch, IoPeople } from "react-icons/io5";

const TeamVendorContainer: React.FC = () => {
  return (
    <ContentWrapper className="grid grid-cols-4 gap-x-6">
      <Headers headerTitle="Team Vendor" description="Leadtime & Paint" className="col-span-full" />
      <div className={clsx("col-span-3 flex flex-col gap-y-2 rounded-lg bg-white px-8 py-6 shadow-lg")}>
        <Label className="text-sm font-medium">Tampilkan Vendor</Label>
        <Select options={["WIS", "SPA"]} />
      </div>
      <UnitCard icon={IoPeople} title="WIS" unitValue={0} subTitle="Total Unit" />
      <div className={clsx("col-span-full h-96 rounded-lg bg-white px-8 py-6 shadow-lg")}>
        <div className="flex h-fit items-center justify-between">
          <Heading className="text-lg font-semibold">Team Vendor Table</Heading>
          <Input placeholder="Search Work Order" icon={<IoSearch className="absolute right-5" />} />
        </div>
      </div>
    </ContentWrapper>
  );
};

export default TeamVendorContainer;
