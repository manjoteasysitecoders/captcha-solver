"use client";

import { motion } from "framer-motion";
import BuyPlanButton from "./ui/BuyPlanButton";
import { payWithRazorpay } from "@/lib/payment";
import { toast } from "react-toastify";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const useUserSafe = () => {
  try {
    return useUser();
  } catch {
    return null;
  }
};

export const PricingCard = () => {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const userContext = useUserSafe();
  const isAuthenticated = !!userContext;
  const refreshUser = userContext?.refreshUser;

  useEffect(() => {
    async function fetchPlans() {
      try {
        const res = await fetch("/api/plans");
        if (!res.ok) throw new Error("Failed to fetch plans");
        const data = await res.json();
        setPlans(data);
      } catch (err) {
        console.error(err);
        toast("Failed to load plans");
      } finally {
        setLoading(false);
      }
    }
    fetchPlans();
  }, []);

  if (loading) return <p>Loading plans...</p>;

  return (
    <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {plans.map((plan) => (
        <motion.div
          key={plan.id}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -10, scale: 1.015 }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
          className="relative flex h-full flex-col rounded-3xl border border-primary bg-linear-to-b from-background to-muted/30 shadow-md hover:shadow-xl overflow-hidden"
        >
          {plan.image && (
            <div className="w-full h-40 overflow-hidden rounded-t-2xl">
              <img
                src={plan.image}
                alt={plan.name}
                className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
              />
            </div>
          )}

          <div className="flex flex-col flex-1 p-6 text-left">
            <h3 className="text-2xl font-bold">{plan.name}</h3>

            <p className="mt-2 text-md text-muted-foreground whitespace-pre-line">
              {plan.description || "Best for growing teams"}
            </p>

            {/* Price */}
            <div className="mt-6 flex items-end justify-center gap-1">
              <span className="text-4xl font-extrabold">₹{plan.price}</span>
              <span className="text-sm text-muted-foreground">
                / {plan.credits} credits
              </span>
            </div>

            {plan.validity && (
              <div className="mt-2 text-xs text-muted-foreground text-center">
                ⚡ Valid for {plan.validity} days
              </div>
            )}

            {/* Divider */}
            <div className="my-6 h-px w-full bg-border" />

            {/* CTA */}
            <motion.div
              className="mt-auto"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <BuyPlanButton
                onAuthenticatedClick={
                  isAuthenticated
                    ? async () => {
                        try {
                          await payWithRazorpay(Number(plan.price));
                          toast("Payment successful!");
                          const res = await fetch("/api/user/plan", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ planId: plan.id }),
                          });

                          if (!res.ok) {
                            const error = await res.json();
                            toast(error.message || "Failed to update plan");
                            return;
                          }

                          toast("Your plan and credits have been updated!");
                          await refreshUser?.();
                        } catch (err: any) {
                          toast.error(err.message);
                        }
                      }
                    : undefined
                }
                onUnauthenticatedClick={
                  !isAuthenticated ? () => redirect("/signup") : undefined
                }
                className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-primary text-background font-semibold hover:opacity-90 transition"
              >
                {isAuthenticated ? "Buy Plan" : "Login to Buy"}
              </BuyPlanButton>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
