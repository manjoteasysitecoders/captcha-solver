import { BarChart3, CreditCard, KeyRound, LayoutDashboard } from "lucide-react";

export const navLinks = [
  {
    title: "Products",
    href: "/products",
    external: false,
  },
  {
    title: "Pricing",
    href: "/pricing",
    external: false,
  },
  {
    title: "Blog",
    href: "/blogs",
    external: false,
  },
  {
    title: "Documentation",
    href: "/docs",
    external: true,
  },
];

export const dashboardSidebarLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/usage", label: "Usage", icon: BarChart3 },
  { href: "/dashboard/api-key", label: "API Keys", icon: KeyRound },
  { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
  { href: "/docs", label: "View Documentation", icon: BarChart3 },
];
