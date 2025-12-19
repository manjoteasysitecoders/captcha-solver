"use client";

import useSWR from "swr";
import { useState } from "react";
import { Copy, RefreshCw } from "lucide-react";

interface ApiKey {
  id: string;
  key: string;
  createdAt: string;
  lastUsedAt: string | null;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function ApiKeyPage() {
const { data: apiKeys, mutate } = useSWR<ApiKey[]>("/api/api-keys", fetcher);

const keys = Array.isArray(apiKeys) ? apiKeys : [];
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    alert("API Key copied to clipboard!");
  };

  const regenerateKey = async (id: string) => {
    setLoadingId(id);
    try {
      const res = await fetch("/api/api-keys/regenerate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Failed to regenerate key");

      const newKey = await res.json();
      // revalidate
      mutate();
      alert("API Key regenerated!");
    } catch (err: any) {
      alert(err.message || "Error");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-center lg:text-left">
        Your API Keys
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
        {keys.map((api: any) => (
          <div
            key={api.id}
            className="rounded-3xl p-4 sm:p-6 shadow-lg border border-primary/50 bg-primary/10 flex flex-col gap-4 transition hover:shadow-xl"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
              <h2 className="text-md sm:text-lg font-semibold">
                Created: {new Date(api.createdAt).toLocaleDateString()}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => copyKey(api.key)}
                  className="p-2 rounded-lg bg-primary/20 hover:bg-primary/30 transition"
                  aria-label="Copy API Key"
                >
                  <Copy size={18} />
                </button>
                <button
                  onClick={() => regenerateKey(api.id)}
                  className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition"
                  aria-label="Regenerate API Key"
                >
                  {loadingId === api.id ? "..." : <RefreshCw size={18} />}
                </button>
              </div>
            </div>

            <code className="block w-full p-3 rounded-xl font-mono border border-primary/20 bg-primary/10 break-all text-sm sm:text-base">
              {api.key}
            </code>
          </div>
        ))}
      </div>
    </div>
  );
}
