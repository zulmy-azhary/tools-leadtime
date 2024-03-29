import React from "react";
import { useFormContext } from "react-hook-form";
import { DatePickerForm, InputForm, SelectForm } from "../molecules";
import type { TResponse, TUnitData } from "../../types";
import { Button } from "../atoms";
import clsx from "clsx";
import { IoAdd } from "react-icons/io5";
import { SERVICE_ADVISOR, DAMAGE_TYPE, ALL_PROCESS, VENDOR } from "../../helpers/constants";
import { useMutation, useQueryClient } from "react-query";
import { createUnit } from "../../api/unit";
import { toast } from "react-hot-toast";
import type { AxiosError, AxiosResponse } from "axios";

const date = new Date();
const currentMonth = (date.getMonth() + 1).toString().padStart(2, "0");
const currentYear = date.getFullYear().toString().slice(-2).padStart(2, "0");
const workOrder = `20204/SWO/${currentYear}/${currentMonth}/`;

interface Props {
  onToggle: () => void;
}

const UnitForm: React.FC<Props> = ({ onToggle }) => {
  const methods = useFormContext<Omit<TUnitData, "currentStatus" | "processList"> & { code: string }>();
  const queryClient = useQueryClient();

  const { mutate: mutateUnit, isLoading } = useMutation({
    mutationFn: createUnit,
    onSuccess: (res: AxiosResponse<TResponse>) => {
      queryClient.invalidateQueries(["unit", "getAll"]);
      toast.success(res.data.message);
      methods.reset();
      onToggle();
    },
    onError: ({ response }: AxiosError<TResponse>) => {
      toast.error(response?.data.message as string);
    }
  });

  const onSubmit = methods.handleSubmit(data => {
    const { code, workOrder, ...rest } = data;
    const workOrderData = code + workOrder;

    mutateUnit({
      ...rest,
      workOrder: workOrderData
    });
  });

  return (
    <form onSubmit={onSubmit} className={clsx("grid grid-cols-4 gap-4")}>
      <InputForm
        type="text"
        inputName="workOrder"
        label="Work Order"
        placeholder="e.g. 12345"
        className="col-span-full"
        additionalValue={workOrder}
        autoFocus
      />
      <InputForm
        type="text"
        inputName="plateNumber"
        label="Nomor Polisi"
        placeholder="e.g. DD-1234-XX"
        className="col-span-full"
      />
      <InputForm
        type="text"
        inputName="carType"
        label="Tipe Kendaraan"
        placeholder="e.g. Avanza"
        className="col-span-full"
      />
      <SelectForm
        placeholder="e.g. Ringan"
        className="col-span-full md:col-span-2"
        inputName="damageType"
        label="Jenis Kerusakan"
        options={DAMAGE_TYPE}
      />
      <SelectForm
        placeholder="e.g. Ketokan"
        className="col-span-full md:col-span-2"
        inputName="currentProcess"
        label="Proses"
        options={ALL_PROCESS}
      />
      <SelectForm
        placeholder="e.g. WIS"
        className="col-span-full md:col-span-2"
        inputName="vendor"
        label="Team Vendor"
        options={VENDOR}
      />
      <SelectForm
        inputName="serviceAdvisor"
        label="Service Advisor"
        options={SERVICE_ADVISOR}
        placeholder="e.g. Ahmad Supardi"
        className="col-span-full md:col-span-2"
      />
      <DatePickerForm inputName="entryDate" label="Tanggal Masuk" className="col-span-full" />
      <DatePickerForm inputName="handOver" label="Janji Penyerahan" className="col-span-full" />
      <Button
        type="submit"
        icon={IoAdd}
        className={clsx("bg-success text-typo-white col-span-full mt-5 p-3 text-sm font-semibold")}
        disabled={isLoading}
      >
        Submit
      </Button>
    </form>
  );
};

export default UnitForm;
