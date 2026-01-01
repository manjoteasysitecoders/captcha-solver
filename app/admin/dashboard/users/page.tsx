"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type User = {
  id: string;
  email: string;
  credits: number;
  totalRequests: number;
  provider: string | null;
  createdAt: string;
  active: boolean;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function fetchUsers() {
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  }

  async function toggleStatus(user: User) {
    setUpdatingId(user.id);

    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, active: !u.active } : u))
    );

    try {
      const res = await fetch(`/api/admin/users/${user.id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !user.active }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update status");

      toast.success(`User ${!user.active ? "activated" : "deactivated"}`);
    } catch (err: any) {
      toast.error(err.message);

      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, active: user.active } : u))
      );
    } finally {
      setUpdatingId(null);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Users</h1>
        <p className="text-sm text-muted-foreground">
          Manage registered users and their access
        </p>
      </div>

      <div className="rounded-2xl border border-primary bg-card shadow-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr className="text-left text-muted-foreground border-b border-primary">
              <th className="p-4 font-medium">Email</th>
              <th className="p-4 font-medium">Credits</th>
              <th className="p-4 font-medium">Requests</th>
              <th className="p-4 font-medium">Provider</th>
              <th className="p-4 font-medium">Created</th>
              <th className="p-4 font-medium text-center">Status</th>
            </tr>
          </thead>

          <tbody>
            {users.length ? (
              users.map((user) => (
                <tr key={user.id} className="border-t border-primary">
                  <td className="p-4 font-medium">{user.email}</td>
                  <td className="p-4">{user.credits}</td>
                  <td className="p-4">{user.totalRequests}</td>
                  <td className="p-4"
                  >{user.provider ?? "credentials"}</td>
                  <td className="p-4">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-4 text-center">
                    <button
                      disabled={updatingId === user.id}
                      onClick={() => toggleStatus(user)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${user.active ? "bg-green-600" : "bg-gray-400"} ${updatingId === user.id ? "opacity-50 cursor-not-allowed" : ""}`}>
                      <span
                        className={`
                          inline-block h-4 w-4 transform rounded-full bg-white transition
                          ${user.active ? "translate-x-6" : "translate-x-1"}
                        `}
                      />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="p-8 text-center text-muted-foreground"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
