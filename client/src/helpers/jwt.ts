import type { TJwtInfos } from "../types";

export const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export const getJwtExpiry = (accessToken: string) => {
  const jwtParsed = accessToken as TJwtInfos | any;
  const maxAge = (jwtParsed?.exp - jwtParsed?.iat) / 1000;
  const expiry = Math.floor(maxAge / (3600 * 24));

  return { maxAge, expiry };
};
