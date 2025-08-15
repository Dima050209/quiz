import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      API_BASE_URL + "/auth/login",
      { email, password },
      { withCredentials: true }
    );
    if (response.statusText !== "OK" || !response.data.accessToken) {
      throw new Error("Failed to login"); 
    }
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    return await axios.post(
      API_BASE_URL + "/auth/logout",
      {},
      { withCredentials: true }
    );
  } catch (error) {
    console.log(error);
  }
};

export const refresh = async () => {
  try {
    return await axios.get(API_BASE_URL + "/auth/refresh", {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
};
