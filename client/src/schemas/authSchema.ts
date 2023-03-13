import { object, ref, string } from "yup";

const authSchemas = {
  nik: string()
    .required("NIK is required.")
    .matches(/^[0-9]+$/, "NIK must be only digits.")
    .length(9, "NIK must be exactly 9 characters.")
};

export const registerSchema = object({
  fullName: string()
    .required("Fullname is required.")
    .min(4, "Fullname must contain at least 4 characters.")
    .max(32, "Maximum length of fullname is 32 characters."),
  nik: authSchemas.nik,
  picturePath: string(),
  password: string()
    .required("Password is required.")
    .min(6, "Password must contain at least 6 characters.")
    .max(24, "Maximum length of password is 24 characters."),
  confirmPassword: string()
    .required("Confirm Password is required.")
    .oneOf([ref("password")], "Password does not match."),
  role: string()
    .required("Role is required.")
    .oneOf(["Ketok", "Preparation", "Pengecatan", "Inspection"], "Select options first.")
});

export const loginSchema = object({
  nik: authSchemas.nik,
  password: string().required("Password is required.")
});
