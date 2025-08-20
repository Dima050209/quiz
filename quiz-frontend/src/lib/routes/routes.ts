"use client";

export const makeRouteActive = (routes: DashboardRoutes, route: string) => {
  routes.navMain.forEach((genRoute) => {
    genRoute.items.forEach((item) => {
     item.isActive = item.url === route;
    })
  });
  return routes;
};

export type DashboardRoute = {
  title: string;
  url: string;
  isActive?: boolean;
};

export type DashboardRoutes = {
  navMain: {
    title: string;
    items: DashboardRoute[];
  }[];
};
