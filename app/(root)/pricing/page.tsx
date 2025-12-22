"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PricingCard } from "@/components/PricingCard";
import { Sparkles } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      {/* Page Header */}
      <motion.header
        className="text-center max-w-3xl mx-auto mb-16"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
          <Sparkles className="w-4 h-4" /> Start for free with 500 credits.
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mt-2">Pricing Plans</h1>
        <p className="mt-4 text-lg">
          Simple, transparent, and pay-as-you-go pricing for CAPTCHA Solver. No
          subscriptions or recurring fees.
        </p>
      </motion.header>

      <PricingCard />

      {/* Footer CTA */}
      {/* <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-sm">Need higher volume or custom pricing?</p>
        <Link
          href="mailto:support@captchasolver.com"
          className="mt-3 inline-flex items-center justify-center text-sm font-semibold text-primary underline"
        >
          Contact Sales
        </Link>
      </motion.div> */}
    </div>
  );
}
