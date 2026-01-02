"use client";

import { Menu, Shield } from "lucide-react";
import Link from "next/link";

export default function AdminTopbar({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  return (
    <header
      className="
        h-20 px-4
        flex items-center
      bg-white/50
        border-b border-border/50
      "
    >
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-lg hover:bg-muted/40 transition"
        aria-label="Toggle admin sidebar"
      >
        <Menu size={24} />
      </button>

      <div className="ml-auto">
        <Link
          href="/admin/dashboard/profile"
          className="
            h-10 w-10 rounded-full
            bg-primary text-primary-foreground
            flex items-center justify-center
          "
        >
          <Shield size={18} />
        </Link>
      </div>
    </header>
  );
}
