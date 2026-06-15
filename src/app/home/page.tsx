"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import TierBadge from "@/components/TierBadge";
import { reviews, accordVotes, communityStats, feedPosts } from "@/lib/data";
import { imageFor, PILOT_BRAND_CARDS } from "@/lib/brandImages";

const TICKER = [
  "Sophie L. just joined from Paris",
  "New vote live: YSL Libre vs. Libre Intense",
  "Marc D. unlocked Scentmaker tier",
  "3 new Valentino reviews this hour",
  "SCENTHOOD reaches 50,000 members",
  "Isabelle M. referred 5 friends",
];

function Ticker() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % TICKER.length), 3200);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="bg-scent-noir text-scent-parchment overflow-hidden border-b border-scent-noir">
      <div className="max-w-7xl mx-auto px-5 py-2.5 flex items-center gap-3">
        <span className="text-scent-gold text-[9px] uppercase tracking-[0.25em] font-bold flex-shrink-0">Live</span>
        <div className="w-1.5 h-1.5 rounded-full bg-scent-gold animate-pulse flex-shrink-0" />
        <div className="flex-1 overflow-hidden h-5 relative">
          <AnimatePresence mode="wait">
            <motion.div key={idx} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }} transition={{ duration: 0.4 }}
              className="absolute inset-0 flex items-center">
              <span className="text-[11px] text-scent-parchment/80 whitespace-nowrap">{TICKER[idx]}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY  = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOp = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [voted, setVoted] = useState<"A" | "B" | null>(null);
  const featuredVote = accordVotes[0];
  const total = featuredVote.totalVotes + (voted ? 1 : 0);
  const aVotes = featuredVote.optionAVotes + (voted === "A" ? 1 : 0);
  const pctA = Math.round((aVotes / total) * 100);
  const pctB = 100 - pctA;

  return (
    <main className="min-h-screen bg-scent-parchment pb-24 md:pb-0">
      <BottomNav />

      {/* === HERO === */}
      <div ref={heroRef} className="relative md:h-screen md:min-h-[640px] w-full overflow-hidden bg-scent-noir grain">
        {/* Mobile: full-bleed square image at top, no crop */}
        <div className="relative w-full aspect-square md:absolute md:inset-0 md:aspect-auto">
          <motion.div style={{ y: heroY, opacity: heroOp }} className="absolute inset-0">
            <Image src="/assets/home-hero-new.png" alt="" fill priority
              className="object-cover"
              sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-b from-scent-noir/0 via-transparent to-scent-noir/40 md:from-scent-noir/20 md:to-scent-noir/80" />
          </motion.div>
        </div>

        {/* Hero content */}
        <div className="relative z-10 md:absolute md:inset-0 flex flex-col">
          <div className="hidden md:block pt-24 md:pt-32" />

          <div className="md:flex-1 flex flex-col justify-end px-5 md:px-12 pt-8 md:pt-0 pb-12 md:pb-20 max-w-7xl mx-auto w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}>
              <div className="eyebrow text-scent-gold mb-4 md:mb-6">Brandstorm 2026 · L&apos;Oréal Luxe</div>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="display-hero text-scent-parchment">
              SCENTHOOD
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="mt-5 md:mt-7 max-w-xl text-scent-parchment/85 text-base md:text-lg font-light leading-relaxed">
              The community for people who take fragrance seriously — a space to discover, share, and grow through the scents that define you.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="mt-8 md:mt-10 flex flex-wrap gap-3">
              <Link href="/quiz" className="pill pill-gold text-[12px] px-6 py-2.5">
                Take the Quiz →
              </Link>
              <Link href="/community" className="pill pill-parchment text-[12px] px-6 py-2.5">
                Enter the Feed
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              className="absolute bottom-6 right-6 md:bottom-10 md:right-10 text-scent-parchment/60 text-[10px] tracking-[0.3em] uppercase rotate-90 origin-bottom-right hidden md:block">
              scroll
            </motion.div>
          </div>
        </div>
      </div>

      <Ticker />

      {/* === STATS STRIP === */}
      <section className="bg-scent-noir text-scent-parchment border-b border-scent-noir">
        <div className="max-w-7xl mx-auto px-5 md:px-12 py-10 grid grid-cols-2 md:grid-cols-4 gap-y-6 md:gap-y-0">
          {[
            { val: communityStats.totalVotes,    label: "Votes cast" },
            { val: communityStats.activeMembers, label: "Active today" },
            { val: communityStats.tiktokViews,   label: "Social views" },
            { val: communityStats.countries,     label: "Countries" },
          ].map((s, i) => (
            <FadeUp key={s.label} delay={i * 0.08}>
              <div className="md:border-r md:border-scent-parchment/15 md:px-6 md:last:border-r-0">
                <div className="display-md text-scent-gold leading-none">{s.val}</div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-scent-parchment/70 font-bold">{s.label}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* === FEATURED VOTE — Editorial Block === */}
      <section className="relative bg-scent-parchment border-b border-scent-noir/10">
        <div className="max-w-7xl mx-auto px-5 md:px-12 py-16 md:py-24 grid md:grid-cols-12 gap-8">
          <FadeUp>
            <div className="md:col-span-5 relative aspect-[3/4] overflow-hidden">
              <Image src="/assets/ysl-libre.jpg" alt="" fill className="object-cover" sizes="(min-width: 768px) 40vw, 100vw" />
            </div>
          </FadeUp>

          <div className="md:col-span-7 md:pl-6 flex flex-col justify-center">
            <FadeUp delay={0.1}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-scent-oudRose animate-pulse" />
                <span className="eyebrow text-scent-oudRose">Live Vote · {total.toLocaleString()} votes</span>
              </div>
              <h2 className="display-lg text-scent-noir">{featuredVote.title}</h2>
              <p className="mt-4 text-scent-darkOud max-w-lg">{featuredVote.subtitle}</p>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="mt-8 space-y-3 max-w-lg">
                {(["A", "B"] as const).map((opt) => {
                  const pct = opt === "A" ? pctA : pctB;
                  const label = opt === "A" ? featuredVote.optionA : featuredVote.optionB;
                  const isActive = voted === opt;
                  return (
                    <button key={opt} onClick={() => !voted && setVoted(opt)}
                      disabled={!!voted && !isActive}
                      className={`vote-option h-14 w-full relative overflow-hidden ${isActive ? "selected" : ""} ${voted && !isActive ? "opacity-50" : ""}`}>
                      <motion.div initial={{ width: 0 }}
                        animate={{ width: voted ? `${pct}%` : "0%" }}
                        transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
                        className="absolute inset-y-0 left-0 bg-scent-gold/25" />
                      <div className="relative z-10 flex items-center justify-between px-5 h-full">
                        <span className="font-sans text-sm font-bold text-scent-noir">{label}</span>
                        {voted && <span className="font-display text-lg text-scent-noir">{pct}%</span>}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 flex items-center gap-3">
                <span className="text-[11px] text-loreal-muted">{featuredVote.brand}</span>
                <span className="text-scent-noir/30">·</span>
                <Link href="/vote" className="text-[11px] font-bold tracking-[0.15em] uppercase text-scent-noir hover:text-scent-gold transition-colors">
                  All votes →
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* === BIG SECTION TITLE === */}
      <section className="bg-scent-parchment border-b border-scent-noir/10">
        <div className="max-w-7xl mx-auto px-5 md:px-12 py-16 md:py-20">
          <FadeUp>
            <div className="eyebrow mb-4">Today&apos;s Feed</div>
            <h2 className="display-xl text-scent-noir max-w-4xl">From the community.</h2>
          </FadeUp>

          <div className="mt-10 md:mt-16 grid md:grid-cols-2 gap-6">
            {feedPosts.slice(0, 4).map((post, i) => {
              const src = post.mediaUrl ?? imageFor(post.fragranceName, post.brand, i);
              const isVideo = /\.(mp4|webm|mov)$/i.test(src);
              return (
                <FadeUp key={post.id} delay={i * 0.07}>
                  <Link href="/community" className="block group">
                    <div className="relative aspect-[4/5] overflow-hidden bg-scent-darkOud">
                      {isVideo ? (
                        <video src={src} autoPlay loop muted playsInline
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      ) : (
                        <Image
                          src={src}
                          alt={post.fragranceName} fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(min-width: 768px) 45vw, 100vw"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-scent-noir/85 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="text-scent-gold text-[10px] font-bold tracking-[0.2em] uppercase mb-2">{post.fragranceName}</div>
                        <h3 className="display-md text-scent-parchment leading-tight">{post.caption.substring(0, 60)}…</h3>
                        <div className="mt-3 flex items-center gap-2 text-scent-parchment/70 text-[11px]">
                          <span>{post.userName}</span>
                          <TierBadge tier={post.userTier} />
                          <span>·</span>
                          <span>{post.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </FadeUp>
              );
            })}
          </div>

          <FadeUp delay={0.4}>
            <div className="mt-10 text-center">
              <Link href="/community" className="pill pill-noir text-[12px] px-6 py-2.5">
                View Full Feed →
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* === BRAND STRIP === */}
      <section className="bg-scent-darkOud text-scent-parchment relative overflow-hidden grain">
        <div className="max-w-7xl mx-auto px-5 md:px-12 py-20 md:py-28 relative z-10">
          <FadeUp>
            <div className="eyebrow text-scent-gold mb-4">Pilot Brands</div>
            <h2 className="display-xl text-scent-parchment max-w-3xl">Where SCENTHOOD shapes the next brief.</h2>
          </FadeUp>

          <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {PILOT_BRAND_CARDS.map((b, i) => (
              <FadeUp key={b.name} delay={i * 0.08}>
                <div className="relative aspect-[3/4] overflow-hidden group cursor-pointer">
                  <Image src={b.img} alt="" fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 768px) 30vw, 100vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-scent-noir/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="text-scent-gold text-[10px] font-bold tracking-[0.2em] uppercase">{b.tag}</div>
                    <div className="display-md text-scent-parchment mt-1">{b.name}</div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* === FOOTER CTA — "Tune into the signal" === */}
      <section className="bg-scent-parchment border-t border-scent-noir/10">
        <div className="max-w-7xl mx-auto px-5 md:px-12 py-16 md:py-24">
          <FadeUp>
            <div className="bg-scent-oudRose text-scent-parchment p-8 md:p-14 relative overflow-hidden grain">
              <div className="relative z-10 grid md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-7">
                  <div className="eyebrow text-scent-parchment/80 mb-3">Stay in the loop</div>
                  <h2 className="display-xl text-scent-parchment">Tune into the signal.</h2>
                  <p className="mt-4 text-scent-parchment/85 max-w-md">
                    No noise. Just new votes, member spotlights, and the briefs you helped shape — delivered weekly.
                  </p>
                </div>
                <div className="md:col-span-5 flex md:justify-end">
                  <Link href="/signup" className="pill pill-gold text-[12px] px-6 py-3">
                    Subscribe →
                  </Link>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>

        {/* === FOOTER === */}
        <div className="max-w-7xl mx-auto px-5 md:px-12 pt-12 pb-10 md:pb-16 grid md:grid-cols-12 gap-10">
          {/* Navigate */}
          <div className="md:col-span-4">
            <div className="eyebrow mb-4">Navigate</div>
            <div className="grid grid-cols-2 gap-y-2 gap-x-6">
              {[
                { href: "/home",         label: "Home" },
                { href: "/community",    label: "Community" },
                { href: "/vote",         label: "Votes" },
                { href: "/intelligence", label: "Intelligence" },
                { href: "/tiers",        label: "Tiers" },
                { href: "/referral",     label: "Refer" },
                { href: "/profile",      label: "Profile" },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="text-sm text-scent-noir hover:text-scent-gold transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Discover */}
          <div className="md:col-span-4">
            <div className="eyebrow mb-4">Discover</div>
            <div className="flex flex-col gap-2">
              {[
                { href: "/quiz",   label: "Scent Identity Quiz" },
                { href: "/tiers",  label: "Tier System" },
                { href: "/brands", label: "Pilot Brands" },
                { href: "/signup", label: "Join SCENTHOOD" },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="text-sm text-scent-noir hover:text-scent-gold transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Big wordmark */}
          <div className="md:col-span-4 flex md:justify-end md:items-end">
            <div className="md:text-right">
              <div className="eyebrow mb-2">L&apos;Oréal Luxe</div>
              <div className="font-display text-3xl md:text-4xl text-scent-noir leading-none">SCENTHOOD</div>
              <div className="mt-2 text-[11px] text-loreal-muted">Brandstorm 2026</div>
            </div>
          </div>
        </div>

        {/* Big wordmark band */}
        <div className="border-t border-scent-noir/10 overflow-hidden">
          <div className="max-w-7xl mx-auto px-5 md:px-12 py-8">
            <h2 className="display-hero text-scent-noir/10 leading-none">SCENTHOOD</h2>
          </div>
        </div>

        <div className="border-t border-scent-noir/10">
          <div className="max-w-7xl mx-auto px-5 md:px-12 py-5 flex flex-wrap items-center justify-between gap-3 text-[11px] text-loreal-muted">
            <span>SCENTHOOD · A L&apos;Oréal Luxe platform · Brandstorm 2026</span>
            <span>Cairo · Paris · New York · Seoul</span>
          </div>
        </div>
      </section>
    </main>
  );
}
