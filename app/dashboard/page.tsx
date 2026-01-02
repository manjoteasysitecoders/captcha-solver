"use client";

import { useState } from "react";
import { Zap, Package, BadgeInfo } from "lucide-react";

import StatCard from "@/components/dashboard/StatCard";
import { PricingCard } from "@/components/PricingCard";
import { useUser } from "@/context/UserContext";

export default function DashboardPage() {
  const { user } = useUser();
  const [showPricing, setShowPricing] = useState(false);

  if (!user) return <p>Loading...</p>;

  const isFreePlan = !user.currentPlan || user.currentPlan.name === "Free";

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="text-center lg:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold">Dashboard Overview</h1>
        <p className="text-foreground/80 mt-2">
          Monitor your usage and plan details.
        </p>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
          title="Credits Remaining"
          value={user.credits.toLocaleString()}
          icon={<Package size={40} />}
        />
        <StatCard
          title="Total Requests"
          value={user.totalRequests.toLocaleString()}
          icon={<Zap size={40} />}
        />
      </section>

      {isFreePlan ||
        (user.credits < 10 && (
          <section className="relative rounded-3xl border border-primary/50 bg-background p-8 shadow-sm">
            {!showPricing ? (
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                {/* Left */}
                <div className="space-y-4 max-w-xl">
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-primary text-sm font-medium">
                    <BadgeInfo className="w-4 h-4" />
                    {user.currentPlan
                      ? `${user.currentPlan.name} plan active`
                      : "Free plan active"}
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
                    Need more CAPTCHA solves?
                  </h2>

                  <p className="text-foreground/70">
                    Upgrade your plan to unlock higher daily limits, faster
                    solving, and uninterrupted usage as you scale.
                  </p>
                </div>

                {/* Right */}
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => setShowPricing(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-base font-semibold text-background transition hover:opacity-90"
                  >
                    <Zap className="w-5 h-5" />
                    Upgrade Plan
                  </button>

                  <span className="text-xs text-foreground/50 text-center">
                    • No long-term commitment
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Choose a plan</h3>
                  <button
                    onClick={() => setShowPricing(false)}
                    className="text-sm text-foreground/60 hover:text-primary transition"
                  >
                    Hide pricing
                  </button>
                </div>
                <PricingCard />
              </div>
            )}
          </section>
        ))}
    </div>
  );
}
