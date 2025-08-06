import { getToken } from "@/lib/tokenStorage";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const currentUser = async () => {
  try {
    const accessToken = getToken();
    return await axios.get(API_BASE_URL + "/user", {
        headers: {
            "Authorization": "Bearer " + accessToken,
        }
    });
  } catch (error) {
    console.log(error);
  }
};
