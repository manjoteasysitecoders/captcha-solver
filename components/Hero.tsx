"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const floatCardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function HeroSection() {
  return (
    <motion.section
      className="relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 pt-20 pb-24">
          {/* Left Content */}
          <motion.div
            className="flex-1 max-w-2xl lg:max-w-xl"
            variants={containerVariants}
          >
            <motion.h1
              className="text-[42px] leading-tight md:text-[48px] font-bold tracking-tight"
              variants={itemVariants}
            >
              Effortless CAPTCHA Solving for Automation
            </motion.h1>

            <motion.p
              className="mt-4 text-base md:text-lg"
              variants={itemVariants}
            >
              Unlock reliable, fast, and scalable captcha solving with our{" "}
              <span className="font-semibold text-primary">
                AI-powered CAPTCHA Solver APIs
              </span>
            </motion.p>

            {/* Features */}
            <motion.div
              className="mt-6 grid gap-3"
              variants={containerVariants}
            >
              {[
                "Image CAPTCHA Recognition API",
                "Text CAPTCHA Parsing API",
                "Audio CAPTCHA Transcription API",
              ].map((feature) => (
                <FeatureItem key={feature} title={feature} />
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <Link
                  href="/signup"
                  className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 text-base font-semibold text-primary-foreground transition hover:opacity-90 focus:ring-2 focus:ring-ring"
                >
                  Get Started
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <Link
                  href="/docs"
                  className="inline-flex h-12 items-center justify-center rounded-md border border-border px-6 text-base font-semibold transition hover:border-primary hover:text-primary"
                >
                  View Documentation
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            className="flex-1 relative flex justify-center"
            variants={itemVariants}
          >
            <div className="relative">
              <Image
                src="/banner-robot.png"
                alt="CAPTCHA Solver"
                width={560}
                height={560}
                priority
              />

              {/* Floating Card */}
              <motion.div
                className="absolute bottom-6 left-6 right-8 rounded-xl bg-card text-card-foreground shadow-lg border border-border p-4"
                variants={floatCardVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="flex items-center justify-between text-sm font-medium">
                  <span>Captcha Solved</span>
                  <span className="text-primary">✔ Success</span>
                </div>

                <div className="mt-2 h-2 w-full rounded bg-muted">
                  <motion.div
                    className="h-2 rounded bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: "85%" }}
                    transition={{
                      duration: 1.4,
                      delay: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Accent */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
    </motion.section>
  );
}

function FeatureItem({ title }: { title: string }) {
  return (
    <motion.div
      className="flex items-center gap-3 rounded-md border border-primary/50 px-4 py-3"
      variants={itemVariants}
    >
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
        ✓
      </div>
      <span className="text-sm font-medium">{title}</span>
    </motion.div>
  );
}
