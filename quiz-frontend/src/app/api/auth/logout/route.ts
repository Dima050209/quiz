import { logout } from "@/api/auth";

export async function POST() {
  try {
    const response = await logout();
    if (response?.statusText !== "OK") {
        throw new Error(JSON.stringify(response));
    }
    return new Response(JSON.stringify(response.data), {
      headers: { "Content-Type": "application/json" },
      status: response.status,
    });
  } catch (error) {
    console.error(error);
     return new Response(JSON.stringify({message: "Logout failed"}), {
        headers: { "Content-Type": "application/json" },
        status: 500,
      });
  }
}
