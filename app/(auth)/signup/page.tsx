"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function SignInPage() {
  return (
    <motion.section
      className="relative min-h-screen overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-background to-background" />

      <div className="container mx-auto flex min-h-screen items-center px-4">
        <div className="grid w-full gap-16 xl:grid-cols-2 items-center">
          <motion.div
            className="hidden xl:flex flex-col justify-center"
            variants={containerVariants}
          >
            <motion.h1
              className="text-5xl font-bold leading-tight tracking-tight"
              variants={itemVariants}
            >
              Secure access to your
              <span className="block text-primary">automation platform</span>
            </motion.h1>

            <motion.p className="mt-6 max-w-lg text-lg" variants={itemVariants}>
              Manage API keys, monitor usage, and deploy AI-powered CAPTCHA
              solutions with confidence and speed.
            </motion.p>

            <motion.div
              className="mt-10 space-y-4"
              variants={containerVariants}
            >
              {[
                "Image CAPTCHA Recognition",
                "Text CAPTCHA Parsing",
                "Audio CAPTCHA Transcription",
              ].map((item) => (
                <motion.div
                  key={item}
                  className="flex items-center gap-4 text-base font-medium"
                  variants={itemVariants}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary">
                    ✓
                  </span>
                  {item}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="
              relative mx-auto w-full max-w-md
              rounded-3xl border border-primary/20
              bg-background/80 backdrop-blur-xl
              p-8 shadow-2xl
            "
          >
            <div className="text-center">
              <h2 className="text-3xl font-semibold tracking-tight">
                Welcome aboard
              </h2>
              <p className="mt-2 text-sm text-foreground/50">
                Create your account
              </p>
            </div>

            <SignupForm />

            <p className="mt-8 text-center text-sm">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="font-semibold text-primary hover:underline"
              >
                Sign in
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!result || result.error) {
        throw new Error("Auto login failed");
      }

      window.location.href = "/pricing";
    } catch (err: any) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        className="
          h-12 w-full rounded-xl
          border border-primary/50 bg-background
          px-4 text-base
          focus:outline-none focus:ring-2 focus:ring-primary
        "
        required
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="
          h-12 w-full rounded-xl
          border border-primary/50 bg-background
          px-4 text-base
          focus:outline-none focus:ring-2 focus:ring-primary
        "
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="
          mt-2 h-12 w-full
          rounded-xl bg-primary
          font-semibold text-primary-foreground
          transition hover:bg-primary/90 disabled:opacity-60
        "
      >
        {loading ? "Creating account..." : "Sign Up"}
      </button>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </form>
  );
}
