"use client";

import { Tier } from "@/lib/data";

const tierConfig: Record<Tier, { bg: string; text: string; border: string }> = {
  Scenthooders: {
    bg: "bg-loreal-sand/50",
    text: "text-loreal-gold",
    border: "border-loreal-champagne/40",
  },
  Scentmaker: {
    bg: "bg-loreal-champagne/10",
    text: "text-loreal-gold-dark",
    border: "border-loreal-gold/50",
  },
  Scentsetters: {
    bg: "bg-loreal-charcoal/5",
    text: "text-loreal-charcoal",
    border: "border-loreal-charcoal/30",
  },
};

export default function TierBadge({ tier, size = "sm" }: { tier: Tier; size?: "sm" | "md" | "lg" }) {
  const config = tierConfig[tier];
  const sizeClasses = {
    sm: "text-[9px] px-2 py-0.5",
    md: "text-[10px] px-2.5 py-1",
    lg: "text-xs px-3 py-1.5",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 font-sans font-semibold tracking-[0.12em] uppercase border ${config.bg} ${config.text} ${config.border} ${sizeClasses[size]}`}
    >
      {tier === "Scentsetters" && <span className="text-[8px]">◆</span>}
      {tier}
    </span>
  );
}
