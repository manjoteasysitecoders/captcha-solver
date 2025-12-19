"use client"

import StatCard from "@/components/dashboard/StatCard";
import { Zap, Activity, Package } from "lucide-react";
import { useSession } from "next-auth/react";
import useSWR from "swr";

export default function DashboardPage() {
  const { data: session } = useSession();

  const fetcher = (url: string) => fetch(url).then(res => res.json());
  const userId = session?.user?.id;
  const { data: userData } = useSWR(session ? `/api/user/${userId}` : null, fetcher);
  const { data: apiKeys } = useSWR(session ? "/api/api-keys" : null, fetcher);

  return (
    <div className="space-y-8">
      <p className="text-2xl font-bold">Dashboard Overview</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <StatCard
          title="Credits Remaining"
          value={userData ? userData.credits : 0}
          icon={<Package size={40} />}
        />
        <StatCard
          title="Requests Today"
          value="87"
          icon={<Activity size={40} />}
        />
        <StatCard
          title="Current Plan"
          value="Starter"
          icon={<Zap size={40} />}
        />
      </div>

      <div className="rounded-3xl p-8 shadow-lg border border-primary/50 bg-primary/10">
        <h2 className="text-xl font-bold mb-4">API Key</h2>
        <code className="block p-4 rounded-xl font-mono border border-primary/20 bg-primary/10">
          {apiKeys && apiKeys.length > 0 ? apiKeys[0].key : ""}
        </code>
      </div>
    </div>
  );
}
