import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "../atoms";
import { InputForm } from "../molecules";
import { yupResolver } from "@hookform/resolvers/yup";
import type { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { login } from "../../api/auth";
import { loginSchema } from "../../schemas";
import type { TLogin, TResponse, TUserToken } from "../../types";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { getJwtExpiry, parseJwt } from "../../helpers/jwt";

const LoginForm: React.FC = () => {
  const methods = useForm<TLogin>({ resolver: yupResolver(loginSchema) });
  const [passwordType, setPasswordType] = useState<"password" | "text">("password");
  const navigate = useNavigate();

  const { mutate: mutateLogin, isLoading } = useMutation({
    mutationFn: login,
    onSuccess: (res: AxiosResponse<TUserToken>) => {
      toast.success(res.data.message);
      methods.reset();
      const { expiry } = getJwtExpiry(parseJwt(res.data.data.accessToken));

      Cookies.set("accessToken", res.data.data.accessToken, {
        sameSite: "none",
        secure: true,
        expires: expiry
      });
      navigate("/dashboard");
    },
    onError: ({ response }: AxiosError<TResponse>) => {
      toast.error(response?.data.message as string);
    }
  });

  const togglePassword = () => {
    setPasswordType(prev => (prev === "password" ? "text" : "password"));
  };

  const onSubmit = methods.handleSubmit(data => {
    const { nik, password } = data;
    mutateLogin({ nik, password });
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="grid w-full grid-cols-2 gap-y-4 gap-x-6 xl:max-w-lg">
        <InputForm
          type="text"
          label="Nomor Induk Karyawan"
          inputName="nik"
          placeholder="e.g. 123456789"
          className="col-span-full"
        />
        <InputForm
          type={passwordType}
          inputName={"password"}
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
        <Button disabled={isLoading} type="submit" className="bg-primary text-typo-white col-span-2 mt-12 py-3">
          Login
        </Button>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
