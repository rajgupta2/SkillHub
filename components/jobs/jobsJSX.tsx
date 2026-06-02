"use client";
import { Badge } from "@/components/ui/badge";


export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Logo({ name, src }: { name: string; src?: string | null }) {
  if (src) {
    return (
      <div className="h-11 w-11 overflow-hidden rounded-2xl border bg-white shadow-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={`${name} logo`} className="h-full w-full object-cover" />
      </div>
    );
  }

  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("")
    .slice(0, 2);

  return (
    <div className="grid h-11 w-11 place-items-center rounded-2xl border bg-muted text-sm font-semibold shadow-sm">
      {initials || "CO"}
    </div>
  );
}

export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
      {children}
    </Badge>
  );
}

export function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border bg-white/70 px-4 py-3 shadow-sm backdrop-blur dark:bg-slate-900/40">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-base font-semibold">{value}</p>
    </div>
  );
}