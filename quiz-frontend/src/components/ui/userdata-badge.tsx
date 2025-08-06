import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import { CustomLink } from "./custom-link";

interface UserdataBadgeProps {
  name: string;
  email: string;
  avatar: string;
}

export default function UserdataBadge({
  name,
  email,
  avatar,
}: UserdataBadgeProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <Avatar className="w-16 h-16 shrink-0">
        <AvatarImage
          className="rounded-4xl object-cover w-full h-full"
          src={avatar || "https://github.com/shadcn.png"}
          alt="user avatar"
        />
        <AvatarFallback>User avatar</AvatarFallback>
      </Avatar>

      <div>
        <CustomLink variant="link" size="primary" href="/">
          {name}
        </CustomLink>
        <CustomLink variant="link" size="secondary" href="/">
          {email}
        </CustomLink>
      </div>
    </div>
  );
}
