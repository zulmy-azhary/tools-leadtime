import React from "react";
import { ContentWrapper, Headers, Table, UnitCard } from "../molecules";
import { Card, Heading, Input, Label, Select } from "../atoms";
import { IoSearch, IoPeople } from "react-icons/io5";
import type { TVendorData } from "../../types";
import { vendorColumns } from "../../helpers/tableColumns";

const TeamVendorContainer: React.FC = () => {
  return (
    <ContentWrapper className="grid grid-cols-4 gap-x-6">
      <Headers headerTitle="Team Vendor" description="Leadtime & Paint" className="col-span-full" />
      <Card className="col-span-3 flex flex-col gap-y-2 px-8 py-6">
        <Label className="text-sm font-medium">Tampilkan Vendor</Label>
        <Select options={["WIS", "SPA"]} />
      </Card>
      <UnitCard icon={IoPeople} title="WIS" unitValue={0} subTitle="Total Unit" />
      <Card className="col-span-full flex min-h-[24rem] flex-col gap-y-12 px-8 py-6">
        <div className="flex h-fit items-center justify-between">
          <Heading className="text-lg font-semibold">Team Vendor Table</Heading>
          <Input placeholder="Search Work Order" icon={<IoSearch className="absolute right-5" />} />
        </div>
        <Table data={vendorData} columns={vendorColumns} />
      </Card>
    </ContentWrapper>
  );
};

const vendorData: TVendorData[] = [
  {
    workOrder: "20204/SWO/23/04/00001",
    plateNumber: "DD-1234-XX",
    serviceAdvisor: "Ahmad Supardi",
    vendor: "WIS"
  },
  {
    workOrder: "20204/SWO/23/04/00002",
    plateNumber: "DD-1234-XX",
    serviceAdvisor: "Reza",
    vendor: "SPA"
  },
  {
    workOrder: "20204/SWO/23/04/00003",
    plateNumber: "DD-1234-XX",
    serviceAdvisor: "Syamsuryanan Amir",
    vendor: "WIS"
  }
];

export default TeamVendorContainer;
