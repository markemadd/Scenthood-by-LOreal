"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { users } from "@/lib/data";
import { fetchReferrals, DbReferral, REFERRAL_LIS_REWARD } from "@/lib/supabase";

const _MOCK = users[1];
const MOCK_USER = {
  name: _MOCK.name,
  initials: _MOCK.avatar,
  code: `SCENT-${_MOCK.avatar}-4821`,
};

function getInitials(name: string) {
  return name.trim().split(/\s+/).map((w) => w[0]?.toUpperCase() ?? "").join("").slice(0, 2) || "SC";
}
const MILESTONES = [
  { count: 1,  reward: "15% off your next purchase",                       icon: "◈" },
  { count: 3,  reward: "Exclusive 5 ml sample set (3 scents)",            icon: "✦" },
  { count: 5,  reward: "Fast-track to Scentmaker tier",                    icon: "◉" },
  { count: 10, reward: "Scentsetters nomination + annual booklet feature", icon: "✧" },
];

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

export default function ReferralPage() {
  const [copied, setCopied] = useState(false);
  const [user, setUser] = useState(MOCK_USER);
  const [liveReferrals, setLiveReferrals] = useState<DbReferral[] | null>(null);

  useEffect(() => {
    let code = MOCK_USER.code;
    try {
      const raw = localStorage.getItem("scenthood_user");
      if (raw) {
        const stored = JSON.parse(raw);
        const name = stored.name || MOCK_USER.name;
        const initials = getInitials(name);
        code = stored.referralCode || `SCENT-${initials}-${Math.floor(1000 + Math.random() * 9000)}`;
        setUser({ name, initials, code });
      }
    } catch {}

    // Fetch live referrals from Supabase
    fetchReferrals(code).then(setLiveReferrals);
  }, []);

  const referralCount = liveReferrals?.length ?? 0;
  const lisEarned = referralCount * REFERRAL_LIS_REWARD;
  const shareLink = `https://scenthood.com/join?ref=${user.code}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };
  const handleWhatsApp = () => {
    const msg = encodeURIComponent(`Join me on SCENTHOOD — discover your scent identity and get 15% off: ${shareLink}`);
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-scent-parchment pb-16">
      <BottomNav />

      {/* === HERO — Dark === */}
      <section className="relative min-h-[70vh] bg-scent-noir/95 text-scent-parchment overflow-hidden grain">
        <div className="absolute inset-0 opacity-20">
          <Image src="/assets/valentino-meta.jpg" alt="" fill className="object-cover object-center" sizes="100vw" />
          <div className="absolute inset-0 bg-scent-noir/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-12 pt-32 pb-16 md:pb-20">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="eyebrow text-scent-gold mb-4">Refer &amp; Reward</div>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="display-hero text-scent-parchment leading-none">
            Give a gift.<br />Earn a reward.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            className="mt-6 max-w-xl text-scent-parchment/90 text-base md:text-lg leading-relaxed">
            Invite a friend to SCENTHOOD. When they join, you both receive <span className="text-scent-gold font-bold">15% off</span> your next L&apos;Oréal Luxe purchase — and you unlock milestones as your circle grows.
          </motion.p>
        </div>
      </section>

      {/* === REFERRAL CARD === */}
      <section className="max-w-3xl mx-auto px-5 md:px-12 -mt-12 md:-mt-16 relative z-20 pb-16">
        <FadeUp>
          <div className="bg-scent-parchment border-2 border-scent-noir p-6 md:p-8 shadow-[0_8px_0_var(--noir)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="logo-mark">{user.initials}</div>
              <div>
                <div className="font-bold text-scent-noir">{user.name}</div>
                <div className="eyebrow">Your referral code</div>
              </div>
            </div>

            <div className="bg-scent-noir text-scent-parchment px-5 py-4 flex items-center justify-between mb-3">
              <span className="font-mono text-base tracking-[0.15em] font-bold">{user.code}</span>
              <button onClick={handleCopy}
                className="text-[10px] uppercase tracking-[0.2em] text-scent-gold font-bold hover:text-scent-parchment transition-colors">
                {copied ? "Copied ✓" : "Copy"}
              </button>
            </div>

            <div className="bg-scent-alabaster border border-scent-noir/15 px-4 py-2.5 flex items-center justify-between mb-6">
              <span className="text-[11px] text-scent-darkOud truncate pr-2">{shareLink}</span>
              <button onClick={handleCopy}
                className="text-[10px] uppercase tracking-[0.18em] text-loreal-muted hover:text-scent-noir transition-colors flex-shrink-0 font-bold">
                Copy link
              </button>
            </div>

            <div className="flex gap-3">
              <button onClick={handleWhatsApp}
                className="flex-1 pill text-[11px] py-3" style={{ background: "#25D366", color: "white", borderColor: "#0D0D0D" }}>
                WhatsApp
              </button>
              <button onClick={handleCopy} className="flex-1 pill pill-noir text-[11px] py-3">
                Share link
              </button>
            </div>
          </div>
        </FadeUp>

        {/* === MILESTONES === */}
        <FadeUp delay={0.1}>
          <div className="mt-10 bg-scent-noir text-scent-parchment p-6 md:p-8 relative overflow-hidden grain">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="eyebrow text-scent-gold">Your Progress</div>
                <span className="font-display text-base text-scent-parchment">{liveReferrals === null ? "…" : referralCount} / 10</span>
              </div>

              <div className="progress-rail mb-6 h-1 bg-scent-parchment/15">
                <motion.div className="h-full bg-scent-gold"
                  initial={{ width: 0 }} animate={{ width: `${(referralCount / 10) * 100}%` }}
                  transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }} />
              </div>

              <div className="space-y-3">
                {MILESTONES.map((m) => {
                  const achieved = referralCount >= m.count;
                  return (
                    <div key={m.count}
                      className={`flex items-start gap-4 p-4 border ${achieved ? "border-scent-gold bg-scent-gold/10" : "border-scent-parchment/15 opacity-70"}`}>
                      <div className={`w-9 h-9 flex items-center justify-center flex-shrink-0 font-display ${achieved ? "bg-scent-gold text-scent-noir" : "bg-scent-parchment/10 text-scent-parchment/60"}`}>
                        {achieved ? "✓" : m.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-[10px] uppercase tracking-[0.18em] text-scent-parchment/70 font-bold">
                          {m.count} {m.count === 1 ? "friend" : "friends"}
                        </div>
                        <div className="text-sm text-scent-parchment mt-0.5 font-medium">{m.reward}</div>
                      </div>
                      {achieved && <span className="text-[9px] uppercase tracking-[0.2em] text-scent-gold font-bold">Unlocked</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </FadeUp>

        {/* === LIVE REFERRALS === */}
        <FadeUp delay={0.15}>
          <div className="mt-10 bg-scent-parchment border border-scent-noir/10">
            <div className="px-6 py-4 border-b border-scent-noir/10 flex items-center justify-between">
              <div className="eyebrow">Friends who joined</div>
              {referralCount > 0 && (
                <div className="text-[11px] font-bold text-scent-gold">+{lisEarned} LIS earned</div>
              )}
            </div>
            {liveReferrals === null ? (
              <div className="px-6 py-6 text-[12px] text-loreal-muted animate-pulse">Loading…</div>
            ) : liveReferrals.length === 0 ? (
              <div className="px-6 py-8 text-center">
                <div className="text-[13px] text-scent-noir/50 font-medium mb-1">No referrals yet</div>
                <div className="text-[11px] text-loreal-muted">Share your code — each friend who joins earns you +{REFERRAL_LIS_REWARD} LIS instantly.</div>
              </div>
            ) : (
              <div>
                {liveReferrals.map((r) => (
                  <div key={r.id} className="px-6 py-4 border-b last:border-b-0 border-scent-noir/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-scent-noir text-scent-gold flex items-center justify-center text-[10px] font-display rounded-full">
                        {r.referred_name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <span className="text-sm font-medium text-scent-noir">{r.referred_name}</span>
                        <div className="text-[10px] text-loreal-muted">+{r.lis_awarded} LIS awarded to you</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-loreal-muted">
                      {new Date(r.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </FadeUp>

        {/* === CTA === */}
        <FadeUp delay={0.2}>
          <div className="mt-12 text-center">
            <Link href="/quiz" className="pill pill-gold text-[12px] px-6 py-3">
              Retake your quiz →
            </Link>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}
