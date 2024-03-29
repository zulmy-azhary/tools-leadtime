import React from "react";
import withModal from "../../HOC/withModal";
import type { TResponse, TUnitData } from "../../types";
import clsx from "clsx";
import { IoAdd } from "react-icons/io5";
import { Button } from "../atoms";
import { DatePickerForm, InputForm, SelectForm } from "../molecules";
import { DAMAGE_TYPE, ALL_PROCESS, VENDOR, SERVICE_ADVISOR } from "../../helpers/constants";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateUnitSchema } from "../../schemas";
import { useMutation, useQueryClient } from "react-query";
import { updateUnitById } from "../../api/unit";
import type { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-hot-toast";
import { handleWaitingProcess } from "../../helpers/functions";

interface Props {
  dataUnit: TUnitData;
  onToggle?: () => void;
}

const UpdateUnit: React.FC<Props> = props => {
  const { dataUnit, onToggle } = props;
  const methods = useForm<Omit<TUnitData, "currentStatus">>({ resolver: yupResolver(updateUnitSchema) });
  const queryClient = useQueryClient();
  const isWaitingProcess = handleWaitingProcess(dataUnit.currentProcess);

  const { mutate: mutateUpdateUnit, isLoading } = useMutation({
    mutationFn: updateUnitById,
    onSuccess: (res: AxiosResponse<TResponse>) => {
      queryClient.invalidateQueries(["unit", "getAll"]);
      toast.success(res.data.message);
      (onToggle as () => void)();
    },
    onError: ({ response }: AxiosError<TResponse>) => {
      toast.error(response?.data.message as string);
    }
  });

  const onSubmit = methods.handleSubmit(data => {
    const { workOrder, currentProcess, ...rest } = data;
    type Payload = typeof data;

    // If current process is not waiting process ("Tunggu Part" or "Tunggu Teknisi"), don't update the process
    const payload: Partial<Payload> = isWaitingProcess
      ? { ...rest, currentProcess, _id: dataUnit._id }
      : { ...rest, _id: dataUnit._id };

    mutateUpdateUnit(payload);
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className={clsx("grid grid-cols-4 gap-4")}>
        <InputForm
          type="text"
          inputName="workOrder"
          label="Work Order"
          className="col-span-full"
          defaultValue={dataUnit.workOrder}
          readOnly
        />
        <InputForm
          type="text"
          inputName="plateNumber"
          label="Nomor Polisi"
          placeholder="e.g. DD-1234-XX"
          className="col-span-full"
          defaultValue={dataUnit.plateNumber}
        />
        <InputForm
          type="text"
          inputName="carType"
          label="Tipe Kendaraan"
          placeholder="e.g. Avanza"
          className="col-span-full"
          defaultValue={dataUnit.carType}
        />
        <SelectForm
          placeholder="e.g. Ringan"
          className="col-span-full md:col-span-2"
          inputName="damageType"
          label="Jenis Kerusakan"
          options={DAMAGE_TYPE}
          defaultValue={dataUnit.damageType}
        />
        <SelectForm
          placeholder="e.g. Ketokan"
          className="col-span-full md:col-span-2"
          inputName="currentProcess"
          label="Proses"
          options={ALL_PROCESS}
          defaultValue={dataUnit.currentProcess}
          disabled={!isWaitingProcess}
        />
        <SelectForm
          placeholder="e.g. WIS"
          className="col-span-full md:col-span-2"
          inputName="vendor"
          label="Team Vendor"
          options={VENDOR}
          defaultValue={dataUnit.vendor}
        />
        <SelectForm
          placeholder="e.g. Ahmad Supardi"
          inputName="serviceAdvisor"
          label="Service Advisor"
          options={SERVICE_ADVISOR}
          className="col-span-full md:col-span-2"
          defaultValue={dataUnit.serviceAdvisor}
        />
        <DatePickerForm
          inputName="entryDate"
          label="Tanggal Masuk"
          className="col-span-full"
          defaultValue={dataUnit.entryDate}
        />
        <DatePickerForm
          inputName="handOver"
          label="Janji Penyerahan"
          className="col-span-full"
          defaultValue={dataUnit.handOver}
        />
        <Button
          type="submit"
          icon={IoAdd}
          className={clsx("bg-success text-typo-white col-span-full p-3 text-sm")}
          disabled={isLoading}
        >
          Submit
        </Button>
      </form>
    </FormProvider>
  );
};

export default withModal(UpdateUnit);
