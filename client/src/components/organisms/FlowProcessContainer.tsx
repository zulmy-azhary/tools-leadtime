import React from "react";
import { ContentWrapper, Headers, Table, UnitCard } from "../molecules";
import { Card, Heading, Input, Label, Select } from "../atoms";
import { IoSearch, IoBuild } from "react-icons/io5";
import { flowProcessColumns } from "../../helpers/tableColumns";
import type { TFlowProcess } from "../../types";

const FlowProcessContainer: React.FC = () => {
  return (
    <ContentWrapper className="grid grid-cols-4 gap-x-6">
      <Headers headerTitle="Flow Proses" description="Leadtime & Paint" className="col-span-full" />
      <Card className="col-span-3 flex flex-col gap-y-2 px-8 py-6">
        <Label className="text-sm font-medium">Tampilkan Proses</Label>
        <Select options={["ketokan", "putty", "removal", "masking", "epoxy", "spraying", "assembling", "polishing"]} />
      </Card>
      <UnitCard icon={IoBuild} title="Ketokan" unitValue={0} subTitle="Proses Unit" />
      <Card className="col-span-full flex min-h-[24rem] flex-col gap-y-12 px-8 py-6">
        <div className="flex h-fit items-center justify-between">
          <Heading className="text-lg font-semibold">Flow Proses Table</Heading>
          <Input placeholder="Search Work Order" icon={<IoSearch className="absolute right-5" />} />
        </div>
        <Table data={flowProcessData} columns={flowProcessColumns} />
      </Card>
    </ContentWrapper>
  );
};

const flowProcessData: TFlowProcess[] = [
  {
    workOrder: "20204/SWO/23/04/00001",
    plateNumber: "DD-1234-XX",
    serviceAdvisor: "Ahmad Supardi",
    carType: "Avanza",
    damageType: "Ringan",
    entryDate: "04 April 2023",
    handOver: "A",
    process: "Ketokan",
    duration: "2 Hari",
    status: "Dikerjakan"
  },
  {
    workOrder: "20204/SWO/23/04/00002",
    plateNumber: "DD-1234-XX",
    serviceAdvisor: "Reza",
    carType: "Agya",
    damageType: "Berat",
    entryDate: "01 April 2023",
    handOver: "B",
    process: "Ketokan",
    duration: "2 Hari",
    status: "Selesai"
  },
  {
    workOrder: "20204/SWO/23/04/00003",
    plateNumber: "DD-1234-XX",
    serviceAdvisor: "Syamsuryanan Amir",
    carType: "Fortuner",
    damageType: "Sedang",
    entryDate: "03 April 2023",
    handOver: "C",
    process: "Ketokan",
    duration: "2 Hari",
    status: "Dikerjakan"
  }
];

export default FlowProcessContainer;
