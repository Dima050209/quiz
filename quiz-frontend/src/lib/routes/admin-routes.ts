"use client";

import { DashboardRoutes, makeRouteActive } from "./routes";

export const adminRoutes: DashboardRoutes = {
  navMain: [
    {
      title: "Profile",
      items: [
        {
          title: "Profile",
          url: "/dashboard/admin/",
        },
      ],
    },
    {
      title: "Users",
      items: [
        {
          title: "All Users",
          url: "/dashboard/admin/all-users"
        }
      ]
    },
    {
      title: "Quizzes",
      items: [
        {
          title: "My quizzes",
          url: "/dashboard/admin/my-quizzes",
        },
        {
          title: "All quizzes",
          url: "/dashboard/admin/quizzes",
        },
      ],
    },
    {
      title: "Analytics",
      items: [
        {
          title: "My analytics",
          url: "/dashboard/admin/my-analytics",
        },
      ],
    },
  ],
};

export const gotoAdminRoute = (route: string) => makeRouteActive(adminRoutes, route);
