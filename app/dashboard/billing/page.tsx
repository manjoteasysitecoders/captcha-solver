"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { payWithRazorpay } from "@/lib/payment";
import { toast } from "react-toastify";
import { GST_RATE } from "@/lib/pricing";

export default function BillingPlanPage() {
  const searchParams = useSearchParams();
  const planId = searchParams.get("planId");
  const router = useRouter();
  const { user, refreshUser } = useUser();

  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [applyingCoupon, setApplyingCoupon] = useState(false);

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

  const basePrice = plan.price;
  const discountedPrice = appliedCoupon?.discountedPrice ?? basePrice;
  const gstAmount =
    appliedCoupon?.gstAmount ?? Math.round(basePrice * GST_RATE);
  const totalAmount = appliedCoupon?.totalAmount ?? basePrice + gstAmount;

  const handleApplyCoupon = async () => {
    setApplyingCoupon(true);
    try {
      const res = await fetch("/api/apply-coupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: couponCode,
          planId,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setAppliedCoupon(data);
      toast.success("Coupon applied successfully");
    } catch (err: any) {
      toast.error(err.message);
      setAppliedCoupon(null);
    } finally {
      setApplyingCoupon(false);
    }
  };

  const handlePayment = async () => {
    try {
      const success = await payWithRazorpay(plan.id, appliedCoupon?.id);
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

      <div className="w-full max-w-md rounded-3xl bg-primary/10 shadow-xl border border-primary p-6 space-y-6">
        {/* Plan info */}
        <div className="rounded-2xl bg-primary/20 p-4">
          <p className="text-sm text-muted-foreground">Selected plan</p>
          <h2 className="text-xl font-semibold">{plan.name}</h2>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter coupon code"
            className="flex-1 rounded-xl border border-primary/40 p-3"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            disabled={applyingCoupon}
          />
          <button
            className="rounded-xl bg-primary px-4 py-3 text-background font-semibold hover:opacity-90 transition"
            onClick={handleApplyCoupon}
            disabled={applyingCoupon}
          >
            {applyingCoupon ? "Applying…" : "Apply"}
          </button>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Base price</span>
            <span>₹{plan.price.toLocaleString()}</span>
          </div>

          {appliedCoupon && (
            <div className="flex justify-between text-green-600">
              <span>Discount ({appliedCoupon.percentage}%)</span>
              <span>-₹{(basePrice - discountedPrice).toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="text-muted-foreground">GST (18%)</span>
            <span>₹{gstAmount.toFixed(2)}</span>
          </div>

          <div className="border-t pt-4 flex justify-between text-base font-semibold">
            <span>Total payable</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
        </div>

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
  );
}
