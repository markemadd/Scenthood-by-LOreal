"use client";

import { useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import BottomNav from "@/components/BottomNav";
import { intelligenceData } from "@/lib/data";

const {
  weeklyEngagement, brandEngagement, accordsByAge, contentPerformance,
  regionBreakdown, cltvMultiple, organicCAC, industryCAC, retentionRate,
  weeklyActiveRate, avgCCSPerMember, contentCreatorRate,
} = intelligenceData;

// ── Heat map colour scale: blue (low) → yellow (mid) → red (high) ──
function heatColor(intensity: number): string {
  if (intensity >= 88) return "#c0392b";
  if (intensity >= 78) return "#e74c3c";
  if (intensity >= 68) return "#e67e22";
  if (intensity >= 58) return "#f39c12";
  if (intensity >= 48) return "#f1c40f";
  if (intensity >= 38) return "#3498db";
  return "#2980b9";
}

// ── Sparkline ──
function Sparkline({ data, color = "#A48B75" }: { data: number[]; color?: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 80, h = 32;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * (h - 4)}`).join(" ");
  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={(data.length - 1) / (data.length - 1) * w} cy={h - ((data[data.length - 1] - min) / range) * (h - 4)} r="3" fill={color} />
    </svg>
  );
}

// ── Weekly chart ──
function WeeklyChart() {
  const maxVal = Math.max(...weeklyEngagement.map((w) => w.votes));
  const h = 130;
  return (
    <div>
      <div className="flex items-end gap-2 h-[130px] mb-2">
        {weeklyEngagement.map((w, i) => {
          const voteH = (w.votes / maxVal) * h;
          const reviewH = (w.reviews / maxVal) * h;
          return (
            <div key={w.week} className="flex-1 flex flex-col items-center gap-0.5 group cursor-default">
              <div className="hidden group-hover:flex flex-col items-center mb-1">
                <div className="bg-loreal-charcoal text-white text-xs px-2.5 py-1.5 whitespace-nowrap font-sans">
                  {w.votes.toLocaleString()} votes · +{w.newMembers} members
                </div>
              </div>
              <div className="flex items-end gap-0.5 w-full">
                <motion.div initial={{ height: 0 }} animate={{ height: voteH }}
                  transition={{ duration: 0.8, delay: i * 0.08, ease: "easeOut" }}
                  className="flex-1 bg-loreal-champagne" style={{ minHeight: 2 }} />
                <motion.div initial={{ height: 0 }} animate={{ height: reviewH }}
                  transition={{ duration: 0.8, delay: i * 0.08 + 0.1, ease: "easeOut" }}
                  className="flex-1 bg-loreal-sand" style={{ minHeight: 2 }} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex gap-2 mb-3">
        {weeklyEngagement.map((w) => (
          <div key={w.week} className="flex-1 text-center text-xs text-loreal-slate font-medium">{w.week}</div>
        ))}
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-loreal-champagne" /><span className="text-xs text-loreal-slate font-medium">Votes</span></div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-loreal-sand" /><span className="text-xs text-loreal-slate font-medium">Reviews</span></div>
      </div>
    </div>
  );
}

// ── World Heat Map ──
const GEO_MARKERS = [
  { cx: 490, cy: 148, label: "Paris",       intensity: 95, city: "Western Europe" },
  { cx: 472, cy: 142, label: "London",      intensity: 82, city: "UK" },
  { cx: 516, cy: 153, label: "Milan",       intensity: 78, city: "Italy" },
  { cx: 503, cy: 140, label: "Berlin",      intensity: 70, city: "Germany" },
  { cx: 180, cy: 148, label: "New York",    intensity: 83, city: "East Coast US" },
  { cx: 143, cy: 158, label: "LA",          intensity: 68, city: "West Coast US" },
  { cx: 198, cy: 140, label: "Toronto",     intensity: 55, city: "Canada" },
  { cx: 732, cy: 156, label: "Seoul",       intensity: 74, city: "South Korea" },
  { cx: 748, cy: 168, label: "Tokyo",       intensity: 71, city: "Japan" },
  { cx: 712, cy: 172, label: "Shanghai",    intensity: 65, city: "China" },
  { cx: 582, cy: 194, label: "Dubai",       intensity: 68, city: "UAE" },
  { cx: 565, cy: 202, label: "Riyadh",      intensity: 55, city: "Saudi Arabia" },
  { cx: 242, cy: 262, label: "São Paulo",   intensity: 55, city: "Brazil" },
  { cx: 212, cy: 232, label: "Mexico",      intensity: 44, city: "Mexico" },
  { cx: 762, cy: 290, label: "Sydney",      intensity: 42, city: "Australia" },
];

function WorldMap() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative overflow-hidden bg-loreal-cream border-t border-loreal-border">
      <svg viewBox="0 0 900 370" className="w-full" style={{ maxHeight: 310 }}>
        {/* Ocean / background — use the app cream */}
        <rect x="0" y="0" width="900" height="370" fill="#EDE4DC" />

        {/* Land masses — warm white */}
        {/* North America */}
        <path d="M80,80 L220,70 L240,90 L260,100 L250,140 L230,160 L210,200 L190,230 L170,260 L155,290 L145,300 L130,280 L115,240 L100,200 L85,160 L75,120 Z"
          fill="#F5EEE8" stroke="#C4B5AC" strokeWidth="1" />
        <path d="M240,30 L290,25 L310,40 L300,65 L270,70 L245,60 Z" fill="#F5EEE8" stroke="#C4B5AC" strokeWidth="1" />
        {/* South America */}
        <path d="M190,230 L240,220 L270,240 L275,270 L265,310 L250,340 L230,360 L210,355 L195,330 L180,300 L175,270 L180,250 Z"
          fill="#F5EEE8" stroke="#C4B5AC" strokeWidth="1" />
        {/* Europe */}
        <path d="M440,80 L540,75 L560,90 L555,120 L540,140 L520,160 L500,165 L480,155 L460,145 L445,130 L435,110 Z"
          fill="#F5EEE8" stroke="#C4B5AC" strokeWidth="1" />
        {/* Africa */}
        <path d="M460,165 L540,160 L570,170 L580,200 L575,240 L560,280 L540,320 L515,345 L490,350 L465,340 L450,310 L440,270 L435,230 L440,195 Z"
          fill="#F5EEE8" stroke="#C4B5AC" strokeWidth="1" />
        {/* Asia */}
        <path d="M555,70 L760,65 L800,80 L820,110 L815,140 L780,155 L750,160 L720,155 L690,160 L660,175 L620,185 L590,195 L565,190 L550,170 L545,145 L550,110 Z"
          fill="#F5EEE8" stroke="#C4B5AC" strokeWidth="1" />
        <path d="M565,185 L605,180 L615,200 L600,220 L580,225 L560,215 Z" fill="#F5EEE8" stroke="#C4B5AC" strokeWidth="1" />
        <path d="M660,175 L720,170 L750,185 L745,215 L720,225 L685,220 L660,205 Z" fill="#F5EEE8" stroke="#C4B5AC" strokeWidth="1" />
        <path d="M755,155 L770,150 L775,165 L765,175 L752,170 Z" fill="#F5EEE8" stroke="#C4B5AC" strokeWidth="1" />
        {/* Australia */}
        <path d="M710,265 L790,260 L820,275 L825,310 L810,340 L775,355 L740,355 L710,340 L700,315 L700,285 Z"
          fill="#F5EEE8" stroke="#C4B5AC" strokeWidth="1" />

        {/* Heat glow blobs (large, semi-transparent, colour-coded) */}
        {GEO_MARKERS.map((m) => (
          <motion.circle key={`glow-${m.label}`}
            cx={m.cx} cy={m.cy}
            r={28 + (m.intensity / 100) * 18}
            fill={heatColor(m.intensity)}
            opacity={0.18}
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }} />
        ))}

        {/* Pulse rings */}
        {GEO_MARKERS.map((m, i) => (
          <motion.circle key={`ring-${m.label}`}
            cx={m.cx} cy={m.cy}
            r={14 + (m.intensity / 100) * 10}
            fill="none"
            stroke={heatColor(m.intensity)}
            strokeWidth="1"
            opacity={0.4}
            animate={{ r: [14 + (m.intensity / 100) * 10, 28 + (m.intensity / 100) * 14], opacity: [0.4, 0] }}
            transition={{ duration: 2.5, delay: i * 0.2, repeat: Infinity, ease: "easeOut" }} />
        ))}

        {/* Core dots */}
        {GEO_MARKERS.map((m, i) => (
          <g key={m.label} onMouseEnter={() => setHovered(m.label)} onMouseLeave={() => setHovered(null)}
            className="cursor-pointer">
            <motion.circle cx={m.cx} cy={m.cy}
              r={6 + (m.intensity / 100) * 7}
              fill={heatColor(m.intensity)}
              stroke="white" strokeWidth="1.5"
              opacity={0.92}
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ delay: 0.2 + i * 0.06, duration: 0.45, type: "spring", stiffness: 200 }} />

            {/* Tooltip */}
            {hovered === m.label && (
              <g>
                <rect x={m.cx - 42} y={m.cy - 44} width={84} height={36} fill="#1A1A1A" rx="2" />
                <text x={m.cx} y={m.cy - 27} textAnchor="middle" fill="white" fontSize="10" fontFamily="Inter, system-ui" fontWeight="600">{m.label}</text>
                <text x={m.cx} y={m.cy - 14} textAnchor="middle" fill={heatColor(m.intensity)} fontSize="9" fontFamily="Inter, system-ui">{m.intensity}% demand intensity</text>
              </g>
            )}
          </g>
        ))}
      </svg>

      {/* Colour legend */}
      <div className="px-5 py-3 border-t border-loreal-border bg-white flex items-center gap-4 flex-wrap">
        <span className="text-xs font-semibold text-loreal-charcoal uppercase tracking-[0.12em]">Demand Intensity</span>
        <div className="flex items-center gap-1">
          {[
            { color: "#2980b9", label: "Low" },
            { color: "#f1c40f", label: "Mid" },
            { color: "#e67e22", label: "High" },
            { color: "#c0392b", label: "Peak" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5 mr-3">
              <div className="w-3 h-3 rounded-full" style={{ background: l.color }} />
              <span className="text-xs text-loreal-slate font-medium">{l.label}</span>
            </div>
          ))}
        </div>
        <span className="text-xs text-loreal-muted ml-auto">Hover cities for details</span>
      </div>
    </div>
  );
}

// ── Trend Forecast ──
const TREND_FORECAST = {
  rising: [
    { accord: "Woody-Amber",     momentum: 92, horizon: "Q3 2025", driver: "East Asia + Gen Z crossover",        brands: ["YSL", "Valentino"] },
    { accord: "Solar Florals",   momentum: 88, horizon: "Summer 2025", driver: "Mediterranean travel aesthetic", brands: ["Lancôme"] },
    { accord: "Clean Musks",     momentum: 81, horizon: "Q4 2025", driver: "Wellness & skin-scent trend",         brands: ["YSL", "Armani"] },
    { accord: "Spicy-Iris",      momentum: 74, horizon: "Q1 2026", driver: "Valentino Born in Roma halo effect", brands: ["Valentino"] },
    { accord: "Smoked Gourmand", momentum: 68, horizon: "Q2 2026", driver: "Gen Z nostalgia + TikTok virality",  brands: ["Mugler"] },
  ],
  declining: [
    { accord: "Heavy Orientals", drop: -18, reason: "Shifting toward lighter, wearable interpretations" },
    { accord: "Classic Fougère", drop: -22, reason: "Perceived as dated by 18–34 demographic" },
    { accord: "Powdery Rose",    drop: -14, reason: "Oversaturation in mid-market; prestige pivot needed" },
  ],
};

// ── Scent Focus Recommendations ──
const SCENT_FOCUS = [
  {
    priority: "01", label: "Double down on Woody-Amber",
    rationale: "Highest cross-demographic appeal. Projected +41% East Asia growth. YSL & Valentino positioned to lead.",
    action: "Commission 2 community votes on Woody-Amber flanker direction for YSL Myslf",
    impact: "High", timeframe: "Now",
  },
  {
    priority: "02", label: "Launch Solar Floral capsule for summer",
    rationale: "Community sentiment peaks around travel & warmth. Lancôme Idôle has the equity to carry a solar interpretation.",
    action: "Fast-track Scentmaker co-creation session for Lancôme summer limited edition",
    impact: "High", timeframe: "Q2 2025",
  },
  {
    priority: "03", label: "Target Gen Z Gourmand gap",
    rationale: "44% of 18–24 members cite gourmand as top accord. No L'Oréal Luxe brand owns this space at prestige level.",
    action: "Mugler × SCENTHOOD co-creation challenge: Gen Z designs the next Angel flanker",
    impact: "Medium", timeframe: "Q3 2025",
  },
  {
    priority: "04", label: "Middle East Oud-Rose amplification",
    rationale: "+29% regional growth. Valentino Oud-Rose Intense has highest regional LIS generation per post.",
    action: "Dedicated MENA Scentsetters cohort + Arabic-language content track",
    impact: "Medium", timeframe: "Q3 2025",
  },
  {
    priority: "05", label: "Clean Musk skin-scent positioning",
    rationale: "Wellness crossover driving 81/100 momentum. YSL Libre & Armani Acqua have natural fit.",
    action: "Commission skin-scent quiz variant + 'your second skin' content series",
    impact: "Medium", timeframe: "Q4 2025",
  },
];

function InViewSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}

// ── Shared section label ──
function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-loreal-charcoal mb-1">{children}</div>;
}

export default function IntelligencePage() {
  const [activeTab, setActiveTab] = useState<"rising" | "declining">("rising");

  return (
    <main className="min-h-screen bg-scent-parchment pb-28 md:pb-0">
      <BottomNav />

      {/* === HERO === */}
      <section className="relative min-h-[60vh] w-full overflow-hidden bg-scent-noir grain">
        <div className="absolute inset-0 opacity-40">
          <Image src="/assets/ysl-myslf.jpg" alt="" fill className="object-cover object-center" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-scent-noir/60 via-scent-noir/70 to-scent-noir" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-12 pt-32 pb-12 md:pb-16">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="eyebrow text-scent-gold mb-4">L&apos;Oréal Luxe · Internal</div>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="display-hero text-scent-parchment leading-none">
            Intelligence
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            className="mt-5 max-w-xl text-scent-parchment/85 text-base md:text-lg">
            Community analytics &amp; strategic foresight. The signal beneath the brief.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
            className="mt-10 grid grid-cols-3 gap-3 max-w-2xl">
            {[
              { label: "Retention",     val: `${retentionRate}%` },
              { label: "Weekly Active", val: `${weeklyActiveRate}%` },
              { label: "Avg LIS",       val: avgCCSPerMember },
            ].map((kpi) => (
              <div key={kpi.label} className="border border-scent-parchment/25 px-4 py-3 text-center">
                <div className="font-display text-2xl text-scent-gold leading-none">{kpi.val}</div>
                <div className="text-[10px] text-scent-parchment/75 uppercase tracking-[0.18em] mt-1.5 font-bold">{kpi.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-5 py-6 space-y-5">

        {/* ── STRATEGIC RECOMMENDATIONS (moved to top) ── */}
        <InViewSection delay={0.1}>
          <div className="border border-loreal-border bg-white">
            <div className="border-b border-loreal-border px-6 py-4">
              <SectionLabel>Strategic Recommendations</SectionLabel>
              <div className="font-serif text-xl text-loreal-charcoal font-light">Where to Direct R&amp;D &amp; Community Energy</div>
            </div>
            <div className="divide-y divide-loreal-border">
              {SCENT_FOCUS.map((rec, i) => (
                <motion.div key={rec.priority} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.45 }}
                  className="p-6 flex gap-5 hover:bg-loreal-cream/25 transition-colors group">
                  <div className="flex-shrink-0 w-10 text-center pt-0.5">
                    <div className="font-serif text-2xl font-light champagne-text leading-none">{rec.priority}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                      <div className="text-base font-bold text-loreal-charcoal">{rec.label}</div>
                      <div className="flex gap-2">
                        <span className={`text-xs uppercase tracking-[0.1em] px-2.5 py-1 font-bold border ${
                          rec.impact === "High"
                            ? "border-emerald-400 text-emerald-700 bg-emerald-50"
                            : "border-loreal-champagne/60 text-loreal-champagne bg-loreal-cream/60"
                        }`}>{rec.impact}</span>
                        <span className="text-xs uppercase tracking-[0.1em] px-2.5 py-1 border border-loreal-border text-loreal-slate font-semibold">{rec.timeframe}</span>
                      </div>
                    </div>
                    <p className="text-sm text-loreal-slate leading-relaxed mb-3">{rec.rationale}</p>
                    <div className="flex items-start gap-2.5 p-3 bg-loreal-cream border-l-2 border-loreal-champagne">
                      <span className="text-loreal-champagne text-sm flex-shrink-0 mt-0.5 font-bold">→</span>
                      <span className="text-sm text-loreal-charcoal font-semibold leading-snug">{rec.action}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </InViewSection>

        {/* ── TREND FORECAST (moved to top) ── */}
        <InViewSection delay={0.05}>
          <div className="border border-loreal-border bg-white">
            <div className="border-b border-loreal-border px-6 py-4 flex items-center justify-between flex-wrap gap-3">
              <div>
                <SectionLabel>Trend Forecast</SectionLabel>
                <div className="font-serif text-xl text-loreal-charcoal font-light">Accord Momentum — Next 12 Months</div>
              </div>
              <div className="flex border border-loreal-border">
                {(["rising", "declining"] as const).map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2.5 text-xs uppercase tracking-[0.12em] font-bold transition-all ${
                      activeTab === tab ? "bg-loreal-charcoal text-white" : "bg-white text-loreal-slate hover:text-loreal-charcoal"
                    }`}>
                    {tab === "rising" ? "↑ Rising" : "↓ Declining"}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === "rising" ? (
                <motion.div key="rising" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }} className="p-5 space-y-3">
                  {TREND_FORECAST.rising.map((t, i) => (
                    <motion.div key={t.accord} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="flex gap-4 p-4 border border-loreal-border hover:border-loreal-champagne/60 hover:bg-loreal-cream/20 transition-all group">
                      <div className="flex-shrink-0 w-14 text-center">
                        <div className="font-serif text-3xl font-light champagne-text leading-none">{t.momentum}</div>
                        <div className="text-xs text-loreal-slate font-medium mt-0.5">score</div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1.5 flex-wrap">
                          <div className="text-sm font-bold text-loreal-charcoal">{t.accord}</div>
                          <div className="text-xs text-emerald-600 font-semibold whitespace-nowrap">{t.horizon}</div>
                        </div>
                        <div className="text-sm text-loreal-slate mb-2.5">{t.driver}</div>
                        <div className="flex flex-wrap gap-1.5">
                          {t.brands.map((b) => (
                            <span key={b} className="text-xs uppercase tracking-[0.1em] px-2.5 py-0.5 border border-loreal-champagne/50 text-loreal-champagne font-semibold">
                              {b}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="w-2 self-stretch bg-loreal-border overflow-hidden flex-shrink-0">
                        <motion.div className="w-full bg-loreal-champagne" initial={{ height: 0 }}
                          animate={{ height: `${t.momentum}%` }}
                          transition={{ duration: 0.8, delay: i * 0.07 + 0.2, ease: "easeOut" }}
                          style={{ marginTop: `${100 - t.momentum}%` }} />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div key="declining" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }} className="p-5 space-y-3">
                  {TREND_FORECAST.declining.map((t, i) => (
                    <motion.div key={t.accord} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="flex gap-4 p-4 border border-loreal-border">
                      <div className="flex-shrink-0 w-14 text-center">
                        <div className="font-serif text-3xl font-light leading-none" style={{ color: "#e74c3c" }}>{t.drop}%</div>
                        <div className="text-xs text-loreal-slate font-medium mt-0.5">YoY</div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-bold text-loreal-charcoal mb-1.5">{t.accord}</div>
                        <div className="text-sm text-loreal-slate">{t.reason}</div>
                      </div>
                    </motion.div>
                  ))}
                  <div className="p-4 bg-loreal-cream border border-loreal-champagne/40">
                    <div className="text-xs font-bold text-loreal-charcoal mb-1.5">Strategic Note</div>
                    <div className="text-sm text-loreal-slate leading-relaxed">
                      Declining accords signal an opportunity to reinterpret rather than abandon — lighter, fresher iterations are gaining traction in SCENTHOOD data.
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </InViewSection>

        {/* ── KPI CARDS ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "CLTV Multiple",    value: `${cltvMultiple}×`,  note: "vs non-members",        trend: "+12% vs last quarter", spark: [1.4,1.6,1.8,1.9,2.1,2.3] },
            { label: "Organic CAC",      value: `€${organicCAC}`,    note: `Industry avg: €${industryCAC}`, trend: `${Math.round((1 - organicCAC / industryCAC) * 100)}% cheaper`, spark: [9.1,7.4,6.8,5.9,5.1,4.2] },
            { label: "Avg LIS / Member", value: `${avgCCSPerMember}`, note: "cross-community",       trend: "+8% this month",        spark: [240,260,275,290,305,312] },
            { label: "Content Creators", value: `${contentCreatorRate}%`, note: "of members post",  trend: "Benchmark: 15%",         spark: [18,22,25,28,30,34] },
          ].map((kpi, i) => (
            <motion.div key={kpi.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }} className="border border-loreal-border p-5 bg-white">
              <SectionLabel>{kpi.label}</SectionLabel>
              <div className="flex items-end justify-between mt-2">
                <div>
                  <div className="font-serif text-3xl font-light champagne-text leading-none">{kpi.value}</div>
                  <div className="text-xs text-loreal-slate mt-1.5">{kpi.note}</div>
                </div>
                <Sparkline data={kpi.spark} />
              </div>
              <div className="mt-3 text-xs font-semibold text-emerald-600">↑ {kpi.trend}</div>
            </motion.div>
          ))}
        </div>

        {/* ── WEEKLY ENGAGEMENT + CONTENT FORMAT ── */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 border border-loreal-border p-6 bg-white">
            <div className="flex items-start justify-between mb-5">
              <div>
                <SectionLabel>Weekly Engagement</SectionLabel>
                <div className="font-serif text-xl text-loreal-charcoal font-light">Votes &amp; Reviews — 8 Weeks</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-emerald-600 font-semibold">+195% votes</div>
                <div className="text-xs text-loreal-slate mt-0.5">vs Week 1</div>
              </div>
            </div>
            <WeeklyChart />
          </div>

          <div className="border border-loreal-border p-6 bg-white">
            <SectionLabel>Content Format ROI</SectionLabel>
            <div className="font-serif text-xl text-loreal-charcoal font-light mb-5">Avg Views by Type</div>
            <div className="space-y-5">
              {contentPerformance.map((cp) => (
                <div key={cp.format}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm font-semibold text-loreal-charcoal">{cp.format}</span>
                    <span className="champagne-text font-serif text-base font-medium">{cp.avgViews.toLocaleString()} views</span>
                  </div>
                  <div className="h-1.5 w-full bg-loreal-border overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${(cp.avgViews / 4200) * 100}%` }}
                      transition={{ duration: 0.9, ease: "easeOut" }} className="h-full bg-loreal-champagne" />
                  </div>
                  <div className="flex justify-between text-xs text-loreal-slate mt-1">
                    <span>+{cp.avgCCS} LIS earned</span>
                    <span>{cp.conversionToVote}% vote after</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 border-t border-loreal-border pt-4 bg-loreal-cream/40 -mx-6 px-6 -mb-6 pb-5">
              <div className="text-xs font-bold text-loreal-charcoal mb-1.5">Key Insight</div>
              <div className="text-xs text-loreal-slate leading-relaxed">
                Video reviewers convert to product page at <span className="font-semibold text-loreal-charcoal">2.4×</span> the rate of text reviewers.
              </div>
            </div>
          </div>
        </div>

        {/* ── BRAND ENGAGEMENT + ACCORD/AGE ── */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border border-loreal-border bg-white">
            <div className="border-b border-loreal-border px-6 py-4">
              <SectionLabel>Brand Performance</SectionLabel>
              <div className="font-serif text-xl text-loreal-charcoal font-light">Posts, Votes &amp; LIS Generated</div>
            </div>
            <div className="p-6 space-y-5">
              {brandEngagement.map((b, i) => (
                <div key={b.brand}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm font-bold text-loreal-charcoal">{b.brand}</span>
                    <div className="flex gap-4">
                      <span className="text-xs text-loreal-slate font-medium">{(b.ccsGenerated / 1000).toFixed(0)}K LIS</span>
                      <span className="text-sm champagne-text font-semibold">{b.posts.toLocaleString()} posts</span>
                    </div>
                  </div>
                  <div className="h-2 w-full bg-loreal-border overflow-hidden">
                    <motion.div initial={{ width: 0 }}
                      animate={{ width: `${(b.posts / brandEngagement[0].posts) * 100}%` }}
                      transition={{ duration: 0.9, delay: i * 0.1, ease: "easeOut" }}
                      className="h-full" style={{ background: `hsl(${38 + i * 12}, ${60 - i * 8}%, ${50 - i * 5}%)` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-loreal-border bg-white">
            <div className="border-b border-loreal-border px-6 py-4">
              <SectionLabel>Demand by Age Group</SectionLabel>
              <div className="font-serif text-xl text-loreal-charcoal font-light">Top Accords × Generation</div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-loreal-border bg-loreal-cream/50">
                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-[0.1em] text-loreal-charcoal">Accord</th>
                    {["18-24", "25-34", "35-44", "45+"].map((age) => (
                      <th key={age} className="text-center px-3 py-3 text-xs font-bold uppercase tracking-[0.1em] text-loreal-charcoal">{age}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {accordsByAge.map((row) => {
                    const vals = [row["18-24"], row["25-34"], row["35-44"], row["45+"]];
                    const max = Math.max(...vals);
                    return (
                      <tr key={row.accord} className="border-b border-loreal-border last:border-b-0 hover:bg-loreal-cream/30 transition-colors">
                        <td className="px-5 py-3 text-sm font-semibold text-loreal-charcoal">{row.accord}</td>
                        {vals.map((v, vi) => (
                          <td key={vi} className="px-3 py-3 text-center">
                            {v === max ? (
                              <span className="inline-flex items-center justify-center bg-loreal-champagne text-white font-sans font-bold text-xs px-2.5 py-1 min-w-[46px]">
                                {v}%
                              </span>
                            ) : (
                              <span className="font-sans text-sm text-loreal-slate font-medium">{v}%</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="px-5 py-4 border-t border-loreal-border bg-loreal-cream/40">
                <div className="text-xs font-bold text-loreal-charcoal mb-1.5">Key Insight</div>
                <div className="text-xs text-loreal-slate leading-relaxed">Gourmand skews heavily Gen Z (44%) — brief opportunity for YSL to capture this audience.</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── WORLD HEAT MAP ── */}
        <InViewSection>
          <div className="border border-loreal-border bg-white">
            <div className="border-b border-loreal-border px-6 py-4 flex items-center justify-between flex-wrap gap-2">
              <div>
                <SectionLabel>Global Demand Map</SectionLabel>
                <div className="font-serif text-xl text-loreal-charcoal font-light">Community Heat Map — 47 Countries</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-emerald-600 font-semibold">All regions growing</div>
                <div className="text-xs text-loreal-slate mt-0.5">Live community data</div>
              </div>
            </div>
            <WorldMap />
            {/* Region breakdown bars */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 border-t border-loreal-border">
              {regionBreakdown.map((r, i) => (
                <div key={r.name} className="border-b border-r border-loreal-border p-5 last-of-type:border-b-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="text-sm font-bold text-loreal-charcoal">{r.name}</div>
                      <div className="text-xs text-loreal-slate mt-0.5">{r.families}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-serif text-xl font-medium leading-none" style={{ color: heatColor(r.intensity) }}>{r.intensity}%</div>
                      <div className="text-xs text-emerald-600 font-semibold mt-0.5">{r.growth}</div>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-loreal-border overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${r.intensity}%` }}
                      transition={{ duration: 0.9, delay: i * 0.08, ease: "easeOut" }}
                      className="h-full" style={{ background: heatColor(r.intensity) }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </InViewSection>

        {/* ── COMMUNITY PULSE ── */}
        <InViewSection delay={0.05}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Community Health Score", val: "78",  unit: "/100", trend: "+6 this month",        icon: "◉" },
              { label: "Viral Content Rate",      val: "12",  unit: "%",   trend: "Above 5% benchmark",   icon: "↑" },
              { label: "Cross-brand Discovery",   val: "38",  unit: "%",   trend: "Explore 3+ brands",    icon: "◈" },
              { label: "NPS (Community)",         val: "+71", unit: "",    trend: "Industry avg: +32",     icon: "✦" },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="border border-loreal-border p-5 bg-white text-center">
                <div className="text-loreal-champagne text-xl mb-2">{stat.icon}</div>
                <div className="font-serif text-3xl font-light champagne-text leading-none">
                  {stat.val}<span className="text-xl">{stat.unit}</span>
                </div>
                <div className="text-xs font-semibold text-loreal-slate mt-2 leading-snug">{stat.label}</div>
                <div className="text-xs text-emerald-600 font-bold mt-1">{stat.trend}</div>
              </motion.div>
            ))}
          </div>
        </InViewSection>

      </div>
    </main>
  );
}
