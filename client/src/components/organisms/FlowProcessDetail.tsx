import React, { useState, useEffect } from "react";
import { Button } from "../atoms";
import { differenceInMinutes, format } from "date-fns";
import type { TFlowProcessDataUnit, TMainProcess, TProcessItem, TResponse } from "../../types";
import { formatTime, handleProcess } from "../../helpers/functions";
import clsx from "clsx";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";
import type { AxiosError } from "axios";
import { getFlowProcessById, updateFlowProcess } from "../../api/flowProcess";
import { MAIN_PROCESS } from "../../helpers/constants";
import withModal from "../../HOC/withModal";

const getNextProcess = (allProcess: TMainProcess[], currentProcess: TMainProcess) => {
  const index = allProcess.indexOf(currentProcess);
  if (index >= 0 && index < allProcess.length - 1) return allProcess[index + 1];
};

interface Props {
  flowProcess: TFlowProcessDataUnit;
  onToggle?: () => void;
}

const FlowProcessDetail: React.FC<Props> = props => {
  const { flowProcess, onToggle } = props;
  const { workOrder, process, _id, status } = flowProcess;
  const queryClient = useQueryClient();
  const qualityCheckList = handleProcess(process);
  const [startDate, setStartDate] = useState<Date>(new Date(Date.now()));
  const [isActive, setActive] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [isApproved, setApproved] = useState<boolean>(false);
  const [qualityCheck, setQualityCheck] = useState({});

  useQuery({
    queryKey: ["flowProcess", "getIndividual"],
    queryFn: async () => await getFlowProcessById(_id),
    onSuccess: data => {
      const processItem = data.process.find(item => item.processName === process);
      setStartDate(new Date(processItem?.processStart as string));
      setDuration(processItem?.duration ?? 0);
      setActive(processItem?.status === "Dikerjakan");
    }
  });

  const { mutate: mutateFlowProcess } = useMutation({
    mutationFn: updateFlowProcess,
    onError: ({ response }: AxiosError<TResponse>) => {
      toast.error(response?.data.message as string);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["flowProcess", "getAll"]);
      queryClient.invalidateQueries(["flowProcess", "getIndividual"]);
    }
  });

  const handleClockOn = () => {
    // Change status to "Dikerjakan", and add processStart
    const data: TProcessItem & { workOrder: string } = {
      _id,
      workOrder,
      processName: process,
      processStart: new Date(),
      status: "Dikerjakan"
    };

    // Mutate process
    mutateFlowProcess(data, {
      onSuccess: (_, flowProcess) => {
        toast.success(`Clock on for ${flowProcess.workOrder} started.`);
      }
    });
  };

  const handleQualityCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setQualityCheck(prev => ({ ...prev, [target.name]: target.checked }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const endDate = new Date();
    const totalMinutes = differenceInMinutes(endDate, startDate);
    const nextProcess = getNextProcess(MAIN_PROCESS, process);

    // Change status to "Selesai", add processFinish, and calculate duration in minutes between processStart and processFinish
    const dataProcess: TProcessItem & { workOrder: string } = {
      _id,
      workOrder,
      processName: process,
      processFinish: new Date(),
      duration: totalMinutes,
      status: "Selesai"
    };

    // eslint-disable-next-line no-console
    console.log(nextProcess);

    // Mutate that data above
    mutateFlowProcess(dataProcess, {
      onSuccess: (_, flowProcess) => {
        toast.success(`Process ${flowProcess.workOrder} are finished.`);
        setQualityCheck({});
        (onToggle as () => void)();
      }
    });
  };

  useEffect(() => {
    const isApproved =
      Object.keys(qualityCheck).length === qualityCheckList.length && Object.values(qualityCheck).every(item => item);
    setApproved(!!isApproved);
  }, [qualityCheck]);

  const handleTimeStatus = () => {
    if (isActive) {
      return format(startDate, "dd/MM/yyyy hh:mm:ss a");
    }

    if (status === "Selesai") {
      return "This process already finished.";
    }

    return 'Click "Clock On" first';
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col justify-between gap-y-12">
      <div className="flex flex-col items-center gap-y-3">
        <Button
          type="button"
          onClick={handleClockOn}
          className="bg-blue-500 px-3 py-2 text-white disabled:opacity-75"
          disabled={isActive || status !== "Menunggu"}
        >
          Clock On
        </Button>
        <div className="text-center">
          <p>Work Order: {workOrder}</p>
          <p>Start Time: {handleTimeStatus()}</p>
          <p>Status: {status}</p>
          {!isActive && status === "Selesai" && <p>Duration: {formatTime(duration)}</p>}
        </div>
      </div>
      <div className="flex flex-col gap-y-3">
        <p className="text-center text-base">Quality Check:</p>
        <div className={clsx("flex flex-col gap-y-2 md:px-12 lg:px-24", !isActive && "select-none opacity-50")}>
          {qualityCheckList.map((item, idx) => (
            <div key={item} className="grid grid-cols-12">
              <input
                name={`qualityCheck-${idx + 1}`}
                type="checkbox"
                className="col-span-1 w-4 cursor-pointer disabled:cursor-default md:col-span-2 md:w-full"
                onChange={handleQualityCheck}
                disabled={!isActive}
              />
              <p className="col-span-11 md:col-span-10">{item}</p>
            </div>
          ))}
        </div>
      </div>
      <Button type="submit" className="bg-teal-500 p-3 text-sm text-white dark:text-slate-900" disabled={!isApproved}>
        Submit
      </Button>
    </form>
  );
};

export default withModal(FlowProcessDetail);
