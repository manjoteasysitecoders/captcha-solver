"use client";

import Link from "next/link";
import { PricingCard } from "./PricingCard";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
    },
  },
};

export default function PricingSection() {
  return (
    <motion.section
      id="pricing"
      className="py-12 relative overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto"
          variants={cardVariants}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
            <Sparkles className="w-4 h-4" /> Start for free with 500 credits.
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-2">
            Simple & Transparent Pricing
          </h2>
          <p className="mt-4">
            Purchase credits to unlock CAPTCHA-solving APIs. No subscriptions or
            recurring fees.
          </p>
        </motion.div>

        <PricingCard />

        {/* Footer CTA */}
        {/* <motion.div className="mt-12 text-center" variants={cardVariants}>
          <p className="text-sm">Need higher volume or custom pricing?</p>

          <Link
            href="#"
            className="mt-3 inline-flex items-center justify-center text-sm font-semibold text-primary underline"
          >
            Contact Sales
          </Link>
        </motion.div> */}
      </div>
    </motion.section>
  );
}
