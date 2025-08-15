import { Quiz } from "@/lib/types";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;
    console.log("quiz access", accessToken);
    const res = await axios.get(`${API_BASE_URL}/quizzes`, {
      headers: {
        Cookie: `access_token=${accessToken}`,
      },
      withCredentials: true,
    });

    if (res.statusText !== "OK") {
      throw new Error("Failed to retrieve quizzes");
    }
    const response = NextResponse.json(
      { quizzes: res.data.quizzes },
      { status: 200 }
    );
    return response;
  } catch (error) {
    console.log(error);
     return NextResponse.json(
      { message: "Failed to get quizzes" },
      { status: 500 }
    );
  }
}
