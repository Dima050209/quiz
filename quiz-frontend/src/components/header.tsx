import React from "react";
import { CustomLink } from "./ui/custom-link";
import Container from "./container";
import vercelLogo from "../../public/vercel.svg";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  withLogin?: boolean;
}

export default function Header({ withLogin }: HeaderProps) {
  return (
    <div className="bg-sidebar-foreground min-h-20 flex items-center">
      <Container className="py-5 flex justify-between items-center">
        <Link href="/">
          <Image src={vercelLogo} alt="logo" className="h-5 w-5" />
        </Link>
        {withLogin && (
          <CustomLink variant="outline" size="lg" href="/login">
            Login
          </CustomLink>
        )}
      </Container>
    </div>
  );
}
