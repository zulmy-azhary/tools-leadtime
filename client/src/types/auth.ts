import type { TUserRole } from ".";

export type TUserProps = "fullName" | "nik" | "password" | "confirmPassword" | "role";

// User registration
export type TUserData = Omit<Record<TUserProps, string>, "role"> & {
  role: TUserRole;
};

// User authenticated
export type TUserProfile = Omit<TUserData, "password" | "confirmPassword"> & {
  _id: string;
  created_at: string;
  updated_at: string;
};

export interface TJwtInfos {
  iat: number;
  exp: number;
}

export interface TToken {
  accessToken: string;
}

export interface TResponse {
  status: boolean;
  statusCode: number;
  message: string;
}

export type TUserToken = TResponse & {
  data: TToken;
};

export type TLogin = Pick<TUserData, "nik" | "password">;

export interface TManageRole<T> {
  admin: T;
  ketok?: T;
  preparation?: T;
  pengecatan?: T;
  inspection?: T;
}
