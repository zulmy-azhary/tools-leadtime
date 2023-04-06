import React from "react";
import { ContentWrapper, Headers, Table, UnitCard } from "../molecules";
import clsx from "clsx";
import { Heading, Input, Label, Select } from "../atoms";
import { IoSearch, IoBuild } from "react-icons/io5";
import { flowProcessColumns } from "../../helpers/tableColumns/flowProcessColumns";
import type { TFlowProcess } from "../../types";

const FlowProcessContainer: React.FC = () => {
  return (
    <ContentWrapper className="grid grid-cols-4 gap-x-6">
      <Headers headerTitle="Flow Proses" description="Leadtime & Paint" className="col-span-full" />
      <div className={clsx("col-span-3 flex flex-col gap-y-2 rounded-lg bg-white px-8 py-6 shadow-lg")}>
        <Label className="text-sm font-medium">Tampilkan Proses</Label>
        <Select options={["ketokan", "putty", "removal", "masking", "epoxy", "spraying", "assembling", "polishing"]} />
      </div>
      <UnitCard icon={IoBuild} title="Ketokan" unitValue={0} subTitle="Proses Unit" />
      <div
        className={clsx("col-span-full flex min-h-[24rem] flex-col gap-y-12 rounded-lg bg-white px-8 py-6 shadow-lg")}
      >
        <div className="flex h-fit items-center justify-between">
          <Heading className="text-lg font-semibold">Flow Proses Table</Heading>
          <Input placeholder="Search Work Order" icon={<IoSearch className="absolute right-5" />} />
        </div>
        <Table data={flowProcessData} columns={flowProcessColumns} />
      </div>
    </ContentWrapper>
  );
};

const flowProcessData: TFlowProcess[] = [
  {
    workOrder: "20204/SWO/23/04/00001",
    plateNumber: "DD-1234-XX",
    serviceAdvisor: "Ahmad Supardi",
    carType: "A",
    damageType: "A",
    entryDate: "04 April 2023",
    handover: "A",
    process: "Ketok",
    duration: "2 Hari",
    status: "Dikerjakan"
  },
  {
    workOrder: "20204/SWO/23/04/00002",
    plateNumber: "DD-1234-XX",
    serviceAdvisor: "Reza",
    carType: "B",
    damageType: "B",
    entryDate: "01 April 2023",
    handover: "B",
    process: "Ketok",
    duration: "2 Hari",
    status: "Selesai"
  },
  {
    workOrder: "20204/SWO/23/04/00003",
    plateNumber: "DD-1234-XX",
    serviceAdvisor: "Samsuryanan Amir",
    carType: "C",
    damageType: "C",
    entryDate: "03 April 2023",
    handover: "C",
    process: "Ketok",
    duration: "2 Hari",
    status: "Dikerjakan"
  }
];

export default FlowProcessContainer;
