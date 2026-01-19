"use client";

import { formatDate } from "@/lib/formatDate";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface AdminUser {
  id: string;
  email: string;
  active: boolean;
  credits: number;
  totalRequests: number;
  provider: string | null;
  createdAt: string;
  currentPlan?: {
    name: string;
  } | null;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  async function fetchUsers() {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/admin/users?page=${page}&limit=${limit}&search=${encodeURIComponent(searchTerm)}`,
      );
      const data = await res.json();

      setUsers(data.users);
      setTotalPages(data.pagination.totalPages);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  async function toggleStatus(user: AdminUser) {
    setUpdatingId(user.id);

    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, active: !u.active } : u)),
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
        prev.map((u) => (u.id === user.id ? { ...u, active: user.active } : u)),
      );
    } finally {
      setUpdatingId(null);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [page, searchTerm]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      setSearchTerm(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="space-y-6">
      <div className="flex gap-2 items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Users</h1>
          <p className="text-sm text-muted-foreground">
            Manage registered users and their access
          </p>
        </div>

        {/* Search Input */}
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Search by email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border border-primary rounded-xl w-72"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-primary bg-card shadow-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr className="text-left text-muted-foreground border-b border-primary">
              <th className="p-4 font-medium">Email</th>
              <th className="p-4 font-medium">Credits</th>
              <th className="p-4 font-medium">Requests</th>
              <th className="p-4 font-medium">Provider</th>
              <th className="p-4 font-medium">Current Plan</th>
              <th className="p-4 font-medium">Created</th>
              <th className="p-4 font-medium text-center">Status</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={7}
                  className="p-8 text-center text-muted-foreground"
                >
                  Loading users...
                </td>
              </tr>
            ) : users.length ? (
              users.map((user) => (
                <tr key={user.id} className="border-t border-primary">
                  <td className="p-4 font-medium">{user.email}</td>
                  <td className="p-4">{user.credits}</td>
                  <td className="p-4">{user.totalRequests}</td>
                  <td className="p-4">{user.provider ?? "credentials"}</td>
                  <td className="p-4">{user.currentPlan?.name ?? "Free"}</td>
                  <td className="p-4">{formatDate(user.createdAt)}</td>
                  <td className="p-4 text-center">
                    <button
                      disabled={updatingId === user.id}
                      onClick={() => toggleStatus(user)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                        user.active ? "bg-green-600" : "bg-gray-400"
                      } ${
                        updatingId === user.id
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
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
                  colSpan={7}
                  className="p-8 text-center text-muted-foreground"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center gap-4 pt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 rounded-xl border border-primary disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 rounded-xl border border-primary disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
