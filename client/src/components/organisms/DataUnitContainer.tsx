import React, { useState } from "react";
import { ContentWrapper, Header, Modal, Table } from "../molecules";
import clsx from "clsx";
import { Button, Card, Heading, Input } from "../atoms";
import { IoAdd, IoSearch } from "react-icons/io5";
import { useToggle } from "../../hooks";
import { DeleteUnit, DetailUnit, UnitForm } from ".";
import { unitColumns } from "../../helpers/tableColumns";
import { useQuery } from "react-query";
import { getAllUnit } from "../../api/unit";
import { format } from "date-fns";
import type { TUnitData } from "../../types";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { unitSchemas } from "../../schemas";
import type { ColumnDef } from "@tanstack/react-table";
import { IoMdInformationCircle, IoMdTrash } from "react-icons/io";

const DataUnitContainer: React.FC = () => {
  const [isOpen, onToggle] = useToggle();
  const methods = useForm<TUnitData & { code: string }>({ resolver: yupResolver(unitSchemas) });
  const [unit, setUnit] = useState<TUnitData[]>([]);

  useQuery({
    queryKey: ["unit", "getAll"],
    queryFn: getAllUnit,
    onSuccess: data => {
      const filteredData = data.map(unit => {
        const { entryDate, handOver, ...rest } = unit;

        return {
          ...rest,
          entryDate: format(new Date(entryDate), "dd MMMM yyyy"),
          handOver: format(new Date(handOver), "dd MMMM yyyy")
        };
      });

      setUnit(filteredData);
    }
  });

  return (
    <FormProvider {...methods}>
      <ContentWrapper>
        <Header headerTitle="Unit" description="Leadtime & Paint" className="col-span-full" />
        <Card className="col-span-full flex flex-col gap-y-8 overflow-y-auto px-8 py-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Heading className="grow text-center text-xl font-semibold md:text-left">Data Unit Table</Heading>
            <Input
              placeholder="Search Work Order"
              icon={<IoSearch className="absolute right-5" />}
              wrapperClassName="w-full md:w-fit"
            />
            <Button
              icon={IoAdd}
              onClick={onToggle}
              className={clsx(
                "w-full cursor-pointer p-3 text-sm font-semibold md:w-fit",
                "border-button-bd-light dark:border-button-bd-dark border-[1.6px]",
                "bg-button-bg-light dark:bg-button-bg-dark"
              )}
            >
              Add New Data
            </Button>
          </div>
          <Table data={unit} columns={unitColumns} action={action} />
        </Card>
      </ContentWrapper>
      {isOpen && (
        <Modal isOpen={isOpen} onToggle={onToggle} modalTitle="Input Data Unit">
          <UnitForm onToggle={onToggle} />
        </Modal>
      )}
    </FormProvider>
  );
};

const action: ColumnDef<TUnitData> = {
  header: "Action",
  cell: ({ row }) => (
    <>
      <DetailUnit dataUnit={row.original} modalTitle="Detail Data Unit" icon={IoMdInformationCircle} />
      <DeleteUnit dataUnit={row.original} modalTitle="Delete Unit" icon={IoMdTrash} className="text-red-500" />
    </>
  )
};

export default DataUnitContainer;
