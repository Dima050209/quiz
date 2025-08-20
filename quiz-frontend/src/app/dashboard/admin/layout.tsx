"use client";
import { UserSidebar } from "@/components/sidebar";
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
import { gotoAdminRoute } from "@/lib/routes/admin-routes";
import {
  DashboardRoutes,
} from "@/lib/routes/routes";
import { Separator } from "@radix-ui/react-separator";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function CreatorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();
  const [routes, setRoutes] = useState<DashboardRoutes>(gotoAdminRoute(path));

  useEffect(() => {
    setRoutes(gotoAdminRoute(path));
  }, [path]);

  const setActiveRoute = (routeUrl: string) => {
    setRoutes(gotoAdminRoute(routeUrl));
  };

  return (
    <div>
      <SidebarProvider>
        <UserSidebar routes={routes} setActiveRoute={setActiveRoute} />

        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              {routes.navMain.map((genRoute, idx) => {
                const activeItem = genRoute.items.filter(
                  (item) => item.isActive
                );
                if (activeItem.length > 0) {
                  return (
                    <BreadcrumbList key={genRoute.title + activeItem[0].url}>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="#">
                          {genRoute.title}
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        <BreadcrumbPage>
                          {activeItem.length > 0 ? activeItem[0].title : ""}
                        </BreadcrumbPage>
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
