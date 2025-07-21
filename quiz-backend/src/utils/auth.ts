import jwt from "jsonwebtoken";
import env from "../config/validateEnv";
import { JwtUser } from "../types/jwt";


const access_secret = env.ACCESS_SECRET;
const refresh_secret = env.REFRESH_SECRET;

export function generateAccessToken(user: JwtUser) {
    return jwt.sign(user, access_secret, {expiresIn:'15m'});
}

export function generateRefreshToken(user: JwtUser) {
    return jwt.sign(user, refresh_secret, {expiresIn:'7d'});
}
