import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "../atoms";
import { InputForm, SelectForm } from "../molecules";
import { useNavigate } from "react-router-dom";
import type { TResponse, TUserData } from "../../types";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../schemas";
import { useMutation } from "react-query";
import { registerUser } from "../../api/auth";
import { toast } from "react-hot-toast";
import type { AxiosError } from "axios";
import { IoEye, IoEyeOff } from "react-icons/io5";

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const methods = useForm<TUserData>({ resolver: yupResolver(registerSchema) });
  const [passwordType, setPasswordType] = useState<"password" | "text">("password");

  const { mutate: mutateRegister, isLoading } = useMutation({
    mutationFn: registerUser,
    onSuccess: res => {
      methods.reset();
      toast.success(res.data.message);
      navigate("/");
    },
    onError: ({ response }: AxiosError<TResponse>) => {
      toast.error(response?.data.message as string);
    }
  });

  const togglePassword = () => {
    setPasswordType(prev => (prev === "password" ? "text" : "password"));
  };

  const onSubmit = methods.handleSubmit(data => {
    const { fullName, nik, password, role } = data;
    mutateRegister({
      fullName,
      nik,
      password,
      role
    });
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="grid w-full grid-cols-2 gap-y-4 gap-x-6 xl:max-w-lg">
        <InputForm
          type="text"
          inputName="fullName"
          label="Full Name"
          placeholder="e.g. John Doe"
          className="col-span-full"
        />
        <InputForm
          type="text"
          inputName="nik"
          label="Nomor Induk Karyawan"
          placeholder="e.g. 123456789"
          className="col-span-full"
        />
        <SelectForm
          inputName="role"
          label="Role"
          className="col-span-full"
          options={["Ketok", "Preparation", "Pengecatan", "Inspection"]}
        />
        <InputForm
          type={passwordType}
          inputName="password"
          label="Password"
          placeholder="Enter password..."
          className="col-span-full"
          icon={
            <Button
              type="button"
              icon={passwordType === "password" ? IoEye : IoEyeOff}
              onClick={togglePassword}
              className="absolute right-5 text-xs text-slate-600 dark:text-blue-200"
            />
          }
        />
        <InputForm
          type={passwordType}
          inputName="confirmPassword"
          label="Confirm Password"
          placeholder="Enter confirm password..."
          className="col-span-full"
        />
        <Button disabled={isLoading} type="submit" className="col-span-2 mt-12 bg-blue-500 py-3 !text-white">
          Register
        </Button>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
