"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function AdminProfilePage() {
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(false);

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();

    if (!currentPassword || !newPassword) {
      toast.error("All fields are required");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to update password");
        return;
      }

      toast.success("Password updated.");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setCurrentPassword("");
      setNewPassword("");
    }
  }

  return (
    <div className="space-y-8 max-w-xl">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">
          Admin Profile
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage your admin account settings
        </p>
      </div>

      <form
        onSubmit={changePassword}
        className="rounded-2xl border border-primary bg-card p-6 shadow-lg space-y-4"
      >
        <h2 className="text-lg font-semibold">
          Change Password
        </h2>

        <div className="relative">
          <input
            type={showCurrent ? "text" : "password"}
            placeholder="Current password"
            className="w-full rounded-xl border border-primary/50 bg-background p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-primary"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowCurrent(!showCurrent)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-foreground"
          >
            {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="relative">
          <input
            type={showNew ? "text" : "password"}
            placeholder="New password (min 8 chars)"
            className="w-full rounded-xl border border-primary/50 bg-background p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-primary"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowNew(!showNew)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-foreground"
          >
            {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button
          disabled={loading}
          className="rounded-xl bg-primary px-5 py-2 font-medium text-primary-foreground hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
