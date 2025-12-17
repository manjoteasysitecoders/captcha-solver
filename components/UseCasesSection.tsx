"use client";

import {
  Bot,
  Globe,
  Database,
  ShoppingCart,
  BarChart3,
  Workflow,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const useCases = [
  {
    title: "QA & Automation Testing",
    description:
      "Test automated workflows on systems you own or have permission to evaluate.",
    icon: Bot,
  },
  {
    title: "Accessibility Support",
    description:
      "Assist users who rely on audio or alternative CAPTCHA solutions.",
    icon: Globe,
  },
  {
    title: "Internal Tooling",
    description:
      "Integrate CAPTCHA handling into internal tools and controlled environments.",
    icon: Database,
  },
  {
    title: "Research & Analysis",
    description:
      "Analyze CAPTCHA behavior and performance for research purposes.",
    icon: BarChart3,
  },
  {
    title: "E-commerce Testing",
    description:
      "Validate checkout and inventory workflows in staging or test environments.",
    icon: ShoppingCart,
  },
  {
    title: "Custom Integrations",
    description:
      "Build tailored CAPTCHA-solving workflows with explicit authorization.",
    icon: Workflow,
  },
];

export default function UseCasesSection() {
  return (
    <motion.section
      id="use-cases"
      className="py-14"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Built for Authorized Automation & Testing
          </h2>
          <p className="mt-4">
            Our CAPTCHA-solving APIs support accessibility, testing, and
            authorized automation workflows across multiple industries.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
        >
          {useCases.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="group rounded-2xl border border-primary/50 bg-card p-6 shadow-sm transition"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="text-lg font-semibold">{item.title}</h3>

                <p className="mt-2 text-sm">{item.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
