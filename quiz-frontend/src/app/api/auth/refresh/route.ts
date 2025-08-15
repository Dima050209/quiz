import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token")?.value;
    console.log("refresh", refreshToken);
    const res = await axios.get(API_BASE_URL + "/auth/refresh", {
      headers: {
        Cookie: `refresh_token=${refreshToken}`,
      },
      withCredentials: true,
    });

    const response = NextResponse.json(
      { message: "Access token refreshed" },
      { status: 200 }
    );
    cookieStore.set('access_token',res.data.accessToken);

    // if (res.statusText !== "OK") {
    //   response.cookies.delete("refresh_token");
    //   response.cookies.delete("access_token");
    // } else {
    //   response.cookies.set("access_token", res.data.accessToken);
    // }
    // console.log("response.cookies",response.cookies);
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to refresh token" },
      { status: 500 }
    );
  }
}
