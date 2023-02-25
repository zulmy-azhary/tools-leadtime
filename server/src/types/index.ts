export interface TUser {
  firstName: string;
  lastName: string;
  nik: string;
  password: string;
  picturePath: string;
  role: "default" | "admin";
}

export interface TToken {
  accessToken: string;
  refreshToken: string;
}
