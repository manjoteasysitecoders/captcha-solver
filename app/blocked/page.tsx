"use client";

import { signOut } from "next-auth/react";

export default function BlockedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="max-w-md rounded-2xl border bg-card p-8 text-center shadow-lg">
        <h1 className="text-2xl font-bold text-red-600">
          Account Blocked
        </h1>

        <p className="mt-4 text-muted-foreground">
          Your account has been blocked by our team.
          <br />
          Please contact support to regain access.
        </p>

        <button
          onClick={() => signOut({ callbackUrl: "/signin" })}
          className="mt-6 rounded-lg bg-primary px-4 py-2 text-white"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
