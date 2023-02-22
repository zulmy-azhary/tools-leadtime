import React from "react";
import { AuthLayout } from "../templates";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { FormProvider, useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import type { TUser } from "../../types";
import { Button, InputForm } from "../atoms";
import { useMutation, useQueryClient } from "react-query";
import { BASE_URL } from "../../helpers/constant";
import axios from "axios";

const loginSchema = object({
  nik: string()
    .required("NIK is required.")
    .matches(/^[0-9]+$/, "NIK must be only digits.")
    .length(9, "NIK must be exactly 9 characters."),
  password: string().required("Password is required.")
});

type TLogin = Pick<TUser, "nik" | "password">;

const login = async (data: TLogin) => {
  return await axios.post(`${BASE_URL}/auth/login`, data).then(res => console.log(res));
};

const Login: React.FC = () => {
  useDocumentTitle("Login");
  const methods = useForm<TLogin>({ resolver: yupResolver(loginSchema) });
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      methods.reset();
    }
  });

  const onSubmit = methods.handleSubmit(data => {
    const { nik, password } = data;
    console.log(data);
    mutate({ nik, password });
  });

  return (
    <AuthLayout
      url="login-banner"
      headerTitle="Login"
      description="Welcome back! Please fill out the form below before logging in."
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
      <p>
        Don't have an account?{" "}
        <Link to={"/register"} className="text-blue-500">
          Register
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
