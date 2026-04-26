"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import TierBadge from "@/components/TierBadge";
import { users } from "@/lib/data";
import type { Tier } from "@/lib/data";

const MOCK_USER = users[1];

interface StoredProfile {
  name: string;
  email: string;
  gender: string;
  ageRange: string;
  platform: string;
  initials: string;
  tier: Tier;
  lis: number;
  joinDate: string;
  referralCode: string;
  recentActivity: { action: string; points: number; date: string }[];
  votingQuality: number;
  contentOutput: number;
  peerEndorsement: number;
  sessionAttendance: number;
}

const lisComponents = [
  { label: "Voting Quality", key: "votingQuality", weight: "25%", color: "bg-loreal-champagne" },
  { label: "Content Output", key: "contentOutput", weight: "30%", color: "bg-loreal-champagne" },
  { label: "Peer Endorsement", key: "peerEndorsement", weight: "25%", color: "bg-loreal-gold" },
  { label: "Session Attendance", key: "sessionAttendance", weight: "20%", color: "bg-loreal-gold-dark" },
];

function CircleScore({ score }: { score: number }) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (score / 1000) * circumference;

  return (
    <div className="relative w-36 h-36 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 144 144">
        <circle cx="72" cy="72" r={radius} fill="none" stroke="#EAE0D0" strokeWidth="3" />
        <motion.circle
          cx="72"
          cy="72"
          r={radius}
          fill="none"
          stroke="#C9A96E"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="font-serif text-3xl font-light champagne-text leading-none"
        >
          {score}
        </motion.div>
        <div className="eyebrow mt-1 text-[8px]">LIS</div>
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

  const compValues: Record<string, number> = {
    votingQuality,
    contentOutput,
    peerEndorsement,
    sessionAttendance,
  };

  const nextTier: Tier = tier === "Scenthooders" ? "Scentmaker" : "Scentsetters";
  const lisTarget = tier === "Scenthooders" ? 999 : 1000;

  return (
    <main className="min-h-screen bg-loreal-white pb-20 md:pb-0 pt-14">
      <BottomNav />

      <div className="border-b border-loreal-border">
        <div className="max-w-3xl mx-auto px-5 py-6">
          <div className="eyebrow mb-1">Account</div>
          <h1 className="heading-md">My Profile</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 py-6 space-y-4">
        {/* Identity Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-loreal-border"
        >
          <div className="h-0.5 bg-champagne-gradient" />
          <div className="p-6 flex items-center gap-5">
            <div className="w-14 h-14 bg-loreal-sand flex items-center justify-center text-loreal-gold-dark text-lg font-bold font-serif flex-shrink-0">
              {initials}
            </div>
            <div className="flex-1">
              <h2 className="font-serif text-xl font-light text-loreal-charcoal">{name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <TierBadge tier={tier} size="md" />
                {location && <span className="body-sm text-[11px]">{location}</span>}
              </div>
              <div className="body-sm text-[11px] mt-1">
                Member since {new Date(joinDate).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
              </div>
            </div>
          </div>
          {isReal && (
            <div className="border-t border-loreal-border px-6 py-3 bg-loreal-cream/40 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.15em] text-loreal-muted">Referral Code</span>
              <span className="font-mono text-sm tracking-widest text-loreal-champagne font-medium">{referralCode}</span>
            </div>
          )}
        </motion.div>

        {/* LIS Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="border border-loreal-border"
        >
          <div className="border-b border-loreal-border px-6 py-4">
            <div className="eyebrow">L&apos;Oréal Influence Score</div>
          </div>
          <div className="p-6">
            <CircleScore score={lis} />

            <div className="mt-8 space-y-4">
              {lisComponents.map((comp, i) => {
                const value = compValues[comp.key] ?? 0;
                return (
                  <motion.div
                    key={comp.key}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.08 }}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-sans text-sm text-loreal-slate">{comp.label}</span>
                      <div className="flex items-center gap-3">
                        <span className="body-sm text-[11px]">{comp.weight}</span>
                        <span className="font-serif text-lg leading-none champagne-text">{value}%</span>
                      </div>
                    </div>
                    <div className="progress-rail">
                      <motion.div
                        className={`h-full ${comp.color} transition-all`}
                        initial={{ width: 0 }}
                        animate={{ width: `${value}%` }}
                        transition={{ duration: 1, delay: 0.5 + i * 0.08, ease: "easeOut" }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Tier Progression */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="border border-loreal-border"
        >
          <div className="border-b border-loreal-border px-6 py-4">
            <div className="eyebrow">Tier Progression</div>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <TierBadge tier={tier} size="md" />
              <span className="body-sm text-[11px]">→</span>
              <TierBadge tier={nextTier} size="md" />
            </div>
            <div className="progress-rail mb-3">
              <motion.div
                className="h-full bg-loreal-champagne"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((lis / lisTarget) * 100, 100)}%` }}
                transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="body-sm text-[11px]">{lis} LIS earned</span>
              <span className="body-sm text-[11px]">{Math.max(lisTarget - lis, 0)} more to {nextTier}</span>
            </div>
          </div>
        </motion.div>

        {/* Activity Log */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="border border-loreal-border"
        >
          <div className="border-b border-loreal-border px-6 py-4">
            <div className="eyebrow">Recent Activity</div>
          </div>
          <div>
            {recentActivity.length === 0 ? (
              <div className="px-6 py-8 text-center body-sm text-loreal-muted/60">
                No activity yet — take the quiz, vote, or share with a friend to earn LIS.
              </div>
            ) : (
              recentActivity.map((act, i) => (
                <div key={i} className="border-b border-loreal-border last:border-b-0 px-6 py-4 flex items-center justify-between hover:bg-loreal-cream/20 transition-colors">
                  <div>
                    <span className="font-sans text-sm text-loreal-charcoal">{act.action}</span>
                    <div className="body-sm text-[11px] mt-0.5">{act.date}</div>
                  </div>
                  <span className="font-serif text-base champagne-text font-light flex-shrink-0">+{act.points} pts</span>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
