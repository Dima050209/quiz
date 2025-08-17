"use client";

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
          url: "/dashboard/my-analytics",
        },
      ],
    },
  ],
};

export const makeRouteActive = (route: string) => {
  studentRoutes.navMain.forEach((genRoute) => {
    genRoute.items.forEach((item) => {
     item.isActive = item.url === route;
    })
  });
  return studentRoutes;
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
