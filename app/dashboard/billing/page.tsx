"use client";

import { useState } from "react";
import { PricingCard } from "@/components/PricingCard";

export default function BillingPage() {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  const purchasePlan = (planId: number) => {
    alert(`Purchase flow triggered for plan ID: ${planId}`);
    // TODO: Integrate Razorpay checkout here
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Billing & Plans</h1>
      <div className="rounded-3xl p-6 shadow-lg border border-primary/50 bg-primary/10">
        <h2 className="text-xl font-bold mb-4">Current Plan: Starter</h2>
        <p className="text-md font-semibold">Credits Remaining: 1,200</p>
      </div>
      <PricingCard />
    </div>
  );
}
