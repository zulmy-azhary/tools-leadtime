import React from "react";
import { AuthLayout } from "../templates";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { TLogin, TResponseError } from "../../types";
import { Button, InputForm } from "../atoms";
import { useMutation, useQueryClient } from "react-query";
import { type AxiosError } from "axios";
import { login } from "../../api/auth";
import { loginSchema } from "../../schemas/authSchema";
import { toast } from "react-hot-toast";

const Login: React.FC = () => {
  useDocumentTitle("Login");
  const methods = useForm<TLogin>({ resolver: yupResolver(loginSchema) });
  const queryClient = useQueryClient();
  const { mutate: mutateLogin, isLoading } = useMutation({
    mutationFn: login,
    onSuccess: data => {
      queryClient.invalidateQueries(["users"]);
      console.log(data.data);
      methods.reset();
    },
    onError: ({ response }: AxiosError<TResponseError>) => {
      toast.error(response?.data.message as string);
      console.log(response?.data.message);
    }
  });

  const onSubmit = methods.handleSubmit(data => {
    const { nik, password } = data;
    mutateLogin({ nik, password });
  });

  return (
    <AuthLayout
      url="login-banner"
      headerTitle="Login"
      description="Welcome back! Please fill out the form below before logging in to the website."
    >
      <FormProvider {...methods}>
        <form onSubmit={onSubmit} className="grid grid-cols-2 gap-y-4 gap-x-6 w-full xl:max-w-lg">
          <InputForm
            type="text"
            inputName="nik"
            label="Nomor Induk Karyawan"
            placeholder="e.g. 123456789"
            className="col-span-full"
          />
          <InputForm
            type="password"
            inputName="password"
            label="Password"
            placeholder="Enter password..."
            className="col-span-full"
          />
          <Button disabled={isLoading} type="submit" className="col-span-2 mt-12">
            Login
          </Button>
        </form>
      </FormProvider>
      <p className="text-sm">
        Don't have an account?{" "}
        <Link to={"/register"} className="text-blue-500">
          Register
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
