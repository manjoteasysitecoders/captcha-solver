"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PricingCard } from "@/components/PricingCard";
import Link from "next/link";
import { formatDate } from "@/lib/formatDate";

type Payment = {
  id: string;
  createdAt: string;
  amount: number;
  plan: {
    name: string;
    credits: number;
  };
  invoiceVisible: boolean;
};

export default function PlansPage() {
  const [history, setHistory] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetch("/api/user/plans/history");
        if (!res.ok) throw new Error();
        const data = await res.json();
        setHistory(data);
      } catch {
        toast.error("Failed to load plan history");
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, []);

  return (
    <div className="space-y-12">
      <section className="space-y-2">
        <header className="text-left">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Choose Your Plan
          </h1>
          <p className="mt-2 text-muted-foreground">
            Upgrade anytime. Simple pricing, no hidden fees.
          </p>
        </header>

        <PricingCard />
      </section>

      <section className="space-y-6">
        <header>
          <h2 className="text-2xl font-extrabold tracking-tight">
            Billing History
          </h2>
          <p className="text-sm text-muted-foreground">
            View your previous purchases and invoices
          </p>
        </header>

        {loading && (
          <div className="rounded-2xl border border-primary bg-card p-8 text-center shadow-lg">
            Loading history…
          </div>
        )}

        {!loading && !history.length && (
          <div className="rounded-2xl border border-primary bg-card p-8 text-center text-muted-foreground shadow-lg">
            No plans purchased yet.
          </div>
        )}

        <div className="space-y-4">
          {history.map((payment) => (
            <div
              key={payment.id}
              className="rounded-2xl border border-primary bg-card p-5 shadow-lg transition hover:bg-muted/40"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-lg font-semibold">{payment.plan.name}</p>

                  <p className="text-sm text-muted-foreground">
                    {payment.plan.credits} credits · ₹{payment.amount}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Purchased on{" "}
                    {formatDate(payment.createdAt)}
                  </p>
                </div>

                {payment.invoiceVisible ? (
                  <Link
                    href={`/api/invoice/${payment.id}`}
                    target="_blank"
                    className="inline-flex items-center justify-center rounded-xl border border-primary px-5 py-2 text-sm font-semibold hover:bg-primary hover:text-background transition"
                  >
                    View Invoice
                  </Link>
                ) : (
                  <span className="inline-flex rounded-full bg-amber-200 px-4 py-2 text-xs font-medium text-amber-900">
                    Invoice pending
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
