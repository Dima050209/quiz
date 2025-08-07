"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface RelativeLinkProps extends React.ComponentProps<typeof Link>  {
    href: string;
    children: ReactNode;
}

export default function RelativeLink({href, children, ...props} : RelativeLinkProps) {
    const path = usePathname();
    const fullPath = `${path.replace(/\/$/, "")}/${href.replace(/^\//, "")}`;
  return (
    <Link href={fullPath} {...props}>{children}</Link>
  )
}
