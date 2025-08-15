"use server";

import axios from "axios";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// export const login = async (email: string, password: string) => {
//   try {
//     const response = await axios.post(
//       API_BASE_URL + "/auth/login",
//       { email, password },
//       { withCredentials: true }
//     );
//     if (response.statusText !== "OK" || !response.data.accessToken) {
//       throw new Error("Failed to login");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const logout = async () => {
//   try {
//     const cookieStore = await cookies();
//     const refreshToken = cookieStore.get("refresh_token")?.value;

//     return await axios.post(
//       API_BASE_URL + "/auth/logout",
//       {},
//       {
//         headers: {
//           Cookie: `refresh_token=${refreshToken}`,
//         },
//         withCredentials: true,
//       }
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const refresh = async () => {
//   try {
//     const cookieStore = await cookies();
//     const refreshToken = cookieStore.get("refresh_token")?.value;
    
//     const res = await axios.get(API_BASE_URL + "/auth/refresh", {
//       headers: {
//         Cookie: `refresh_token=${refreshToken}`,
//       },
//       withCredentials: true,
//     });

//     if(res.statusText !== "OK") {
//         cookieStore.delete("refresh_token");
//         cookieStore.delete("access_token");
//     }
//     cookieStore.set("access_token", res.data.accessToken);
//   } catch (error) {
//     console.log(error);
//   }
// };
