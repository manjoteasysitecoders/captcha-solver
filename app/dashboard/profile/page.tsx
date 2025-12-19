"use client";

import { useState } from "react";
import { User, Shield, Key, CreditCard } from "lucide-react";

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-gray-500 mt-1">
            Manage your personal information, security and billing details
          </p>
        </div>
        <button
          onClick={() => setEditing(!editing)}
          className="rounded-xl bg-black px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-800 transition"
        >
          {editing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Card */}
        <div className="lg:col-span-1 rounded-2xl border border-primary/50 p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-white text-xl font-semibold">
              <User size={32} />
            </div>
            <div>
              <h2 className="text-lg font-semibold">John Doe</h2>
              <p className="text-sm text-gray-500">john@example.com</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <InfoRow icon={<CreditCard size={18} />} label="Plan" value="Pro" />
            <InfoRow icon={<Key size={18} />} label="API Credits" value="12,500" />
            <InfoRow icon={<Shield size={18} />} label="Account Status" value="Active" />
          </div>
        </div>

        {/* Right Cards */}
        <div className="lg:col-span-2 space-y-8">
          {/* Personal Info */}
          <Card title="Personal Information">
            <Field label="Full Name" value="John Doe" editing={editing} />
            <Field label="Email Address" value="john@example.com" editing={false} />
          </Card>

          {/* Security */}
          <Card title="Security">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-sm">
                <Shield size={18} />
                <span>Password</span>
              </div>
              <button className="text-sm font-medium text-indigo-600 hover:underline">
                Change Password
              </button>
            </div>
          </Card>

          {/* API Key */}
          <Card title="API Access">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-sm">
                <Key size={18} />
                <span className="truncate">sk_live_**************************</span>
              </div>
              <button className="rounded-lg border border-primary/50 px-4 py-1.5 text-sm hover:bg-gray-50">
                Regenerate
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-primary/50 p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="space-y-4">{children}</div>
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
  editing: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-500">{label}</label>
      {editing ? (
        <input
          defaultValue={value}
          className="rounded-xl border border-primary/50 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      ) : (
        <p className="text-sm font-medium">{value}</p>
      )}
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
  value: string;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2 text-gray-600">
        {icon}
        <span>{label}</span>
      </div>
      <span className="font-medium">{value}</span>
    </div>
  );
}