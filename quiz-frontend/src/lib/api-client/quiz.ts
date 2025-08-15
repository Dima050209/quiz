import axios from "axios";
import { getToken } from "../tokenStorage";
import { refresh } from "./auth";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const allQuizzes = async () => {
  try {
    const response = await axios.get(API_BASE_URL + "/quizzes", {
      withCredentials: true,
    });

    if (response.statusText !== "OK") {
      throw new Error("Failed to retrieve quizzes");
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getQuiz = async (id: number) => {
  let response;
  try {
    response = await axios.get(`${API_BASE_URL}/quizzes/${id}`, {
      withCredentials: true,
    });

    if (response.statusText !== "OK") {
      throw new Error("Failed to retrieve quizzes");
    }
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      try {
        const refreshAttempt = await refresh();
        if (refreshAttempt?.statusText !== "OK") {
          throw new Error("Failed to retrieve quizzes");
        }
        response = await axios.get(`${API_BASE_URL}/quizzes/${id}`, {
          withCredentials: true,
        });

        if (response.statusText !== "OK") {
          throw new Error("Failed to retrieve quizzes");
        }
        return response.data;
      } catch (error) {
        console.log(error);
        return null;
      }
    }

    throw error;
  }
};
