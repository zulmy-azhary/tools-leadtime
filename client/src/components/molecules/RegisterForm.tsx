import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, ButtonIcon, InputForm } from "../atoms";
import { useNavigate } from "react-router-dom";
import type { TResponseError, TUser } from "../../types";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../schemas/authSchema";
import { useMutation } from "react-query";
import { registerUser } from "../../api/auth";
import { toast } from "react-hot-toast";
import type { AxiosError } from "axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const methods = useForm<Omit<TUser, "role">>({ resolver: yupResolver(registerSchema) });
  const [passwordType, setPasswordType] = useState<"password" | "text">("password");

  const { mutate: mutateRegister, isLoading } = useMutation({
    mutationFn: registerUser,
    onSuccess: data => {
      methods.reset();
      console.log(data.data.message);
      toast.success(data.data.message);
      navigate("/");
    },
    onError: ({ response }: AxiosError<TResponseError>) => {
      console.log(response?.data.message);
      toast.error(response?.data.message as string);
    }
  });

  const togglePassword = () => {
    setPasswordType(prev => (prev === "password" ? "text" : "password"));
  };

  const onSubmit = methods.handleSubmit(data => {
    const { firstName, lastName, nik, password, picturePath } = data;
    mutateRegister({
      firstName,
      lastName,
      nik,
      password,
      picturePath
    });
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="grid grid-cols-2 gap-y-4 gap-x-6 w-full xl:max-w-lg">
        <InputForm
          type="text"
          inputName="firstName"
          label="First Name"
          placeholder="e.g. John"
          className="col-span-full lg:col-span-1"
        />
        <InputForm
          type="text"
          inputName="lastName"
          label="Last Name"
          placeholder="e.g. Doe"
          className="col-span-full lg:col-span-1"
        />
        <InputForm
          type="text"
          inputName="nik"
          label="Nomor Induk Karyawan"
          placeholder="e.g. 123456789"
          className="col-span-full"
        />
        <InputForm
          type={passwordType}
          inputName="password"
          label="Password"
          placeholder="Enter password..."
          className="col-span-full"
          renderButton={
            <ButtonIcon onClick={togglePassword} className="text-lg">
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
