import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import env from "../config/validateEnv";
import { isJwtUserPayload } from "../types/jwt";

const accessSecret = env.ACCESS_SECRET;

export const requireAuth: RequestHandler = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const accessToken = authHeader?.split(" ")[1];

  if (!accessToken) {
    return res.status(401).json({ message: "Access token not provided" });
  }
  try {
    const payload = jwt.verify(accessToken, accessSecret);
    if (!isJwtUserPayload(payload)) {
      return res.status(401).json({ message: "Invalid access token" });
    }
    req.body.user = payload;
    next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    return res.status(401).json({ message: "Invalid access token" });
  }
};
