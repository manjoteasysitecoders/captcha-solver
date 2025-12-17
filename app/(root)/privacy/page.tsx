"use client";

import { motion, Variants } from "framer-motion";
import {
  CreditCard,
  XCircle,
  Globe,
  RefreshCcw,
  Power,
  Server,
  Settings,
  Mail,
  Scale,
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
    title: "1. Introduction",
    content: `CAPTCHA Solver (“we”, “our”, or “us”) respects your privacy and is committed to protecting your personal information. By using our website, APIs, or services, you consent to the practices described in this policy.`,
  },
  {
    icon: <XCircle className="w-6 h-6 text-primary" />,
    title: "2. Information We Collect",
    content: (
      <>
        <p>We may collect personal information including:</p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Contact details (name, email)</li>
          <li>Account credentials (username, password)</li>
          <li>Payment information when purchasing services</li>
          <li>Usage and log data (IP address, browser, API usage)</li>
          <li>Communication records from inquiries or support requests</li>
        </ul>
      </>
    ),
  },
  {
    icon: <Globe className="w-6 h-6 text-primary" />,
    title: "3. How We Use Your Data",
    content: (
      <>
        <p>Your personal information is used to provide and improve our services, including:</p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Account registration and management</li>
          <li>Processing payments and managing subscriptions</li>
          <li>Delivering support, updates, and communications</li>
          <li>Analyzing service usage for performance and improvement</li>
        </ul>
      </>
    ),
  },
  {
    icon: <RefreshCcw className="w-6 h-6 text-primary" />,
    title: "4. Cookies & Tokens",
    content: `We use cookies and similar technologies to enhance your experience, store login sessions, and analyze website performance. You can disable cookies in your browser, but some features may not function properly.`,
  },
  {
    icon: <Power className="w-6 h-6 text-primary" />,
    title: "5. Sharing Your Data",
    content: `We do not sell your personal information. We may share data with trusted third-party services to provide our services, such as payment processors or email communication platforms, always in accordance with this policy.`,
  },
  {
    icon: <Server className="w-6 h-6 text-primary" />,
    title: "6. Data Storage & Security",
    content: `We retain personal information only as long as necessary for the purposes described. We implement appropriate technical and organizational measures to safeguard your data, but cannot guarantee absolute security against unauthorized access.`,
  },
  {
    icon: <Settings className="w-6 h-6 text-primary" />,
    title: "7. Data From Minors",
    content: `Our services are not directed to children under 18. We do not knowingly collect personal data from minors. If we become aware of data collected from a minor, we will take reasonable steps to delete it promptly.`,
  },
  {
    icon: <Mail className="w-6 h-6 text-primary" />,
    title: "8. Your Privacy Rights",
    content: `You have the right to access, correct, delete, or restrict the processing of your personal data. You may also withdraw consent at any time or object to automated processing.`,
  },
  {
    icon: <Scale className="w-6 h-6 text-primary" />,
    title: "9. Account Management",
    content: `You can review or update your account information through your account settings. Requests to delete accounts will be processed in accordance with this Privacy Policy, subject to legal and operational requirements.`,
  },
  {
    icon: <CreditCard className="w-6 h-6 text-primary" />,
    title: "10. Changes to This Policy",
    content: `We may update this Privacy Policy periodically. Changes will be indicated by updating the “Last Updated” date. Continued use of our services constitutes acceptance of the revised policy.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <header className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">
          Privacy <span className="text-primary">Policy</span>
        </h1>
        <p className="mt-4 text-muted-foreground text-lg">
          This Privacy Policy explains how CAPTCHA Solver collects, uses, stores, and protects your personal information when you use our services.
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
          <h2 className="text-2xl font-semibold text-foreground mb-2">Contact Us</h2>
          <p className="text-muted-foreground">
            For questions or concerns regarding this Privacy Policy, please contact us at{" "}
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
