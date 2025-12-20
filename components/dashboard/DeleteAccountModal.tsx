"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

export function DeleteAccountModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/user/delete", {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete account");
      }

      toast.success("Account deleted successfully");

      await signOut({ callbackUrl: "/" });
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="w-full max-w-md rounded-2xl bg-background p-6 border border-red-500/40 space-y-4">
        <div className="flex items-center gap-3 text-red-600">
          <AlertTriangle />
          <h2 className="text-lg font-semibold">Delete Account</h2>
        </div>

        <p className="text-sm text-foreground/80">
          This action is <strong>permanent</strong>. All your data, API keys,
          credits, and subscriptions will be deleted.
        </p>

        <p className="text-sm font-medium text-red-600">
          This cannot be undone.
        </p>

        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 rounded-lg text-sm border"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 rounded-lg text-sm bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
          >
            {loading ? "Deleting..." : "Delete Account"}
          </button>
        </div>
      </div>
    </div>
  );
}
