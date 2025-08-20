import UserCard from "@/components/ui/user-card";
import { allUsers } from "@/lib/api-server/user";
import { getQueryClient } from "@/lib/get-query-client";
import { User } from "@/lib/types";

export default async function AllUsers() {
  const queryClient = getQueryClient();
  const users = await queryClient.fetchQuery({
    queryKey: ["users"],
    queryFn: allUsers,
  });
  return (
    <div className="flex flex-wrap gap-4 p-4">
      {(users as User[])?.map((user) => {
        return <UserCard key={user.id} user={user} />;
      })}
    </div>
  );
}
