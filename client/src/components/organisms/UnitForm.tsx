import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { InputForm, SelectForm } from "../molecules";
import type { TUnit } from "../../types";
import { yupResolver } from "@hookform/resolvers/yup";
import { unitSchemas } from "../../schemas";
import { Button } from "../atoms";
import clsx from "clsx";
import { IoAdd } from "react-icons/io5";
import { ADVISOR, DAMAGE, PROCESS, VENDOR } from "../../helpers/constants";

const date = new Date();
const currentMonth = (date.getMonth() + 1).toString().padStart(2, "0");
const currentYear = date.getFullYear().toString().slice(-2).padStart(2, "0");
const workOrder = `20204/SWO/${currentYear}/${currentMonth}/`;

const UnitForm: React.FC = () => {
  const methods = useForm<TUnit & { code: string }>({ resolver: yupResolver(unitSchemas) });

  const onSubmit = methods.handleSubmit(data => {
    const { code, workOrder, ...rest } = data;
    const workOrderData = code + workOrder;
    // eslint-disable-next-line no-console
    console.log({
      ...rest,
      workOrder: workOrderData
    });
  });

  return (
    <FormProvider {...methods}>
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
        <SelectForm inputName="damageType" label="Jenis Kerusakan" options={DAMAGE} />
        <SelectForm inputName="vendor" label="Team Vendor" options={VENDOR} />
        <SelectForm inputName="process" label="Proses" options={PROCESS} />
        <SelectForm inputName="serviceAdvisor" label="Service Advisor" options={ADVISOR} className="col-span-full" />
        <InputForm type="date" inputName="handOver" label="Janji Penyerahan" className="col-span-full" />
        <Button
          type="submit"
          icon={IoAdd}
          className={clsx("col-span-full bg-teal-500 p-3 text-sm text-white dark:text-slate-900")}
        >
          submit
        </Button>
      </form>
    </FormProvider>
  );
};

export default UnitForm;
