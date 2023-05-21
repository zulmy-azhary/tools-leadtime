import React, { useEffect, useState, useMemo, Suspense } from "react";
import { ContentWrapper, Pagination, Header, Table, UnitCard, Filter } from "../molecules";
import { Card, Heading, Label, Select } from "../atoms";
import { IoBuild } from "react-icons/io5";
import { flowProcessColumns } from "../../helpers/tableColumns";
import type { TMainProcess, TFlowProcessDataUnit, TUserRole, TStatus } from "../../types";
import { MAIN_PROCESS } from "../../helpers/constants";
import { useAuth } from "../../context";
import { getDateFormattedData, getPreviousProcess, manageRole } from "../../helpers/functions";
import { useQuery } from "react-query";
import { getAllFlowProcess } from "../../api/flowProcess";
import { type ColumnDef } from "@tanstack/react-table";
import { IoMdInformationCircle } from "react-icons/io";
import { useInstanceTable } from "../../hooks";

const FlowProcessDetail = React.lazy(
  async () => await import(".").then(({ FlowProcessDetail }) => ({ default: FlowProcessDetail }))
);

const FlowProcessContainer: React.FC = () => {
  const { user } = useAuth();
  const [processCount, setProcessCount] = useState<number>(0);
  const [selectedProcess, setSelectedProcess] = useState<TMainProcess>(
    manageRole<TMainProcess>(user?.role as TUserRole, {
      admin: "Ketokan",
      ketok: "Ketokan",
      preparation: "Putty",
      pengecatan: "Masking",
      inspection: "Assembling"
    })
  );

  const filteredFlowProcessData = useMemo(
    () => flowProcess.filter(item => item.currentProcess === selectedProcess),
    [selectedProcess, flowProcess]
  );

  const instancedTable = useInstanceTable({
    data: filteredFlowProcessData,
    columns: flowProcessColumns,
    action
  });

  const options = manageRole<TMainProcess[]>(user?.role as TUserRole, {
    admin: MAIN_PROCESS,
    ketok: MAIN_PROCESS.slice(0, 2),
    preparation: MAIN_PROCESS.slice(2, 4),
    pengecatan: MAIN_PROCESS.slice(4, 6),
    inspection: MAIN_PROCESS.slice(6, 8)
  });

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedProcess(e.target.value as TMainProcess);
  };

  const { data, isLoading } = useQuery<TFlowProcessDataUnit[]>({
    queryKey: ["flowProcess", "getAll"],
    queryFn: async () => {
      const data = await getAllFlowProcess();

      const formattedData = getDateFormattedData<TFlowProcessDataUnit>(data);

      formattedData.filter(item => {
        if (item.currentStatus === "Menunggu" && item.currentProcess !== "Ketokan") {
          const nextProcessName = getPreviousProcess(MAIN_PROCESS, item.currentProcess);
          const processItem = item.processList.find(item => item.processName === nextProcessName);
          const nextProcess = {
            ...item,
            currentProcess: processItem?.processName as TMainProcess,
            currentStatus: processItem?.status as TStatus
          };
          formattedData.push(nextProcess);
        }

        return item;
      });

      return formattedData;
    }
  });

  const filteredFlowProcessData = (data ?? []).filter(item => item.currentProcess === selectedProcess);

  useEffect(() => {
    setProcessCount((data ?? []).filter(item => item.currentProcess === selectedProcess).length);
  }, [selectedProcess, data]);

  return (
    <ContentWrapper className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      <Header headerTitle="Flow Proses" description="Leadtime & Paint" className="col-span-full" />
      <Card className="col-span-full row-start-3 flex flex-col gap-y-2 px-8 py-6 sm:col-span-1 sm:row-start-2 md:col-span-2 xl:col-span-3">
        <Label className="text-sm font-medium">Tampilkan Proses</Label>
        <Select value={selectedProcess} onChange={handleSelect} options={options} clearable={false} />
      </Card>
      <UnitCard
        icon={IoBuild}
        title={selectedProcess}
        unitValue={processCount}
        subTitle="Proses Unit"
        className="col-span-full row-start-2 sm:col-span-1"
      />
      <Card className="col-span-full flex flex-col gap-y-8 overflow-y-auto px-8 py-6">
        <div className="flex flex-wrap items-center gap-4">
          <Heading className="grow text-center text-xl font-semibold sm:text-left">Summary Table</Heading>
          <Filter
            instance={instancedTable}
            delay={1000}
            placeholder="Search Work Order"
            wrapperClassName="w-full sm:w-fit"
            clearable
          />
        </div>
        <Table instance={instancedTable} isLoading={isLoading} />
        <Pagination instance={instancedTable} />
      </Card>
    </ContentWrapper>
  );
};

const action: ColumnDef<TFlowProcessDataUnit> = {
  header: "Action",
  cell: ({ row }) => (
    <Suspense fallback={<p>Please wait...</p>}>
      <FlowProcessDetail flowProcess={row.original} icon={IoMdInformationCircle} modalTitle="Detail Proses" />
    </Suspense>
  )
};

export default FlowProcessContainer;
