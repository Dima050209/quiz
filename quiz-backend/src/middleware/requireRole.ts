import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import env from "../config/validateEnv";
import { UserRole } from "../../generated/prisma";
import { isJwtUserPayload } from "../types/jwt";
import { RequestWithUser } from "./requireAuth";

const secret = env.ACCESS_SECRET;

export const requireRole = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).json({ message: "Access token not provided" });
    }
    try {
      const payload = jwt.verify(token, secret);
      if (isJwtUserPayload(payload) && roles.includes(payload.role)) {
        (req as unknown as RequestWithUser).user = payload;
        return next();
      }
      return res.status(403).json({ message: "Not authorized" });
    } catch (error) {
      console.log(error);
      return res.status(403).json({ message: "Token not valid" });
    }
  };
};
