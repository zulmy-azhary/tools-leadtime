import React from "react";
import { ContentWrapper, Headers, Modal, Table } from "../molecules";
import clsx from "clsx";
import { Button, Card, Heading, Input } from "../atoms";
import { IoAdd, IoSearch } from "react-icons/io5";
import { useToggle } from "../../hooks";
import { UnitForm } from ".";
import type { TUnit } from "../../types";
import { unitColumns } from "../../helpers/tableColumns";

const DataUnitContainer: React.FC = () => {
  const [isOpen, toggle] = useToggle();

  return (
    <>
      <ContentWrapper>
        <Headers headerTitle="Unit" description="Leadtime & Paint" className="col-span-full" />
        <Card className="col-span-full flex flex-col gap-y-8 overflow-y-auto px-8 py-6">
          <div className="flex flex-wrap items-center gap-4">
            <Heading className="grow text-center text-xl font-semibold md:text-left">Data Unit Table</Heading>
            <Input
              placeholder="Search Work Order"
              icon={<IoSearch className="absolute right-5" />}
              wrapperClassName="w-full md:w-fit"
            />
            <Button
              icon={IoAdd}
              onClick={toggle}
              className={clsx(
                "w-full border-[1.6px] border-gray-300 bg-slate-50 p-3 text-sm dark:border-slate-600 dark:bg-slate-800 md:w-fit"
              )}
            >
              Add New Data
            </Button>
          </div>
          <Table data={unitData} columns={unitColumns} />
        </Card>
      </ContentWrapper>
      {isOpen && (
        <Modal isOpen={isOpen} onToggle={toggle} modalTitle="Input Data Unit">
          <UnitForm />
        </Modal>
      )}
    </>
  );
};

const unitData: TUnit[] = [
  {
    workOrder: "20204/SWO/23/04/00001",
    plateNumber: "DD-1234-XX",
    serviceAdvisor: "Ahmad Supardi",
    carType: "Avanza",
    damageType: "Ringan",
    entryDate: "04 April 2023",
    handOver: "A",
    process: "Ketokan",
    vendor: "WIS"
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
    vendor: "SPA"
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
    vendor: "WIS"
  }
];

export default DataUnitContainer;
