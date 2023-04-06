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

const UnitForm: React.FC = () => {
  const methods = useForm<TUnit>({ resolver: yupResolver(unitSchemas) });
  const onSubmit = methods.handleSubmit(data => {
    // eslint-disable-next-line no-console
    console.log(data);
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className={clsx("grid grid-cols-3 gap-4")}>
        <InputForm
          type="text"
          inputName="workOrder"
          label="Work Order"
          placeholder="WO-00000"
          className="col-span-full"
        />
        <InputForm
          type="text"
          inputName="plateNumber"
          label="Nomor Polisi"
          placeholder="XX 0000 XX"
          className="col-span-full"
        />
        <InputForm
          type="text"
          inputName="carType"
          label="Tipe Kendaraan / Warna"
          placeholder="type / colors"
          className="col-span-full"
        />
        <InputForm type="date" inputName="entryDate" label="Tanggal Masuk" className="col-span-full" />
        <SelectForm inputName="damageType" label="Jenis Kerusakan" options={DAMAGE} />
        <SelectForm inputName="vendor" label="Team Vendor" options={VENDOR} />
        <SelectForm inputName="process" label="Proses" options={PROCESS} />
        <SelectForm inputName="serviceAdvisor" label="Service Advisor" options={ADVISOR} className="col-span-full" />
        <InputForm type="date" inputName="handover" label="Janji Penyerahan" className="col-span-full" />
        <Button type="submit" icon={IoAdd} className={clsx("col-span-full bg-teal-500 p-3 text-sm text-white")}>
          submit
        </Button>
      </form>
    </FormProvider>
  );
};

export default UnitForm;
