import { Quiz, User } from "@/lib/types";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import Link from "next/link";

export default function UserCard({ user }: { user: User }) {
  return (
    <Link href={`/dashboard/`}>
      <Card
        key={`user${user.id}`}
        className="w-50 min-h-40 hover:scale-110 duration-200"
      >
        <CardHeader>
          <CardTitle>{user.name}</CardTitle>
        </CardHeader>
        <CardContent className="h-[70%]">
          <p className="text-sm">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
          <p className="text-sm">{user.email}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
