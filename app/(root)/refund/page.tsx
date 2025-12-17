"use client";

import { motion, Variants } from "framer-motion";
import {
  CreditCard,
  XCircle,
  RefreshCcw,
  Mail,
  Settings,
  Server,
  Power,
  Globe,
} from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const sections = [
  {
    icon: <CreditCard className="w-6 h-6 text-primary" />,
    title: "1. Overview",
    content: `CAPTCHA Solver provides intangible digital services, including CAPTCHA solving APIs. Due to the nature of these services, refunds are generally not provided. Please ensure you understand the service and its usage before making a purchase.`,
  },
  {
    icon: <XCircle className="w-6 h-6 text-primary" />,
    title: "2. Cancellation Requests",
    content: (
      <>
        <p>
          To request a cancellation, please contact our support team via email at{" "}
          <a
            href="mailto:support@captchasolver.com"
            className="text-primary font-medium hover:underline"
          >
            support@captchasolver.com
          </a>
          . Your cancellation request will only be considered valid once you
          receive confirmation from our accounts team.
        </p>
      </>
    ),
  },
  {
    icon: <Globe className="w-6 h-6 text-primary" />,
    title: "3. Refund Policy",
    content: (
      <>
        <p>
          As our services are digital and intangible, we do not offer refunds
          once access has been granted. Refunds will not be issued due to:
        </p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Lack of understanding or competence in using the service</li>
          <li>Changes in your business needs or priorities</li>
          <li>
            Compatibility issues with third-party software, scripts,
            extensions, or tools
          </li>
          <li>Disagreement with the results of API requests or outputs</li>
        </ul>
      </>
    ),
  },
  {
    icon: <RefreshCcw className="w-6 h-6 text-primary" />,
    title: "4. Support & Assistance",
    content: (
      <p>
        Our support team is available to assist you before, during, and after
        your purchase. We provide documentation, guides, and step-by-step
        instructions to ensure proper use of the service. Please contact us
        with any questions or issues via email at{" "}
        <a
          href="mailto:support@captchasolver.com"
          className="text-primary font-medium hover:underline"
        >
          support@captchasolver.com
        </a>
        .
      </p>
    ),
  },
  {
    icon: <Power className="w-6 h-6 text-primary" />,
    title: "5. Changes to This Policy",
    content: `CAPTCHA Solver may update this Refund Policy at any time. Any changes will be indicated by updating the “Last Updated” date. Continued use of our services constitutes acceptance of the updated policy.`,
  },
];

export default function RefundPolicyPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <header className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">
          Refund <span className="text-primary">Policy</span>
        </h1>
        <p className="mt-4 text-muted-foreground text-lg">
          This Refund Policy explains how CAPTCHA Solver handles cancellations
          and refunds for our services.
        </p>
      </header>

      {/* Sections */}
      <motion.div
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {sections.map((section, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="flex flex-col md:flex-row gap-4 bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 text-primary">
              {section.icon}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                {section.title}
              </h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                {section.content}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Contact */}
        <motion.div
          variants={itemVariants}
          className="bg-card border border-border rounded-2xl p-6"
        >
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Contact Us
          </h2>
          <p className="text-muted-foreground">
            For questions regarding this Refund Policy, please contact our
            support team at{" "}
            <a
              href="mailto:support@captchasolver.com"
              className="text-primary font-medium hover:underline"
            >
              support@captchasolver.com
            </a>
            .
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
