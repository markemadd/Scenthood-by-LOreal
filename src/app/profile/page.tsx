"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import BottomNav from "@/components/BottomNav";
import TierBadge from "@/components/TierBadge";
import { users } from "@/lib/data";
import type { Tier } from "@/lib/data";

const MOCK_USER = users[1];

interface StoredProfile {
  name: string; email: string; gender: string; ageRange: string; platform: string;
  initials: string; tier: Tier; lis: number; joinDate: string; referralCode: string;
  recentActivity: { action: string; points: number; date: string }[];
  votingQuality: number; contentOutput: number; peerEndorsement: number; sessionAttendance: number;
}

const lisComponents = [
  { label: "Voting Quality",     key: "votingQuality",     weight: "25%" },
  { label: "Content Output",     key: "contentOutput",     weight: "30%" },
  { label: "Peer Endorsement",   key: "peerEndorsement",   weight: "25%" },
  { label: "Session Attendance", key: "sessionAttendance", weight: "20%" },
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

function CircleScore({ score }: { score: number }) {
  const radius = 70;
  const c = 2 * Math.PI * radius;
  const offset = c - (score / 1000) * c;
  return (
    <div className="relative w-44 h-44">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
        <circle cx="80" cy="80" r={radius} fill="none" stroke="rgba(13,13,13,0.08)" strokeWidth="3" />
        <motion.circle cx="80" cy="80" r={radius} fill="none"
          stroke="var(--gold)" strokeWidth="3"
          strokeDasharray={c} strokeDashoffset={c}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
          strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          className="font-display text-4xl text-scent-gold leading-none">{score}</motion.div>
        <div className="eyebrow mt-1.5">LIS</div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<StoredProfile | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("scenthood_user");
      if (raw) setProfile(JSON.parse(raw) as StoredProfile);
    } catch {}
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  const isReal = !!profile;
  const name = isReal ? profile.name : MOCK_USER.name;
  const initials = isReal ? profile.initials : MOCK_USER.avatar;
  const tier: Tier = isReal ? profile.tier : MOCK_USER.tier;
  const lis = isReal ? profile.lis : MOCK_USER.ccs;
  const joinDate = isReal ? profile.joinDate : MOCK_USER.joinDate;
  const location = isReal ? profile.platform ?? "" : MOCK_USER.location;
  const referralCode = isReal ? profile.referralCode : "—";
  const recentActivity = isReal ? profile.recentActivity : MOCK_USER.recentActivity;
  const votingQuality = isReal ? profile.votingQuality : (MOCK_USER.votingQuality as number);
  const contentOutput = isReal ? profile.contentOutput : (MOCK_USER.contentOutput as number);
  const peerEndorsement = isReal ? profile.peerEndorsement : (MOCK_USER.peerEndorsement as number);
  const sessionAttendance = isReal ? profile.sessionAttendance : (MOCK_USER.sessionAttendance as number);

  const compValues: Record<string, number> = { votingQuality, contentOutput, peerEndorsement, sessionAttendance };
  const nextTier: Tier = tier === "Scenthooders" ? "Scentmaker" : "Scentsetters";
  const lisTarget = tier === "Scenthooders" ? 999 : 1000;

  return (
    <main className="min-h-screen bg-scent-parchment pb-16">
      <BottomNav />

      {/* === HERO === */}
      <section className="relative min-h-[50vh] bg-scent-noir text-scent-parchment overflow-hidden grain">
        <div className="absolute inset-0 opacity-30">
          <Image src="/assets/ysl-libre-dua.jpg" alt="" fill className="object-cover object-top" sizes="100vw" />
          <div className="absolute inset-0 bg-scent-noir/60" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-12 pt-32 pb-16">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="eyebrow text-scent-gold mb-4">Account · {tier}</div>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="display-hero text-scent-parchment leading-none">
            {name.split(" ")[0]}.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            className="mt-4 text-scent-parchment/70 text-base max-w-md font-sans">
            {lis} LIS · Member since {new Date(joinDate).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
          </motion.p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-5 md:px-12 -mt-12 md:-mt-16 relative z-20 space-y-6 pb-16">

        {/* === IDENTITY CARD === */}
        <FadeUp>
          <div className="bg-scent-parchment border-2 border-scent-noir shadow-[0_8px_0_var(--noir)]">
            <div className="p-6 md:p-8 flex items-center gap-5">
              <div className="logo-mark w-16 h-16 text-2xl">{initials}</div>
              <div className="flex-1">
                <h2 className="display-md text-scent-noir">{name}</h2>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <TierBadge tier={tier} size="md" />
                  {location && <span className="text-[11px] text-loreal-muted">{location}</span>}
                </div>
                <div className="text-[11px] text-loreal-muted mt-1.5">
                  Member since {new Date(joinDate).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
                </div>
              </div>
            </div>
            {isReal && (
              <div className="border-t border-scent-noir/10 px-6 md:px-8 py-4 bg-scent-alabaster/50 flex items-center justify-between">
                <span className="eyebrow">Referral Code</span>
                <span className="font-mono text-sm tracking-[0.18em] text-scent-noir font-bold">{referralCode}</span>
              </div>
            )}
          </div>
        </FadeUp>

        {/* === LIS DASHBOARD === */}
        <FadeUp delay={0.05}>
          <div className="bg-scent-noir text-scent-parchment p-6 md:p-10 relative overflow-hidden grain">
            <div className="relative z-10">
              <div className="eyebrow text-scent-gold mb-6">L&apos;Oréal Influence Score</div>

              <div className="flex flex-col md:flex-row items-center gap-8">
                <CircleScore score={lis} />

                <div className="flex-1 w-full space-y-4">
                  {lisComponents.map((comp, i) => {
                    const value = compValues[comp.key] ?? 0;
                    return (
                      <motion.div key={comp.key}
                        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.08 }}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm font-medium text-scent-parchment">{comp.label}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] text-scent-parchment/60">{comp.weight}</span>
                            <span className="font-display text-base text-scent-gold">{value}%</span>
                          </div>
                        </div>
                        <div className="h-1 bg-scent-parchment/15 overflow-hidden">
                          <motion.div className="h-full bg-scent-gold"
                            initial={{ width: 0 }} animate={{ width: `${value}%` }}
                            transition={{ duration: 1, delay: 0.5 + i * 0.08, ease: "easeOut" }} />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* === TIER PROGRESSION === */}
        <FadeUp delay={0.1}>
          <div className="bg-scent-parchment border border-scent-noir/10 p-6 md:p-8">
            <div className="eyebrow mb-4">Tier Progression</div>
            <div className="flex items-center gap-3 mb-5">
              <TierBadge tier={tier} size="md" />
              <span className="text-loreal-muted">→</span>
              <TierBadge tier={nextTier} size="md" />
            </div>
            <div className="h-1 bg-scent-noir/10 overflow-hidden mb-3">
              <motion.div className="h-full bg-scent-gold"
                initial={{ width: 0 }} animate={{ width: `${Math.min((lis / lisTarget) * 100, 100)}%` }}
                transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }} />
            </div>
            <div className="flex justify-between text-[11px] text-loreal-muted">
              <span>{lis} LIS earned</span>
              <span>{Math.max(lisTarget - lis, 0)} more to {nextTier}</span>
            </div>
          </div>
        </FadeUp>

        {/* === ACTIVITY === */}
        <FadeUp delay={0.15}>
          <div className="bg-scent-parchment border border-scent-noir/10">
            <div className="px-6 md:px-8 py-4 border-b border-scent-noir/10">
              <div className="eyebrow">Recent Activity</div>
            </div>
            <div>
              {recentActivity.length === 0 ? (
                <div className="px-6 py-10 text-center text-loreal-muted text-sm">
                  No activity yet — take the quiz, vote, or share with a friend to earn LIS.
                </div>
              ) : (
                recentActivity.map((act, i) => (
                  <div key={i} className="px-6 md:px-8 py-4 border-b last:border-b-0 border-scent-noir/10 flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-scent-noir">{act.action}</span>
                      <div className="text-[11px] text-loreal-muted mt-0.5">{act.date}</div>
                    </div>
                    <span className="font-display text-base text-scent-gold">+{act.points}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </FadeUp>
      </div>
    </main>
  );
}
