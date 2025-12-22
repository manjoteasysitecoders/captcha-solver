"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Upload,
  Image as ImageIcon,
  Sparkles,
  Loader2,
} from "lucide-react";
import WhyBetterSection from "@/components/WhyBetterSection";
import CTASection from "@/components/CTASection";
import PricingSection from "@/components/PricingSection";

export default function ImageCaptchaPage() {
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
              Image-to-Text CAPTCHA Solver
            </h1>
            <p className="mt-6 text-lg">
              Instantly extract text from image CAPTCHAs using advanced AI
              vision models. Trusted by 500+ developers for automation and
              verification workflows.
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
              href="/docs/api/image-captcha"
              className="inline-flex items-center gap-2 rounded-xl border border-primary px-8 py-4 font-semibold text-primary hover:bg-primary hover:text-background transition"
            >
              View API Docs <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* WHAT IS CAPTCHA */}
        <section className="mt-10 items-center space-y-12">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold">What is an Image CAPTCHA?</h2>
            <p className="text-lg">
              Image CAPTCHAs embed distorted or stylized characters inside
              images to prevent automated access. They are intentionally noisy,
              warped, or low-resolution to block bots.
            </p>
            <p>
              Solving them manually is slow and error-prone. Our AI-powered
              solver decodes text accurately, handling complex distortions and
              backgrounds effortlessly.
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
              Simple three-step workflow to extract text from any image CAPTCHA:
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
                1. Submit Image URL
              </h4>
              <p className="text-center text-background">
                Provide the CAPTCHA image URL for processing.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-12 h-12 text-primary" />
              <h4 className="text-xl font-semibold text-background">
                2. AI Processing
              </h4>
              <p className="text-center text-background">
                Advanced AI detects characters, corrects distortions, and
                extracts text accurately.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <Sparkles className="w-12 h-12 text-primary" />
              <h4 className="text-xl font-semibold text-background">
                3. Receive Text
              </h4>
              <p className="text-center text-background">
                Get the extracted text instantly, ready for automation,
                verification, or scraping workflows.
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
              and accurate Image CAPTCHA solutions.
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
                title: "AI-Powered OCR",
                desc: "Automatically detects and extracts text from complex CAPTCHA images.",
              },
              {
                icon: Loader2,
                title: "Fast Processing",
                desc: "Solves CAPTCHAs in under 10 seconds, supporting real-time workflows.",
              },
              {
                icon: Sparkles,
                title: "High Accuracy",
                desc: "Reliable recognition even with distorted, warped, or noisy images.",
              },
              {
                icon: ImageIcon,
                title: "Batch Support",
                desc: "Process hundreds of images simultaneously with minimal latency.",
              },
              {
                icon: Upload,
                title: "Flexible Integration",
                desc: "Works with API, scripts, or automation tools for easy deployment.",
              },
              {
                icon: Loader2,
                title: "Multiple Formats",
                desc: "Supports PNG, JPEG, GIF, and other common image formats.",
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
            Use this endpoint to extract text from any CAPTCHA image. Simply
            send a POST request with the image URL and receive the extracted
            text in response.
          </p>

          <pre className="rounded-2xl bg-gray-700 p-6 text-sm text-green-400 overflow-x-auto">
            {`POST /api/public/imageCaptcha
Content-Type: application/json

{
  "imageUrl": "https://example.com/captcha.png"
}

Response:
{
  "text": "Extracted CAPTCHA text"
}`}
          </pre>

          <div className="space-y-4 text-background">
            <h4 className="text-xl font-semibold text-background">
              Step 1: Submit Image URL
            </h4>
            <p>
              Send a POST request to{" "}
              <code className="text-green-400">/api/public/imageCaptcha</code>{" "}
              with a valid image URL. Ensure the URL points directly to the
              image file (PNG, JPG, or GIF).
            </p>

            <h4 className="text-xl font-semibold text-background">
              Step 2: Receive Result
            </h4>
            <p>
              The API will respond with a JSON object containing the extracted
              text. Handle the response as needed for your automation,
              verification, or scraping workflow.
            </p>

            <h4 className="text-xl font-semibold text-background">
              Step 3: Error Handling
            </h4>
            <p>
              If the image URL is missing or invalid, the API returns a{" "}
              <code className="text-red-400">400</code> error. For processing
              failures, a <code className="text-red-400">500</code> error is
              returned with a descriptive message.
            </p>
          </div>

          <p className="text-center text-background/50 mt-6">
            Integrate this endpoint into your scripts or applications to
            automate CAPTCHA solving seamlessly.
          </p>
        </motion.div>
        <PricingSection />
        <WhyBetterSection />
        <CTASection />
      </main>
    </div>
  );
}
