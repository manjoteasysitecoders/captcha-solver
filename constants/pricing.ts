export const pricingPlans = [
  {
    id: "Starter",
    name: "Starter",
    description:
      "For individual developers who are testing CAPTCHA-solving APIs.",
    price: "₹300",
    credits: "3000",
    speed: "Standard",
    highlight: false,
    features: [
      "Image, Text & Audio CAPTCHA APIs",
      "Pay-per-request usage",
      "Dashboard access",
      "Basic support",
    ],
  },
  {
    id: "Pro",
    name: "Pro",
    description:
      "Best for production workloads and higher request volume.",
    price: "₹1200",
    credits: "14000",
    speed: "High",
    highlight: true,
    features: [
      "All CAPTCHA APIs unlocked",
      "Faster processing priority",
      "Higher concurrency limits",
      "Usage analytics",
      "Priority support",
    ],
  },
  {
    id: "Enterprise",
    name: "Enterprise",
    description:
      "Custom solutions for large-scale or specialized use cases.",
    price: "₹2500",
    credits: "28000",
    speed: "Maximum",
    highlight: false,
    features: [
      "Dedicated processing capacity",
      "Custom rate limits",
      "SLA & uptime guarantees",
      "Dedicated account manager",
    ],
  },
];
