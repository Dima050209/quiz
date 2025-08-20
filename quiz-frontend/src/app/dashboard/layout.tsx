import { currentUser } from "@/lib/api-server/user";
import { getQueryClient } from "@/lib/get-query-client";
import { User } from "@/lib/types";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();

  let user: User | null = null;
  try {
    user = await queryClient.fetchQuery<User>({
      queryKey: ["user"],
      queryFn: currentUser
    });
  } catch {
    return redirect('/');
  }

  return user ? <>{children}</> : redirect('/');
}

