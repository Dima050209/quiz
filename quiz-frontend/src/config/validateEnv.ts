import { cleanEnv, str } from "envalid";

const env = cleanEnv(process.env, {
  NEXT_PUBLIC_API_BASE_URL: str(),
});

export default env;
