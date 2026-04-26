"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const stats = [
  { value: "$47B", label: "Global Fragrance Market" },
  { value: "70%", label: "Gen Z trust peers over ads" },
  { value: "2.1B+", label: "Fragrance views on TikTok" },
  { value: "47", label: "Countries in our community" },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-loreal-white">
      {/* Top Nav */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-loreal-white/95 backdrop-blur-sm border-b border-loreal-border"
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-serif text-loreal-charcoal text-xl tracking-[0.2em] font-light">
            SCENTHOOD
          </span>
          <div className="flex items-center gap-6">
            <Link href="/home" className="body-sm hover:text-loreal-charcoal transition-colors hidden sm:block">
              Explore
            </Link>
            <Link href="/tiers" className="body-sm hover:text-loreal-charcoal transition-colors hidden sm:block">
              Tiers
            </Link>
            <Link href="/signup" className="btn-primary text-xs py-2 px-5">
              Join
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <div className="pt-14">
        {/* Full-width editorial hero */}
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="eyebrow mb-6">A Platform Strategy for L&apos;Oréal Luxe</div>
            <h1 className="heading-xl mb-6">
              The Fragrance<br />
              <em>Community</em> That Thinks.
            </h1>
            <p className="body-lead max-w-xl mx-auto mb-10">
              Vote on the next luxury launch. Write the review that shapes a brief. Rise from member to co-creator. SCENTHOOD puts the community inside the creative process.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/signup" className="btn-primary">
                Join SCENTHOOD Free
              </Link>
              <Link href="/home" className="btn-outline">
                Explore Community
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Thin Divider */}
        <div className="divider-full" />

        {/* Stats strip */}
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="text-center"
              >
                <div className="font-serif text-3xl md:text-4xl font-light champagne-text mb-1">
                  {stat.value}
                </div>
                <div className="body-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="divider-full" />

        {/* Editorial Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="max-w-3xl mx-auto px-6 py-20 text-center"
        >
          <div className="divider mx-auto mb-8" />
          <p className="font-serif text-xl md:text-2xl font-light text-loreal-slate italic leading-relaxed">
            &ldquo;Fragrance is the most intimate form of communication a brand can have with its customer. SCENTHOOD closes the loop — giving both sides a voice.&rdquo;
          </p>
          <p className="body-sm mt-4">— L&apos;Oréal Luxe Community Vision, 2026</p>
        </motion.div>

        {/* Divider */}
        <div className="divider-full" />

        {/* Three Feature Pillars */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <div className="eyebrow mb-3">How it Works</div>
            <h2 className="heading-lg">Three ways to contribute</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-loreal-border">
            {[
              {
                num: "01",
                title: "Vote",
                body: "Every active poll shapes a real product decision. Your vote on accord directions, scent families, and launch concepts is aggregated into the creative brief.",
              },
              {
                num: "02",
                title: "Write",
                body: "Fragrance deserves better writing. Publish reviews, emotional memories, and cultural connections. The best become briefs. Your words outlive the moment.",
              },
              {
                num: "03",
                title: "Rise",
                body: "Your L'Oréal Influence Score tracks the quality of your engagement. Rise from Scenthooders to Scentmaker to Scentsetters — and co-create the next launch.",
              },
            ].map((pillar) => (
              <div key={pillar.num} className="bg-loreal-white p-10">
                <div className="champagne-text font-serif text-4xl font-light mb-4">{pillar.num}</div>
                <h3 className="heading-sm mb-3">{pillar.title}</h3>
                <p className="body-sm">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="divider-full" />

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div>
            <div className="eyebrow mb-3">Start Today</div>
            <h2 className="heading-lg">Find your scent identity.</h2>
          </div>
          <div className="flex-shrink-0">
            <Link href="/signup" className="btn-gold">
              Join Free &amp; Take the Quiz →
            </Link>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="border-t border-loreal-border">
          <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
            <span className="font-serif text-loreal-muted text-sm tracking-[0.15em]">SCENTHOOD</span>
            <span className="body-sm">A L&apos;Oréal Luxe platform strategy · 2026</span>
          </div>
        </div>
      </div>
    </main>
  );
}
