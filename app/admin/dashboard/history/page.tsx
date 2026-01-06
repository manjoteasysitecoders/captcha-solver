"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Payment = {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
  user: { email: string };
  plan: { name: string };
  coupon?: { code: string; percentage: number } | null;
};

export default function PlanHistoryPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState({
    email: "",
    plan: "",
    status: "",
    fromDate: "",
    toDate: "",
  });

  useEffect(() => {
    fetchPayments();
  }, [page, filters]);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        ...filters,
        page: page.toString(),
        limit: limit.toString(),
      });

      const res = await fetch(`/api/admin/history?${params.toString()}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to fetch payments");

      setPayments(data.payments);
      setTotalPages(data.pagination.totalPages);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const resetFilters = async () => {
    const empty = {
      email: "",
      plan: "",
      status: "",
      fromDate: "",
      toDate: "",
    };
    setFilters(empty);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">
          Plan Purchase History
        </h1>
        <p className="text-sm text-muted-foreground">
          Filter and review all plan purchases
        </p>
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-primary bg-card p-4 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
          <input
            placeholder="User email"
            className="rounded-xl border border-primary/40 px-3 py-2"
            value={filters.email}
            onChange={(e) => setFilters({ ...filters, email: e.target.value })}
          />

          <input
            placeholder="Plan name"
            className="rounded-xl border border-primary/40 px-3 py-2"
            value={filters.plan}
            onChange={(e) => setFilters({ ...filters, plan: e.target.value })}
          />

          <select
            className="rounded-xl border border-primary/40 px-3 py-2"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">All Status</option>
            <option value="SUCCESS">Success</option>
            <option value="FAILED">Failed</option>
            <option value="PENDING">Pending</option>
          </select>

          <input
            type="date"
            className="rounded-xl border border-primary/40 px-3 py-2"
            value={filters.fromDate}
            onChange={(e) =>
              setFilters({ ...filters, fromDate: e.target.value })
            }
          />

          <input
            type="date"
            className="rounded-xl border border-primary/40 px-3 py-2"
            value={filters.toDate}
            onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
          />

          <div className="flex gap-2">
            <button
              onClick={fetchPayments}
              className="flex-1 rounded-xl bg-primary text-background font-semibold px-4 py-2 hover:opacity-90 transition"
            >
              Apply
            </button>
            <button
              onClick={resetFilters}
              className="flex-1 rounded-xl border border-primary px-4 py-2"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-primary bg-card shadow-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b border-primary">
            <tr className="text-left text-muted-foreground">
              <th className="p-4 font-medium">User</th>
              <th className="p-4 font-medium">Plan</th>
              <th className="p-4 font-medium">Amount</th>
              <th className="p-4 font-medium">Coupon</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Purchased</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="p-8 text-center">
                  Loading...
                </td>
              </tr>
            ) : payments.length ? (
              payments.map((p) => (
                <tr key={p.id} className="border-t border-primary">
                  <td className="p-4 font-medium">{p.user.email}</td>
                  <td className="p-4">{p.plan.name}</td>
                  <td className="p-4">₹{p.amount}</td>
                  <td className="p-4">
                    {p.coupon
                      ? `${p.coupon.code} (${p.coupon.percentage}%)`
                      : "—"}
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold text-white ${
                        p.status === "SUCCESS"
                          ? "bg-green-600"
                          : p.status === "FAILED"
                          ? "bg-red-600"
                          : "bg-amber-400"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="p-4">
                    {new Date(p.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="p-8 text-center text-muted-foreground"
                >
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 pt-2">
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
