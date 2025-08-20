import { currentUser } from "@/lib/api-server/user";
import { getQueryClient } from "@/lib/get-query-client";
import { User } from "@/lib/types";
import { redirect } from "next/navigation";

export default async function Dashboard() {
//   const queryClient = getQueryClient();

//   const user = await queryClient.fetchQuery<User>({
//     queryKey: ["user"],
//     queryFn: currentUser,
//   });
// console.log("dashboard: ", user.role)
//   switch (user.role) {
//     case "STUDENT":
//       return redirect("/dashboard/student");
//     case "CREATOR":
//       return redirect("/dashboard/creator");
//     case "ADMIN":
//       return redirect("/dashboard/admin");
//     default:
//       return redirect("/");
//   }
return null
}
