"use client";

import { PricingCard } from "@/components/PricingCard";
import { useUser } from "@/context/UserContext";

export default function BillingPage() {
  const { user } = useUser();

  if (!user) return <p>Loading...</p>;

  return (
    <div className="space-y-8">
      <div className="text-center lg:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold">Billing & Plans</h1>
        <p className="text-foreground/80 mt-2">
        View your current plan, remaining credits, and upgrade options.
        </p>
      </div>

      <div className="rounded-3xl p-6 shadow-lg border border-primary/50 bg-primary/10">
        <h2 className="text-xl font-bold mb-4">
          Current Plan: {user.currentPlan ? user.currentPlan.name : "None"}
        </h2>
        <p className="text-md font-semibold">
          Credits Remaining: {user.credits.toLocaleString()}
        </p>
      </div>
      <PricingCard />
    </div>
  );
}
