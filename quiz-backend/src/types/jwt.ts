import { User, UserRole } from "../../generated/prisma";

export type JwtUser = Omit<User, "password" | "avatar" | "name">;

export type JwtUserPayload = JwtUser & { iat: number; exp: number };

export function isJwtUserPayload(obj: unknown): obj is JwtUserPayload {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }

  const payload = obj as Partial<JwtUserPayload>;

  return (
    typeof payload.id === "number" &&
    typeof payload.email === "string" &&
    Object.values(UserRole).includes(payload.role as UserRole) &&
    typeof payload.iat === "number" &&
    typeof payload.exp === "number"
  );
}

export type WithJwtUserPayload<T> = T & {user: JwtUserPayload}; 
