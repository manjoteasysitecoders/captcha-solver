import {
  CreditCard,
  Dock,
  History,
  KeyRound,
  LayoutDashboard,
  Percent,
  RotateCcw,
  Users,
} from "lucide-react";

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
  { href: "/dashboard/plans", label: "Purchase a Plan", icon: CreditCard },
  { href: "/dashboard/api-key", label: "Generate API Key", icon: KeyRound },
  { href: "/docs", label: "View Documentation", icon: Dock },
  { href: "/dashboard/playground", label: "Solve CAPTCHA", icon: RotateCcw },
];

export const adminDashboardSidebarLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Users", href: "/admin/dashboard/users", icon: Users },
  { name: "Plans", href: "/admin/dashboard/plans", icon: CreditCard },
  { name: "Coupons", href: "/admin/dashboard/coupons", icon: Percent },
  { name: "View History", href: "/admin/dashboard/history", icon: History },
  { name: "Documentation", href: "/docs", icon: Dock },
  // { name: "Settings", href: "/admin/dashboard/settings", icon: Settings },
];
