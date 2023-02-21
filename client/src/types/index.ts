type TUserProps = 'firstName' | 'lastName' | 'email' | 'password' | 'picturePath';

export type TUser = Record<TUserProps, string>;

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
