import axios from "axios";
import { cookies } from "next/headers";
import { Quiz } from "../types";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const allQuizzes = async () => {
  let res;
  const cookieStore = await cookies();
  try {
    const accessToken = cookieStore.get("access_token")?.value;

    res = await axios.get(`${API_BASE_URL}/quizzes`, {
      headers: {
        Cookie: `access_token=${accessToken}`,
      },
      withCredentials: true,
    });

    if (res.statusText !== "OK") {
      throw new Error("Failed to retrieve quizzes");
    }
    return res.data.quizzes as Quiz[];
  } catch (error) {
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
        res = await axios.get(`${API_BASE_URL}/quizzes`, {
          headers: {
            Cookie: `access_token=${accessToken}`,
          },
          withCredentials: true,
        });

        if (res.statusText !== "OK") {
          throw new Error("Failed to retrieve quizzes");
        }
        return res.data.quizzes as Quiz[];
      } catch (error) {
        console.log(error);
        return null;
      }
    }

    throw error;
  }
};

export const myQuizzes = async () => {
  let res;
  const cookieStore = await cookies();
  try {
    const accessToken = cookieStore.get("access_token")?.value;

    res = await axios.get(`${API_BASE_URL}/quizzes/my-quizzes`, {
      headers: {
        Cookie: `access_token=${accessToken}`,
      },
      withCredentials: true,
    });

    if (res.statusText !== "OK") {
      throw new Error("Failed to retrieve quizzes");
    }
    return res.data.quizzes as Quiz[];
  } catch (error) {
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
        res = await axios.get(`${API_BASE_URL}/quizzes/my-quizzes`, {
          headers: {
            Cookie: `access_token=${accessToken}`,
          },
          withCredentials: true,
        });

        if (res.statusText !== "OK") {
          throw new Error("Failed to retrieve quizzes");
        }
        return res.data.quizzes as Quiz[];
      } catch (error) {
        console.log(error);
        return null;
      }
    }

    throw error;
  }
};
