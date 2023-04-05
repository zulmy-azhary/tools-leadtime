export type TUserProps = "fullName" | "nik" | "password" | "confirmPassword" | "role";

export type TUnitProps =
  | "workOrder"
  | "policeNumber"
  | "vechileType"
  | "dateIn"
  | "damageType"
  | "teamVendor"
  | "processType"
  | "serviceAdvisor"
  | "deliveryPromise";

// User registration
export type TUser = Omit<Record<TUserProps, string>, "role"> & {
  role: "Admin" | "Ketok" | "Preparation" | "Pengecatan" | "Inspection";
};

// User authenticated
export type TUserProfile = Omit<TUser, "password" | "confirmPassword"> & {
  _id: string;
  created_at: string;
  updated_at: string;
};

// Unit Datas
export type TUnit = Omit<Record<TUnitProps, string>, "damageType" | "teamVendor" | "processType" | "serviceAdvisor"> & {
  damageType: "Ringan" | "Sedang" | "Berat";
  teamVendor: "WIS" | "SPA";
  processType:
    | "Tunggu Teknisi"
    | "Tunggu Part"
    | "Ketokan"
    | "Removal"
    | "Putty"
    | "Epoxy"
    | "Masking"
    | "Spraying"
    | "Assembling"
    | "Polishing";
  serviceAdvisor:
    | "Ahmad Supardi"
    | "Fadli"
    | "Hariyadi"
    | "Imam"
    | "Muhammad Fachri"
    | "Musrin Noor"
    | "Reza"
    | "Samsuryanan Amir";
};

export interface Token {
  accessToken: string;
}
export interface TJwtInfos {
  iat: number;
  exp: number;
}

export type TUserToken = TResponse & {
  data: Token;
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

export type Theme = "light" | "dark";
