export interface TUser {
  firstName: string;
  lastName: string;
  nik: string;
  password: string;
  picturePath: string;
  role: "Admin" | "Foreman" | "Teknisi";
  isOnline: boolean;
}

export interface TToken {
  accessToken: string;
  refreshToken: string;
}
