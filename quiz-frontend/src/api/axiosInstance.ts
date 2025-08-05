import axios from 'axios';
import env from "@/config/validateEnv";
import { getTokenFromCookie } from '@/lib/tokenStorage';

const API_BASE_URL = env.NEXT_PUBLIC_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = await getTokenFromCookie();
  console.log(token, "----------");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
