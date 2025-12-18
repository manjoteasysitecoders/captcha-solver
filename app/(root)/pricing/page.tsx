"use client";

import Link from "next/link";
import { pricingPlans } from "@/constants/pricing";
import { motion, Variants } from "framer-motion";

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

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
        <h1 className="text-4xl md:text-5xl font-bold">
          Pricing Plans
        </h1>
        <p className="mt-4 text-lg">
          Simple, transparent, and pay-as-you-go pricing for CAPTCHA Solver.
          No subscriptions or recurring fees.
        </p>
      </motion.header>

      {/* Pricing Section */}
      <motion.section
        className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {pricingPlans.map((plan) => (
          <motion.div
            key={plan.title}
            variants={cardVariants}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className={`relative flex flex-col rounded-2xl border p-6 shadow-sm bg-card
              ${plan.highlight ? "border-primary ring-1 ring-primary/30" : "border-primary/50"}`}
          >
            {plan.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                Most Popular
              </span>
            )}

            <h3 className="text-xl font-semibold">{plan.title}</h3>
            <p className="mt-2 text-sm">{plan.description}</p>

            <div className="mt-6 flex items-end gap-2">
              <span className="text-3xl font-bold">{plan.price}</span>
              <span className="text-sm">{plan.unit}</span>
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

            <motion.div
              className="mt-auto"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                href={plan.title === "Enterprise" ? "#" : "/signup"}
                className={`mt-4 inline-flex h-11 w-full items-center justify-center rounded-md px-5 text-sm font-semibold transition
                  ${
                    plan.highlight
                      ? "border bg-primary text-primary-foreground hover:bg-background hover:border-primary hover:text-primary"
                      : "border border-primary/80 text-primary hover:bg-primary hover:text-background"
                  }`}
              >
                {plan.title === "Enterprise" ? "Contact Sales" : "Get Started"}
              </Link>
            </motion.div>
          </motion.div>
        ))}
      </motion.section>

      {/* Footer CTA */}
      <motion.div
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
      </motion.div>
    </div>
  );
}
