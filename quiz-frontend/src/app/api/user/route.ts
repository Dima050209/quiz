import { currentUser } from "@/api/user";

export async function GET() {
  try {
    const response = await currentUser();
    console.log(response?.data);
    if (response?.statusText !== "OK") {
        throw new Error(JSON.stringify(response));
    }
    return new Response(JSON.stringify(response.data), {
      headers: { "Content-Type": "application/json" },
      status: response.status,
    });
  } catch (error) {
    console.error(error);
     return new Response(JSON.stringify({message: "Get current user failed"}), {
        headers: { "Content-Type": "application/json" },
        status: 500,
      });
  }
}
