import env from "./validateEnv";
import { createClient } from "redis";


export const redisClient = createClient({
  username: env.REDIS_USERNAME,
  password: env.REDIS_PASSWORD,
  socket: {
    host: env.REDIS_SOCKET_HOST,
    port: env.REDIS_SOCKET_PORT,
  },
});