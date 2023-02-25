import jwt from "jsonwebtoken";
import CONFIG from "../config/environment";
import { findUser } from "../services/auth.service";

export const signJWT = (payload: Record<string, unknown>, options?: jwt.SignOptions | undefined) => {
  return jwt.sign(payload, CONFIG.jwt_private as jwt.Secret, { ...(options && options), algorithm: "RS256" });
};

export const verifyJWT = (token: string) => {
  try {
    const decoded = jwt.verify(token, CONFIG.jwt_public as jwt.Secret);
    return {
      valid: true,
      expired: false,
      decoded
    };
  } catch (err) {
    return {
      valid: false,
      expired: (err as Error).message === "jwt is expired or not eligible to use",
      decoded: null
    };
  }
};

export const reIssueAccessToken = async (refreshToken: string) => {
  const { decoded }: any = verifyJWT(refreshToken);
  const user = await findUser(decoded?._doc.nik);
  if (!user) return false;

  const accessToken = signJWT({ ...user }, { expiresIn: "1d" });

  return accessToken;
};
