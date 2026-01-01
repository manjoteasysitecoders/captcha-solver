import { CreditCard, Dock, KeyRound, LayoutDashboard, RotateCcw, Users } from "lucide-react";

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
  // {
  //   title: "Blog",
  //   href: "/blogs",
  //   external: false,
  // },
  {
    title: "Documentation",
    href: "/docs",
    external: true,
  },
];

export const dashboardSidebarLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
  { href: "/dashboard/api-key", label: "Generate API Key", icon: KeyRound },
  { href: "/docs", label: "View Documentation", icon: Dock },
  { href: "/dashboard/playground", label: "Solve CAPTCHA", icon: RotateCcw }
];

export const adminDashboardSidebarLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Users", href: "/admin/dashboard/users", icon: Users },
//   { name: "API Keys", href: "/admin/dashboard/api-keys", icon: Key },
//   { name: "Logs", href: "/admin/dashboard/logs", icon: FileText },
  { name: "Plans", href: "/admin/dashboard/plans", icon: CreditCard },
  {  name: "Documentation", href: "/docs", icon: Dock },
  // { name: "Settings", href: "/admin/dashboard/settings", icon: Settings },
];

