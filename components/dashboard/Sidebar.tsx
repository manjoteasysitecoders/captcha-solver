"use client";

import { LogOut, Zap } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { dashboardSidebarLinks } from "@/constants/navLinks";
import { useUser } from "@/context/UserContext";
import { FREE_CREDITS } from "@/constants/credits";

export default function Sidebar({ open }: { open: boolean }) {
  const pathname = usePathname();
  const { user } = useUser();

  const planName = user?.currentPlan?.name ?? "Free";

  const freeCredits = FREE_CREDITS;
  const purchasedCredits = user?.totalCredits ?? 0;

  const totalCreditsEarned = freeCredits + purchasedCredits;
  const remainingCredits = user?.credits ?? 0;
  const usedCredits = Math.max(totalCreditsEarned - remainingCredits, 0);

  let validity: number | null = null;

  const lastPayment = user?.payments?.[0];
  if (lastPayment?.plan?.validity && lastPayment?.verifiedAt) {
    const start = new Date(lastPayment.verifiedAt);
    const end = new Date(start);
    end.setDate(end.getDate() + lastPayment.plan.validity);

    const diff = Math.ceil(
      (end.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
    validity = Math.max(diff, 0);
  }

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-40
       bg-white/50 shadow-2xl
        transition-all duration-300 flex flex-col
        ${open ? "w-70 px-6" : "w-20 px-3"}
      `}
    >
      <div className="h-20 flex items-center justify-center">
        {open ? (
          <h1 className="text-xl font-extrabold text-primary">
            CAPTCHA SOLVER
          </h1>
        ) : (
          <span className="text-primary font-bold">C</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {dashboardSidebarLinks.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              title={!open ? item.label : undefined}
              className={`
                group flex items-center gap-3 rounded-xl py-3 transition
                ${open ? "px-4" : "justify-center"}
                ${
                  active
                    ? "bg-primary text-background shadow-lg"
                    : "hover:bg-primary hover:text-background"
                }
              `}
            >
              <Icon size={20} />
              {open && <span className="font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Credits */}
      {user && (
        <CreditsCard
          open={open}
          used={usedCredits}
          total={totalCreditsEarned}
          plan={planName}
          image={user?.currentPlan?.image}
          validity={validity}
        />
      )}

      {/* Logout */}
      <button
        onClick={() => signOut({ callbackUrl: "/signin" })}
        title={!open ? "Logout" : undefined}
        className={`
          flex items-center gap-3 rounded-xl py-3 text-red-600
          hover:bg-red-50 transition
          ${open ? "px-4" : "justify-center"}
        `}
      >
        <LogOut size={20} />
        {open && <span>Logout</span>}
      </button>
    </aside>
  );
}

interface CreditsCardProps {
  open: boolean;
  used: number;
  total: number;
  plan: string;
  image?: string | null;
  validity?: number | null;
}

export function CreditsCard({
  open,
  used,
  total,
  plan,
  image,
  validity,
}: CreditsCardProps) {
  const percentage = total > 0 ? Math.min((used / total) * 100, 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`
        mt-4 rounded-2xl border border-primary
        bg-card shadow-lg
        ${open ? "p-4" : "p-3"}
      `}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        {image ? (
          <img
            src={image}
            alt={plan}
            className="h-8 w-8 rounded-md object-cover"
          />
        ) : (
          <Zap className="h-5 w-5 text-primary" />
        )}

        {open && (
          <div className="flex flex-col">
            <span className="text-sm font-semibold">{plan} Plan</span>
            {validity !== null && (
              <span className="text-xs text-muted-foreground">
                {validity} days left
              </span>
            )}
          </div>
        )}
      </div>

      {/* Progress */}
      <div className="mt-3 h-2 w-full rounded-full bg-muted overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1 }}
        />
      </div>

      {/* Footer */}
      {open && (
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>{used} used</span>
          <span>{total} total</span>
        </div>
      )}
    </motion.div>
  );
}
