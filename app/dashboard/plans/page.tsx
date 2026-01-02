"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PricingCard } from "@/components/PricingCard";

export default function PlansPage() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlans() {
      try {
        const res = await fetch("/api/plans");
        if (!res.ok) throw new Error("Failed to fetch plans");
        const data = await res.json();
        setPlans(data);
      } catch (error) {
        console.error(error);
        toast.error("Unable to load plans");
      } finally {
        setLoading(false);
      }
    }

    fetchPlans();
  }, []);

  if (loading)
    return <p className="text-center mt-20 text-lg">Loading plans…</p>;

  if (!plans.length)
    return <p className="text-center mt-20 text-lg">No plans available.</p>;

  return (
    <div className="space-y-8 px-4 max-w-7xl mx-auto">
      <header className="text-center lg:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold">Our Plans</h1>
        <p className="text-foreground/80 mt-2">
          Choose the plan that fits your needs.
        </p>
      </header>

      <PricingCard />
    </div>
  );
}
