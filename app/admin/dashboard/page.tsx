"use client";

import StatCard from "@/components/dashboard/StatCard";
import { formatDate } from "@/lib/formatDate";
import { CreditCard, Percent, Users, DollarSign, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function fetchStats() {
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to load stats");

      setStats(data);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of platform activity
        </p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          icon={<Users className="w-6 h-6" />}
          title="Total Users"
          value={loading ? "…" : stats?.users.total ?? 0}
        />
        <StatCard
          icon={<CreditCard className="w-6 h-6" />}
          title="Total Plans"
          value={loading ? "…" : stats?.plans.total ?? 0}
        />
        <StatCard
          icon={<Percent className="w-6 h-6" />}
          title="Total Coupons"
          value={loading ? "…" : stats?.coupons.total ?? 0}
        />
        <StatCard
          icon={<DollarSign className="w-6 h-6" />}
          title="Total Revenue"
          value={
            loading ? "…" : `₹${stats?.payments.totalRevenue.toFixed(2) ?? 0}`
          }
        />
        <StatCard
          icon={<CreditCard className="w-6 h-6" />}
          title="Total Payments"
          value={loading ? "…" : stats?.payments.totalPayments ?? 0}
        />
        <StatCard
          icon={<FileText className="w-6 h-6" />}
          title="Invoices Generated"
          value={loading ? "…" : stats?.payments.invoicesGenerated ?? 0}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Plans Purchased Card */}
        <div
          className="rounded-2xl border border-primary bg-card p-6 shadow-lg
                sm:max-h-none overflow-y-auto"
        >
          <h2 className="text-lg font-semibold mb-4">Plans Purchased</h2>
          {loading ? (
            <p>Loading...</p>
          ) : stats?.plans.purchased.length ? (
            <ul className="space-y-2">
              {stats.plans.purchased.map((plan: any) => (
                <li
                  key={plan.name}
                  className="flex justify-between bg-muted/10 rounded-xl p-3"
                >
                  <span className="font-medium">{plan.name}</span>
                  <span className="text-muted-foreground">
                    {plan.purchasedCount} times
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No plans purchased yet.</p>
          )}
        </div>

        {/* Coupon Usage Card */}
        <div
          className="rounded-2xl border border-primary bg-card p-6 shadow-lg
                sm:max-h-none overflow-y-auto"
        >
          <h2 className="text-lg font-semibold mb-4">Coupon Usage</h2>
          {loading ? (
            <p>Loading...</p>
          ) : stats?.coupons.usage.length ? (
            <ul>
              {stats.coupons.usage.map((c: any) => (
                <li
                  key={c.code}
                  className="flex justify-between bg-muted/10 rounded-xl p-2"
                >
                  <span className="font-medium">{c.code}</span>
                  <span className="text-muted-foreground">
                    {c.timesUsed} times
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No coupons used yet.</p>
          )}
        </div>
      </div>

      {/* Recent Purchases Table */}
      <div className="rounded-2xl border border-primary bg-card shadow-lg overflow-x-auto p-4">
        <h2 className="text-lg font-semibold mb-4">Recent Purchases</h2>
        <table className="w-full table-auto">
          <thead className="bg-muted/50">
            <tr>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Plan</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : stats?.payments.recentPurchases.length ? (
              stats.payments.recentPurchases.map((p: any) => (
                <tr key={p.id} className="border-t border-primary">
                  <td className="p-3">{p.user.email}</td>
                  <td className="p-3">{p.plan.name}</td>
                  <td className="p-3">₹{p.amount.toFixed(2)}</td>
                  <td className="p-3">
                    {formatDate(p.createdAt)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="p-4 text-center text-muted-foreground"
                >
                  No purchases yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
