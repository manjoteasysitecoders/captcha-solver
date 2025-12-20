"use client";

import StatCard from "@/components/dashboard/StatCard";
import { Zap, Package } from "lucide-react";
import { useUser } from "@/context/UserContext";

export default function DashboardPage() {
  const { user } = useUser();

  if (!user) return <p>Loading...</p>;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center lg:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold">Dashboard Overview</h1>
        <p className="text-foreground/80 mt-2">
          Monitor your usage and plan details.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <StatCard
          title="Current Plan"
          value={
            user.currentPlan
              ? `${user.currentPlan.name} (₹${user.currentPlan.price})`
              : "None"
          }
          icon={<Zap size={40} />}
        />
        <StatCard
          title="Credits Remaining"
          value={user.credits.toLocaleString()}
          icon={<Package size={40} />}
        />
        <StatCard
          title="Total Requests"
          value={user.totalRequests.toLocaleString()}
          icon={<Zap size={40} />}
        />
      </div>

      {user.credits === 0 && (
        <div className="rounded-3xl p-8 shadow-lg border border-primary/50 bg-primary/10 text-center">
        <h2 className="text-xl font-semibold mb-2">API Key</h2>
        <p className="text-foreground/80">
          Purchase a plan from{" "}
          <span className="font-medium text-primary">Billing page</span> and
          generate your API key from the{" "}
          <span className="font-medium text-primary">API Keys page</span>.
        </p>
      </div>
      )

      }
    </div>
  );
}
