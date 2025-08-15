export const studentRoutes = {
  navMain: [
    {
      title: "Profile",
      items: [
        {
          title: "Profile",
          url: "/dashboard/student/my-quizes",
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
          isActive: true
        },
      ],
    },
    {
      title: "Analytics",
      items: [
        {
          title: "My analytics",
          url: "#",
        },
      ],
    },
  ],
}

export type DashboardRoutes = typeof studentRoutes;