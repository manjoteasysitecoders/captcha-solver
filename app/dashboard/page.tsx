"use client";

import { Zap, Package, BadgeInfo, Activity, CalendarClock } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { FREE_CREDITS } from "@/constants/credits";

function getDaysLeft(validity?: number | null, verifiedAt?: string | null) {
  if (!validity || !verifiedAt) return null;

  const start = new Date(verifiedAt);
  const end = new Date(start);
  end.setDate(start.getDate() + validity);

  const diff = Math.ceil((end.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  return diff > 0 ? diff : 0;
}

export default function DashboardPage() {
  const { user } = useUser();
  const router = useRouter();

  if (!user) return <p>Loading...</p>;

  const latestPayment = user.payments
    ?.filter((p) => p.status === "SUCCESS")
    .sort(
      (a, b) =>
        new Date(b.verifiedAt || "").getTime() -
        new Date(a.verifiedAt || "").getTime()
    )[0];

  const daysLeft = getDaysLeft(
    user.currentPlan?.validity,
    latestPayment?.verifiedAt || null
  );

  const freeCredits = FREE_CREDITS;
  const creditsUsed = user.totalCredits + freeCredits - user.credits;
  const isFreePlan = !user.currentPlan || user.currentPlan.name === "Free";

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="text-center lg:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold">Dashboard Overview</h1>
        <p className="text-foreground/70 mt-2">
          Track your plan usage, credits, and API activity.
        </p>
      </header>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Current Plan"
          value={
            user.currentPlan
              ? `${user.currentPlan.name} (₹${user.currentPlan.price})`
              : "Free"
          }
          icon={<Zap size={40} />}
        />

        <StatCard
          title="Days Remaining"
          value={
            daysLeft !== null
              ? `${daysLeft}`
              : user.currentPlan
              ? "Unlimited"
              : "-"
          }
          icon={<CalendarClock size={40} />}
        />

        <StatCard
          title="Credits Remaining"
          value={user.credits.toLocaleString()}
          icon={<Package size={40} />}
        />

        <StatCard
          title="Credits Used"
          value={creditsUsed.toLocaleString()}
          icon={<Activity size={40} />}
        />

        <StatCard
          title="Total Credits"
          value={user.totalCredits.toLocaleString()}
          icon={<Package size={40} />}
        />

        <StatCard
          title="Total Requests"
          value={user.totalRequests.toLocaleString()}
          icon={<Zap size={40} />}
        />
      </section>

      {/* Upgrade CTA */}
      {(isFreePlan || user.credits < 10) && (
        <section className="relative rounded-3xl border border-primary/50 bg-primary/10 p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-primary text-sm font-medium">
                <BadgeInfo className="w-4 h-4" />
                {isFreePlan
                  ? "Free plan active"
                  : `${user.currentPlan?.name} plan active`}
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold">
                Need more CAPTCHA solves?
              </h2>

              <p className="text-foreground/70">
                Upgrade your plan to unlock higher limits, faster solving, and
                uninterrupted usage.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => router.push("/dashboard/plans")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 font-semibold text-background hover:opacity-90"
              >
                <Zap className="w-5 h-5" />
                Upgrade Plan
              </button>

              <span className="text-xs text-foreground/50 text-center">
                • No long-term commitment
              </span>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
