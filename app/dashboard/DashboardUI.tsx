"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { UserProvider } from "@/context/UserContext";

export default function DashboardUI({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, []);

  return (
    <UserProvider>
      <div className="flex h-screen">
        <Sidebar open={sidebarOpen} />

        <div
          className={`
            flex flex-col flex-1 transition-all duration-300
            ${sidebarOpen ? "ml-70" : "ml-20"}
          `}
        >
          <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

          <main className="flex-1 px-12 pt-6 pb-10 space-y-10 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </UserProvider>
  );
}
