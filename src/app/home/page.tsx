"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import TierBadge from "@/components/TierBadge";
import { reviews, accordVotes, communityStats } from "@/lib/data";

const fi = (id: number) => `https://fimgs.net/mdimg/perfume/375x500.${id}.jpg`;

// Maps a fragrance name to a trio of bottle image IDs to show in the photo strip
const REVIEW_BOTTLE_IDS: Record<string, [number, number, number]> = {
  "Replica Jazz Club":         [32268, 37834, 36460],
  "YSL Libre":                 [57987, 33290, 49773],
  "Replica By The Fireplace":  [36460, 32268, 26977],
  "Armani Privé Bois d'Encens":[4083,  57037, 25564],
  "Lancôme La Vie Est Belle":  [21780, 63067, 3001],
};

// Gradient palettes for review photo placeholders (fallback)
const REVIEW_GRADIENTS = [
  "from-[#C9A96E] to-[#8A7362]",
  "from-[#D4A5A5] to-[#9E5A5A]",
  "from-[#7ABCCC] to-[#4A8C9C]",
  "from-[#B8C46A] to-[#789040]",
  "from-[#9070B8] to-[#5A4080]",
];

const TICKER_ITEMS = [
  "Sophie L. just joined from Paris  ◆",
  "New vote live: YSL Libre vs. Libre Intense  ◆",
  "Marc D. unlocked Scentmaker tier  ◆",
  "3 new Valentino reviews this hour  ◆",
  "SCENTHOOD reaches 50,000 members  ◆",
  "Isabelle M. referred 5 friends — milestone unlocked  ◆",
];

function Ticker() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % TICKER_ITEMS.length), 3200);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="bg-loreal-charcoal text-white overflow-hidden border-b border-white/10">
      <div className="max-w-6xl mx-auto px-5 py-2 flex items-center gap-3">
        <span className="text-loreal-champagne text-[9px] uppercase tracking-[0.2em] font-medium flex-shrink-0">Live</span>
        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
        <div className="flex-1 overflow-hidden h-5 relative">
          <AnimatePresence mode="wait">
            <motion.div key={idx} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }} transition={{ duration: 0.4 }}
              className="absolute inset-0 flex items-center">
              <span className="text-[11px] text-white/70 whitespace-nowrap">{TICKER_ITEMS[idx]}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Scent photo placeholder: gradient square with initials
function ReviewPhoto({ gradient, initial, size = "md" }: { gradient: string; initial: string; size?: "sm" | "md" }) {
  const dim = size === "sm" ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm";
  return (
    <div className={`${dim} bg-gradient-to-br ${gradient} flex items-center justify-center font-serif font-light text-white flex-shrink-0`}>
      {initial}
    </div>
  );
}

