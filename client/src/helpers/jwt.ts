import type { DocumentResult, TJwtInfos } from "../types";

export const parseJwt = <T = string>(
  token: string
): T extends string ? T : T extends object ? DocumentResult<T> : never => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const getJwtExpiry = (accessToken: string) => {
  const jwtParsed = accessToken as TJwtInfos | any;
  const maxAge = (jwtParsed?.exp - jwtParsed?.iat) / 1000;
  const expiry = Math.floor(maxAge / (3600 * 24));

  return { maxAge, expiry };
};
