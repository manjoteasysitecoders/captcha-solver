"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Loader2, ImageIcon, Upload } from "lucide-react";
import WhyBetterSection from "@/components/WhyBetterSection";
import CTASection from "@/components/CTASection";
import PricingSection from "@/components/PricingSection";

export default function TextCaptchaPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />

      <main className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        {/* HERO */}
        <section className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
              <Sparkles className="w-4 h-4" /> AI-Powered OCR
            </span>
            <h1 className="mt-6 text-5xl md:text-6xl font-extrabold tracking-tight">
              Text-to-Text CAPTCHA Solver
            </h1>
            <p className="mt-6 text-lg">
              Instantly extract answers from text CAPTCHAs using advanced AI
              models. Trusted by 500+ developers for quizzes, verification, and
              automation workflows.
            </p>
          </motion.div>

          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <a
              href="/signup"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-background font-semibold shadow hover:bg-primary/90 transition"
            >
              Try Live Demo <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/docs/api/text-captcha"
              className="inline-flex items-center gap-2 rounded-xl border border-primary px-8 py-4 font-semibold text-primary hover:bg-primary hover:text-background transition"
            >
              View API Docs <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* WHAT IS CAPTCHA */}
        <section className="items-center">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold">What is a Text CAPTCHA?</h2>
            <p className="text-lg">
              Text CAPTCHAs present questions, scrambled words, or puzzles to
              prevent automated bots from accessing content.
            </p>
            <p>
              Solving them manually can be slow and error-prone. Our AI-powered
              solver extracts answers instantly and accurately, even for complex
              or obfuscated text.
            </p>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="space-y-12 bg-foreground py-16 rounded-4xl px-8 shadow-2xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-background">How It Works</h2>
            <p className="mt-4 text-background">
              Simple three-step workflow to extract answers from text CAPTCHAs:
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            <div className="flex flex-col items-center gap-4">
              <Upload className="w-12 h-12 text-primary" />
              <h4 className="text-xl font-semibold text-background">
                1. Submit Text
              </h4>
              <p className="text-center text-background">
                Provide the text CAPTCHA or question for processing.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-12 h-12 text-primary" />
              <h4 className="text-xl font-semibold text-background">
                2. AI Processing
              </h4>
              <p className="text-center text-background">
                Advanced AI interprets the text and computes or extracts the
                correct answer.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <Sparkles className="w-12 h-12 text-primary" />
              <h4 className="text-xl font-semibold text-background">
                3. Receive Answer
              </h4>
              <p className="text-center text-background">
                Get the extracted answer instantly, ready for automation,
                verification, or quizzes.
              </p>
            </div>
          </motion.div>
        </section>

        {/* FEATURES */}
        <section className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold">Key Features</h2>
            <p className="mt-4">
              Designed for developers and enterprises seeking fast, reliable,
              and accurate text CAPTCHA solutions.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-3 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {[
              {
                icon: Upload,
                title: "AI-Powered Parsing",
                desc: "Automatically detects and extracts answers from text CAPTCHAs.",
              },
              {
                icon: Loader2,
                title: "Fast Processing",
                desc: "Solves text CAPTCHAs in under a second for real-time workflows.",
              },
              {
                icon: Sparkles,
                title: "High Accuracy",
                desc: "Reliable recognition and extraction, even with complex or obfuscated text.",
              },
              {
                icon: ImageIcon,
                title: "Batch Support",
                desc: "Process multiple text CAPTCHAs at once with minimal latency.",
              },
              {
                icon: Upload,
                title: "Flexible Integration",
                desc: "Works with API, scripts, or automation tools for easy deployment.",
              },
              {
                icon: Loader2,
                title: "Supports Multiple Text Types",
                desc: "Handles arithmetic, copy tasks, and multi-choice questions seamlessly.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-card p-6 shadow hover:shadow-lg transition"
              >
                <feature.icon className="w-10 h-10 text-primary" />
                <h4 className="text-xl font-semibold">{feature.title}</h4>
                <p className="text-center">{feature.desc}</p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* API Example */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-7xl mx-auto bg-foreground rounded-3xl p-10 shadow-xl space-y-6"
        >
          <h4 className="text-3xl font-bold text-background text-center mb-4">
            API Example
          </h4>

          <p className="text-background text-center">
            Send a POST request to extract the final answer from text CAPTCHA.
          </p>

          <pre className="rounded-2xl bg-gray-700 p-6 text-sm text-green-400 overflow-x-auto">
            {`POST /api/public/textCaptcha
Content-Type: application/json

{
  "text": "Question or CAPTCHA text"
}

Response:
{
  "answer": "Extracted final answer"
}`}
          </pre>

          <div className="space-y-4 text-background">
            <h4 className="text-xl font-semibold text-background">
              Step 1: Submit Text
            </h4>
            <p>
              Send a POST request to{" "}
              <code className="text-green-400">/api/public/textCaptcha</code>{" "}
              with the text to solve.
            </p>

            <h4 className="text-xl font-semibold text-background">
              Step 2: Receive Result
            </h4>
            <p>
              The API responds with a JSON object containing the extracted
              answer.
            </p>

            <h4 className="text-xl font-semibold text-background">
              Step 3: Error Handling
            </h4>
            <p>
              Missing or invalid text returns a{" "}
              <code className="text-red-400">400</code> error. Processing
              failures return a <code className="text-red-400">500</code> error
              with a descriptive message.
            </p>
          </div>
        </motion.div>

        <PricingSection />
        <WhyBetterSection />
        <CTASection />
      </main>
    </div>
  );
}
