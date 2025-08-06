import React from "react";
import { StudentSidebar } from "@/components/student-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function StudentDashboard() {
  return (
    <SidebarProvider>
      <StudentSidebar />
    </SidebarProvider>
  );
}
