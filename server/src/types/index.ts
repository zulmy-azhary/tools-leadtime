export interface TUser {
  firstName: string;
  lastName: string;
  nik: string;
  password: string;
  picturePath: string;
  role: "admin" | "foreman" | "teknisi";
}

export interface TToken {
  accessToken: string;
  refreshToken: string;
}
