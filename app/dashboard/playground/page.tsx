"use client";

import { useState } from "react";
import { Image, Type, Mic } from "lucide-react";
import { toast } from "react-toastify";

type CaptchaType = "image" | "text" | "voice";

export default function PlaygroundPage() {
  const [apiKey, setApiKey] = useState("");
  const [type, setType] = useState<CaptchaType>("image");
  const [value, setValue] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function solveCaptcha() {
    if (!apiKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      let res: Response;

      if (type === "image") {
        res = await fetch("/api/public/imageCaptcha", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
          },
          body: JSON.stringify({ imageUrl: value }),
        });
      }

      if (type === "text") {
        res = await fetch("/api/public/textCaptcha", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
          },
          body: JSON.stringify({ text: value }),
        });
      }

      if (type === "voice") {
        const form = new FormData();
        if (file) form.append("file", file);
        if (value) form.append("url", value);

        res = await fetch("/api/public/voiceCaptcha", {
          method: "POST",
          headers: {
            "x-api-key": apiKey,
          },
          body: form,
        });
      }

      const data = await res!.json();

      if (!res!.ok) {
        throw new Error(data.error || "Invalid API key or request failed");
      }

      setResult(data);
      toast.success("Captcha solved successfully");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center lg:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold">CAPTCHA Playground</h1>
        <p className="text-foreground/80 mt-2">
          Solve CAPTCHA easily with our interactive playground.
        </p>
      </div>

      <p className="text-primary font-medium my-4">Choose CAPTCHA type.</p>

      {/* CAPTCHA Type Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Selector
          active={type === "image"}
          onClick={() => {
            setType("image");
            setValue("");
          }}
          icon={<Image />}
          label="Image CAPTCHA"
        />
        <Selector
          active={type === "text"}
          onClick={() => {
            setType("text");
            setValue("");
          }}
          icon={<Type />}
          label="Text CAPTCHA"
        />
        <Selector
          active={type === "voice"}
          onClick={() => {
            setType("voice");
            setValue("");
            setFile(null);
          }}
          icon={<Mic />}
          label="Voice CAPTCHA"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* API Key Input */}
        <div className="rounded-3xl border border-primary bg-card p-4 shadow-lg transition hover:shadow-xl">
          <label className="text-sm font-semibold text-primary">
            Enter API Key
          </label>
          <input
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="xxxxxxxxxxxxxxxxx"
            className="w-full mt-2 px-4 py-3 rounded-2xl border border-primary font-mono focus:ring-2 focus:ring-primary focus:outline-none transition"
          />
          <p className="text-xs mt-4">
            Use an active API key from the API Key page.
          </p>
        </div>

        {/* Input Section */}
        <div className="rounded-3xl p-6 border border-primary bg-card shadow-md space-y-4 transition hover:shadow-lg">
          {type !== "text" && (
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={
                type === "image"
                  ? "Enter image URL"
                  : "Enter audio URL (optional)"
              }
              className="w-full px-4 py-3 rounded-2xl border border-primary focus:ring-2 focus:ring-primary focus:outline-none transition"
            />
          )}

          {type === "text" && (
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Paste CAPTCHA text"
              className="w-full px-4 py-3 rounded-2xl border border-primary focus:ring-2 focus:ring-primary focus:outline-none transition resize-none h-24"
            />
          )}

          {type === "voice" && (
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="block w-full text-sm text-primary file:rounded-full file:p-2 file:border-0 file:bg-primary/20 file:text-primary hover:file:bg-primary/30 transition"
            />
          )}

          <button
            onClick={solveCaptcha}
            disabled={loading}
            className="w-full py-3 rounded-2xl bg-primary text-background font-semibold hover:bg-primary/90 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Solving..." : "Solve CAPTCHA"}
          </button>
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="rounded-3xl p-6 border border-primary bg-primary/10 shadow-inner space-y-2 transition hover:shadow-lg">
          <h3 className="font-semibold text-primary text-lg">Result</h3>
          <pre className="text-sm whitespace-pre-wrap bg-background p-4 rounded-xl border border-primary overflow-x-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

function Selector({
  active,
  icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        rounded-3xl border-2 p-5 flex items-center justify-center gap-4 transition
        ${
          active
            ? "bg-primary text-background border-primary shadow-lg scale-105"
            : "bg-primary/10 text-primary border-primary hover:bg-primary/20 hover:scale-105"
        }
      `}
    >
      <div className="text-2xl">{icon}</div>
      <span className="font-medium text-sm">{label}</span>
    </button>
  );
}
