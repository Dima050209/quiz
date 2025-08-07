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
      title: "Quizes",
      items: [
        {
          title: "My quizes",
          url: "/dashboard/student/my-quizes",
        },
        {
          title: "All quizes",
          url: "/dashboard/student/quizes",
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