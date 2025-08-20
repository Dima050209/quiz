"use client";

import { DashboardRoutes, makeRouteActive } from "./routes";

export const studentRoutes: DashboardRoutes = {
  navMain: [
    {
      title: "Profile",
      items: [
        {
          title: "Profile",
          url: "/dashboard/student/",
        },
      ],
    },
    {
      title: "Quizzes",
      items: [
        {
          title: "My quizzes",
          url: "/dashboard/student/my-quizzes",
        },
        {
          title: "All quizzes",
          url: "/dashboard/student/quizzes",
        },
      ],
    },
    {
      title: "Analytics",
      items: [
        {
          title: "My analytics",
          url: "/dashboard/student/my-analytics",
        },
      ],
    },
  ],
};

export const gotoStudentRoute = (route: string) => makeRouteActive(studentRoutes, route);
