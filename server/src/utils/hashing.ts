import bcrypt from "bcrypt";

export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
};

export const checkPassword = (password: string, passwordEncrypted: string) => {
  return bcrypt.compareSync(password, passwordEncrypted);
};
