import { getTokenFromCookie } from "@/lib/tokenStorage";
import axiosInstance from "./axiosInstance";
import env from "@/config/validateEnv";
import axios from "axios";

const API_BASE_URL = env.NEXT_PUBLIC_API_BASE_URL;

export const currentUser = async () => {
  try {
    // console.log(axiosInstance);
    const accessToken = await getTokenFromCookie();
    console.log("accessToken:", accessToken);
    return await axios.get(API_BASE_URL + "/user", {
        headers: {
            "Authorization": "Bearer " + accessToken,
        }
    });
  } catch (error) {
    console.log(error);
  }
};
