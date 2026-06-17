"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { tierData, ccsEarning } from "@/lib/data";

export default function TiersPage() {
  const [activeTier, setActiveTier] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-loreal-white pb-20 md:pb-0 pt-14">
      <BottomNav />

      {/* Header */}
      <div className="border-b border-loreal-border">
        <div className="max-w-5xl mx-auto px-5 py-8 text-center">
          <div className="eyebrow mb-3">Community Structure</div>
          <h1 className="heading-lg mb-3">The SCENTHOOD Tiers</h1>
          <p className="body-lead max-w-xl mx-auto">
            Your rank is earned by what you contribute — not how long you&apos;ve been here. Every review, vote, and video you create builds your L&apos;Oréal Influence Score and unlocks a new level of access and recognition.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 py-8">

        {/* LIS Earning — How to level up fast */}
        <div className="mb-8 border border-loreal-champagne/40 bg-loreal-cream/30">
          <div className="border-b border-loreal-champagne/30 px-6 py-4">
            <div className="eyebrow mb-1">Fast Track to Scentmaker</div>
            <h2 className="heading-sm">Earn your L&apos;Oréal Influence Score through content</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
            {[
              { type: "▶ Video Review", pts: ccsEarning.videoReview, note: "Best way to level up", highlight: true },
              { type: "◉ Photo Review", pts: ccsEarning.photoReview, note: "Quick visual review" },
              { type: "✏ Written Review", pts: ccsEarning.textReview, note: "Quality writing" },
              { type: "↑ Get Upvoted", pts: ccsEarning.upvoteReceived, note: "Per upvote received" },
            ].map((item) => (
              <div
                key={item.type}
                className={`px-5 py-4 border-r border-loreal-champagne/20 last:border-r-0 text-center ${item.highlight ? "bg-loreal-champagne/10" : ""}`}
              >
                <div className="text-[10px] text-loreal-muted mb-1">{item.type}</div>
                <div className={`font-serif text-2xl font-light leading-none ${item.highlight ? "champagne-text" : "text-loreal-charcoal"}`}>+{item.pts}</div>
                <div className="text-[10px] text-loreal-muted mt-1">LIS</div>
                {item.highlight && (
                  <div className="mt-1.5 text-[9px] text-loreal-champagne font-semibold tracking-wide">{item.note}</div>
                )}
              </div>
            ))}
          </div>
          <div className="px-6 py-3 border-t border-loreal-champagne/20">
            <div className="text-[11px] text-loreal-muted">
              <span className="text-loreal-charcoal font-medium">Also:</span> casting an upvote earns you <span className="champagne-text font-medium">+{ccsEarning.upvoteGiven} LIS</span> — staying active all adds up. Post 10 video reviews = <span className="champagne-text font-medium">1,000 LIS</span>, enough for Scentmaker.
            </div>
          </div>
        </div>

        {/* Pyramid */}
        <div className="flex flex-col items-center mb-10">
          {[
            { w: "w-28", label: "Scentsetters", note: "100 globally", i: 0 },
            { w: "w-52", label: "Scentmakers", note: "50K globally", i: 1 },
            { w: "w-80", label: "Scenthooders", note: "500K globally", i: 2 },
            { w: "w-[26rem]", label: "Friends · Tier 0", note: "Open to all", i: 3 },
          ].map((tier) => (
            <motion.div
              key={tier.label}
              initial={{ opacity: 0, scaleX: 0.7 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: tier.i * 0.15, duration: 0.4 }}
              onClick={() => setActiveTier(activeTier === tier.i ? null : tier.i)}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div
                className={`${tier.w} h-11 flex items-center justify-center border border-loreal-border transition-all ${activeTier === tier.i ? "bg-loreal-champagne/10 border-loreal-champagne" : "bg-loreal-cream/40 hover:bg-loreal-sand/50"}`}
                style={{ clipPath: "polygon(8% 0%, 92% 0%, 100% 100%, 0% 100%)" }}
              >
                <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-loreal-charcoal">{tier.label}</span>
              </div>
              <div className="body-sm text-[10px] mt-1 mb-1">{tier.note}</div>
            </motion.div>
          ))}
        </div>

        {/* Tier Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Tier 0 — Friends (entry tier) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="border border-loreal-border bg-white flex flex-col"
          >
            <div className="h-1" style={{ background: "linear-gradient(90deg, #d4af3780, #d4af37)" }} />
            <div className="p-6 flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="inline-block border border-loreal-border px-2.5 py-0.5 text-[9px] tracking-[0.12em] uppercase font-medium text-loreal-muted mb-2">
                    Tier 0 · Entry
                  </div>
                  <h3 className="heading-sm leading-tight">Friends</h3>
                  <p className="body-sm text-[11px] mt-0.5">The open door to SCENTHOOD</p>
                </div>
              </div>
              <div className="text-[11px] champagne-text font-medium mb-4">Free · No LIS required</div>
              <div className="eyebrow text-[9px] mb-3">What you get</div>
              <ul className="space-y-1.5">
                {[
                  "Full access to community feed",
                  "10% discount on first purchase",
                  "Receive notifications for new launches",
                  "Discover your Scent Identity",
                ].map((label) => (
                  <li key={label} className="flex items-start gap-3 py-2 px-3 border-l-2 border-transparent">
                    <span className="text-loreal-champagne text-[10px] mt-0.5 flex-shrink-0">◆</span>
                    <span className="body-sm text-[11px] leading-snug flex-1">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-loreal-border p-4">
              <Link href="/quiz" className="btn-outline text-xs py-2.5 w-full text-center block">
                Take the Scent Quiz →
              </Link>
              <div className="text-center text-[10px] text-loreal-muted mt-2">No card. No commitment. Just curiosity.</div>
            </div>
          </motion.div>

          {tierData.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.12 }}
              className="border border-loreal-border bg-white flex flex-col"
            >
              {/* Color accent top */}
              <div className="h-1" style={{ background: `linear-gradient(90deg, ${tier.color}80, ${tier.color})` }} />

              <div className="p-6 flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="inline-block border border-loreal-border px-2.5 py-0.5 text-[9px] tracking-[0.12em] uppercase font-medium text-loreal-muted mb-2">
                      LIS {tier.ccsRange}
                    </div>
                    <h3 className="heading-sm leading-tight">{tier.name}</h3>
                    <p className="body-sm text-[11px] mt-0.5">{tier.subtitle}</p>
                  </div>
                </div>

                <div className="text-[11px] champagne-text font-medium mb-4">{tier.target}</div>

                <div className="eyebrow text-[9px] mb-3">{tier.perksHeadline}</div>

                <ul className="space-y-1.5">
                  {tier.benefits.map((benefit) => (
                    <li
                      key={benefit.label}
                      className={`flex items-start gap-3 py-2 px-3 ${
                        benefit.physical
                          ? "border-l-2 border-loreal-champagne bg-loreal-cream/30"
                          : "border-l-2 border-transparent"
                      }`}
                    >
                      <span className="text-loreal-champagne text-[10px] mt-0.5 flex-shrink-0">◆</span>
                      <span className="body-sm text-[11px] leading-snug flex-1">
                        {benefit.label}
                        {benefit.physical && (
                          <span className="ml-2 inline-block text-[8px] bg-loreal-champagne/15 text-loreal-champagne border border-loreal-champagne/30 px-1.5 py-0.5 tracking-wide uppercase font-semibold">
                            Physical
                          </span>
                        )}
                        {benefit.exclusive && !benefit.physical && (
                          <span className="ml-2 inline-block text-[8px] bg-loreal-charcoal/5 text-loreal-slate border border-loreal-border px-1.5 py-0.5 tracking-wide uppercase">
                            Exclusive
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer */}
              <div className="border-t border-loreal-border p-4">
                {i === 0 && (
                  <div className="space-y-2">
                    <Link href="/signup" className="btn-gold text-xs py-2.5 w-full text-center block">
                      Join SCENTHOOD →
                    </Link>
                    <div className="text-center text-[10px] text-loreal-muted">Requires purchase of at least one perfume bottle to enter this tier.</div>
                    <div className="text-center text-[10px] text-loreal-muted">Your membership card will be mailed within 14 days</div>
                  </div>
                )}
                {i === 1 && (
                  <div className="text-center">
                    <div className="text-[11px] text-loreal-charcoal font-medium">Reach 999 LIS to unlock</div>
                    <div className="text-[10px] text-loreal-muted mt-1">Post 10 video reviews to get there</div>
                  </div>
                )}
                {i === 2 && (
                  <div className="text-center text-[11px] champagne-text font-medium tracking-wide">◆ Scentsetters — Invitation Only</div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom highlight */}
        <div className="mt-8 border border-loreal-champagne/40 bg-loreal-cream/30 p-6 text-center">
          <div className="eyebrow mb-2">The Physical Difference</div>
          <h2 className="heading-sm mb-3">SCENTHOOD membership you can hold, share, and show.</h2>
          <p className="body-sm max-w-xl mx-auto mb-4">
            Your SCENTHOOD card arrives in the mail. Your Scent Passport PDF hits your inbox. Your name appears in a printed booklet alongside the world&apos;s most passionate fragrance community. These aren&apos;t digital checkmarks — they&apos;re real.
          </p>
          <div className="divider mx-auto" />
        </div>
      </div>
    </main>
  );
}
