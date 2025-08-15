import axios from "axios";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const currentUser = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    const res = await axios.get(`${API_BASE_URL}/user`, {
      headers: {
        Cookie: `access_token=${accessToken}`,
      },
      withCredentials: true,
    });

    return res.data;
  } catch (error: unknown) {
    console.error(error);
    return null;
  }
};
