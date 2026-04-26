"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

// Mock referral state for the demo user
const MOCK_USER = { name: "Isabelle Moreau", initials: "IM", code: "SCENT-IM-4821" };
const MOCK_REFERRALS = [
  { name: "Sophie L.", joined: "3 days ago", status: "active" },
  { name: "Marc D.", joined: "1 week ago", status: "active" },
];

const MILESTONES = [
  {
    count: 1,
    reward: "15% off your next purchase",
    icon: "◈",
    unlocked: true,
  },
  {
    count: 3,
    reward: "Exclusive 5 ml sample set (3 scents)",
    icon: "✦",
    unlocked: false,
  },
  {
    count: 5,
    reward: "Fast-track to Scentmaker tier",
    icon: "◉",
    unlocked: false,
  },
  {
    count: 10,
    reward: "Scentsetters nomination + annual booklet feature",
    icon: "✧",
    unlocked: false,
  },
];

export default function ReferralPage() {
  const [copied, setCopied] = useState(false);
  const referralCount = MOCK_REFERRALS.length;
  const shareLink = `https://scenthood.com/join?ref=${MOCK_USER.code}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Join me on SCENTHOOD — the fragrance community by L'Oréal Luxe. Discover your scent identity and get 15% off your first purchase: ${shareLink}`
    );
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Join me on SCENTHOOD",
        text: "Discover your scent identity & get 15% off your first L'Oréal Luxe purchase.",
        url: shareLink,
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  return (
    <main className="min-h-screen bg-loreal-white pb-24 md:pb-0 md:pt-14">
      <BottomNav />

      {/* Hero */}
      <section className="bg-loreal-cream border-b border-loreal-border px-5 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg mx-auto"
        >
          <div className="eyebrow mb-4">Refer &amp; Reward</div>
          <h1 className="heading-lg mb-3">Give a gift.<br />Earn a reward.</h1>
          <p className="body-lead text-loreal-slate max-w-sm mx-auto">
            Invite a friend to SCENTHOOD. When they join, you both receive{" "}
            <span className="text-loreal-champagne font-medium">15% off</span>{" "}
            your next L&apos;Oréal Luxe purchase — and you unlock exclusive milestones
            as your circle grows.
          </p>
        </motion.div>
      </section>

      <div className="max-w-xl mx-auto px-5 py-10 space-y-8">

        {/* Referral card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="bg-white border border-loreal-border"
        >
          <div className="h-0.5 bg-champagne-gradient" />
          <div className="p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-loreal-sand flex items-center justify-center text-xs font-semibold text-loreal-champagne tracking-wide">
                {MOCK_USER.initials}
              </div>
              <div>
                <div className="text-sm font-medium text-loreal-charcoal">
                  {MOCK_USER.name}
                </div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-loreal-muted">
                  Your referral code
                </div>
              </div>
            </div>

            {/* Code display */}
            <div className="bg-loreal-cream border border-loreal-border px-4 py-3 flex items-center justify-between mb-4">
              <span className="font-mono text-sm tracking-widest text-loreal-charcoal font-medium">
                {MOCK_USER.code}
              </span>
              <button
                onClick={handleCopy}
                className="text-[10px] uppercase tracking-[0.15em] text-loreal-champagne font-medium hover:text-loreal-gold transition-colors"
              >
                {copied ? "Copied ✓" : "Copy"}
              </button>
            </div>

            {/* Share link */}
            <div className="bg-loreal-white border border-loreal-border px-4 py-2.5 flex items-center justify-between mb-5">
              <span className="text-[11px] text-loreal-muted truncate pr-2">
                {shareLink}
              </span>
              <button
                onClick={handleCopy}
                className="text-[10px] uppercase tracking-[0.12em] text-loreal-muted hover:text-loreal-champagne transition-colors flex-shrink-0"
              >
                Copy link
              </button>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleWhatsApp}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white text-xs font-medium uppercase tracking-[0.1em] hover:bg-[#1ebe5d] transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </button>
              <button
                onClick={handleShare}
                className="flex-1 btn-outline text-xs py-3 tracking-[0.1em]"
              >
                Share link
              </button>
            </div>
          </div>
        </motion.div>

        {/* Progress tracker */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="bg-white border border-loreal-border"
        >
          <div className="px-6 py-4 border-b border-loreal-border flex items-center justify-between">
            <div className="eyebrow">Your Progress</div>
            <span className="text-sm font-medium text-loreal-charcoal">
              {referralCount} / 10 friends
            </span>
          </div>

          {/* Progress bar */}
          <div className="px-6 pt-5 pb-2">
            <div className="progress-rail h-1.5 mb-1">
              <motion.div
                className="progress-fill h-full"
                initial={{ width: 0 }}
                animate={{ width: `${(referralCount / 10) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
              />
            </div>
            <div className="flex justify-between">
              {[1, 3, 5, 10].map((n) => (
                <span
                  key={n}
                  className={`text-[9px] uppercase tracking-widest ${
                    referralCount >= n
                      ? "text-loreal-champagne"
                      : "text-loreal-muted/50"
                  }`}
                >
                  {n}
                </span>
              ))}
            </div>
          </div>

          {/* Milestones */}
          <div className="px-6 pb-6 space-y-3 mt-2">
            {MILESTONES.map((m, i) => {
              const achieved = referralCount >= m.count;
              return (
                <div
                  key={i}
                  className={`flex items-start gap-3 p-3 border transition-all ${
                    achieved
                      ? "border-loreal-champagne/50 bg-loreal-cream"
                      : "border-loreal-border bg-white opacity-60"
                  }`}
                >
                  <div
                    className={`w-7 h-7 flex items-center justify-center flex-shrink-0 text-sm ${
                      achieved
                        ? "bg-loreal-champagne text-white"
                        : "bg-loreal-sand text-loreal-muted"
                    }`}
                  >
                    {achieved ? "✓" : m.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] uppercase tracking-[0.12em] text-loreal-muted mb-0.5">
                      {m.count} {m.count === 1 ? "friend" : "friends"}
                    </div>
                    <div className="text-sm text-loreal-charcoal font-medium">
                      {m.reward}
                    </div>
                  </div>
                  {achieved && (
                    <span className="text-[9px] uppercase tracking-widest text-loreal-champagne font-medium flex-shrink-0">
                      Unlocked
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Friends who joined */}
        {MOCK_REFERRALS.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="bg-white border border-loreal-border"
          >
            <div className="px-6 py-4 border-b border-loreal-border">
              <div className="eyebrow">Friends who joined</div>
            </div>
            <div className="divide-y divide-loreal-border">
              {MOCK_REFERRALS.map((r, i) => (
                <div key={i} className="px-6 py-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-loreal-sand flex items-center justify-center text-[10px] font-semibold text-loreal-champagne">
                      {r.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <span className="text-sm text-loreal-charcoal">{r.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-loreal-muted">{r.joined}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <div className="text-center">
          <p className="body-sm mb-4">
            Both you and your friend receive{" "}
            <span className="text-loreal-champagne font-medium">15% off</span> when
            they complete their Scent Identity quiz and join the community.
          </p>
          <Link href="/quiz" className="btn-outline-gold text-xs">
            Retake your quiz →
          </Link>
        </div>
      </div>
    </main>
  );
}
