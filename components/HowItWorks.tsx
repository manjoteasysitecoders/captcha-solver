"use client";

import Link from "next/link";
import { workingSteps } from "@/constants/working";
import { motion, type Variants } from "framer-motion";

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stepVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const codeBlockVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay: 0.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function HowItWorks() {
  return (
    <motion.section
      id="how-it-works"
      className="bg-primary/10 py-10"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          className="text-center max-w-2xl mx-auto"
          variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            How It Works
          </h2>
          <p className="mt-4">
            Solve text, image, and audio CAPTCHA challenges using simple,
            purpose-built APIs.
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          className="mt-8 rounded-2xl border border-border bg-card shadow-sm p-6 md:p-10 grid lg:grid-cols-2 gap-10"
          variants={itemVariants}
        >
          <motion.div variants={sectionVariants}>
            <motion.p
              className="text-primary font-semibold"
              variants={itemVariants}
            >
              Simple integration process
            </motion.p>

            <motion.h3
              className="mt-2 text-2xl font-semibold"
              variants={itemVariants}
            >
              From CAPTCHA input to AI-generated result
            </motion.h3>

            <motion.div className="mt-8 space-y-6">
              {workingSteps.map((item) => (
                <motion.div
                  key={item.step}
                  className="flex gap-4"
                  variants={stepVariants}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                    {item.step}
                  </div>

                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="mt-1 text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              className="mt-10 flex flex-wrap gap-4"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.25 }}
              >
                <Link
                  href="/signup"
                  className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                >
                  Create Account
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.25 }}
              >
                <Link
                  href="/docs/api"
                  className="inline-flex h-11 items-center justify-center rounded-md border border-border px-5 text-sm font-semibold transition hover:border-primary hover:text-primary"
                >
                  API Documentation
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right: Code Example */}
          <motion.div
            className="rounded-xl bg-foreground text-background p-4 md:p-6 text-sm font-mono overflow-x-auto"
            variants={codeBlockVariants}
          >
            <div className="flex items-center justify-between mb-3 text-xs">
              <span>Example: Solve Image CAPTCHA</span>
              <span>POST /api/public/imageCaptcha</span>
            </div>

            <p className="mb-3 text-xs">
              Requires an active plan and valid API key
            </p>

            <pre className="leading-relaxed">
              {`const response = await fetch("/api/public/imageCaptcha", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_API_KEY",
  },
  body: JSON.stringify({
    imageUrl: "https://example.com/captcha.png",
  }),
});

const data = await response.json();
console.log(data.text);`}
            </pre>

            <motion.div
              className="mt-4 text-green-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              ✓ Captcha solved successfully
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
