"use client";

import { motion, Variants } from "framer-motion";
import { products } from "@/constants/products";
import { ArrowRight } from "lucide-react";
import WhyBetterSection from "@/components/WhyBetterSection";
import CTASection from "@/components/CTASection";
import CaptchaFlowSection from "@/components/products/CaptchaFlowSection";
import ProductCard from "@/components/products/ProductCard";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function ProductsPage() {
  return (
    <div id="products-page" className="relative overflow-hidden">
      <main className="mx-auto py-16 space-y-20">
        <section className="max-w-3xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="text-primary">AI-Powered</span> CAPTCHA Solvers
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
            Solve text, image, and audio CAPTCHAs automatically with our
            reliable, high-speed APIs. Designed for developers, automation, and
            data-intensive workflows.
          </p>
          <div className="mt-10 flex gap-4 justify-center flex-wrap">
            <a
              href="mailto:support@captchasolver.com"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-background font-semibold hover:bg-primary/90 transition"
            >
              Talk to Sales <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/signup"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-lg border border-primary px-6 py-3 text-primary font-semibold hover:bg-primary hover:text-background transition"
            >
              Get Free Trial <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Products Section */}
        <section className="relative max-w-screen-2xl mx-auto px-4 py-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Solve Any CAPTCHA, Effortlessly
          </h2>
          <motion.div
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {products.map((product) => (
              <ProductCard
                key={product.title}
                title={product.title}
                description={product.description}
                example={product.example}
                apiEndpoint={product.apiEndpoint}
                icon={product.icon}
                variants={itemVariants}
              />
            ))}
          </motion.div>
        </section>
        <CaptchaFlowSection />
        <WhyBetterSection />
        <div className="px-4">
          <CTASection />
        </div>
      </main>
    </div>
  );
}
