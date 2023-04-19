import type { TUserRole } from ".";

export interface TUserData {
  fullName: string;
  nik: string;
  password: string;
  role: TUserRole;
}
