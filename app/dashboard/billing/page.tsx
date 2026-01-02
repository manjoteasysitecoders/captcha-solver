"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { payWithRazorpay } from "@/lib/payment";
import { toast } from "react-toastify";
import { GST_RATE } from "@/constants/credits";

export default function BillingPlanPage() {
  const searchParams = useSearchParams();
  const planId = searchParams.get("planId");
  const router = useRouter();
  const { user, refreshUser } = useUser();

  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!planId) return;

    async function fetchPlan() {
      try {
        const res = await fetch(`/api/plans/${planId}`);
        if (!res.ok) throw new Error("Failed to fetch plan");
        const data = await res.json();
        setPlan(data);
      } catch (error) {
        toast.error("Unable to load plan details");
        router.push("/dashboard");
      } finally {
        setLoading(false);
      }
    }

    fetchPlan();
  }, [planId, router]);

  if (!user) return <p className="text-center mt-20">Loading user…</p>;
  if (loading) return <p className="text-center mt-20">Loading plan…</p>;
  if (!plan) return null;

  const gstAmount = plan.price * GST_RATE;
  const totalAmount = plan.price + gstAmount;

  const handlePayment = async () => {
    try {
      const success = await payWithRazorpay(plan.id);
      if (success) {
        toast.success("Payment successful!");
        await refreshUser?.();
        router.push("/dashboard");
      }
    } catch (err: any) {
      toast.error(err.message || "Payment failed");
    }
  };

  return (
    <div className="space-y-8">
      <header className="text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold">Checkout</h1>
          <p className="text-foreground/80 mt-1">
            Review your plan and complete payment
          </p>
        </header>
      <div className="w-full max-w-md rounded-3xl bg-primary/10 shadow-xl border border-primary">
        {/* Plan info */}
        <div className="p-6 space-y-6">
          <div className="rounded-2xl bg-primary/20 p-4">
            <p className="text-sm text-muted-foreground">Selected plan</p>
            <h2 className="text-xl font-semibold">{plan.name}</h2>
          </div>

          {/* Price breakdown */}
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Base price</span>
              <span>₹{plan.price.toLocaleString()}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">GST (18%)</span>
              <span>₹{gstAmount.toFixed(2)}</span>
            </div>

            <div className="border-t pt-4 flex justify-between text-base font-semibold">
              <span>Total payable</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Pay button */}
          <button
            onClick={handlePayment}
            className="w-full rounded-2xl bg-primary py-3 text-background font-semibold text-lg hover:opacity-90 transition"
          >
            Pay ₹{totalAmount.toFixed(2)}
          </button>

          <p className="text-xs text-center text-foreground">
            Secure payment powered by Razorpay
          </p>
        </div>
      </div>
    </div>
  );
}
