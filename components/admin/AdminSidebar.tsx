"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import clsx from "clsx";
import { adminDashboardSidebarLinks } from "@/constants/navLinks";
import { toast } from "react-toastify";

export default function AdminSidebar() {
  const pathname = usePathname();

    const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/auth/logout", {
        method: "POST",
      });

      if (!res.ok) throw new Error("Logout failed");

      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      toast.error("Failed to logout");
    }
  };

  return (
    <aside
      className="
        fixed inset-y-0 left-0 z-40
        w-64 px-4
        bg-white/50 shadow-2xl
        flex flex-col
      "
    >
      {/* Logo */}
      <div className="h-20 flex items-center justify-center">
        <h1 className="text-xl font-extrabold text-primary">ADMIN PANEL</h1>
      </div>

      <nav className="flex-1 space-y-2">
        {adminDashboardSidebarLinks.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition",
                active
                  ? "bg-primary text-background shadow-lg"
                  : "text-foreground hover:bg-primary hover:text-background"
              )}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="
          mb-4 flex items-center gap-3
          rounded-xl px-4 py-3
          text-red-600 hover:bg-red-50 transition
        "
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </aside>
  );
}
