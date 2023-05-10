import React from "react";
import withModal from "../../HOC/withModal";
import type { TResponse, TUnitData } from "../../types";
import clsx from "clsx";
import { IoAdd } from "react-icons/io5";
import { Button } from "../atoms";
import { InputForm, SelectForm } from "../molecules";
import { DAMAGE_TYPE, ALL_PROCESS, VENDOR, SERVICE_ADVISOR } from "../../helpers/constants";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateUnitSchema } from "../../schemas";
import { format } from "date-fns";
import { useMutation } from "react-query";
import { updateUnitById } from "../../api/unit";
import type { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-hot-toast";

interface Props {
  dataUnit: TUnitData;
  onToggle?: () => void;
}

const UpdateUnit: React.FC<Props> = props => {
  const { dataUnit, onToggle } = props;
  const methods = useForm<TUnitData>({ resolver: yupResolver(updateUnitSchema) });
  const waitingProcess = dataUnit.currentProcess === "Tunggu Part" || dataUnit.currentProcess === "Tunggu Teknisi";

  const { mutate: mutateUpdateUnit } = useMutation({
    mutationFn: updateUnitById,
    onSuccess: (res: AxiosResponse<TResponse>) => {
      toast.success(res.data.message);
      // eslint-disable-next-line no-console
      console.log(res.data);
      (onToggle as () => void)();
    },
    onError: ({ response }: AxiosError<TResponse>) => {
      toast.error(response?.data.message as string);
    }
  });

  const onSubmit = methods.handleSubmit(data => {
    const { workOrder, ...rest } = data;
    const payload: Partial<TUnitData> = {
      ...rest,
      _id: dataUnit._id
    };

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
          className="col-span-full md:col-span-2"
          inputName="damageType"
          label="Jenis Kerusakan"
          options={DAMAGE_TYPE}
          defaultValue={dataUnit.damageType}
        />
        <SelectForm
          className="col-span-full md:col-span-2"
          inputName="currentProcess"
          label="Proses"
          options={ALL_PROCESS}
          defaultValue={dataUnit.currentProcess}
          disabled={!waitingProcess}
        />
        <SelectForm
          className="col-span-full md:col-span-2"
          inputName="vendor"
          label="Team Vendor"
          options={VENDOR}
          defaultValue={dataUnit.vendor}
        />
        <SelectForm
          inputName="serviceAdvisor"
          label="Service Advisor"
          options={SERVICE_ADVISOR}
          className="col-span-full md:col-span-2"
          defaultValue={dataUnit.serviceAdvisor}
        />
        <InputForm
          type="date"
          inputName="entryDate"
          label="Tanggal Masuk"
          className="col-span-full"
          defaultValue={format(new Date(dataUnit.entryDate), "yyyy-MM-dd")}
        />
        <InputForm
          type="date"
          inputName="handOver"
          label="Janji Penyerahan"
          className="col-span-full"
          defaultValue={format(new Date(dataUnit.handOver), "yyyy-MM-dd")}
        />
        <Button
          type="submit"
          icon={IoAdd}
          className={clsx("col-span-full bg-teal-500 p-3 text-sm text-white dark:text-slate-900")}
        >
          Submit
        </Button>
      </form>
    </FormProvider>
  );
};

export default withModal(UpdateUnit);
