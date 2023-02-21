/* eslint-disable @typescript-eslint/member-delimiter-style */
import React from 'react';
import { AuthLayout } from '../auth';
import { Button, InputForm } from '.';
import { useForm } from 'react-hook-form';
import type { TRegister, TUser } from '../types';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { BASE_URL } from '../helpers/constant';

const initialValue = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  picturePath: ''
};

const createUser = async (data: TUser) => {
  return await axios.post(`${BASE_URL}/auth/register`).then(res => console.log(res));
};

const Register: React.FC = () => {
  useDocumentTitle('Register');
  const { register, handleSubmit, formState } = useForm<TUser>({ mode: 'all', defaultValues: initialValue });
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    }
  });

  const onSubmit = handleSubmit(data => {
    const { firstName, lastName, email, password, picturePath } = data;
    console.log(formState);
    console.log(data);
    mutate({
      firstName,
      lastName,
      email,
      password,
      picturePath
    });
  });

  return (
    <AuthLayout>
      <div className="w-full bg-cardDark p-4 md:p-6 lg:p-8 xl:p-12 rounded-md flex flex-col justify-center items-center gap-y-3 col-span-2 h-full">
        <form onSubmit={onSubmit} className="flex flex-col gap-y-4 w-full xl:max-w-lg">
          {inputs.map(({ validation, ...rest }: TRegister) => (
            <InputForm key={rest.name} {...register(rest.name, validation)} {...rest} />
          ))}
          <Button disabled={isLoading} type="submit" className="col-span-2 mt-12">
            Register
          </Button>
        </form>
        <p>
          Already have an account?{' '}
          <a href="#" className="text-blue-500">
            Login
          </a>
        </p>
      </div>
      <div className="col-span-3">
        <h1 className="text-3xl self-center">Register</h1>
      </div>
    </AuthLayout>
  );
};

const inputs: TRegister[] = [
  {
    label: 'First Name',
    type: 'text',
    name: 'firstName',
    placeholder: 'Input first name',
    validation: { required: 'First name is required.' }
  },
  {
    label: 'Last Name',
    type: 'text',
    name: 'lastName',
    placeholder: 'Input last name',
    validation: { required: 'Last name is required.' }
  },
  {
    label: 'Email Address',
    type: 'email',
    name: 'email',
    placeholder: 'Input email address',
    validation: {
      required: 'Email address is required.',
      pattern: {
        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        message: 'Enter a valid email address'
      }
    }
  },
  {
    label: 'Password',
    type: 'password',
    name: 'password',
    placeholder: 'Input Password',
    validation: { required: 'Password is required.' }
  }
];

export default Register;
