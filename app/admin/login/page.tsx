"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Eye, EyeOff, Loader2, Shield } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Login failed");
        return;
      }

      router.push("/admin/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background via-primary to-foreground px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl p-8"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 rounded-full bg-foreground/20 mb-3">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="text-sm text-white/60 mt-1">
            Secure access to admin dashboard
          </p>
        </div>

        <label className="block text-md text-white/80 mb-2">Username</label>
        <input
          type="text"
          placeholder="admin"
          className="w-full mb-5 px-4 py-3 rounded-lg bg-white/10 text-white placeholder:text-white/40 border border-white/10 focus:outline-none focus:ring-2 focus:ring-foreground"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label className="block text-md text-white/80 mb-2">Password</label>
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder:text-white/40 border border-white/10 focus:outline-none focus:ring-2 focus:ring-foreground"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-foreground hover:bg-foreground/80 transition py-3 font-semibold text-white disabled:opacity-60"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
