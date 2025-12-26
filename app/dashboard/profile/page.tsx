"use client";

import { User, Key, CreditCard } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { ChangePasswordModal } from "@/components/dashboard/ChangePasswordModal";
import { useState } from "react";
import { DeleteAccountModal } from "@/components/dashboard/DeleteAccountModal";

export default function ProfilePage() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  if (!user) return <p>Loading...</p>;

  const isGoogleUser = user.provider === "google";

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-foreground/80 mt-1">
          Manage your personal information, security, and billing details
        </p>
      </header>

      <div className="grid gap-8">
        <Card>
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
            <div className="flex flex-col justify-center items-center gap-4 sm:flex-row">
              {user.image ? (
                <img
                  src={user.image}
                  alt="Profile"
                  className="h-16 w-16 rounded-full object-cover"
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-white">
                  <User size={32} />
                </div>
              )}

              <div>
                <p className="text-sm text-foreground/80">{user.email}</p>
                <p className="text-xs text-foreground/60 capitalize">
                  {user.provider} account
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              {!isGoogleUser && (
                <button
                  onClick={() => setOpen(true)}
                  className="p-2 text-sm font-medium text-indigo-600 hover:underline text-left"
                >
                  Change Password
                </button>
              )}

              <button
                onClick={() => setDeleteOpen(true)}
                className="p-2 text-sm font-medium text-red-600 hover:underline text-left"
              >
                Delete Account
              </button>
            </div>
          </div>
        </Card>

        <Card title="Account Details">
          <InfoRow
            icon={<CreditCard size={18} />}
            label="Plan"
            value={user.currentPlan?.name ?? "Free"}
          />
          <InfoRow
            icon={<Key size={18} />}
            label="API Credits"
            value={user.credits.toLocaleString()}
          />
        </Card>
      </div>
      <ChangePasswordModal open={open} onClose={() => setOpen(false)} />

      <DeleteAccountModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
      />
    </div>
  );
}

function Card({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-primary/50 p-6 shadow-sm">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2 text-foreground/90">
        {icon}
        <span>{label}</span>
      </div>
      <div className="font-medium">{value}</div>
    </div>
  );
}

function Field({
  label,
  value,
  editing,
}: {
  label: string;
  value: string;
  editing?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-foreground/80">{label}</label>
      {editing ? (
        <input
          defaultValue={value}
          className="rounded-xl border border-primary/50 px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
        />
      ) : (
        <p className="text-sm font-medium">{value}</p>
      )}
    </div>
  );
}
