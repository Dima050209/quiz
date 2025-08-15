import { RequestHandler, Request } from "express";
import jwt from "jsonwebtoken";
import env from "../config/validateEnv";
import { isJwtUserPayload, JwtUserPayload } from "../types/jwt";

export interface RequestWithUser<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Params = Record<string, any>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ResBody = any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ReqBody = any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ReqQuery = any
> extends Request<Params, ResBody, ReqBody, ReqQuery> {
  user?: JwtUserPayload;
}

const accessSecret = env.ACCESS_SECRET;

export const requireAuth: RequestHandler = (req, res, next) => {
  const accessToken = req.cookies.access_token;
  if (!accessToken) {
    return res.status(401).json({ message: "Access token not provided" });
  }
  try {
    const payload = jwt.verify(accessToken, accessSecret);
    if (!isJwtUserPayload(payload)) {
      return res.status(401).json({ message: "Invalid access token" });
    }
    (req as unknown as RequestWithUser).user = payload;
    next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    return res.status(401).json({ message: "Invalid access token" });
  }
};
