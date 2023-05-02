import React, { useEffect, useState, Suspense } from "react";
import { ContentWrapper, Header, Table, UnitCard } from "../molecules";
import { Card, Heading, Input, Label, Select } from "../atoms";
import { IoSearch, IoBuild } from "react-icons/io5";
import { flowProcessColumns } from "../../helpers/tableColumns";
import type { TMainProcess, TFlowProcessDataUnit, TUserRole, TStatus } from "../../types";
import { MAIN_PROCESS } from "../../helpers/constants";
import { useAuth } from "../../context";
import { getPreviousProcess, manageRole } from "../../helpers/functions";
import { useQuery } from "react-query";
import { getAllFlowProcess } from "../../api/flowProcess";
import { format } from "date-fns";
import { type ColumnDef } from "@tanstack/react-table";
import { IoMdInformationCircle } from "react-icons/io";

const FlowProcessDetail = React.lazy(
  async () => await import(".").then(({ FlowProcessDetail }) => ({ default: FlowProcessDetail }))
);

const FlowProcessContainer: React.FC = () => {
  const { user } = useAuth();
  const [flowProcess, setFlowProcess] = useState<TFlowProcessDataUnit[]>([]);
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
  const filteredFlowProcessData = flowProcess.filter(item => item.currentProcess === selectedProcess);

  const options = manageRole<TMainProcess[]>(user?.role as TUserRole, {
    admin: MAIN_PROCESS,
    ketok: MAIN_PROCESS.slice(0, 2),
    preparation: MAIN_PROCESS.slice(2, 4),
    pengecatan: MAIN_PROCESS.slice(4, 6),
    inspection: MAIN_PROCESS.slice(6, 8)
  });

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProcess(e.target.value as TMainProcess);
  };

  useQuery({
    queryKey: ["flowProcess", "getAll"],
    queryFn: getAllFlowProcess,
    onSuccess: data => {
      const formattedData = data.map(item => {
        const { entryDate, handOver, ...rest } = item;

        return {
          ...rest,
          entryDate: format(new Date(entryDate), "dd MMMM yyyy"),
          handOver: format(new Date(handOver), "dd MMMM yyyy")
        };
      });

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
      setFlowProcess(formattedData);
    }
  });

  useEffect(() => {
    setProcessCount(flowProcess.filter(item => item.currentProcess === selectedProcess).length);
  }, [selectedProcess, flowProcess]);

  return (
    <ContentWrapper className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      <Header headerTitle="Flow Proses" description="Leadtime & Paint" className="col-span-full" />
      <Card className="col-span-full row-start-3 flex flex-col gap-y-2 px-8 py-6 sm:col-span-1 sm:row-start-2 md:col-span-2 xl:col-span-3">
        <Label className="text-sm font-medium">Tampilkan Proses</Label>
        <Select onChange={handleSelect} options={options} />
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
          <Input
            placeholder="Search Work Order"
            icon={<IoSearch className="absolute right-5" />}
            wrapperClassName="w-full sm:w-fit"
          />
        </div>
        <Table data={filteredFlowProcessData} columns={flowProcessColumns} action={action} />
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
