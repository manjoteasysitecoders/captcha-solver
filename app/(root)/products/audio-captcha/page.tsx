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

export default function VoiceCaptchaPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Gradient */}
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
              <Sparkles className="w-4 h-4" /> AI-Powered Audio OCR
            </span>
            <h1 className="mt-6 text-5xl md:text-6xl font-extrabold tracking-tight">
              Audio-to-Text CAPTCHA Solver
            </h1>
            <p className="mt-6 text-lg">
              Instantly transcribe and extract answers from audio CAPTCHAs using
              advanced AI models. Trusted by developers for automation and
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
              href="/docs/api/audio-captcha"
              className="inline-flex items-center gap-2 rounded-xl border border-primary px-8 py-4 font-semibold text-primary hover:bg-primary hover:text-background transition"
            >
              View API Docs <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* WHAT IS CAPTCHA */}
        <section className="items-center">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold">What is a Audio CAPTCHA?</h2>
            <p className="text-lg">
              Audio CAPTCHAs play audio prompts or spoken challenges to prevent
              automated bots from accessing content.
            </p>
            <p>
              Solving them manually is slow and error-prone. Our AI-powered
              solver transcribes and extracts answers accurately, even from
              noisy or complex audio.
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
              Simple three-step workflow to extract answers from audio CAPTCHAs:
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
                1. Upload or Provide URL
              </h4>
              <p className="text-center text-background">
                Upload an audio file or provide a link to the audio CAPTCHA.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-12 h-12 text-primary" />
              <h4 className="text-xl font-semibold text-background">
                2. AI Transcription
              </h4>
              <p className="text-center text-background">
                Advanced AI transcribes the audio and extracts the correct
                answer.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <Sparkles className="w-12 h-12 text-primary" />
              <h4 className="text-xl font-semibold text-background">
                3. Receive Answer
              </h4>
              <p className="text-center text-background">
                Get the transcribed answer instantly for automation,
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
              and accurate audio CAPTCHA solutions.
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
                title: "AI-Powered Transcription",
                desc: "Automatically transcribes and extracts answers from audio CAPTCHAs.",
              },
              {
                icon: Loader2,
                title: "Fast Processing",
                desc: "Transcribes audio and returns results in seconds for real-time workflows.",
              },
              {
                icon: Sparkles,
                title: "High Accuracy",
                desc: "Reliable transcription even from noisy or distorted audio clips.",
              },
              {
                icon: ImageIcon,
                title: "Batch Support",
                desc: "Process multiple audio CAPTCHAs simultaneously with minimal latency.",
              },
              {
                icon: Upload,
                title: "Flexible Integration",
                desc: "Works with API, scripts, or automation tools for easy deployment.",
              },
              {
                icon: Loader2,
                title: "Supports Multiple Formats",
                desc: "Handles MP3, WAV, and other common audio formats.",
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

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-7xl mx-auto bg-foreground rounded-3xl p-10 shadow-xl space-y-6"
        >
          <h4 className="text-3xl font-bold text-background text-center mb-4">
            Audio CAPTCHA API Example
          </h4>

          <p className="text-background text-center max-w-3xl mx-auto">
            Transcribe and extract answers from audio CAPTCHAs by sending either
            an audio URL or uploading an audio file. The API returns a clean,
            human-readable sentence extracted from the audio.
          </p>

          {/* CODE BLOCK */}
          <pre className="rounded-2xl bg-gray-700 p-6 text-sm text-green-400 overflow-x-auto">
            {`POST /api/public/voiceCaptcha
Content-Type: multipart/form-data

Form Data:
- file: captcha-audio.mp3

OR

POST /api/public/voiceCaptcha
Content-Type: application/json

{
  "url": "https://example.com/audio-captcha.mp3"
}

Response:
{
  "sentence": "please select all images containing traffic lights"
}`}
          </pre>

          {/* STEPS */}
          <div className="space-y-4 text-background">
            <h4 className="text-xl font-semibold text-background">
              Step 1: Submit Audio
            </h4>
            <p>
              Send a <code className="text-green-400">POST</code> request to{" "}
              <code className="text-green-400">/api/public/voiceCaptcha</code>{" "}
              with either:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                A direct audio URL (<code className="text-green-400">url</code>{" "}
                field in JSON)
              </li>
              <li>
                An uploaded audio file (
                <code className="text-green-400">file</code> in
                multipart/form-data)
              </li>
            </ul>

            <h4 className="text-xl font-semibold text-background">
              Step 2: AI Transcription
            </h4>
            <p>
              The API uses advanced speech-to-text models to transcribe the
              audio, automatically removing noise such as static sounds and
              formatting the sentence for accuracy.
            </p>

            <h4 className="text-xl font-semibold text-background">
              Step 3: Receive Result
            </h4>
            <p>
              A successful response returns a JSON object containing the
              extracted CAPTCHA sentence, ready for automation or verification
              workflows.
            </p>

            <h4 className="text-xl font-semibold text-background">
              Error Handling
            </h4>
            <p>
              If neither an audio file nor URL is provided, the API returns a{" "}
              <code className="text-red-400">400</code> error. Processing
              failures return a <code className="text-red-400">500</code> error
              with a descriptive message.
            </p>
          </div>

          <p className="text-center text-background/50 mt-6">
            Integrate this endpoint into your scripts, bots, or automation
            pipelines to solve audio CAPTCHAs at scale.
          </p>
        </motion.div>

        <PricingSection />
        <WhyBetterSection />
        <CTASection />
      </main>
    </div>
  );
}
