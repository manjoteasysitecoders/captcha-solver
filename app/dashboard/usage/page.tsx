"use client";

import StatCard from "@/components/dashboard/StatCard";
import { Zap, Activity, Package } from "lucide-react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function UsagePage() {
  const { data: usage } = useSWR("/api/usage", fetcher);
  const { data: requests } = useSWR("/api/requests", fetcher);

  return (
    <div className="space-y-8">
      <p className="text-2xl font-bold">Usage</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <StatCard
          title="Total Requests"
          value={(usage && usage.totalRequests) || 0}
          icon={<Activity size={40} />}
        />
        <StatCard
          title="Requests Today"
          value={(usage && usage.requestsToday) || 0}
          icon={<Zap size={40} />}
        />
        <StatCard
          title="Credits Used"
          value={(usage && usage.creditsUsed) || 0}
          icon={<Package size={40} />}
        />
      </div>

      <div className="rounded-3xl p-8 shadow-lg border border-primary/50 bg-primary/10">
        <h2 className="text-xl font-bold mb-4">Recent Requests</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/30">
                <th className="p-3 text-muted-foreground">Date</th>
                <th className="p-3 text-muted-foreground">Request ID</th>
                <th className="p-3 text-muted-foreground">Status</th>
                <th className="p-3 text-muted-foreground">Credits Used</th>
              </tr>
            </thead>
            <tbody>
              {(requests || []).map((req: any) => (
                <tr
                  key={req.id}
                  className="border-b border-border/20 hover:bg-primary/5"
                >
                  <td className="p-3">
                    {new Date(req.createdAt).toLocaleString()}
                  </td>
                  <td className="p-3">{req.id}</td>
                  <td className="p-3">{req.status}</td>
                  <td className="p-3">{req.credits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
