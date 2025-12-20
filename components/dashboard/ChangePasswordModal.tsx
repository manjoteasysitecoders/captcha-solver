"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

export function ChangePasswordModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Reset values every time modal opens
  useEffect(() => {
    if (open) {
      setCurrent("");
      setPassword("");
      setConfirm("");
      setError("");
      setShowCurrent(false);
      setShowPassword(false);
      setShowConfirm(false);
    }
  }, [open]);

  if (!open) return null;

  const submit = async () => {
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/user/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: current,
          newPassword: password,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      toast.success("Password updated successfully");
      onClose();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="w-full max-w-md rounded-2xl bg-background p-6 space-y-4 border border-primary/40">
        <h2 className="text-lg font-semibold">Change Password</h2>

        {error && <p className="text-sm text-red-500">{error}</p>}

        {/* Current Password */}
        <PasswordInput
          value={current}
          onChange={setCurrent}
          placeholder="Current password"
          show={showCurrent}
          toggle={() => setShowCurrent((v) => !v)}
        />

        {/* New Password */}
        <PasswordInput
          value={password}
          onChange={setPassword}
          placeholder="New password"
          show={showPassword}
          toggle={() => setShowPassword((v) => !v)}
        />

        {/* Confirm Password */}
        <PasswordInput
          value={confirm}
          onChange={setConfirm}
          placeholder="Confirm new password"
          show={showConfirm}
          toggle={() => setShowConfirm((v) => !v)}
        />

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm border"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={loading}
            className="px-4 py-2 rounded-lg text-sm bg-primary text-white disabled:opacity-60"
          >
            {loading ? "Saving..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- */
/* Reusable Password Input Component */
/* ---------------------------------- */

function PasswordInput({
  value,
  onChange,
  placeholder,
  show,
  toggle,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  show: boolean;
  toggle: () => void;
}) {
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-primary/50 px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
      />
      <button
        type="button"
        onClick={toggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/60 hover:text-foreground"
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}
