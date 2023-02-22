export type TUserProps = "firstName" | "lastName" | "nik" | "password" | "confirmPassword" | "picturePath" | "role";

// export type TUser = Record<TUserProps, string>;

export interface TUser {
  firstName: string;
  lastName: string;
  nik: string;
  password: string;
  confirmPassword: string;
  picturePath: string;
  role: "default" | "admin";
}

export interface TResponseSuccess<T> {
  status: boolean;
  statusCode: number;
  data: T;
}

export interface TResponseError {
  status: boolean;
  statusCode: number;
  message: string;
}

export interface TRegister {
  label: string;
  type: string;
  name: TUserProps;
  placeholder: string;
  validation: {
    required: string;
    minLength?:
      | {
          value: number;
          message: string;
        }
      | number;
    pattern?: {
      value: RegExp;
      message: string;
    };
  };
}
