"use client";

import StatCard from "@/components/dashboard/StatCard";
import { CreditCard, Percent, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Stats = {
  usersCount: number;
  plansCount: number;
  couponsCount: number;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Overview of platform activity
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
        icon={<Users className="w-6 h-6" />}
          title="Total Users"
          value={loading ? "…" : stats?.usersCount ?? 0}
        />

        <StatCard
          icon={<CreditCard className="w-6 h-6" />}
          title="Total Plans"
          value={loading ? "…" : stats?.plansCount ?? 0}
        />

        <StatCard
          icon={<Percent className="w-6 h-6" />}
          title="Total Coupons"
          value={loading ? "…" : stats?.couponsCount ?? 0}
        />
      </div>
    </div>
  );
}