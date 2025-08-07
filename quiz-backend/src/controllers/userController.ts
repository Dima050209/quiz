import { RequestHandler } from "express";
import { UserRole } from "../../generated/prisma";
import {
  createUser,
  getUserByEmail,
  getUserById,
  NewUser,
} from "../services/userService";
import bcrypt from "bcryptjs";
import env from "../config/validateEnv";
import jwt from "jsonwebtoken";
import { isJwtUserPayload } from "../types/jwt";

const salt = env.PASSWORD_SALT;
const accessSecret = env.ACCESS_SECRET;

interface RegisterBody {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
export const register: RequestHandler<unknown, unknown, RegisterBody> = async (
  req,
  res
) => {
  const { name, email, password, role } = req.body;
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }
  try {
    const hash = await bcrypt.hash(password, salt);
    const newUser: NewUser = {
      name,
      email,
      password: hash,
      role,
    };
    const createdUser = await createUser(newUser);
    return res.status(201).json({ user: createdUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Could not register user" });
  }
};

export const currentUser: RequestHandler = async (req, res) => {
  const accessToken = req.cookies.access_token;

  if (!accessToken) {
    return res.status(401).json({ message: "Access token not provided" });
  }
  try {
    const payload = jwt.verify(accessToken, accessSecret);
    if (!isJwtUserPayload(payload)) {
      return res.status(401).json({ message: "Invalid access token" });
    }

    const user = await getUserById(payload.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    res.status(200).json({ user: userWithoutPassword });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Could not get user" });
  }
};

export const getUser: RequestHandler = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await getUserById(Number(userId));
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "User not found" });
  }
};
