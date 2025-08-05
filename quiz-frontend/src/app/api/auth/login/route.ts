import { login } from "@/api/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const req = (await request.json()) as { email: string; password: string };
    const response = await login(req.email, req.password);
    if (response?.statusText !== "OK") {
      throw new Error(JSON.stringify(response));
    }

    const res = NextResponse.json({ success: true });

    res.cookies.set({
      name: "auth_token",
      value: response.data.accessToken,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Login failed" }), {
      headers: { "Content-Type": "application/json" },
      status: 401,
    });
  }
}
