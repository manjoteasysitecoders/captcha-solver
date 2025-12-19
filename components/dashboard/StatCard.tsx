import { ReactNode } from "react";

export default function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: ReactNode;
}) {
  return (
    <div
      className="
        relative flex flex-col md:flex-row
        items-center md:items-start
        gap-4
        rounded-2xl border border-primary/50 bg-card
        p-4 md:p-6
        shadow-sm transition-all
        hover:-translate-y-1 hover:shadow-md
      "
    >
      <div
        className="
          flex h-10 w-10 md:h-12 md:w-12
          items-center justify-center p-2
          rounded-full bg-primary/10 text-primary
        "
      >
        {icon}
      </div>

      <div className="text-center md:text-left">
        <p className="text-xs md:text-sm">
          {title}
        </p>
        <p className="text-2xl font-bold tracking-tight">
          {value}
        </p>
      </div>
    </div>
  );
}
