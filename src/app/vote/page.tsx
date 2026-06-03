"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import BottomNav from "@/components/BottomNav";
import { accordVotes, AccordVote } from "@/lib/data";
import { imageFor } from "@/lib/brandImages";

// Hero image per vote — based on its actual brand/fragrance title
function voteImage(v: AccordVote): string {
  // First try the title (e.g. "Next YSL Libre Flanker" matches "YSL Libre")
  return imageFor(v.title, v.brand, 0);
}

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

function VoteCard({ vote, idx }: { vote: AccordVote; idx: number }) {
  const [choice, setChoice] = useState<"A" | "B" | null>(null);
  const [showNote, setShowNote] = useState(false);

  const total = vote.totalVotes + (choice ? 1 : 0);
  const aVotes = vote.optionAVotes + (choice === "A" ? 1 : 0);
  const pctA = Math.round((aVotes / total) * 100);
  const pctB = 100 - pctA;
  const img = voteImage(vote);

  return (
    <FadeUp delay={(idx % 3) * 0.06}>
      <div className="grid md:grid-cols-12 gap-6 md:gap-10 items-start py-12 md:py-16 border-b border-scent-noir/10">
        {/* Image */}
        <div className="md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden bg-scent-darkOud">
            <Image src={img} alt="" fill className="object-cover" sizes="(min-width: 768px) 40vw, 100vw" />
            <div className="absolute top-4 left-4">
              <span className="pill pill-rose text-[10px] px-3 py-1">● Active</span>
            </div>
            <div className="absolute bottom-4 right-4 text-right">
              <div className="font-display text-2xl text-scent-parchment leading-none">{total.toLocaleString()}</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-scent-parchment/80 font-bold">votes</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="md:col-span-7 md:pt-4">
          <div className="eyebrow mb-3">{vote.brand}</div>
          <h2 className="display-lg text-scent-noir">{vote.title}</h2>
          <p className="mt-3 text-scent-darkOud max-w-lg">{vote.subtitle}</p>

          <div className="mt-7 space-y-3">
            {(
              [
                { key: "A" as const, label: vote.optionA, pct: pctA },
                { key: "B" as const, label: vote.optionB, pct: pctB },
              ]
            ).map((opt) => {
              const isSelected = choice === opt.key;
              const isOther = choice && choice !== opt.key;
              return (
                <button key={opt.key} onClick={() => !choice && setChoice(opt.key)}
                  disabled={!!choice}
                  className={`vote-option h-16 w-full relative overflow-hidden text-left ${isSelected ? "selected" : ""} ${isOther ? "opacity-50" : ""}`}>
                  <motion.div initial={{ width: 0 }}
                    animate={{ width: choice ? `${opt.pct}%` : "0%" }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className="absolute inset-y-0 left-0 bg-scent-gold/25" />
                  <div className="relative z-10 flex items-center justify-between px-5 h-full">
                    <div className="flex items-center gap-3">
                      <span className="font-sans text-sm font-bold text-scent-noir">{opt.label}</span>
                      {isSelected && <span className="text-[9px] uppercase tracking-[0.18em] text-scent-gold font-bold">Your vote</span>}
                    </div>
                    {choice && <span className="font-display text-xl text-scent-noir">{opt.pct}%</span>}
                  </div>
                </button>
              );
            })}
          </div>

          {choice && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.4 }} className="mt-5 border-t border-scent-noir/10">
              <button onClick={() => setShowNote(!showNote)}
                className="w-full py-4 flex items-center justify-between text-left hover:text-scent-gold transition-colors">
                <div className="flex items-center gap-2">
                  <span className="text-scent-gold">✦</span>
                  <span className="eyebrow">Perfumer&apos;s Note</span>
                </div>
                <span className="text-loreal-muted">{showNote ? "−" : "+"}</span>
              </button>
              {showNote && (
                <motion.blockquote initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="font-serif text-base italic text-scent-darkOud leading-relaxed border-l-2 border-scent-gold pl-4 pb-4">
                  {vote.perfumerNote}
                </motion.blockquote>
              )}
            </motion.div>
          )}

          {!choice && (
            <p className="mt-4 text-[11px] text-loreal-muted">Cast your vote to see live results and the perfumer&apos;s note.</p>
          )}
        </div>
      </div>
    </FadeUp>
  );
}

export default function VotePage() {
  return (
    <main className="min-h-screen bg-scent-parchment pb-16">
      <BottomNav />

      {/* === HERO === */}
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden bg-scent-noir grain">
        <Image src="/assets/vote-image.jpg" alt="" fill priority className="object-cover object-center" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-scent-noir/30 via-scent-noir/10 to-scent-noir/80" />

        <div className="relative z-10 h-full flex flex-col justify-end px-5 md:px-12 pb-12 md:pb-16 max-w-7xl mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="eyebrow text-scent-gold mb-4">Co-Creation Studio</div>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="display-hero text-scent-parchment">
            Live<br />Accord Voting
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            className="mt-5 max-w-xl text-scent-parchment/85 text-base md:text-lg leading-relaxed">
            Your vote shapes the next L&apos;Oréal Luxe brief. Results are shared directly with our master perfumers.
          </motion.p>
        </div>
      </section>

      {/* === VOTE LIST === */}
      <section className="max-w-7xl mx-auto px-5 md:px-12">
        {accordVotes.map((vote, i) => (
          <VoteCard key={vote.id} vote={vote} idx={i} />
        ))}
      </section>

      {/* === BIG WORDMARK === */}
      <section className="bg-scent-parchment pt-8 pb-16 px-5 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="display-hero text-scent-noir/10 leading-none">YOUR VOTE.</h2>
        </div>
      </section>
    </main>
  );
}
