import { login } from "@/api/auth";

export async function POST(request: Request) {
  try {
    const req = (await request.json()) as { email: string; password: string };
    const response = await login(req.email, req.password);
    if (response?.statusText !== "OK") {
        throw new Error(JSON.stringify(response));
    }
    return new Response(JSON.stringify(response.data), {
      headers: { "Content-Type": "application/json" },
      status: response.status,
    });
  } catch (error) {
    console.error(error);
     return new Response(JSON.stringify({message: "Login failed"}), {
        headers: { "Content-Type": "application/json" },
        status: 401,
      });
  }
}
