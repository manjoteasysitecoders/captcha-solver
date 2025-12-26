"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { User } from "lucide-react";
import { useUser } from "@/context/UserContext";

export default function Topbar({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  const { user } = useUser();
  return (
    <header
      className="
        h-20 px-4
        flex items-center
        bg-white/70
        backdrop-blur-xl
        border-b border-border/50
      "
    >
      {/* Hamburger */}
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-lg hover:bg-muted/40 transition"
        aria-label="Toggle sidebar"
      >
        <Menu size={24} />
      </button>

      <div className="ml-auto flex items-center gap-4">
        <Link
          href="/dashboard/profile"
          className="h-10 w-10 rounded-full bg-primary text-primary-foreground
                     flex items-center justify-center"
        >
          {user?.image ? (
            <img
              src={user.image}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <User size={18} />
          )}
        </Link>
      </div>
    </header>
  );
}
