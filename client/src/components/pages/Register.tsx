import React, { useState } from "react";
import { AuthLayout } from "../templates";
import { Button, ButtonIcon, InputForm } from "../atoms";
import { FormProvider, useForm } from "react-hook-form";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { useMutation, useQueryClient } from "react-query";
import axios, { type AxiosError } from "axios";
import { BASE_URL } from "../../helpers/constant";
import { object, string, ref } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import type { TResponseError, TUser } from "../../types";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

const registerSchema = object({
  firstName: string()
    .required("Firstname is required.")
    .min(4, "Firstname must contain at least 4 characters.")
    .max(16, "Maximum length of firstname is 16 characters."),
  lastName: string()
    .required("Lastname is required.")
    .min(4, "Lastname must contain at least 4 characters.")
    .max(16, "Maximum length of lastname is 16 characters."),
  nik: string()
    .required("NIK is required.")
    .matches(/^[0-9]+$/, "NIK must be only digits.")
    .length(9, "NIK must be exactly 9 characters."),
  picturePath: string(),
  password: string()
    .required("Password is required.")
    .min(6, "Password must contain at least 6 characters.")
    .max(24, "Maximum length of password is 24 characters."),
  confirmPassword: string()
    .required("Confirm Password is required.")
    .oneOf([ref("password")], "Password does not match.")
});

const createUser = async (data: Omit<TUser, "confirmPassword" | "role">) => {
  return await axios.post(`${BASE_URL}/auth/register`, data);
};

const Register: React.FC = () => {
  useDocumentTitle("Register");
  const navigate = useNavigate();
  const methods = useForm<Omit<TUser, "role">>({ resolver: yupResolver(registerSchema) });
  const queryClient = useQueryClient();
  const [passwordType, setPasswordType] = useState<"password" | "text">("password");

  const { mutate, isLoading } = useMutation({
    mutationFn: createUser,
    onSuccess: data => {
      queryClient.invalidateQueries(["users"]);
      console.log(data.data.message);
      methods.reset();
      navigate("/");
    },
    onError: ({ response }: AxiosError<TResponseError>) => {
      console.log(response?.data.message);
    }
  });

  const togglePassword = () => {
    setPasswordType(prev => (prev === "password" ? "text" : "password"));
  };

  const onSubmit = methods.handleSubmit(data => {
    const { firstName, lastName, nik, password, picturePath } = data;
    mutate({
      firstName,
      lastName,
      nik,
      password,
      picturePath
    });
  });

  return (
    <AuthLayout
      url="register-banner"
      headerTitle="Register"
      description="Register your account by filling out the form below, make sure the data you enter is correct."
    >
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
              <ButtonIcon onClick={togglePassword}>
                {passwordType === "password" ? <AiFillEyeInvisible /> : <AiFillEye />}
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
      <p className="text-sm">
        Already have an account?{" "}
        <Link to={"/"} className="text-blue-500">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Register;
