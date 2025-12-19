"use client";

import { Menu } from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";
import Link from "next/link";
import { User } from "lucide-react";

export default function Topbar({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  return (
    <header
      className="
        h-20 px-4
        flex items-center
        bg-white/70 dark:bg-card/70
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
        <ThemeToggle />
        <Link
          href="/dashboard/profile"
          className="h-10 w-10 rounded-full bg-primary text-primary-foreground
                     flex items-center justify-center"
        >
          <User size={18} />
        </Link>
      </div>
    </header>
  );
}
