"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { accordVotes } from "@/lib/data";

export default function VotePage() {
  const [voted, setVoted] = useState<Record<string, "A" | "B">>({});

  const handleVote = (voteId: string, option: "A" | "B") => {
    setVoted((prev) => ({ ...prev, [voteId]: option }));
  };

  return (
    <main className="min-h-screen bg-loreal-white pb-20 md:pb-0 pt-14">
      <BottomNav />

      {/* Header */}
      <div className="border-b border-loreal-border">
        <div className="max-w-3xl mx-auto px-5 py-6">
          <div className="eyebrow mb-1">Co-Creation Studio</div>
          <h1 className="heading-md">Live Accord Voting</h1>
          <p className="body-sm mt-1">Your vote shapes the next L&apos;Oréal Luxe brief. Results are shared directly with our master perfumers.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 py-8 space-y-8">
        {accordVotes.map((vote, i) => {
          const pctA = Math.round((vote.optionAVotes / vote.totalVotes) * 100);
          const pctB = 100 - pctA;
          const hasVoted = voted[vote.id];
          const [revealNote, setRevealNote] = useState(false);

          return (
            <motion.div
              key={vote.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="border border-loreal-border"
            >
              {/* Card Header */}
              <div className="border-b border-loreal-border p-6 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="eyebrow text-green-700">Active</span>
                    <span className="body-sm text-[10px] text-loreal-muted">· {vote.brand}</span>
                  </div>
                  <h2 className="heading-sm">{vote.title}</h2>
                  <p className="body-sm mt-1">{vote.subtitle}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-serif text-2xl font-light champagne-text">{vote.totalVotes.toLocaleString()}</div>
                  <div className="body-sm text-[10px]">votes</div>
                </div>
              </div>

              {/* Voting Options */}
              <div className="p-6 space-y-2">
                {(
                  [
                    { key: "A" as const, label: vote.optionA, pct: pctA },
                    { key: "B" as const, label: vote.optionB, pct: pctB },
                  ] as { key: "A" | "B"; label: string; pct: number }[]
                ).map((opt) => {
                  const isSelected = hasVoted === opt.key;
                  const isOther = hasVoted && hasVoted !== opt.key;
                  return (
                    <button
                      key={opt.key}
                      onClick={() => handleVote(vote.id, opt.key)}
                      className={`w-full relative h-14 border text-left overflow-hidden transition-all ${
                        isSelected
                          ? "border-loreal-champagne bg-loreal-cream/40"
                          : isOther
                          ? "border-loreal-border opacity-60"
                          : "border-loreal-border hover:border-loreal-champagne/40 hover:bg-loreal-cream/20"
                      }`}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: hasVoted ? `${opt.pct}%` : "0%" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute inset-y-0 left-0 bg-loreal-sand/70"
                      />
                      <div className="relative z-10 flex items-center justify-between px-4 h-full">
                        <span className="font-sans text-sm font-medium text-loreal-charcoal">{opt.label}</span>
                        <div className="flex items-center gap-2">
                          {hasVoted && (
                            <span className="font-serif text-lg leading-none champagne-text">{opt.pct}%</span>
                          )}
                          {isSelected && (
                            <span className="text-[10px] text-loreal-champagne font-medium tracking-wide">Your vote</span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Perfumer Note */}
              {hasVoted && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.4 }}
                  className="border-t border-loreal-border"
                >
                  <div
                    className="px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-loreal-cream/20 transition-colors"
                    onClick={() => setRevealNote(!revealNote)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="champagne-text text-sm">✦</span>
                      <span className="eyebrow">Perfumer&apos;s Note</span>
                    </div>
                    <span className="text-loreal-muted text-sm">{revealNote ? "−" : "+"}</span>
                  </div>
                  {revealNote && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="px-6 pb-6"
                    >
                      <blockquote className="font-serif text-sm italic text-loreal-slate leading-relaxed border-l-2 border-loreal-champagne pl-4">
                        {vote.perfumerNote}
                      </blockquote>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {!hasVoted && (
                <div className="border-t border-loreal-border px-6 py-3">
                  <p className="body-sm text-[11px] text-center">Cast your vote to see live results and a note from our perfumer.</p>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </main>
  );
}
