import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, ButtonIcon, InputForm } from "../atoms";
import { yupResolver } from "@hookform/resolvers/yup";
import type { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { login } from "../../api/auth";
import { loginSchema } from "../../schemas/authSchema";
import type { TLogin, TResponse, TUserToken } from "../../types";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
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
    onError: err => {
      toast.error((err as AxiosError<TResponse>).response?.data.message as string);
      console.log((err as AxiosError<TResponse>).response?.data.message);
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
          inputName="nik"
          label="Nomor Induk Karyawan"
          placeholder="e.g. 123456789"
          className="col-span-full"
          autoFocus
        />
        <InputForm
          type={passwordType}
          inputName={"password"}
          label="Password"
          placeholder="Enter password..."
          className="col-span-full"
          renderButton={
            <ButtonIcon onClick={togglePassword} className="text-lg text-indigo-500 dark:text-teal-400">
              {passwordType === "password" ? <AiFillEye /> : <AiFillEyeInvisible />}
            </ButtonIcon>
          }
        />
        <Button disabled={isLoading} type="submit" className="col-span-2 mt-12">
          Login
        </Button>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
