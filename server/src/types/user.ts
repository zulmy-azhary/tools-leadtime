import type { TUserRole } from ".";

export interface TUser {
  fullName: string;
  nik: string;
  password: string;
  role: TUserRole;
}
