import React, { useState } from "react";
import { AuthLayout } from "../templates";
import { Button, ButtonIcon, InputForm } from "../atoms";
import { FormProvider, useForm } from "react-hook-form";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { useMutation } from "react-query";
import { type AxiosError } from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import type { TResponseError, TUser } from "../../types";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { registerUser } from "../../api/auth";
import { registerSchema } from "../../schemas/authSchema";
import { toast } from "react-hot-toast";

const Register: React.FC = () => {
  useDocumentTitle("Register");
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
