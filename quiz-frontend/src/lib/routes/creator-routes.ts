"use client";

import { DashboardRoutes, makeRouteActive } from "./routes";

export const creatorRoutes: DashboardRoutes = {
  navMain: [
    {
      title: "Profile",
      items: [
        {
          title: "Profile",
          url: "/dashboard/creator/",
        },
      ],
    },
    {
      title: "Quizzes",
      items: [
        {
          title: "My quizzes",
          url: "/dashboard/creator/my-quizzes",
        },
        {
          title: "All quizzes",
          url: "/dashboard/creator/quizzes",
        },
      ],
    },
    {
      title: "Analytics",
      items: [
        {
          title: "My analytics",
          url: "/dashboard/creator/my-analytics",
        },
      ],
    },
  ],
};

export const gotoCreatorRoute = (route: string) => makeRouteActive(creatorRoutes, route);
