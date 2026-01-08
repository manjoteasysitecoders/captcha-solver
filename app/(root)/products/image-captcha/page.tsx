"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Upload,
  Image,
  ScanText,
  Zap,
  CheckCircle2,
  ShieldCheck,
  Code2,
  Sparkles,
  Loader2,
} from "lucide-react";
import WhyBetterSection from "@/components/WhyBetterSection";
import CTASection from "@/components/CTASection";
import PricingSection from "@/components/PricingSection";

export default function ImageCaptchaPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-primary/10 via-transparent to-transparent" />

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
              Instantly extract text from image-based CAPTCHA challenges using a
              simple, synchronous API designed for authorized automation and
              testing workflows.
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
              Image CAPTCHAs display distorted or stylized characters inside an
              image to differentiate humans from automated systems. They are
              intentionally noisy, warped, or low-resolution to block bots.
            </p>
            <p className="text-lg">
              Solving them manually is slow and error-prone. Our API processes
              such images and returns the detected text when possible, removing
              the need for manual input during authorized workflows.
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
            <h2 className="text-4xl font-bold text-background">How it Works</h2>
            <p className="mt-4 text-background">
              The workflow is intentionally simple and synchronous.{" "}
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
                1. Submit an Image or URL
              </h4>
              <p className="text-center text-background">
                Send a request containing either an image file
                (multipart/form-data) or a direct image URL.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-12 h-12 text-primary" />
              <h4 className="text-xl font-semibold text-background">
                2. Image Processing
              </h4>
              <p className="text-center text-background">
                The API analyzes the image and attempts to recognize embedded
                characters.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <Sparkles className="w-12 h-12 text-primary" />
              <h4 className="text-xl font-semibold text-background">
                3. Receive the result
              </h4>
              <p className="text-center text-background">
                The extracted text is returned directly in the API response.
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
            <h2 className="text-4xl font-bold">Key Capabilities</h2>
            <p className="mt-4">
              Designed to integrate cleanly into developer workflows.
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
                icon: ScanText,
                title: "Image CAPTCHA Recognition",
                desc: "Processes image-based CAPTCHA challenges and returns detected text.",
              },
              {
                icon: Zap,
                title: "Synchronous Responses",
                desc: "Results are returned directly in the response body when the request completes.",
              },
              {
                icon: CheckCircle2,
                title: "High Accuracy",
                desc: "Reliable recognition even with distorted, warped, or noisy images.",
              },
              {
                icon: ShieldCheck,
                title: "Secure Authentication",
                desc: "All requests require a valid API key and sufficient credits.",
              },
              {
                icon: Code2,
                title: "API-First Integration",
                desc: "Simple REST endpoint compatible with modern stacks and automation tools.",
              },
              {
                icon: Image,
                title: "Common Image Formats",
                desc: "Supports standard image formats such as PNG and JPEG when accessible via URL.",
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
            Use the Image CAPTCHA API by sending a POST request with either an
            image URL or an uploaded image file.
          </p>

          <pre className="rounded-2xl bg-gray-700 p-6 text-sm text-green-400 overflow-x-auto">
            {`POST /api/public/imageCaptcha

Content-Type: application/json
x-api-key: YOUR_API_KEY

Request:
{
  "url": "https://example.com/captcha.png"
}

Response:
{
"success": true,
"message": "Text extracted successfully.",
"text": "<extracted text>"
}`}
          </pre>

          <div className="space-y-4 text-background">
            <h4 className="text-xl font-semibold text-background">
              Step 1: Send the Request
            </h4>
            <p>
              Include your API key and either an image URL or an uploaded image
              file. URLs must point directly to the image (PNG, JPG, or GIF).
            </p>
            <h4 className="text-xl font-semibold text-background">
              Step 2: Receive Result
            </h4>
            <p>
              The API will respond with a JSON object containing the extracted
              text. Read the returned text from it.
            </p>
            <h4 className="text-xl font-semibold text-background">
              Step 3: Handle Errors
            </h4>
            The API returns appropriate HTTP status codes, such as
            <ul className="mt-2">
              <li>
                <code className="text-red-400">400</code> for missing or invalid
                input.
              </li>
              <li>
                <code className="text-red-400">401</code> for missing or invalid
                API key.
              </li>
              <li>
                <code className="text-red-400">403</code> for insufficient
                credits.
              </li>
              <li>
                <code className="text-red-400">500</code> for internal
                processing errors.
              </li>
            </ul>
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
