"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ComponentType } from "react";

interface ProductCardProps {
  title: string;
  description: string;
  example: string;
  apiEndpoint: string;
  icon: ComponentType<{ className?: string }>;
  variants?: Variants;
}

export default function ProductCard({
  title,
  description,
  example,
  apiEndpoint,
  icon: Icon,
  variants,
}: ProductCardProps) {
  return (
    <motion.div
      variants={variants}
      className="
        group relative flex flex-col
        rounded-2xl border border-border
        bg-background/80 backdrop-blur
        p-6 shadow-sm
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-xl
        hover:border-primary/40
      "
    >
      {/* Gradient hover glow */}
      <div
        className="
          pointer-events-none absolute inset-0
          rounded-2xl opacity-0
          group-hover:opacity-100
          transition
          bg-gradient-to-br from-primary/10 via-transparent to-transparent
        "
      />

      {/* Header */}
      <div className="relative flex items-center gap-4 mb-4">
        <div
          className="
            flex h-12 w-12 items-center justify-center
            rounded-xl bg-primary/10 text-primary
            group-hover:bg-primary/20 transition
          "
        >
          <Icon className="h-6 w-6" />
        </div>

        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      </div>

      {/* Description */}
      <p className="relative text-sm leading-relaxed mb-4">{description}</p>

      {/* API Example */}
      <div className="relative mt-2 flex flex-col gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-primary">
          Example API Request
        </span>

        <pre
          className="
    relative rounded-lg
    bg-muted/60
    p-4 text-xs
    font-mono
    border border-primary/50
    whitespace-pre-wrap
    break-words
  "
        >
          {example}
        </pre>
      </div>

      {/* CTA */}
      <a
        href={apiEndpoint}
        target="_blank"
        rel="noopener noreferrer"
        className="
          relative mt-auto pt-6
          inline-flex items-center gap-2
          text-sm font-semibold text-primary
          transition
          group-hover:gap-3
          hover:underline
        "
      >
        View more <ArrowRight className="h-4 w-4" />
      </a>
    </motion.div>
  );
}
