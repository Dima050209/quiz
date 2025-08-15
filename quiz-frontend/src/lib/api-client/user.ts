import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const currentUser = async () => {
  try {
    return await axios.get(API_BASE_URL + "/user", {
        withCredentials: true
    });
  } catch (error) {
    console.log(error);
  }
};
