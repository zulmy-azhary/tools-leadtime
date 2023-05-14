import React, { useState, useEffect } from "react";
import { Button } from "../atoms";
import { differenceInMinutes, format } from "date-fns";
import type { TFlowProcessDataUnit, TProcessItem, TResponse } from "../../types";
import { formatTime, getNextProcess, handleProcess } from "../../helpers/functions";
import clsx from "clsx";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";
import type { AxiosError, AxiosResponse } from "axios";
import { submitFlowProcess, updateFlowProcess } from "../../api/flowProcess";
import { MAIN_PROCESS } from "../../helpers/constants";
import withModal from "../../HOC/withModal";

interface Props {
  flowProcess: TFlowProcessDataUnit;
  onToggle?: () => void;
}

const FlowProcessDetail: React.FC<Props> = props => {
  const { flowProcess, onToggle } = props;
  const { _id, workOrder, currentProcess, currentStatus } = flowProcess;
  const queryClient = useQueryClient();
  const qualityCheckList = handleProcess(currentProcess);
  const [startDate, setStartDate] = useState<Date>(new Date(Date.now()));
  const [isActive, setActive] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [isApproved, setApproved] = useState<boolean>(false);
  const [qualityCheck, setQualityCheck] = useState({});

  const invalidateQueries = () => {
    queryClient.invalidateQueries(["flowProcess", "getAll"]);
    queryClient.invalidateQueries(["flowProcess", "getIndividual"]);
  };

  useEffect(() => {
    const selectedProcess = flowProcess.processList.find(
      ({ processName }) => processName === currentProcess
    ) as TProcessItem;

    setStartDate(new Date(selectedProcess.processStart as string));
    setDuration(selectedProcess.duration ?? 0);
    setActive(selectedProcess.status === "Dikerjakan");
  }, [flowProcess]);

  useEffect(() => {
    const isApproved =
      Object.keys(qualityCheck).length === qualityCheckList.length && Object.values(qualityCheck).every(item => item);
    setApproved(!!isApproved);
  }, [qualityCheck]);

  const { mutate: mutateClockOnFlowProcess } = useMutation({
    mutationFn: updateFlowProcess,
    onSuccess: (_, flowProcess) => {
      invalidateQueries();
      toast.success(`Clock on for ${flowProcess.workOrder} started.`);
    },
    onError: ({ response }: AxiosError<TResponse>) => {
      toast.error(response?.data.message as string);
    }
  });

  const { mutate: mutateSubmitFlowProcess, isLoading } = useMutation({
    mutationFn: submitFlowProcess,
    onSuccess: (res: AxiosResponse<TResponse>) => {
      invalidateQueries();
      (onToggle as () => void)();

      if (currentProcess !== "Polishing") {
        toast.success(res.data.message);
      }
      if (currentProcess === "Polishing") {
        alert(
          "All flow processes have been completed. Please see the entire process of WorkOrder in the summary table."
        );
      }
    },
    onError: ({ response }: AxiosError<TResponse>) => {
      toast.error(response?.data.message as string);
    }
  });

  const handleClockOn = () => {
    // Change status to "Dikerjakan", and add processStart
    const data: TProcessItem & { workOrder: string } = {
      _id,
      workOrder,
      processName: currentProcess,
      processStart: new Date(),
      status: "Dikerjakan"
    };

    // Mutate process
    mutateClockOnFlowProcess(data);
  };

  const handleQualityCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setQualityCheck(prev => ({ ...prev, [target.name]: target.checked }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const endDate = new Date();
    const totalMinutes = differenceInMinutes(endDate, startDate);
    const nextCurrentProcess = getNextProcess(MAIN_PROCESS, currentProcess);

    // Change status to "Selesai", add processFinish, and calculate duration in minutes between processStart and processFinish
    const dataProcess: TProcessItem & { workOrder: string } = {
      workOrder,
      processName: currentProcess,
      processFinish: new Date(),
      duration: totalMinutes,
      status: "Selesai"
    };

    const nextProcess: TProcessItem = {
      processName: nextCurrentProcess,
      status: "Menunggu"
    };

    mutateSubmitFlowProcess({
      _id,
      dataProcess,
      nextProcess: currentProcess !== "Polishing" ? nextProcess : undefined
    });
  };

  const handleTimeStatus = () => {
    if (isActive) return format(startDate, "dd/MM/yyyy hh:mm:ss a");
    if (currentStatus === "Selesai") return "This process already finished.";
    return 'Click "Clock On" first';
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col justify-between gap-y-12">
      <div className="flex flex-col items-center gap-y-3">
        <Button
          type="button"
          onClick={handleClockOn}
          className="bg-primary text-typo-white px-3 py-2"
          disabled={isActive || currentStatus !== "Menunggu"}
        >
          Clock On
        </Button>
        <div className="text-center">
          <p>Work Order: {workOrder}</p>
          <p>Start Time: {handleTimeStatus()}</p>
          <p>Status: {currentStatus}</p>
          {!isActive && currentStatus === "Selesai" && <p>Duration: {formatTime(duration)}</p>}
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
      <Button type="submit" className="bg-success text-typo-white p-3 text-sm" disabled={!isApproved || isLoading}>
        Submit
      </Button>
    </form>
  );
};

export default withModal(FlowProcessDetail);
