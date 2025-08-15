import axios from "axios";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const currentUser = async () => {
  const cookieStore = await cookies();
  let res;
  try {
    const accessToken = cookieStore.get("access_token")?.value;

    res = await axios.get(`${API_BASE_URL}/user`, {
      headers: {
        Cookie: `access_token=${accessToken}`,
      },
      withCredentials: true,
    });

    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      try {
        const refreshToken = cookieStore.get("refresh_token")?.value;
        const refreshAttempt = await axios.get(API_BASE_URL + "/auth/refresh", {
          headers: {
            Cookie: `refresh_token=${refreshToken}`,
          },
          withCredentials: true,
        });

        if (refreshAttempt?.statusText !== "OK") {
          throw new Error("Failed to retrieve quizzes");
        }
        const accessToken = refreshAttempt.data.accessToken;
        res = await axios.get(`${API_BASE_URL}/user`, {
          headers: {
            Cookie: `access_token=${accessToken}`,
          },
          withCredentials: true,
        });

        if (res.statusText !== "OK") {
          throw new Error("Failed to retrieve quizzes");
        }
        return res.data;
      } catch (error) {
        console.log(error);
        return null;
      }
    }

    throw error;
  }
};
