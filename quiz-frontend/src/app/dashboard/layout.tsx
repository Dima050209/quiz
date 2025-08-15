import { currentUser } from "@/lib/api-server/user";
import { getQueryClient } from "@/lib/get-query-client";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
    const queryClient = getQueryClient();

    const user = await queryClient.fetchQuery({
        queryKey: ["user"],
        queryFn: currentUser
    });

  return user ? <>{children}</> : redirect('/');
}
