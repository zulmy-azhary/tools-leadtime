import React, { useState } from "react";
import { ContentWrapper, Headers, Modal, Table } from "../molecules";
import clsx from "clsx";
import { Button, Card, Heading, Input } from "../atoms";
import { IoAdd, IoSearch } from "react-icons/io5";
import { useToggle } from "../../hooks";
import { UnitForm } from ".";
import { unitColumns } from "../../helpers/tableColumns";
import { useQuery } from "react-query";
import { getAllUnit } from "../../api/unit";
import { format } from "date-fns";
import type { TUnit } from "../../types";

const DataUnitContainer: React.FC = () => {
  const [isOpen, onToggle] = useToggle();
  const [unit, setUnit] = useState<TUnit[]>([]);

  useQuery({
    queryKey: ["unit", "getAll"],
    queryFn: getAllUnit,
    onSuccess: data => {
      const filteredData = (data ?? []).map(unit => {
        const { entryDate, handOver, ...rest } = unit;

        return {
          ...rest,
          entryDate: format(new Date(entryDate), "dd/MM/yyyy"),
          handOver: format(new Date(handOver), "dd/MM/yyyy")
        };
      });

      setUnit(filteredData);
    }
  });

  return (
    <>
      <ContentWrapper>
        <Headers headerTitle="Unit" description="Leadtime & Paint" className="col-span-full" />
        <Card className="col-span-full flex min-h-[24rem] flex-col gap-y-12 px-8 py-6">
          <div className="flex h-fit items-center gap-4">
            <Heading className="grow text-lg font-semibold">Data Unit Table</Heading>
            <Input type="text" placeholder="Search Work Order" icon={<IoSearch className="absolute right-5" />} />
            <Button
              icon={IoAdd}
              onClick={onToggle}
              className={clsx(
                "border-[1.6px] border-gray-300 bg-slate-50 p-3 text-sm dark:border-slate-600 dark:bg-slate-800"
              )}
            >
              Add New Data
            </Button>
          </div>
          <Table data={unit} columns={unitColumns} />
        </Card>
      </ContentWrapper>
      {isOpen && (
        <Modal isOpen={isOpen} onToggle={onToggle} modalTitle="Input Data Unit">
          <UnitForm onToggle={onToggle} />
        </Modal>
      )}
    </>
  );
};

export default DataUnitContainer;
