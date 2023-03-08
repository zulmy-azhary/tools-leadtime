import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, ButtonIcon, InputForm, InputSelectForm } from "../atoms";
import { useNavigate } from "react-router-dom";
import type { TResponse, TUser } from "../../types";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../schemas/authSchema";
import { useMutation } from "react-query";
import { registerUser } from "../../api/auth";
import { toast } from "react-hot-toast";
import type { AxiosError } from "axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const methods = useForm<TUser>({ resolver: yupResolver(registerSchema) });
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
    const { fullName, nik, password, picturePath, role } = data;
    mutateRegister({
      fullName,
      nik,
      password,
      picturePath,
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
        <InputSelectForm
          inputName="role"
          label="Role"
          className="col-span-full"
          defaultOption="Select role"
          options={["Ketok", "Preparation", "Pengecatan", "Inspection"]}
        />
        <InputForm
          type={passwordType}
          inputName="password"
          label="Password"
          placeholder="Enter password..."
          className="col-span-full"
          renderButton={
            <ButtonIcon onClick={togglePassword} className="text-lg text-indigo-500 dark:text-teal-400">
              {passwordType === "password" ? <AiFillEye /> : <AiFillEyeInvisible />}
            </ButtonIcon>
          }
        />
        <InputForm
          type={passwordType}
          inputName="confirmPassword"
          label="Confirm Password"
          placeholder="Enter confirm password..."
          className="col-span-full"
        />
        <Button disabled={isLoading} type="submit" className="col-span-2 mt-12">
          Register
        </Button>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
