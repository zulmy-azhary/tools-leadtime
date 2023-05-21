import React, { useEffect } from "react";
import { ContentWrapper, Filter, Header, Modal, Pagination, Table } from "../molecules";
import clsx from "clsx";
import { Button, Card, Heading } from "../atoms";
import { IoAdd, IoRefresh } from "react-icons/io5";
import { useTableInstance, useToggle } from "../../hooks";
import { DeleteUnit, DetailUnit, UnitForm, UpdateUnit } from ".";
import { unitColumns } from "../../helpers/tableColumns";
import { useQuery } from "react-query";
import { getAllUnit } from "../../api/unit";
import type { TUnitData } from "../../types";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { unitSchemas } from "../../schemas";
import type { ColumnDef } from "@tanstack/react-table";
import { IoMdInformationCircle, IoMdTrash } from "react-icons/io";
import { getDateFormattedData } from "../../helpers/functions";

const DataUnitContainer: React.FC = () => {
  const [isOpen, onToggle] = useToggle();
  const methods = useForm<TUnitData & { code: string }>({ resolver: yupResolver(unitSchemas) });

  const { data, isLoading } = useQuery<TUnitData[]>({
    queryKey: ["unit", "getAll"],
    queryFn: async () => {
      const data = await getAllUnit();

      return getDateFormattedData<TUnitData>(data);
    }
  });

  const instanceTable = useTableInstance({
    data: data ?? [],
    columns: unitColumns,
    action
  });

  useEffect(() => {
    methods.clearErrors();
  }, [isOpen]);

  return (
    <>
      <ContentWrapper>
        <Header headerTitle="Unit" description="Leadtime & Paint" className="col-span-full" />
        <Card className="col-span-full flex flex-col gap-y-8 overflow-y-auto px-8 py-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Heading className="grow text-center text-xl font-semibold md:text-left">Data Unit Table</Heading>
            <Filter
              instance={instanceTable}
              placeholder="Search Work Order"
              wrapperClassName="w-full md:w-fit"
              clearable
            />
            <Button
              icon={IoAdd}
              onClick={onToggle}
              className={clsx(
                "border-button-bd-light dark:border-button-bd-dark bg-button-bg-light dark:bg-button-bg-dark w-full cursor-pointer border-[1.6px] p-3 text-sm font-semibold md:w-fit"
              )}
            >
              Add New Data
            </Button>
          </div>
          <Table instance={instanceTable} isLoading={isLoading} />
          <Pagination instance={instanceTable} />
        </Card>
      </ContentWrapper>
      <FormProvider {...methods}>
        {isOpen && (
          <Modal isOpen={isOpen} onToggle={onToggle} modalTitle="Input Data Unit">
            <UnitForm onToggle={onToggle} />
          </Modal>
        )}
      </FormProvider>
    </>
  );
};

const action: ColumnDef<TUnitData> = {
  header: "Action",
  cell: ({ row }) => (
    <>
      <DetailUnit dataUnit={row.original} modalTitle="Detail Data Unit" icon={IoMdInformationCircle} />
      <UpdateUnit dataUnit={row.original} modalTitle="Update Unit" icon={IoRefresh} className="text-teal-500" />
      <DeleteUnit dataUnit={row.original} modalTitle="Delete Unit" icon={IoMdTrash} className="text-red-500" />
    </>
  )
};

export default DataUnitContainer;
