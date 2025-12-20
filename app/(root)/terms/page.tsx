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
    title: "1. Acceptance of Terms",
    content: (
      <>
        By accessing or using CAPTCHA Solver (“Service”, “we”, “our”, or “us”), you agree to be bound by these Terms & Conditions, our Privacy Policy, and any additional guidelines or policies referenced herein. If you do not agree, you must discontinue use of the Service.
      </>
    ),
  },
  {
    icon: <XCircle className="w-6 h-6 text-primary" />,
    title: "2. Description of Services",
    content: (
      <>
        CAPTCHA Solver provides AI-powered CAPTCHA solving solutions through web interfaces and APIs. The Service is intended for developers, automation workflows, and businesses requiring scalable CAPTCHA recognition.
      </>
    ),
  },
  {
    icon: <Globe className="w-6 h-6 text-primary" />,
    title: "3. Payments & Billing",
    content: (
      <>
        Certain features of the Service require payment. By purchasing a plan or credits, you agree to provide accurate billing information. Payments are processed via third-party payment providers. All fees are non-refundable unless explicitly stated otherwise.
      </>
    ),
  },
  {
    icon: <RefreshCcw className="w-6 h-6 text-primary" />,
    title: "4. Account Responsibilities",
    content: (
      <>
        You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use or security breach.
      </>
    ),
  },
  {
    icon: <Power className="w-6 h-6 text-primary" />,
    title: "5. Acceptable Use Policy",
    content: (
      <>
        You agree not to use the Service for unlawful purposes, including but not limited to fraud, abuse, circumvention of legal safeguards, or violation of third-party rights. We reserve the right to suspend or terminate accounts that violate these terms.
      </>
    ),
  },
  {
    icon: <Server className="w-6 h-6 text-primary" />,
    title: "6. Third-Party Services",
    content: (
      <>
        The Service may integrate with third-party tools, payment platforms, or communication services. CAPTCHA Solver is not responsible for the content, security, or practices of any third-party services.
      </>
    ),
  },
  {
    icon: <Settings className="w-6 h-6 text-primary" />,
    title: "7. Data Protection & Privacy",
    content: (
      <>
        We process personal data in accordance with our Privacy Policy. By using the Service, you consent to the collection, use, and storage of information as described therein.
      </>
    ),
  },
  {
    icon: <Mail className="w-6 h-6 text-primary" />,
    title: "8. Service Availability",
    content: (
      <>
        While we strive for high availability, we do not guarantee that the Service will be uninterrupted or error-free. Maintenance, updates, or unforeseen events may cause temporary disruptions.
      </>
    ),
  },
  {
    icon: <Scale className="w-6 h-6 text-primary" />,
    title: "9. Limitation of Liability",
    content: (
      <>
        To the maximum extent permitted by law, CAPTCHA Solver shall not be liable for any indirect, incidental, consequential, or special damages arising out of or related to your use of the Service.
      </>
    ),
  },
  {
    icon: <CreditCard className="w-6 h-6 text-primary" />,
    title: "10. Termination",
    content: (
      <>
        We reserve the right to suspend or terminate your access to the Service at our discretion, with or without notice, if you violate these Terms or applicable laws.
      </>
    ),
  },
  {
    icon: <XCircle className="w-6 h-6 text-primary" />,
    title: "11. Governing Law & Jurisdiction",
    content: (
      <>
        These Terms shall be governed by and construed in accordance with applicable laws. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the competent courts.
      </>
    ),
  },
  {
    icon: <Globe className="w-6 h-6 text-primary" />,
    title: "12. Changes to These Terms",
    content: (
      <>
        We may update these Terms from time to time. Continued use of the Service after changes become effective constitutes acceptance of the revised Terms.
      </>
    ),
  },
];

export default function TermsAndConditionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <header className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">
          Terms & <span className="text-primary">Conditions</span>
        </h1>
        <p className="mt-4 text-lg">
          These Terms & Conditions govern your access to and use of CAPTCHA Solver's website, APIs, and related services.
        </p>
      </header>

      {/* Content */}
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
            <div className="flex items-center justify-center w-14 h-12 rounded-full bg-primary/20 text-primary">
              {section.icon}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                {section.title}
              </h2>
              <div className="leading-relaxed space-y-2">
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
            Contact Information
          </h2>
          <p>
            If you have questions about these Terms & Conditions, please contact us at{" "}
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
