"use client";

import { pricingPlans } from "@/constants/pricing";
import { motion } from "framer-motion";
import BuyPlanButton from "./ui/BuyPlanButton";
import { payWithRazorpay } from "@/lib/payment";
import { toast } from "react-toastify";
import { useUser } from "@/context/UserContext";
import { redirect } from "next/navigation";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

// Safe hook: returns context or null if none
const useUserSafe = () => {
  try {
    return useUser();
  } catch {
    return null;
  }
};

export const PricingCard = () => {
  const userContext = useUserSafe();
  const isAuthenticated = !!userContext;
  const refreshUser = userContext?.refreshUser;

  return (
    <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {pricingPlans.map((plan) => (
        <motion.div
          key={plan.id}
          variants={cardVariants}
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className={`relative flex h-full flex-col rounded-2xl border bg-card p-6 shadow-sm
            ${plan.highlight ? "border-primary ring-1 ring-primary/30" : "border-primary/50"}`}
        >
          {plan.highlight && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
              Most Popular
            </span>
          )}

          <h3 className="text-xl font-semibold">{plan.name}</h3>
          <p className="mt-2 text-sm">{plan.description}</p>

          <div className="mt-6 flex items-end gap-2">
            <span className="text-3xl font-bold">{plan.price}</span>
            <span className="text-sm">/{plan.credits} Credits</span>
          </div>

          <div className="mt-4 text-sm">
            ⚡ Average speed: <span className="font-medium">{plan.speed}</span>
          </div>

          <ul className="mt-4 space-y-2 text-sm">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                {feature}
              </li>
            ))}
          </ul>

          <motion.div className="mt-auto" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
            <BuyPlanButton
              key={plan.id}
              onAuthenticatedClick={isAuthenticated ? async () => {
                try {
                  await payWithRazorpay(Number(plan.price.replace("₹", "")));
                  toast("Payment successful! Thank you for your purchase.");

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
                } catch (err) {
                  console.error(err);
                  toast("Payment failed. Please try again.");
                }
              } : undefined}
              onUnauthenticatedClick={!isAuthenticated ? () => {
                redirect("/signup");
              } : undefined}
              className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-md px-5 text-sm font-semibold border border-primary text-primary hover:bg-primary hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              {isAuthenticated ? "Buy Plan" : "Login to Buy"}
            </BuyPlanButton>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};
