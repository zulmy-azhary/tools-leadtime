import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.header("Authorization");

    if (!token) return res.status(403).send({ status: false, statusCode: 500, message: "Access Denied." });
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimStart();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = verified;

    next();
  } catch (err) {
    return res.status(500).send({ status: false, statusCode: 500, message: (err as Error).message });
  }
};
