import React from "react";
import { useFormContext } from "react-hook-form";
import { InputForm, SelectForm } from "../molecules";
import type { TResponse, TUnit } from "../../types";
import { Button } from "../atoms";
import clsx from "clsx";
import { IoAdd } from "react-icons/io5";
import { SERVICE_ADVISOR, DAMAGE_TYPE, ALL_PROCESS, VENDOR } from "../../helpers/constants";
import { useMutation, useQueryClient } from "react-query";
import { createUnit } from "../../api/unit";
import { toast } from "react-hot-toast";
import type { AxiosError } from "axios";

const date = new Date();
const currentMonth = (date.getMonth() + 1).toString().padStart(2, "0");
const currentYear = date.getFullYear().toString().slice(-2).padStart(2, "0");
const workOrder = `20204/SWO/${currentYear}/${currentMonth}/`;

interface Props {
  onToggle: () => void;
}

const UnitForm: React.FC<Props> = ({ onToggle }) => {
  const methods = useFormContext<TUnit & { code: string }>();
  const queryClient = useQueryClient();

  const { mutate: mutateUnit } = useMutation({
    mutationFn: createUnit,
    onSuccess: res => {
      queryClient.invalidateQueries(["unit", "getAll"]);
      methods.reset();
      toast.success(res.data.message);
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
      workOrder: workOrderData,
      ...rest
    });
  });

  return (
    <>
      <form onSubmit={onSubmit} className={clsx("grid grid-cols-3 gap-4")}>
        <InputForm
          type="text"
          inputName="workOrder"
          label="Work Order"
          placeholder="e.g. 12345"
          className="col-span-full"
          additionalValue={workOrder}
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
        <InputForm type="date" inputName="entryDate" label="Tanggal Masuk" className="col-span-full" />
        <SelectForm inputName="damageType" label="Jenis Kerusakan" options={DAMAGE_TYPE} />
        <SelectForm inputName="vendor" label="Team Vendor" options={VENDOR} />
        <SelectForm inputName="process" label="Proses" options={ALL_PROCESS} />
        <SelectForm
          inputName="serviceAdvisor"
          label="Service Advisor"
          options={SERVICE_ADVISOR}
          className="col-span-full"
        />
        <InputForm type="date" inputName="handOver" label="Janji Penyerahan" className="col-span-full" />
        <Button
          type="submit"
          icon={IoAdd}
          className={clsx("col-span-full bg-teal-500 p-3 text-sm text-white dark:text-slate-900")}
        >
          submit
        </Button>
      </form>
    </>
  );
};

export default UnitForm;
