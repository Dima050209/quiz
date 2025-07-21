import prisma from "../config/prisma";
import { User } from "../../generated/prisma";

export type NewUser = Omit<User, "id" | "avatar">

export const createUser = async (user: NewUser): Promise<User> => {
  const createdUser = await prisma.user.create({
    data: user,
  });
  return createdUser;
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};

export const getUserById = async (id: number): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};