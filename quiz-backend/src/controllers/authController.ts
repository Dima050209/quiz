import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { redisClient } from "../config/redisClient";
import env from "../config/validateEnv";
import { isJwtUserPayload, JwtUser, JwtUserPayload } from "../types/jwt";
import { generateRefreshKey } from "../utils/generateRefreshKey";
import { generateAccessToken, generateRefreshToken } from "../utils/auth";
import { getUserByEmail } from "../services/userService";
import bcrypt from "bcryptjs";

const refreshSecret = env.REFRESH_SECRET;

export const refreshAccessToken: RequestHandler = async (req, res) => {
  const refreshToken = req.cookies.refresh_token;
  if (!refreshToken) {
    return res.status(401).json({ message: "Token not provided" });
  }

  try {
    const payload = jwt.verify(refreshToken, refreshSecret) as JwtUserPayload;
    if (!isJwtUserPayload(payload)) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const refreshKey = generateRefreshKey(payload.id, refreshToken);
    const isValid = await redisClient.get(refreshKey);
    if (!isValid) {
      return res.status(404).json({ message: "Token expired" });
    }
    const accessPayload: JwtUser = {
      id: payload.id,
      email: payload.email,
      role: payload.role,
    };
    const accessToken = generateAccessToken(accessPayload);

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });
    return res.status(200).json({ message: "Access token has been successfully created" });
  } catch (err) {
    console.log(err);
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Refresh token expired" });
    }
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }
    return res.status(500).json({ message: "Token verification failed" });
  }
};

interface LoginBody {
  email: string;
  password: string;
}

export const login: RequestHandler<unknown, unknown, LoginBody> = async (
  req,
  res
) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User with such email not found" });
    }
    const passwordMatches =
      user && (await bcrypt.compare(password, user.password));
    if (!passwordMatches) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    const tokenUserInfo: JwtUser = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    const refreshToken = generateRefreshToken(tokenUserInfo);
    const accessToken = generateAccessToken(tokenUserInfo);

    const redisKey = generateRefreshKey(user.id, refreshToken);
    await redisClient.set(redisKey, "valid", { EX: 60 * 60 * 24 * 7 });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/api/auth",
    });

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    return res.status(200).json({ message: "Successfully logged in" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Could not login" });
  }
};

export const logout: RequestHandler = async (req, res) => {
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) {
    return res.status(401).json({ message: "Token not provided" });
  }

  try {
    const payload = jwt.verify(refreshToken, refreshSecret) as JwtUserPayload;
    if (!isJwtUserPayload(payload)) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const refreshKey = generateRefreshKey(payload.id, refreshToken);

    const deleted = await redisClient.del(refreshKey);
    if (deleted === 0) {
      console.warn(`Refresh token key not found: ${refreshKey}`);
    }
    res.clearCookie("refresh_token", { path: "/auth" });

    res.clearCookie("access_token", { path: "/" });

    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.log(err);
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Refresh token expired" });
    }
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }
    return res.status(500).json({ message: "Token verification failed" });
  }
};
