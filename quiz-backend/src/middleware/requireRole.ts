import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import env from "../config/validateEnv";
import { UserRole } from "../../generated/prisma";
import { isJwtUserPayload } from "../types/jwt";

const secret = env.ACCESS_SECRET;

export const requireRole = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const header = req.header("Authorization") || "";
    const token = header.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }
    try {
      const payload = jwt.verify(token, secret);
      if (isJwtUserPayload(payload) && roles.includes(payload.role)) {
        req.body.user = payload;
        return next();
      }
      return res.status(403).json({ message: "Not authorized" });
    } catch (error) {
      console.log(error);
      return res.status(403).json({ message: "Token not valid" });
    }
  };
};
