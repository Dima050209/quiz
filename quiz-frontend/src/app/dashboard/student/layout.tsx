import { StudentSidebar } from "@/components/student-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { studentRoutes } from "@/lib/routes";
import { Separator } from "@radix-ui/react-separator";
import React from "react";

export default function StudentLayout({
  children,
}: Readonly<{
  modal: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SidebarProvider>
        <StudentSidebar routes={studentRoutes} />

        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
                {studentRoutes.navMain.map((genRoute, idx) => {
                  const activeItem = genRoute.items.filter((item) => item.isActive);
                  if (activeItem.length > 0) {
                    return (
                      <BreadcrumbList key={genRoute.title + activeItem}>
                        <BreadcrumbItem className="hidden md:block">
                          <BreadcrumbLink href="#">
                          {genRoute.title}
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                          <BreadcrumbPage>{activeItem.length > 0 ? activeItem[0].title : ''}</BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    );
                  }
                  return null;
                })}
            </Breadcrumb>
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
