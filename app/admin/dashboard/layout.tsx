"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import clsx from "clsx";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="h-screen bg-white/90">
      {sidebarOpen && <AdminSidebar />}

      <div
        className={clsx(
          "flex flex-col transition-all duration-300",
          sidebarOpen ? "ml-64" : "ml-0"
        )}
      >
        <AdminTopbar
          toggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
