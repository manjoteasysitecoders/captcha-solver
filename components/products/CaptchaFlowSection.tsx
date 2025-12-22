"use client";

import { FC, useEffect, useRef } from "react";
import {
  User,
  Key,
  Image,
  FileText,
  Speaker,
  ArrowRight,
  Check,
} from "lucide-react";

const captchaTypes = [
  { icon: Image, label: "Image CAPTCHA" },
  { icon: FileText, label: "Text CAPTCHA" },
  { icon: Speaker, label: "Audio CAPTCHA" },
];

const Node = ({
  icon: Icon,
  label,
  accent,
}: {
  icon: any;
  label: string;
  accent: string;
}) => (
  <div className="flex flex-col items-center gap-3">
    <div className="w-20 h-20 rounded-2xl bg-white shadow-lg flex items-center justify-center transition-transform hover:scale-105">
      <Icon className={`w-10 h-10 ${accent}`} />
    </div>
    <span className="text-sm font-medium">{label}</span>
  </div>
);

const CaptchaFlowSection: FC = () => {
  const radius = 120;
  const orbitRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    let angle = 0;
    let frameId: number;

    const animate = () => {
      angle += 0.3;

      orbitRefs.current.forEach((el, idx) => {
        if (!el) return;

        const baseAngle = (360 / captchaTypes.length) * idx;
        const current = angle + baseAngle;

        el.style.transform = `
          translate(-50%, -50%)
          rotate(${current}deg)
          translateX(${radius}px)
          rotate(-${current}deg)
        `;
      });

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <section className="relative w-full py-20 bg-linear-to-b from-primary/10 to-background">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-20">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          How Our CAPTCHA API Works
        </h2>
        <p className="mt-4">
          A seamless verification flow — secure, fast, and developer-friendly.
        </p>
      </div>

      <div className="relative mx-auto max-w-6xl rounded-3xl border border-white/30 bg-primary/50 shadow-xl p-10">
        <div className="relative flex flex-col md:flex-row items-center justify-center gap-16 md:gap-20">
          <Node icon={User} label="User Request" accent="text-blue-500" />
          <ArrowRight className="hidden md:block w-8 h-8" />

          {/* API Engine */}
          <div className="relative w-72 h-72 flex items-center justify-center">
            {/* Core */}
            <div className="absolute z-10 w-28 h-28 rounded-full bg-white shadow-xl flex flex-col items-center justify-center">
              <Key className="w-10 h-10 text-yellow-500" />
              <span className="mt-1 text-xs font-semibold text-black">CAPTCHA API</span>
            </div>

            {/* Orbiting items */}
            {captchaTypes.map((item, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  if (el) orbitRefs.current[idx] = el;
                }}
                className="absolute top-1/2 left-1/2 w-20 h-20 rounded-xl bg-background shadow-lg flex flex-col items-center justify-center gap-1 transition-transform hover:scale-110"
              >
                <item.icon className="w-6 h-6 text-purple-500" />
                <span className="text-[11px] font-medium text-center">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <ArrowRight className="hidden md:block w-8 h-8" />
          <Node icon={Check} label="CAPTCHA Solved" accent="text-green-500" />
        </div>
      </div>
    </section>
  );
};

export default CaptchaFlowSection;
