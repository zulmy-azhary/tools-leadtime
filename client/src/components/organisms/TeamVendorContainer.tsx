import React, { type ChangeEvent, useState, useEffect, useMemo } from "react";
import { ContentWrapper, Filter, Header, Pagination, Table, UnitCard } from "../molecules";
import { Card, Heading, Label, Select } from "../atoms";
import { IoPeople } from "react-icons/io5";
import type { TVendor, TVendorData } from "../../types";
import { vendorColumns } from "../../helpers/tableColumns";
import { VENDOR } from "../../helpers/constants";
import { useInstanceTable } from "../../hooks";

const TeamVendorContainer: React.FC = () => {
  const [selectedVendor, setSelectedVendor] = useState<TVendor>("WIS");
  const [vendorUnitCount, setVendorUnitCount] = useState<number>(0);

  const filteredVendorData = useMemo(
    () => vendorData.filter(item => item.vendor === selectedVendor),
    [selectedVendor, vendorData]
  );

  const instancedTable = useInstanceTable({
    data: filteredVendorData,
    columns: vendorColumns
  });

  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => setSelectedVendor(e.target.value as TVendor);

  useEffect(() => {
    setVendorUnitCount(vendorData.filter(item => item.vendor === selectedVendor).length);
  }, [selectedVendor, vendorData]);

  return (
    <ContentWrapper className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      <Header headerTitle="Team Vendor" description="Leadtime & Paint" className="col-span-full" />
      <Card className="col-span-full row-start-3 flex flex-col gap-y-2 px-8 py-6 sm:col-span-1 sm:row-start-2 md:col-span-2 xl:col-span-3">
        <Label className="text-sm font-medium">Tampilkan Vendor</Label>
        <Select value={selectedVendor} onChange={handleSelect} options={VENDOR} clearable={false} />
      </Card>
      <UnitCard
        icon={IoPeople}
        title={selectedVendor}
        unitValue={vendorUnitCount}
        subTitle="Proses Unit"
        className="col-span-full row-start-2 sm:col-span-1"
      />
      <Card className="col-span-full flex flex-col gap-y-8 overflow-y-auto px-8 py-6">
        <div className="flex flex-wrap items-center gap-4">
          <Heading className="grow text-center text-xl font-semibold sm:text-left">Team Vendor Table</Heading>
          <Filter
            instance={instancedTable}
            placeholder="Search Work Order"
            wrapperClassName="w-full sm:w-fit"
            delay={1000}
            clearable
          />
        </div>
        <Table instance={instancedTable} />
        <Pagination instance={instancedTable} />
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
