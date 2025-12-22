"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="max-w-7xl mx-auto relative bg-foreground rounded-3xl overflow-hidden py-10 px-6 md:px-12 lg:px-60">
      <div className="absolute -top-40 -right-40 rounded-full bg-linear-to-tr from-primary/30 to-purple-500/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 rounded-full bg-linear-to-tr from-purple-500/20 to-primary/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-4 text-sm font-semibold uppercase tracking-widest text-background"
        >
          Get Started in Minutes
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-extrabold text-primary leading-tight"
        >
          Stop Solving CAPTCHAs Manually
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-4 text-background/50 sm:text-lg max-w-5xl mx-auto"
        >
          Automate image, text, and audio CAPTCHA solving with our fast,
          developer-friendly API — built for reliability, speed, and scale.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 flex justify-center gap-4 flex-wrap"
        >
          <Link
            href="/signup"
            className="group inline-flex items-center gap-4 bg-primary text-background font-semibold px-10 py-4 rounded-xl shadow-lg hover:bg-foreground hover:border hover:border-primary hover:text-primary transition-all duration-300 focus:ring-4 focus:ring-offset-2 focus:ring-primary/50"
          >
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 rounded-xl border border-primary px-8 py-4 font-semibold text-primary hover:bg-primary hover:text-background transition"
          >
            Read Documentation{" "}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
