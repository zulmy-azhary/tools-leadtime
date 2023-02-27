export type TUserProps = "firstName" | "lastName" | "nik" | "password" | "confirmPassword" | "picturePath" | "role";

// User registration
export interface TUser {
  firstName: string;
  lastName: string;
  nik: string;
  password: string;
  confirmPassword: string;
  picturePath: string;
  role: "admin" | "foreman" | "teknisi";
}

// User authenticated
export type TUserProfile = Omit<TUser, "password" | "confirmPassword"> & {
  _id: string;
  created_at: string;
  updated_at: string;
};

export type Token = "accessToken" | "refreshToken";
export type TToken = Record<Token, string>;

export type TUserToken = TResponse & {
  data: Record<Token, string>;
};

export interface TResponseSuccess<T> {
  status: boolean;
  statusCode: number;
  data: T;
}

export interface TResponse {
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

export type TLogin = Pick<TUser, "nik" | "password">;