export default function HomePage() {
  const [activeVote, setActiveVote] = useState<string | null>(null);
  const [voted, setVoted] = useState(false);
  const [voteCounts, setVoteCounts] = useState({
    A: accordVotes[0].optionAVotes,
    B: accordVotes[0].totalVotes - accordVotes[0].optionAVotes,
  });

  const featuredVote = accordVotes[0];
  const total = voteCounts.A + voteCounts.B;
  const pctA = Math.round((voteCounts.A / total) * 100);
  const pctB = 100 - pctA;

  const handleVote = (option: "A" | "B") => {
    if (voted) return;
    setActiveVote(option);
    setVoteCounts((prev) => ({ ...prev, [option]: prev[option] + 1 }));
    setVoted(true);
  };

  return (
    <main className="min-h-screen bg-loreal-white pb-20 md:pb-0 pt-14">
      <BottomNav />
      <Ticker />

      {/* Page Header */}
      <div className="border-b border-loreal-border">
        <div className="max-w-6xl mx-auto px-5 py-6 flex items-end justify-between">
          <div>
            <div className="eyebrow mb-1">Community</div>
            <h1 className="heading-md">Today&apos;s Feed</h1>
          </div>
          <div className="body-sm text-[11px] hidden md:block">
            {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5">
        {/* Stats Strip */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className="grid grid-cols-4 gap-0 border-b border-loreal-border">
          {[
            { val: communityStats.totalVotes,   label: "votes cast" },
            { val: communityStats.activeMembers, label: "active today" },
            { val: communityStats.tiktokViews,  label: "social views" },
            { val: communityStats.countries,    label: "countries" },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.07 }}
              className="py-4 px-3 text-center border-r border-loreal-border last:border-r-0 group">
              <motion.div whileHover={{ scale: 1.05 }} className="font-serif text-xl font-light champagne-text cursor-default">
                {stat.val}
              </motion.div>
              <div className="body-sm text-[10px] mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Two Column Layout */}
        <div className="md:grid md:grid-cols-5 md:gap-0">

          {/* Main Feed — 3 cols */}
          <div className="md:col-span-3 md:border-r md:border-loreal-border">

            {/* Featured Vote */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }} className="border-b border-loreal-border p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="eyebrow text-green-700">Live Vote</span>
                <span className="body-sm text-[10px]">{(total).toLocaleString()} votes</span>
              </div>

              <h3 className="heading-sm mb-1">{featuredVote.title}</h3>
              <p className="body-sm mb-5">{featuredVote.subtitle}</p>

              <div className="space-y-2 mb-3">
                {(["A", "B"] as const).map((opt) => {
                  const pct = opt === "A" ? pctA : pctB;
                  const label = opt === "A" ? featuredVote.optionA : featuredVote.optionB;
                  const isActive = activeVote === opt;
                  return (
                    <motion.button key={opt} onClick={() => handleVote(opt)}
                      whileTap={!voted ? { scale: 0.99 } : {}}
                      disabled={voted && !isActive}
                      className={`vote-option w-full h-12 relative overflow-hidden cursor-pointer transition-all ${isActive ? "selected" : ""} ${voted && !isActive ? "opacity-60" : ""}`}>
                      <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                        className={`absolute inset-y-0 left-0 ${isActive ? "bg-loreal-champagne/25" : "bg-loreal-sand/60"}`} />
                      <div className="relative z-10 flex items-center justify-between px-4 h-full">
                        <div className="flex items-center gap-2">
                          {voted && isActive && <span className="text-loreal-champagne text-xs">✓</span>}
                          <span className="font-sans text-sm text-loreal-charcoal font-medium">{label}</span>
                        </div>
                        <span className="font-serif text-lg text-loreal-champagne leading-none">{pct}%</span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {voted && (
                <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                  className="text-[10px] text-loreal-champagne font-medium text-center mb-2">
                  Your vote is counted — +5 LIS earned
                </motion.div>
              )}

              <div className="flex items-center justify-between">
                <span className="body-sm text-[11px]">{featuredVote.brand}</span>
                <Link href="/vote" className="body-sm text-[11px] text-loreal-champagne hover:text-loreal-gold transition-colors">
                  All votes →
                </Link>
              </div>
            </motion.div>

            {/* Reviews */}
            <div>
              <div className="px-6 py-3 border-b border-loreal-border flex items-center justify-between">
                <span className="eyebrow">Recent Reviews</span>
                <Link href="/community" className="body-sm text-[11px] hover:text-loreal-charcoal transition-colors">See all</Link>
              </div>

              {reviews.slice(0, 3).map((review, i) => (
                <motion.div key={review.id}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.1 }}
                  whileHover={{ backgroundColor: "rgba(237,228,220,0.4)" }}
                  className="p-6 border-b border-loreal-border cursor-pointer transition-colors">
                  <div className="flex items-start gap-3 mb-3">
                    {/* Gradient avatar */}
                    <ReviewPhoto
                      gradient={REVIEW_GRADIENTS[i % REVIEW_GRADIENTS.length]}
                      initial={review.userAvatar}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-sans text-sm font-medium text-loreal-charcoal">{review.userName}</span>
                        <TierBadge tier={review.userTier} />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="body-sm text-[10px]">{review.userLocation}</span>
                        <span className="text-loreal-border">·</span>
                        <span className="body-sm text-[10px]">{review.timestamp}</span>
                      </div>
                    </div>
                  </div>

                  {/* Scent tag */}
                  <div className="text-loreal-champagne text-xs mb-2 font-medium tracking-wide">{review.fragranceName}</div>

                  {/* Review text */}
                  <p className="font-serif text-sm text-loreal-slate leading-relaxed italic mb-3">
                    &ldquo;{review.excerpt.substring(0, 140)}...&rdquo;
                  </p>

                  {/* Scent photo strip — real bottle images when available, gradient fallback */}
                  <div className="flex gap-1.5">
                    {(() => {
                      const bottles = REVIEW_BOTTLE_IDS[review.fragranceName];
                      if (bottles) {
                        return bottles.map((id, j) => (
                          <motion.div
                            key={id}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="w-14 h-14 bg-loreal-cream/50 border border-loreal-border flex items-center justify-center cursor-zoom-in overflow-hidden hover:border-loreal-champagne/50 transition-colors"
                          >
                            <img
                              src={fi(id)}
                              alt=""
                              className="h-12 w-auto object-contain"
                              loading="lazy"
                            />
                          </motion.div>
                        ));
                      }
                      return [0, 1, 2].map((j) => (
                        <motion.div
                          key={j}
                          whileHover={{ scale: 1.05 }}
                          className={`w-14 h-14 bg-gradient-to-br ${REVIEW_GRADIENTS[(i + j) % REVIEW_GRADIENTS.length]} flex items-center justify-center cursor-zoom-in`}
                        >
                          <span className="text-white/40 text-lg">✦</span>
                        </motion.div>
                      ));
                    })()}
                    <div className="w-14 h-14 bg-loreal-sand/40 border border-loreal-border flex items-center justify-center">
                      <span className="text-[9px] text-loreal-muted text-center leading-tight px-1">+{review.upvotes} likes</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar — 2 cols */}
          <div className="md:col-span-2">

            {/* Quiz CTA */}
            <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 border-b border-loreal-border bg-loreal-cream/30">
              <div className="eyebrow mb-3">Your Journey</div>
              <h3 className="heading-sm mb-2">Find your Scent Identity</h3>
              <p className="body-sm mb-4">A 5-step quiz that maps your personality to a fragrance profile and unlocks your Community tier.</p>
              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                <Link href="/quiz" className="btn-primary text-xs py-2.5 px-5 w-full text-center block">
                  Take the Quiz
                </Link>
              </motion.div>
            </motion.div>

            {/* Second active vote */}
            <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-5 border-b border-loreal-border">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="eyebrow text-[9px]">Vote Closing Soon</span>
              </div>
              <div className="font-serif text-base text-loreal-charcoal font-light mb-1">{accordVotes[1]?.title}</div>
              <p className="body-sm text-[10px] mb-3">{accordVotes[1]?.subtitle}</p>
              <Link href="/vote" className="btn-outline-gold text-[10px] py-2 px-4">
                Cast Your Vote →
              </Link>
            </motion.div>

            {/* Quick Links */}
            <div className="border-b border-loreal-border">
              {[
                { href: "/tiers",        label: "Tier System",   desc: "How to rise from Scenthooders to Scentsetters", icon: "◈" },
                { href: "/brands",       label: "Pilot Brands",  desc: "YSL & Valentino partnerships",                  icon: "✦" },
                { href: "/intelligence", label: "Intelligence",  desc: "L'Oréal Luxe analytics dashboard",              icon: "◉" },
                { href: "/referral",     label: "Refer & Earn",  desc: "Invite a friend, get 15% off",                  icon: "✧" },
              ].map((item, i) => (
                <motion.div key={item.href} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.06 }}>
                  <Link href={item.href}
                    className="flex items-center justify-between p-4 border-b border-loreal-border hover:bg-loreal-cream/30 transition-colors group last:border-b-0">
                    <div className="flex items-center gap-3">
                      <span className="text-loreal-champagne/60 text-sm group-hover:text-loreal-champagne transition-colors">{item.icon}</span>
                      <div>
                        <div className="font-sans text-sm font-medium text-loreal-charcoal">{item.label}</div>
                        <div className="body-sm text-[10px]">{item.desc}</div>
                      </div>
                    </div>
                    <motion.span whileHover={{ x: 2 }}
                      className="text-loreal-muted group-hover:text-loreal-champagne transition-colors">→</motion.span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Trending Accords widget */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="p-5">
              <div className="eyebrow mb-3">Trending This Week</div>
              <div className="space-y-2.5">
                {[
                  { accord: "Woody-Amber",   pct: 92, delta: "+8%" },
                  { accord: "Solar Florals", pct: 78, delta: "+12%" },
                  { accord: "Clean Musks",   pct: 71, delta: "+5%" },
                ].map((t, i) => (
                  <div key={t.accord}>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-loreal-slate font-medium">{t.accord}</span>
                      <div className="flex gap-2">
                        <span className="text-emerald-600 font-medium">{t.delta}</span>
                        <span className="champagne-text">{t.pct}%</span>
                      </div>
                    </div>
                    <div className="h-1 bg-loreal-border overflow-hidden">
                      <motion.div className="h-full bg-loreal-champagne" initial={{ width: 0 }}
                        animate={{ width: `${t.pct}%` }}
                        transition={{ duration: 0.9, delay: 0.7 + i * 0.12, ease: "easeOut" }} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </main>
  );
}
