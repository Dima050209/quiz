import { cleanEnv, str, port, num } from "envalid";

const env = cleanEnv(process.env, {
  DATABASE_URL: str(),
  PORT: port(),
  ACCESS_SECRET: str(),
  REFRESH_SECRET: str(),
  PASSWORD_SALT: num(),
  REDIS_PASSWORD: str(),
  REDIS_USERNAME: str(),
  REDIS_SOCKET_HOST: str(),
  REDIS_SOCKET_PORT: port(),
});

export default env;
