"use client";

import { LogOut, Zap } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { dashboardSidebarLinks } from "@/constants/navLinks";
import { useUser } from "@/context/UserContext";

export default function Sidebar({ open }: { open: boolean }) {
  const pathname = usePathname();
  const { user } = useUser();

  const planName = user?.currentPlan?.name ?? "Free";
  const totalCredits = user?.currentPlan?.credits ?? 0;
  const remainingCredits = user?.credits ?? 0;
  const usedCredits = Math.max(totalCredits - remainingCredits, 0);

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-40
        bg-white shadow-2xl
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
          total={totalCredits}
          plan={planName}
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
}

export function CreditsCard({ open, used, total, plan }: CreditsCardProps) {
  const percentage = Math.min((used / total) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`
        mt-4 rounded-2xl border border-border
        bg-card text-card-foreground shadow-lg
        ${open ? "p-4" : "p-3"}
      `}
    >
      {/* Header */}
      <div
        className={`flex items-center ${
          open ? "justify-between" : "justify-center"
        }`}
      >
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Zap className="h-4 w-4 text-primary" />
          {open && <span>{plan} Plan</span>}
        </div>

        {open && (
          <span className="text-xs text-muted-foreground">
            {total - used} left
          </span>
        )}
      </div>

      {/* Progress */}
      <div className="mt-3 h-2 w-full rounded-full bg-muted overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
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
