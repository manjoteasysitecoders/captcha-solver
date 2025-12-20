"use client";

import { useEffect, useState } from "react";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "react-toastify";
import { useUser } from "@/context/UserContext";

interface ApiKey {
  id: string;
  createdAt: string;
  lastUsedAt: string | null;
  key?: string;
}

export default function ApiKeyPage() {
  const { user, refreshUser } = useUser(); 
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // Fetch existing API key
  useEffect(() => {
    async function fetchKey() {
      try {
        const res = await fetch("/api/api-key");
        const data = await res.json();
        setKeys(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchKey();
  }, []);

  const copyKey = (key?: string) => {
    if (!key) {
      toast("API key is hidden. Regenerate to copy.");
      return;
    }
    navigator.clipboard.writeText(key);
    toast("API Key copied!");
  };

  const generateKey = async () => {
    if (!user?.currentPlan) {
      toast("Purchase a plan from Billing page to generate an API key.");
      return;
    }

    if(user?.currentPlan && user.credits <= 0) {
      toast("You do not have sufficient credits to generate API key. Purchase a plan to get credits.");
    }

    setLoadingId("regen");
    try {
      const res = await fetch("/api/api-key", { method: "POST" });
      if (!res.ok) {
        const error = await res.json();
        toast(error.error || "Cannot generate API key.");
        return;
      }

      const data = await res.json();
      setKeys([
        {
          id: "current",
          createdAt: data.createdAt,
          lastUsedAt: null,
          key: data.key,
        },
      ]);

      toast("Copy this key now. It will not be shown again.");

      await refreshUser();
    } catch (err) {
      console.error(err);
      toast("Failed to generate API key.");
    } finally {
      setLoadingId(null);
    }
  };

  if (loading) return <p>Loading API keys...</p>;

  return (
    <div className="space-y-8">
      <div className="text-center lg:text-left">
        <h1 className="text-2xl sm:text-4xl font-bold">API Management</h1>
        <p className="text-foreground/80 mt-2">Generate your API key securely.</p>
      </div>

      {keys.length === 0 ? (
        <div className="flex flex-col gap-4">
          <button
            onClick={generateKey}
            className="self-start px-4 py-2 rounded-lg bg-primary text-background hover:border hover:border-primary hover:text-primary hover:bg-background transition"
          >
            Generate API Key
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {keys.map((api) => (
            <div
              key={api.id}
              className="rounded-3xl p-4 sm:p-6 shadow-lg border border-primary/50 bg-primary/10 flex flex-col gap-4 transition hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
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
                    onClick={generateKey}
                    className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition"
                    aria-label="Regenerate API Key"
                  >
                    {loadingId === "regen" ? "..." : <RefreshCw size={18} />}
                  </button>
                </div>
              </div>

              <code className="block w-full p-3 rounded-xl font-mono border border-primary/20 bg-primary/10 break-all text-sm sm:text-base">
                {api.key ?? "********************************"}
              </code>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
