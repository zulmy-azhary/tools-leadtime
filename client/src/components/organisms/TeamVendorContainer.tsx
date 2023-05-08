import React, { type ChangeEvent, useState, useEffect } from "react";
import { ContentWrapper, Header, Table, UnitCard } from "../molecules";
import { Card, Heading, Input, Label, Select } from "../atoms";
import { IoSearch, IoPeople } from "react-icons/io5";
import type { TVendor, TVendorData } from "../../types";
import { vendorColumns } from "../../helpers/tableColumns";
import { VENDOR } from "../../helpers/constants";

const TeamVendorContainer: React.FC = () => {
  const [selectedVendor, setSelectedVendor] = useState<TVendor>("WIS");
  const [vendorUnitCount, setVendorUnitCount] = useState<number>(0);
  const filteredVendorData = vendorData.filter(item => item.vendor === selectedVendor);

  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => setSelectedVendor(e.target.value as TVendor);

  useEffect(() => {
    setVendorUnitCount(vendorData.filter(item => item.vendor === selectedVendor).length);
  }, [selectedVendor, vendorData]);

  return (
    <ContentWrapper className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      <Header headerTitle="Team Vendor" description="Leadtime & Paint" className="col-span-full" />
      <Card className="col-span-full row-start-3 flex flex-col gap-y-2 px-8 py-6 sm:col-span-1 sm:row-start-2 md:col-span-2 xl:col-span-3">
        <Label className="text-sm font-medium">Tampilkan Vendor</Label>
        <Select value={selectedVendor} onChange={handleSelect} options={VENDOR} placeholder="e.g. WIS" />
      </Card>
      <UnitCard
        icon={IoPeople}
        title={selectedVendor || "Unit Vendor"}
        unitValue={vendorUnitCount}
        subTitle="Proses Unit"
        className="col-span-full row-start-2 sm:col-span-1"
      />
      <Card className="col-span-full flex flex-col gap-y-8 overflow-y-auto px-8 py-6">
        <div className="flex flex-wrap items-center gap-4">
          <Heading className="grow text-center text-xl font-semibold sm:text-left">Team Vendor Table</Heading>
          <Input
            placeholder="Search Work Order"
            icon={<IoSearch className="absolute right-5" />}
            wrapperClassName="w-full sm:w-fit"
          />
        </div>
        <Table data={filteredVendorData} columns={vendorColumns} />
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
