import UserCard from "@/components/ui/user-card";
import { allUsers } from "@/lib/api-server/user";
import { getQueryClient } from "@/lib/get-query-client";
import { User } from "@/lib/types";
import Link from "next/link";

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
      <div className="w-50 h-40 flex justify-center items-center">
        <Link href='/dashboard/admin/add-user' className="w-20 h-20 bg-gray-300/50 rounded-full relative hover:scale-120 duration-200">
            <span className="w-10 border-b border-black absolute top-10 left-5" />
            <span className="h-10 border-r border-black absolute top-5 left-10" />
        </Link>
      </div>
    </div>
  );
}
